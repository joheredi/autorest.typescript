import { SdkUnionType } from "@azure-tools/typespec-client-generator-core";
import { resolveReference } from "../../framework/reference.js";
import { emitType, EmitTypeOptions } from "./emitType.js";
import { shouldEmitInline } from "../utils/type-utils.js";

export function emitUnion(
  type: SdkUnionType,
  options: EmitTypeOptions = {}
): string {
  if (shouldEmitInline(type, options)) {
    return `(${type.values.map((v) => `${emitType(v, options)}`).join(" | ")})`;
  } else {
    return resolveReference(type);
  }
}
