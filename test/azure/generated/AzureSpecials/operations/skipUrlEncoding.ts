/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "ms-rest-js";
import * as Models from "../models";
import * as Mappers from "../models/skipUrlEncodingMappers";
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
   *
   * @param {string} unencodedPathParam Unencoded path parameter with value 'path1/path2/path3'
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} The deserialized result object.
   *
   * @reject {Error|ServiceError} The error object.
   */
  async getMethodPathValidWithHttpOperationResponse(unencodedPathParam: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>> {

    let operationRes: msRest.HttpOperationResponse;
    try {
      operationRes = await this.client.sendOperationRequest(
        msRest.createOperationArguments(
          {
            unencodedPathParam,
            "this.client.acceptLanguage": this.client.acceptLanguage
          },
          options),
        getMethodPathValidOperationSpec);
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(operationRes);
  }

  /**
   * Get method with unencoded path parameter with value 'path1/path2/path3'
   *
   * @param {string} unencodedPathParam Unencoded path parameter with value 'path1/path2/path3'
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} The deserialized result object.
   *
   * @reject {Error|ServiceError} The error object.
   */
  async getPathPathValidWithHttpOperationResponse(unencodedPathParam: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>> {

    let operationRes: msRest.HttpOperationResponse;
    try {
      operationRes = await this.client.sendOperationRequest(
        msRest.createOperationArguments(
          {
            unencodedPathParam,
            "this.client.acceptLanguage": this.client.acceptLanguage
          },
          options),
        getPathPathValidOperationSpec);
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(operationRes);
  }

  /**
   * Get method with unencoded path parameter with value 'path1/path2/path3'
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} The deserialized result object.
   *
   * @reject {Error|ServiceError} The error object.
   */
  async getSwaggerPathValidWithHttpOperationResponse(options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>> {
    let unencodedPathParam = 'path1/path2/path3';

    let operationRes: msRest.HttpOperationResponse;
    try {
      operationRes = await this.client.sendOperationRequest(
        msRest.createOperationArguments(
          {
            unencodedPathParam,
            "this.client.acceptLanguage": this.client.acceptLanguage
          },
          options),
        getSwaggerPathValidOperationSpec);
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(operationRes);
  }

  /**
   * Get method with unencoded query parameter with value 'value1&q2=value2&q3=value3'
   *
   * @param {string} q1 Unencoded query parameter with value 'value1&q2=value2&q3=value3'
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} The deserialized result object.
   *
   * @reject {Error|ServiceError} The error object.
   */
  async getMethodQueryValidWithHttpOperationResponse(q1: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>> {

    let operationRes: msRest.HttpOperationResponse;
    try {
      operationRes = await this.client.sendOperationRequest(
        msRest.createOperationArguments(
          {
            q1,
            "this.client.acceptLanguage": this.client.acceptLanguage
          },
          options),
        getMethodQueryValidOperationSpec);
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(operationRes);
  }

  /**
   * Get method with unencoded query parameter with value null
   *
   * @param {SkipUrlEncodingGetMethodQueryNullOptionalParams} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} The deserialized result object.
   *
   * @reject {Error|ServiceError} The error object.
   */
  async getMethodQueryNullWithHttpOperationResponse(options?: Models.SkipUrlEncodingGetMethodQueryNullOptionalParams): Promise<msRest.HttpOperationResponse<void>> {
    let q1 = (options && options.q1 !== undefined) ? options.q1 : undefined;

    let operationRes: msRest.HttpOperationResponse;
    try {
      operationRes = await this.client.sendOperationRequest(
        msRest.createOperationArguments(
          {
            q1,
            "this.client.acceptLanguage": this.client.acceptLanguage
          },
          options),
        getMethodQueryNullOperationSpec);
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(operationRes);
  }

  /**
   * Get method with unencoded query parameter with value 'value1&q2=value2&q3=value3'
   *
   * @param {string} q1 Unencoded query parameter with value 'value1&q2=value2&q3=value3'
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} The deserialized result object.
   *
   * @reject {Error|ServiceError} The error object.
   */
  async getPathQueryValidWithHttpOperationResponse(q1: string, options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>> {

    let operationRes: msRest.HttpOperationResponse;
    try {
      operationRes = await this.client.sendOperationRequest(
        msRest.createOperationArguments(
          {
            q1,
            "this.client.acceptLanguage": this.client.acceptLanguage
          },
          options),
        getPathQueryValidOperationSpec);
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(operationRes);
  }

  /**
   * Get method with unencoded query parameter with value 'value1&q2=value2&q3=value3'
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} The deserialized result object.
   *
   * @reject {Error|ServiceError} The error object.
   */
  async getSwaggerQueryValidWithHttpOperationResponse(options?: msRest.RequestOptionsBase): Promise<msRest.HttpOperationResponse<void>> {
    let q1 = 'value1&q2=value2&q3=value3';

    let operationRes: msRest.HttpOperationResponse;
    try {
      operationRes = await this.client.sendOperationRequest(
        msRest.createOperationArguments(
          {
            q1,
            "this.client.acceptLanguage": this.client.acceptLanguage
          },
          options),
        getSwaggerQueryValidOperationSpec);
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(operationRes);
  }

  /**
   * Get method with unencoded path parameter with value 'path1/path2/path3'
   *
   * @param {string} unencodedPathParam Unencoded path parameter with value 'path1/path2/path3'
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @param {ServiceCallback} callback The callback.
   *
   * @returns {ServiceCallback} callback(err, result, request, operationRes)
   *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
   *                      {void} [result]   - The deserialized result object if an error did not occur.
   *
   *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
   *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
   */
  getMethodPathValid(unencodedPathParam: string): Promise<void>;
  getMethodPathValid(unencodedPathParam: string, options: msRest.RequestOptionsBase): Promise<void>;
  getMethodPathValid(unencodedPathParam: string, callback: msRest.ServiceCallback<void>): void;
  getMethodPathValid(unencodedPathParam: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  getMethodPathValid(unencodedPathParam: string, options?: msRest.RequestOptionsBase, callback?: msRest.ServiceCallback<void>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<void>;
    if (!callback) {
      return this.getMethodPathValidWithHttpOperationResponse(unencodedPathParam, options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as void);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.getMethodPathValidWithHttpOperationResponse(unencodedPathParam, options))((err: Error, data: msRest.HttpOperationResponse) => {
        if (err) {
          return cb(err);
        }
        let result = data.parsedBody as void;
        return cb(err, result, data.request, data);
      });
    }
  }

  /**
   * Get method with unencoded path parameter with value 'path1/path2/path3'
   *
   * @param {string} unencodedPathParam Unencoded path parameter with value 'path1/path2/path3'
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @param {ServiceCallback} callback The callback.
   *
   * @returns {ServiceCallback} callback(err, result, request, operationRes)
   *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
   *                      {void} [result]   - The deserialized result object if an error did not occur.
   *
   *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
   *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
   */
  getPathPathValid(unencodedPathParam: string): Promise<void>;
  getPathPathValid(unencodedPathParam: string, options: msRest.RequestOptionsBase): Promise<void>;
  getPathPathValid(unencodedPathParam: string, callback: msRest.ServiceCallback<void>): void;
  getPathPathValid(unencodedPathParam: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  getPathPathValid(unencodedPathParam: string, options?: msRest.RequestOptionsBase, callback?: msRest.ServiceCallback<void>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<void>;
    if (!callback) {
      return this.getPathPathValidWithHttpOperationResponse(unencodedPathParam, options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as void);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.getPathPathValidWithHttpOperationResponse(unencodedPathParam, options))((err: Error, data: msRest.HttpOperationResponse) => {
        if (err) {
          return cb(err);
        }
        let result = data.parsedBody as void;
        return cb(err, result, data.request, data);
      });
    }
  }

  /**
   * Get method with unencoded path parameter with value 'path1/path2/path3'
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @param {ServiceCallback} callback The callback.
   *
   * @returns {ServiceCallback} callback(err, result, request, operationRes)
   *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
   *                      {void} [result]   - The deserialized result object if an error did not occur.
   *
   *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
   *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
   */
  getSwaggerPathValid(): Promise<void>;
  getSwaggerPathValid(options: msRest.RequestOptionsBase): Promise<void>;
  getSwaggerPathValid(callback: msRest.ServiceCallback<void>): void;
  getSwaggerPathValid(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  getSwaggerPathValid(options?: msRest.RequestOptionsBase, callback?: msRest.ServiceCallback<void>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<void>;
    if (!callback) {
      return this.getSwaggerPathValidWithHttpOperationResponse(options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as void);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.getSwaggerPathValidWithHttpOperationResponse(options))((err: Error, data: msRest.HttpOperationResponse) => {
        if (err) {
          return cb(err);
        }
        let result = data.parsedBody as void;
        return cb(err, result, data.request, data);
      });
    }
  }

  /**
   * Get method with unencoded query parameter with value 'value1&q2=value2&q3=value3'
   *
   * @param {string} q1 Unencoded query parameter with value 'value1&q2=value2&q3=value3'
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @param {ServiceCallback} callback The callback.
   *
   * @returns {ServiceCallback} callback(err, result, request, operationRes)
   *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
   *                      {void} [result]   - The deserialized result object if an error did not occur.
   *
   *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
   *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
   */
  getMethodQueryValid(q1: string): Promise<void>;
  getMethodQueryValid(q1: string, options: msRest.RequestOptionsBase): Promise<void>;
  getMethodQueryValid(q1: string, callback: msRest.ServiceCallback<void>): void;
  getMethodQueryValid(q1: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  getMethodQueryValid(q1: string, options?: msRest.RequestOptionsBase, callback?: msRest.ServiceCallback<void>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<void>;
    if (!callback) {
      return this.getMethodQueryValidWithHttpOperationResponse(q1, options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as void);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.getMethodQueryValidWithHttpOperationResponse(q1, options))((err: Error, data: msRest.HttpOperationResponse) => {
        if (err) {
          return cb(err);
        }
        let result = data.parsedBody as void;
        return cb(err, result, data.request, data);
      });
    }
  }

  /**
   * Get method with unencoded query parameter with value null
   *
   * @param {SkipUrlEncodingGetMethodQueryNullOptionalParams} [options] Optional Parameters.
   *
   * @param {ServiceCallback} callback The callback.
   *
   * @returns {ServiceCallback} callback(err, result, request, operationRes)
   *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
   *                      {void} [result]   - The deserialized result object if an error did not occur.
   *
   *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
   *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
   */
  getMethodQueryNull(): Promise<void>;
  getMethodQueryNull(options: Models.SkipUrlEncodingGetMethodQueryNullOptionalParams): Promise<void>;
  getMethodQueryNull(callback: msRest.ServiceCallback<void>): void;
  getMethodQueryNull(options: Models.SkipUrlEncodingGetMethodQueryNullOptionalParams, callback: msRest.ServiceCallback<void>): void;
  getMethodQueryNull(options?: Models.SkipUrlEncodingGetMethodQueryNullOptionalParams, callback?: msRest.ServiceCallback<void>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<void>;
    if (!callback) {
      return this.getMethodQueryNullWithHttpOperationResponse(options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as void);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.getMethodQueryNullWithHttpOperationResponse(options))((err: Error, data: msRest.HttpOperationResponse) => {
        if (err) {
          return cb(err);
        }
        let result = data.parsedBody as void;
        return cb(err, result, data.request, data);
      });
    }
  }

  /**
   * Get method with unencoded query parameter with value 'value1&q2=value2&q3=value3'
   *
   * @param {string} q1 Unencoded query parameter with value 'value1&q2=value2&q3=value3'
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @param {ServiceCallback} callback The callback.
   *
   * @returns {ServiceCallback} callback(err, result, request, operationRes)
   *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
   *                      {void} [result]   - The deserialized result object if an error did not occur.
   *
   *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
   *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
   */
  getPathQueryValid(q1: string): Promise<void>;
  getPathQueryValid(q1: string, options: msRest.RequestOptionsBase): Promise<void>;
  getPathQueryValid(q1: string, callback: msRest.ServiceCallback<void>): void;
  getPathQueryValid(q1: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  getPathQueryValid(q1: string, options?: msRest.RequestOptionsBase, callback?: msRest.ServiceCallback<void>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<void>;
    if (!callback) {
      return this.getPathQueryValidWithHttpOperationResponse(q1, options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as void);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.getPathQueryValidWithHttpOperationResponse(q1, options))((err: Error, data: msRest.HttpOperationResponse) => {
        if (err) {
          return cb(err);
        }
        let result = data.parsedBody as void;
        return cb(err, result, data.request, data);
      });
    }
  }

  /**
   * Get method with unencoded query parameter with value 'value1&q2=value2&q3=value3'
   *
   * @param {RequestOptionsBase} [options] Optional Parameters.
   *
   * @param {ServiceCallback} callback The callback.
   *
   * @returns {ServiceCallback} callback(err, result, request, operationRes)
   *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
   *                      {void} [result]   - The deserialized result object if an error did not occur.
   *
   *                      {WebResource} [request]  - The HTTP Request object if an error did not occur.
   *                      {HttpOperationResponse} [response] - The HTTP Response stream if an error did not occur.
   */
  getSwaggerQueryValid(): Promise<void>;
  getSwaggerQueryValid(options: msRest.RequestOptionsBase): Promise<void>;
  getSwaggerQueryValid(callback: msRest.ServiceCallback<void>): void;
  getSwaggerQueryValid(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  getSwaggerQueryValid(options?: msRest.RequestOptionsBase, callback?: msRest.ServiceCallback<void>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<void>;
    if (!callback) {
      return this.getSwaggerQueryValidWithHttpOperationResponse(options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as void);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.getSwaggerQueryValidWithHttpOperationResponse(options))((err: Error, data: msRest.HttpOperationResponse) => {
        if (err) {
          return cb(err);
        }
        let result = data.parsedBody as void;
        return cb(err, result, data.request, data);
      });
    }
  }

}

// Operation Specifications
const getMethodPathValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "azurespecials/skipUrlEncoding/method/path/valid/{unencodedPathParam}",
  urlParameters: [
    {
      parameterPath: "unencodedPathParam",
      skipEncoding: true,
      mapper: {
        required: true,
        serializedName: "unencodedPathParam",
        type: {
          name: "String"
        }
      }
    }
  ],
  headerParameters: [
    {
      parameterPath: "this.client.acceptLanguage",
      mapper: {
        serializedName: "accept-language",
        defaultValue: 'en-US',
        type: {
          name: "String"
        }
      }
    }
  ],
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer: new msRest.Serializer(Mappers)
};

const getPathPathValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "azurespecials/skipUrlEncoding/path/path/valid/{unencodedPathParam}",
  urlParameters: [
    {
      parameterPath: "unencodedPathParam",
      skipEncoding: true,
      mapper: {
        required: true,
        serializedName: "unencodedPathParam",
        type: {
          name: "String"
        }
      }
    }
  ],
  headerParameters: [
    {
      parameterPath: "this.client.acceptLanguage",
      mapper: {
        serializedName: "accept-language",
        defaultValue: 'en-US',
        type: {
          name: "String"
        }
      }
    }
  ],
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer: new msRest.Serializer(Mappers)
};

const getSwaggerPathValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "azurespecials/skipUrlEncoding/swagger/path/valid/{unencodedPathParam}",
  urlParameters: [
    {
      parameterPath: "unencodedPathParam",
      skipEncoding: true,
      mapper: {
        required: true,
        isConstant: true,
        serializedName: "unencodedPathParam",
        defaultValue: 'path1/path2/path3',
        type: {
          name: "String"
        }
      }
    }
  ],
  headerParameters: [
    {
      parameterPath: "this.client.acceptLanguage",
      mapper: {
        serializedName: "accept-language",
        defaultValue: 'en-US',
        type: {
          name: "String"
        }
      }
    }
  ],
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer: new msRest.Serializer(Mappers)
};

const getMethodQueryValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "azurespecials/skipUrlEncoding/method/query/valid",
  queryParameters: [
    {
      parameterPath: "q1",
      skipEncoding: true,
      mapper: {
        required: true,
        serializedName: "q1",
        type: {
          name: "String"
        }
      }
    }
  ],
  headerParameters: [
    {
      parameterPath: "this.client.acceptLanguage",
      mapper: {
        serializedName: "accept-language",
        defaultValue: 'en-US',
        type: {
          name: "String"
        }
      }
    }
  ],
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer: new msRest.Serializer(Mappers)
};

const getMethodQueryNullOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "azurespecials/skipUrlEncoding/method/query/null",
  queryParameters: [
    {
      parameterPath: "q1",
      skipEncoding: true,
      mapper: {
        serializedName: "q1",
        type: {
          name: "String"
        }
      }
    }
  ],
  headerParameters: [
    {
      parameterPath: "this.client.acceptLanguage",
      mapper: {
        serializedName: "accept-language",
        defaultValue: 'en-US',
        type: {
          name: "String"
        }
      }
    }
  ],
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer: new msRest.Serializer(Mappers)
};

const getPathQueryValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "azurespecials/skipUrlEncoding/path/query/valid",
  queryParameters: [
    {
      parameterPath: "q1",
      skipEncoding: true,
      mapper: {
        required: true,
        serializedName: "q1",
        type: {
          name: "String"
        }
      }
    }
  ],
  headerParameters: [
    {
      parameterPath: "this.client.acceptLanguage",
      mapper: {
        serializedName: "accept-language",
        defaultValue: 'en-US',
        type: {
          name: "String"
        }
      }
    }
  ],
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer: new msRest.Serializer(Mappers)
};

const getSwaggerQueryValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "azurespecials/skipUrlEncoding/swagger/query/valid",
  queryParameters: [
    {
      parameterPath: "q1",
      skipEncoding: true,
      mapper: {
        required: true,
        isConstant: true,
        serializedName: "q1",
        defaultValue: 'value1&q2=value2&q3=value3',
        type: {
          name: "String"
        }
      }
    }
  ],
  headerParameters: [
    {
      parameterPath: "this.client.acceptLanguage",
      mapper: {
        serializedName: "accept-language",
        defaultValue: 'en-US',
        type: {
          name: "String"
        }
      }
    }
  ],
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer: new msRest.Serializer(Mappers)
};
