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
import { SqlManagementClient } from "../sqlManagementClient";
import {
  CapabilitiesListByLocationOptionalParams,
  CapabilitiesListByLocationResponse
} from "../models";

/**
 * Class representing a Capabilities.
 */
export class Capabilities {
  private readonly client: SqlManagementClient;

  /**
   * Initialize a new instance of the class Capabilities class.
   * @param client Reference to the service client
   */
  constructor(client: SqlManagementClient) {
    this.client = client;
  }

  /**
   * Gets the subscription capabilities available for the specified location.
   * @param locationName The location name whose capabilities are retrieved.
   * @param options The options parameters.
   */
  listByLocation(
    locationName: string,
    options?: CapabilitiesListByLocationOptionalParams
  ): Promise<CapabilitiesListByLocationResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      locationName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByLocationOperationSpec
    ) as Promise<CapabilitiesListByLocationResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listByLocationOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/capabilities",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LocationCapabilities
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion2, Parameters.include],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.locationName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
