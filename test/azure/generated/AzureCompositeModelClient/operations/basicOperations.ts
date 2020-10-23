/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as Models from "../models";
import * as Mappers from "../models/basicOperationsMappers";
import * as Parameters from "../models/parameters";
import { AzureCompositeModelContext } from "../azureCompositeModelContext";

/** Class representing a BasicOperations. */
export class BasicOperations {
  private readonly client: AzureCompositeModelContext;

  /**
   * Create a BasicOperations.
   * @param {AzureCompositeModelContext} client Reference to the service client.
   */
  constructor(client: AzureCompositeModelContext) {
    this.client = client;
  }

  /**
   * Get complex type {id: 2, name: 'abc', color: 'YELLOW'}
   * @param [options] The optional parameters
   * @returns Promise<Models.BasicGetValidResponse>
   */
  getValid(options?: msRest.RequestOptionsBase): Promise<Models.BasicGetValidResponse>;
  /**
   * @param callback The callback
   */
  getValid(callback: msRest.ServiceCallback<Models.Basic>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getValid(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Basic>): void;
  getValid(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.Basic>, callback?: msRest.ServiceCallback<Models.Basic>): Promise<Models.BasicGetValidResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getValidOperationSpec,
      callback) as Promise<Models.BasicGetValidResponse>;
  }

  /**
   * Please put {id: 2, name: 'abc', color: 'Magenta'}
   * @param complexBody Please put {id: 2, name: 'abc', color: 'Magenta'}
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  putValid(complexBody: Models.Basic, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param complexBody Please put {id: 2, name: 'abc', color: 'Magenta'}
   * @param callback The callback
   */
  putValid(complexBody: Models.Basic, callback: msRest.ServiceCallback<void>): void;
  /**
   * @param complexBody Please put {id: 2, name: 'abc', color: 'Magenta'}
   * @param options The optional parameters
   * @param callback The callback
   */
  putValid(complexBody: Models.Basic, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  putValid(complexBody: Models.Basic, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        complexBody,
        options
      },
      putValidOperationSpec,
      callback);
  }

  /**
   * Get a basic complex type that is invalid for the local strong type
   * @param [options] The optional parameters
   * @returns Promise<Models.BasicGetInvalidResponse>
   */
  getInvalid(options?: msRest.RequestOptionsBase): Promise<Models.BasicGetInvalidResponse>;
  /**
   * @param callback The callback
   */
  getInvalid(callback: msRest.ServiceCallback<Models.Basic>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getInvalid(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Basic>): void;
  getInvalid(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.Basic>, callback?: msRest.ServiceCallback<Models.Basic>): Promise<Models.BasicGetInvalidResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getInvalidOperationSpec,
      callback) as Promise<Models.BasicGetInvalidResponse>;
  }

  /**
   * Get a basic complex type that is empty
   * @param [options] The optional parameters
   * @returns Promise<Models.BasicGetEmptyResponse>
   */
  getEmpty(options?: msRest.RequestOptionsBase): Promise<Models.BasicGetEmptyResponse>;
  /**
   * @param callback The callback
   */
  getEmpty(callback: msRest.ServiceCallback<Models.Basic>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getEmpty(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Basic>): void;
  getEmpty(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.Basic>, callback?: msRest.ServiceCallback<Models.Basic>): Promise<Models.BasicGetEmptyResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getEmptyOperationSpec,
      callback) as Promise<Models.BasicGetEmptyResponse>;
  }

  /**
   * Get a basic complex type whose properties are null
   * @param [options] The optional parameters
   * @returns Promise<Models.BasicGetNullResponse>
   */
  getNull(options?: msRest.RequestOptionsBase): Promise<Models.BasicGetNullResponse>;
  /**
   * @param callback The callback
   */
  getNull(callback: msRest.ServiceCallback<Models.Basic>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getNull(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Basic>): void;
  getNull(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.Basic>, callback?: msRest.ServiceCallback<Models.Basic>): Promise<Models.BasicGetNullResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getNullOperationSpec,
      callback) as Promise<Models.BasicGetNullResponse>;
  }

  /**
   * Get a basic complex type while the server doesn't provide a response payload
   * @param [options] The optional parameters
   * @returns Promise<Models.BasicGetNotProvidedResponse>
   */
  getNotProvided(options?: msRest.RequestOptionsBase): Promise<Models.BasicGetNotProvidedResponse>;
  /**
   * @param callback The callback
   */
  getNotProvided(callback: msRest.ServiceCallback<Models.Basic>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getNotProvided(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Basic>): void;
  getNotProvided(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.Basic>, callback?: msRest.ServiceCallback<Models.Basic>): Promise<Models.BasicGetNotProvidedResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getNotProvidedOperationSpec,
      callback) as Promise<Models.BasicGetNotProvidedResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const getValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "complex/basic/valid",
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.Basic
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const putValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "complex/basic/valid",
  queryParameters: [
    Parameters.apiVersion1
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "complexBody",
    mapper: {
      ...Mappers.Basic,
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

const getInvalidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "complex/basic/invalid",
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.Basic
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getEmptyOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "complex/basic/empty",
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.Basic
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getNullOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "complex/basic/null",
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.Basic
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getNotProvidedOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "complex/basic/notprovided",
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.Basic
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
