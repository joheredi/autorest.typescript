import { LROStrategy, BaseResult, LROOperationState } from "./models";
import { OperationSpec } from "@azure/core-http";
import { terminalStates } from "./constants";

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

      const pollingSpec: OperationSpec = {
        ...lastOperation.spec,
        httpMethod: "GET",
        path: lastKnownPollingUrl
      };

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
      lastOperation;
      return lastOperation;
    }
  };
}
