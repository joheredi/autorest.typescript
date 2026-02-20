import type { ResourceProvisioningState, TrackedResource } from "./src/models/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types *//**
 * Describes a Virtual Machine.
 */
export interface ComputeVirtualMachine extends TrackedResource {
  /**
   * The resource-specific properties for this resource.
   */
  properties?: ComputeVirtualMachineProperties;
}
/**
 * model interface ComputeVirtualMachineProperties
 */
export interface ComputeVirtualMachineProperties {
  readonly provisioningState?: ResourceProvisioningState;
}
/**
 * Create or update Restore Point collection parameters.
 */
export interface ComputeRestorePointCollection extends TrackedResource {
  /**
   * The resource-specific properties for this resource.
   */
  properties?: ComputeRestorePointCollectionProperties;
}
/**
 * The restore point collection properties.
 */
export interface ComputeRestorePointCollectionProperties {
  /**
   * The provisioning state of the restore point collection.
   */
  readonly provisioningState?: string;
  /**
   * This property determines whether instant access snapshot is enabled for restore points created under this restore point collection for Premium SSD v2 or Ultra disk. Instant access snapshot for Premium SSD v2 or Ultra disk is instantaneously available for restoring disk with fast restore performance.
   */
  instantAccess?: boolean;
}
/**
 * Concrete tracked resource types can be created by aliasing this type using a specific property type.
 */
export interface ComputeActionGroup extends TrackedResource {
  /**
   * The resource-specific properties for this resource.
   */
  properties?: ComputeActionGroupsProperties;
}
/**
 * model interface ComputeActionGroupsProperties
 */
export interface ComputeActionGroupsProperties {
  readonly provisioningState?: string;
}
