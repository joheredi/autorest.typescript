import { Client } from '@azure-rest/core-client';
import { ClientOptions } from '@azure-rest/core-client';
import { OperationOptions } from '@azure-rest/core-client';
import { Pipeline } from '@azure/core-rest-pipeline';

export declare interface Cat extends Pet {
    age: number;
}

export declare function createNotDiscriminated(options?: NotDiscriminatedClientOptionalParams): NotDiscriminatedContext;

export declare function getValid(context: NotDiscriminatedContext, options?: GetValidOptionalParams): Promise<Siamese>;

export declare interface GetValidOptionalParams extends OperationOptions {
}

export declare class NotDiscriminatedClient {
    private _client;
    readonly pipeline: Pipeline;
    constructor(options?: NotDiscriminatedClientOptionalParams);
    postValid(input: Siamese, options?: PostValidOptionalParams): Promise<void>;
    getValid(options?: GetValidOptionalParams): Promise<Siamese>;
    putValid(input: Siamese, options?: PutValidOptionalParams): Promise<Siamese>;
}

export declare interface NotDiscriminatedClientOptionalParams extends ClientOptions {
}

export declare interface NotDiscriminatedContext extends Client {
}

export declare interface Pet {
    name: string;
}

export declare function postValid(context: NotDiscriminatedContext, input: Siamese, options?: PostValidOptionalParams): Promise<void>;

export declare interface PostValidOptionalParams extends OperationOptions {
}

export declare function putValid(context: NotDiscriminatedContext, input: Siamese, options?: PutValidOptionalParams): Promise<Siamese>;

export declare interface PutValidOptionalParams extends OperationOptions {
}

export declare interface Siamese extends Cat {
    smart: boolean;
}

export { }
