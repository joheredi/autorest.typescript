import { refkey, Refkey } from "@alloy-js/core";
import { ServiceOperation } from "../../utils/operationUtil.js";

// Refkey for a public operation function
export function operationRefkey(operation: ServiceOperation): Refkey {
  return refkey(operation, "api");
}

/**
 * Operations component - placeholder.
 *
 * Operation generation is still handled by the ts-morph pipeline
 * (buildOperationFiles in index.ts) because operationHelpers.ts (2,710 lines)
 * has deep resolveReference() usage that requires Phase 2+ to migrate.
 *
 * This file exports refkey helpers that other components can use to
 * reference operations.
 */
