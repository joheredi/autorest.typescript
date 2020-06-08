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
import * as Mappers from "../models/apiVersionDefaultMappers";
import * as Parameters from "../models/parameters";
import { AutoRestAzureSpecialParametersTestClientContext } from "../autoRestAzureSpecialParametersTestClientContext";

/** Class representing a ApiVersionDefault. */
export class ApiVersionDefault {
  private readonly client: AutoRestAzureSpecialParametersTestClientContext;

  /**
   * Create a ApiVersionDefault.
   * @param {AutoRestAzureSpecialParametersTestClientContext} client Reference to the service client.
   */
  constructor(client: AutoRestAzureSpecialParametersTestClientContext) {
    this.client = client;
  }

  /**
   * GET method with api-version modeled in global settings.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  getMethodGlobalValid(options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param callback The callback
   */
  getMethodGlobalValid(callback: msRest.ServiceCallback<void>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getMethodGlobalValid(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  getMethodGlobalValid(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getMethodGlobalValidOperationSpec,
      callback);
  }

  /**
   * GET method with api-version modeled in global settings.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  getMethodGlobalNotProvidedValid(options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param callback The callback
   */
  getMethodGlobalNotProvidedValid(callback: msRest.ServiceCallback<void>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getMethodGlobalNotProvidedValid(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  getMethodGlobalNotProvidedValid(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getMethodGlobalNotProvidedValidOperationSpec,
      callback);
  }

  /**
   * GET method with api-version modeled in global settings.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  getPathGlobalValid(options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param callback The callback
   */
  getPathGlobalValid(callback: msRest.ServiceCallback<void>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getPathGlobalValid(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  getPathGlobalValid(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getPathGlobalValidOperationSpec,
      callback);
  }

  /**
   * GET method with api-version modeled in global settings.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  getSwaggerGlobalValid(options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param callback The callback
   */
  getSwaggerGlobalValid(callback: msRest.ServiceCallback<void>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getSwaggerGlobalValid(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  getSwaggerGlobalValid(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getSwaggerGlobalValidOperationSpec,
      callback);
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const getMethodGlobalValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "azurespecials/apiVersion/method/string/none/query/global/2015-07-01-preview",
  queryParameters: [
    Parameters.apiVersion0
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

const getMethodGlobalNotProvidedValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "azurespecials/apiVersion/method/string/none/query/globalNotProvided/2015-07-01-preview",
  queryParameters: [
    Parameters.apiVersion0
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

const getPathGlobalValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "azurespecials/apiVersion/path/string/none/query/global/2015-07-01-preview",
  queryParameters: [
    Parameters.apiVersion0
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

const getSwaggerGlobalValidOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "azurespecials/apiVersion/swagger/string/none/query/global/2015-07-01-preview",
  queryParameters: [
    Parameters.apiVersion0
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