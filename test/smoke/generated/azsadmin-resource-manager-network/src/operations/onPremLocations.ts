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
import { NetworkAdminClient } from "../networkAdminClient";
import {
  OnPremLocationsListResponse,
  OnPremLocationsListNextResponse
} from "../models";

/**
 * Class representing a OnPremLocations.
 */
export class OnPremLocations {
  private readonly client: NetworkAdminClient;

  /**
   * Initialize a new instance of the class OnPremLocations class.
   * @param client Reference to the service client
   */
  constructor(client: NetworkAdminClient) {
    this.client = client;
  }

  /**
   * Returns the list of supported locations
   * @param options The options parameters.
   */
  list(
    options?: coreHttp.OperationOptions
  ): Promise<OnPremLocationsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listOperationSpec
    ) as Promise<OnPremLocationsListResponse>;
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<OnPremLocationsListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<OnPremLocationsListNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path: "/providers/Microsoft.Network.Admin/locations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LocationsList
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LocationsList
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.nextLink],
  serializer
};
