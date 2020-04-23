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
  EdgeGatewaysGetResponse,
  EdgeGatewaysListOptionalParams,
  EdgeGatewaysListResponse,
  EdgeGatewaysListNextOptionalParams,
  EdgeGatewaysListNextResponse
} from "../models";

/**
 * Class representing a EdgeGateways.
 */
export class EdgeGateways {
  private readonly client: FabricAdminClient;

  /**
   * Initialize a new instance of the class EdgeGateways class.
   * @param client Reference to the service client
   */
  constructor(client: FabricAdminClient) {
    this.client = client;
  }

  /**
   * Returns the requested edge gateway.
   * @param resourceGroupName Name of the resource group.
   * @param location Location of the resource.
   * @param edgeGateway Name of the edge gateway.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    location: string,
    edgeGateway: string,
    options?: coreHttp.OperationOptions
  ): Promise<EdgeGatewaysGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, location, edgeGateway, options: operationOptions },
      getOperationSpec
    ) as Promise<EdgeGatewaysGetResponse>;
  }

  /**
   * Returns the list of all edge gateways at a certain location.
   * @param resourceGroupName Name of the resource group.
   * @param location Location of the resource.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    location: string,
    options?: EdgeGatewaysListOptionalParams
  ): Promise<EdgeGatewaysListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, location, options: operationOptions },
      listOperationSpec
    ) as Promise<EdgeGatewaysListResponse>;
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
    options?: EdgeGatewaysListNextOptionalParams
  ): Promise<EdgeGatewaysListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, location, nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<EdgeGatewaysListNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric.Admin/fabricLocations/{location}/edgeGateways/{edgeGateway}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EdgeGateway
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location,
    Parameters.edgeGateway
  ],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric.Admin/fabricLocations/{location}/edgeGateways",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EdgeGatewayList
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
      bodyMapper: Mappers.EdgeGatewayList
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
