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
import { FabricAdminClient } from "../fabricAdminClient";
import {
  ApplicationOperationResultsGetResponse,
  ApplicationOperationResultsListOptionalParams,
  ApplicationOperationResultsListResponse,
  ApplicationOperationResultsListNextOptionalParams,
  ApplicationOperationResultsListNextResponse
} from "../models";

/**
 * Class representing a ApplicationOperationResults.
 */
export class ApplicationOperationResults {
  private readonly client: FabricAdminClient;

  /**
   * Initialize a new instance of the class ApplicationOperationResults class.
   * @param client Reference to the service client
   */
  constructor(client: FabricAdminClient) {
    this.client = client;
  }

  /**
   * Returns the status of an application operation.
   * @param resourceGroupName Name of the resource group.
   * @param location Location of the resource.
   * @param operation Operation identifier.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    location: string,
    operation: string,
    options?: coreHttp.OperationOptions
  ): Promise<ApplicationOperationResultsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, location, operation, options: operationOptions },
      getOperationSpec
    ) as Promise<ApplicationOperationResultsGetResponse>;
  }

  /**
   * Returns a list of all application operation results at a location.
   * @param resourceGroupName Name of the resource group.
   * @param location Location of the resource.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    location: string,
    options?: ApplicationOperationResultsListOptionalParams
  ): Promise<ApplicationOperationResultsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, location, options: operationOptions },
      listOperationSpec
    ) as Promise<ApplicationOperationResultsListResponse>;
  }

  /**
   * ListNext
   * @param resourceGroupName Name of the resource group.
   * @param location Location of the resource.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    resourceGroupName: string,
    location: string,
    nextLink: string,
    options?: ApplicationOperationResultsListNextOptionalParams
  ): Promise<ApplicationOperationResultsListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, location, nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<ApplicationOperationResultsListNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric.Admin/fabricLocations/{location}/applicationOperationResults/{operation}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApplicationOperationResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location,
    Parameters.operation
  ],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric.Admin/fabricLocations/{location}/applicationOperationResults",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApplicationOperationResultList
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location
  ],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApplicationOperationResultList
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location,
    Parameters.nextLink
  ],
  serializer
};
