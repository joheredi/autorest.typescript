import { toCamelCase, toPascalCase } from "../../utils/casingUtils.js";
import { Type as ModularType, Property, Type } from "../modularCodeModel.js";
import {
  getAllAncestors,
  getAllProperties,
  serializeRequestValue
} from "../helpers/operationHelpers.js";
import {
  getDeserializeFunctionName,
  isPolymorphicUnion,
  isSpecialHandledUnion,
  isSpecialUnionVariant
} from "../buildSerializeUtils.js";

import {
  Imports as RuntimeImports,
  addImportToSpecifier
} from "@azure-tools/rlc-common";
import { UsageFlags } from "@typespec/compiler";

export function buildModelSerializer(
  type: ModularType,
  runtimeImports: RuntimeImports
): string | undefined {
  if (type.usage && (type.usage & UsageFlags.Input) !== UsageFlags.Input) {
    return undefined;
  }

  if (!type.name) {
    throw new Error(`NYI Serialization of anonymous types`);
  }

  console.log(`${type.name} is ${type.type}`);

  const serializerName = `${toCamelCase(type.name)}Serializer`;

  const restModelName = `${type.name}`;
  const restModelNameAlias = `${type.name}Rest`;
  addImportToSpecifier(
    "rlcIndex",
    runtimeImports,
    `${restModelName} as ${restModelNameAlias}`
  );

  if (type.type === "model") {
    return `
  export function ${serializerName}(item: ${toPascalCase(
    type.name
  )}): ${restModelNameAlias} {
    return {
        ${getRequestModelMapping(type, "item", runtimeImports).join(",\n")}
    }
  }
  `;
  }

  if (type.type === "enum") {
    return `
    export function ${serializerName}(item: ${toPascalCase(
      type.name
    )}): ${restModelNameAlias} {
      return item;
    }
    `;
  }

  throw new Error(`NYI Serialization of type ${type.type}`);
}

/**
 *
 * This function helps translating an HLC request to RLC request,
 * extracting properties from body and headers and building the RLC response object
 */
export function getRequestModelMapping(
  modelPropertyType: Type,
  propertyPath: string = "body",
  runtimeImports: RuntimeImports,
  typeStack: Type[] = []
) {
  const props: string[] = [];
  const allParents = getAllAncestors(modelPropertyType);
  const properties: Property[] =
    getAllProperties(modelPropertyType, allParents) ?? [];
  if (properties.length <= 0) {
    return [];
  }
  if (isSpecialHandledUnion(modelPropertyType)) {
    const deserializeFunctionName = getDeserializeFunctionName(
      modelPropertyType,
      "serialize"
    );
    const definition = `${deserializeFunctionName}(${propertyPath})`;
    props.push(definition);
    return props;
  }
  for (const property of properties) {
    if (property.readonly) {
      continue;
    }
    const propertyFullName = `${propertyPath}.${property.clientName}`;
    if (property.type.type === "model") {
      let definition;
      if (property.type.coreTypeInfo === "ErrorType") {
        definition = `"${property.restApiName}": ${getNullableCheck(
          propertyFullName,
          property.type
        )} ${
          !property.optional ? "" : `!${propertyFullName} ? undefined :`
        } ${propertyFullName}`;
      } else if (typeStack.includes(property.type)) {
        const isSpecialModel = isSpecialUnionVariant(property.type);
        definition = `"${property.restApiName}": ${
          !property.optional
            ? `${propertyFullName}${isSpecialModel ? " as any" : ""}`
            : `!${propertyFullName} ? undefined : ${propertyFullName}${
                isSpecialModel ? " as any" : ""
              }`
        }`;
      } else if (isPolymorphicUnion(property.type)) {
        let nullOrUndefinedPrefix = "";
        if (property.optional || property.type.nullable) {
          nullOrUndefinedPrefix = `!${propertyFullName} ? ${propertyFullName} :`;
        }
        const deserializeFunctionName = getDeserializeFunctionName(
          property.type,
          "serialize"
        );
        definition = `"${property.restApiName}": ${nullOrUndefinedPrefix}${deserializeFunctionName}(${propertyFullName})`;
      } else {
        if (property.type.name) {
          const serializerName = `${toCamelCase(property.type.name)}Serializer`;
          definition = `"${property.restApiName}": ${serializerName}(${propertyPath}.${property.clientName})`;
        } else {
          definition = `"${property.restApiName}": ${getNullableCheck(
            propertyFullName,
            property.type
          )} ${
            !property.optional ? "" : `!${propertyFullName} ? undefined :`
          } {${getRequestModelMapping(
            property.type,
            `${propertyPath}.${property.clientName}${
              property.optional ? "?" : ""
            }`,
            runtimeImports,
            [...typeStack, property.type]
          )}}`;
        }
      }

      props.push(definition);
    } else if (typeStack.includes(property.type)) {
      const isSpecialModel = isSpecialUnionVariant(property.type);
      const definition = `"${property.restApiName}": ${
        !property.optional
          ? `${propertyFullName}${isSpecialModel ? " as any" : ""}`
          : `!${propertyFullName} ? undefined : ${propertyFullName}${
              isSpecialModel ? " as any" : ""
            }`
      }`;
      props.push(definition);
    } else {
      const dot = propertyPath.endsWith("?") ? "." : "";
      const clientValue = `${
        propertyPath ? `${propertyPath}${dot}` : `${dot}`
      }["${property.clientName}"]`;
      props.push(
        `"${property.restApiName}": ${serializeRequestValue(
          property.type,
          clientValue,
          runtimeImports,
          !property.optional,
          [...typeStack, property.type],
          property.format
        )}`
      );
    }
  }

  return props;
}

function getNullableCheck(name: string, type: Type) {
  if (!type.nullable) {
    return "";
  }

  return `${name} === null ? null :`;
}
