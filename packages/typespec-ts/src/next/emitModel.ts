import { SdkModelType } from "@azure-tools/typespec-client-generator-core";
import { resolveReference } from "../framework/reference.js";
import { emitType, EmitTypeOptions } from "./emitType.js";
import { shouldEmitInline } from "./utils/type-utils.js";

export function emitModel(
  type: SdkModelType,
  options: EmitTypeOptions = {}
): string {
  if (shouldEmitInline(type, options)) {
    return `{
      ${type.properties
        .map((p) => `"${p.name}": ${emitType(p.type, options)}`)
        .join(",\n")}
    }`;
  } else {
    return resolveReference(type);
  }
}
