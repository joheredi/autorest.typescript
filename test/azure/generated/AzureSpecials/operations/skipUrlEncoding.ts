/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as Models from "../models";
import * as Mappers from "../models/skipUrlEncodingMappers";
import * as Parameters from "../models/parameters";
import { AutoRestAzureSpecialParametersTestClientContext } from "../autoRestAzureSpecialParametersTestClientContext";

/** Class representing a SkipUrlEncoding. */
export class SkipUrlEncoding {
  private readonly client: AutoRestAzureSpecialParametersTestClientContext;

  /**
   * Create a SkipUrlEncoding.
   * @param {AutoRestAzureSpecialParametersTestClientContext} client Reference to the service client.
   */
  constructor(client: AutoRestAzureSpecialParametersTestClientContext) {
    this.client = client;
  }

  /**
   * Get method with unencoded path parameter with value 'path1/path2/path3'
   * @param unencodedPathParam Unencoded path parameter with value 'path1/path2/path3'
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  getMethodPathValid(unencodedPathParam: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param unencodedPathParam Unencoded path parameter with value 'path1/path2/path3'
   * @param callback The callback
   */
  getMethodPathValid(unencodedPathParam: string, callback: msRest.ServiceCallback<void>): void;
  /**
   * @param unencodedPathParam Unencoded path parameter with value 'path1/path2/path3'
   * @param options The optional parameters
   * @param callback The callback
   */
  getMethodPathValid(unencodedPathParam: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  getMethodPathValid(unencodedPathParam: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        unencodedPathParam,
        options
      },
      getMethodPathValidOperationSpec,
      callback);
  }

  /**
   * Get method with unencoded path parameter with value 'path1/path2/path3'
   * @param unencodedPathParam Unencoded path parameter with value 'path1/path2/path3'
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  getPathPathValid(unencodedPathParam: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param unencodedPathParam Unencoded path parameter with value 'path1/path2/path3'
   * @param callback The callback
   */
  getPathPathValid(unencodedPathParam: string, callback: msRest.ServiceCallback<void>): void;
  /**
   * @param unencodedPathParam Unencoded path parameter with value 'path1/path2/path3'
   * @param options The optional parameters
   * @param callback The callback
   */
  getPathPathValid(unencodedPathParam: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  getPathPathValid(unencodedPathParam: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        unencodedPathParam,
        options
      },
      getPathPathValidOperationSpec,
      callback);
  }

  /**
   * Get method with unencoded path parameter with value 'path1/path2/path3'
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  getSwaggerPathValid(options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param callback The callback
   */
  getSwaggerPathValid(callback: msRest.ServiceCallback<void>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getSwaggerPathValid(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  getSwaggerPathValid(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getSwaggerPathValidOperationSpec,
      callback);
  }

  /**
   * Get method with unencoded query parameter with value 'value1&q2=value2&q3=value3'
   * @param q1 Unencoded query parameter with value 'value1&q2=value2&q3=value3'
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  getMethodQueryValid(q1: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param q1 Unencoded query parameter with value 'value1&q2=value2&q3=value3'
   * @param callback The callback
   */
  getMethodQueryValid(q1: string, callback: msRest.ServiceCallback<void>): void;
  /**
   * @param q1 Unencoded query parameter with value 'value1&q2=value2&q3=value3'
   * @param options The optional parameters
   * @param callback The callback
   */
  getMethodQueryValid(q1: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  getMethodQueryValid(q1: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        q1,
        options
      },
      getMethodQueryValidOperationSpec,
      callback);
  }

  /**
   * Get method with unencoded query parameter with value null
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  getMethodQueryNull(options?: Models.SkipUrlEncodingGetMethodQueryNullOptionalParams): Promise<msRest.RestResponse>;
  /**
   * @param callback The callback
   */
  getMethodQueryNull(callback: msRest.ServiceCallback<void>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getMethodQueryNull(options: Models.SkipUrlEncodingGetMethodQueryNullOptionalParams, callback: msRest.ServiceCallback<void>): void;
  getMethodQueryNull(options?: Models.SkipUrlEncodingGetMethodQueryNullOptionalParams | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getMethodQueryNullOperationSpec,
      callback);
  }

  /**
   * Get method with unencoded query parameter with value 'value1&q2=value2&q3=value3'
   * @param q1 Unencoded query parameter with value 'value1&q2=value2&q3=value3'
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  getPathQueryValid(q1: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param q1 Unencoded query parameter with value 'value1&q2=value2&q3=value3'
   * @param callback The callback
   */
  getPathQueryValid(q1: string, callback: msRest.ServiceCallback<void>): void;
  /**
   * @param q1 Unencoded query parameter with value 'value1&q2=value2&q3=value3'
   * @param options The optional parameters
   * @param callback The callback
   */
  getPathQueryValid(q1: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  getPathQueryValid(q1: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        q1,
        options
      },
      getPathQueryValidOperationSpec,
      callback);
  }

  /**
   * Get method with unencoded query parameter with value 'value1&q2=value2&q3=value3'
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  getSwaggerQueryValid(options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param callback The callback
   */
  getSwaggerQueryValid(callback: msRest.ServiceCallback<void>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getSwaggerQueryValid(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  getSwaggerQueryValid(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getSwaggerQueryValidOperationSpec,
      callback);
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const getMethodPathValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "azurespecials/skipUrlEncoding/method/path/valid/{unencodedPathParam}",
  urlParameters: [
    Parameters.unencodedPathParam0
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getPathPathValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "azurespecials/skipUrlEncoding/path/path/valid/{unencodedPathParam}",
  urlParameters: [
    Parameters.unencodedPathParam0
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getSwaggerPathValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "azurespecials/skipUrlEncoding/swagger/path/valid/{unencodedPathParam}",
  urlParameters: [
    Parameters.unencodedPathParam1
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getMethodQueryValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "azurespecials/skipUrlEncoding/method/query/valid",
  queryParameters: [
    Parameters.q10
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getMethodQueryNullOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "azurespecials/skipUrlEncoding/method/query/null",
  queryParameters: [
    Parameters.q11
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getPathQueryValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "azurespecials/skipUrlEncoding/path/query/valid",
  queryParameters: [
    Parameters.q10
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getSwaggerQueryValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "azurespecials/skipUrlEncoding/swagger/query/valid",
  queryParameters: [
    Parameters.q12
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};