import {
  SdkModelType,
  SdkType,
  UsageFlags
} from "@azure-tools/typespec-client-generator-core";
import {
  getDeserializer,
  getDeserializerName
} from "../helpers/deserializers.js";
import { useContext } from "../../contextManager.js";
import { SchemaContext } from "@azure-tools/rlc-common";
import { useDeclarations } from "../../context/declarations.js";
import { toCamelCase } from "../../utils/casingUtils.js";

/**
 * This function generates the deserializer function for the given model
 */
export function buildModelDeserializer(model: SdkModelType) {
  if (
    model.usage !== undefined &&
    (model.usage & UsageFlags.Output) !== UsageFlags.Output
  ) {
    return undefined;
  }

  const rlcMetadata = useContext("rlcMetaTree");
  const [_, getDeclaration] = useDeclarations();
  const deserializerName = getDeserializerName(model);
  const restModel = rlcMetadata.get(model.__raw!);

  if (
    !restModel ||
    restModel.rlcType.usage?.includes(SchemaContext.Output) === false
  ) {
    return;
  }

  const restModelName = restModel?.rlcType.name
    ? `${restModel?.rlcType.name}Output`
    : "any";

  const deserializeStatements: string[] = [];

  // If the model has a base model, we need to deserialize the base model first
  if (model.baseModel) {
    const baseDeserializer = getDeserializer(model.baseModel, `input`);
    deserializeStatements.push(`  ...${baseDeserializer},`);
  }

  // Then we deserialize each property of the model
  for (const property of model.properties) {
    let wireName = property.name;

    if ("serializedName" in property) {
      wireName = property.serializedName ?? property.name;
    }

    let nameSuffix;
    if (property.type.kind === "model" && property.type.discriminatedSubtypes) {
      nameSuffix = "Union";
    }

    const deserializer = getDeserializer(
      property.type,
      `input["${wireName}"]`,
      { cast: getCasting(property.type), nameSuffix }
    );

    let cast = `as any`;
    if ("isGeneratedName" in property.type && property.type.isGeneratedName) {
      cast = ` as any`;
    }

    if (
      "valueType" in property.type &&
      "isGeneratedName" in property.type.valueType &&
      property.type.valueType.isGeneratedName
    ) {
      cast = ` as any`;
    }

    deserializeStatements.push(
      `  "${toCamelCase(property.name)}": ${deserializer}${cast},`
    );
  }
  const returnType =
    getDeclaration(model.__raw!, "interface")?.symbolName ?? model.name;
  // Need to reference internal types like PagedResult

  const cast = restModelName === "any" ? ` as any` : `as any`;

  let deserializerBody = `return {
       ${deserializeStatements.join(`\n`)}
      } ${cast};`;

  if (!model.properties?.length) {
    deserializerBody = `return input as ${returnType};`;
  }

  const output: string[] = [
    `
    function _${deserializerName}(input: ${restModelName}): ${returnType} {
      ${deserializerBody}
    }

    export const ${deserializerName} = withNullChecks(_${deserializerName});
    `
  ];

  // Handle polymorphic deserialization
  if (model.discriminatedSubtypes && model.discriminatorProperty) {
    const inputTypeName = model.name ? `${model.name}Output` : "any";
    const unionDeserializerName = `deserialize${returnType}Union`;
    const defaultDeserializerName = `deserialize${returnType}`;

    const discriminatorDeserializer = `
    function _${unionDeserializerName}(input: ${inputTypeName}): ${returnType} {
        switch (input["${model.discriminatorProperty.name}"]) {
            ${Object.entries(model.discriminatedSubtypes)
              .map(([key, value]) => {
                return `case "${key}": return deserialize${value.name}(input as ${value.name});`;
              })
              .join("\n")}
            default: return ${defaultDeserializerName}(input);
        }
    }

    export const ${unionDeserializerName} = withNullChecks(_${unionDeserializerName});
    `;
    output.push(discriminatorDeserializer);
  }

  return output.join("\n");
}

function getCasting(type: SdkType): string | undefined {
  if ("isFixed" in type && type.isFixed !== true) {
    return "any";
  }

  return undefined;
}
