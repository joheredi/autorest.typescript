import { File } from "@azure-tools/rlc-common";
import {
  OptionalKind,
  ParameterDeclarationStructure,
  Project,
  SourceFile
} from "ts-morph";
import { getType } from "./getType.js";
import {
  OperationGroup,
  Operation,
  Parameter,
  Property
} from "./hrlcCodeModel.js";

export function emitOperationGroups(
  operationGroups: OperationGroup[],
  project: Project
): File[] {
  const files: File[] = [];
  for (const operationGroup of operationGroups) {
    const imports: Record<string, Set<string>> = {};
    const fileName = operationGroup.className
      ? `${operationGroup.className}.ts`
      : "operations.ts";

    const operationGroupFile = project.createSourceFile(fileName);
    operationGroup.operations.forEach((o) =>
      emitOperation(o, operationGroupFile, imports)
    );

    for (const module in imports) {
      operationGroupFile.addImportDeclaration({
        moduleSpecifier: module,
        namedImports: [...imports[module]!]
      });
    }
    operationGroupFile.addImportDeclaration({
      moduleSpecifier: "@azure-rest/core-client",
      namedImports: ["Client"]
    });
    files.push({
      content: operationGroupFile.getFullText(),
      path: `src/${fileName}`
    });
  }

  return files;
}

function emitOperation(
  operation: Operation,
  sourceFile: SourceFile,
  imports: Record<string, Set<string>>
) {
  const parameters: OptionalKind<ParameterDeclarationStructure>[] = (
    operation.bodyParameter?.type.properties ?? []
  )
    .filter((p) => !p.optional)
    .map((p) => buildParameterType(p, imports));

  parameters.concat(
    operation.parameters
      .filter(
        (p) =>
          p.implementation === "Method" &&
          p.type.type !== "constant" &&
          !p.optional
      )
      .map((p) => buildParameterType(p, imports))
  );

  parameters.unshift({ name: "context", type: "Client" });
  const optionsType = emitOptionsInterface(operation, sourceFile, imports);
  parameters.push({ name: "options", type: optionsType, initializer: "{}" });

  sourceFile.addFunction({
    docs: [operation.description],
    isAsync: true,
    isExported: true,
    name: operation.name,
    parameters
  });
}

function emitOptionsInterface(
  operation: Operation,
  sourceFile: SourceFile,
  imports: Record<string, Set<string>>
): string {
  const optionalParameters = operation.parameters.filter((p) => p.optional);
  const optionalBodyParams = (
    operation.bodyParameter?.type.properties ?? []
  ).filter((p) => p.optional);
  const options = [...optionalBodyParams, ...optionalParameters];
  const name = `${operation.name}Options`;
  sourceFile.addInterface({
    name,
    properties: options.map((p) => {
      return {
        docs: [p.description],
        hasQuestionToken: true,
        ...buildParameterType(p, imports)
      };
    })
  });

  return name;
}

function buildParameterType(
  p: Parameter | Property,
  imports: Record<string, Set<string>>
) {
  let typeMetadata = getType(p.type);
  let typeName = typeMetadata.name;
  if (typeMetadata.modifier === "Array") {
    typeName = `${typeName}[]`;
  }
  if (typeMetadata.originModule) {
    if (!imports[typeMetadata.originModule!]) {
      imports[typeMetadata.originModule] = new Set();
    }

    imports[typeMetadata.originModule]!.add(typeMetadata.name);
  }
  return { name: p.clientName, type: typeName };
}
