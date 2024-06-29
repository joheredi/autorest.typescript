import {
  SdkModelType,
  SdkType
} from "@azure-tools/typespec-client-generator-core";

export function getDeserializer(type: SdkType, propertyPath: string) {
  let deserializableType = type;
  if (type.kind === "nullable") {
    deserializableType = type.type;
  }
  const functionName = getDeserializerName(deserializableType);
  return `${functionName}(${propertyPath}, ${getDeserializerArgs(
    deserializableType
  )})`;
}

function getDeserializerArgs(type: SdkType) {
  if (type.kind === "dict") {
    return getDeserializerName(type.valueType);
  }

  return "";
}

export function getModelDeserializerName(type: SdkModelType) {
  return `deserialize${type.name}`;
}

export function getDeserializerName(type: SdkType) {
  if (type.kind === "nullable") {
    return getDeserializerName(type.type);
  }

  if (type.kind === "dict") {
    return "deserializeRecord";
  }

  if (type.kind === "model") {
    return getModelDeserializerName(type);
  }

  if (type.kind === "plainDate") {
    return "deserializePlainDate";
  }

  if (type.kind === "plainTime") {
    return "deserializePlainTime";
  }

  if (type.kind === "utcDateTime") {
    // TODO: Handle encoding
    return "deserializeUtcDateTime";
  }

  if (type.kind === "offsetDateTime") {
    return "deserializeOffsetDateTime";
  }

  if (type.kind === "duration") {
    return "deserializeDuration";
  }

  return "passthroughDeserializer";
}
