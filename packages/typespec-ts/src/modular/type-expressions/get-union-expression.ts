import { SdkUnionType } from "@azure-tools/typespec-client-generator-core";
import { resolveReference } from "../../framework/reference.js";
import { getTypeExpression, EmitTypeOptions } from "./get-type-expression.js";
import { shouldEmitInline } from "./utils.js";

export function getUnionExpression(
  type: SdkUnionType,
  options: EmitTypeOptions = {}
): string {
  if (shouldEmitInline(type, options)) {
    const variantTypes = new Set(
      type.values.map((v) => `${getTypeExpression(v, options)}`)
    );
    return `(${[...variantTypes].join(" | ")})`;
  } else {
    return resolveReference(type);
  }
}
