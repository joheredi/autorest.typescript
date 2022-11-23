import {
  WriterFunction,
  StatementStructures,
  VariableStatementStructure,
  StructureKind,
  VariableDeclarationKind
} from "ts-morph";
import { buildMethodShortcutImplementation } from "../buildMethodShortcuts";
import { RLCModel } from "../interfaces";
import { getApiVersion } from "./apiVersion";

export function getClientFactoryBody(
  model: RLCModel,
  clientTypeName: string
): string | WriterFunction | (string | WriterFunction | StatementStructures)[] {
  if (!model.options || !model.options.packageDetails || !model.urlInfo) {
    return "";
  }
  const { includeShortcuts, packageDetails } = model.options;
  let clientPackageName = packageDetails.nameWithoutScope ?? "";
  const packageVersion = packageDetails.version;
  const { endpoint, urlParameters } = model.urlInfo;

  const optionalUrlParameters: string[] = [];

  for (const param of urlParameters ?? []) {
    if (param.value) {
      const value =
        typeof param.value === "string" ? `"${param.value}"` : param.value;
      optionalUrlParameters.push(
        `const ${param.name} = options.${param.name} ?? ${value}`
      );
    }
  }

  let baseUrl: string;
  if (urlParameters && endpoint) {
    let parsedEndpoint = endpoint;
    urlParameters.forEach((urlParameter) => {
      parsedEndpoint = parsedEndpoint.replace(
        `{${urlParameter.name}}`,
        `\${${urlParameter.name}}`
      );
    });

    baseUrl = `options.baseUrl ?? \`${parsedEndpoint}\``;
  } else {
    baseUrl = `options.baseUrl ?? "${endpoint}"`;
  }

  const apiVersion = getApiVersion(model);
  let apiVersionStatement: string = "";
  if (apiVersion) {
    apiVersionStatement = `options.apiVersion = options.apiVersion ?? "${apiVersion}"`;
  }

  if (!clientPackageName.endsWith("-rest")) {
    clientPackageName = clientPackageName + "-rest";
  }
  const userAgentInfoStatement =
    "const userAgentInfo = `azsdk-js-" +
    clientPackageName +
    "/" +
    packageVersion +
    "`;";
  const userAgentPrefix =
    "options.userAgentOptions && options.userAgentOptions.userAgentPrefix ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`: `${userAgentInfo}`;";
  const userAgentStatement: VariableStatementStructure = {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [{ name: "userAgentPrefix", initializer: userAgentPrefix }]
  };

  const userAgentOptionsStatement = `options = {
        ...options,
        userAgentOptions: {
          userAgentPrefix
        }
      }`;

  const baseUrlStatement: VariableStatementStructure = {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [{ name: "baseUrl", initializer: baseUrl }]
  };

  const { credentialScopes, credentialKeyHeaderName } = model.options;

  const scopesString =
    credentialScopes && credentialScopes.length
      ? credentialScopes.map((cs) => `"${cs}"`).join(", ")
      : "";
  const scopes = scopesString ? `scopes: [${scopesString}],` : "";

  const apiKeyHeaderName = credentialKeyHeaderName
    ? `apiKeyHeaderName: "${credentialKeyHeaderName}",`
    : "";

  const credentials =
    scopes || apiKeyHeaderName
      ? `options = {
          ...options,
          credentials: {
            ${scopes}
            ${apiKeyHeaderName}
          },
        }`
      : "";

  const getClient = `const client = getClient(
          baseUrl, ${credentials ? "credentials," : ""} options
        ) as ${clientTypeName};
        `;

  let returnStatement = `return client;`;

  if (includeShortcuts) {
    const shortcutImplementations = buildMethodShortcutImplementation(
      model.paths
    );
    const shortcutBody = Object.keys(shortcutImplementations).map((key) => {
      // If the operation group has an empty name, it means its operations are client
      // level operations so we need to spread the definitions. Otherwise they are
      // within an operation group so we add them as key: value
      return `${
        key && key !== "client" ? `"${key}":` : "..."
      } {${shortcutImplementations[key].join()}}`;
    });
    returnStatement = `return { ...client, ${shortcutBody.join()} };`;
  }

  return [
    ...optionalUrlParameters,
    baseUrlStatement,
    apiVersionStatement,
    credentials,
    userAgentInfoStatement,
    userAgentStatement,
    userAgentOptionsStatement,
    getClient,
    returnStatement
  ];
}
