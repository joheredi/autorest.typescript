/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

/**
 * Result of the request to list Microsoft.Resources operations. It contains a list of operations and a URL link to get the next set of results.
 */
export interface OperationListResult {
  /**
   * List of Microsoft.Resources operations.
   */
  value?: Operation[];
  /**
   * URL to get the next set of operation list results if there are any.
   */
  nextLink?: string;
}

/**
 * Microsoft.Resources operation
 */
export interface Operation {
  /**
   * Operation name: {provider}/{resource}/{operation}
   */
  name?: string;
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
   * Service provider: Microsoft.Resources
   */
  provider?: string;
  /**
   * Resource on which the operation is performed: Profile, endpoint, etc.
   */
  resource?: string;
  /**
   * Operation type: Read, write, delete, etc.
   */
  operation?: string;
  /**
   * Description of the operation.
   */
  description?: string;
}

/**
 * Location list operation response.
 */
export interface LocationListResult {
  /**
   * An array of locations.
   */
  value?: Location[];
}

/**
 * Location information.
 */
export interface Location {
  /**
   * The fully qualified ID of the location. For example, /subscriptions/00000000-0000-0000-0000-000000000000/locations/westus.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /**
   * The subscription ID.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly subscriptionId?: string;
  /**
   * The location name.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * The display name of the location.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly displayName?: string;
  /**
   * The latitude of the location.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly latitude?: string;
  /**
   * The longitude of the location.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly longitude?: string;
}

/**
 * Subscription information.
 */
export interface Subscription {
  /**
   * The fully qualified ID for the subscription. For example, /subscriptions/00000000-0000-0000-0000-000000000000.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /**
   * The subscription ID.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly subscriptionId?: string;
  /**
   * The subscription display name.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly displayName?: string;
  /**
   * The subscription tenant ID.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tenantId?: string;
  /**
   * The subscription state. Possible values are Enabled, Warned, PastDue, Disabled, and Deleted.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly state?: SubscriptionState;
  /**
   * The subscription policies.
   */
  subscriptionPolicies?: SubscriptionPolicies;
  /**
   * The authorization source of the request. Valid values are one or more combinations of Legacy, RoleBased, Bypassed, Direct and Management. For example, 'Legacy, RoleBased'.
   */
  authorizationSource?: string;
  /**
   * An array containing the tenants managing the subscription.
   */
  managedByTenants?: ManagedByTenant[];
}

/**
 * Subscription policies.
 */
export interface SubscriptionPolicies {
  /**
   * The subscription location placement ID. The ID indicates which regions are visible for a subscription. For example, a subscription with a location placement Id of Public_2014-09-01 has access to Azure public regions.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly locationPlacementId?: string;
  /**
   * The subscription quota ID.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly quotaId?: string;
  /**
   * The subscription spending limit.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly spendingLimit?: SpendingLimit;
}

/**
 * Information about a tenant managing the subscription.
 */
export interface ManagedByTenant {
  /**
   * The tenant ID of the managing tenant. This is a GUID.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tenantId?: string;
}

/**
 * Subscription list operation response.
 */
export interface SubscriptionListResult {
  /**
   * An array of subscriptions.
   */
  value?: Subscription[];
  /**
   * The URL to get the next set of results.
   */
  nextLink: string;
}

/**
 * Tenant Ids information.
 */
export interface TenantListResult {
  /**
   * An array of tenants.
   */
  value?: TenantIdDescription[];
  /**
   * The URL to use for getting the next set of results.
   */
  nextLink: string;
}

/**
 * Tenant Id information.
 */
export interface TenantIdDescription {
  /**
   * The fully qualified ID of the tenant. For example, /tenants/00000000-0000-0000-0000-000000000000.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /**
   * The tenant ID. For example, 00000000-0000-0000-0000-000000000000.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tenantId?: string;
  /**
   * The tenant category.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tenantCategory?: TenantCategory;
  /**
   * Country/region name of the address for the tenant.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly country?: string;
  /**
   * Country/region abbreviation for the tenant.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly countryCode?: string;
  /**
   * The display name of the tenant.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly displayName?: string;
  /**
   * The list of domains for the tenant.
   */
  /**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly domains?: string[];
}

/**
 * Defines values for SubscriptionState.
 */
export type SubscriptionState =
  | "Enabled"
  | "Warned"
  | "PastDue"
  | "Disabled"
  | "Deleted";
/**
 * Defines values for SpendingLimit.
 */
export type SpendingLimit = "On" | "Off" | "CurrentPeriodOff";
/**
 * Defines values for TenantCategory.
 */
export type TenantCategory = "Home" | "ProjectedBy" | "ManagedBy";

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
 * Contains response data for the listLocations operation.
 */
export type SubscriptionsListLocationsResponse = LocationListResult & {
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
    parsedBody: LocationListResult;
  };
};

/**
 * Contains response data for the get operation.
 */
export type SubscriptionsGetResponse = Subscription & {
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
    parsedBody: Subscription;
  };
};

/**
 * Contains response data for the list operation.
 */
export type SubscriptionsListResponse = SubscriptionListResult & {
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
    parsedBody: SubscriptionListResult;
  };
};

/**
 * Contains response data for the listNext operation.
 */
export type SubscriptionsListNextResponse = SubscriptionListResult & {
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
    parsedBody: SubscriptionListResult;
  };
};

/**
 * Contains response data for the list operation.
 */
export type TenantsListResponse = TenantListResult & {
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
    parsedBody: TenantListResult;
  };
};

/**
 * Contains response data for the listNext operation.
 */
export type TenantsListNextResponse = TenantListResult & {
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
    parsedBody: TenantListResult;
  };
};

/**
 * Optional parameters.
 */
export interface SubscriptionClientOptionalParams
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
