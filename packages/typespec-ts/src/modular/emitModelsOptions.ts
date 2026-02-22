// ====================================================================
// DEAD CODE FILE - This entire file is unused as of Phase 5-6
// buildOperationOptions() and buildApiOptions() were replaced by Operations.tsx
// Functions stubbed out to remove ts-morph Project dependency
// Can be deleted in future cleanup
// ====================================================================

import { ModularEmitterOptions } from "./interfaces.js";
import { SdkContext } from "../utils/interfaces.js";
import {
  SdkClientType,
  SdkServiceOperation
} from "@azure-tools/typespec-client-generator-core";
import { ServiceOperation } from "../utils/operationUtil.js";

/**
 * STUB - This function is unused. Operations are now generated via Operations.tsx component.
 */
export function buildOperationOptions(
  _context: SdkContext,
  _method: [string[], ServiceOperation],
  _sourceFile: any
) {
  // Dead code - no-op
}

/**
 * STUB - This function is unused. Operations are now generated via Operations.tsx component.
 */
export function buildApiOptions(
  _context: SdkContext,
  _clientMap: [string[], SdkClientType<SdkServiceOperation>],
  _emitterOptions: ModularEmitterOptions
): any[] {
  // Dead code - return empty array
  return [];
}
