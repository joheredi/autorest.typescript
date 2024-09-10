import { FunctionDeclarationStructure, StructureKind } from "ts-morph";
import {
  SdkDictionaryType,
  SdkEnumType,
  SdkModelType,
  SdkType,
  SdkUnionType
} from "@azure-tools/typespec-client-generator-core";
import { toCamelCase, toPascalCase } from "../../utils/casingUtils.js";

import { SdkContext } from "../../utils/interfaces.js";
import { UsageFlags } from "@typespec/compiler";
import { getResponseMapping } from "../helpers/operationHelpers.js";
import { getType } from "../buildCodeModel.js";
import { normalizeModelName } from "../emitModels.js";

function isSupportedSerializerType(type: SdkType): boolean {
  return (
    type.kind === "model" ||
    type.kind === "enum" ||
    type.kind === "dict" ||
    type.kind === "array" ||
    type.kind === "union"
  );
}

export function buildModelDeserializer(
  context: SdkContext,
  type: SdkType,
  skipDiscriminatedUnion = false,
  nameOnly: boolean = false
): FunctionDeclarationStructure | undefined | string {
  // const modelTcgcType = getTcgcType(type) as SdkModelType;
  if (!isSupportedSerializerType(type)) {
    return undefined;
  }
  if (type.kind === "model") {
    if (
      type.usage !== undefined &&
      (type.usage & UsageFlags.Input) !== UsageFlags.Input
    ) {
      return undefined;
    }
    if (!type.name) {
      throw new Error(`NYI Serialization of anonymous types`);
    }
  }

  if (
    !isDiscriminatedUnion(type) &&
    type.kind === "model" &&
    type.discriminatorProperty
  ) {
    return buildPolymorphicDeserializer(context, type, nameOnly);
  }

  if (isDiscriminatedUnion(type) && !skipDiscriminatedUnion) {
    return buildDiscriminatedUnionDeserializer(context, type, nameOnly);
  }

  switch (type.kind) {
    case "model":
      return buildModelTypeDeserializer(context, type, nameOnly);
    case "enum":
    case "union": // for non-discriminated union, we just return whatever we get
      return buildEnumDeserializer(context, type, nameOnly);
    case "dict":
      return buildDictTypeDeserializer(context, type, nameOnly);
    default:
      return undefined;
  }
}

function isDiscriminatedUnion(
  type: SdkType
): type is SdkModelType & { discriminatorProperty: SdkType } {
  return Boolean(
    type?.kind === "model" &&
      type.discriminatorProperty &&
      type.discriminatedSubtypes
  );
}

function hasAdditionalProperties(type: SdkType | undefined) {
  if (!type || !("additionalProperties" in type)) {
    return false;
  }

  if (type.additionalProperties) {
    return true;
  }

  if (type.baseModel) {
    return hasAdditionalProperties(type.baseModel);
  }

  return false;
}

function buildPolymorphicDeserializer(
  context: SdkContext,
  type: SdkModelType,
  nameOnly: boolean
): string;
function buildPolymorphicDeserializer(
  context: SdkContext,
  type: SdkModelType
): FunctionDeclarationStructure | undefined;
function buildPolymorphicDeserializer(
  context: SdkContext,
  type: SdkModelType,
  nameOnly = false
): FunctionDeclarationStructure | undefined | string {
  if (!type.name) {
    throw new Error(`NYI Serialization of anonymous types`);
  }
  const deserializeFunctionName = `${toCamelCase(
    normalizeModelName(context, type)
  )}UnionDeserializer`;
  if (nameOnly) {
    return deserializeFunctionName;
  }
  const deserializerFunction: FunctionDeclarationStructure = {
    kind: StructureKind.Function,
    name: deserializeFunctionName,
    isExported: true,
    parameters: [
      {
        name: "item",
        type: "any"
      }
    ],
    returnType: toPascalCase(normalizeModelName(context, type)),
    statements: []
  };
  if (!type.discriminatorProperty) {
    return;
  }
  const statements: string[] = [];

  const subTypes = type.discriminatedSubtypes;
  if (!subTypes) {
    return;
  }

  const cases: string[] = [];
  Object.keys(subTypes).forEach((discriminatedValue) => {
    const subType = subTypes[discriminatedValue];
    const union = subType?.discriminatedSubtypes ? "Union" : "";
    if (!subType || subType?.name) {
      throw new Error(`NYI Serialization of anonymous types`);
    }
    if (union !== "") {
      subType;
    }
    const subTypeName = `${toPascalCase(subType.name)}${union}`;
    const subtypeDeserializerName = toCamelCase(`${subTypeName}Deserializer`);

    cases.push(`
        case "${discriminatedValue}":
          return ${subtypeDeserializerName}(item as ${subTypeName});
      `);
  });

  statements.push(`
      switch (item.${type.discriminatorProperty.name}) {
       ${cases.join("\n")}
        default:
          return item;
      }
    `);
  deserializerFunction.statements = statements.join("\n");
  return deserializerFunction;
}

function buildDiscriminatedUnionDeserializer(
  context: SdkContext,
  type: SdkModelType,
  nameOnly: boolean
): string;
function buildDiscriminatedUnionDeserializer(
  context: SdkContext,
  type: SdkModelType
): FunctionDeclarationStructure | undefined;
function buildDiscriminatedUnionDeserializer(
  context: SdkContext,
  type: SdkModelType,
  nameOnly = false
): FunctionDeclarationStructure | undefined | string {
  if (!type.name) {
    throw new Error(`NYI Serialization of anonymous types`);
  }
  const cases: string[] = [];
  const output: string[] = [];
  const deserializeFunctionName = `${toCamelCase(
    normalizeModelName(context, type)
  )}UnionDeserializer`;
  if (nameOnly) {
    return deserializeFunctionName;
  }
  const baseDeserializerName = `${toCamelCase(
    normalizeModelName(context, type)
  )}Deserializer`;
  for (const key in type.discriminatedSubtypes) {
    const subType = type.discriminatedSubtypes[key]!;
    const discriminatedValue = subType.discriminatorValue!;
    const union = subType.discriminatedSubtypes ? "Union" : "";
    if (union !== "") {
      subType;
    }
    const subTypeName = `${toPascalCase(subType.name)}${union}`;
    const subtypeDeserializerName = toCamelCase(`${subTypeName}Deserializer`);

    cases.push(`
      case "${discriminatedValue}":
        return ${subtypeDeserializerName}(item as ${subTypeName});
    `);
  }
  output.push(`
    switch (item.${type.discriminatorProperty?.name}) {
     ${cases.join("\n")}
      default:
        return ${baseDeserializerName}(item);
    }
  `);

  const deserializerFunction: FunctionDeclarationStructure = {
    kind: StructureKind.Function,
    name: deserializeFunctionName,
    isExported: true,
    parameters: [
      {
        name: "item",
        type: "any"
      }
    ],
    returnType: toPascalCase(normalizeModelName(context, type)),
    statements: output.join("\n")
  };
  return deserializerFunction;
}

function buildEnumDeserializer(
  context: SdkContext,
  type: SdkEnumType | SdkUnionType,
  nameOnly: boolean
): string;
function buildEnumDeserializer(
  context: SdkContext,
  type: SdkEnumType | SdkUnionType
): FunctionDeclarationStructure;
function buildEnumDeserializer(
  context: SdkContext,
  type: SdkEnumType | SdkUnionType,
  nameOnly = false
): FunctionDeclarationStructure | string {
  if (!type.name) {
    throw new Error(`NYI Serialization of anonymous types`);
  }
  const deserializerFunctionName = `${toCamelCase(
    normalizeModelName(context, type)
  )}Deserializer`;
  if (nameOnly) {
    return deserializerFunctionName;
  }
  const deserializerFunction: FunctionDeclarationStructure = {
    kind: StructureKind.Function,
    name: `${toCamelCase(normalizeModelName(context, type))}Deserializer`,
    isExported: true,
    parameters: [
      {
        name: "item",
        type: "any"
      }
    ],
    returnType: toPascalCase(normalizeModelName(context, type)),
    statements: ["return item;"]
  };
  return deserializerFunction;
}

function buildModelTypeDeserializer(
  context: SdkContext,
  type: SdkModelType,
  nameOnly: boolean
): string;
function buildModelTypeDeserializer(
  context: SdkContext,
  type: SdkModelType
): FunctionDeclarationStructure;
function buildModelTypeDeserializer(
  context: SdkContext,
  type: SdkModelType,
  nameOnly = false
): FunctionDeclarationStructure | string {
  if (!type.name) {
    throw new Error(`NYI Deserialization of anonymous types`);
  }
  const deserializerFunctionName = `${toCamelCase(
    normalizeModelName(context, type)
  )}Deserializer`;
  if (nameOnly) {
    return deserializerFunctionName;
  }
  const deserializerFunction: FunctionDeclarationStructure = {
    kind: StructureKind.Function,
    name: `${toCamelCase(normalizeModelName(context, type))}Deserializer`,
    isExported: true,
    parameters: [
      {
        name: "item",
        type: "any"
      }
    ],
    returnType: toPascalCase(normalizeModelName(context, type)),
    statements: ["return item;"]
  };
  const nullabilityPrefix = "";
  // getPropertySerializationPrefix({
  //   clientName: "item",
  //   type
  // });

  // This is only handling the compatibility mode, will need to update when we handle additionalProperties property.
  const additionalPropertiesSpread = hasAdditionalProperties(type)
    ? "...item,"
    : "";

  const propertiesStr = getResponseMapping(
    context,
    getType(context, type.__raw!),
    "item"
  );
  const propertiesDeserialization = propertiesStr.filter((p) => p.trim());

  const output = [];

  // don't emit a serializer if there is nothing to serialize
  if (propertiesDeserialization.length || additionalPropertiesSpread) {
    const fnBody = `{
           ${additionalPropertiesSpread}
           ${nullabilityPrefix} ${propertiesDeserialization.join(",\n")}
        }`;
    output.push(`
        return ${fnBody}
      `);
  } else {
    output.push(`
        return item as any;
      `);
  }
  deserializerFunction.statements = output;
  return deserializerFunction;
}

function buildDictTypeDeserializer(
  context: SdkContext,
  type: SdkDictionaryType,
  nameOnly: boolean
): string;
function buildDictTypeDeserializer(
  context: SdkContext,
  type: SdkDictionaryType
): FunctionDeclarationStructure | undefined;
function buildDictTypeDeserializer(
  context: SdkContext,
  type: SdkDictionaryType,
  nameOnly = false
): FunctionDeclarationStructure | undefined | string {
  const valueDeserializer = buildModelDeserializer(context, type.valueType);
  if (!valueDeserializer) {
    return undefined;
  }
  if (!isSupportedSerializerType(type.valueType)) {
    return undefined;
  }

  if (typeof valueDeserializer === "string") {
    return undefined;
  }
  const valueTypeName = toCamelCase(
    valueDeserializer.name
      ? valueDeserializer.name.replace("Deserializer", "")
      : ""
  );
  const deserializerFunctionName = `${valueTypeName}RecordDeserializer`;
  if (nameOnly) {
    return deserializerFunctionName;
  }
  const deserializerFunction: FunctionDeclarationStructure = {
    kind: StructureKind.Function,
    name: `${valueTypeName}RecordDeserializer`,
    isExported: true,
    parameters: [
      {
        name: "item",
        type: "Record<string, any>"
      }
    ],
    returnType: `Record<string, ${normalizeModelName(context, type.valueType as any) ?? "any"}>`,
    statements: [
      `
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = ${valueDeserializer.name}(item[key])
  })
  return result;
      `
    ]
  };
  return deserializerFunction;
}
