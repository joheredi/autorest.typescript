import { Poller } from "@azure/core-lro";
import { OperationSpec, OperationArguments } from "@azure/core-http";
import { BaseResult, LROOperationState, FinalStateVia } from "./models";
export declare type SendOperationFn<TResult extends BaseResult> = (args: OperationArguments, spec: OperationSpec) => Promise<TResult>;
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
     * Optional information on where to poll. When not defined it defaults to "Location"
     */
    finalStateVia?: FinalStateVia;
}
export declare class LROPoller<TResult extends BaseResult> extends Poller<LROOperationState<TResult>, TResult> {
    private intervalInMs;
    constructor({ initialOperationArguments, initialOperationResult, initialOperationSpec, sendOperation, finalStateVia, intervalInMs }: LROPollerOptions<TResult>);
    /**
     * The method used by the poller to wait before attempting to update its operation.
     */
    delay(): Promise<void>;
}
//# sourceMappingURL=lroPoller.d.ts.map