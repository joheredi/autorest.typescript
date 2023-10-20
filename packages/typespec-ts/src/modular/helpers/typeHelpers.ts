import { EnumValue, Type } from "../modularCodeModel.js";

export interface TypeMetadata {
  name: string;
  originModule?: string;
  isRelative?: boolean;
  modifier?: "Array";
  isNullable?: boolean;
}

function getAnonymousEnumName(values: EnumValue[]): string {
  return values
    .map((v) => (typeof v.value === "string" ? `"${v.value}"` : `${v.value}`))
    .join(" | ");
}

export function getType(type: Type, format?: string): TypeMetadata {
  switch (type.type) {
    case "Key":
      return {
        name: "KeyCredential",
        originModule: "@azure/core-auth",
        isRelative: false
      };
    case "OAuth2":
      return {
        name: "TokenCredential",
        originModule: "@azure/core-auth",
        isRelative: false
      };
    case "boolean":
      return { name: type.type, isNullable: type.nullable };
    case "constant": {
      let typeName: string = type.value?.toString() ?? "undefined";
      if (type.valueType?.type === "string") {
        typeName = type.value ? `"${type.value}"` : "undefined";
      }
      return { name: typeName, isNullable: type.nullable };
    }
    case "datetime":
      return { name: "Date", isNullable: type.nullable };
    case "enum":
      if (
        !type.name &&
        (!type?.valueType?.type ||
          !["string", "number"].includes(type?.valueType?.type))
      ) {
        throw new Error("Unable to process enum without name");
      }
      return {
        name: type.name ?? getAnonymousEnumName(type.values ?? []),
        isNullable: type.nullable,
        originModule: "models.js"
      };
    case "float":
    case "integer":
      return { name: "number", isNullable: type.nullable };
    case "byte-array":
      return { name: "Uint8Array", isNullable: type.nullable };
    case "list":
      if (!type.elementType) {
        throw new Error("Unable to process Array with no elementType");
      }
      return {
        name: getType(type.elementType, type.elementType.format).name,
        isNullable: type.nullable,
        modifier: "Array",
        originModule:
          type.elementType?.type === "model" ? "models.js" : undefined
      };
    case "model":
      return {
        name: type.name!,
        isNullable: type.nullable,
        originModule: "models.js"
      };
    case "string":
    case "duration":
      switch (format) {
        case "seconds":
          return { name: "number", isNullable: type.nullable };
        case "ISO8601":
        default:
          return { name: "string", isNullable: type.nullable };
      }
    case "combined": {
      if (!type.types) {
        throw new Error("Unable to process combined without combinedTypes");
      }
      const name = type.types
        .map((t) => {
          const sdkType = getTypeName(getType(t, t.format));
          return `${sdkType}`;
        })
        .join(" | ");
      return { name, isNullable: type.nullable };
    }
    case "dict":
      if (!type.elementType) {
        throw new Error("Unable to process dict without elemetType info");
      }
      return {
        name: `Record<string, ${getTypeName(
          getType(type.elementType, type.elementType.format)
        )}>`
      };
    case "any":
      return {
        name: `Record<string, any>`
      };
    default:
      // throw new Error(`Unsupported type ${type.type}`);
      return {
        name: `any`
      };
  }
}

function getTypeName(typeMetadata: TypeMetadata) {
  let typeName = typeMetadata.name;
  if (!typeName) {
    // TODO: Implement anonymoyus models Issue#2067
    console.warn("Anonymous models are not yet implemented");
    typeName = "// Anonymous models are not yet implemented\n any";
  }
  if (typeMetadata.modifier === "Array") {
    typeName = `${typeName}[]`;
  }
  return typeName;
}

/**
 * Gets the Typescript representation of a TypeSpec type
 */
export function buildType(
  clientName: string | undefined,
  type: Type | undefined,
  format: string | undefined
) {
  if (!type) {
    throw new Error("Type should be defined");
  }

  const typeMetadata = getType(type, format);
  let typeName = typeMetadata.name;
  if (!typeName) {
    // TODO: Implement anonymoyus models Issue#2067
    console.warn("Anonymous models are not yet implemented");
    typeName = "// Anonymous models are not yet implemented\n any";
  }

  if (typeMetadata.modifier === "Array") {
    typeName = `${typeName}[]`;
  }

  if (type.nullable) {
    typeName = `${typeName} | null`;
  }
  return { name: clientName ?? "", type: typeName };
}
