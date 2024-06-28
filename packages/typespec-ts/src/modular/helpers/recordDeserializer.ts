import { SdkModelPropertyType } from "@azure-tools/typespec-client-generator-core";
import { getDeserializerName } from "./deserializers.js";

export function getRecordPropertyDeserializer(
  type: SdkModelPropertyType,
  propertyPath: string
) {
  const dictionary = type.type;

  if (dictionary.kind !== "dict") {
    throw new Error("Expected dictionary type");
  }

  let deserializableType = dictionary.valueType;

  if (deserializableType.kind === "nullable") {
    deserializableType = deserializableType.type;
  }

  return `${
    type.name
  }: deserializeRecord(${propertyPath}, ${getDeserializerName(
    deserializableType
  )})`;
}
