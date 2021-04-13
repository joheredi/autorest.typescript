import { LROStrategy, BaseResult, LROOperationStep } from "./models";
/**
 * Creates a polling strategy based on BodyPolling which uses the provisioning state
 * from the result to determine the current operation state
 */
export declare function createPassthroughStrategy<TResult extends BaseResult>(initialOperation: LROOperationStep<TResult>): LROStrategy<TResult>;
//# sourceMappingURL=passthroughStrategy.d.ts.map