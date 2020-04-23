/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { WorkloadMonitorApi } from "../workloadMonitorApi";
import {
  ComponentsListByResourceOptionalParams,
  ComponentsListByResourceResponse,
  ComponentsGetOptionalParams,
  ComponentsGetResponse,
  ComponentsListByResourceNextOptionalParams,
  ComponentsListByResourceNextResponse
} from "../models";

/**
 * Class representing a Components.
 */
export class Components {
  private readonly client: WorkloadMonitorApi;

  /**
   * Initialize a new instance of the class Components class.
   * @param client Reference to the service client
   */
  constructor(client: WorkloadMonitorApi) {
    this.client = client;
  }

  /**
   * Get list of components for a resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceNamespace The Namespace of the resource.
   * @param resourceType The type of the resource.
   * @param resourceName Name of the resource.
   * @param options The options parameters.
   */
  listByResource(
    resourceGroupName: string,
    resourceNamespace: string,
    resourceType: string,
    resourceName: string,
    options?: ComponentsListByResourceOptionalParams
  ): Promise<ComponentsListByResourceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceNamespace,
        resourceType,
        resourceName,
        options: operationOptions
      },
      listByResourceOperationSpec
    ) as Promise<ComponentsListByResourceResponse>;
  }

  /**
   * Get details of a component.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceNamespace The Namespace of the resource.
   * @param resourceType The type of the resource.
   * @param resourceName Name of the resource.
   * @param componentId Component Id.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    resourceNamespace: string,
    resourceType: string,
    resourceName: string,
    componentId: string,
    options?: ComponentsGetOptionalParams
  ): Promise<ComponentsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceNamespace,
        resourceType,
        resourceName,
        componentId,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<ComponentsGetResponse>;
  }

  /**
   * ListByResourceNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param resourceNamespace The Namespace of the resource.
   * @param resourceType The type of the resource.
   * @param resourceName Name of the resource.
   * @param nextLink The nextLink from the previous successful call to the ListByResource method.
   * @param options The options parameters.
   */
  listByResourceNext(
    resourceGroupName: string,
    resourceNamespace: string,
    resourceType: string,
    resourceName: string,
    nextLink: string,
    options?: ComponentsListByResourceNextOptionalParams
  ): Promise<ComponentsListByResourceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceNamespace,
        resourceType,
        resourceName,
        nextLink,
        options: operationOptions
      },
      listByResourceNextOperationSpec
    ) as Promise<ComponentsListByResourceNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listByResourceOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceNamespace}/{resourceType}/{resourceName}/providers/Microsoft.WorkloadMonitor/components",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ComponentsCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter,
    Parameters.skiptoken,
    Parameters.select,
    Parameters.apply,
    Parameters.orderby,
    Parameters.expand,
    Parameters.top
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.resourceNamespace,
    Parameters.resourceType,
    Parameters.resourceName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceNamespace}/{resourceType}/{resourceName}/providers/Microsoft.WorkloadMonitor/components/{componentId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Component
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.select,
    Parameters.expand
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.resourceNamespace,
    Parameters.resourceType,
    Parameters.resourceName,
    Parameters.componentId
  ],
  serializer
};
const listByResourceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ComponentsCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter,
    Parameters.skiptoken,
    Parameters.select,
    Parameters.apply,
    Parameters.orderby,
    Parameters.expand,
    Parameters.top
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.resourceNamespace,
    Parameters.resourceType,
    Parameters.resourceName,
    Parameters.nextLink
  ],
  serializer
};
