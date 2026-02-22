import { SdkUnionType } from "@azure-tools/typespec-client-generator-core";
import { getTypeExpression, EmitTypeOptions } from "./get-type-expression.js";
import { shouldEmitInline } from "./utils.js";
import { SdkContext } from "../../utils/interfaces.js";
import { normalizeModelName } from "../model-utils.js";

export function getUnionExpression(
  context: SdkContext,
  type: SdkUnionType,
  options: EmitTypeOptions = {}
): string {
  if (shouldEmitInline(type, options)) {
    const variantTypes = new Set(
      type.variantTypes.map((v) => `${getTypeExpression(context, v, options)}`)
    );
    return `(${[...variantTypes].join(" | ")})`;
  } else {
    return normalizeModelName(context, type);
  }
}
