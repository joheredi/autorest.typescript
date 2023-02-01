import {
  FunctionDeclaration,
  OptionalKind,
  ParameterDeclarationStructure,
  Project,
  SourceFile
} from "ts-morph";
import { emitModels } from "./emitModels.js";
import { emitOperationGroups } from "./emitOperations.js";
import { HrlcCodeModel, Parameter } from "./hrlcCodeModel.js";

export interface ClientSourceFile {
  path: string;
  content: string;
}
export function emitClients(codeModel: HrlcCodeModel, srcPath: string = "src") {
  const project: Project = new Project();
  let files: ClientSourceFile[] = [];
  for (const client of codeModel.clients) {
    const { name, description, parameters } = client;
    const clientFile = project.createSourceFile(`${name}.ts`);
    const params: OptionalKind<ParameterDeclarationStructure>[] = [
      ...parameters
        .filter((p) => p.type.type !== "constant")
        .map<OptionalKind<ParameterDeclarationStructure>>((p) => {
          return {
            name: p.clientName,
            type: getParameterType(p)
          };
        }),
      { name: "options", type: `${name}Options`, initializer: "{}" }
    ];
    const factoryFunction = clientFile.addFunction({
      docs: [description],
      name: `create${name}`,
      returnType: `${name}`,
      parameters: params,
      isExported: true
    });

    let baseUrlParam: Parameter | undefined = parameters.find(
      (p) => p.location === "endpointPath"
    );

    if (!baseUrlParam) {
      throw new Error("Couldn't find the endpoint parameter");
    }

    const baseUrl =
      baseUrlParam.type.type === "constant"
        ? baseUrlParam.type.value
        : baseUrlParam.clientName;

    factoryFunction.addStatements([`const baseUrl = ${baseUrl}`]);

    const credentialsParam = parameters.find(
      (p) => p.clientName === "credential"
    );

    let getClientStatement = `const clientContext = getClient(baseUrl, options)`;

    if (credentialsParam) {
      importCredential(credentialsParam, clientFile);
      addCredentialOptionsStatement(credentialsParam, factoryFunction);
      getClientStatement = `const clientContext = getClient(baseUrl, credential, options)`;
    }

    factoryFunction.addStatements([
      getClientStatement,
      "return clientContext;"
    ]);

    clientFile.addImportDeclarations([
      {
        moduleSpecifier: "../index.js",
        defaultImport: "getClient",
        namedImports: [name, `${name}Options`]
      }
    ]);
    const operationFiles = emitOperationGroups(client, project, srcPath);
    const modelFiles = emitModels(codeModel, project, srcPath);
    files.push({
      path: `${srcPath}/src/api/${name}.ts`,
      content: clientFile.getFullText()
    });
    files = [...files, ...operationFiles, ...modelFiles];
  }
  return files;
}

function importCredential(
  credential: Parameter,
  clientSourceFile: SourceFile
): void {
  switch (credential.type.type) {
    case "Key":
      const azureKeyCredential = "AzureKeyCredential";
      clientSourceFile.addImportDeclaration({
        moduleSpecifier: "@azure/core-auth",
        namedImports: [azureKeyCredential]
      });
      return;
    default:
      throw new Error(
        `Credential of type ${credential.type.type} is not yet supported`
      );
  }
}

function addCredentialOptionsStatement(
  credential: Parameter,
  factoryFunction: FunctionDeclaration
): void {
  switch (credential.type.type) {
    case "Key":
      if (!credential.type.policy?.key) {
        throw new Error(`Key credential does not define a header name`);
      }
      factoryFunction.addStatements(
        `options.credentials = {...options.credentials, apiKeyHeaderName: "${credential.type.policy.key}"}`
      );
      return;
    default:
      return;
  }
}

function getParameterType(param: Parameter): string {
  switch (param.type.type) {
    case "Key":
      return "AzureKeyCredential";
    default:
      return param.type.type;
  }
}
