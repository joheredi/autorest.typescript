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
import * as Mappers from "../models/pathItemsMappers";
import { AutoRestUrlTestServiceContext } from "../autoRestUrlTestServiceContext";

/** Class representing a PathItems. */
export class PathItems {
  private readonly client: AutoRestUrlTestServiceContext;

  /**
   * Create a PathItems.
   * @param {AutoRestUrlTestServiceContext} client Reference to the service client.
   */
  constructor(client: AutoRestUrlTestServiceContext) {
    this.client = client;
  }

  /**
   * send globalStringPath='globalStringPath', pathItemStringPath='pathItemStringPath',
   * localStringPath='localStringPath', globalStringQuery='globalStringQuery',
   * pathItemStringQuery='pathItemStringQuery', localStringQuery='localStringQuery'
   *
   * @param {string} localStringPath should contain value 'localStringPath'
   *
   * @param {string} pathItemStringPath A string value 'pathItemStringPath' that appears in the path
   *
   * @param {PathItemsGetAllWithValuesOptionalParams} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} The deserialized result object.
   *
   * @reject {Error|ServiceError} The error object.
   */
  async getAllWithValuesWithHttpOperationResponse(localStringPath: string, pathItemStringPath: string, options?: Models.PathItemsGetAllWithValuesOptionalParams): Promise<msRest.HttpOperationResponse<void>> {
    let localStringQuery = (options && options.localStringQuery !== undefined) ? options.localStringQuery : undefined;
    let pathItemStringQuery = (options && options.pathItemStringQuery !== undefined) ? options.pathItemStringQuery : undefined;

    let operationRes: msRest.HttpOperationResponse;
    try {
      operationRes = await this.client.sendOperationRequest(
        msRest.createOperationArguments(
          {
            localStringPath,
            localStringQuery,
            pathItemStringPath,
            pathItemStringQuery,
            "this.client.globalStringPath": this.client.globalStringPath,
            "this.client.globalStringQuery": this.client.globalStringQuery
          },
          options),
        getAllWithValuesOperationSpec);
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(operationRes);
  }

  /**
   * send globalStringPath='globalStringPath', pathItemStringPath='pathItemStringPath',
   * localStringPath='localStringPath', globalStringQuery=null,
   * pathItemStringQuery='pathItemStringQuery', localStringQuery='localStringQuery'
   *
   * @param {string} localStringPath should contain value 'localStringPath'
   *
   * @param {string} pathItemStringPath A string value 'pathItemStringPath' that appears in the path
   *
   * @param {PathItemsGetGlobalQueryNullOptionalParams} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} The deserialized result object.
   *
   * @reject {Error|ServiceError} The error object.
   */
  async getGlobalQueryNullWithHttpOperationResponse(localStringPath: string, pathItemStringPath: string, options?: Models.PathItemsGetGlobalQueryNullOptionalParams): Promise<msRest.HttpOperationResponse<void>> {
    let localStringQuery = (options && options.localStringQuery !== undefined) ? options.localStringQuery : undefined;
    let pathItemStringQuery = (options && options.pathItemStringQuery !== undefined) ? options.pathItemStringQuery : undefined;

    let operationRes: msRest.HttpOperationResponse;
    try {
      operationRes = await this.client.sendOperationRequest(
        msRest.createOperationArguments(
          {
            localStringPath,
            localStringQuery,
            pathItemStringPath,
            pathItemStringQuery,
            "this.client.globalStringPath": this.client.globalStringPath,
            "this.client.globalStringQuery": this.client.globalStringQuery
          },
          options),
        getGlobalQueryNullOperationSpec);
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(operationRes);
  }

  /**
   * send globalStringPath=globalStringPath, pathItemStringPath='pathItemStringPath',
   * localStringPath='localStringPath', globalStringQuery=null,
   * pathItemStringQuery='pathItemStringQuery', localStringQuery=null
   *
   * @param {string} localStringPath should contain value 'localStringPath'
   *
   * @param {string} pathItemStringPath A string value 'pathItemStringPath' that appears in the path
   *
   * @param {PathItemsGetGlobalAndLocalQueryNullOptionalParams} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} The deserialized result object.
   *
   * @reject {Error|ServiceError} The error object.
   */
  async getGlobalAndLocalQueryNullWithHttpOperationResponse(localStringPath: string, pathItemStringPath: string, options?: Models.PathItemsGetGlobalAndLocalQueryNullOptionalParams): Promise<msRest.HttpOperationResponse<void>> {
    let localStringQuery = (options && options.localStringQuery !== undefined) ? options.localStringQuery : undefined;
    let pathItemStringQuery = (options && options.pathItemStringQuery !== undefined) ? options.pathItemStringQuery : undefined;

    let operationRes: msRest.HttpOperationResponse;
    try {
      operationRes = await this.client.sendOperationRequest(
        msRest.createOperationArguments(
          {
            localStringPath,
            localStringQuery,
            pathItemStringPath,
            pathItemStringQuery,
            "this.client.globalStringPath": this.client.globalStringPath,
            "this.client.globalStringQuery": this.client.globalStringQuery
          },
          options),
        getGlobalAndLocalQueryNullOperationSpec);
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(operationRes);
  }

  /**
   * send globalStringPath='globalStringPath', pathItemStringPath='pathItemStringPath',
   * localStringPath='localStringPath', globalStringQuery='globalStringQuery',
   * pathItemStringQuery=null, localStringQuery=null
   *
   * @param {string} localStringPath should contain value 'localStringPath'
   *
   * @param {string} pathItemStringPath A string value 'pathItemStringPath' that appears in the path
   *
   * @param {PathItemsGetLocalPathItemQueryNullOptionalParams} [options] Optional Parameters.
   *
   * @returns {Promise} A promise is returned
   *
   * @resolve {HttpOperationResponse} The deserialized result object.
   *
   * @reject {Error|ServiceError} The error object.
   */
  async getLocalPathItemQueryNullWithHttpOperationResponse(localStringPath: string, pathItemStringPath: string, options?: Models.PathItemsGetLocalPathItemQueryNullOptionalParams): Promise<msRest.HttpOperationResponse<void>> {
    let localStringQuery = (options && options.localStringQuery !== undefined) ? options.localStringQuery : undefined;
    let pathItemStringQuery = (options && options.pathItemStringQuery !== undefined) ? options.pathItemStringQuery : undefined;

    let operationRes: msRest.HttpOperationResponse;
    try {
      operationRes = await this.client.sendOperationRequest(
        msRest.createOperationArguments(
          {
            localStringPath,
            localStringQuery,
            pathItemStringPath,
            pathItemStringQuery,
            "this.client.globalStringPath": this.client.globalStringPath,
            "this.client.globalStringQuery": this.client.globalStringQuery
          },
          options),
        getLocalPathItemQueryNullOperationSpec);
    } catch (err) {
      return Promise.reject(err);
    }
    return Promise.resolve(operationRes);
  }

  /**
   * send globalStringPath='globalStringPath', pathItemStringPath='pathItemStringPath',
   * localStringPath='localStringPath', globalStringQuery='globalStringQuery',
   * pathItemStringQuery='pathItemStringQuery', localStringQuery='localStringQuery'
   *
   * @param {string} localStringPath should contain value 'localStringPath'
   *
   * @param {string} pathItemStringPath A string value 'pathItemStringPath' that appears in the path
   *
   * @param {PathItemsGetAllWithValuesOptionalParams} [options] Optional Parameters.
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
  getAllWithValues(localStringPath: string, pathItemStringPath: string): Promise<void>;
  getAllWithValues(localStringPath: string, pathItemStringPath: string, options: Models.PathItemsGetAllWithValuesOptionalParams): Promise<void>;
  getAllWithValues(localStringPath: string, pathItemStringPath: string, callback: msRest.ServiceCallback<void>): void;
  getAllWithValues(localStringPath: string, pathItemStringPath: string, options: Models.PathItemsGetAllWithValuesOptionalParams, callback: msRest.ServiceCallback<void>): void;
  getAllWithValues(localStringPath: string, pathItemStringPath: string, options?: Models.PathItemsGetAllWithValuesOptionalParams, callback?: msRest.ServiceCallback<void>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<void>;
    if (!callback) {
      return this.getAllWithValuesWithHttpOperationResponse(localStringPath, pathItemStringPath, options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as void);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.getAllWithValuesWithHttpOperationResponse(localStringPath, pathItemStringPath, options))((err: Error, data: msRest.HttpOperationResponse) => {
        if (err) {
          return cb(err);
        }
        let result = data.parsedBody as void;
        return cb(err, result, data.request, data);
      });
    }
  }

  /**
   * send globalStringPath='globalStringPath', pathItemStringPath='pathItemStringPath',
   * localStringPath='localStringPath', globalStringQuery=null,
   * pathItemStringQuery='pathItemStringQuery', localStringQuery='localStringQuery'
   *
   * @param {string} localStringPath should contain value 'localStringPath'
   *
   * @param {string} pathItemStringPath A string value 'pathItemStringPath' that appears in the path
   *
   * @param {PathItemsGetGlobalQueryNullOptionalParams} [options] Optional Parameters.
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
  getGlobalQueryNull(localStringPath: string, pathItemStringPath: string): Promise<void>;
  getGlobalQueryNull(localStringPath: string, pathItemStringPath: string, options: Models.PathItemsGetGlobalQueryNullOptionalParams): Promise<void>;
  getGlobalQueryNull(localStringPath: string, pathItemStringPath: string, callback: msRest.ServiceCallback<void>): void;
  getGlobalQueryNull(localStringPath: string, pathItemStringPath: string, options: Models.PathItemsGetGlobalQueryNullOptionalParams, callback: msRest.ServiceCallback<void>): void;
  getGlobalQueryNull(localStringPath: string, pathItemStringPath: string, options?: Models.PathItemsGetGlobalQueryNullOptionalParams, callback?: msRest.ServiceCallback<void>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<void>;
    if (!callback) {
      return this.getGlobalQueryNullWithHttpOperationResponse(localStringPath, pathItemStringPath, options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as void);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.getGlobalQueryNullWithHttpOperationResponse(localStringPath, pathItemStringPath, options))((err: Error, data: msRest.HttpOperationResponse) => {
        if (err) {
          return cb(err);
        }
        let result = data.parsedBody as void;
        return cb(err, result, data.request, data);
      });
    }
  }

  /**
   * send globalStringPath=globalStringPath, pathItemStringPath='pathItemStringPath',
   * localStringPath='localStringPath', globalStringQuery=null,
   * pathItemStringQuery='pathItemStringQuery', localStringQuery=null
   *
   * @param {string} localStringPath should contain value 'localStringPath'
   *
   * @param {string} pathItemStringPath A string value 'pathItemStringPath' that appears in the path
   *
   * @param {PathItemsGetGlobalAndLocalQueryNullOptionalParams} [options] Optional Parameters.
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
  getGlobalAndLocalQueryNull(localStringPath: string, pathItemStringPath: string): Promise<void>;
  getGlobalAndLocalQueryNull(localStringPath: string, pathItemStringPath: string, options: Models.PathItemsGetGlobalAndLocalQueryNullOptionalParams): Promise<void>;
  getGlobalAndLocalQueryNull(localStringPath: string, pathItemStringPath: string, callback: msRest.ServiceCallback<void>): void;
  getGlobalAndLocalQueryNull(localStringPath: string, pathItemStringPath: string, options: Models.PathItemsGetGlobalAndLocalQueryNullOptionalParams, callback: msRest.ServiceCallback<void>): void;
  getGlobalAndLocalQueryNull(localStringPath: string, pathItemStringPath: string, options?: Models.PathItemsGetGlobalAndLocalQueryNullOptionalParams, callback?: msRest.ServiceCallback<void>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<void>;
    if (!callback) {
      return this.getGlobalAndLocalQueryNullWithHttpOperationResponse(localStringPath, pathItemStringPath, options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as void);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.getGlobalAndLocalQueryNullWithHttpOperationResponse(localStringPath, pathItemStringPath, options))((err: Error, data: msRest.HttpOperationResponse) => {
        if (err) {
          return cb(err);
        }
        let result = data.parsedBody as void;
        return cb(err, result, data.request, data);
      });
    }
  }

  /**
   * send globalStringPath='globalStringPath', pathItemStringPath='pathItemStringPath',
   * localStringPath='localStringPath', globalStringQuery='globalStringQuery',
   * pathItemStringQuery=null, localStringQuery=null
   *
   * @param {string} localStringPath should contain value 'localStringPath'
   *
   * @param {string} pathItemStringPath A string value 'pathItemStringPath' that appears in the path
   *
   * @param {PathItemsGetLocalPathItemQueryNullOptionalParams} [options] Optional Parameters.
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
  getLocalPathItemQueryNull(localStringPath: string, pathItemStringPath: string): Promise<void>;
  getLocalPathItemQueryNull(localStringPath: string, pathItemStringPath: string, options: Models.PathItemsGetLocalPathItemQueryNullOptionalParams): Promise<void>;
  getLocalPathItemQueryNull(localStringPath: string, pathItemStringPath: string, callback: msRest.ServiceCallback<void>): void;
  getLocalPathItemQueryNull(localStringPath: string, pathItemStringPath: string, options: Models.PathItemsGetLocalPathItemQueryNullOptionalParams, callback: msRest.ServiceCallback<void>): void;
  getLocalPathItemQueryNull(localStringPath: string, pathItemStringPath: string, options?: Models.PathItemsGetLocalPathItemQueryNullOptionalParams, callback?: msRest.ServiceCallback<void>): any {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    let cb = callback as msRest.ServiceCallback<void>;
    if (!callback) {
      return this.getLocalPathItemQueryNullWithHttpOperationResponse(localStringPath, pathItemStringPath, options).then((operationRes: msRest.HttpOperationResponse) => {
        return Promise.resolve(operationRes.parsedBody as void);
      }).catch((err: Error) => {
        return Promise.reject(err);
      });
    } else {
      msRest.promiseToCallback(this.getLocalPathItemQueryNullWithHttpOperationResponse(localStringPath, pathItemStringPath, options))((err: Error, data: msRest.HttpOperationResponse) => {
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
const getAllWithValuesOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "pathitem/nullable/globalStringPath/{globalStringPath}/pathItemStringPath/{pathItemStringPath}/localStringPath/{localStringPath}/globalStringQuery/pathItemStringQuery/localStringQuery",
  urlParameters: [
    {
      parameterPath: "localStringPath",
      mapper: {
        required: true,
        serializedName: "localStringPath",
        type: {
          name: "String"
        }
      }
    },
    {
      parameterPath: "pathItemStringPath",
      mapper: {
        required: true,
        serializedName: "pathItemStringPath",
        type: {
          name: "String"
        }
      }
    },
    {
      parameterPath: "this.client.globalStringPath",
      mapper: {
        required: true,
        serializedName: "globalStringPath",
        type: {
          name: "String"
        }
      }
    }
  ],
  queryParameters: [
    {
      parameterPath: "localStringQuery",
      mapper: {
        serializedName: "localStringQuery",
        type: {
          name: "String"
        }
      }
    },
    {
      parameterPath: "pathItemStringQuery",
      mapper: {
        serializedName: "pathItemStringQuery",
        type: {
          name: "String"
        }
      }
    },
    {
      parameterPath: "this.client.globalStringQuery",
      mapper: {
        serializedName: "globalStringQuery",
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

const getGlobalQueryNullOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "pathitem/nullable/globalStringPath/{globalStringPath}/pathItemStringPath/{pathItemStringPath}/localStringPath/{localStringPath}/null/pathItemStringQuery/localStringQuery",
  urlParameters: [
    {
      parameterPath: "localStringPath",
      mapper: {
        required: true,
        serializedName: "localStringPath",
        type: {
          name: "String"
        }
      }
    },
    {
      parameterPath: "pathItemStringPath",
      mapper: {
        required: true,
        serializedName: "pathItemStringPath",
        type: {
          name: "String"
        }
      }
    },
    {
      parameterPath: "this.client.globalStringPath",
      mapper: {
        required: true,
        serializedName: "globalStringPath",
        type: {
          name: "String"
        }
      }
    }
  ],
  queryParameters: [
    {
      parameterPath: "localStringQuery",
      mapper: {
        serializedName: "localStringQuery",
        type: {
          name: "String"
        }
      }
    },
    {
      parameterPath: "pathItemStringQuery",
      mapper: {
        serializedName: "pathItemStringQuery",
        type: {
          name: "String"
        }
      }
    },
    {
      parameterPath: "this.client.globalStringQuery",
      mapper: {
        serializedName: "globalStringQuery",
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

const getGlobalAndLocalQueryNullOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "pathitem/nullable/globalStringPath/{globalStringPath}/pathItemStringPath/{pathItemStringPath}/localStringPath/{localStringPath}/null/pathItemStringQuery/null",
  urlParameters: [
    {
      parameterPath: "localStringPath",
      mapper: {
        required: true,
        serializedName: "localStringPath",
        type: {
          name: "String"
        }
      }
    },
    {
      parameterPath: "pathItemStringPath",
      mapper: {
        required: true,
        serializedName: "pathItemStringPath",
        type: {
          name: "String"
        }
      }
    },
    {
      parameterPath: "this.client.globalStringPath",
      mapper: {
        required: true,
        serializedName: "globalStringPath",
        type: {
          name: "String"
        }
      }
    }
  ],
  queryParameters: [
    {
      parameterPath: "localStringQuery",
      mapper: {
        serializedName: "localStringQuery",
        type: {
          name: "String"
        }
      }
    },
    {
      parameterPath: "pathItemStringQuery",
      mapper: {
        serializedName: "pathItemStringQuery",
        type: {
          name: "String"
        }
      }
    },
    {
      parameterPath: "this.client.globalStringQuery",
      mapper: {
        serializedName: "globalStringQuery",
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

const getLocalPathItemQueryNullOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "pathitem/nullable/globalStringPath/{globalStringPath}/pathItemStringPath/{pathItemStringPath}/localStringPath/{localStringPath}/globalStringQuery/null/null",
  urlParameters: [
    {
      parameterPath: "localStringPath",
      mapper: {
        required: true,
        serializedName: "localStringPath",
        type: {
          name: "String"
        }
      }
    },
    {
      parameterPath: "pathItemStringPath",
      mapper: {
        required: true,
        serializedName: "pathItemStringPath",
        type: {
          name: "String"
        }
      }
    },
    {
      parameterPath: "this.client.globalStringPath",
      mapper: {
        required: true,
        serializedName: "globalStringPath",
        type: {
          name: "String"
        }
      }
    }
  ],
  queryParameters: [
    {
      parameterPath: "localStringQuery",
      mapper: {
        serializedName: "localStringQuery",
        type: {
          name: "String"
        }
      }
    },
    {
      parameterPath: "pathItemStringQuery",
      mapper: {
        serializedName: "pathItemStringQuery",
        type: {
          name: "String"
        }
      }
    },
    {
      parameterPath: "this.client.globalStringQuery",
      mapper: {
        serializedName: "globalStringQuery",
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
