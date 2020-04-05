import { Poller } from "@azure/core-lro";
import {
  OperationSpec,
  OperationArguments,
  delay,
  OperationResponse,
} from "@azure/core-http";
import {
  BaseResult,
  LROOperationState,
  FinalStateVia,
  LROStrategy,
} from "./models";
import { makeOperation } from "./operation";
import { createAzureAsyncOperationStrategy } from "./azureAsyncOperationStrategy";
import { createBodyPollingStrategy } from "./bodyPollingStrategy";
import { isEmpty } from "lodash";

export type SendOperationFn<TResult extends BaseResult> = (
  args: OperationArguments,
  spec: OperationSpec
) => Promise<TResult>;

export interface LROPollerOptions<TResult extends BaseResult> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  intervalInMs?: number;
  /**
   * Arguments used to send the initial operation
   */
  initialOperationArguments: OperationArguments;
  /**
   * Operation spec provided for the initial operation
   */
  initialOperationSpec: OperationSpec;
  /**
   * Result from the initial operation
   */
  initialOperationResult: TResult;
  /**
   * Function to execute an operation based on an operation spec and arguments
   */
  sendOperation: SendOperationFn<TResult>;
  /**
   * Optional information on where to poll, defaults to "Location"
   */
  finalStateVia?: FinalStateVia;
}

export class LROPoller<TResult extends BaseResult> extends Poller<
  LROOperationState<TResult>,
  TResult
> {
  private intervalInMs: number;

  constructor({
    initialOperationArguments,
    initialOperationResult,
    initialOperationSpec,
    sendOperation,
    intervalInMs = 2000,
    finalStateVia = "location",
  }: LROPollerOptions<TResult>) {
    const state: LROOperationState<TResult> = {
      // Initial operation will become the last operation
      lastOperation: {
        args: initialOperationArguments,
        spec: injectMissingResponses(initialOperationSpec),
        result: initialOperationResult,
      },
      sendOperation,
      finalStateVia,
      isStarted: true,
    };

    const pollingStrategy: LROStrategy<TResult> = getStrategyFromResult(state);

    const operation = makeOperation({ ...state, pollingStrategy });
    super(operation);

    this.intervalInMs = intervalInMs;
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   */
  delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}

/**
 * This function determines which strategy to use based on the response from
 * the last operation executed, this last operation can be an initial operation
 * or a polling operation. The 3 possible strategies are described below:
 *
 * A) Azure-AsyncOperation or Operation-Location
 * B) Location
 * C) BodyPolling (provisioningState)
 *  - This strategy is used when:
 *    - Response doesn't contain any of the following headers Location, Azure-AsyncOperation or Operation-Location
 *    - Last operation method is PUT
 */
function getStrategyFromResult<TResult extends BaseResult>(
  state: LROOperationState<TResult>
): LROStrategy<TResult> {
  const {
    lastOperation: { spec, result },
  } = state;

  if (result.azureAsyncOperation || result.operationLocation) {
    return createAzureAsyncOperationStrategy(state);
  }

  if (result.location) {
    throw new Error("Location strategy is not yet implemented");
  }

  if (["PUT", "PATCH"].includes(spec.httpMethod)) {
    return createBodyPollingStrategy(state);
  }

  throw new Error("Unknown Long Running Operation strategy");
}

/**
 * SWAGGER doesn't require to define all possible response codes
 * for the polling operations, since we need to send operation specs
 * to coreHttp we'll inject possible response codes. The stub responses
 * will be a clone of the first success response defined
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
