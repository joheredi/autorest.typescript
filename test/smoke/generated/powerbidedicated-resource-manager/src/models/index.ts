/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

/**
 * Represents an instance of an PowerBI Dedicated resource.
 */
export interface Resource {
  /**
   * An identifier that represents the PowerBI Dedicated resource.
   */
  readonly id?: string;
  /**
   * The name of the PowerBI Dedicated resource.
   */
  readonly name?: string;
  /**
   * The type of the PowerBI Dedicated resource.
   */
  readonly type?: string;
  /**
   * Location of the PowerBI Dedicated resource.
   */
  location: string;
  /**
   * The SKU of the PowerBI Dedicated resource.
   */
  sku: ResourceSku;
  /**
   * Key-value pairs of additional resource provisioning properties.
   */
  tags?: { [propertyName: string]: string };
}

/**
 * Represents the SKU name and Azure pricing tier for PowerBI Dedicated resource.
 */
export interface ResourceSku {
  /**
   * Name of the SKU level.
   */
  name: string;
  /**
   * The name of the Azure pricing tier to which the SKU applies.
   */
  tier?: "PBIE_Azure";
}

/**
 * Represents an instance of a Dedicated Capacity resource.
 */
export type DedicatedCapacity = Resource & {
  /**
   * A collection of Dedicated capacity administrators
   */
  administration?: DedicatedCapacityAdministrators;
  /**
   * The current state of PowerBI Dedicated resource. The state is to indicate more states outside of resource provisioning.
   */
  readonly state?: State;
  /**
   * The current deployment state of PowerBI Dedicated resource. The provisioningState is to indicate states for resource provisioning.
   */
  readonly provisioningState?: ProvisioningState;
};

/**
 * An object that represents a set of mutable Dedicated capacity resource properties.
 */
export interface DedicatedCapacityMutableProperties {
  /**
   * A collection of Dedicated capacity administrators
   */
  administration?: DedicatedCapacityAdministrators;
}

/**
 * An array of administrator user identities
 */
export interface DedicatedCapacityAdministrators {
  /**
   * An array of administrator user identities.
   */
  members?: string[];
}

/**
 * Properties of Dedicated Capacity resource.
 */
export type DedicatedCapacityProperties = DedicatedCapacityMutableProperties & {
  /**
   * The current state of PowerBI Dedicated resource. The state is to indicate more states outside of resource provisioning.
   */
  readonly state?: State;
  /**
   * The current deployment state of PowerBI Dedicated resource. The provisioningState is to indicate states for resource provisioning.
   */
  readonly provisioningState?: ProvisioningState;
};

/**
 * Provision request specification
 */
export interface DedicatedCapacityUpdateParameters {
  /**
   * The SKU of the Dedicated capacity resource.
   */
  sku?: ResourceSku;
  /**
   * Key-value pairs of additional provisioning properties.
   */
  tags?: { [propertyName: string]: string };
  /**
   * A collection of Dedicated capacity administrators
   */
  administration?: DedicatedCapacityAdministrators;
}

/**
 * An array of Dedicated capacities resources.
 */
export interface DedicatedCapacities {
  /**
   * An array of Dedicated capacities resources.
   */
  value: DedicatedCapacity[];
}

/**
 * An object that represents enumerating SKUs for new resources
 */
export interface SkuEnumerationForNewResourceResult {
  /**
   * The collection of available SKUs for new resources
   */
  value?: ResourceSku[];
}

/**
 * An object that represents enumerating SKUs for existing resources
 */
export interface SkuEnumerationForExistingResourceResult {
  /**
   * The collection of available SKUs for existing resources
   */
  value?: SkuDetailsForExistingResource[];
}

/**
 * An object that represents SKU details for existing resources
 */
export interface SkuDetailsForExistingResource {
  /**
   * The SKU in SKU details for existing resources.
   */
  sku?: ResourceSku;
}

/**
 * Result listing capacities. It contains a list of operations and a URL link to get the next set of results.
 */
export interface OperationListResult {
  /**
   * List of capacities supported by the Microsoft.PowerBIDedicated resource provider.
   */
  readonly value?: Operation[];
  /**
   * URL to get the next set of operation list results if there are any.
   */
  readonly nextLink?: string;
}

/**
 * Capacities REST API operation.
 */
export interface Operation {
  /**
   * Operation name: {provider}/{resource}/{operation}.
   */
  readonly name?: string;
  /**
   * The object that represents the operation.
   */
  display?: OperationDisplay;
}

/**
 * The object that represents the operation.
 */
export interface OperationDisplay {
  /**
   * Service provider: Microsoft.PowerBIDedicated.
   */
  readonly provider?: string;
  /**
   * Resource on which the operation is performed: capacity, etc.
   */
  readonly resource?: string;
  /**
   * Operation type: create, update, delete, etc.
   */
  readonly operation?: string;
}

/**
 * Describes the format of Error response.
 */
export interface ErrorResponse {
  /**
   * Error code
   */
  code?: string;
  /**
   * Error message indicating why the operation failed.
   */
  message?: string;
}

/**
 * Details of capacity name request body.
 */
export interface CheckCapacityNameAvailabilityParameters {
  /**
   * Name for checking availability.
   */
  name?: string;
  /**
   * The resource type of PowerBI dedicated.
   */
  type?: string;
}

/**
 * The checking result of capacity name availability.
 */
export interface CheckCapacityNameAvailabilityResult {
  /**
   * Indicator of availability of the capacity name.
   */
  nameAvailable?: boolean;
  /**
   * The reason of unavailability.
   */
  reason?: string;
  /**
   * The detailed message of the request unavailability.
   */
  message?: string;
}

/**
 * Defines values for State.
 */
export type State =
  | "Deleting"
  | "Succeeded"
  | "Failed"
  | "Paused"
  | "Suspended"
  | "Provisioning"
  | "Updating"
  | "Suspending"
  | "Pausing"
  | "Resuming"
  | "Preparing"
  | "Scaling";
/**
 * Defines values for ProvisioningState.
 */
export type ProvisioningState =
  | "Deleting"
  | "Succeeded"
  | "Failed"
  | "Paused"
  | "Suspended"
  | "Provisioning"
  | "Updating"
  | "Suspending"
  | "Pausing"
  | "Resuming"
  | "Preparing"
  | "Scaling";

/**
 * Contains response data for the getDetails operation.
 */
export type CapacitiesGetDetailsResponse = DedicatedCapacity & {
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
    parsedBody: DedicatedCapacity;
  };
};

/**
 * Contains response data for the create operation.
 */
export type CapacitiesCreateResponse = DedicatedCapacity & {
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
    parsedBody: DedicatedCapacity;
  };
};

/**
 * Contains response data for the update operation.
 */
export type CapacitiesUpdateResponse = DedicatedCapacity & {
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
    parsedBody: DedicatedCapacity;
  };
};

/**
 * Contains response data for the listByResourceGroup operation.
 */
export type CapacitiesListByResourceGroupResponse = DedicatedCapacities & {
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
    parsedBody: DedicatedCapacities;
  };
};

/**
 * Contains response data for the list operation.
 */
export type CapacitiesListResponse = DedicatedCapacities & {
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
    parsedBody: DedicatedCapacities;
  };
};

/**
 * Contains response data for the listSkus operation.
 */
export type CapacitiesListSkusResponse = SkuEnumerationForNewResourceResult & {
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
    parsedBody: SkuEnumerationForNewResourceResult;
  };
};

/**
 * Contains response data for the listSkusForCapacity operation.
 */
export type CapacitiesListSkusForCapacityResponse = SkuEnumerationForExistingResourceResult & {
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
    parsedBody: SkuEnumerationForExistingResourceResult;
  };
};

/**
 * Contains response data for the checkNameAvailability operation.
 */
export type CapacitiesCheckNameAvailabilityResponse = CheckCapacityNameAvailabilityResult & {
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
    parsedBody: CheckCapacityNameAvailabilityResult;
  };
};

/**
 * Contains response data for the list operation.
 */
export type OperationsListResponse = OperationListResult & {
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
    parsedBody: OperationListResult;
  };
};

/**
 * Contains response data for the listNext operation.
 */
export type OperationsListNextResponse = OperationListResult & {
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
    parsedBody: OperationListResult;
  };
};

/**
 * Optional parameters.
 */
export interface PowerBIDedicatedOptionalParams
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
