/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

/**
 * Results of the request to list operations.
 */
export interface ResourceProviderOperationList {
  /**
   * List of operations supported by this resource provider.
   */
  value?: ResourceProviderOperation[];
  /**
   * The URL to use for getting the next set of results.
   */
  nextLink?: string;
}

/**
 * Supported operations of this resource provider.
 */
export interface ResourceProviderOperation {
  /**
   * Operation name, in format of {provider}/{resource}/{operation}
   */
  name?: string;
  /**
   * Indicates whether the operation applies to data-plane.
   */
  isDataAction?: string;
  /**
   * Display metadata associated with the operation.
   */
  display?: ResourceProviderOperationDisplay;
}

/**
 * Display metadata associated with the operation.
 */
export interface ResourceProviderOperationDisplay {
  /**
   * Resource provider: Microsoft Custom Providers.
   */
  provider?: string;
  /**
   * Resource on which the operation is performed.
   */
  resource?: string;
  /**
   * Type of operation: get, read, delete, etc.
   */
  operation?: string;
  /**
   * Description of this operation.
   */
  description?: string;
}

/**
 * Error response.
 */
export interface ErrorResponse {
  /**
   * The error details.
   */
  error?: ErrorDefinition;
}

/**
 * Error definition.
 */
export interface ErrorDefinition {
  /**
   * Service specific error code which serves as the substatus for the HTTP error code.
   */
  readonly code?: string;
  /**
   * Description of the error.
   */
  readonly message?: string;
  /**
   * Internal error details.
   */
  readonly details?: ErrorDefinition[];
}

/**
 * The shared dashboard resource definition.
 */
export interface Dashboard {
  /**
   * Resource Id
   */
  readonly id?: string;
  /**
   * Resource name
   */
  readonly name?: string;
  /**
   * Resource type
   */
  readonly type?: string;
  /**
   * Resource location
   */
  location: string;
  /**
   * Resource tags
   */
  tags?: { [propertyName: string]: string };
  /**
   * The dashboard lenses.
   */
  lenses?: { [propertyName: string]: DashboardLens };
  /**
   * The dashboard metadata.
   */
  metadata?: { [propertyName: string]: any };
}

/**
 * A dashboard lens.
 */
export interface DashboardLens {
  /**
   * The lens order.
   */
  order: number;
  /**
   * The dashboard parts.
   */
  parts: { [propertyName: string]: DashboardParts };
  /**
   * The dashboard len's metadata.
   */
  metadata?: { [propertyName: string]: any };
}

/**
 * A dashboard part.
 */
export interface DashboardParts {
  /**
   * The dashboard's part position.
   */
  position: DashboardPartsPosition;
  /**
   * The dashboard part's metadata.
   */
  metadata?: { [propertyName: string]: any };
}

/**
 * The dashboard's part position.
 */
export interface DashboardPartsPosition {
  /**
   * The dashboard's part x coordinate.
   */
  x: number;
  /**
   * The dashboard's part y coordinate.
   */
  y: number;
  /**
   * The dashboard's part row span.
   */
  rowSpan: number;
  /**
   * The dashboard's part column span.
   */
  colSpan: number;
  /**
   * The dashboard part's metadata.
   */
  metadata?: { [propertyName: string]: any };
}

/**
 * The shared dashboard resource definition.
 */
export interface PatchableDashboard {
  /**
   * Resource tags
   */
  tags?: { [propertyName: string]: string };
  /**
   * The dashboard lenses.
   */
  lenses?: { [propertyName: string]: DashboardLens };
  /**
   * The dashboard metadata.
   */
  metadata?: { [propertyName: string]: any };
}

/**
 * List of dashboards.
 */
export interface DashboardListResult {
  /**
   * The array of custom resource provider manifests.
   */
  value?: Dashboard[];
  /**
   * The URL to use for getting the next set of results.
   */
  nextLink?: string;
}

/**
 * Contains response data for the list operation.
 */
export type OperationsListResponse = ResourceProviderOperationList & {
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
    parsedBody: ResourceProviderOperationList;
  };
};

/**
 * Contains response data for the listNext operation.
 */
export type OperationsListNextResponse = ResourceProviderOperationList & {
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
    parsedBody: ResourceProviderOperationList;
  };
};

/**
 * Contains response data for the createOrUpdate operation.
 */
export type DashboardsCreateOrUpdateResponse = Dashboard & {
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
    parsedBody: Dashboard;
  };
};

/**
 * Contains response data for the get operation.
 */
export type DashboardsGetResponse = Dashboard & {
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
    parsedBody: Dashboard;
  };
};

/**
 * Contains response data for the update operation.
 */
export type DashboardsUpdateResponse = Dashboard & {
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
    parsedBody: Dashboard;
  };
};

/**
 * Contains response data for the listByResourceGroup operation.
 */
export type DashboardsListByResourceGroupResponse = DashboardListResult & {
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
    parsedBody: DashboardListResult;
  };
};

/**
 * Contains response data for the listBySubscription operation.
 */
export type DashboardsListBySubscriptionResponse = DashboardListResult & {
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
    parsedBody: DashboardListResult;
  };
};

/**
 * Contains response data for the listByResourceGroupNext operation.
 */
export type DashboardsListByResourceGroupNextResponse = DashboardListResult & {
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
    parsedBody: DashboardListResult;
  };
};

/**
 * Contains response data for the listBySubscriptionNext operation.
 */
export type DashboardsListBySubscriptionNextResponse = DashboardListResult & {
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
    parsedBody: DashboardListResult;
  };
};

/**
 * Optional parameters.
 */
export interface PortalOptionalParams extends coreHttp.ServiceClientOptions {
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
