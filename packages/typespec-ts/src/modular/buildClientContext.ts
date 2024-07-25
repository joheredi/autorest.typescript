import { NameType, normalizeName } from "@azure-tools/rlc-common";
import {
  FunctionDeclarationStructure,
  InterfaceDeclarationStructure,
  SourceFile,
  StructureKind
} from "ts-morph";
import { isRLCMultiEndpoint } from "../utils/clientUtils.js";
import { SdkContext } from "../utils/interfaces.js";
import {
  getUserAgentStatements,
  getClientParameters
} from "./helpers/clientHelpers.js";
import { getDocsFromDescription } from "./helpers/docsHelpers.js";
import { getClientName } from "./helpers/namingHelpers.js";
import { getType } from "./helpers/typeHelpers.js";
import { Client, ModularCodeModel } from "./modularCodeModel.js";
import {
  addDeclaration,
  ClientDeclarations
} from "../framework/declaration.js";
import { refkey } from "../framework/refkey.js";
import { resolveReference } from "../framework/reference.js";
import { CoreDependencies } from "../core/dependencies.js";

/**
 * This function creates the file containing the modular client context
 */
export function buildClientContext(
  client: Client,
  dpgContext: SdkContext,
  codeModel: ModularCodeModel
): SourceFile {
  const { description, subfolder } = client;
  const name = getClientName(client);
  const params = getClientParameters(client, dpgContext);
  const srcPath = codeModel.modularOptions.sourceRoot;
  const clientContextFile = codeModel.project.createSourceFile(
    `${srcPath}/${
      subfolder && subfolder !== "" ? subfolder + "/" : ""
    }/api/${normalizeName(name, NameType.File)}Context.ts`
  );

  let factoryFunction: FunctionDeclarationStructure;

  const clientContextOptions: InterfaceDeclarationStructure = {
    kind: StructureKind.Interface,
    name: `${name}ClientOptionalParams`,
    isExported: true,
    extends: [resolveReference(CoreDependencies.clientOptionsType)],
    properties: client.parameters
      .filter((p) => {
        return (
          p.optional || (p.type.type !== "constant" && p.clientDefaultValue)
        );
      })
      .map((p) => {
        return {
          name: p.clientName,
          type: getType(p.type).name,
          hasQuestionToken: true,
          docs: getDocsFromDescription(p.description)
        };
      }),
    docs: ["Optional parameters for the client."]
  };

  addDeclaration(
    clientContextFile,
    clientContextOptions,
    refkey(client, ClientDeclarations.ClientContextOptions)
  );

  if (isRLCMultiEndpoint(dpgContext)) {
    clientContextFile.addExportDeclaration({
      moduleSpecifier: `../../rest/${subfolder}/index.js`,
      namedExports: [`Client`]
    });
    factoryFunction = {
      kind: StructureKind.Function,
      docs: getDocsFromDescription(description),
      name: `create${name}`,
      parameters: params,
      isExported: true,
      statements: []
    };
  } else {
    const rlcClientName = client.rlcClientName;

    clientContextFile.addExportDeclaration({
      moduleSpecifier: `${
        subfolder && subfolder !== "" ? "../" : ""
      }../rest/index.js`,
      namedExports: [`${rlcClientName}`]
    });

    factoryFunction = {
      kind: StructureKind.Function,
      docs: getDocsFromDescription(description),
      name: `create${name}`,
      parameters: params,
      isExported: true,
      statements: []
    };
  }

  const paramNames = params.map((p) => p.name);
  const { userAgentStatements, updatedParamNames } = getUserAgentStatements(
    "azsdk-js-api",
    paramNames
  );

  const functionStatements = factoryFunction.statements! as string[];
  functionStatements.push(
    userAgentStatements,
    `const clientContext = ${resolveReference(
      CoreDependencies.getClient
    )}(${updatedParamNames});`,
    `return clientContext;`
  );

  addDeclaration(
    clientContextFile,
    factoryFunction,
    refkey(client, ClientDeclarations.ClientFactory)
  );

  return clientContextFile;
}
