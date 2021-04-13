import { LROStrategy, BaseResult, LROOperationStep } from "./models";
import { SendOperationFn } from "./lroPoller";
/**
 * Creates a polling strategy based on BodyPolling which uses the provisioning state
 * from the result to determine the current operation state
 */
export declare function createBodyPollingStrategy<TResult extends BaseResult>(initialOperation: LROOperationStep<TResult>, sendOperation: SendOperationFn<TResult>): LROStrategy<TResult>;
//# sourceMappingURL=bodyPollingStrategy.d.ts.map