/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Models from "../models";
import * as Mappers from "../models/httpSuccessMappers";
import * as Parameters from "../models/parameters";
import { AutoRestHeadTestServiceContext } from "../autoRestHeadTestServiceContext";

/** Class representing a HttpSuccess. */
export class HttpSuccess {
  private readonly client: AutoRestHeadTestServiceContext;

  /**
   * Create a HttpSuccess.
   * @param {AutoRestHeadTestServiceContext} client Reference to the service client.
   */
  constructor(client: AutoRestHeadTestServiceContext) {
    this.client = client;
  }

  /**
   * Return 200 status code if successful
   * @param [options] The optional parameters
   * @returns Promise<Models.HttpSuccessHead200Response>
   */
  head200(options?: coreHttp.RequestOptionsBase): Promise<Models.HttpSuccessHead200Response>;
  /**
   * @param callback The callback
   */
  head200(callback: coreHttp.ServiceCallback<boolean>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  head200(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<boolean>): void;
  head200(options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<boolean>, callback?: coreHttp.ServiceCallback<boolean>): Promise<Models.HttpSuccessHead200Response> {
    return this.client.sendOperationRequest(
      {
        options
      },
      head200OperationSpec,
      callback) as Promise<Models.HttpSuccessHead200Response>;
  }

  /**
   * Return 204 status code if successful
   * @param [options] The optional parameters
   * @returns Promise<Models.HttpSuccessHead204Response>
   */
  head204(options?: coreHttp.RequestOptionsBase): Promise<Models.HttpSuccessHead204Response>;
  /**
   * @param callback The callback
   */
  head204(callback: coreHttp.ServiceCallback<boolean>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  head204(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<boolean>): void;
  head204(options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<boolean>, callback?: coreHttp.ServiceCallback<boolean>): Promise<Models.HttpSuccessHead204Response> {
    return this.client.sendOperationRequest(
      {
        options
      },
      head204OperationSpec,
      callback) as Promise<Models.HttpSuccessHead204Response>;
  }

  /**
   * Return 404 status code if successful
   * @param [options] The optional parameters
   * @returns Promise<Models.HttpSuccessHead404Response>
   */
  head404(options?: coreHttp.RequestOptionsBase): Promise<Models.HttpSuccessHead404Response>;
  /**
   * @param callback The callback
   */
  head404(callback: coreHttp.ServiceCallback<boolean>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  head404(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<boolean>): void;
  head404(options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<boolean>, callback?: coreHttp.ServiceCallback<boolean>): Promise<Models.HttpSuccessHead404Response> {
    return this.client.sendOperationRequest(
      {
        options
      },
      head404OperationSpec,
      callback) as Promise<Models.HttpSuccessHead404Response>;
  }
}

// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers);
const head200OperationSpec: coreHttp.OperationSpec = {
  httpMethod: "HEAD",
  path: "http/success/200",
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    404: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const head204OperationSpec: coreHttp.OperationSpec = {
  httpMethod: "HEAD",
  path: "http/success/204",
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    204: {},
    404: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const head404OperationSpec: coreHttp.OperationSpec = {
  httpMethod: "HEAD",
  path: "http/success/404",
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    204: {},
    404: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};