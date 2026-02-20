import { SdkContext } from "../../utils/interfaces.js";
import { getMethodHierarchiesMap } from "../../utils/operationUtil.js";

/**
 * Check whether any samples would be generated for this context.
 * Pure computation — no JSX, no Alloy, no ts-morph.
 */
export function hasSamples(dpgContext: SdkContext): boolean {
  for (const client of dpgContext.sdkPackage.clients) {
    const methodMap = getMethodHierarchiesMap(dpgContext, client);
    for (const [, operations] of methodMap) {
      for (const op of operations) {
        if (op.operation.examples && op.operation.examples.length > 0) {
          return true;
        }
      }
    }
  }
  return false;
}
