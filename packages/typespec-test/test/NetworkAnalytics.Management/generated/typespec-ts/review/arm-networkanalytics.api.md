## API Report File for "@azure/arm-networkanalytics"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { AbortSignalLike } from '@azure/abort-controller';
import { ClientOptions } from '@azure-rest/core-client';
import { OperationOptions } from '@azure-rest/core-client';
import { OperationState } from '@azure/core-lro';
import { PathUncheckedResponse } from '@azure-rest/core-client';
import { Pipeline } from '@azure/core-rest-pipeline';
import { PollerLike } from '@azure/core-lro';
import { TokenCredential } from '@azure/core-auth';

// @public
export interface AccountSas {
    expiryTimeStamp: Date;
    ipAddress: string;
    startTimeStamp: Date;
}

// @public
export interface AccountSasToken {
    storageAccountSasToken: string;
}

// @public
export type ActionType = string;

// @public
export interface ConsumptionEndpointsProperties {
    readonly fileAccessResourceId?: string;
    readonly fileAccessUrl?: string;
    readonly ingestionResourceId?: string;
    readonly ingestionUrl?: string;
    readonly queryResourceId?: string;
    readonly queryUrl?: string;
}

// @public
export interface ContainerSaS {
    expiryTimeStamp: Date;
    ipAddress: string;
    startTimeStamp: Date;
}

// @public
export interface ContainerSasToken {
    storageContainerSasToken: string;
}

// @public
export type ContinuablePage<TElement, TPage = TElement[]> = TPage & {
    continuationToken?: string;
};

// @public
export type ControlState = string;

// @public
export type CreatedByType = string;

// @public
export interface DataProduct extends TrackedResource {
    identity?: ManagedServiceIdentity;
    properties?: DataProductProperties;
}

// @public
export interface DataProductInformation {
    dataProductName: string;
    dataProductVersions: DataProductVersion[];
    description: string;
}

// @public
export interface DataProductNetworkAcls {
    allowedQueryIpRangeList: string[];
    defaultAction: DefaultAction;
    ipRules: IPRules[];
    virtualNetworkRule: VirtualNetworkRule[];
}

// @public
export interface DataProductProperties {
    readonly availableMinorVersions?: string[];
    readonly consumptionEndpoints?: ConsumptionEndpointsProperties;
    currentMinorVersion?: string;
    customerEncryptionKey?: EncryptionKeyDetails;
    customerManagedKeyEncryptionEnabled?: ControlState;
    readonly documentation?: string;
    readonly keyVaultUrl?: string;
    majorVersion: string;
    managedResourceGroupConfiguration?: ManagedResourceGroupConfiguration;
    networkacls?: DataProductNetworkAcls;
    owners?: string[];
    privateLinksEnabled?: ControlState;
    product: string;
    readonly provisioningState?: ProvisioningState;
    publicNetworkAccess?: ControlState;
    publisher: string;
    purviewAccount?: string;
    purviewCollection?: string;
    redundancy?: ControlState;
    readonly resourceGuid?: string;
}

// @public (undocumented)
export interface DataProductsAddUserRoleOptionalParams extends OperationOptions {
}

// @public
export interface DataProductsCatalog extends ProxyResource {
    properties?: DataProductsCatalogProperties;
}

// @public
export interface DataProductsCatalogProperties {
    readonly provisioningState?: ProvisioningState;
    publishers: PublisherInformation[];
}

// @public (undocumented)
export interface DataProductsCatalogsGetOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsCatalogsListByResourceGroupOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsCatalogsListBySubscriptionOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsCatalogsOperations {
    // (undocumented)
    get: (resourceGroupName: string, options?: DataProductsCatalogsGetOptionalParams) => Promise<DataProductsCatalog>;
    // (undocumented)
    listByResourceGroup: (resourceGroupName: string, options?: DataProductsCatalogsListByResourceGroupOptionalParams) => PagedAsyncIterableIterator<DataProductsCatalog>;
    // (undocumented)
    listBySubscription: (options?: DataProductsCatalogsListBySubscriptionOptionalParams) => PagedAsyncIterableIterator<DataProductsCatalog>;
}

// @public (undocumented)
export interface DataProductsCreateOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public (undocumented)
export interface DataProductsDeleteOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public (undocumented)
export interface DataProductsGenerateStorageAccountSasTokenOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsGetOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsListByResourceGroupOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsListBySubscriptionOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsListRolesAssignmentsOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsOperations {
    // (undocumented)
    addUserRole: (resourceGroupName: string, dataProductName: string, body: RoleAssignmentCommonProperties, options?: DataProductsAddUserRoleOptionalParams) => Promise<RoleAssignmentDetail>;
    // (undocumented)
    create: (resourceGroupName: string, dataProductName: string, resource: DataProduct, options?: DataProductsCreateOptionalParams) => PollerLike<OperationState<DataProduct>, DataProduct>;
    // (undocumented)
    delete: (resourceGroupName: string, dataProductName: string, options?: DataProductsDeleteOptionalParams) => PollerLike<OperationState<void>, void>;
    // (undocumented)
    generateStorageAccountSasToken: (resourceGroupName: string, dataProductName: string, body: AccountSas, options?: DataProductsGenerateStorageAccountSasTokenOptionalParams) => Promise<AccountSasToken>;
    // (undocumented)
    get: (resourceGroupName: string, dataProductName: string, options?: DataProductsGetOptionalParams) => Promise<DataProduct>;
    // (undocumented)
    listByResourceGroup: (resourceGroupName: string, options?: DataProductsListByResourceGroupOptionalParams) => PagedAsyncIterableIterator<DataProduct>;
    // (undocumented)
    listBySubscription: (options?: DataProductsListBySubscriptionOptionalParams) => PagedAsyncIterableIterator<DataProduct>;
    // (undocumented)
    listRolesAssignments: (resourceGroupName: string, dataProductName: string, body: Record<string, any>, options?: DataProductsListRolesAssignmentsOptionalParams) => Promise<ListRoleAssignments>;
    // (undocumented)
    removeUserRole: (resourceGroupName: string, dataProductName: string, body: RoleAssignmentDetail, options?: DataProductsRemoveUserRoleOptionalParams) => Promise<void>;
    // (undocumented)
    rotateKey: (resourceGroupName: string, dataProductName: string, body: KeyVaultInfo, options?: DataProductsRotateKeyOptionalParams) => Promise<void>;
    // (undocumented)
    update: (resourceGroupName: string, dataProductName: string, properties: DataProductUpdate, options?: DataProductsUpdateOptionalParams) => PollerLike<OperationState<DataProduct>, DataProduct>;
}

// @public (undocumented)
export interface DataProductsRemoveUserRoleOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsRotateKeyOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataProductsUpdateOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export interface DataProductUpdate {
    identity?: ManagedServiceIdentity;
    // (undocumented)
    properties?: DataProductUpdateProperties;
    tags?: Record<string, string>;
}

// @public
export interface DataProductUpdateProperties {
    currentMinorVersion?: string;
    owners?: string[];
    privateLinksEnabled?: ControlState;
    purviewAccount?: string;
    purviewCollection?: string;
}

// @public
export type DataProductUserRole = string;

// @public
export interface DataProductVersion {
    version: string;
}

// @public
export interface DataType extends ProxyResource {
    properties?: DataTypeProperties;
}

// @public
export interface DataTypeProperties {
    databaseCacheRetention?: number;
    databaseRetention?: number;
    readonly provisioningState?: ProvisioningState;
    state?: DataTypeState;
    readonly stateReason?: string;
    storageOutputRetention?: number;
    readonly visualizationUrl?: string;
}

// @public (undocumented)
export interface DataTypesCreateOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public (undocumented)
export interface DataTypesDeleteDataOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public (undocumented)
export interface DataTypesDeleteOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public (undocumented)
export interface DataTypesGenerateStorageContainerSasTokenOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataTypesGetOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataTypesListByDataProductOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface DataTypesOperations {
    // (undocumented)
    create: (resourceGroupName: string, dataProductName: string, dataTypeName: string, resource: DataType, options?: DataTypesCreateOptionalParams) => PollerLike<OperationState<DataType>, DataType>;
    // (undocumented)
    delete: (resourceGroupName: string, dataProductName: string, dataTypeName: string, options?: DataTypesDeleteOptionalParams) => PollerLike<OperationState<void>, void>;
    // (undocumented)
    deleteData: (resourceGroupName: string, dataProductName: string, dataTypeName: string, body: Record<string, any>, options?: DataTypesDeleteDataOptionalParams) => PollerLike<OperationState<void>, void>;
    // (undocumented)
    generateStorageContainerSasToken: (resourceGroupName: string, dataProductName: string, dataTypeName: string, body: ContainerSaS, options?: DataTypesGenerateStorageContainerSasTokenOptionalParams) => Promise<ContainerSasToken>;
    // (undocumented)
    get: (resourceGroupName: string, dataProductName: string, dataTypeName: string, options?: DataTypesGetOptionalParams) => Promise<DataType>;
    // (undocumented)
    listByDataProduct: (resourceGroupName: string, dataProductName: string, options?: DataTypesListByDataProductOptionalParams) => PagedAsyncIterableIterator<DataType>;
    // (undocumented)
    update: (resourceGroupName: string, dataProductName: string, dataTypeName: string, properties: DataTypeUpdate, options?: DataTypesUpdateOptionalParams) => PollerLike<OperationState<DataType>, DataType>;
}

// @public
export type DataTypeState = string;

// @public (undocumented)
export interface DataTypesUpdateOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export interface DataTypeUpdate {
    // (undocumented)
    properties?: DataTypeUpdateProperties;
}

// @public
export interface DataTypeUpdateProperties {
    databaseCacheRetention?: number;
    databaseRetention?: number;
    state?: DataTypeState;
    storageOutputRetention?: number;
}

// @public
export type DefaultAction = string;

// @public
export interface EncryptionKeyDetails {
    keyName: string;
    keyVaultUri: string;
    keyVersion: string;
}

// @public
export interface ErrorAdditionalInfo {
    readonly info?: Record<string, any>;
    readonly type?: string;
}

// @public
export interface ErrorDetail {
    readonly additionalInfo?: ErrorAdditionalInfo[];
    readonly code?: string;
    readonly details?: ErrorDetail[];
    readonly message?: string;
    readonly target?: string;
}

// @public
export interface ErrorResponse {
    error?: ErrorDetail;
}

// @public
export interface IPRules {
    action: string;
    value?: string;
}

// @public
export interface KeyVaultInfo {
    keyVaultUrl: string;
}

// @public (undocumented)
export enum KnownActionType {
    // (undocumented)
    Internal = "Internal"
}

// @public (undocumented)
export enum KnownControlState {
    // (undocumented)
    Disabled = "Disabled",
    // (undocumented)
    Enabled = "Enabled"
}

// @public (undocumented)
export enum KnownCreatedByType {
    // (undocumented)
    Application = "Application",
    // (undocumented)
    Key = "Key",
    // (undocumented)
    ManagedIdentity = "ManagedIdentity",
    // (undocumented)
    User = "User"
}

// @public (undocumented)
export enum KnownDataProductUserRole {
    // (undocumented)
    Reader = "Reader",
    // (undocumented)
    SensitiveReader = "SensitiveReader"
}

// @public (undocumented)
export enum KnownDataTypeState {
    // (undocumented)
    Running = "Running",
    // (undocumented)
    Stopped = "Stopped"
}

// @public (undocumented)
export enum KnownDefaultAction {
    // (undocumented)
    Allow = "Allow",
    // (undocumented)
    Deny = "Deny"
}

// @public (undocumented)
export enum KnownManagedServiceIdentityType {
    // (undocumented)
    "SystemAssigned,UserAssigned" = "SystemAssigned,UserAssigned",
    // (undocumented)
    None = "None",
    // (undocumented)
    SystemAssigned = "SystemAssigned",
    // (undocumented)
    UserAssigned = "UserAssigned"
}

// @public (undocumented)
export enum KnownOrigin {
    // (undocumented)
    "user,system" = "user,system",
    // (undocumented)
    system = "system",
    // (undocumented)
    user = "user"
}

// @public (undocumented)
export enum KnownProvisioningState {
    // (undocumented)
    Accepted = "Accepted",
    // (undocumented)
    Canceled = "Canceled",
    // (undocumented)
    Deleting = "Deleting",
    // (undocumented)
    Failed = "Failed",
    // (undocumented)
    Provisioning = "Provisioning",
    // (undocumented)
    Succeeded = "Succeeded",
    // (undocumented)
    Updating = "Updating"
}

// @public
export interface ListRoleAssignments {
    count: number;
    roleAssignmentResponse: RoleAssignmentDetail[];
}

// @public
export interface ManagedResourceGroupConfiguration {
    location: string;
    name: string;
}

// @public
export interface ManagedServiceIdentity {
    readonly principalId?: string;
    readonly tenantId?: string;
    type: ManagedServiceIdentityType;
    userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

// @public
export type ManagedServiceIdentityType = string;

// @public (undocumented)
export class NetworkAnalyticsClient {
    constructor(credential: TokenCredential, subscriptionId: string, options?: NetworkAnalyticsClientOptions);
    readonly dataProducts: DataProductsOperations;
    readonly dataProductsCatalogs: DataProductsCatalogsOperations;
    readonly dataTypes: DataTypesOperations;
    readonly operations: OperationsOperations;
    readonly pipeline: Pipeline;
}

// @public (undocumented)
export interface NetworkAnalyticsClientOptions extends ClientOptions {
    apiVersion?: string;
}

// @public
export interface Operation {
    actionType?: ActionType;
    display?: OperationDisplay;
    readonly isDataAction?: boolean;
    readonly name?: string;
    readonly origin?: Origin;
}

// @public
export interface OperationDisplay {
    description?: string;
    operation?: string;
    provider?: string;
    resource?: string;
}

// @public (undocumented)
export interface OperationsListOptionalParams extends OperationOptions {
}

// @public (undocumented)
export interface OperationsOperations {
    // (undocumented)
    list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

// @public
export type Origin = string;

// @public
export interface PagedAsyncIterableIterator<TElement, TPage = TElement[], TPageSettings extends PageSettings = PageSettings> {
    [Symbol.asyncIterator](): PagedAsyncIterableIterator<TElement, TPage, TPageSettings>;
    byPage: (settings?: TPageSettings) => AsyncIterableIterator<ContinuablePage<TElement, TPage>>;
    next(): Promise<IteratorResult<TElement>>;
}

// @public
export interface PageSettings {
    continuationToken?: string;
}

// @public
export type ProvisioningState = string;

// @public
export interface ProxyResource extends Resource {
}

// @public
export interface PublisherInformation {
    dataProducts: DataProductInformation[];
    publisherName: string;
}

// @public
export interface Resource {
    readonly id?: string;
    readonly name?: string;
    readonly systemData?: SystemData;
    readonly type?: string;
}

// @public
export function restorePoller<TResponse extends PathUncheckedResponse, TResult>(client: NetworkAnalyticsClient, serializedState: string, sourceOperation: (...args: any[]) => PollerLike<OperationState<TResult>, TResult>, options?: RestorePollerOptions<TResult>): PollerLike<OperationState<TResult>, TResult>;

// @public (undocumented)
export interface RestorePollerOptions<TResult, TResponse extends PathUncheckedResponse = PathUncheckedResponse> extends OperationOptions {
    abortSignal?: AbortSignalLike;
    processResponseBody?: (result: TResponse) => Promise<TResult>;
    updateIntervalInMs?: number;
}

// @public
export interface RoleAssignmentCommonProperties {
    dataTypeScope: string[];
    principalId: string;
    principalType: string;
    role: DataProductUserRole;
    roleId: string;
    userName: string;
}

// @public
export interface RoleAssignmentDetail {
    dataTypeScope: string[];
    principalId: string;
    principalType: string;
    role: DataProductUserRole;
    roleAssignmentId: string;
    roleId: string;
    userName: string;
}

// @public
export interface SystemData {
    createdAt?: Date;
    createdBy?: string;
    createdByType?: CreatedByType;
    lastModifiedAt?: Date;
    lastModifiedBy?: string;
    lastModifiedByType?: CreatedByType;
}

// @public
export interface TrackedResource extends Resource {
    location: string;
    tags?: Record<string, string>;
}

// @public
export interface UserAssignedIdentity {
    readonly clientId?: string;
    readonly principalId?: string;
}

// @public
export type Versions = "2023-11-15";

// @public
export interface VirtualNetworkRule {
    action?: string;
    id: string;
    state?: string;
}

// (No @packageDocumentation comment for this package)

```
