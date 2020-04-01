import { LROStrategy, BaseResult, LROOperationState } from "./models";
import { OperationSpec } from "@azure/core-http";

const terminalStates = ["succeeded", "failed", "canceled", "cancelled"];

/**
 * Creates a polling strategy based on BodyPolling which uses the provisioning state
 * from the result to determine the current operation state
 */
export function createBodyPollingStrategy<TResult extends BaseResult>({
  lastOperation: operation,
  sendOperation
}: LROOperationState<TResult>): LROStrategy<TResult> {
  let lastOperation = { ...operation };
  return {
    isTerminal: () => {
      // If provisioning state is missing, default to Success
      const provisioningState = (
        lastOperation.result.provisioningState ||
        lastOperation.result.properties?.provisioningState ||
        "succeeded"
      ).toLowerCase();

      return terminalStates.includes(provisioningState);
    },
    sendFinalRequest: () => {
      // BodyPolling doesn't require a final get so return the lastOperation
      return Promise.resolve(lastOperation);
    },
    poll: async () => {
      // When doing BodyPolling, we need to poll to the original url with a
      // GET http method
      const pollingSpec: OperationSpec = {
        ...lastOperation.spec,
        httpMethod: "GET"
      };

      // Execute the polling operation
      const result = await sendOperation(lastOperation.args, pollingSpec);

      // Update lastOperation
      lastOperation.spec = pollingSpec;
      lastOperation.result = result;
      return lastOperation;
    }
  };
}
