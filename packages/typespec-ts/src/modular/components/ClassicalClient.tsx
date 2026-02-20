import { refkey, Refkey } from "@alloy-js/core";
import {
  SdkClientType,
  SdkServiceOperation
} from "@azure-tools/typespec-client-generator-core";
import { getClassicalClientName } from "../helpers/namingHelpers.js";

// ── Refkey helpers ──────────────────────────────────────────────────────

/** Refkey for the classical client class */
export function classicalClientRefkey(
  client: SdkClientType<SdkServiceOperation>
): Refkey {
  return refkey(client, "classicalClient");
}

/**
 * Note: The full ClassicalClient JSX component is deferred to a future phase.
 * The classical client generation involves deeply imperative ts-morph code
 * (addClass, addMethod, addProperty) that requires a more substantial refactor
 * to express declaratively in JSX.
 *
 * For now, the existing buildClassicalClient.ts continues to be used,
 * and these refkeys are exported for other components to reference.
 */
export function getClassicalClientDisplayName(
  client: SdkClientType<SdkServiceOperation>
): string {
  return getClassicalClientName(client);
}
