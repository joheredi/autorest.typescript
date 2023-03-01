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
export function emitClients(
  codeModel: HrlcCodeModel,
  exports: string[],
  srcPath: string = "src"
) {
  const project: Project = new Project();
  const coreClientImports: string[] = [];
  const importedModels: string[] = [];
  let files: ClientSourceFile[] = [];
  for (const client of codeModel.clients) {
    const { name, description, parameters } = client;
    let optionsParam = {
      name: "options",
      type: `${name}Options`,
      initializer: "{}"
    };
    if (
      !client.parameters
        .filter(
          (p) => p.implementation === "Client" && p.clientName !== "api_version"
        )
        .some((p) => p.optional || (!p.optional && p.clientDefaultValue))
    ) {
      optionsParam = {
        name: "options",
        type: `RequestParameters`,
        initializer: "{}"
      };
      coreClientImports.push("RequestParameters");
    } else {
      importedModels.push(`${name}Options`);
    }
    const clientFile = project.createSourceFile(`${name}.ts`);
    exports.push(`${name}.js`);
    const params: OptionalKind<ParameterDeclarationStructure>[] = [
      ...parameters
        .filter((p) => p.type.type !== "constant")
        .map<OptionalKind<ParameterDeclarationStructure>>((p) => {
          return {
            name: p.clientName,
            type: getParameterType(p)
          };
        }),
      optionsParam
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

    let baseUrl: string | undefined = "endpoint";
    if (baseUrlParam) {
      baseUrl =
        baseUrlParam.type.type === "constant"
          ? baseUrlParam.type.value
          : baseUrlParam.clientName;
    }

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
        moduleSpecifier: "../rest/index.js",
        defaultImport: "getClient",
        namedImports: [name, ...importedModels.map((im) => `${im}Options`)]
      },
      {
        moduleSpecifier: "@azure-rest/core-client",
        namedImports: coreClientImports
      }
    ]);
    const operationFiles = emitOperationGroups(
      client,
      project,
      exports,
      srcPath
    );
    const modelFiles = emitModels(codeModel, project, exports, srcPath);
    emitUberClient(factoryFunction);
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
    case "OAuth2":
      const azureTokenCredential = "TokenCredential";
      clientSourceFile.addImportDeclaration({
        moduleSpecifier: "@azure/core-auth",
        namedImports: [azureTokenCredential]
      });
      return;
    default:
      throw new Error(
        `Credential of type ${credential.type.type} is not yet supported`
      );
  }
}

function emitUberClient(context: FunctionDeclaration) {
  // const client = context.getSignature();
  // const decl = client.getDeclaration().getText();
  // console.log(decl);
  const signature = context.getSignature();
  const declaration = signature.getDeclaration();
  const params = signature.getParameters();
  const returnType = signature.getReturnType();
  console.log(`${declaration} ${params} ${returnType}`);
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
    case "OAuth2":
      return "TokenCredential";
    default:
      return param.type.type;
  }
}
