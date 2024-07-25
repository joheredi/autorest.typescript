import { NameType, normalizeName } from "@azure-tools/rlc-common";
import {
  FunctionDeclarationStructure,
  InterfaceDeclarationStructure,
  SourceFile,
  StructureKind
} from "ts-morph";
import { SdkContext } from "../utils/interfaces.js";
import { getDocsFromDescription } from "./helpers/docsHelpers.js";
import {
  getDeserializePrivateFunction,
  getOperationFunction,
  getSendPrivateFunction,
  isLroOnlyOperation
} from "./helpers/operationHelpers.js";
import { buildType } from "./helpers/typeHelpers.js";
import { OperationPathAndDeserDetails } from "./interfaces.js";
import { Client, ModularCodeModel, Operation } from "./modularCodeModel.js";
import {
  addDeclaration,
  OperationDeclarations
} from "../framework/declaration.js";
import { refkey } from "../framework/refkey.js";
import { resolveReference } from "../framework/reference.js";
import { getClassicalLayerPrefix } from "./helpers/namingHelpers.js";
import { toPascalCase } from "../utils/casingUtils.js";
import { CoreDependencies } from "../core/dependencies.js";

/**
 * This function creates a file under /api for each operation group.
 * If there is no operation group in the TypeSpec program, we create a single
 * file called operations.ts where all operations are generated.
 */
export function buildOperationFiles(
  client: Client,
  dpgContext: SdkContext,
  codeModel: ModularCodeModel
) {
  const operationFiles = [];
  for (const operationGroup of client.operationGroups) {
    const operationFileName =
      operationGroup.className && operationGroup.namespaceHierarchies.length > 0
        ? `${operationGroup.namespaceHierarchies
            .map((hierarchy) => {
              return normalizeName(hierarchy, NameType.File);
            })
            .join("/")}/index`
        : // When the program has no operation groups defined all operations are put
          // into a nameless operation group. We'll call this operations.
          "operations";

    const subfolder = client.subfolder;
    const srcPath = codeModel.modularOptions.sourceRoot;
    const operationGroupFile = codeModel.project.createSourceFile(
      `${srcPath}/${
        subfolder && subfolder !== "" ? subfolder + "/" : ""
      }api/${operationFileName}.ts`
    );

    operationGroup.operations.forEach((o) => {
      const operationDeclaration: FunctionDeclarationStructure = {
        ...getOperationFunction(o, client),
        kind: StructureKind.Function
      };
      const sendOperationDeclaration: FunctionDeclarationStructure = {
        ...getSendPrivateFunction(dpgContext, o, client),
        kind: StructureKind.Function
      };
      const deserializeOperationDeclaration: FunctionDeclarationStructure = {
        ...getDeserializePrivateFunction(o),
        kind: StructureKind.Function
      };
      addDeclaration(
        operationGroupFile,
        operationDeclaration,
        refkey(o, OperationDeclarations.OperationFunction)
      );
      addDeclaration(
        operationGroupFile,
        sendOperationDeclaration,
        refkey(o, OperationDeclarations.SendOperationFunction)
      );
      addDeclaration(
        operationGroupFile,
        deserializeOperationDeclaration,
        refkey(o, OperationDeclarations.DeserializeOperationDeclaration)
      );
    });

    operationFiles.push(operationGroupFile);
  }
  return operationFiles;
}

function getOperationOptionsName(
  operation: Operation,
  includeGroupName = false
) {
  const prefix =
    includeGroupName && operation.name.indexOf("_") === -1
      ? getClassicalLayerPrefix(operation, NameType.Interface)
      : "";
  const optionName = `${prefix}${toPascalCase(operation.name)}OptionalParams`;
  return optionName;
}

/**
 * This function generates the interfaces for each operation options
 */
export function buildOperationOptions(
  operation: Operation,
  sourceFile: SourceFile
) {
  const optionalParameters = operation.parameters
    .filter((p) => p.implementation === "Method")
    .filter((p) => p.optional || p.clientDefaultValue);
  const options = [...optionalParameters];

  const name = getOperationOptionsName(operation, true);
  const lroOptions = {
    name: "updateIntervalInMs",
    type: "number",
    hasQuestionToken: true,
    docs: ["Delay to wait until next poll, in milliseconds."]
  };

  const operationOptionsInterface: InterfaceDeclarationStructure = {
    kind: StructureKind.Interface,
    name,
    isExported: true,
    extends: [resolveReference(CoreDependencies.operationOptions)],
    properties: (isLroOnlyOperation(operation) ? [lroOptions] : []).concat(
      options.map((p) => {
        return {
          docs: getDocsFromDescription(p.description),
          hasQuestionToken: true,
          ...buildType(p.clientName, p.type, p.format)
        };
      })
    ),
    docs: [`Optional parameters.`]
  };

  addDeclaration(
    sourceFile,
    operationOptionsInterface,
    refkey(operation, OperationDeclarations.OperationOptions)
  );
}

/**
 * This function creates a map of operation file path to operation names.
 */
export function buildLroDeserDetailMap(client: Client) {
  const map = new Map<string, OperationPathAndDeserDetails[]>();
  for (const operationGroup of client.operationGroups) {
    const operations = operationGroup.operations.filter((o) =>
      isLroOnlyOperation(o)
    );
    // skip this operation group if it has no LRO operations
    if (operations.length === 0) {
      continue;
    }

    const operationFileName =
      operationGroup.className && operationGroup.namespaceHierarchies.length > 0
        ? `${operationGroup.namespaceHierarchies
            .map((hierarchy) => {
              return normalizeName(hierarchy, NameType.File);
            })
            .join("/")}/index`
        : // When the program has no operation groups defined all operations are put
          // into a nameless operation group. We'll call this operations.
          "operations";
    map.set(
      `./api/${operationFileName}.js`,
      operations.map((o) => {
        const deserName = resolveReference(
          refkey(o, OperationDeclarations.DeserializeOperationDeclaration)
        );
        return {
          path: `${o.method.toUpperCase()} ${o.url}`,
          deserName
        };
      })
    );
  }
  return map;
}
