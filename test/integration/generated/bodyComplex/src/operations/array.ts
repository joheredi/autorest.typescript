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
 * Class representing a Array.
 */
export class Array {
  private readonly client: BodyComplexClient;

  /**
   * Initialize a new instance of the class Array class.
   * @param client Reference to the service client
   */
  constructor(client: BodyComplexClient) {
    this.client = client;
  }

  /**
   * Get complex types with array property
   * @param options The options parameters.
   */
  getValid(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.ArrayGetValidResponse> {
    return this.client.sendOperationRequest(
      { options },
      getValidOperationSpec
    ) as Promise<Models.ArrayGetValidResponse>;
  }

  /**
   * Put complex types with array property
   * @param complexBody Please put an array with 4 items: "1, 2, 3, 4", "", null, "&S#$(*Y", "The quick
   *                    brown fox jumps over the lazy dog"
   * @param options The options parameters.
   */
  putValid(
    complexBody: Models.ArrayWrapper,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { complexBody, options },
      putValidOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get complex types with array property which is empty
   * @param options The options parameters.
   */
  getEmpty(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.ArrayGetEmptyResponse> {
    return this.client.sendOperationRequest(
      { options },
      getEmptyOperationSpec
    ) as Promise<Models.ArrayGetEmptyResponse>;
  }

  /**
   * Put complex types with array property which is empty
   * @param complexBody Please put an array with 4 items: "1, 2, 3, 4", "", null, "&S#$(*Y", "The quick
   *                    brown fox jumps over the lazy dog"
   * @param options The options parameters.
   */
  putEmpty(
    complexBody: Models.ArrayWrapper,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { complexBody, options },
      putEmptyOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get complex types with array property while server doesn't provide a response payload
   * @param options The options parameters.
   */
  getNotProvided(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.ArrayGetNotProvidedResponse> {
    return this.client.sendOperationRequest(
      { options },
      getNotProvidedOperationSpec
    ) as Promise<Models.ArrayGetNotProvidedResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, false);

const getValidOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/array/valid",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ArrayWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putValidOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/array/valid",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody12,
  urlParameters: [Parameters.$host],
  serializer
};
const getEmptyOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/array/empty",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ArrayWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putEmptyOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/array/empty",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody12,
  urlParameters: [Parameters.$host],
  serializer
};
const getNotProvidedOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/array/notprovided",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ArrayWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
