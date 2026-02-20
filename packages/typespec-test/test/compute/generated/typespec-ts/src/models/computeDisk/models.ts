import type { PrivateEndpointConnection, ResourceProvisioningState, TrackedResource } from "./src/models/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */export type ArrayComputeDiskActionGroup = Array<ComputeDiskActionGroup>;
/**
 * Concrete tracked resource types can be created by aliasing this type using a specific property type.
 */
export interface ComputeDiskActionGroup extends TrackedResource {
  /**
   * The resource-specific properties for this resource.
   */
  properties?: ComputeDiskActionGroupsProperties;
}
/**
 * model interface ComputeDiskActionGroupsProperties
 */
export interface ComputeDiskActionGroupsProperties {
  readonly provisioningState?: string;
}
/**
 * Disk resource.
 */
export interface ComputeDiskDisk extends TrackedResource {
  /**
   * The resource-specific properties for this resource.
   */
  properties?: ComputeDiskDiskProperties;
}
/**
 * Disk resource properties.
 */
export interface ComputeDiskDiskProperties {
  readonly provisioningState?: ResourceProvisioningState;
}
/**
 * Concrete tracked resource types can be created by aliasing this type using a specific property type.
 */
export interface ComputeDiskDiskAccess extends TrackedResource {
  /**
   * The resource-specific properties for this resource.
   */
  properties?: ComputeDiskDiskAccessProperties;
}
/**
 * model interface ComputeDiskDiskAccessProperties
 */
export interface ComputeDiskDiskAccessProperties {
  /**
   * A readonly collection of private endpoint connections created on the disk. Currently only one endpoint connection is supported.
   */
  readonly privateEndpointConnections?: (PrivateEndpointConnection)[];
  /**
   * The disk access resource provisioning state.
   */
  readonly provisioningState?: string;
  /**
   * The time when the disk access was created.
   */
  readonly timeCreated?: Date;
}
