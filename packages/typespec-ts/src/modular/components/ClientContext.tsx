import { Children, code, For, refkey, Refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { Reference } from "@alloy-js/typescript";
import {
  SdkClientType,
  SdkCredentialParameter,
  SdkEndpointParameter,
  SdkHttpParameter,
  SdkMethodParameter,
  SdkServiceOperation
} from "@azure-tools/typespec-client-generator-core";
import {
  NameType,
  normalizeName,
  isAzurePackage
} from "@azure-tools/rlc-common";
import { SdkContext } from "../../utils/interfaces.js";
import { ModularEmitterOptions } from "../interfaces.js";
import {
  getClientName,
  getClassicalClientName
} from "../helpers/namingHelpers.js";
import { getDocsFromDescription } from "../helpers/docsHelpers.js";
import { getModularClientOptions } from "../../utils/clientUtils.js";
import {
  getClientParameters,
  getClientParameterName,
  getClientParametersDeclaration
} from "../helpers/clientHelpers.js";
import { getTypeExpression } from "../type-expressions/get-type-expression.js";
import { isCredentialType } from "../helpers/typeHelpers.js";
import { TypeExpression } from "./TypeExpression.js";
import {
  httpRuntimeLib,
  azureCoreClientLib,
  azureCoreAuthLib
} from "./ExternalPackages.js";
import { getApiVersionEnum, buildEnumTypes } from "../emitModels.js";
import { reportDiagnostic } from "../../lib.js";
import { NoTarget } from "@typespec/compiler";

// ── Refkey helpers ──────────────────────────────────────────────────────

/** Refkey for the client context interface */
export function clientContextRefkey(
  client: SdkClientType<SdkServiceOperation>
): Refkey {
  return refkey(client, "clientContext");
}

/** Refkey for the client context factory function */
export function clientContextFactoryRefkey(
  client: SdkClientType<SdkServiceOperation>
): Refkey {
  return refkey(client, "clientContextFactory");
}

/** Refkey for the client optional params interface */
export function clientOptionalParamsRefkey(
  client: SdkClientType<SdkServiceOperation>
): Refkey {
  return refkey(client, "clientOptionalParams");
}

export function getClientContextName(
  client: SdkClientType<SdkServiceOperation>
): string {
  return getClientName(client);
}

// ── Types ───────────────────────────────────────────────────────────────

type SdkParameter =
  | SdkMethodParameter
  | SdkEndpointParameter
  | SdkCredentialParameter
  | SdkHttpParameter;

// ── Component ───────────────────────────────────────────────────────────

export interface ClientContextProps {
  context: SdkContext;
  clientMap: [string[], SdkClientType<SdkServiceOperation>];
  emitterOptions: ModularEmitterOptions;
}

/**
 * Generates the client context file containing:
 * - Client interface (extends Client)
 * - Optional params interface (extends ClientOptions)
 * - Factory function that creates the client
 */
export function ClientContext(props: ClientContextProps): Children {
  const { context, clientMap, emitterOptions } = props;
  const [hierarchy, client] = clientMap;

  const isAzure = isAzurePackage({ options: context.rlcOptions ?? {} });
  const name = getClientName(client);
  const { rlcClientName, subfolder } = getModularClientOptions(clientMap);
  const classicalClientName = getClassicalClientName(client);

  // Compute file path (relative)
  const srcPath = emitterOptions.modularOptions.sourceRoot;
  const contextPath = `${srcPath}/${
    subfolder && subfolder !== "" ? subfolder + "/" : ""
  }api/${normalizeName(name, NameType.File)}Context.ts`;

  // Resolve library references based on flavor
  const clientRef = isAzure ? azureCoreClientLib.Client : httpRuntimeLib.Client;
  const clientOptionsRef = isAzure
    ? azureCoreClientLib.ClientOptions
    : httpRuntimeLib.ClientOptions;
  const getClientRef = isAzure
    ? azureCoreClientLib.getClient
    : httpRuntimeLib.getClient;
  const isKeyCredentialRef = isAzure
    ? azureCoreAuthLib.isKeyCredential
    : httpRuntimeLib.isKeyCredential;

  // ── Client interface properties ─────────────────────────────────────

  const requiredInterfaceProps = getClientParameters(client, context, {
    onClientOnly: false,
    requiredOnly: true
  })
    .filter((p) => {
      const n = getClientParameterName(p);
      return n !== "endpointParam" && n !== "credential";
    })
    .map((p) => ({
      name: getClientParameterName(p),
      type: p.type,
      optional: false,
      docs: getDocsWithKnownVersion(context, p)
    }));

  const requiredPropertyNames = new Set(
    requiredInterfaceProps.map((p) => p.name)
  );

  const optionalInterfaceProps = getClientParameters(client, context, {
    onClientOnly: false,
    optionalOnly: true
  })
    .filter((p) => {
      const n = getClientParameterName(p);
      return (
        n !== "endpointParam" &&
        n !== "credential" &&
        n !== "endpoint" &&
        !requiredPropertyNames.has(n)
      );
    })
    .map((p) => ({
      name: getClientParameterName(p),
      type: p.type,
      optional: true,
      docs: getDocsWithKnownVersion(context, p)
    }));

  const allInterfaceProps = [
    ...requiredInterfaceProps,
    ...optionalInterfaceProps
  ];

  // ── OptionalParams interface properties ─────────────────────────────

  const optionsProperties = getClientParameters(client, context, {
    optionalOnly: true
  })
    .filter((p) => getClientParameterName(p) !== "endpoint")
    .map((p) => ({
      name: getClientParameterName(p),
      typeStr:
        p.name.toLowerCase() === "apiversion"
          ? "string"
          : getTypeExpression(context, p.type),
      optional: true,
      docs: getDocsWithKnownVersion(context, p)
    }));

  if (context.arm) {
    optionsProperties.push({
      name: "cloudSetting",
      typeStr: "AzureSupportedClouds",
      optional: true,
      docs: ["Specifies the Azure cloud environment for the client."]
    });
  }

  // Check for duplicate option names
  const existingOptionNames = new Set<string>();
  for (const property of optionsProperties) {
    if (existingOptionNames.has(property.name)) {
      reportDiagnostic(context.program, {
        code: "parameter-name-conflict",
        format: { parameterName: property.name },
        target: NoTarget
      });
    }
    existingOptionNames.add(property.name);
  }

  // ── Factory function ────────────────────────────────────────────────

  const requiredParams = getClientParametersDeclaration(client, context, {
    onClientOnly: false,
    requiredOnly: true,
    apiVersionAsRequired: true
  });

  const paramList = requiredParams
    .map((p) => {
      if (p.initializer) {
        return `${p.name}: ${p.type} = ${p.initializer}`;
      }
      return `${p.name}: ${p.type}`;
    })
    .join(", ");

  // Endpoint logic
  const endpointResult = computeEndpointStatements(context, client, isAzure);
  const { endpointParamName, assignedOptionalParams } = endpointResult;

  // Credential logic
  const credentialParam = computeCredentialParam(client, emitterOptions);

  // Api version param
  const apiVersionParam = getClientParameters(client, context).find(
    (x) => x.isApiVersionParam
  );
  const apiVersionParamName = apiVersionParam
    ? getClientParameterName(apiVersionParam)
    : undefined;

  // Options logic
  const optionsResult = computeOptionsStatements(
    emitterOptions,
    endpointParamName,
    apiVersionParamName
  );

  // Api version statement
  const apiVersionStatement = computeApiVersionStatement(
    context,
    client,
    isAzure,
    apiVersionParam,
    apiVersionParamName
  );

  // Custom auth policy
  const { customHttpAuthHeaderName, customHttpAuthSharedKeyPrefix } =
    emitterOptions.options;

  // Return statement
  const contextRequiredParam = requiredParams.filter(
    (p) =>
      p.name !== "endpointParam" &&
      p.name !== "credential" &&
      p.name !== "options"
  );
  const requiredParamNames = new Set(contextRequiredParam.map((p) => p.name));

  const contextOptionalParams = getClientParameters(client, context, {
    optionalOnly: true,
    onClientOnly: false
  }).filter((p) => {
    const n = getClientParameterName(p);
    return (
      n !== "endpointParam" &&
      n !== "credential" &&
      n !== "endpoint" &&
      !requiredParamNames.has(n)
    );
  });

  const allContextParams = [
    ...contextRequiredParam.map((p) => p.name),
    ...contextOptionalParams.map((p) => {
      const n = getClientParameterName(p);
      if (
        requiredParamNames.has(n) ||
        (assignedOptionalParams && assignedOptionalParams.has(n))
      ) {
        return n;
      }
      return `${n}: options.${n}`;
    })
  ];

  const returnStatement = allContextParams.length
    ? `return { ...clientContext, ${allContextParams.join(", ")}} as ${rlcClientName};`
    : `return clientContext;`;

  // Logger import (azure only)
  const loggerImport = isAzure
    ? `import { logger } from "${"../".repeat(hierarchy.length + 1)}logger.js";`
    : "";

  // Cloud setting import (ARM only)
  const cloudSettingImport = context.arm
    ? `import { AzureSupportedClouds, getArmEndpoint } from "../helpers/cloudSettingHelpers.js";`
    : "";

  // Pre-computed string fragments (no refkeys)
  const endpointStatements = endpointResult.statements.join("\n");
  const optionsStatements = optionsResult.statements.join("\n");

  // Custom auth block (uses refkey for isKeyCredential)
  const customAuthBlock =
    customHttpAuthHeaderName && customHttpAuthSharedKeyPrefix
      ? code`
      if(${isKeyCredentialRef}(credential)) {
        clientContext.pipeline.addPolicy({
          name: "customKeyCredentialPolicy",
          sendRequest(request, next) {
            request.headers.set("${customHttpAuthHeaderName}", "${customHttpAuthSharedKeyPrefix} " + credential.key);
            return next(request);
          }
        });
      }`
      : "";

  return (
    <ts.SourceFile path={contextPath}>
      {loggerImport ? loggerImport + "\n" : ""}
      {cloudSettingImport ? cloudSettingImport + "\n" : ""}

      <ts.InterfaceDeclaration
        export
        name={rlcClientName!}
        doc={client.doc || undefined}
        extends={<Reference refkey={clientRef} />}
        refkey={clientContextRefkey(client)}
      >
        <For each={allInterfaceProps} semicolon hardline>
          {(prop) => (
            <ts.InterfaceMember
              name={prop.name}
              optional={prop.optional}
              doc={prop.docs.join("\n") || undefined}
            >
              <TypeExpression context={context} type={prop.type} />
            </ts.InterfaceMember>
          )}
        </For>
      </ts.InterfaceDeclaration>

      <ts.InterfaceDeclaration
        export
        name={`${classicalClientName}OptionalParams`}
        doc="Optional parameters for the client."
        extends={<Reference refkey={clientOptionsRef} />}
        refkey={clientOptionalParamsRefkey(client)}
      >
        <For each={optionsProperties} semicolon hardline>
          {(prop) => (
            <ts.InterfaceMember
              name={prop.name}
              optional={prop.optional}
              doc={prop.docs.join("\n") || undefined}
            >
              {prop.typeStr}
            </ts.InterfaceMember>
          )}
        </For>
      </ts.InterfaceDeclaration>

      {code`
export function create${name}(${paramList}): ${rlcClientName} {
  ${endpointStatements}
  ${optionsStatements}
  const clientContext = ${getClientRef}(${endpointParamName}, ${credentialParam}, ${optionsResult.optionsExpr});
  ${customAuthBlock}
  ${apiVersionStatement}
  ${returnStatement}
}
`}
    </ts.SourceFile>
  );
}

// ── Pure helper functions ───────────────────────────────────────────────

interface EndpointResult {
  statements: string[];
  endpointParamName: string;
  assignedOptionalParams: Set<string>;
}

function computeEndpointStatements(
  dpgContext: SdkContext,
  client: SdkClientType<SdkServiceOperation>,
  isAzure: boolean
): EndpointResult {
  const statements: string[] = [];
  const assignedOptionalParams = new Set<string>();

  let coreEndpointParam: string;
  if (isAzure) {
    const cloudSettingSuffix = dpgContext.arm
      ? ` ?? getArmEndpoint(options.cloudSetting)`
      : "";
    coreEndpointParam = `options.endpoint${cloudSettingSuffix}`;
  } else {
    coreEndpointParam = `options.endpoint`;
  }

  const endpointParam = getClientParameters(client, dpgContext, {
    onClientOnly: true,
    skipEndpointTemplate: true,
    skipArmSpecific: true
  }).find((x) => x.kind === "endpoint" || x.kind === "path");

  if (endpointParam) {
    if (
      endpointParam.type.kind === "union" &&
      endpointParam.type.variantTypes[0]?.kind === "endpoint"
    ) {
      const params = endpointParam.type.variantTypes[0].templateArguments;
      let parameterizedEndpointUrl =
        endpointParam.type.variantTypes[0].serverUrl;
      for (const templateParam of params) {
        const paramName = getClientParameterName(templateParam);
        if (templateParam.clientDefaultValue) {
          const defaultValue =
            typeof templateParam.clientDefaultValue === "string"
              ? `"${templateParam.clientDefaultValue}"`
              : templateParam.clientDefaultValue;
          statements.push(
            `const ${paramName} = options.${paramName} ?? ${defaultValue};`
          );
          assignedOptionalParams.add(paramName);
        } else if (templateParam.optional) {
          statements.push(`const ${paramName} = options.${paramName};`);
          assignedOptionalParams.add(paramName);
        }
        parameterizedEndpointUrl = parameterizedEndpointUrl.replace(
          `{${templateParam.name}}`,
          `\${${getClientParameterName(templateParam)}}`
        );
      }
      statements.push(
        `const endpointUrl = ${coreEndpointParam} ?? \`${parameterizedEndpointUrl}\`;`
      );
      return {
        statements,
        endpointParamName: "endpointUrl",
        assignedOptionalParams
      };
    } else if (endpointParam.type.kind === "endpoint") {
      const clientDefaultValue =
        endpointParam.type.templateArguments[0]?.clientDefaultValue;
      const defaultValueStr =
        clientDefaultValue && typeof clientDefaultValue === "string"
          ? `"${clientDefaultValue}"`
          : clientDefaultValue
            ? clientDefaultValue
            : `String(${getClientParameterName(endpointParam)})`;
      statements.push(
        `const endpointUrl = ${coreEndpointParam} ?? ${defaultValueStr};`
      );
      return {
        statements,
        endpointParamName: "endpointUrl",
        assignedOptionalParams
      };
    }
    statements.push(
      `const endpointUrl = ${coreEndpointParam} ?? String(${getClientParameterName(endpointParam)});`
    );
    return {
      statements,
      endpointParamName: "endpointUrl",
      assignedOptionalParams
    };
  }

  return {
    statements,
    endpointParamName: "endpointUrl",
    assignedOptionalParams
  };
}

function computeCredentialParam(
  client: SdkClientType<SdkServiceOperation>,
  emitterOptions: ModularEmitterOptions
): string {
  if (
    emitterOptions.options.addCredentials &&
    (emitterOptions.options.credentialScopes ||
      emitterOptions.options.credentialKeyHeaderName)
  ) {
    return (
      client.clientInitialization.parameters.find((x) => isCredentialType(x))
        ?.name ?? "undefined"
    );
  }
  return "undefined";
}

interface OptionsResult {
  statements: string[];
  optionsExpr: string;
}

function computeOptionsStatements(
  emitterOptions: ModularEmitterOptions,
  endpointParam: string,
  apiVersionParamName?: string
): OptionsResult {
  const statements: string[] = [];

  // User agent options
  const clientPackageName =
    emitterOptions.options.packageDetails?.nameWithoutScope ??
    emitterOptions.options.packageDetails?.name ??
    "";
  const packageVersion = emitterOptions.options.packageDetails?.version ?? "";
  const sdkUserAgentPrefix = "azsdk-js-api";

  statements.push(
    "const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;"
  );

  const userAgentInfoStatement =
    packageVersion && clientPackageName && sdkUserAgentPrefix.includes("api")
      ? `const userAgentInfo = \`azsdk-js-${clientPackageName}/${packageVersion}\`;`
      : "";

  if (userAgentInfoStatement) {
    statements.push(userAgentInfoStatement);
  }

  const userAgentPrefix = `const userAgentPrefix = ${
    "prefixFromOptions ? `${prefixFromOptions} " +
    sdkUserAgentPrefix +
    `${userAgentInfoStatement ? " ${userAgentInfo}" : ""}` +
    "` : `" +
    sdkUserAgentPrefix +
    `${userAgentInfoStatement ? " ${userAgentInfo}`" : "`"}`
  };`;
  statements.push(userAgentPrefix);

  const userAgentOptions = `{ userAgentPrefix }`;

  // Logging options
  const loggingOptions =
    emitterOptions.options.flavor === "azure"
      ? `{ logger: options.loggingOptions?.logger ?? logger.info }`
      : undefined;

  // Credentials
  const credentials = computeCredentials(emitterOptions, endpointParam);

  // Build destructuring statement
  const apiVersionDestructure = apiVersionParamName ?? "apiVersion";
  let expr = `const { ${apiVersionDestructure}: _, ...updatedOptions } = {`;
  expr += "...options,";
  expr += `userAgentOptions: ${userAgentOptions},`;
  if (loggingOptions) {
    expr += `loggingOptions: ${loggingOptions},`;
  }
  if (credentials) {
    expr += `credentials: ${credentials},`;
  }
  expr += `};`;
  statements.push(expr);

  return { statements, optionsExpr: "updatedOptions" };
}

function computeCredentials(
  emitterOptions: ModularEmitterOptions,
  endpointParam: string
): string | undefined {
  if (!emitterOptions.options.addCredentials) {
    return undefined;
  }

  const { credentialScopes, credentialKeyHeaderName } = emitterOptions.options;

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

function computeApiVersionStatement(
  dpgContext: SdkContext,
  client: SdkClientType<SdkServiceOperation>,
  isAzure: boolean,
  apiVersionParam: SdkParameter | undefined,
  apiVersionParamName: string | undefined
): string {
  const endpointParameter = getClientParameters(client, dpgContext, {
    onClientOnly: false,
    requiredOnly: true,
    skipEndpointTemplate: true
  }).find((x) => x.kind === "endpoint");

  if (apiVersionParam) {
    const templateArguments =
      endpointParameter && endpointParameter.type.kind === "endpoint"
        ? endpointParameter.type.templateArguments
        : endpointParameter && endpointParameter.type.kind === "union"
          ? endpointParameter.type.variantTypes[0]?.templateArguments
          : [];
    const apiVersionInEndpoint =
      templateArguments && templateArguments.find((p) => p.isApiVersionParam);
    if (!apiVersionInEndpoint && apiVersionParam.clientDefaultValue) {
      return `const ${apiVersionParamName} = options.${apiVersionParamName};`;
    }
    return "";
  }

  if (isAzure) {
    return `if (options.apiVersion) {
          logger.warning("This client does not support client api-version, please change it at the operation level");
        }`;
  }

  return `if (options.apiVersion) {
          console.warn("This client does not support client api-version, please change it at the operation level");
        }`;
}

function getDocsWithKnownVersion(
  dpgContext: SdkContext,
  param: SdkParameter
): string[] {
  const docs = getDocsFromDescription(param.doc);
  if (param.name.toLowerCase() !== "apiversion") {
    return docs;
  }
  const apiVersionEnum = getApiVersionEnum(dpgContext);
  if (apiVersionEnum) {
    const [_, knownValuesEnum] = buildEnumTypes(
      dpgContext,
      apiVersionEnum,
      true
    );
    docs.push(
      `Known values of {@link ${knownValuesEnum.name}} that the service accepts.`
    );
  }
  return docs;
}
