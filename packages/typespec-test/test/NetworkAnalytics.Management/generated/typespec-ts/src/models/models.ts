// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  deserializeRecord,
  serializeRecord,
  passthroughDeserializer,
  deserializeUtcDateTime,
  withNullChecks,
  deserializeArray,
} from "../helpers/serializerHelpers.js";
import {
  TrackedResource as TrackedResourceRest,
  DataProduct as DataProductRest,
  DataProductProperties as DataProductPropertiesRest,
  EncryptionKeyDetails as EncryptionKeyDetailsRest,
  DataProductNetworkAcls as DataProductNetworkAclsRest,
  VirtualNetworkRule as VirtualNetworkRuleRest,
  IPRules as IPRulesRest,
  ManagedResourceGroupConfiguration as ManagedResourceGroupConfigurationRest,
  ManagedServiceIdentity as ManagedServiceIdentityRest,
  DataProductUpdate as DataProductUpdateRest,
  DataProductUpdateProperties as DataProductUpdatePropertiesRest,
  AccountSas as AccountSasRest,
  KeyVaultInfo as KeyVaultInfoRest,
  RoleAssignmentCommonProperties as RoleAssignmentCommonPropertiesRest,
  RoleAssignmentDetail as RoleAssignmentDetailRest,
  DataType as DataTypeRest,
  DataTypeProperties as DataTypePropertiesRest,
  DataTypeUpdate as DataTypeUpdateRest,
  DataTypeUpdateProperties as DataTypeUpdatePropertiesRest,
  ContainerSaS as ContainerSaSRest,
  AccountSasTokenOutput,
  ConsumptionEndpointsPropertiesOutput,
  ContainerSasTokenOutput,
  DataProductInformationOutput,
  DataProductListResultOutput,
  DataProductNetworkAclsOutput,
  DataProductOutput,
  DataProductPropertiesOutput,
  DataProductsCatalogListResultOutput,
  DataProductsCatalogOutput,
  DataProductsCatalogPropertiesOutput,
  DataProductVersionOutput,
  DataTypeListResultOutput,
  DataTypeOutput,
  DataTypePropertiesOutput,
  EncryptionKeyDetailsOutput,
  ErrorAdditionalInfoOutput,
  ErrorDetailOutput,
  ErrorResponseOutput,
  IPRulesOutput,
  ListRoleAssignmentsOutput,
  ManagedResourceGroupConfigurationOutput,
  ManagedServiceIdentityOutput,
  OperationDisplayOutput,
  OperationListResultOutput,
  OperationOutput,
  ProxyResourceOutput,
  PublisherInformationOutput,
  ResourceOutput,
  RoleAssignmentDetailOutput,
  SystemDataOutput,
  TrackedResourceOutput,
  UserAssignedIdentityOutput,
  VirtualNetworkRuleOutput,
} from "../rest/index.js";

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(item: Resource) {
  return item as any;
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

/** The kind of entity that created the resource. */
export type CreatedByType = string;

export enum KnownCreatedByType {
  User = "User",
  Application = "Application",
  ManagedIdentity = "ManagedIdentity",
  Key = "Key",
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(
  item: TrackedResource,
): TrackedResourceRest {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
  };
}

/** The data product resource. */
export interface DataProduct extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: DataProductProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function dataProductSerializer(item: DataProduct): DataProductRest {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
    properties: !item.properties
      ? item.properties
      : dataProductPropertiesSerializer(item.properties),
    identity: !item.identity
      ? item.identity
      : managedServiceIdentitySerializer(item.identity),
  };
}

/** The data product properties. */
export interface DataProductProperties {
  /** The resource GUID property of the data product resource. */
  readonly resourceGuid?: string;
  /** Latest provisioning state  of data product. */
  readonly provisioningState?: ProvisioningState;
  /** Data product publisher name. */
  publisher: string;
  /** Product name of data product. */
  product: string;
  /** Major version of data product. */
  majorVersion: string;
  /** List of name or email associated with data product resource deployment. */
  owners?: string[];
  /** Flag to enable or disable redundancy for data product. */
  redundancy?: ControlState;
  /** Purview account url for data product to connect to. */
  purviewAccount?: string;
  /** Purview collection url for data product to connect to. */
  purviewCollection?: string;
  /** Flag to enable or disable private link for data product resource. */
  privateLinksEnabled?: ControlState;
  /** Flag to enable or disable public access of data product resource. */
  publicNetworkAccess?: ControlState;
  /** Flag to enable customer managed key encryption for data product. */
  customerManagedKeyEncryptionEnabled?: ControlState;
  /** Customer managed encryption key details for data product. */
  customerEncryptionKey?: EncryptionKeyDetails;
  /** Network rule set for data product. */
  networkacls?: DataProductNetworkAcls;
  /** Managed resource group configuration. */
  managedResourceGroupConfiguration?: ManagedResourceGroupConfiguration;
  /** List of available minor versions of the data product resource. */
  readonly availableMinorVersions?: string[];
  /** Current configured minor version of the data product resource. */
  currentMinorVersion?: string;
  /** Documentation link for the data product based on definition file. */
  readonly documentation?: string;
  /** Resource links which exposed to the customer to query the data. */
  readonly consumptionEndpoints?: ConsumptionEndpointsProperties;
  /** Key vault url. */
  readonly keyVaultUrl?: string;
}

export function dataProductPropertiesSerializer(
  item: DataProductProperties,
): DataProductPropertiesRest {
  return {
    publisher: item["publisher"],
    product: item["product"],
    majorVersion: item["majorVersion"],
    owners: item["owners"],
    redundancy: item["redundancy"],
    purviewAccount: item["purviewAccount"],
    purviewCollection: item["purviewCollection"],
    privateLinksEnabled: item["privateLinksEnabled"],
    publicNetworkAccess: item["publicNetworkAccess"],
    customerManagedKeyEncryptionEnabled:
      item["customerManagedKeyEncryptionEnabled"],
    customerEncryptionKey: !item.customerEncryptionKey
      ? item.customerEncryptionKey
      : encryptionKeyDetailsSerializer(item.customerEncryptionKey),
    networkacls: !item.networkacls
      ? item.networkacls
      : dataProductNetworkAclsSerializer(item.networkacls),
    managedResourceGroupConfiguration: !item.managedResourceGroupConfiguration
      ? item.managedResourceGroupConfiguration
      : managedResourceGroupConfigurationSerializer(
          item.managedResourceGroupConfiguration,
        ),
    currentMinorVersion: item["currentMinorVersion"],
  };
}

/** The status of the current operation. */
export type ProvisioningState = string;

export enum KnownProvisioningState {
  Succeeded = "Succeeded",
  Failed = "Failed",
  Canceled = "Canceled",
  Provisioning = "Provisioning",
  Updating = "Updating",
  Deleting = "Deleting",
  Accepted = "Accepted",
}

/** The data type state */
export type ControlState = string;

export enum KnownControlState {
  Enabled = "Enabled",
  Disabled = "Disabled",
}

/** Encryption key details. */
export interface EncryptionKeyDetails {
  /** The Uri of the key vault. */
  keyVaultUri: string;
  /** The name of the key vault key. */
  keyName: string;
  /** The version of the key vault key. */
  keyVersion: string;
}

export function encryptionKeyDetailsSerializer(
  item: EncryptionKeyDetails,
): EncryptionKeyDetailsRest {
  return {
    keyVaultUri: item["keyVaultUri"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
  };
}

/** Data Product Network rule set */
export interface DataProductNetworkAcls {
  /** Virtual Network Rule */
  virtualNetworkRule: VirtualNetworkRule[];
  /** IP rule with specific IP or IP range in CIDR format. */
  ipRules: IPRules[];
  /** The list of query ips in the format of CIDR allowed to connect to query/visualization endpoint. */
  allowedQueryIpRangeList: string[];
  /** Default Action */
  defaultAction: DefaultAction;
}

export function dataProductNetworkAclsSerializer(
  item: DataProductNetworkAcls,
): DataProductNetworkAclsRest {
  return {
    virtualNetworkRule: item["virtualNetworkRule"].map(
      virtualNetworkRuleSerializer,
    ),
    ipRules: item["ipRules"].map(iPRulesSerializer),
    allowedQueryIpRangeList: item["allowedQueryIpRangeList"],
    defaultAction: item["defaultAction"],
  };
}

/** Virtual Network Rule */
export interface VirtualNetworkRule {
  /** Resource ID of a subnet */
  id: string;
  /** The action of virtual network rule. */
  action?: string;
  /** Gets the state of virtual network rule. */
  state?: string;
}

export function virtualNetworkRuleSerializer(
  item: VirtualNetworkRule,
): VirtualNetworkRuleRest {
  return {
    id: item["id"],
    action: item["action"],
    state: item["state"],
  };
}

/** IP rule with specific IP or IP range in CIDR format. */
export interface IPRules {
  /** IP Rules Value */
  value?: string;
  /** The action of virtual network rule. */
  action: string;
}

export function iPRulesSerializer(item: IPRules): IPRulesRest {
  return {
    value: item["value"],
    action: item["action"],
  };
}

/** Specifies the default action of allow or deny when no other rules match. */
export type DefaultAction = string;

export enum KnownDefaultAction {
  Allow = "Allow",
  Deny = "Deny",
}

/** ManagedResourceGroup related properties */
export interface ManagedResourceGroupConfiguration {
  /** Name of managed resource group */
  name: string;
  /** Managed Resource Group location */
  location: string;
}

export function managedResourceGroupConfigurationSerializer(
  item: ManagedResourceGroupConfiguration,
): ManagedResourceGroupConfigurationRest {
  return {
    name: item["name"],
    location: item["location"],
  };
}

/** Details of Consumption Properties */
export interface ConsumptionEndpointsProperties {
  /** Ingestion url to upload the data. */
  readonly ingestionUrl?: string;
  /** Resource Id of ingestion endpoint. */
  readonly ingestionResourceId?: string;
  /** Url to consume file type. */
  readonly fileAccessUrl?: string;
  /** Resource Id of file access endpoint. */
  readonly fileAccessResourceId?: string;
  /** Url to consume the processed data. */
  readonly queryUrl?: string;
  /** Resource Id of query endpoint. */
  readonly queryResourceId?: string;
}

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentitySerializer(
  item: ManagedServiceIdentity,
): ManagedServiceIdentityRest {
  return {
    type: item["type"],
    userAssignedIdentities: !item.userAssignedIdentities
      ? item.userAssignedIdentities
      : (serializeRecord(
          item.userAssignedIdentities as any,
          userAssignedIdentitySerializer,
        ) as any),
  };
}

/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
export type ManagedServiceIdentityType = string;

export enum KnownManagedServiceIdentityType {
  None = "None",
  SystemAssigned = "SystemAssigned",
  UserAssigned = "UserAssigned",
  "SystemAssigned,UserAssigned" = "SystemAssigned,UserAssigned",
}

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity) {
  return item as any;
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: Record<string, any>;
}

/** The type used for update operations of the DataProduct. */
export interface DataProductUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  properties?: DataProductUpdateProperties;
}

export function dataProductUpdateSerializer(
  item: DataProductUpdate,
): DataProductUpdateRest {
  return {
    identity: !item.identity
      ? item.identity
      : managedServiceIdentitySerializer(item.identity),
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    properties: !item.properties
      ? item.properties
      : dataProductUpdatePropertiesSerializer(item.properties),
  };
}

/** The updatable properties of the DataProduct. */
export interface DataProductUpdateProperties {
  /** List of name or email associated with data product resource deployment. */
  owners?: string[];
  /** Purview account url for data product to connect to. */
  purviewAccount?: string;
  /** Purview collection url for data product to connect to. */
  purviewCollection?: string;
  /** Flag to enable or disable private link for data product resource. */
  privateLinksEnabled?: ControlState;
  /** Current configured minor version of the data product resource. */
  currentMinorVersion?: string;
}

export function dataProductUpdatePropertiesSerializer(
  item: DataProductUpdateProperties,
): DataProductUpdatePropertiesRest {
  return {
    owners: item["owners"],
    purviewAccount: item["purviewAccount"],
    purviewCollection: item["purviewCollection"],
    privateLinksEnabled: item["privateLinksEnabled"],
    currentMinorVersion: item["currentMinorVersion"],
  };
}

/** The details for storage account sas creation. */
export interface AccountSas {
  /** Sas token start timestamp. */
  startTimeStamp: Date;
  /** Sas token expiry timestamp. */
  expiryTimeStamp: Date;
  /** Ip Address */
  ipAddress: string;
}

export function accountSasSerializer(item: AccountSas): AccountSasRest {
  return {
    startTimeStamp: item["startTimeStamp"].toISOString(),
    expiryTimeStamp: item["expiryTimeStamp"].toISOString(),
    ipAddress: item["ipAddress"],
  };
}

/** Details of storage account sas token . */
export interface AccountSasToken {
  /** Field to specify storage account sas token. */
  storageAccountSasToken: string;
}

/** Details for KeyVault. */
export interface KeyVaultInfo {
  /** key vault url. */
  keyVaultUrl: string;
}

export function keyVaultInfoSerializer(item: KeyVaultInfo): KeyVaultInfoRest {
  return {
    keyVaultUrl: item["keyVaultUrl"],
  };
}

/** The details for role assignment common properties. */
export interface RoleAssignmentCommonProperties {
  /** Role Id of the Built-In Role */
  roleId: string;
  /** Object ID of the AAD principal or security-group. */
  principalId: string;
  /** User name. */
  userName: string;
  /** Data Type Scope at which the role assignment is created. */
  dataTypeScope: string[];
  /** Type of the principal Id: User, Group or ServicePrincipal */
  principalType: string;
  /** Data Product role to be assigned to a user. */
  role: DataProductUserRole;
}

export function roleAssignmentCommonPropertiesSerializer(
  item: RoleAssignmentCommonProperties,
): RoleAssignmentCommonPropertiesRest {
  return {
    roleId: item["roleId"],
    principalId: item["principalId"],
    userName: item["userName"],
    dataTypeScope: item["dataTypeScope"],
    principalType: item["principalType"],
    role: item["role"],
  };
}

/** The data type state */
export type DataProductUserRole = string;

export enum KnownDataProductUserRole {
  Reader = "Reader",
  SensitiveReader = "SensitiveReader",
}

/** The details for role assignment response. */
export interface RoleAssignmentDetail {
  /** Role Id of the Built-In Role */
  roleId: string;
  /** Object ID of the AAD principal or security-group. */
  principalId: string;
  /** User name. */
  userName: string;
  /** Data Type Scope at which the role assignment is created. */
  dataTypeScope: string[];
  /** Type of the principal Id: User, Group or ServicePrincipal */
  principalType: string;
  /** Data Product role to be assigned to a user. */
  role: DataProductUserRole;
  /** Id of role assignment request */
  roleAssignmentId: string;
}

export function roleAssignmentDetailSerializer(
  item: RoleAssignmentDetail,
): RoleAssignmentDetailRest {
  return {
    roleId: item["roleId"],
    principalId: item["principalId"],
    userName: item["userName"],
    dataTypeScope: item["dataTypeScope"],
    principalType: item["principalType"],
    role: item["role"],
    roleAssignmentId: item["roleAssignmentId"],
  };
}

/** list role assignments. */
export interface ListRoleAssignments {
  /** Count of role assignments. */
  count: number;
  /** list of role assignments */
  roleAssignmentResponse: RoleAssignmentDetail[];
}

/** The response of a DataProduct list operation. */
export interface DataProductListResult {
  /** The DataProduct items on this page */
  value: DataProduct[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource) {
  return item as any;
}

/** The data type resource. */
export interface DataType extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DataTypeProperties;
}

export function dataTypeSerializer(item: DataType): DataTypeRest {
  return {
    properties: !item.properties
      ? item.properties
      : dataTypePropertiesSerializer(item.properties),
  };
}

/** The data type properties */
export interface DataTypeProperties {
  /** Latest provisioning state  of data product. */
  readonly provisioningState?: ProvisioningState;
  /** State of data type. */
  state?: DataTypeState;
  /** Reason for the state of data type. */
  readonly stateReason?: string;
  /** Field for storage output retention in days. */
  storageOutputRetention?: number;
  /** Field for database cache retention in days. */
  databaseCacheRetention?: number;
  /** Field for database data retention in days. */
  databaseRetention?: number;
  /** Url for data visualization. */
  readonly visualizationUrl?: string;
}

export function dataTypePropertiesSerializer(
  item: DataTypeProperties,
): DataTypePropertiesRest {
  return {
    state: item["state"],
    storageOutputRetention: item["storageOutputRetention"],
    databaseCacheRetention: item["databaseCacheRetention"],
    databaseRetention: item["databaseRetention"],
  };
}

/** The data type state */
export type DataTypeState = string;

export enum KnownDataTypeState {
  Stopped = "Stopped",
  Running = "Running",
}

/** The type used for update operations of the DataType. */
export interface DataTypeUpdate {
  properties?: DataTypeUpdateProperties;
}

export function dataTypeUpdateSerializer(
  item: DataTypeUpdate,
): DataTypeUpdateRest {
  return {
    properties: !item.properties
      ? item.properties
      : dataTypeUpdatePropertiesSerializer(item.properties),
  };
}

/** The updatable properties of the DataType. */
export interface DataTypeUpdateProperties {
  /** State of data type. */
  state?: DataTypeState;
  /** Field for storage output retention in days. */
  storageOutputRetention?: number;
  /** Field for database cache retention in days. */
  databaseCacheRetention?: number;
  /** Field for database data retention in days. */
  databaseRetention?: number;
}

export function dataTypeUpdatePropertiesSerializer(
  item: DataTypeUpdateProperties,
): DataTypeUpdatePropertiesRest {
  return {
    state: item["state"],
    storageOutputRetention: item["storageOutputRetention"],
    databaseCacheRetention: item["databaseCacheRetention"],
    databaseRetention: item["databaseRetention"],
  };
}

/** The details for container sas creation. */
export interface ContainerSaS {
  /** Sas token start timestamp. */
  startTimeStamp: Date;
  /** Sas token expiry timestamp. */
  expiryTimeStamp: Date;
  /** Ip Address */
  ipAddress: string;
}

export function containerSaSSerializer(item: ContainerSaS): ContainerSaSRest {
  return {
    startTimeStamp: item["startTimeStamp"].toISOString(),
    expiryTimeStamp: item["expiryTimeStamp"].toISOString(),
    ipAddress: item["ipAddress"],
  };
}

/** Details of storage container account sas token . */
export interface ContainerSasToken {
  /** Field to specify storage container sas token. */
  storageContainerSasToken: string;
}

/** The response of a DataType list operation. */
export interface DataTypeListResult {
  /** The DataType items on this page */
  value: DataType[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** The data catalog resource. */
export interface DataProductsCatalog extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DataProductsCatalogProperties;
}

/** Details for data catalog properties. */
export interface DataProductsCatalogProperties {
  /** The data catalog provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** The data product publisher information. */
  publishers: PublisherInformation[];
}

/** Details for Publisher Information. */
export interface PublisherInformation {
  /** Name of the publisher. */
  publisherName: string;
  /** Data product information. */
  dataProducts: DataProductInformation[];
}

/** Data Product Information */
export interface DataProductInformation {
  /** Name of data product. */
  dataProductName: string;
  /** Description about data product. */
  description: string;
  /** Version information of data product. */
  dataProductVersions: DataProductVersion[];
}

/** Data Product Version. */
export interface DataProductVersion {
  /** Version of data product */
  version: string;
}

/** The response of a DataProductsCatalog list operation. */
export interface DataProductsCatalogListResult {
  /** The DataProductsCatalog items on this page */
  value: DataProductsCatalog[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  actionType?: ActionType;
}

/** Localized display information for and operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  description?: string;
}

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export type Origin = string;

export enum KnownOrigin {
  user = "user",
  system = "system",
  "user,system" = "user,system",
}

/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export type ActionType = string;

export enum KnownActionType {
  Internal = "Internal",
}

/** The available API versions for the Microsoft.NetworkAnalytics RP. */
export type Versions = "2023-11-15";

/** This interface for an anonymous model */
interface ErrorAdditionalInfoInfo {}

function _deserializeResource(input: ResourceOutput): Resource {
  return {
    id: passthroughDeserializer(input["id"]) as any,
    name: passthroughDeserializer(input["name"]) as any,
    type: passthroughDeserializer(input["type"]) as any,
    systemData: deserializeSystemData(input["systemData"]) as any,
  } as any;
}

export const deserializeResource = withNullChecks(_deserializeResource);

function _deserializeSystemData(input: SystemDataOutput): SystemData {
  return {
    createdBy: passthroughDeserializer(input["createdBy"]) as any,
    createdByType: passthroughDeserializer(
      input["createdByType"] as any,
    ) as any,
    createdAt: deserializeUtcDateTime(input["createdAt"]) as any,
    lastModifiedBy: passthroughDeserializer(input["lastModifiedBy"]) as any,
    lastModifiedByType: passthroughDeserializer(
      input["lastModifiedByType"] as any,
    ) as any,
    lastModifiedAt: deserializeUtcDateTime(input["lastModifiedAt"]) as any,
  } as any;
}

export const deserializeSystemData = withNullChecks(_deserializeSystemData);

function _deserializeTrackedResource(
  input: TrackedResourceOutput,
): TrackedResource {
  return {
    ...deserializeResource(input),
    tags: deserializeRecord(input["tags"], passthroughDeserializer) as any,
    location: passthroughDeserializer(input["location"]) as any,
  } as any;
}

export const deserializeTrackedResource = withNullChecks(
  _deserializeTrackedResource,
);

function _deserializeDataProduct(input: DataProductOutput): DataProduct {
  return {
    ...deserializeTrackedResource(input),
    properties: deserializeDataProductProperties(input["properties"]) as any,
    name: passthroughDeserializer(input["name"]) as any,
    identity: deserializeManagedServiceIdentity(input["identity"]) as any,
  } as any;
}

export const deserializeDataProduct = withNullChecks(_deserializeDataProduct);

function _deserializeDataProductProperties(
  input: DataProductPropertiesOutput,
): DataProductProperties {
  return {
    resourceGuid: passthroughDeserializer(input["resourceGuid"]) as any,
    provisioningState: passthroughDeserializer(
      input["provisioningState"] as any,
    ) as any,
    publisher: passthroughDeserializer(input["publisher"]) as any,
    product: passthroughDeserializer(input["product"]) as any,
    majorVersion: passthroughDeserializer(input["majorVersion"]) as any,
    owners: deserializeArray(input["owners"], passthroughDeserializer) as any,
    redundancy: passthroughDeserializer(input["redundancy"] as any) as any,
    purviewAccount: passthroughDeserializer(input["purviewAccount"]) as any,
    purviewCollection: passthroughDeserializer(
      input["purviewCollection"],
    ) as any,
    privateLinksEnabled: passthroughDeserializer(
      input["privateLinksEnabled"] as any,
    ) as any,
    publicNetworkAccess: passthroughDeserializer(
      input["publicNetworkAccess"] as any,
    ) as any,
    customerManagedKeyEncryptionEnabled: passthroughDeserializer(
      input["customerManagedKeyEncryptionEnabled"] as any,
    ) as any,
    customerEncryptionKey: deserializeEncryptionKeyDetails(
      input["customerEncryptionKey"],
    ) as any,
    networkacls: deserializeDataProductNetworkAcls(input["networkacls"]) as any,
    managedResourceGroupConfiguration:
      deserializeManagedResourceGroupConfiguration(
        input["managedResourceGroupConfiguration"],
      ) as any,
    availableMinorVersions: deserializeArray(
      input["availableMinorVersions"],
      passthroughDeserializer,
    ) as any,
    currentMinorVersion: passthroughDeserializer(
      input["currentMinorVersion"],
    ) as any,
    documentation: passthroughDeserializer(input["documentation"]) as any,
    consumptionEndpoints: deserializeConsumptionEndpointsProperties(
      input["consumptionEndpoints"],
    ) as any,
    keyVaultUrl: passthroughDeserializer(input["keyVaultUrl"]) as any,
  } as any;
}

export const deserializeDataProductProperties = withNullChecks(
  _deserializeDataProductProperties,
);

function _deserializeEncryptionKeyDetails(
  input: EncryptionKeyDetailsOutput,
): EncryptionKeyDetails {
  return {
    keyVaultUri: passthroughDeserializer(input["keyVaultUri"]) as any,
    keyName: passthroughDeserializer(input["keyName"]) as any,
    keyVersion: passthroughDeserializer(input["keyVersion"]) as any,
  } as any;
}

export const deserializeEncryptionKeyDetails = withNullChecks(
  _deserializeEncryptionKeyDetails,
);

function _deserializeDataProductNetworkAcls(
  input: DataProductNetworkAclsOutput,
): DataProductNetworkAcls {
  return {
    virtualNetworkRule: deserializeArray(
      input["virtualNetworkRule"],
      deserializeVirtualNetworkRule,
    ) as any,
    ipRules: deserializeArray(input["ipRules"], deserializeIPRules) as any,
    allowedQueryIpRangeList: deserializeArray(
      input["allowedQueryIpRangeList"],
      passthroughDeserializer,
    ) as any,
    defaultAction: passthroughDeserializer(
      input["defaultAction"] as any,
    ) as any,
  } as any;
}

export const deserializeDataProductNetworkAcls = withNullChecks(
  _deserializeDataProductNetworkAcls,
);

function _deserializeVirtualNetworkRule(
  input: VirtualNetworkRuleOutput,
): VirtualNetworkRule {
  return {
    id: passthroughDeserializer(input["id"]) as any,
    action: passthroughDeserializer(input["action"]) as any,
    state: passthroughDeserializer(input["state"]) as any,
  } as any;
}

export const deserializeVirtualNetworkRule = withNullChecks(
  _deserializeVirtualNetworkRule,
);

function _deserializeIPRules(input: IPRulesOutput): IPRules {
  return {
    value: passthroughDeserializer(input["value"]) as any,
    action: passthroughDeserializer(input["action"]) as any,
  } as any;
}

export const deserializeIPRules = withNullChecks(_deserializeIPRules);

function _deserializeManagedResourceGroupConfiguration(
  input: ManagedResourceGroupConfigurationOutput,
): ManagedResourceGroupConfiguration {
  return {
    name: passthroughDeserializer(input["name"]) as any,
    location: passthroughDeserializer(input["location"]) as any,
  } as any;
}

export const deserializeManagedResourceGroupConfiguration = withNullChecks(
  _deserializeManagedResourceGroupConfiguration,
);

function _deserializeConsumptionEndpointsProperties(
  input: ConsumptionEndpointsPropertiesOutput,
): ConsumptionEndpointsProperties {
  return {
    ingestionUrl: passthroughDeserializer(input["ingestionUrl"]) as any,
    ingestionResourceId: passthroughDeserializer(
      input["ingestionResourceId"],
    ) as any,
    fileAccessUrl: passthroughDeserializer(input["fileAccessUrl"]) as any,
    fileAccessResourceId: passthroughDeserializer(
      input["fileAccessResourceId"],
    ) as any,
    queryUrl: passthroughDeserializer(input["queryUrl"]) as any,
    queryResourceId: passthroughDeserializer(input["queryResourceId"]) as any,
  } as any;
}

export const deserializeConsumptionEndpointsProperties = withNullChecks(
  _deserializeConsumptionEndpointsProperties,
);

function _deserializeManagedServiceIdentity(
  input: ManagedServiceIdentityOutput,
): ManagedServiceIdentity {
  return {
    principalId: passthroughDeserializer(input["principalId"]) as any,
    tenantId: passthroughDeserializer(input["tenantId"]) as any,
    type: passthroughDeserializer(input["type"] as any) as any,
    userAssignedIdentities: deserializeRecord(
      input["userAssignedIdentities"],
      deserializeUserAssignedIdentity,
    ) as any,
  } as any;
}

export const deserializeManagedServiceIdentity = withNullChecks(
  _deserializeManagedServiceIdentity,
);

function _deserializeUserAssignedIdentity(
  input: UserAssignedIdentityOutput,
): UserAssignedIdentity {
  return {
    principalId: passthroughDeserializer(input["principalId"]) as any,
    clientId: passthroughDeserializer(input["clientId"]) as any,
  } as any;
}

export const deserializeUserAssignedIdentity = withNullChecks(
  _deserializeUserAssignedIdentity,
);

function _deserializeErrorResponse(input: ErrorResponseOutput): ErrorResponse {
  return {
    error: deserializeErrorDetail(input["error"]) as any,
  } as any;
}

export const deserializeErrorResponse = withNullChecks(
  _deserializeErrorResponse,
);

function _deserializeErrorDetail(input: ErrorDetailOutput): ErrorDetail {
  return {
    code: passthroughDeserializer(input["code"]) as any,
    message: passthroughDeserializer(input["message"]) as any,
    target: passthroughDeserializer(input["target"]) as any,
    details: deserializeArray(input["details"], deserializeErrorDetail) as any,
    additionalInfo: deserializeArray(
      input["additionalInfo"],
      deserializeErrorAdditionalInfo,
    ) as any,
  } as any;
}

export const deserializeErrorDetail = withNullChecks(_deserializeErrorDetail);

function _deserializeErrorAdditionalInfo(
  input: ErrorAdditionalInfoOutput,
): ErrorAdditionalInfo {
  return {
    type: passthroughDeserializer(input["type"]) as any,
    info: deserializeErrorAdditionalInfoInfo(input["info"]) as any,
  } as any;
}

export const deserializeErrorAdditionalInfo = withNullChecks(
  _deserializeErrorAdditionalInfo,
);

function _deserializeAccountSasToken(
  input: AccountSasTokenOutput,
): AccountSasToken {
  return {
    storageAccountSasToken: passthroughDeserializer(
      input["storageAccountSasToken"],
    ) as any,
  } as any;
}

export const deserializeAccountSasToken = withNullChecks(
  _deserializeAccountSasToken,
);

function _deserializeRoleAssignmentDetail(
  input: RoleAssignmentDetailOutput,
): RoleAssignmentDetail {
  return {
    roleId: passthroughDeserializer(input["roleId"]) as any,
    principalId: passthroughDeserializer(input["principalId"]) as any,
    userName: passthroughDeserializer(input["userName"]) as any,
    dataTypeScope: deserializeArray(
      input["dataTypeScope"],
      passthroughDeserializer,
    ) as any,
    principalType: passthroughDeserializer(input["principalType"]) as any,
    role: passthroughDeserializer(input["role"] as any) as any,
    roleAssignmentId: passthroughDeserializer(input["roleAssignmentId"]) as any,
  } as any;
}

export const deserializeRoleAssignmentDetail = withNullChecks(
  _deserializeRoleAssignmentDetail,
);

function _deserializeListRoleAssignments(
  input: ListRoleAssignmentsOutput,
): ListRoleAssignments {
  return {
    count: passthroughDeserializer(input["count"]) as any,
    roleAssignmentResponse: deserializeArray(
      input["roleAssignmentResponse"],
      deserializeRoleAssignmentDetail,
    ) as any,
  } as any;
}

export const deserializeListRoleAssignments = withNullChecks(
  _deserializeListRoleAssignments,
);

function _deserializeDataProductListResult(
  input: DataProductListResultOutput,
): DataProductListResult {
  return {
    value: deserializeArray(input["value"], deserializeDataProduct) as any,
    nextLink: passthroughDeserializer(input["nextLink"]) as any,
  } as any;
}

export const deserializeDataProductListResult = withNullChecks(
  _deserializeDataProductListResult,
);

function _deserializeProxyResource(input: ProxyResourceOutput): ProxyResource {
  return input as ProxyResource;
}

export const deserializeProxyResource = withNullChecks(
  _deserializeProxyResource,
);

function _deserializeDataType(input: DataTypeOutput): DataType {
  return {
    ...deserializeProxyResource(input),
    properties: deserializeDataTypeProperties(input["properties"]) as any,
    name: passthroughDeserializer(input["name"]) as any,
  } as any;
}

export const deserializeDataType = withNullChecks(_deserializeDataType);

function _deserializeDataTypeProperties(
  input: DataTypePropertiesOutput,
): DataTypeProperties {
  return {
    provisioningState: passthroughDeserializer(
      input["provisioningState"] as any,
    ) as any,
    state: passthroughDeserializer(input["state"] as any) as any,
    stateReason: passthroughDeserializer(input["stateReason"]) as any,
    storageOutputRetention: passthroughDeserializer(
      input["storageOutputRetention"],
    ) as any,
    databaseCacheRetention: passthroughDeserializer(
      input["databaseCacheRetention"],
    ) as any,
    databaseRetention: passthroughDeserializer(
      input["databaseRetention"],
    ) as any,
    visualizationUrl: passthroughDeserializer(input["visualizationUrl"]) as any,
  } as any;
}

export const deserializeDataTypeProperties = withNullChecks(
  _deserializeDataTypeProperties,
);

function _deserializeContainerSasToken(
  input: ContainerSasTokenOutput,
): ContainerSasToken {
  return {
    storageContainerSasToken: passthroughDeserializer(
      input["storageContainerSasToken"],
    ) as any,
  } as any;
}

export const deserializeContainerSasToken = withNullChecks(
  _deserializeContainerSasToken,
);

function _deserializeDataTypeListResult(
  input: DataTypeListResultOutput,
): DataTypeListResult {
  return {
    value: deserializeArray(input["value"], deserializeDataType) as any,
    nextLink: passthroughDeserializer(input["nextLink"]) as any,
  } as any;
}

export const deserializeDataTypeListResult = withNullChecks(
  _deserializeDataTypeListResult,
);

function _deserializeDataProductsCatalog(
  input: DataProductsCatalogOutput,
): DataProductsCatalog {
  return {
    ...deserializeProxyResource(input),
    properties: deserializeDataProductsCatalogProperties(
      input["properties"],
    ) as any,
    name: passthroughDeserializer(input["name"]) as any,
  } as any;
}

export const deserializeDataProductsCatalog = withNullChecks(
  _deserializeDataProductsCatalog,
);

function _deserializeDataProductsCatalogProperties(
  input: DataProductsCatalogPropertiesOutput,
): DataProductsCatalogProperties {
  return {
    provisioningState: passthroughDeserializer(
      input["provisioningState"] as any,
    ) as any,
    publishers: deserializeArray(
      input["publishers"],
      deserializePublisherInformation,
    ) as any,
  } as any;
}

export const deserializeDataProductsCatalogProperties = withNullChecks(
  _deserializeDataProductsCatalogProperties,
);

function _deserializePublisherInformation(
  input: PublisherInformationOutput,
): PublisherInformation {
  return {
    publisherName: passthroughDeserializer(input["publisherName"]) as any,
    dataProducts: deserializeArray(
      input["dataProducts"],
      deserializeDataProductInformation,
    ) as any,
  } as any;
}

export const deserializePublisherInformation = withNullChecks(
  _deserializePublisherInformation,
);

function _deserializeDataProductInformation(
  input: DataProductInformationOutput,
): DataProductInformation {
  return {
    dataProductName: passthroughDeserializer(input["dataProductName"]) as any,
    description: passthroughDeserializer(input["description"]) as any,
    dataProductVersions: deserializeArray(
      input["dataProductVersions"],
      deserializeDataProductVersion,
    ) as any,
  } as any;
}

export const deserializeDataProductInformation = withNullChecks(
  _deserializeDataProductInformation,
);

function _deserializeDataProductVersion(
  input: DataProductVersionOutput,
): DataProductVersion {
  return {
    version: passthroughDeserializer(input["version"]) as any,
  } as any;
}

export const deserializeDataProductVersion = withNullChecks(
  _deserializeDataProductVersion,
);

function _deserializeDataProductsCatalogListResult(
  input: DataProductsCatalogListResultOutput,
): DataProductsCatalogListResult {
  return {
    value: deserializeArray(
      input["value"],
      deserializeDataProductsCatalog,
    ) as any,
    nextLink: passthroughDeserializer(input["nextLink"]) as any,
  } as any;
}

export const deserializeDataProductsCatalogListResult = withNullChecks(
  _deserializeDataProductsCatalogListResult,
);

function _deserializeOperationListResult(
  input: OperationListResultOutput,
): OperationListResult {
  return {
    value: deserializeArray(input["value"], deserializeOperation) as any,
    nextLink: passthroughDeserializer(input["nextLink"]) as any,
  } as any;
}

export const deserializeOperationListResult = withNullChecks(
  _deserializeOperationListResult,
);

function _deserializeOperation(input: OperationOutput): Operation {
  return {
    name: passthroughDeserializer(input["name"]) as any,
    isDataAction: passthroughDeserializer(input["isDataAction"]) as any,
    display: deserializeOperationDisplay(input["display"]) as any,
    origin: passthroughDeserializer(input["origin"] as any) as any,
    actionType: passthroughDeserializer(input["actionType"] as any) as any,
  } as any;
}

export const deserializeOperation = withNullChecks(_deserializeOperation);

function _deserializeOperationDisplay(
  input: OperationDisplayOutput,
): OperationDisplay {
  return {
    provider: passthroughDeserializer(input["provider"]) as any,
    resource: passthroughDeserializer(input["resource"]) as any,
    operation: passthroughDeserializer(input["operation"]) as any,
    description: passthroughDeserializer(input["description"]) as any,
  } as any;
}

export const deserializeOperationDisplay = withNullChecks(
  _deserializeOperationDisplay,
);

function _deserializeErrorAdditionalInfoInfo(
  input: any,
): ErrorAdditionalInfoInfo {
  return input as ErrorAdditionalInfoInfo;
}

export const deserializeErrorAdditionalInfoInfo = withNullChecks(
  _deserializeErrorAdditionalInfoInfo,
);
