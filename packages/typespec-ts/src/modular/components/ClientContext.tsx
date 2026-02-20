import { refkey, Refkey } from "@alloy-js/core";
import {
  SdkClientType,
  SdkServiceOperation
} from "@azure-tools/typespec-client-generator-core";
import { getClientName } from "../helpers/namingHelpers.js";

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
 * ClientContext component - placeholder.
 *
 * Client context generation is still handled by the ts-morph pipeline
 * (buildClientContext in index.ts) because it has deep imperative
 * ts-morph usage. Will be converted to full JSX in Phase 3a.
 */
export function getClientContextName(
  client: SdkClientType<SdkServiceOperation>
): string {
  return getClientName(client);
}
