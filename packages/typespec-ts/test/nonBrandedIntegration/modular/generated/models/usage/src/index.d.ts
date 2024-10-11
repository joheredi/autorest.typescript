import { Client } from '@typespec/ts-http-runtime';
import { ClientOptions } from '@typespec/ts-http-runtime';
import { OperationOptions } from '@typespec/ts-http-runtime';
import { Pipeline } from '@typespec/ts-http-runtime';

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
