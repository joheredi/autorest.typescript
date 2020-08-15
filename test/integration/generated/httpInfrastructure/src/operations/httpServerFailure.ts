/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { HttpInfrastructureClient } from "../httpInfrastructureClient";

/**
 * Class representing a HttpServerFailure.
 */
export class HttpServerFailure {
  private readonly client: HttpInfrastructureClient;

  /**
   * Initialize a new instance of the class HttpServerFailure class.
   * @param client Reference to the service client
   */
  constructor(client: HttpInfrastructureClient) {
    this.client = client;
  }

  /**
   * Return 501 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  head501(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      head501OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 501 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  get501(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      get501OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 505 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  post505(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      post505OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 505 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  delete505(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      delete505OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const head501OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/server/501",
  httpMethod: "HEAD",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const get501OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/server/501",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const post505OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/server/505",
  httpMethod: "POST",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const delete505OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/server/505",
  httpMethod: "DELETE",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
