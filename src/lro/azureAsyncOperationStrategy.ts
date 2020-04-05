import {
  LROStrategy,
  BaseResult,
  LROOperationState,
  LastOperation
} from "./models";
import { OperationSpec } from "@azure/core-http";
import { terminalStates } from "./constants";

export function createAzureAsyncOperationStrategy<TResult extends BaseResult>(
  state: LROOperationState<TResult>
): LROStrategy<TResult> {
  const { lastOperation: operation, sendOperation, finalStateVia } = state;
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
      if (!shouldPerformFinalGet(lastOperation, originalOperation)) {
        return lastOperation;
      }

      if (originalOperation.spec.httpMethod === "PUT") {
        lastOperation = await sendFinalGet(state, originalOperation);
        return lastOperation;
      }

      if (originalOperation.result.location) {
        switch (finalStateVia) {
          case "original-uri":
            lastOperation = await sendFinalGet(state, originalOperation);
            return lastOperation;
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

            lastOperation = await sendFinalGet(
              state,
              originalOperation,
              location
            );
            return lastOperation;
        }
      }

      // All other cases return the last operation
      return lastOperation;
    },
    poll: async () => {
      if (!lastKnownPollingUrl) {
        throw new Error("Unable to determine polling url");
      }

      const pollingArgs = lastOperation.args;
      const pollingSpec: OperationSpec = {
        ...lastOperation.spec,
        httpMethod: "GET",
        path: lastKnownPollingUrl
      };

      // Execute the polling operation
      pollCount += 1;

      const result = await sendOperation(pollingArgs, pollingSpec);

      // Update latest polling url
      lastKnownPollingUrl =
        result.azureAsyncOperation ||
        result.operationLocation ||
        lastKnownPollingUrl;

      // Update lastOperation result
      lastOperation = {
        args: pollingArgs,
        spec: pollingSpec,
        result
      };

      return lastOperation;
    }
  };
}

function shouldPerformFinalGet<TResult extends BaseResult>(
  lastOperation: LastOperation<TResult>,
  originalOperation: LastOperation<TResult>
) {
  if (
    lastOperation.result.status &&
    lastOperation.result.status.toLowerCase() !== "succeeded"
  ) {
    return false;
  }

  if (originalOperation.spec.httpMethod === "DELETE") {
    return false;
  }

  if (
    originalOperation.spec.httpMethod !== "PUT" &&
    !originalOperation.result.location
  ) {
    return false;
  }

  return true;
}

async function sendFinalGet<TResult extends BaseResult>(
  state: LROOperationState<TResult>,
  originalOperation: LastOperation<TResult>,
  path?: string
): Promise<LastOperation<TResult>> {
  const finalGetSpec: OperationSpec = {
    ...originalOperation.spec,
    httpMethod: "GET"
  };

  // Send final GET request to the Original URL
  const spec = {
    ...finalGetSpec,
    ...(path && { path })
  };

  const finalResult = await state.sendOperation(originalOperation.args, spec);

  return {
    args: originalOperation.args,
    spec,
    result: finalResult
  };
}
