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

  const deserializerName = getDeserializerName(model);
  const restModel = rlcMetadata.get(model.__raw!);

  if (
    !restModel ||
    restModel.rlcType.usage?.includes(SchemaContext.Output) === false
  ) {
    return;
  }

  const restModelName = restModel?.rlcType.name + "Output";
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

    const deserializer = getDeserializer(
      property.type,
      `input["${wireName}"]`,
      { cast: getCasting(property.type) }
    );
    deserializeStatements.push(`  ${property.name}: ${deserializer},`);
  }

  // Need to reference internal types like PagedResult

  let deserializerBody = `return {
       ${deserializeStatements.join("\n")}
      };`;

  if (!model.properties?.length) {
    deserializerBody = `return input as ${model.name};`;
  }

  const output: string[] = [
    `
    function _${deserializerName}(input: ${restModelName}): ${model.name} {
      ${deserializerBody}
    }

    export const ${deserializerName} = withNullChecks(_${deserializerName});
    `
  ];

  // Handle polymorphic deserialization
  if (model.discriminatedSubtypes && model.discriminatorProperty) {
    const inputTypeName = `${model.name}Output`;
    const deserializerName = `deserialize${model.name}Union`;

    const discriminatorDeserializer = `
    function _${deserializerName}(input: ${inputTypeName}): ${model.name} {
        switch (input["${model.discriminatorProperty.name}"]) {
            ${Object.entries(model.discriminatedSubtypes)
              .map(([key, value]) => {
                return `case "${key}": return deserialize${value.name}(input as ${value.name});`;
              })
              .join("\n")}
            default: return ${deserializerName}(input);
        }
    }

    export const ${deserializerName} = withNullChecks(_${deserializerName});
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
