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
import { BlockchainManagementClient } from "../blockchainManagementClient";
import {
  LocationsCheckNameAvailabilityOptionalParams,
  LocationsCheckNameAvailabilityResponse,
  LocationsListConsortiumsResponse
} from "../models";

/**
 * Class representing a Locations.
 */
export class Locations {
  private readonly client: BlockchainManagementClient;

  /**
   * Initialize a new instance of the class Locations class.
   * @param client Reference to the service client
   */
  constructor(client: BlockchainManagementClient) {
    this.client = client;
  }

  /**
   * To check whether a resource name is available.
   * @param locationName Location Name.
   * @param options The options parameters.
   */
  checkNameAvailability(
    locationName: string,
    options?: LocationsCheckNameAvailabilityOptionalParams
  ): Promise<LocationsCheckNameAvailabilityResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { locationName, options: operationOptions },
      checkNameAvailabilityOperationSpec
    ) as Promise<LocationsCheckNameAvailabilityResponse>;
  }

  /**
   * Lists the available consortiums for a subscription.
   * @param locationName Location Name.
   * @param options The options parameters.
   */
  listConsortiums(
    locationName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LocationsListConsortiumsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { locationName, options: operationOptions },
      listConsortiumsOperationSpec
    ) as Promise<LocationsListConsortiumsResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const checkNameAvailabilityOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Blockchain/locations/{locationName}/checkNameAvailability",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.NameAvailability
    }
  },
  requestBody: Parameters.nameAvailabilityRequest,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.locationName1
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const listConsortiumsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Blockchain/locations/{locationName}/listConsortiums",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ConsortiumCollection
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.locationName1
  ],
  serializer
};
