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
import { BodyByteClient } from "../bodyByteClient";
import {
  ByteGetNullResponse,
  ByteGetEmptyResponse,
  ByteGetNonAsciiResponse,
  ByteGetInvalidResponse
} from "../models";

/**
 * Class representing a Byte.
 */
export class Byte {
  private readonly client: BodyByteClient;

  /**
   * Initialize a new instance of the class Byte class.
   * @param client Reference to the service client
   */
  constructor(client: BodyByteClient) {
    this.client = client;
  }

  /**
   * Get null byte value
   * @param options The options parameters.
   */
  getNull(options?: coreHttp.OperationOptions): Promise<ByteGetNullResponse> {
    return this.client.sendOperationRequest(
      { options },
      getNullOperationSpec
    ) as Promise<ByteGetNullResponse>;
  }

  /**
   * Get empty byte value ''
   * @param options The options parameters.
   */
  getEmpty(options?: coreHttp.OperationOptions): Promise<ByteGetEmptyResponse> {
    return this.client.sendOperationRequest(
      { options },
      getEmptyOperationSpec
    ) as Promise<ByteGetEmptyResponse>;
  }

  /**
   * Get non-ascii byte string hex(FF FE FD FC FB FA F9 F8 F7 F6)
   * @param options The options parameters.
   */
  getNonAscii(
    options?: coreHttp.OperationOptions
  ): Promise<ByteGetNonAsciiResponse> {
    return this.client.sendOperationRequest(
      { options },
      getNonAsciiOperationSpec
    ) as Promise<ByteGetNonAsciiResponse>;
  }

  /**
   * Put non-ascii byte string hex(FF FE FD FC FB FA F9 F8 F7 F6)
   * @param byteBody Base64-encoded non-ascii byte string hex(FF FE FD FC FB FA F9 F8 F7 F6)
   * @param options The options parameters.
   */
  putNonAscii(
    byteBody: Uint8Array,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { byteBody, options },
      putNonAsciiOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get invalid byte value ':::SWAGGER::::'
   * @param options The options parameters.
   */
  getInvalid(
    options?: coreHttp.OperationOptions
  ): Promise<ByteGetInvalidResponse> {
    return this.client.sendOperationRequest(
      { options },
      getInvalidOperationSpec
    ) as Promise<ByteGetInvalidResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getNullOperationSpec: coreHttp.OperationSpec = {
  path: "/byte/null",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "ByteArray" }, serializedName: "ByteArray" }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const getEmptyOperationSpec: coreHttp.OperationSpec = {
  path: "/byte/empty",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "ByteArray" }, serializedName: "ByteArray" }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const getNonAsciiOperationSpec: coreHttp.OperationSpec = {
  path: "/byte/nonAscii",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "ByteArray" }, serializedName: "ByteArray" }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putNonAsciiOperationSpec: coreHttp.OperationSpec = {
  path: "/byte/nonAscii",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.byteBody,
  urlParameters: [Parameters.$host],
  serializer
};
const getInvalidOperationSpec: coreHttp.OperationSpec = {
  path: "/byte/invalid",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "ByteArray" }, serializedName: "ByteArray" }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
