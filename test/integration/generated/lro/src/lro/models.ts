/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OperationArguments,
  OperationSpec,
  RestResponse
} from "@azure/core-http";
import { PollOperationState, PollOperation } from "@azure/core-lro";

export type FinalStateVia =
  | "azure-async-operation"
  | "location"
  | "original-uri";

export interface BaseResult extends RestResponse {
  /**
   * Header containing polling URL for Location based LROs
   */
  location?: string;
  /**
   * Header containing polling URL for  Azure-AsyncOperations based LROs
   */
  azureAsyncOperation?: string;
  /**
   * Alternative Header containing polling URL for  Azure-AsyncOperations based LROs.
   * Same behavior expected as with azureAsyncOperation
   */
  operationLocation?: string;
  /**
   * Property used by OriginalUri LROs to communicate the operation status
   */
  provisioningState?: string;
  /**
   * Property used by Azure-AsyncOperations LROs to communicate the operation status
   */
  status?: string;
  /**
   * Property used by OriginalUri LROs to communicate the operation status
   */
  properties?: {
    provisioningState?: string;
  };
}

export interface LastOperation<TResult extends BaseResult> {
  args: OperationArguments;
  spec: OperationSpec;
  result: TResult;
}

export interface LROOperationState<TResult extends BaseResult>
  extends PollOperationState<TResult> {
  lastOperation: LastOperation<TResult>;
  sendOperation: (
    args: OperationArguments,
    spec: OperationSpec
  ) => Promise<TResult>;
  finalStateVia?: FinalStateVia;
  pollingStrategy?: LROStrategy<TResult>;
}

export interface LROStrategy<TResult extends BaseResult> {
  isTerminal: () => boolean;
  sendFinalRequest: () => Promise<LastOperation<TResult>>;
  poll: () => Promise<LastOperation<TResult>>;
}

export type LROOperation<TResult extends BaseResult> = PollOperation<
  LROOperationState<TResult>,
  TResult
>;
