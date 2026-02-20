import { refkey, Refkey } from "@alloy-js/core";
import {
  SdkClientType,
  SdkServiceOperation
} from "@azure-tools/typespec-client-generator-core";

/** Refkey for the restore poller function */
export function restorePollerRefkey(
  client: SdkClientType<SdkServiceOperation>
): Refkey {
  return refkey(client, "restorePoller");
}

/**
 * RestorePoller component - placeholder.
 *
 * LRO restore poller generation is still handled by the ts-morph pipeline.
 * Will be converted to full JSX in a later phase.
 */
