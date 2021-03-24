/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { Polymorphicrecursive } from "../operationsInterfaces";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { BodyComplexClientContext } from "../bodyComplexClientContext";
import { PolymorphicrecursiveGetValidResponse, FishUnion } from "../models";

/** Class representing a Polymorphicrecursive. */
export class PolymorphicrecursiveImpl implements Polymorphicrecursive {
  private readonly client: BodyComplexClientContext;

  /**
   * Initialize a new instance of the class Polymorphicrecursive class.
   * @param client Reference to the service client
   */
  constructor(client: BodyComplexClientContext) {
    this.client = client;
  }

  /**
   * Get complex types that are polymorphic and have recursive references
   * @param options The options parameters.
   */
  getValid(
    options?: coreHttp.OperationOptions
  ): Promise<PolymorphicrecursiveGetValidResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getValidOperationSpec
    ) as Promise<PolymorphicrecursiveGetValidResponse>;
  }

  /**
   * Put complex types that are polymorphic and have recursive references
   * @param complexBody Please put a salmon that looks like this:
   *                    {
   *                        "fishtype": "salmon",
   *                        "species": "king",
   *                        "length": 1,
   *                        "age": 1,
   *                        "location": "alaska",
   *                        "iswild": true,
   *                        "siblings": [
   *                            {
   *                                "fishtype": "shark",
   *                                "species": "predator",
   *                                "length": 20,
   *                                "age": 6,
   *                                "siblings": [
   *                                    {
   *                                        "fishtype": "salmon",
   *                                        "species": "coho",
   *                                        "length": 2,
   *                                        "age": 2,
   *                                        "location": "atlantic",
   *                                        "iswild": true,
   *                                        "siblings": [
   *                                            {
   *                                                "fishtype": "shark",
   *                                                "species": "predator",
   *                                                "length": 20,
   *                                                "age": 6
   *                                            },
   *                                            {
   *                                                "fishtype": "sawshark",
   *                                                "species": "dangerous",
   *                                                "length": 10,
   *                                                "age": 105
   *                                            }
   *                                        ]
   *                                    },
   *                                    {
   *                                        "fishtype": "sawshark",
   *                                        "species": "dangerous",
   *                                        "length": 10,
   *                                        "age": 105
   *                                    }
   *                                ]
   *                            },
   *                            {
   *                                "fishtype": "sawshark",
   *                                "species": "dangerous",
   *                                "length": 10,
   *                                "age": 105
   *                            }
   *                        ]
   *                    }
   * @param options The options parameters.
   */
  putValid(
    complexBody: FishUnion,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      complexBody,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      putValidOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getValidOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/polymorphicrecursive/valid",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Fish
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const putValidOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/polymorphicrecursive/valid",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody15,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
