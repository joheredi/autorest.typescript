import {
  SdkModelType,
  SdkType
} from "@azure-tools/typespec-client-generator-core";

export interface DeserializerOptions {
  cast?: string;
}

export function getDeserializer(
  type: SdkType,
  propertyPath: string,
  options?: DeserializerOptions
) {
  let deserializableType = type;
  if (type.kind === "nullable") {
    deserializableType = type.type;
  }
  const cast = options?.cast ? ` as ${options.cast}` : "";
  const functionName = getDeserializerName(deserializableType);
  return `${functionName}(${propertyPath} ${cast}, ${getDeserializerArgs(
    deserializableType
  )})`;
}

function getDeserializerArgs(type: SdkType) {
  if (type.kind === "dict" || type.kind === "array") {
    const deserializerName = getDeserializerName(type.valueType);

    if (
      deserializerName !== "passthroughDeserializer" &&
      "encode" in type.valueType
    ) {
      return `(i) => ${deserializerName}(i, "${type.valueType.encode}")`;
    } else {
      return deserializerName;
    }
  }

  if (type.kind === "bytes") {
    return `"${type.encode}"`;
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

  if (type.kind === "array") {
    return "deserializeArray";
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
    if (type.encode === "ISO8601") {
      return "deserializeStringDuration";
    }
    if (type.encode === "seconds") {
      return "deserializeNumericDuration";
    }
  }

  if (type.kind === "bytes") {
    return "deserializeBytes";
  }

  return "passthroughDeserializer";
}
