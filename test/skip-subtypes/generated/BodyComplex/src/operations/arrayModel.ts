/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Models from "../models";
import * as Mappers from "../models/arrayModelMappers";
import { AutoRestComplexTestServiceContext } from "../autoRestComplexTestServiceContext";

/** Class representing a ArrayModel. */
export class ArrayModel {
  private readonly client: AutoRestComplexTestServiceContext;

  /**
   * Create a ArrayModel.
   * @param {AutoRestComplexTestServiceContext} client Reference to the service client.
   */
  constructor(client: AutoRestComplexTestServiceContext) {
    this.client = client;
  }

  /**
   * Get complex types with array property
   * @param [options] The optional parameters
   * @returns Promise<Models.ArrayModelGetValidResponse>
   */
  getValid(options?: coreHttp.RequestOptionsBase): Promise<Models.ArrayModelGetValidResponse>;
  /**
   * @param callback The callback
   */
  getValid(callback: coreHttp.ServiceCallback<Models.ArrayWrapper>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getValid(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.ArrayWrapper>): void;
  getValid(options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.ArrayWrapper>, callback?: coreHttp.ServiceCallback<Models.ArrayWrapper>): Promise<Models.ArrayModelGetValidResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getValidOperationSpec,
      callback) as Promise<Models.ArrayModelGetValidResponse>;
  }

  /**
   * Put complex types with array property
   * @param complexBody Please put an array with 4 items: "1, 2, 3, 4", "", null, "&S#$(*Y", "The
   * quick brown fox jumps over the lazy dog"
   * @param [options] The optional parameters
   * @returns Promise<coreHttp.RestResponse>
   */
  putValid(complexBody: Models.ArrayWrapper, options?: coreHttp.RequestOptionsBase): Promise<coreHttp.RestResponse>;
  /**
   * @param complexBody Please put an array with 4 items: "1, 2, 3, 4", "", null, "&S#$(*Y", "The
   * quick brown fox jumps over the lazy dog"
   * @param callback The callback
   */
  putValid(complexBody: Models.ArrayWrapper, callback: coreHttp.ServiceCallback<void>): void;
  /**
   * @param complexBody Please put an array with 4 items: "1, 2, 3, 4", "", null, "&S#$(*Y", "The
   * quick brown fox jumps over the lazy dog"
   * @param options The optional parameters
   * @param callback The callback
   */
  putValid(complexBody: Models.ArrayWrapper, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<void>): void;
  putValid(complexBody: Models.ArrayWrapper, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<void>, callback?: coreHttp.ServiceCallback<void>): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      {
        complexBody,
        options
      },
      putValidOperationSpec,
      callback);
  }

  /**
   * Get complex types with array property which is empty
   * @param [options] The optional parameters
   * @returns Promise<Models.ArrayModelGetEmptyResponse>
   */
  getEmpty(options?: coreHttp.RequestOptionsBase): Promise<Models.ArrayModelGetEmptyResponse>;
  /**
   * @param callback The callback
   */
  getEmpty(callback: coreHttp.ServiceCallback<Models.ArrayWrapper>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getEmpty(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.ArrayWrapper>): void;
  getEmpty(options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.ArrayWrapper>, callback?: coreHttp.ServiceCallback<Models.ArrayWrapper>): Promise<Models.ArrayModelGetEmptyResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getEmptyOperationSpec,
      callback) as Promise<Models.ArrayModelGetEmptyResponse>;
  }

  /**
   * Put complex types with array property which is empty
   * @param complexBody Please put an empty array
   * @param [options] The optional parameters
   * @returns Promise<coreHttp.RestResponse>
   */
  putEmpty(complexBody: Models.ArrayWrapper, options?: coreHttp.RequestOptionsBase): Promise<coreHttp.RestResponse>;
  /**
   * @param complexBody Please put an empty array
   * @param callback The callback
   */
  putEmpty(complexBody: Models.ArrayWrapper, callback: coreHttp.ServiceCallback<void>): void;
  /**
   * @param complexBody Please put an empty array
   * @param options The optional parameters
   * @param callback The callback
   */
  putEmpty(complexBody: Models.ArrayWrapper, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<void>): void;
  putEmpty(complexBody: Models.ArrayWrapper, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<void>, callback?: coreHttp.ServiceCallback<void>): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      {
        complexBody,
        options
      },
      putEmptyOperationSpec,
      callback);
  }

  /**
   * Get complex types with array property while server doesn't provide a response payload
   * @param [options] The optional parameters
   * @returns Promise<Models.ArrayModelGetNotProvidedResponse>
   */
  getNotProvided(options?: coreHttp.RequestOptionsBase): Promise<Models.ArrayModelGetNotProvidedResponse>;
  /**
   * @param callback The callback
   */
  getNotProvided(callback: coreHttp.ServiceCallback<Models.ArrayWrapper>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getNotProvided(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.ArrayWrapper>): void;
  getNotProvided(options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.ArrayWrapper>, callback?: coreHttp.ServiceCallback<Models.ArrayWrapper>): Promise<Models.ArrayModelGetNotProvidedResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getNotProvidedOperationSpec,
      callback) as Promise<Models.ArrayModelGetNotProvidedResponse>;
  }
}

// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers);
const getValidOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "complex/array/valid",
  responses: {
    200: {
      bodyMapper: Mappers.ArrayWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const putValidOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "PUT",
  path: "complex/array/valid",
  requestBody: {
    parameterPath: "complexBody",
    mapper: {
      ...Mappers.ArrayWrapper,
      required: true
    }
  },
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getEmptyOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "complex/array/empty",
  responses: {
    200: {
      bodyMapper: Mappers.ArrayWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const putEmptyOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "PUT",
  path: "complex/array/empty",
  requestBody: {
    parameterPath: "complexBody",
    mapper: {
      ...Mappers.ArrayWrapper,
      required: true
    }
  },
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getNotProvidedOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "complex/array/notprovided",
  responses: {
    200: {
      bodyMapper: Mappers.ArrayWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
