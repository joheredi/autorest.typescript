import { refkey, Refkey } from "@alloy-js/core";
import {
  SdkClientType,
  SdkServiceOperation
} from "@azure-tools/typespec-client-generator-core";
import { getClientName } from "../helpers/namingHelpers.js";

// ── Refkey helpers ──────────────────────────────────────────────────────

/** Refkey for the client context interface */
export function clientContextRefkey(
  client: SdkClientType<SdkServiceOperation>
): Refkey {
  return refkey(client, "clientContext");
}

/** Refkey for the client context factory function */
export function clientContextFactoryRefkey(
  client: SdkClientType<SdkServiceOperation>
): Refkey {
  return refkey(client, "clientContextFactory");
}

/** Refkey for the client optional params interface */
export function clientOptionalParamsRefkey(
  client: SdkClientType<SdkServiceOperation>
): Refkey {
  return refkey(client, "clientOptionalParams");
}

/**
 * Note: The full ClientContext JSX component is deferred to a future phase.
 * The client context generation involves deeply imperative ts-morph code
 * (addStatements, factoryFunction manipulation) that requires a more
 * substantial refactor to express declaratively in JSX.
 *
 * For now, the existing buildClientContext.ts continues to be used,
 * and these refkeys are exported for other components to reference.
 */
export function getClientContextName(
  client: SdkClientType<SdkServiceOperation>
): string {
  return getClientName(client);
}
