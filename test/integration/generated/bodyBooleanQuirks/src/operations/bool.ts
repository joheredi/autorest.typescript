/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Mappers from "../mappers";
import * as Parameters from "../models/parameters";
import { BodyBooleanQuirksClient } from "../bodyBooleanQuirksClient";
import {
  BoolGetTrueResponse,
  BoolGetFalseResponse,
  BoolGetNullResponse,
  BoolGetInvalidResponse
} from "../models";

/**
 * Class representing a Bool.
 */
export class Bool {
  private readonly client: BodyBooleanQuirksClient;

  /**
   * Initialize a new instance of the class Bool class.
   * @param client Reference to the service client
   */
  constructor(client: BodyBooleanQuirksClient) {
    this.client = client;
  }

  /**
   * Get true Boolean value
   * @param options The options parameters.
   */
  getTrue(options?: coreHttp.OperationOptions): Promise<BoolGetTrueResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getTrueOperationSpec
    ) as Promise<BoolGetTrueResponse>;
  }

  /**
   * Set Boolean value true
   * @param boolBody
   * @param options The options parameters.
   */
  putTrue(
    boolBody: boolean,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { boolBody, options: operationOptions },
      putTrueOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get false Boolean value
   * @param options The options parameters.
   */
  getFalse(options?: coreHttp.OperationOptions): Promise<BoolGetFalseResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getFalseOperationSpec
    ) as Promise<BoolGetFalseResponse>;
  }

  /**
   * Set Boolean value false
   * @param boolBody
   * @param options The options parameters.
   */
  putFalse(
    boolBody: boolean,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { boolBody, options: operationOptions },
      putFalseOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get null Boolean value
   * @param options The options parameters.
   */
  getNull(options?: coreHttp.OperationOptions): Promise<BoolGetNullResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getNullOperationSpec
    ) as Promise<BoolGetNullResponse>;
  }

  /**
   * Get invalid Boolean value
   * @param options The options parameters.
   */
  getInvalid(
    options?: coreHttp.OperationOptions
  ): Promise<BoolGetInvalidResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getInvalidOperationSpec
    ) as Promise<BoolGetInvalidResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getTrueOperationSpec: coreHttp.OperationSpec = {
  path: "/bool/true",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "Boolean" } }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putTrueOperationSpec: coreHttp.OperationSpec = {
  path: "/bool/true",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.boolBody,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const getFalseOperationSpec: coreHttp.OperationSpec = {
  path: "/bool/false",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "Boolean" } }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putFalseOperationSpec: coreHttp.OperationSpec = {
  path: "/bool/false",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.boolBody,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const getNullOperationSpec: coreHttp.OperationSpec = {
  path: "/bool/null",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "Boolean" } }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const getInvalidOperationSpec: coreHttp.OperationSpec = {
  path: "/bool/invalid",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "Boolean" } }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
