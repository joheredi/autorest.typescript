import {
  SdkModelType,
  UsageFlags,
  getWireName
} from "@azure-tools/typespec-client-generator-core";
import {
  getDeserializer,
  getDeserializerName
} from "../helpers/deserializers.js";
import { useContext } from "../../contextManager.js";

/**
 * This function generates the deserializer function for the given model
 */
export function buildModelDeserializer(model: SdkModelType) {
  if (
    model.usage !== undefined &&
    (model.usage & UsageFlags.Input) !== UsageFlags.Input
  ) {
    return undefined;
  }

  const rlcMetadata = useContext("rlcMetaTree");
  const { tcgcContext } = useContext("emitContext");

  const deserializerName = getDeserializerName(model);
  const restModel = rlcMetadata.get(model.__raw!);
  const restModelName = restModel?.rlcType.name + "Output";
  const deserializeStatements: string[] = [];

  // If the model has a base model, we need to deserialize the base model first
  if (model.baseModel) {
    const baseDeserializer = getDeserializer(model.baseModel, `input`);
    deserializeStatements.push(`  ...${baseDeserializer},`);
  }

  // Then we deserialize each property of the model
  for (const property of model.properties) {
    const deserializer = getDeserializer(
      property.type,
      `input["${getWireName(tcgcContext, property as any)}"]`
    );
    deserializeStatements.push(`  ${property.name}: ${deserializer},`);
  }

  const output: string[] = [
    `
    function _${deserializerName}(input: ${restModelName}): ${model.name} {
      return {
       ${deserializeStatements.join("\n")}
      };
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
