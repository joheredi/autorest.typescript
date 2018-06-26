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
import * as Mappers from "../models/queriesMappers";
import { AutoRestUrlMutliCollectionFormatTestServiceContext } from "../autoRestUrlMutliCollectionFormatTestServiceContext";

/** Class representing a Queries. */
export class Queries {
  private readonly client: AutoRestUrlMutliCollectionFormatTestServiceContext;

  /**
   * Create a Queries.
   * @param {AutoRestUrlMutliCollectionFormatTestServiceContext} client Reference to the service client.
   */
  constructor(client: AutoRestUrlMutliCollectionFormatTestServiceContext) {
    this.client = client;
  }

  /**
   * Get a null array of string using the multi-array format
   *
   * @param {QueriesArrayStringMultiNullOptionalParams} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} The deserialized result object.
   *
   * @reject {Error|ServiceError} The error object.
   */
  async arrayStringMultiNullWithHttpOperationResponse(options?: Models.QueriesArrayStringMultiNullOptionalParams): Promise<msRest.HttpOperationResponse<void>> {
    let arrayQuery = (options && options.arrayQuery !== undefined) ? options.arrayQuery : undefined;

    let operationRes: msRest.HttpOperationResponse;
    try {
      operationRes = await this.client.sendOperationRequest(
        msRest.createOperationArguments(
          {
            arrayQuery
          },
          options),
        arrayStringMultiNullOperationSpec);
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(operationRes);
  }

  /**
   * Get an empty array [] of string using the multi-array format
   *
   * @param {QueriesArrayStringMultiEmptyOptionalParams} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} The deserialized result object.
   *
   * @reject {Error|ServiceError} The error object.
   */
  async arrayStringMultiEmptyWithHttpOperationResponse(options?: Models.QueriesArrayStringMultiEmptyOptionalParams): Promise<msRest.HttpOperationResponse<void>> {
    let arrayQuery = (options && options.arrayQuery !== undefined) ? options.arrayQuery : undefined;

    let operationRes: msRest.HttpOperationResponse;
    try {
      operationRes = await this.client.sendOperationRequest(
        msRest.createOperationArguments(
          {
            arrayQuery
          },
          options),
        arrayStringMultiEmptyOperationSpec);
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(operationRes);
  }

  /**
   * Get an array of string ['ArrayQuery1', 'begin!*'();:@ &=+$,/?#[]end' , null, ''] using the
   * mult-array format
   *
   * @param {QueriesArrayStringMultiValidOptionalParams} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} The deserialized result object.
   *
   * @reject {Error|ServiceError} The error object.
   */
  async arrayStringMultiValidWithHttpOperationResponse(options?: Models.QueriesArrayStringMultiValidOptionalParams): Promise<msRest.HttpOperationResponse<void>> {
    let arrayQuery = (options && options.arrayQuery !== undefined) ? options.arrayQuery : undefined;

    let operationRes: msRest.HttpOperationResponse;
    try {
      operationRes = await this.client.sendOperationRequest(
        msRest.createOperationArguments(
          {
            arrayQuery
          },
          options),
        arrayStringMultiValidOperationSpec);
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(operationRes);
  }

  /**
   * Get a null array of string using the multi-array format
   *
   * @param {QueriesArrayStringMultiNullOptionalParams} [options] Optional Parameters.
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
  arrayStringMultiNull(): Promise<void>;
  arrayStringMultiNull(options: Models.QueriesArrayStringMultiNullOptionalParams): Promise<void>;
  arrayStringMultiNull(callback: msRest.ServiceCallback<void>): void;
  arrayStringMultiNull(options: Models.QueriesArrayStringMultiNullOptionalParams, callback: msRest.ServiceCallback<void>): void;
  arrayStringMultiNull(options?: Models.QueriesArrayStringMultiNullOptionalParams, callback?: msRest.ServiceCallback<void>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<void>;
    if (!callback) {
      return this.arrayStringMultiNullWithHttpOperationResponse(options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as void);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.arrayStringMultiNullWithHttpOperationResponse(options))((err: Error, data: msRest.HttpOperationResponse) => {
        if (err) {
          return cb(err);
        }
        let result = data.parsedBody as void;
        return cb(err, result, data.request, data);
      });
    }
  }

  /**
   * Get an empty array [] of string using the multi-array format
   *
   * @param {QueriesArrayStringMultiEmptyOptionalParams} [options] Optional Parameters.
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
  arrayStringMultiEmpty(): Promise<void>;
  arrayStringMultiEmpty(options: Models.QueriesArrayStringMultiEmptyOptionalParams): Promise<void>;
  arrayStringMultiEmpty(callback: msRest.ServiceCallback<void>): void;
  arrayStringMultiEmpty(options: Models.QueriesArrayStringMultiEmptyOptionalParams, callback: msRest.ServiceCallback<void>): void;
  arrayStringMultiEmpty(options?: Models.QueriesArrayStringMultiEmptyOptionalParams, callback?: msRest.ServiceCallback<void>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<void>;
    if (!callback) {
      return this.arrayStringMultiEmptyWithHttpOperationResponse(options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as void);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.arrayStringMultiEmptyWithHttpOperationResponse(options))((err: Error, data: msRest.HttpOperationResponse) => {
        if (err) {
          return cb(err);
        }
        let result = data.parsedBody as void;
        return cb(err, result, data.request, data);
      });
    }
  }

  /**
   * Get an array of string ['ArrayQuery1', 'begin!*'();:@ &=+$,/?#[]end' , null, ''] using the
   * mult-array format
   *
   * @param {QueriesArrayStringMultiValidOptionalParams} [options] Optional Parameters.
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
  arrayStringMultiValid(): Promise<void>;
  arrayStringMultiValid(options: Models.QueriesArrayStringMultiValidOptionalParams): Promise<void>;
  arrayStringMultiValid(callback: msRest.ServiceCallback<void>): void;
  arrayStringMultiValid(options: Models.QueriesArrayStringMultiValidOptionalParams, callback: msRest.ServiceCallback<void>): void;
  arrayStringMultiValid(options?: Models.QueriesArrayStringMultiValidOptionalParams, callback?: msRest.ServiceCallback<void>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<void>;
    if (!callback) {
      return this.arrayStringMultiValidWithHttpOperationResponse(options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as void);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.arrayStringMultiValidWithHttpOperationResponse(options))((err: Error, data: msRest.HttpOperationResponse) => {
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
const arrayStringMultiNullOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "queries/array/multi/string/null",
  queryParameters: [
    {
      parameterPath: "arrayQuery",
      collectionFormat: msRest.QueryCollectionFormat.Multi,
      mapper: {
        serializedName: "arrayQuery",
        type: {
          name: "Sequence",
          element: {
            serializedName: "stringElementType",
            type: {
              name: "String"
            }
          }
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

const arrayStringMultiEmptyOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "queries/array/multi/string/empty",
  queryParameters: [
    {
      parameterPath: "arrayQuery",
      collectionFormat: msRest.QueryCollectionFormat.Multi,
      mapper: {
        serializedName: "arrayQuery",
        type: {
          name: "Sequence",
          element: {
            serializedName: "stringElementType",
            type: {
              name: "String"
            }
          }
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

const arrayStringMultiValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "queries/array/multi/string/valid",
  queryParameters: [
    {
      parameterPath: "arrayQuery",
      collectionFormat: msRest.QueryCollectionFormat.Multi,
      mapper: {
        serializedName: "arrayQuery",
        type: {
          name: "Sequence",
          element: {
            serializedName: "stringElementType",
            type: {
              name: "String"
            }
          }
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
