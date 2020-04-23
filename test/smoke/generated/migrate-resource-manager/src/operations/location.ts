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
import { AzureMigrate } from "../azureMigrate";
import {
  CheckNameAvailabilityParameters,
  LocationCheckNameAvailabilityResponse
} from "../models";

/**
 * Class representing a Location.
 */
export class Location {
  private readonly client: AzureMigrate;

  /**
   * Initialize a new instance of the class Location class.
   * @param client Reference to the service client
   */
  constructor(client: AzureMigrate) {
    this.client = client;
  }

  /**
   * Checks whether the project name is available in the specified region.
   * @param parameters Properties needed to check the availability of a name.
   * @param locationName The desired region for the name check.
   * @param options The options parameters.
   */
  checkNameAvailability(
    parameters: CheckNameAvailabilityParameters,
    locationName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LocationCheckNameAvailabilityResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { parameters, locationName, options: operationOptions },
      checkNameAvailabilityOperationSpec
    ) as Promise<LocationCheckNameAvailabilityResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const checkNameAvailabilityOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Migrate/locations/{locationName}/checkNameAvailability",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.CheckNameAvailabilityResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.locationName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
