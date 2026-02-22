import { SdkEnumType } from "@azure-tools/typespec-client-generator-core";
import { getTypeExpression, EmitTypeOptions } from "./get-type-expression.js";
import { shouldEmitInline } from "./utils.js";
import { SdkContext } from "../../utils/interfaces.js";
import { normalizeModelName } from "../model-utils.js";

export function getEnumExpression(
  context: SdkContext,
  type: SdkEnumType,
  options: EmitTypeOptions = {}
): string {
  if (shouldEmitInline(type, options)) {
    return !isExtensibleEnum(context, type)
      ? type.values.map((v) => getTypeExpression(context, v)).join(" | ")
      : getTypeExpression(context, type.valueType);
  } else {
    return normalizeModelName(context, type);
  }
}

export function isExtensibleEnum(
  context: SdkContext,
  type: SdkEnumType
): boolean {
  return (
    !type.isFixed && context.rlcOptions?.experimentalExtensibleEnums === true
  );
}
