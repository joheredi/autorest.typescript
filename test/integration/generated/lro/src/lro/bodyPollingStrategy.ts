/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  LROStrategy,
  BaseResult,
  LROOperationStep,
  LROResponseInfo
} from "./models";
import { OperationSpec, OperationArguments } from "@azure/core-http";
import { terminalStates } from "./constants";
import { SendOperationFn } from "./lroPoller";
import { shouldDeserializeLRO } from "./requestUtils";

/**
 * Creates a polling strategy based on BodyPolling which uses the provisioning state
 * from the result to determine the current operation state
 */
export function createBodyPollingStrategy<TResult extends BaseResult>(
  initialOperation: LROOperationStep<TResult>,
  sendOperation: SendOperationFn<TResult>
): LROStrategy<TResult> {
  if (!initialOperation.result._lroData) {
    throw new Error("Expected lroData to be defined for BodyPolling strategy");
  }
  let operationArgs: OperationArguments;

  const shouldDeserialize = shouldDeserializeLRO(
    initialOperation.result._lroData
  );

  if (!initialOperation.args) {
    operationArgs = { options: { shouldDeserialize: shouldDeserialize } };
  } else {
    operationArgs = {
      ...initialOperation.args,
      options: {
        ...initialOperation.args.options,
        shouldDeserialize: shouldDeserialize
      }
    };
  }

  return {
    isTerminal: (currentResult: LROResponseInfo) => {
      if (!initialOperation.result._lroData) {
        throw new Error("Expected lroData to determine terminal status");
      }

      const { provisioningState = "succeeded" } = currentResult;
      // If provisioning state is missing, default to Success

      return terminalStates.includes(provisioningState.toLowerCase());
    },
    sendFinalRequest: (currentOperation: LROOperationStep<TResult>) => {
      // BodyPolling doesn't require a final get so return the lastOperation
      return Promise.resolve(currentOperation);
    },
    poll: async (_currentResult: LROOperationStep<TResult>) => {
      // When doing BodyPolling, we need to poll to the original url with a
      // GET http method
      const { requestBody, ...restSpec } = initialOperation.spec;
      const pollingSpec: OperationSpec = {
        // Make sure we don't send any body to the get request
        ...restSpec,
        httpMethod: "GET"
      };

      // Execute the polling operation
      initialOperation.result = await sendOperation(operationArgs, pollingSpec);
      return initialOperation;
    }
  };
}
