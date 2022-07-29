import { MethodSignatureStructure, OptionalKind, SourceFile } from "ts-morph";
import { Operation, OperationGroup, Paths } from "../interfaces";
import { buildMethodDefinitions } from "./operationHelpers";

export function addShortcuts(
  shortcuts: Record<string, OptionalKind<MethodSignatureStructure>[]>,
  file: SourceFile
) {
  for (const groupName of Object.keys(shortcuts)) {
    const groupOperations = shortcuts[groupName];

    file.addInterface({
      docs: [
        // TODO: Add descriptions
        `Contains operations for ${groupName} operations`
      ],
      name: `${groupName}Operations`,
      isExported: true,
      methods: groupOperations
    });
  }
}

export function getShortcutInterfaces(
  operationGroups: OperationGroup[],
  paths: Paths
): Record<string, OptionalKind<MethodSignatureStructure>[]> {
  let keys: Record<string, OptionalKind<MethodSignatureStructure>[]> = {};
  for (const group of operationGroups) {
    keys[group.name] = getOperationShortcut(group.operations, paths);
  }
  return keys;
}

export function getOperationShortcut(
  operations: Operation[],
  paths: Paths
): OptionalKind<MethodSignatureStructure>[] {
  let ops: OptionalKind<MethodSignatureStructure>[] = [];

  for (const { path, verb, name } of operations) {
    const methods = paths[path]?.methods[verb];
    const pathParams = paths[path]?.pathParameters;
    const methodDefinitions = buildMethodDefinitions(
      { [name]: methods },
      pathParams
    );
    ops = [...ops, ...methodDefinitions];
  }
  return ops;
}
