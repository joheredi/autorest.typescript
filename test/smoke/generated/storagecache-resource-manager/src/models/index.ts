/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

/**
 * Result of the request to list Resource Provider operations. It contains a list of operations and a URL link to get the next set of results.
 */
export interface ApiOperationListResult {
  /**
   * URL to get the next set of operation list results if there are any.
   */
  nextLink?: string;
  /**
   * List of Resource Provider operations supported by the Microsoft.StorageCache resource provider.
   */
  value?: ApiOperation[];
}

/**
 * REST API operation description: see https://github.com/Azure/azure-rest-api-specs/blob/master/documentation/openapi-authoring-automated-guidelines.md#r3023-operationsapiimplementation
 */
export interface ApiOperation {
  /**
   * The object that represents the operation.
   */
  display?: ApiOperationDisplay;
  /**
   * Operation name: {provider}/{resource}/{operation}
   */
  name?: string;
}

/**
 * The object that represents the operation.
 */
export interface ApiOperationDisplay {
  /**
   * Operation type: Read, write, delete, etc.
   */
  operation?: string;
  /**
   * Service provider: Microsoft.StorageCache
   */
  provider?: string;
  /**
   * Resource on which the operation is performed: Cache, etc.
   */
  resource?: string;
}

/**
 * An error response.
 */
export interface CloudError {
  /**
   * The body of the error.
   */
  error?: CloudErrorBody;
}

/**
 * An error response.
 */
export interface CloudErrorBody {
  /**
   * An identifier for the error. Codes are invariant and are intended to be consumed programmatically.
   */
  code?: string;
  /**
   * A list of additional details about the error.
   */
  details?: CloudErrorBody[];
  /**
   * A message describing the error, intended to be suitable for display in a user interface.
   */
  message?: string;
  /**
   * The target of the particular error. For example, the name of the property in error.
   */
  target?: string;
}

/**
 * The response from the List Cache SKUs operation.
 */
export interface ResourceSkusResult {
  /**
   * The URI to fetch the next page of Cache SKUs.
   */
  nextLink?: string;
  /**
   * The list of SKUs available for the subscription.
   */
  readonly value?: ResourceSku[];
}

/**
 * A resource SKU.
 */
export interface ResourceSku {
  /**
   * The type of resource the SKU applies to.
   */
  readonly resourceType?: string;
  /**
   * A list of capabilities of this SKU, such as throughput or ops/sec.
   */
  capabilities?: ResourceSkuCapabilities[];
  /**
   * The set of locations that the SKU is available. This will be supported and registered Azure Geo Regions (e.g., West US, East US, Southeast Asia, etc.).
   */
  readonly locations?: string[];
  /**
   * The set of locations that the SKU is available.
   */
  locationInfo?: ResourceSkuLocationInfo[];
  /**
   * The name of this SKU.
   */
  name?: string;
  /**
   * The restrictions preventing this SKU from being used. This is empty if there are no restrictions.
   */
  restrictions?: Restriction[];
}

/**
 * A resource SKU capability.
 */
export interface ResourceSkuCapabilities {
  /**
   * Name of a capability, such as ops/sec.
   */
  name?: string;
  /**
   * Quantity, if the capability is measured by quantity.
   */
  value?: string;
}

/**
 * Resource SKU location information.
 */
export interface ResourceSkuLocationInfo {
  /**
   * Location where this SKU is available.
   */
  location?: string;
  /**
   * Zones if any.
   */
  zones?: string[];
}

/**
 * The restrictions preventing this SKU from being used.
 */
export interface Restriction {
  /**
   * The type of restrictions. In this version, the only possible value for this is location.
   */
  readonly type?: string;
  /**
   * The value of restrictions. If the restriction type is set to location, then this would be the different locations where the SKU is restricted.
   */
  readonly values?: string[];
  /**
   * The reason for the restriction. As of now this can be "QuotaId" or "NotAvailableForSubscription". "QuotaId" is set when the SKU has requiredQuotas parameter as the subscription does not belong to that quota. "NotAvailableForSubscription" is related to capacity at the datacenter.
   */
  reasonCode?: ReasonCode;
}

/**
 * A list of Cache usage models.
 */
export interface UsageModelsResult {
  /**
   * The URI to fetch the next page of Cache usage models.
   */
  nextLink?: string;
  /**
   * The list of usage models available for the subscription.
   */
  value?: UsageModel[];
}

/**
 * A usage model.
 */
export interface UsageModel {
  /**
   * Localized information describing this usage model.
   */
  display?: UsageModelDisplay;
  /**
   * Non-localized keyword name for this usage model.
   */
  modelName?: string;
  /**
   * The type of Storage Target to which this model is applicable (only nfs3 as of this version).
   */
  targetType?: string;
}

/**
 * Localized information describing this usage model.
 */
export interface UsageModelDisplay {
  /**
   * String to display for this usage model.
   */
  description?: string;
}

/**
 * Result of the request to list Caches. It contains a list of Caches and a URL link to get the next set of results.
 */
export interface CachesListResult {
  /**
   * URL to get the next set of Cache list results, if there are any.
   */
  nextLink?: string;
  /**
   * List of Caches.
   */
  value?: Cache[];
}

/**
 * A Cache instance. Follows Azure Resource Manager standards: https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/resource-api-reference.md
 */
export interface Cache {
  /**
   * ARM tags as name/value pairs.
   */
  tags?: any;
  /**
   * Resource ID of the Cache.
   */
  readonly id?: string;
  /**
   * Region name string.
   */
  location?: string;
  /**
   * Name of Cache.
   */
  readonly name?: string;
  /**
   * Type of the Cache; Microsoft.StorageCache/Cache
   */
  readonly type?: string;
  /**
   * SKU for the Cache.
   */
  sku?: CacheSku;
  /**
   * The size of this Cache, in GB.
   */
  cacheSizeGB?: number;
  /**
   * Health of the Cache.
   */
  readonly health?: CacheHealth;
  /**
   * Array of IP addresses that can be used by clients mounting this Cache.
   */
  readonly mountAddresses?: string[];
  /**
   * ARM provisioning state, see https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/Addendum.md#provisioningstate-property
   */
  provisioningState?: ProvisioningStateType;
  /**
   * Subnet used for the Cache.
   */
  subnet?: string;
  /**
   * Upgrade status of the Cache.
   */
  upgradeStatus?: CacheUpgradeStatus;
}

/**
 * An indication of Cache health. Gives more information about health than just that related to provisioning.
 */
export interface CacheHealth {
  /**
   * List of Cache health states.
   */
  state?: HealthStateType;
  /**
   * Describes explanation of state.
   */
  statusDescription?: string;
}

/**
 * Properties describing the software upgrade state of the Cache.
 */
export interface CacheUpgradeStatus {
  /**
   * Version string of the firmware currently installed on this Cache.
   */
  readonly currentFirmwareVersion?: string;
  /**
   * True if there is a firmware update ready to install on this Cache. The firmware will automatically be installed after firmwareUpdateDeadline if not triggered earlier via the upgrade operation.
   */
  readonly firmwareUpdateStatus?: FirmwareStatusType;
  /**
   * Time at which the pending firmware update will automatically be installed on the Cache.
   */
  readonly firmwareUpdateDeadline?: Date;
  /**
   * Time of the last successful firmware update.
   */
  readonly lastFirmwareUpdate?: Date;
  /**
   * When firmwareUpdateAvailable is true, this field holds the version string for the update.
   */
  readonly pendingFirmwareVersion?: string;
}

/**
 * SKU for the Cache.
 */
export interface CacheSku {
  /**
   * SKU name for this Cache.
   */
  name?: string;
}

/**
 * A list of Storage Targets.
 */
export interface StorageTargetsResult {
  /**
   * The URI to fetch the next page of Storage Targets.
   */
  nextLink?: string;
  /**
   * The list of Storage Targets defined for the Cache.
   */
  value?: StorageTarget[];
}

/**
 * A storage system being cached by a Cache.
 */
export interface StorageTarget {
  /**
   * Name of the Storage Target.
   */
  readonly name?: string;
  /**
   * Resource ID of the Storage Target.
   */
  readonly id?: string;
  /**
   * Type of the Storage Target; Microsoft.StorageCache/Cache/StorageTarget
   */
  readonly type?: string;
  /**
   * List of Cache namespace junctions to target for namespace associations.
   */
  junctions?: NamespaceJunction[];
  /**
   * Type of the Storage Target.
   */
  targetType?: StorageTargetType;
  /**
   * ARM provisioning state, see https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/Addendum.md#provisioningstate-property
   */
  provisioningState?: ProvisioningStateType;
  /**
   * Properties when targetType is nfs3.
   */
  nfs3?: Nfs3Target;
  /**
   * Properties when targetType is clfs.
   */
  clfs?: ClfsTarget;
  /**
   * Properties when targetType is unknown.
   */
  unknown?: UnknownTarget;
}

/**
 * A namespace junction.
 */
export interface NamespaceJunction {
  /**
   * Namespace path on a Cache for a Storage Target.
   */
  namespacePath?: string;
  /**
   * Path in Storage Target to which namespacePath points.
   */
  targetPath?: string;
  /**
   * NFS export where targetPath exists.
   */
  nfsExport?: string;
}

/**
 * An NFSv3 mount point for use as a Storage Target.
 */
export interface Nfs3Target {
  /**
   * IP address or host name of an NFSv3 host (e.g., 10.0.44.44).
   */
  target?: string;
  /**
   * Identifies the primary usage model to be used for this Storage Target. Get choices from .../usageModels
   */
  usageModel?: string;
}

/**
 * Storage container for use as a CLFS Storage Target.
 */
export interface ClfsTarget {
  /**
   * Resource ID of storage container.
   */
  target?: string;
}

/**
 * Storage container for use as an Unknown Storage Target.
 */
export interface UnknownTarget {
  /**
   * Dictionary of string->string pairs containing information about the Storage Target.
   */
  unknownMap?: { [propertyName: string]: string };
}

/**
 * Defines values for ReasonCode.
 */
export type ReasonCode = "QuotaId" | "NotAvailableForSubscription";
/**
 * Defines values for HealthStateType.
 */
export type HealthStateType =
  | "Unknown"
  | "Healthy"
  | "Degraded"
  | "Down"
  | "Transitioning"
  | "Stopping"
  | "Stopped"
  | "Upgrading"
  | "Flushing";
/**
 * Defines values for ProvisioningStateType.
 */
export type ProvisioningStateType =
  | "Succeeded"
  | "Failed"
  | "Cancelled"
  | "Creating"
  | "Deleting"
  | "Updating";
/**
 * Defines values for FirmwareStatusType.
 */
export type FirmwareStatusType = "available" | "unavailable";
/**
 * Defines values for StorageTargetType.
 */
export type StorageTargetType = "nfs3" | "clfs" | "unknown";

/**
 * Contains response data for the list operation.
 */
export type OperationsListResponse = ApiOperationListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApiOperationListResult;
  };
};

/**
 * Contains response data for the listNext operation.
 */
export type OperationsListNextResponse = ApiOperationListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ApiOperationListResult;
  };
};

/**
 * Contains response data for the list operation.
 */
export type SkusListResponse = ResourceSkusResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ResourceSkusResult;
  };
};

/**
 * Contains response data for the listNext operation.
 */
export type SkusListNextResponse = ResourceSkusResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ResourceSkusResult;
  };
};

/**
 * Contains response data for the list operation.
 */
export type UsageModelsListResponse = UsageModelsResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: UsageModelsResult;
  };
};

/**
 * Contains response data for the listNext operation.
 */
export type UsageModelsListNextResponse = UsageModelsResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: UsageModelsResult;
  };
};

/**
 * Contains response data for the list operation.
 */
export type CachesListResponse = CachesListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: CachesListResult;
  };
};

/**
 * Contains response data for the listByResourceGroup operation.
 */
export type CachesListByResourceGroupResponse = CachesListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: CachesListResult;
  };
};

/**
 * Contains response data for the delete operation.
 */
export type CachesDeleteResponse = {
  /**
   * The parsed response body.
   */
  body: any;

  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the get operation.
 */
export type CachesGetResponse = Cache & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Cache;
  };
};

/**
 * Optional parameters.
 */
export interface CachesCreateOrUpdateOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Object containing the user-selectable properties of the new Cache. If read-only properties are included, they must match the existing values of those properties.
   */
  cache?: Cache;
}

/**
 * Contains response data for the createOrUpdate operation.
 */
export type CachesCreateOrUpdateResponse = Cache & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Cache;
  };
};

/**
 * Optional parameters.
 */
export interface CachesUpdateOptionalParams extends coreHttp.OperationOptions {
  /**
   * Object containing the user-selectable properties of the Cache. If read-only properties are included, they must match the existing values of those properties.
   */
  cache?: Cache;
}

/**
 * Contains response data for the update operation.
 */
export type CachesUpdateResponse = Cache & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Cache;
  };
};

/**
 * Contains response data for the flush operation.
 */
export type CachesFlushResponse = {
  /**
   * The parsed response body.
   */
  body: any;

  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the start operation.
 */
export type CachesStartResponse = {
  /**
   * The parsed response body.
   */
  body: any;

  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the stop operation.
 */
export type CachesStopResponse = {
  /**
   * The parsed response body.
   */
  body: any;

  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the upgradeFirmware operation.
 */
export type CachesUpgradeFirmwareResponse = {
  /**
   * The parsed response body.
   */
  body: any;

  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the listNext operation.
 */
export type CachesListNextResponse = CachesListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: CachesListResult;
  };
};

/**
 * Contains response data for the listByResourceGroupNext operation.
 */
export type CachesListByResourceGroupNextResponse = CachesListResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: CachesListResult;
  };
};

/**
 * Contains response data for the listByCache operation.
 */
export type StorageTargetsListByCacheResponse = StorageTargetsResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: StorageTargetsResult;
  };
};

/**
 * Contains response data for the delete operation.
 */
export type StorageTargetsDeleteResponse = {
  /**
   * The parsed response body.
   */
  body: any;

  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: any;
  };
};

/**
 * Contains response data for the get operation.
 */
export type StorageTargetsGetResponse = StorageTarget & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: StorageTarget;
  };
};

/**
 * Optional parameters.
 */
export interface StorageTargetsCreateOrUpdateOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Object containing the definition of a Storage Target.
   */
  storagetarget?: StorageTarget;
}

/**
 * Contains response data for the createOrUpdate operation.
 */
export type StorageTargetsCreateOrUpdateResponse = StorageTarget & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: StorageTarget;
  };
};

/**
 * Contains response data for the listByCacheNext operation.
 */
export type StorageTargetsListByCacheNextResponse = StorageTargetsResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: StorageTargetsResult;
  };
};

/**
 * Optional parameters.
 */
export interface StorageCacheManagementClientOptionalParams
  extends coreHttp.ServiceClientOptions {
  /**
   * server parameter
   */
  $host?: string;
  /**
   * Api Version
   */
  apiVersion?: string;
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}
