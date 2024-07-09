import {
  isSdkBuiltInKind,
  SdkEnumType,
  SdkUnionType
} from "@azure-tools/typespec-client-generator-core";
import { SourceFile, TypeAliasDeclaration } from "ts-morph";
import { emitTypeReference } from "./reference.js";
import { useDeclarations } from "../context/declarations.js";

export function emitUnion(
  type: SdkUnionType | SdkEnumType,
  sourceFile: SourceFile
): TypeAliasDeclaration {
  const types: string[] = [];
  const [addDeclaration] = useDeclarations();
  for (const value of type.values) {
    if (isSdkBuiltInKind(value.kind)) {
      types.push(value.kind);
    } else {
      types.push(emitTypeReference(value));
    }
  }

  const unionType = `(${types.join(" | ")})`;

  const declaration = sourceFile.addTypeAlias({
    name: type.name,
    type: unionType
  });

  addDeclaration(type.__raw!, {
    kind: "union",
    sourceFile,
    symbolName: type.name
  });

  return declaration;
}
