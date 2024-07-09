import { SdkModelType } from "@azure-tools/typespec-client-generator-core";
import {
  InterfaceDeclaration,
  InterfaceDeclarationStructure,
  PropertySignatureStructure,
  SourceFile,
  StructureKind
} from "ts-morph";
import { emitTypeReference } from "./reference.js";
import { useDeclarations } from "../context/declarations.js";
import { toCamelCase } from "../utils/casingUtils.js";

export function emitModel(
  type: SdkModelType,
  sourceFile: SourceFile
): InterfaceDeclaration {
  const [addDeclaration] = useDeclarations();
  const baseModel = type.baseModel
    ? [emitTypeReference(type.baseModel)]
    : undefined;

  const isExported = type.isGeneratedName ? false : true;

  const properties = type.properties.map((p) => {
    const docs = p.description ? [p.description] : [];
    const property: PropertySignatureStructure = {
      kind: StructureKind.PropertySignature,
      name: `"${toCamelCase(p.name)}"`,
      type: emitTypeReference(p.type),
      docs: docs,
      hasQuestionToken: p.optional
    };

    return property;
  });

  const name = type.name;

  const docs = type.description ? [type.description] : [];

  if (type.isGeneratedName) {
    docs.push(`This interface for an anonymous model`);
  }

  const model: InterfaceDeclarationStructure = {
    kind: StructureKind.Interface,
    name,
    extends: baseModel,
    docs,
    isExported,
    properties
  };

  const modelInterface = sourceFile.addInterface(model);

  addDeclaration(type.__raw!, {
    kind: "interface",
    sourceFile,
    symbolName: name
  });

  return modelInterface;
}
