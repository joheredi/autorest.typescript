import { LROStrategy, BaseResult, LROOperationStep, FinalStateVia } from "./models";
import { SendOperationFn } from ".";
export declare function createAzureAsyncOperationStrategy<TResult extends BaseResult>(initialOperation: LROOperationStep<TResult>, sendOperationFn: SendOperationFn<TResult>, finalStateVia?: FinalStateVia): LROStrategy<TResult>;
//# sourceMappingURL=azureAsyncOperationStrategy.d.ts.map