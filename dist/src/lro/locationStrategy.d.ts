import { BaseResult, LROOperationStep, LROStrategy } from "./models";
import { SendOperationFn } from "./lroPoller";
export declare function createLocationStrategy<TResult extends BaseResult>(initialOperation: LROOperationStep<TResult>, sendOperationFn: SendOperationFn<TResult>): LROStrategy<TResult>;
//# sourceMappingURL=locationStrategy.d.ts.map