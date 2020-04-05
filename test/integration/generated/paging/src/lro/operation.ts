import { BaseResult, LROOperationState, LROOperation } from "./models";

/**
 * Creates a copy of the operation from a given State
 */
export function makeOperation<TResult extends BaseResult>(
  state: LROOperationState<TResult>
): LROOperation<TResult> {
  return {
    state: { ...state },
    update,
    cancel,
    toString: function(this: LROOperation<TResult>) {
      return JSON.stringify(this.state);
    }
  };
}

/**
 * General update function for LROPoller, the general process is as follows
 * 1. Check initial operation result to determine the strategy to use
 *  - Strategies: Location, Azure-AsyncOperation, Original Uri
 * 2. Check if the operation result has a terminal state
 *  - Terminal state will be determined by each strategy
 *  2.1 If it is terminal state Check if a final GET request is required, if so
 *      send final GET request and return result from operation. If no final GET
 *      is required, just return the result from operation.
 *      - Determining what to call for final request is responsibility of each strategy
 *  2.2 If it is not terminal state, call the polling operation call it and go to step 1
 *      - Determining what to call for polling is responsibility of each strategy
 *      - Strategies will always use the latest URI for polling if provided otherwise
 *        the last known one
 */
async function update<TResult extends BaseResult>(
  this: LROOperation<TResult>
): Promise<LROOperation<TResult>> {
  const state = { ...this.state };

  const lroStrategy = state.pollingStrategy;

  if (!lroStrategy) {
    throw new Error("No pollingStrategy is defined");
  }

  // Check if last result is terminal
  if (lroStrategy.isTerminal()) {
    const finalOperation = await lroStrategy.sendFinalRequest();
    state.lastOperation = finalOperation;
    state.result = finalOperation.result;
    state.isCompleted = true;
  } else {
    const lastOperation = await lroStrategy.poll();
    state.lastOperation = lastOperation;
    state.result = lastOperation.result;
  }

  // Return operation
  return makeOperation(state);
}

/**
 * Swagger doesn't support defining a cancel operation, we'll just mark
 * the operation state as cancelled
 */
function cancel<TResult extends BaseResult>(
  this: LROOperation<TResult>
): Promise<LROOperation<TResult>> {
  return Promise.resolve(makeOperation({ ...this.state, isCancelled: true }));
}
