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
import { InfrastructureInsightsAdminClient } from "../infrastructureInsightsAdminClient";
import {
  ResourceHealthsListOptionalParams,
  ResourceHealthsListResponse,
  ResourceHealthsGetOptionalParams,
  ResourceHealthsGetResponse,
  ResourceHealthsListNextOptionalParams,
  ResourceHealthsListNextResponse
} from "../models";

/**
 * Class representing a ResourceHealths.
 */
export class ResourceHealths {
  private readonly client: InfrastructureInsightsAdminClient;

  /**
   * Initialize a new instance of the class ResourceHealths class.
   * @param client Reference to the service client
   */
  constructor(client: InfrastructureInsightsAdminClient) {
    this.client = client;
  }

  /**
   * Returns a list of each resource's health under a service.
   * @param resourceGroupName The name of the resource group.
   * @param location Name of the region
   * @param serviceRegistrationId Service registration ID.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    location: string,
    serviceRegistrationId: string,
    options?: ResourceHealthsListOptionalParams
  ): Promise<ResourceHealthsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        location,
        serviceRegistrationId,
        options: operationOptions
      },
      listOperationSpec
    ) as Promise<ResourceHealthsListResponse>;
  }

  /**
   * Returns the requested health information about a resource.
   * @param resourceGroupName The name of the resource group.
   * @param location Name of the region
   * @param serviceRegistrationId Service registration ID.
   * @param resourceRegistrationId Resource registration ID.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    location: string,
    serviceRegistrationId: string,
    resourceRegistrationId: string,
    options?: ResourceHealthsGetOptionalParams
  ): Promise<ResourceHealthsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        location,
        serviceRegistrationId,
        resourceRegistrationId,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<ResourceHealthsGetResponse>;
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param resourceGroupName The name of the resource group.
   * @param location Name of the region
   * @param serviceRegistrationId Service registration ID.
   * @param options The options parameters.
   */
  listNext(
    nextLink: string,
    resourceGroupName: string,
    location: string,
    serviceRegistrationId: string,
    options?: ResourceHealthsListNextOptionalParams
  ): Promise<ResourceHealthsListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        nextLink,
        resourceGroupName,
        location,
        serviceRegistrationId,
        options: operationOptions
      },
      listNextOperationSpec
    ) as Promise<ResourceHealthsListNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.InfrastructureInsights.Admin/regionHealths/{location}/serviceHealths/{serviceRegistrationId}/resourceHealths",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResourceHealthList
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location,
    Parameters.serviceRegistrationId
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.InfrastructureInsights.Admin/regionHealths/{location}/serviceHealths/{serviceRegistrationId}/resourceHealths/{resourceRegistrationId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResourceHealth
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location,
    Parameters.serviceRegistrationId,
    Parameters.resourceRegistrationId
  ],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResourceHealthList
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location,
    Parameters.serviceRegistrationId
  ],
  serializer
};
