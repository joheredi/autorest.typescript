import { SdkType } from "@azure-tools/typespec-client-generator-core";
import { emitCredential } from "./emitCredential.js";
import { emitModel } from "./emitModel.js";
import { emitEnum } from "./emitEnum.js";
import { emitUnion } from "./emitUnion.js";

export interface EmitTypeOptions {
  emitInline?: boolean;
}

export function emitType(type: SdkType, options?: EmitTypeOptions): string {
  switch (type.kind) {
    case "array": {
      const valueType = emitType(type.valueType, options);
      return `(${valueType})[]`;
    }
    case "enum":
      return emitEnum(type, options);
    case "any":
      return "any";
    case "boolean":
      return "boolean";
    case "decimal":
    case "decimal128":
    case "float":
    case "float32":
    case "float64":
    case "integer":
    case "int16":
    case "int32":
    case "int64":
    case "int8":
    case "uint16":
    case "uint32":
    case "uint64":
    case "uint8":
    case "numeric":
    case "safeint":
      return "number";
    case "armId":
    case "uuid":
    case "azureLocation":
    case "eTag":
    case "endpoint":
    case "guid":
    case "ipAddress":
    case "ipV4Address":
    case "ipV6Address":
    case "password":
    case "plainDate":
    case "plainTime":
    case "string":
    case "uri":
    case "url":
      // TODO - what typespec produces uri, password?
      return "string";
    case "bytes":
      return "Uint8Array";
    case "constant":
      return JSON.stringify(type.value);
    case "duration":
      return emitType(type.wireType, options);
    case "credential":
      // Credential comes from @useAuth decorator
      return emitCredential(type);
    case "dict": {
      const valueType = emitType(type.valueType, options);
      return `Record<string, ${valueType}>`;
    }
    case "enumvalue":
      return JSON.stringify(type.value);
    case "model":
      return emitModel(type, options);
    case "nullable": {
      const nonNullableType = emitType(type.type, options);
      return `(${nonNullableType}) | null`;
    }
    case "offsetDateTime":
      return "string";
    case "tuple": {
      const types = type.values.map((v) => emitType(v, options)).join(", ");
      return `[${types}]`;
    }
    case "union":
      return emitUnion(type, options);
    case "utcDateTime":
      return "Date";

    default:
      return "any";
  }
}
