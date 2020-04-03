import { LROStrategy, BaseResult, LROOperationState } from "./models";
import { OperationSpec, OperationResponse } from "@azure/core-http";
import { terminalStates } from "./constants";
import { isEmpty } from "lodash";

export function createAzureAsyncOperationStrategy<TResult extends BaseResult>({
  lastOperation: operation,
  sendOperation,
  finalStateVia
}: LROOperationState<TResult>): LROStrategy<TResult> {
  const originalOperation = operation;
  let pollCount = 0;
  let lastOperation = { ...operation };
  let lastKnownPollingUrl =
    originalOperation.result.azureAsyncOperation ||
    originalOperation.result.operationLocation;

  return {
    isTerminal: () => {
      if (pollCount === 0) {
        // Azure-AsyncOperations don't need to check for terminal state
        // on originalOperation result, always need to poll
        return false;
      }

      const status = (lastOperation.result.status || "succeeded").toLowerCase();
      return terminalStates.includes(status);
    },
    sendFinalRequest: async () => {
      if (
        lastOperation.result.status &&
        lastOperation.result.status.toLowerCase() !== "succeeded"
      ) {
        return lastOperation;
      }

      const originalMethod = originalOperation.spec.httpMethod;
      const finalGetSpec: OperationSpec = {
        ...originalOperation.spec,
        httpMethod: "GET"
      };

      const sendFinalGet = async (path?: string) => {
        // Send final GET request to the Original URL
        const finalResult = await sendOperation(originalOperation.args, {
          ...finalGetSpec,
          ...(path && { path })
        });
        lastOperation.result = finalResult;

        return lastOperation;
      };

      // DELETE operations do not require a final GET, just return the lastOperation
      if (originalMethod === "DELETE") {
        return lastOperation;
      }

      if (originalMethod === "PUT") {
        return sendFinalGet();
      }

      if (originalOperation.result.location) {
        switch (finalStateVia) {
          case "original-uri":
            return sendFinalGet();
          case "azure-async-operation":
            return lastOperation;
          case "location":
          default:
            const location =
              lastOperation.result.location ||
              originalOperation.result.location;

            if (!location) {
              throw new Error("Couldn't determine final GET URL from location");
            }

            return sendFinalGet(location);
        }
      }

      // All other cases return the last operation
      return lastOperation;
    },
    poll: async () => {
      if (!lastKnownPollingUrl) {
        throw new Error("Unable to determine polling url");
      }

      const pollingSpec: OperationSpec = injectMissingResponses({
        ...lastOperation.spec,
        httpMethod: "GET",
        path: lastKnownPollingUrl
      });

      // Execute the polling operation
      pollCount += 1;
      const result = await sendOperation(lastOperation.args, pollingSpec);

      // Update latest polling url
      lastKnownPollingUrl =
        result.azureAsyncOperation ||
        result.operationLocation ||
        lastKnownPollingUrl;

      // Update lastOperation result
      lastOperation.result = result;
      return lastOperation;
    }
  };
}

/**
 * Temporary workaround for issue where SWAGGER doesn't define all possible response codes
 * for the polling operations
 */
function injectMissingResponses(operationSpec: OperationSpec): OperationSpec {
  const acceptedResponses = ["200", "201", "202", "204"];

  // Use an already defined accepted response as base;
  const baseResponse = acceptedResponses.reduce((acc, status) => {
    if (!isEmpty(acc)) {
      return acc;
    }

    const response = operationSpec.responses[status];
    if (response) {
      acc = response;
    }

    return acc;
  }, {} as OperationResponse);

  const responses = acceptedResponses.reduce((responses, status) => {
    let currentResponse = operationSpec.responses[status];
    if (!currentResponse) {
      currentResponse = { ...baseResponse };
    }

    return { ...responses, [`"${status}"`]: currentResponse };
  }, {} as { [responseCode: string]: OperationResponse });

  return { ...operationSpec, responses };
}
