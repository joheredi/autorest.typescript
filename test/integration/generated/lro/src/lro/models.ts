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
  RestResponse,
  HttpMethods,
  HttpOperationResponse
} from "@azure/core-http";
import { PollOperationState, PollOperation } from "@azure/core-lro";
export const LROSYM = Symbol("LROData");

export type FinalStateVia =
  | "azure-async-operation"
  | "location"
  | "original-uri";

export interface LROResponseInfo {
  requestMethod: HttpMethods;
  statusCode: number;
  isInitialRequest?: boolean;
  azureAsyncOperation?: string;
  operationLocation?: string;
  location?: string;
  provisioningState?: string;
  status?: string;
}

export interface BaseResult extends RestResponse {
  /**
   * The underlying HTTP response containing both raw and deserialized response data.
   */
  _response: HttpOperationResponse & {
    [LROSYM]?: LROResponseInfo;
  };
}

export interface LROOperationStep<TResult extends BaseResult> {
  args: OperationArguments;
  spec: OperationSpec;
  result: TResult;
}

export interface LROOperationState<TResult extends BaseResult>
  extends PollOperationState<TResult> {
  lastOperation: LROOperationStep<TResult>;
  initialOperation: LROOperationStep<TResult>;
  pollingStrategy: LROStrategy<TResult>;
  finalStateVia?: FinalStateVia;
}

export interface LROStrategy<TResult extends BaseResult> {
  isTerminal: () => boolean;
  sendFinalRequest: () => Promise<LROOperationStep<TResult>>;
  poll: () => Promise<LROOperationStep<TResult>>;
}

export type LROOperation<TResult extends BaseResult> = PollOperation<
  LROOperationState<TResult>,
  TResult
>;
