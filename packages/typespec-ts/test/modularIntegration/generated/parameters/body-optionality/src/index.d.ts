import { Client } from '@azure-rest/core-client';
import { ClientOptions } from '@azure-rest/core-client';
import { OperationOptions } from '@azure-rest/core-client';
import { Pipeline } from '@azure/core-rest-pipeline';

export declare interface BodyModel {
    name: string;
}

export declare class BodyOptionalityClient {
    private _client;
    readonly pipeline: Pipeline;
    constructor(options?: BodyOptionalityClientOptionalParams);
    requiredExplicit(body: BodyModel, options?: RequiredExplicitOptionalParams): Promise<void>;
    requiredImplicit(name: string, options?: RequiredImplicitOptionalParams): Promise<void>;
    readonly optionalExplicit: OptionalExplicitOperations;
}

export declare interface BodyOptionalityClientOptionalParams extends ClientOptions {
}

export declare interface BodyOptionalityContext extends Client {
}

export declare function createBodyOptionality(options?: BodyOptionalityClientOptionalParams): BodyOptionalityContext;

export declare interface OptionalExplicitOmitOptionalParams extends OperationOptions {
}

export declare interface OptionalExplicitOperations {
    set: (body?: BodyModel, options?: OptionalExplicitSetOptionalParams) => Promise<void>;
    omit: (body?: BodyModel, options?: OptionalExplicitOmitOptionalParams) => Promise<void>;
}

export declare interface OptionalExplicitSetOptionalParams extends OperationOptions {
}

export declare function requiredExplicit(context: BodyOptionalityContext, body: BodyModel, options?: RequiredExplicitOptionalParams): Promise<void>;

export declare interface RequiredExplicitOptionalParams extends OperationOptions {
}

export declare function requiredImplicit(context: BodyOptionalityContext, name: string, options?: RequiredImplicitOptionalParams): Promise<void>;

export declare interface RequiredImplicitOptionalParams extends OperationOptions {
}

export { }
