## API Report File for "arm-package-links-2016-09"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import * as coreHttp from '@azure/core-http';

// @public (undocumented)
export class ManagementLinkClient extends ManagementLinkClientContext {
    constructor(credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials, subscriptionId: string, options?: ManagementLinkClientOptionalParams);
    // Warning: (ae-forgotten-export) The symbol "Operations" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    operations: Operations;
    // Warning: (ae-forgotten-export) The symbol "ResourceLinks" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    resourceLinks: ResourceLinks;
}

// @public (undocumented)
export class ManagementLinkClientContext extends coreHttp.ServiceClient {
    // (undocumented)
    $host: string;
    constructor(credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials, subscriptionId: string, options?: ManagementLinkClientOptionalParams);
    // (undocumented)
    apiVersion: string;
    // (undocumented)
    subscriptionId: string;
}

// @public
export interface ManagementLinkClientOptionalParams extends coreHttp.ServiceClientOptions {
    $host?: string;
    apiVersion?: string;
    endpoint?: string;
}

// @public
export interface Operation {
    display?: OperationDisplay;
    name?: string;
}

// @public
export interface OperationDisplay {
    description?: string;
    operation?: string;
    provider?: string;
    resource?: string;
}

// @public
export interface OperationListResult {
    nextLink?: string;
    value?: Operation[];
}

// @public
export type OperationsListNextResponse = OperationListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: OperationListResult;
    };
};

// @public
export type OperationsListResponse = OperationListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: OperationListResult;
    };
};

// @public
export interface ResourceLink {
    readonly id?: string;
    readonly name?: string;
    properties?: ResourceLinkProperties;
    readonly type?: any;
}

// @public
export interface ResourceLinkFilter {
    targetId: string;
}

// @public
export interface ResourceLinkProperties {
    notes?: string;
    readonly sourceId?: string;
    targetId: string;
}

// @public
export interface ResourceLinkResult {
    readonly nextLink?: string;
    value: ResourceLink[];
}

// @public
export type ResourceLinksCreateOrUpdateResponse = ResourceLink & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ResourceLink;
    };
};

// @public
export type ResourceLinksGetResponse = ResourceLink & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ResourceLink;
    };
};

// @public
export type ResourceLinksListAtSourceScopeNextResponse = ResourceLinkResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ResourceLinkResult;
    };
};

// @public
export type ResourceLinksListAtSourceScopeResponse = ResourceLinkResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ResourceLinkResult;
    };
};

// @public
export interface ResourceLinksListAtSubscriptionNextOptionalParams extends coreHttp.OperationOptions {
    filter?: string;
}

// @public
export type ResourceLinksListAtSubscriptionNextResponse = ResourceLinkResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ResourceLinkResult;
    };
};

// @public
export interface ResourceLinksListAtSubscriptionOptionalParams extends coreHttp.OperationOptions {
    filter?: string;
}

// @public
export type ResourceLinksListAtSubscriptionResponse = ResourceLinkResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ResourceLinkResult;
    };
};


// (No @packageDocumentation comment for this package)

```
