import { Client } from '@azure-rest/core-client';
import { ClientOptions } from '@azure-rest/core-client';
import { OperationOptions } from '@azure-rest/core-client';
import { Pipeline } from '@azure/core-rest-pipeline';

export declare function createUsage(options?: UsageClientOptionalParams): UsageContext;

export declare function input(context: UsageContext, inputParameter: InputRecord, options?: InputOptionalParams): Promise<void>;

export declare function inputAndOutput(context: UsageContext, body: InputOutputRecord, options?: InputAndOutputOptionalParams): Promise<InputOutputRecord>;

export declare interface InputAndOutputOptionalParams extends OperationOptions {
}

export declare interface InputOptionalParams extends OperationOptions {
}

export declare interface InputOutputRecord {
    requiredProp: string;
}

export declare interface InputRecord {
    requiredProp: string;
}

export declare function output(context: UsageContext, options?: OutputOptionalParams): Promise<OutputRecord>;

export declare interface OutputOptionalParams extends OperationOptions {
}

export declare interface OutputRecord {
    requiredProp: string;
}

export declare class UsageClient {
    private _client;
    readonly pipeline: Pipeline;
    constructor(options?: UsageClientOptionalParams);
    input(inputParameter: InputRecord, options?: InputOptionalParams): Promise<void>;
    output(options?: OutputOptionalParams): Promise<OutputRecord>;
    inputAndOutput(body: InputOutputRecord, options?: InputAndOutputOptionalParams): Promise<InputOutputRecord>;
}

export declare interface UsageClientOptionalParams extends ClientOptions {
}

export declare interface UsageContext extends Client {
}

export { }
