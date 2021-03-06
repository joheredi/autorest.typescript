## API Report File for "arm-package-features-2015-12"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import * as coreHttp from '@azure/core-http';

// @public (undocumented)
export class FeatureClient extends FeatureClientContext {
    constructor(credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials, subscriptionId: string, options?: FeatureClientOptionalParams);
    // Warning: (ae-forgotten-export) The symbol "Features" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    features: Features;
    listOperations(options?: coreHttp.OperationOptions): Promise<FeatureClientListOperationsResponse>;
    listOperationsNext(nextLink: string, options?: coreHttp.OperationOptions): Promise<FeatureClientListOperationsNextResponse>;
}

// @public (undocumented)
export class FeatureClientContext extends coreHttp.ServiceClient {
    // (undocumented)
    $host: string;
    constructor(credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials, subscriptionId: string, options?: FeatureClientOptionalParams);
    // (undocumented)
    apiVersion: string;
    // (undocumented)
    subscriptionId: string;
}

// @public
export type FeatureClientListOperationsNextResponse = OperationListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: OperationListResult;
    };
};

// @public
export type FeatureClientListOperationsResponse = OperationListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: OperationListResult;
    };
};

// @public
export interface FeatureClientOptionalParams extends coreHttp.ServiceClientOptions {
    $host?: string;
    apiVersion?: string;
    endpoint?: string;
}

// @public
export interface FeatureOperationsListResult {
    nextLink?: string;
    value?: FeatureResult[];
}

// @public
export interface FeatureProperties {
    state?: string;
}

// @public
export interface FeatureResult {
    id?: string;
    name?: string;
    properties?: FeatureProperties;
    type?: string;
}

// @public
export type FeaturesGetResponse = FeatureResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: FeatureResult;
    };
};

// @public
export type FeaturesListAllNextResponse = FeatureOperationsListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: FeatureOperationsListResult;
    };
};

// @public
export type FeaturesListAllResponse = FeatureOperationsListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: FeatureOperationsListResult;
    };
};

// @public
export type FeaturesListNextResponse = FeatureOperationsListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: FeatureOperationsListResult;
    };
};

// @public
export type FeaturesListResponse = FeatureOperationsListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: FeatureOperationsListResult;
    };
};

// @public
export type FeaturesRegisterResponse = FeatureResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: FeatureResult;
    };
};

// @public
export type FeaturesUnregisterResponse = FeatureResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: FeatureResult;
    };
};

// @public
export interface Operation {
    display?: OperationDisplay;
    name?: string;
}

// @public
export interface OperationDisplay {
    operation?: string;
    provider?: string;
    resource?: string;
}

// @public
export interface OperationListResult {
    nextLink?: string;
    value?: Operation[];
}


// (No @packageDocumentation comment for this package)

```
