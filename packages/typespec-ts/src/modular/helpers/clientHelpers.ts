import { Client, ModularCodeModel } from "../modularCodeModel.js";
import {
  OptionalKind,
  ParameterDeclarationStructure,
  StatementedNode
} from "ts-morph";
import {
  SdkClientType,
  SdkHttpOperation,
  SdkHttpParameter,
  SdkParameter
} from "@azure-tools/typespec-client-generator-core";

import { PackageFlavor } from "@azure-tools/rlc-common";
import { SdkContext } from "../../utils/interfaces.js";
import { getClientName } from "./namingHelpers.js";
import { getTypeExpression } from "../type-expressions/get-type-expression.js";
import { isCredentialType } from "./typeHelpers.js";

interface ClientParameterOptions {
  onClientOnly?: boolean;
  requiredOnly?: boolean;
  optionalOnly?: boolean;
}

export function getClientParameters(
  client: SdkClientType<SdkHttpOperation>,
  dpgContext: SdkContext,
  options: ClientParameterOptions = {
    requiredOnly: false,
    onClientOnly: false,
    optionalOnly: false
  }
) {
  const clientParams: (SdkParameter | SdkHttpParameter)[] = [];
  for (const property of client.initialization.properties) {
    if (
      property.type.kind === "union" &&
      property.type.values[0]?.kind === "endpoint"
    ) {
      clientParams.push(...property.type.values[0].templateArguments);
    } else if (!clientParams.find((p) => p.name === property.name)) {
      clientParams.push(property);
    }
  }

  const params = clientParams
    .filter(
      (p) =>
        !options.requiredOnly ||
        (options.requiredOnly &&
          !p.optional &&
          !(
            p.clientDefaultValue ||
            p.__raw?.defaultValue ||
            p.type.kind === "constant"
          ))
    )
    .filter(
      (p) =>
        !options.optionalOnly ||
        (options.optionalOnly &&
          (p.optional ||
            p.clientDefaultValue ||
            p.__raw?.defaultValue ||
            p.type.kind === "constant"))
    )
    .filter((p) => !(p.kind === "endpoint" && dpgContext.arm))
    .filter(
      (p) =>
        !options.onClientOnly || (options.onClientOnly && p.kind !== "method")
    );

  return params;
}

export function getClientParametersDeclaration(
  client: SdkClientType<SdkHttpOperation>,
  dpgContext: SdkContext,
  options: ClientParameterOptions = {
    optionalOnly: false,
    requiredOnly: false,
    onClientOnly: false
  }
): OptionalKind<ParameterDeclarationStructure>[] {
  const name = getClientName(client);
  const optionsParam = {
    name: "options",
    type: `${name}ClientOptionalParams`,
    initializer: "{}"
  };

  const params: OptionalKind<ParameterDeclarationStructure>[] = [
    ...getClientParameters(client, dpgContext, options).map<
      OptionalKind<ParameterDeclarationStructure>
    >((p) => {
      const typeExpression = getClientParameterTypeExpression(p);
      const name = getClientParameterName(p);
      return {
        name,
        type: typeExpression
      };
    })
  ];
  params.push(optionsParam);

  return params;
}

function getClientParameterTypeExpression(
  parameter: SdkParameter | SdkHttpParameter
) {
  // Special handle to work around the fact that TCGC creates a union type for endpoint. The reason they do this
  // is to provide a way for users to either pass the value to fill in the template of the whole endpoint. Basically they are
  // inserting a variant with {endpoint}.
  // Our emitter allows this through the options.endpoint.
  if (parameter.type.kind === "union") {
    const endpointVariant = parameter.type.values.find(
      (p) => p.kind === "endpoint"
    );
    if (endpointVariant) {
      return getTypeExpression(endpointVariant);
    }
  }
  return getTypeExpression(parameter.type);
}

function getClientParameterName(parameter: SdkParameter | SdkHttpParameter) {
  // We have been calling this endpointParam, so special handling this here to make sure there are no unexpected side effects
  if (
    (parameter.type.kind === "union" &&
      parameter.type.values.some((v) => v.kind === "endpoint")) ||
    ((parameter.kind === "endpoint" || parameter.kind === "path") &&
      parameter.name.toLowerCase() === "endpoint")
  ) {
    return "endpointParam";
  }

  return parameter.name;
}

export function buildGetClientEndpointParam(
  context: StatementedNode,
  dpgContext: SdkContext,
  _client: Client
): string {
  const client = _client.tcgcClient;
  // Special case: endpoint URL not defined
  if (_client.url === "") {
    const endpointParam = getClientParameters(client, dpgContext, {
      onClientOnly: false
    }).find((x) => x.kind === "endpoint");
    return `options.endpoint ?? options.baseUrl ?? ${endpointParam?.name}`;
  }

  const urlParams = _client.parameters.filter((p) => {
    return p.location === "endpointPath" || p.location === "path";
  });

  for (const param of urlParams) {
    if (param.clientDefaultValue) {
      const defaultValue =
        typeof param.clientDefaultValue === "string"
          ? `"${param.clientDefaultValue}"`
          : param.clientDefaultValue;
      context.addStatements(
        `const ${param.clientName} = options.${param.clientName} ?? ${defaultValue};`
      );
    } else if (param.optional) {
      context.addStatements(
        `const ${param.clientName} = options.${param.clientName};`
      );
    }
  }

  let parameterizedEndpointUrl = _client.url;
  for (const param of urlParams) {
    parameterizedEndpointUrl = parameterizedEndpointUrl.replace(
      `{${param.restApiName}}`,
      `\${${param.clientName}}`
    );
  }

  const endpointParam = urlParams.find(
    (p) => p.location === "endpointPath" && p.clientName === "endpointParam"
  );
  let hasRequiredEndpoint = false;
  if (
    endpointParam &&
    !_client.url.includes(`{${endpointParam.restApiName}}`) &&
    !dpgContext.arm
  ) {
    hasRequiredEndpoint = true;
  }
  const endpointUrl = `const endpointUrl = ${
    hasRequiredEndpoint ? "endpointParam ?? " : ""
  }options.endpoint ?? options.baseUrl ?? \`${parameterizedEndpointUrl}\``;
  context.addStatements(endpointUrl);
  return "endpointUrl";
}

/**
 * Builds the options to be passed to getClient
 *
 * @param context - context in which the options are being passed; statements will be added to this context
 *                  to help build the options shape
 * @returns - an expression representing the options to be passed in to getClient
 */
export function buildGetClientOptionsParam(
  context: StatementedNode,
  codeModel: ModularCodeModel,
  endpointParam: string
): string {
  const userAgentOptions = buildUserAgentOptions(context, "azsdk-js-api");
  const loggingOptions = buildLoggingOptions(codeModel.options.flavor);
  const credentials = buildCredentials(codeModel, endpointParam);

  let expr = "const { apiVersion: _, ...updatedOptions } = {";

  expr += "...options,";

  if (userAgentOptions) {
    expr += `userAgentOptions: ${userAgentOptions},`;
  }
  if (loggingOptions) {
    expr += `loggingOptions: ${loggingOptions},`;
  }
  if (credentials) {
    expr += `credentials: ${credentials},`;
  }

  expr += `}`;

  context.addStatements(expr);
  return "updatedOptions";
}

export function buildGetClientCredentialParam(
  client: Client,
  codeModel: ModularCodeModel
): string {
  if (
    codeModel.options.addCredentials &&
    (codeModel.options.credentialScopes ||
      codeModel.options.credentialKeyHeaderName)
  ) {
    return (
      client.parameters.find((x) => isCredentialType(x.type))?.clientName ??
      "undefined"
    );
  } else {
    return "undefined";
  }
}

function buildCredentials(
  codeModel: ModularCodeModel,
  endpointParam: string
): string | undefined {
  if (!codeModel.options.addCredentials) {
    return undefined;
  }

  const { credentialScopes, credentialKeyHeaderName } = codeModel.options;

  const scopesString = credentialScopes
    ? credentialScopes.map((cs) => `"${cs}"`).join(", ") ||
      `\`\${${endpointParam}}/.default\``
    : "";
  const scopes = scopesString
    ? `scopes: options.credentials?.scopes ?? [${scopesString}],`
    : "";

  const apiKeyHeaderName = credentialKeyHeaderName
    ? `apiKeyHeaderName: options.credentials?.apiKeyHeaderName ?? "${credentialKeyHeaderName}",`
    : "";

  if (!scopes && !apiKeyHeaderName) {
    return undefined;
  }

  return `{ ${scopes}${apiKeyHeaderName} }`;
}

function buildLoggingOptions(flavor?: PackageFlavor): string | undefined {
  if (flavor !== "azure") {
    return undefined;
  }

  return `{ logger: options.loggingOptions?.logger ?? logger.info }`;
}

export function buildUserAgentOptions(
  context: StatementedNode,
  sdkUserAgentPrefix: string
): string {
  const userAgentStatements = `
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = ${
      "prefixFromOptions ? `${prefixFromOptions} " +
      sdkUserAgentPrefix +
      "` : " +
      `"${sdkUserAgentPrefix}"`
    };
  `;

  context.addStatements(userAgentStatements);

  return `{ userAgentPrefix }`;
}
