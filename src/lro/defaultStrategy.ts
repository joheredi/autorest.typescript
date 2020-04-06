import { LROStrategy, BaseResult, LROOperationState } from "./models";

/**
 * This is basically as passthrough strategy which will return the last operation
 * and should never attempt to poll since there will be no information to figure
 * out where to poll.
 */
export function createDefaultStrategy<TResult extends BaseResult>(
  state: LROOperationState<TResult>
): LROStrategy<TResult> {
  return {
    isTerminal: () => true,
    sendFinalRequest: () => Promise.resolve(state.lastOperation),
    poll: () => {
      throw new Error("Default strategy shouldn't attempt polling");
    },
  };
}
