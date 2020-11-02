/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Parameters from "./models/parameters";
import { ObjectTypeClientContext } from "./objectTypeClientContext";
import {
  ObjectTypeClientOptionalParams,
  ObjectTypeClientGetResponse
} from "./models";

export class ObjectTypeClient extends ObjectTypeClientContext {
  /**
   * Initializes a new instance of the ObjectTypeClient class.
   * @param options The parameter options
   */
  constructor(options?: ObjectTypeClientOptionalParams) {
    super(options);
  }

  /**
   * Basic get that returns an object. Returns object { 'message': 'An object was successfully returned'
   * }
   * @param options The options parameters.
   */
  get(
    options?: coreHttp.OperationOptions
  ): Promise<ObjectTypeClientGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      getOperationSpec
    ) as Promise<ObjectTypeClientGetResponse>;
  }

  /**
   * Basic put that puts an object. Pass in {'foo': 'bar'} to get a 200 and anything else to get an
   * object error.
   * @param putObject Pass in {'foo': 'bar'} for a 200, anything else for an object error
   * @param options The options parameters.
   */
  put(
    putObject: any,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { putObject, options: operationOptions },
      putOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer({}, /* isXml */ false);

const getOperationSpec: coreHttp.OperationSpec = {
  path: "/objectType/get",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "any" } }
    },
    default: {
      bodyMapper: { type: { name: "any" } }
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const putOperationSpec: coreHttp.OperationSpec = {
  path: "/objectType/put",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: { type: { name: "any" } }
    }
  },
  requestBody: Parameters.putObject,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
