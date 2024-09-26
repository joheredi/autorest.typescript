import { Client } from '@azure-rest/core-client';
import { ClientOptions } from '@azure-rest/core-client';
import { OperationOptions } from '@azure-rest/core-client';
import { Pipeline } from '@azure/core-rest-pipeline';

export declare class BasicClient {
    private _client;
    readonly pipeline: Pipeline;
    constructor(options?: BasicClientOptionalParams);
    readonly explicitBody: ExplicitBodyOperations;
    readonly implicitBody: ImplicitBodyOperations;
}

export declare interface BasicClientOptionalParams extends ClientOptions {
}

export declare interface BasicContext extends Client {
}

export declare function createBasic(options?: BasicClientOptionalParams): BasicContext;

export declare interface ExplicitBodyOperations {
    simple: (body: User, options?: ExplicitBodySimpleOptionalParams) => Promise<void>;
}

export declare function explicitBodySimple(context: BasicContext, body: User, options?: ExplicitBodySimpleOptionalParams): Promise<void>;

export declare interface ExplicitBodySimpleOptionalParams extends OperationOptions {
}

export declare interface ImplicitBodyOperations {
    simple: (name: string, options?: ImplicitBodySimpleOptionalParams) => Promise<void>;
}

export declare function implicitBodySimple(context: BasicContext, name: string, options?: ImplicitBodySimpleOptionalParams): Promise<void>;

export declare interface ImplicitBodySimpleOptionalParams extends OperationOptions {
}

export declare interface User {
    name: string;
}

export { }
