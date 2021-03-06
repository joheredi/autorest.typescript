## API Report File for "arm-package-resources-2019-08"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import * as coreHttp from '@azure/core-http';
import { HttpMethods } from '@azure/core-http';
import { HttpOperationResponse } from '@azure/core-http';
import { OperationArguments } from '@azure/core-http';
import { OperationSpec } from '@azure/core-http';
import { Poller } from '@azure/core-lro';
import { PollOperationState } from '@azure/core-lro';
import { RestResponse } from '@azure/core-http';

// @public
export interface AliasPathType {
    apiVersions?: string[];
    path?: string;
}

// @public
export interface AliasType {
    name?: string;
    paths?: AliasPathType[];
}

// @public
export interface BasicDependency {
    id?: string;
    resourceName?: string;
    resourceType?: string;
}

// @public
export type ChangeType = "Create" | "Delete" | "Ignore" | "Deploy" | "NoChange" | "Modify";

// @public
export interface CloudError {
    error?: ErrorResponse;
}

// @public (undocumented)
export interface ComponentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalproperties {
    readonly clientId?: string;
    readonly principalId?: string;
}

// @public
export interface DebugSetting {
    detailLevel?: string;
}

// @public
export interface Dependency {
    dependsOn?: BasicDependency[];
    id?: string;
    resourceName?: string;
    resourceType?: string;
}

// @public
export interface Deployment {
    location?: string;
    properties: DeploymentProperties;
}

// @public
export interface DeploymentExportResult {
    template?: any;
}

// @public
export interface DeploymentExtended {
    readonly id?: string;
    location?: string;
    readonly name?: string;
    properties?: DeploymentPropertiesExtended;
    readonly type?: string;
}

// @public
export interface DeploymentExtendedFilter {
    provisioningState?: string;
}

// @public
export interface DeploymentListResult {
    readonly nextLink?: string;
    value?: DeploymentExtended[];
}

// @public
export type DeploymentMode = "Incremental" | "Complete";

// @public
export interface DeploymentOperation {
    readonly id?: string;
    readonly operationId?: string;
    properties?: DeploymentOperationProperties;
}

// @public
export interface DeploymentOperationProperties {
    readonly duration?: string;
    readonly provisioningState?: string;
    readonly request?: HttpMessage;
    readonly response?: HttpMessage;
    readonly serviceRequestId?: string;
    readonly statusCode?: string;
    readonly statusMessage?: any;
    readonly targetResource?: TargetResource;
    readonly timestamp?: Date;
}

// @public
export type DeploymentOperationsGetAtManagementGroupScopeResponse = DeploymentOperation & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentOperation;
    };
};

// @public
export type DeploymentOperationsGetAtScopeResponse = DeploymentOperation & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentOperation;
    };
};

// @public
export type DeploymentOperationsGetAtSubscriptionScopeResponse = DeploymentOperation & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentOperation;
    };
};

// @public
export type DeploymentOperationsGetAtTenantScopeResponse = DeploymentOperation & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentOperation;
    };
};

// @public
export type DeploymentOperationsGetResponse = DeploymentOperation & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentOperation;
    };
};

// @public
export interface DeploymentOperationsListAtManagementGroupScopeNextOptionalParams extends coreHttp.OperationOptions {
    top?: number;
}

// @public
export type DeploymentOperationsListAtManagementGroupScopeNextResponse = DeploymentOperationsListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentOperationsListResult;
    };
};

// @public
export interface DeploymentOperationsListAtManagementGroupScopeOptionalParams extends coreHttp.OperationOptions {
    top?: number;
}

// @public
export type DeploymentOperationsListAtManagementGroupScopeResponse = DeploymentOperationsListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentOperationsListResult;
    };
};

// @public
export interface DeploymentOperationsListAtScopeNextOptionalParams extends coreHttp.OperationOptions {
    top?: number;
}

// @public
export type DeploymentOperationsListAtScopeNextResponse = DeploymentOperationsListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentOperationsListResult;
    };
};

// @public
export interface DeploymentOperationsListAtScopeOptionalParams extends coreHttp.OperationOptions {
    top?: number;
}

// @public
export type DeploymentOperationsListAtScopeResponse = DeploymentOperationsListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentOperationsListResult;
    };
};

// @public
export interface DeploymentOperationsListAtSubscriptionScopeNextOptionalParams extends coreHttp.OperationOptions {
    top?: number;
}

// @public
export type DeploymentOperationsListAtSubscriptionScopeNextResponse = DeploymentOperationsListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentOperationsListResult;
    };
};

// @public
export interface DeploymentOperationsListAtSubscriptionScopeOptionalParams extends coreHttp.OperationOptions {
    top?: number;
}

// @public
export type DeploymentOperationsListAtSubscriptionScopeResponse = DeploymentOperationsListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentOperationsListResult;
    };
};

// @public
export interface DeploymentOperationsListAtTenantScopeNextOptionalParams extends coreHttp.OperationOptions {
    top?: number;
}

// @public
export type DeploymentOperationsListAtTenantScopeNextResponse = DeploymentOperationsListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentOperationsListResult;
    };
};

// @public
export interface DeploymentOperationsListAtTenantScopeOptionalParams extends coreHttp.OperationOptions {
    top?: number;
}

// @public
export type DeploymentOperationsListAtTenantScopeResponse = DeploymentOperationsListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentOperationsListResult;
    };
};

// @public
export interface DeploymentOperationsListNextOptionalParams extends coreHttp.OperationOptions {
    top?: number;
}

// @public
export type DeploymentOperationsListNextResponse = DeploymentOperationsListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentOperationsListResult;
    };
};

// @public
export interface DeploymentOperationsListOptionalParams extends coreHttp.OperationOptions {
    top?: number;
}

// @public
export type DeploymentOperationsListResponse = DeploymentOperationsListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentOperationsListResult;
    };
};

// @public
export interface DeploymentOperationsListResult {
    readonly nextLink?: string;
    value?: DeploymentOperation[];
}

// @public
export interface DeploymentProperties {
    debugSetting?: DebugSetting;
    mode: DeploymentMode;
    onErrorDeployment?: OnErrorDeployment;
    parameters?: any;
    parametersLink?: ParametersLink;
    template?: any;
    templateLink?: TemplateLink;
}

// @public
export interface DeploymentPropertiesExtended {
    readonly correlationId?: string;
    debugSetting?: DebugSetting;
    dependencies?: Dependency[];
    readonly duration?: string;
    mode?: DeploymentMode;
    onErrorDeployment?: OnErrorDeploymentExtended;
    outputs?: any;
    parameters?: any;
    parametersLink?: ParametersLink;
    providers?: Provider[];
    readonly provisioningState?: string;
    template?: any;
    templateLink?: TemplateLink;
    readonly timestamp?: Date;
}

// @public
export type DeploymentsCalculateTemplateHashResponse = TemplateHashResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: TemplateHashResult;
    };
};

// @public
export type DeploymentsCreateOrUpdateAtManagementGroupScopeResponse = DeploymentExtended & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentExtended;
        [LROSYM]: LROResponseInfo;
    };
};

// @public
export type DeploymentsCreateOrUpdateAtScopeResponse = DeploymentExtended & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentExtended;
        [LROSYM]: LROResponseInfo;
    };
};

// @public
export type DeploymentsCreateOrUpdateAtSubscriptionScopeResponse = DeploymentExtended & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentExtended;
        [LROSYM]: LROResponseInfo;
    };
};

// @public
export type DeploymentsCreateOrUpdateAtTenantScopeResponse = DeploymentExtended & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentExtended;
        [LROSYM]: LROResponseInfo;
    };
};

// @public
export type DeploymentsCreateOrUpdateResponse = DeploymentExtended & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentExtended;
        [LROSYM]: LROResponseInfo;
    };
};

// @public
export type DeploymentsExportTemplateAtManagementGroupScopeResponse = DeploymentExportResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentExportResult;
    };
};

// @public
export type DeploymentsExportTemplateAtScopeResponse = DeploymentExportResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentExportResult;
    };
};

// @public
export type DeploymentsExportTemplateAtSubscriptionScopeResponse = DeploymentExportResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentExportResult;
    };
};

// @public
export type DeploymentsExportTemplateAtTenantScopeResponse = DeploymentExportResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentExportResult;
    };
};

// @public
export type DeploymentsExportTemplateResponse = DeploymentExportResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentExportResult;
    };
};

// @public
export type DeploymentsGetAtManagementGroupScopeResponse = DeploymentExtended & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentExtended;
    };
};

// @public
export type DeploymentsGetAtScopeResponse = DeploymentExtended & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentExtended;
    };
};

// @public
export type DeploymentsGetAtSubscriptionScopeResponse = DeploymentExtended & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentExtended;
    };
};

// @public
export type DeploymentsGetAtTenantScopeResponse = DeploymentExtended & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentExtended;
    };
};

// @public
export type DeploymentsGetResponse = DeploymentExtended & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentExtended;
    };
};

// @public
export interface DeploymentsListAtManagementGroupScopeNextOptionalParams extends coreHttp.OperationOptions {
    filter?: string;
    top?: number;
}

// @public
export type DeploymentsListAtManagementGroupScopeNextResponse = DeploymentListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentListResult;
    };
};

// @public
export interface DeploymentsListAtManagementGroupScopeOptionalParams extends coreHttp.OperationOptions {
    filter?: string;
    top?: number;
}

// @public
export type DeploymentsListAtManagementGroupScopeResponse = DeploymentListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentListResult;
    };
};

// @public
export interface DeploymentsListAtScopeNextOptionalParams extends coreHttp.OperationOptions {
    filter?: string;
    top?: number;
}

// @public
export type DeploymentsListAtScopeNextResponse = DeploymentListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentListResult;
    };
};

// @public
export interface DeploymentsListAtScopeOptionalParams extends coreHttp.OperationOptions {
    filter?: string;
    top?: number;
}

// @public
export type DeploymentsListAtScopeResponse = DeploymentListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentListResult;
    };
};

// @public
export interface DeploymentsListAtSubscriptionScopeNextOptionalParams extends coreHttp.OperationOptions {
    filter?: string;
    top?: number;
}

// @public
export type DeploymentsListAtSubscriptionScopeNextResponse = DeploymentListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentListResult;
    };
};

// @public
export interface DeploymentsListAtSubscriptionScopeOptionalParams extends coreHttp.OperationOptions {
    filter?: string;
    top?: number;
}

// @public
export type DeploymentsListAtSubscriptionScopeResponse = DeploymentListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentListResult;
    };
};

// @public
export interface DeploymentsListAtTenantScopeNextOptionalParams extends coreHttp.OperationOptions {
    filter?: string;
    top?: number;
}

// @public
export type DeploymentsListAtTenantScopeNextResponse = DeploymentListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentListResult;
    };
};

// @public
export interface DeploymentsListAtTenantScopeOptionalParams extends coreHttp.OperationOptions {
    filter?: string;
    top?: number;
}

// @public
export type DeploymentsListAtTenantScopeResponse = DeploymentListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentListResult;
    };
};

// @public
export interface DeploymentsListByResourceGroupNextOptionalParams extends coreHttp.OperationOptions {
    filter?: string;
    top?: number;
}

// @public
export type DeploymentsListByResourceGroupNextResponse = DeploymentListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentListResult;
    };
};

// @public
export interface DeploymentsListByResourceGroupOptionalParams extends coreHttp.OperationOptions {
    filter?: string;
    top?: number;
}

// @public
export type DeploymentsListByResourceGroupResponse = DeploymentListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentListResult;
    };
};

// @public
export type DeploymentsValidateAtManagementGroupScopeResponse = DeploymentValidateResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentValidateResult;
    };
};

// @public
export type DeploymentsValidateAtScopeResponse = DeploymentValidateResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentValidateResult;
    };
};

// @public
export type DeploymentsValidateAtSubscriptionScopeResponse = DeploymentValidateResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentValidateResult;
    };
};

// @public
export type DeploymentsValidateAtTenantScopeResponse = DeploymentValidateResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentValidateResult;
    };
};

// @public
export type DeploymentsValidateResponse = DeploymentValidateResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: DeploymentValidateResult;
    };
};

// @public
export interface DeploymentsWhatIfAtSubscriptionScopeHeaders {
    location?: string;
    retryAfter?: string;
}

// @public
export type DeploymentsWhatIfAtSubscriptionScopeResponse = WhatIfOperationResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: WhatIfOperationResult;
        [LROSYM]: LROResponseInfo;
    };
};

// @public
export interface DeploymentsWhatIfHeaders {
    location?: string;
    retryAfter?: string;
}

// @public
export type DeploymentsWhatIfResponse = WhatIfOperationResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: WhatIfOperationResult;
        [LROSYM]: LROResponseInfo;
    };
};

// @public
export interface DeploymentValidateResult {
    error?: ErrorResponse;
    properties?: DeploymentPropertiesExtended;
}

// @public
export interface DeploymentWhatIf {
    location?: string;
    properties: DeploymentWhatIfProperties;
}

// @public
export type DeploymentWhatIfProperties = DeploymentProperties & {
    whatIfSettings?: DeploymentWhatIfSettings;
};

// @public
export interface DeploymentWhatIfSettings {
    resultFormat?: WhatIfResultFormat;
}

// @public
export interface ErrorAdditionalInfo {
    readonly info?: any;
    readonly type?: string;
}

// @public
export interface ErrorResponse {
    readonly additionalInfo?: ErrorAdditionalInfo[];
    readonly code?: string;
    readonly details?: ErrorResponse[];
    readonly message?: string;
    readonly target?: string;
}

// @public
export interface ExportTemplateRequest {
    options?: string;
    resources?: string[];
}

// @public
export type GenericResource = Resource & {
    plan?: Plan;
    properties?: any;
    kind?: string;
    managedBy?: string;
    sku?: Sku;
    identity?: Identity;
};

// @public
export type GenericResourceExpanded = GenericResource & {
    readonly createdTime?: Date;
    readonly changedTime?: Date;
    readonly provisioningState?: string;
};

// @public
export interface GenericResourceFilter {
    resourceType?: string;
    tagname?: string;
    tagvalue?: string;
}

// @public
export interface HttpMessage {
    content?: any;
}

// @public
export interface Identity {
    readonly principalId?: string;
    readonly tenantId?: string;
    type?: ResourceIdentityType;
    userAssignedIdentities?: {
        [propertyName: string]: ComponentsSgqdofSchemasIdentityPropertiesUserassignedidentitiesAdditionalproperties;
    };
}

// @public
export interface OnErrorDeployment {
    deploymentName?: string;
    type?: OnErrorDeploymentType;
}

// @public
export interface OnErrorDeploymentExtended {
    deploymentName?: string;
    readonly provisioningState?: string;
    type?: OnErrorDeploymentType;
}

// @public
export type OnErrorDeploymentType = "LastSuccessful" | "SpecificDeployment";

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
export interface ParametersLink {
    contentVersion?: string;
    uri: string;
}

// @public
export interface Plan {
    name?: string;
    product?: string;
    promotionCode?: string;
    publisher?: string;
    version?: string;
}

// @public
export type PropertyChangeType = "Create" | "Delete" | "Modify" | "Array";

// @public
export interface Provider {
    readonly id?: string;
    namespace?: string;
    readonly registrationPolicy?: string;
    readonly registrationState?: string;
    readonly resourceTypes?: ProviderResourceType[];
}

// @public
export interface ProviderListResult {
    readonly nextLink?: string;
    value?: Provider[];
}

// @public
export interface ProviderResourceType {
    aliases?: AliasType[];
    apiVersions?: string[];
    capabilities?: string;
    locations?: string[];
    properties?: {
        [propertyName: string]: string;
    };
    resourceType?: string;
}

// @public
export interface ProvidersGetAtTenantScopeOptionalParams extends coreHttp.OperationOptions {
    expand?: string;
}

// @public
export type ProvidersGetAtTenantScopeResponse = Provider & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: Provider;
    };
};

// @public
export interface ProvidersGetOptionalParams extends coreHttp.OperationOptions {
    expand?: string;
}

// @public
export type ProvidersGetResponse = Provider & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: Provider;
    };
};

// @public
export interface ProvidersListAtTenantScopeNextOptionalParams extends coreHttp.OperationOptions {
    expand?: string;
    top?: number;
}

// @public
export type ProvidersListAtTenantScopeNextResponse = ProviderListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ProviderListResult;
    };
};

// @public
export interface ProvidersListAtTenantScopeOptionalParams extends coreHttp.OperationOptions {
    expand?: string;
    top?: number;
}

// @public
export type ProvidersListAtTenantScopeResponse = ProviderListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ProviderListResult;
    };
};

// @public
export interface ProvidersListNextOptionalParams extends coreHttp.OperationOptions {
    expand?: string;
    top?: number;
}

// @public
export type ProvidersListNextResponse = ProviderListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ProviderListResult;
    };
};

// @public
export interface ProvidersListOptionalParams extends coreHttp.OperationOptions {
    expand?: string;
    top?: number;
}

// @public
export type ProvidersListResponse = ProviderListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ProviderListResult;
    };
};

// @public
export type ProvidersRegisterResponse = Provider & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: Provider;
    };
};

// @public
export type ProvidersUnregisterResponse = Provider & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: Provider;
    };
};

// @public
export interface Resource {
    readonly id?: string;
    location?: string;
    readonly name?: string;
    tags?: {
        [propertyName: string]: string;
    };
    readonly type?: string;
}

// @public
export interface ResourceGroup {
    readonly id?: string;
    location: string;
    managedBy?: string;
    readonly name?: string;
    properties?: ResourceGroupProperties;
    tags?: {
        [propertyName: string]: string;
    };
    readonly type?: string;
}

// @public
export interface ResourceGroupExportResult {
    error?: ErrorResponse;
    template?: any;
}

// @public
export interface ResourceGroupFilter {
    tagName?: string;
    tagValue?: string;
}

// @public
export interface ResourceGroupListResult {
    readonly nextLink?: string;
    value?: ResourceGroup[];
}

// @public
export interface ResourceGroupPatchable {
    managedBy?: string;
    name?: string;
    properties?: ResourceGroupProperties;
    tags?: {
        [propertyName: string]: string;
    };
}

// @public
export interface ResourceGroupProperties {
    readonly provisioningState?: string;
}

// @public
export type ResourceGroupsCreateOrUpdateResponse = ResourceGroup & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ResourceGroup;
    };
};

// @public
export type ResourceGroupsExportTemplateResponse = ResourceGroupExportResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ResourceGroupExportResult;
        [LROSYM]: LROResponseInfo;
    };
};

// @public
export type ResourceGroupsGetResponse = ResourceGroup & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ResourceGroup;
    };
};

// @public
export interface ResourceGroupsListNextOptionalParams extends coreHttp.OperationOptions {
    filter?: string;
    top?: number;
}

// @public
export type ResourceGroupsListNextResponse = ResourceGroupListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ResourceGroupListResult;
    };
};

// @public
export interface ResourceGroupsListOptionalParams extends coreHttp.OperationOptions {
    filter?: string;
    top?: number;
}

// @public
export type ResourceGroupsListResponse = ResourceGroupListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ResourceGroupListResult;
    };
};

// @public
export type ResourceGroupsUpdateResponse = ResourceGroup & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ResourceGroup;
    };
};

// @public
export type ResourceIdentityType = "SystemAssigned" | "UserAssigned" | "SystemAssigned, UserAssigned" | "None";

// @public
export interface ResourceListResult {
    readonly nextLink?: string;
    value?: GenericResourceExpanded[];
}

// @public (undocumented)
export class ResourceManagementClient extends ResourceManagementClientContext {
    constructor(credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials, subscriptionId: string, options?: ResourceManagementClientOptionalParams);
    // Warning: (ae-forgotten-export) The symbol "DeploymentOperations" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    deploymentOperations: DeploymentOperations;
    // Warning: (ae-forgotten-export) The symbol "Deployments" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    deployments: Deployments;
    // Warning: (ae-forgotten-export) The symbol "Operations" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    operations: Operations;
    // Warning: (ae-forgotten-export) The symbol "Providers" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    providers: Providers;
    // Warning: (ae-forgotten-export) The symbol "ResourceGroups" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    resourceGroups: ResourceGroups;
    // Warning: (ae-forgotten-export) The symbol "Resources" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    resources: Resources;
    // Warning: (ae-forgotten-export) The symbol "Tags" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    tags: Tags;
}

// @public (undocumented)
export class ResourceManagementClientContext extends coreHttp.ServiceClient {
    // (undocumented)
    $host: string;
    constructor(credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials, subscriptionId: string, options?: ResourceManagementClientOptionalParams);
    // (undocumented)
    apiVersion: string;
    // (undocumented)
    subscriptionId: string;
}

// @public
export interface ResourceManagementClientOptionalParams extends coreHttp.ServiceClientOptions {
    $host?: string;
    apiVersion?: string;
    endpoint?: string;
}

// @public
export interface ResourceProviderOperationDisplayProperties {
    description?: string;
    operation?: string;
    provider?: string;
    publisher?: string;
    resource?: string;
}

// @public
export type ResourcesCreateOrUpdateByIdResponse = GenericResource & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: GenericResource;
        [LROSYM]: LROResponseInfo;
    };
};

// @public
export type ResourcesCreateOrUpdateResponse = GenericResource & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: GenericResource;
        [LROSYM]: LROResponseInfo;
    };
};

// @public
export type ResourcesGetByIdResponse = GenericResource & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: GenericResource;
    };
};

// @public
export type ResourcesGetResponse = GenericResource & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: GenericResource;
    };
};

// @public
export interface ResourcesListByResourceGroupNextOptionalParams extends coreHttp.OperationOptions {
    expand?: string;
    filter?: string;
    top?: number;
}

// @public
export type ResourcesListByResourceGroupNextResponse = ResourceListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ResourceListResult;
    };
};

// @public
export interface ResourcesListByResourceGroupOptionalParams extends coreHttp.OperationOptions {
    expand?: string;
    filter?: string;
    top?: number;
}

// @public
export type ResourcesListByResourceGroupResponse = ResourceListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ResourceListResult;
    };
};

// @public
export interface ResourcesListNextOptionalParams extends coreHttp.OperationOptions {
    expand?: string;
    filter?: string;
    top?: number;
}

// @public
export type ResourcesListNextResponse = ResourceListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ResourceListResult;
    };
};

// @public
export interface ResourcesListOptionalParams extends coreHttp.OperationOptions {
    expand?: string;
    filter?: string;
    top?: number;
}

// @public
export type ResourcesListResponse = ResourceListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: ResourceListResult;
    };
};

// @public
export interface ResourcesMoveInfo {
    resources?: string[];
    targetResourceGroup?: string;
}

// @public
export type ResourcesUpdateByIdResponse = GenericResource & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: GenericResource;
        [LROSYM]: LROResponseInfo;
    };
};

// @public
export type ResourcesUpdateResponse = GenericResource & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: GenericResource;
        [LROSYM]: LROResponseInfo;
    };
};

// @public
export interface ScopedDeployment {
    location: string;
    properties: DeploymentProperties;
}

// @public
export interface Sku {
    capacity?: number;
    family?: string;
    model?: string;
    name?: string;
    size?: string;
    tier?: string;
}

// @public
export interface SubResource {
    id?: string;
}

// @public
export interface TagCount {
    type?: string;
    value?: number;
}

// @public
export interface TagDetails {
    count?: TagCount;
    readonly id?: string;
    tagName?: string;
    values?: TagValue[];
}

// @public
export type TagsCreateOrUpdateResponse = TagDetails & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: TagDetails;
    };
};

// @public
export type TagsCreateOrUpdateValueResponse = TagValue & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: TagValue;
    };
};

// @public
export type TagsListNextResponse = TagsListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: TagsListResult;
    };
};

// @public
export type TagsListResponse = TagsListResult & {
    _response: coreHttp.HttpResponse & {
        bodyAsText: string;
        parsedBody: TagsListResult;
    };
};

// @public
export interface TagsListResult {
    readonly nextLink?: string;
    value?: TagDetails[];
}

// @public
export interface TagValue {
    count?: TagCount;
    readonly id?: string;
    tagValue?: string;
}

// @public
export interface TargetResource {
    id?: string;
    resourceName?: string;
    resourceType?: string;
}

// @public
export interface TemplateHashResult {
    minifiedTemplate?: string;
    templateHash?: string;
}

// @public
export interface TemplateLink {
    contentVersion?: string;
    uri: string;
}

// @public
export interface WhatIfChange {
    after?: any;
    before?: any;
    changeType: ChangeType;
    delta?: WhatIfPropertyChange[];
    resourceId: string;
}

// @public
export interface WhatIfOperationResult {
    changes?: WhatIfChange[];
    error?: ErrorResponse;
    status?: string;
}

// @public
export interface WhatIfPropertyChange {
    after?: any;
    before?: any;
    children?: WhatIfPropertyChange[];
    path: string;
    propertyChangeType: PropertyChangeType;
}

// @public
export type WhatIfResultFormat = "ResourceIdOnly" | "FullResourcePayloads";


// Warnings were encountered during analysis:
//
// src/models/index.ts:1588:5 - (ae-forgotten-export) The symbol "LROResponseInfo" needs to be exported by the entry point index.d.ts

// (No @packageDocumentation comment for this package)

```
