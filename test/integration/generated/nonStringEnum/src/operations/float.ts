/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Parameters from "../models/parameters";
import { NonStringEnumClient } from "../nonStringEnumClient";
import {
  FloatPutOptionalParams,
  FloatPutResponse,
  FloatGetResponse
} from "../models";

/**
 * Class representing a Float.
 */
export class Float {
  private readonly client: NonStringEnumClient;

  /**
   * Initialize a new instance of the class Float class.
   * @param client Reference to the service client
   */
  constructor(client: NonStringEnumClient) {
    this.client = client;
  }

  /**
   * Put a float enum
   * @param options The options parameters.
   */
  put(options?: FloatPutOptionalParams): Promise<FloatPutResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      putOperationSpec
    ) as Promise<FloatPutResponse>;
  }

  /**
   * Get a float enum
   * @param options The options parameters.
   */
  get(options?: coreHttp.OperationOptions): Promise<FloatGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getOperationSpec
    ) as Promise<FloatGetResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer({}, /* isXml */ false);

const putOperationSpec: coreHttp.OperationSpec = {
  path: "/nonStringEnums/float/put",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" } }
    }
  },
  requestBody: Parameters.input1,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path: "/nonStringEnums/float/get",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "Number" } }
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
