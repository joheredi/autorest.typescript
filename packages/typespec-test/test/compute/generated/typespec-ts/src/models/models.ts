import type { ComputeDiskActionGroup } from "./src/models/computeDisk/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types *//**
 * The provisioning state of a resource type.
 */
export enum KnownResourceProvisioningState {
  /**
   * Resource has been created.
   */
  Succeeded = "Succeeded",
  /**
   * Resource creation failed.
   */
  Failed = "Failed",
  /**
   * Resource creation was canceled.
   */
  Canceled = "Canceled",
}/**
 * The provisioning state of a resource type. \
 * {@link KnownResourceProvisioningState} can be used interchangeably with ResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type ResourceProvisioningState = string;
/**
 * The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location'
 */
export interface TrackedResource extends Resource {
  /**
   * Resource tags.
   */
  tags?: Record<string, string>;
  /**
   * The geo-location where the resource lives
   */
  location: string;
}
export type RecordStringString = Record<string, string>;
/**
 * Common fields that are returned in the response for all Azure Resource Manager resources
 */
export interface Resource {
  /**
   * Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}
   */
  readonly id?: string;
  /**
   * The name of the resource
   */
  readonly name?: string;
  /**
   * The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts"
   */
  readonly type?: string;
  /**
   * Azure Resource Manager metadata containing createdBy and modifiedBy information.
   */
  readonly systemData?: SystemData;
}
/**
 * Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemData {
  /**
   * The identity that created the resource.
   */
  createdBy?: string;
  /**
   * The type of identity that created the resource.
   */
  createdByType?: CreatedByType;
  /**
   * The timestamp of resource creation (UTC).
   */
  createdAt?: Date;
  /**
   * The identity that last modified the resource.
   */
  lastModifiedBy?: string;
  /**
   * The type of identity that last modified the resource.
   */
  lastModifiedByType?: CreatedByType;
  /**
   * The timestamp of resource last modification (UTC)
   */
  lastModifiedAt?: Date;
}
/**
 * The kind of entity that created the resource.
 */
export enum KnownCreatedByType {
  /**
   * The entity was created by a user.
   */
  User = "User",
  /**
   * The entity was created by an application.
   */
  Application = "Application",
  /**
   * The entity was created by a managed identity.
   */
  ManagedIdentity = "ManagedIdentity",
  /**
   * The entity was created by a key.
   */
  Key = "Key",
}/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;
/**
 * Common error response for all Azure Resource Manager APIs to return error details for failed operations.
 */
export interface ErrorResponse {
  /**
   * The error object.
   */
  error?: ErrorDetail;
}
/**
 * The error detail.
 */
export interface ErrorDetail {
  /**
   * The error code.
   */
  readonly code?: string;
  /**
   * The error message.
   */
  readonly message?: string;
  /**
   * The error target.
   */
  readonly target?: string;
  /**
   * The error details.
   */
  readonly details?: (ErrorDetail)[];
  /**
   * The error additional info.
   */
  readonly additionalInfo?: (ErrorAdditionalInfo)[];
}
export type ArrayErrorDetail = Array<ErrorDetail>;
export type ArrayErrorAdditionalInfo = Array<ErrorAdditionalInfo>;
/**
 * The resource management error additional info.
 */
export interface ErrorAdditionalInfo {
  /**
   * The additional info type.
   */
  readonly type?: string;
  /**
   * The additional info.
   */
  readonly info?: any;
}
/**
 * The response of a ActionGroup list operation.
 */
export interface _ActionGroupListResult {
  /**
   * The ActionGroup items on this page
   */
  value: (ComputeDiskActionGroup)[];
  /**
   * The link to the next page of items
   */
  nextLink?: string;
}
export type ArrayPrivateEndpointConnection = Array<PrivateEndpointConnection>;
/**
 * The private endpoint connection resource
 */
export interface PrivateEndpointConnection extends Resource {
  /**
   * The private endpoint connection properties
   */
  properties?: PrivateEndpointConnectionProperties;
}
/**
 * Properties of the private endpoint connection.
 */
export interface PrivateEndpointConnectionProperties {
  /**
   * The private endpoint resource.
   */
  privateEndpoint?: PrivateEndpoint;
  /**
   * A collection of information about the state of the connection between service consumer and provider.
   */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /**
   * The provisioning state of the private endpoint connection resource.
   */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}
/**
 * The private endpoint resource.
 */
export interface PrivateEndpoint {
  /**
   * The resource identifier of the private endpoint
   */
  readonly id?: string;
}
/**
 * A collection of information about the state of the connection between service consumer and provider.
 */
export interface PrivateLinkServiceConnectionState {
  /**
   * Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service.
   */
  status?: PrivateEndpointServiceConnectionStatus;
  /**
   * The reason for approval/rejection of the connection.
   */
  description?: string;
  /**
   * A message indicating if changes on the service provider require any updates on the consumer.
   */
  actionsRequired?: string;
}
/**
 * The private endpoint connection status.
 */
export enum KnownPrivateEndpointServiceConnectionStatus {
  /**
   * Connection waiting for approval or rejection
   */
  Pending = "Pending",
  /**
   * Connection approved
   */
  Approved = "Approved",
  /**
   * Connection Rejected
   */
  Rejected = "Rejected",
}/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Connection waiting for approval or rejection \
 * **Approved**: Connection approved \
 * **Rejected**: Connection Rejected
 */
export type PrivateEndpointServiceConnectionStatus = string;
/**
 * The current provisioning state.
 */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /**
   * Connection has been provisioned
   */
  Succeeded = "Succeeded",
  /**
   * Connection is being created
   */
  Creating = "Creating",
  /**
   * Connection is being deleted
   */
  Deleting = "Deleting",
  /**
   * Connection provisioning has failed
   */
  Failed = "Failed",
}/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Connection has been provisioned \
 * **Creating**: Connection is being created \
 * **Deleting**: Connection is being deleted \
 * **Failed**: Connection provisioning has failed
 */
export type PrivateEndpointConnectionProvisioningState = string;
