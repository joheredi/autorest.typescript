import { LROStrategy, BaseResult, LROOperationStep } from "./models";
import { OperationSpec } from "@azure/core-http";
import { terminalStates } from "./constants";
import { SendOperationFn } from "./lroPoller";

/**
 * Creates a polling strategy based on BodyPolling which uses the provisioning state
 * from the result to determine the current operation state
 */
export function createBodyPollingStrategy<TResult extends BaseResult>(
  initialOperation: LROOperationStep<TResult>,
  sendOperation: SendOperationFn<TResult>
): LROStrategy<TResult> {
  return {
    isTerminal: () => {
      // If provisioning state is missing, default to Success
      const provisioningState = (
        initialOperation.result.provisioningState ||
        initialOperation.result.properties?.provisioningState ||
        "succeeded"
      ).toLowerCase();

      return terminalStates.includes(provisioningState);
    },
    sendFinalRequest: () => {
      // BodyPolling doesn't require a final get so return the lastOperation
      return Promise.resolve(initialOperation);
    },
    poll: async () => {
      // When doing BodyPolling, we need to poll to the original url with a
      // GET http method
      const pollingSpec: OperationSpec = {
        ...initialOperation.spec,
        httpMethod: "GET"
      };

      // Execute the polling operation
      const result = await sendOperation(initialOperation.args, pollingSpec);

      // Update lastOperation result
      initialOperation.result = result;
      return initialOperation;
    }
  };
}
