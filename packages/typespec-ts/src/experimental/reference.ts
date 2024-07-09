import {
  SdkType,
  isSdkBuiltInKind
} from "@azure-tools/typespec-client-generator-core";
import { getJsScalar } from "./scalar.js";
import { useContext } from "../contextManager.js";

export function emitTypeReference(type: SdkType): string {
  const emitQueue = useContext("emitQueue");

  if (isSdkBuiltInKind(type.kind)) {
    return getJsScalar(type);
  }

  switch (type.kind) {
    case "array": {
      let typeReference: string;
      if (isSdkBuiltInKind(type.valueType.kind)) {
        typeReference = getJsScalar(type.valueType);
      } else {
        typeReference = emitTypeReference(type.valueType);
      }
      return `${typeReference}[]`;
    }
    case "model": {
      emitQueue.add(type);
      return type.name;
    }
    case "enum":
    case "union": {
      const references: string[] = [];

      for (const value of type.values) {
        if (isSdkBuiltInKind(value.kind)) {
          references.push(getJsScalar(value));
        } else {
          references.push(emitTypeReference(value));
        }
      }
      return `(${references.join(" | ")})`;
    }

    case "dict": {
      let typeReference: string;
      if (isSdkBuiltInKind(type.valueType.kind)) {
        typeReference = getJsScalar(type.valueType);
      } else {
        typeReference = emitTypeReference(type.valueType);
      }
      return `Record<string, ${typeReference}>`;
    }

    case "enumvalue": {
      return JSON.stringify(type.value);
    }

    case "nullable": {
      const underlyingType = emitTypeReference(type.type);
      return `(${underlyingType}) | null`;
    }

    case "constant": {
      return JSON.stringify(type.value);
    }

    case "utcDateTime": {
      return "Date";
    }

    case "duration": {
      return type.encode === "seconds" ? "number" : "string";
    }

    default:
      throw new Error(`Unknown type kind: ${type.kind}`);
  }
}
