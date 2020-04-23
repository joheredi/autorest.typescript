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
import { UpdateAdminClient } from "../updateAdminClient";
import {
  UpdateLocationsListResponse,
  UpdateLocationsGetResponse
} from "../models";

/**
 * Class representing a UpdateLocations.
 */
export class UpdateLocations {
  private readonly client: UpdateAdminClient;

  /**
   * Initialize a new instance of the class UpdateLocations class.
   * @param client Reference to the service client
   */
  constructor(client: UpdateAdminClient) {
    this.client = client;
  }

  /**
   * Get the list of update locations.
   * @param resourceGroupName Resource group name.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<UpdateLocationsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, options: operationOptions },
      listOperationSpec
    ) as Promise<UpdateLocationsListResponse>;
  }

  /**
   * Get an update location based on name.
   * @param resourceGroupName Resource group name.
   * @param updateLocation The name of the update location.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    updateLocation: string,
    options?: coreHttp.OperationOptions
  ): Promise<UpdateLocationsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, updateLocation, options: operationOptions },
      getOperationSpec
    ) as Promise<UpdateLocationsGetResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Update.Admin/updateLocations/",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateLocationList
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Update.Admin/updateLocations/{updateLocation}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateLocation
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.updateLocation
  ],
  serializer
};
