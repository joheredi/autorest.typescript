import {
  SdkModelType,
  SdkType
} from "@azure-tools/typespec-client-generator-core";
import { useDeclarations } from "../../context/declarations.js";
import { isAzureCoreErrorType } from "../../utils/modelUtils.js";
import { useContext } from "../../contextManager.js";

export interface DeserializerOptions {
  cast?: string;
  nameSuffix?: string;
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
  const nameSuffix = options?.nameSuffix ? options.nameSuffix : "";
  const functionName = getDeserializerName(deserializableType) + nameSuffix;

  return `${functionName}(${propertyPath} ${cast}, ${getDeserializerArgs(
    deserializableType
  )})`;
}

function getDeserializerArgs(type: SdkType) {
  if (type.kind === "dict" || type.kind === "array") {
    let deserializerName = getDeserializerName(type.valueType);

    if (
      type.valueType.kind === "model" &&
      type.valueType.discriminatedSubtypes
    ) {
      deserializerName = deserializerName + "Union";
    }

    if (type.valueType.kind === "dict" || type.valueType.kind === "array") {
      return `(i) => ${deserializerName}(i, ${getDeserializerName(
        type.valueType.valueType
      )})`;
    }

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
  const [_, getDeclaration] = useDeclarations();
  const modelName =
    getDeclaration(type.__raw!, "interface")?.symbolName ?? type.name;
  return `deserialize${modelName}`;
}

export function getDeserializerName(type: SdkType) {
  const { tcgcContext } = useContext("emitContext");

  if (type.kind === "nullable") {
    return getDeserializerName(type.type);
  }

  if (type.kind === "dict") {
    return "deserializeRecord";
  }

  if (type.kind === "array") {
    return "deserializeArray";
  }

  //TODO: Remove generatedName check when we generate interfaces for anonymous models
  if (
    type.kind === "model" &&
    !type.isGeneratedName &&
    !isAzureCoreErrorType(tcgcContext.program, type.__raw!)
  ) {
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
