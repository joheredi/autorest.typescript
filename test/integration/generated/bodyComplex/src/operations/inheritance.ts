/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Models from "../models";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { BodyComplexClient } from "../bodyComplexClient";

/**
 * Class representing a Inheritance.
 */
export class Inheritance {
  private readonly client: BodyComplexClient;

  /**
   * Initialize a new instance of the class Inheritance class.
   * @param client Reference to the service client
   */
  constructor(client: BodyComplexClient) {
    this.client = client;
  }

  /**
   * Get complex types that extend others
   * @param options The options parameters.
   */
  getValid(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.InheritanceGetValidResponse> {
    return this.client.sendOperationRequest(
      { options },
      getValidOperationSpec
    ) as Promise<Models.InheritanceGetValidResponse>;
  }

  /**
   * Put complex types that extend others
   * @param complexBody Please put a siamese with id=2, name="Siameee", color=green, breed=persion, which
   *                    hates 2 dogs, the 1st one named "Potato" with id=1 and food="tomato", and the 2nd one named "Tomato"
   *                    with id=-1 and food="french fries".
   * @param options The options parameters.
   */
  putValid(
    complexBody: Models.Siamese,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { complexBody, options },
      putValidOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, false);

const getValidOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/inheritance/valid",
  httpMethod: "GET",
  responses: {
    200: { bodyMapper: Mappers.Siamese },
    default: { bodyMapper: Mappers.ErrorModel }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putValidOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/inheritance/valid",
  httpMethod: "PUT",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  requestBody: Parameters.complexBody14,
  urlParameters: [Parameters.$host],
  serializer
};
