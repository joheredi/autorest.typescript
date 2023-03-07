import {
  FunctionDeclaration,
  ImportDeclaration,
  OptionalKind,
  ParameterDeclarationStructure,
  Project,
  Scope,
  SourceFile
} from "ts-morph";
import { emitModels } from "./emitModels.js";
import {
  emitClientOperationGroups,
  emitOperationGroups
} from "./emitOperations.js";
import { emitPackage } from "./emitPackageFile.js";
import { emitTsConfig } from "./emitTsConfig.js";
import { Client, HrlcCodeModel, Parameter } from "./hrlcCodeModel.js";

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
        type: `ClientOptions`,
        initializer: "{}"
      };
      coreClientImports.push("ClientOptions");
    } else {
      importedModels.push(`${name}Options`);
    }
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
    const clientContextFile = project.createSourceFile(
      `${srcPath}/src/api/${name}.ts`
    );
    const clientFile = project.createSourceFile(
      `${srcPath}/src/${name}Client.ts`
    );

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

    const credentialsParam = parameters.find(
      (p) => p.clientName === "credential"
    );

    emitClientContexts(
      codeModel,
      {
        name,
        params,
        description,
        baseUrl,
        credentialsParam
      },
      clientContextFile,
      exports,
      coreClientImports,
      importedModels
    );

    const operationFiles = emitOperationGroups(
      client,
      project,
      exports,
      srcPath
    );
    const modelFiles = emitModels(codeModel, project, exports, srcPath);

    files.push({
      path: `${srcPath}/src/api/${name}.ts`,
      content: clientContextFile.getFullText()
    });
    emitClient(
      codeModel,
      client,
      {
        name,
        params,
        description,
        baseUrl,
        credentialsParam
      },
      clientFile,
      exports,
      coreClientImports
    );
    clientFile.fixMissingImports();
    emitRootIndexFile(clientFile, srcPath, files);
    emitApiIndexFile(project, srcPath, files);
    emitTsConfig(project, srcPath,  codeModel, files);
    emitPackage(project, srcPath, codeModel, files);
    files.push({
      path: `${srcPath}/src/${name}Client.ts`,
      content: clientFile.getFullText()
    });

    files = [...files, ...operationFiles, ...modelFiles];
  }

  return files;
}

function addExports(
  imports: ImportDeclaration[],
  targetSourceFile: SourceFile
) {
  for (const declaration of imports) {
    targetSourceFile.addExportDeclaration({
      moduleSpecifier: declaration
        .getModuleSpecifier()
        .getText()
        .replace(/\"/g, ""),
      namedExports: declaration.getNamedImports().map((i) => i.getName())
    });
  }
}

function emitApiIndexFile(
  project: Project,
  srcPath: string,
  files: ClientSourceFile[]
) {
  const apiFiles = project.getSourceFiles("./src/api/**");
  const indexFile = project.createSourceFile(`${srcPath}/src/api/index.ts`);
  for (const file of apiFiles) {
    const imports = file.getImportDeclarations();
    addExports(imports, indexFile);
  }

  files.push({
    path: `${srcPath}/src/api/index.ts`,
    content: indexFile.getFullText()
  });
}

function emitRootIndexFile(
  clientFile: SourceFile,
  srcPath: string,
  files: ClientSourceFile[]
) {
  const project = clientFile.getProject();
  const indexFile = project.createSourceFile(`${srcPath}/src/index.ts`);
  const clientImports = clientFile.getImportDeclarations();
  addExports(clientImports, indexFile);
  files.push({
    path: `${srcPath}/src/index.ts`,
    content: indexFile.getFullText()
  });
}

interface ClientDetails {
  name: string;
  params?: OptionalKind<ParameterDeclarationStructure>[];
  description: string;
  baseUrl?: string;
  credentialsParam?: Parameter;
}

function emitClientContexts(
  _codeModel: HrlcCodeModel,
  clientDetails: ClientDetails,
  clientContextFile: SourceFile,
  exports: string[],
  coreClientImports: string[],
  importedModels: string[]
) {
  exports.push(`${clientDetails.name}.js`);
  const factoryFunction = clientContextFile.addFunction({
    docs: [clientDetails.description],
    name: `create${clientDetails.name}`,
    returnType: `${clientDetails.name}`,
    parameters: clientDetails.params,
    isExported: true
  });

  factoryFunction.addStatements([`const baseUrl = ${clientDetails.baseUrl}`]);
  let getClientStatement = `const clientContext = getClient(baseUrl, options)`;

  if (clientDetails.credentialsParam) {
    importCredential(clientDetails.credentialsParam, clientContextFile);
    addCredentialOptionsStatement(
      clientDetails.credentialsParam,
      factoryFunction
    );
    getClientStatement = `const clientContext = getClient(baseUrl, credential, options)`;
  }

  factoryFunction.addStatements([getClientStatement, "return clientContext;"]);

  clientContextFile.addImportDeclarations([
    {
      moduleSpecifier: "../rest/index.js",
      defaultImport: "getClient",
      namedImports: [
        clientDetails.name,
        ...importedModels.map((im) => `${im}Options`)
      ]
    },
    {
      moduleSpecifier: "@azure-rest/core-client",
      namedImports: coreClientImports
    }
  ]);
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

function emitClient(
  _codeModel: HrlcCodeModel,
  client: Client,
  clientDetails: ClientDetails,
  clientFile: SourceFile,
  exports: string[],
  coreClientImports: string[]
) {
  exports.push(`${clientDetails.name}.js`);
  const clientClass = clientFile.addClass({
    isExported: true,
    name: `${clientDetails.name}Client`
  });

  clientClass.addProperty({
    name: "_client",
    type: clientDetails.name,
    scope: Scope.Private
  });
  const constructor = clientClass.addConstructor({
    docs: [clientDetails.description],
    parameters: clientDetails.params
  });
  constructor.addStatements([
    `this._client = create${clientDetails.name}(${(clientDetails.params ?? [])
      .map((p) => p.name)
      .join(",")})`
  ]);

  emitClientOperationGroups(client, clientClass, clientFile);

  clientFile.addImportDeclarations([
    {
      moduleSpecifier: "./rest/index.js",
      namedImports: [`${clientDetails.name}`],
      defaultImport: `create${clientDetails.name}`
    },
    {
      moduleSpecifier: "@azure-rest/core-client",
      namedImports: coreClientImports
    }
  ]);

  clientDetails.credentialsParam &&
    importCredential(clientDetails.credentialsParam, clientFile);
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
        `options.credentials = {...options.requestOptions?.credentials, apiKeyHeaderName: "${credential.type.policy.key}"}`
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
