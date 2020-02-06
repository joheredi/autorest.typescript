/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Models from "../models";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { HeaderClient } from "../headerClient";

/**
 * Class representing a Header.
 */
export class Header {
  private readonly client: HeaderClient;

  /**
   * Initialize a new instance of the class Header class.
   * @param client Reference to the service client
   */
  constructor(client: HeaderClient) {
    this.client = client;
  }

  /**
   * Send a post request with header value "User-Agent": "overwrite"
   * @param userAgent Send a post request with header value "User-Agent": "overwrite"
   * @param options The options parameters.
   */
  paramExistingKey(
    userAgent: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { userAgent, options },
      paramExistingKeyOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get a response with header value "User-Agent": "overwrite"
   * @param options The options parameters.
   */
  responseExistingKey(
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { options },
      responseExistingKeyOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Send a post request with header value "Content-Type": "text/html"
   * @param contentType Send a post request with header value "Content-Type": "text/html"
   * @param options The options parameters.
   */
  paramProtectedKey(
    contentType: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { contentType, options },
      paramProtectedKeyOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get a response with header value "Content-Type": "text/html"
   * @param options The options parameters.
   */
  responseProtectedKey(
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { options },
      responseProtectedKeyOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Send a post request with header values "scenario": "positive", "value": 1 or "scenario": "negative",
   * "value": -2
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param value Send a post request with header values 1 or -2
   * @param options The options parameters.
   */
  paramInteger(
    scenario: string,
    value: number,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, value, options },
      paramIntegerOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get a response with header value "value": 1 or -2
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param options The options parameters.
   */
  responseInteger(
    scenario: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, options },
      responseIntegerOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Send a post request with header values "scenario": "positive", "value": 105 or "scenario":
   * "negative", "value": -2
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param value Send a post request with header values 105 or -2
   * @param options The options parameters.
   */
  paramLong(
    scenario: string,
    value: number,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, value, options },
      paramLongOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get a response with header value "value": 105 or -2
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param options The options parameters.
   */
  responseLong(
    scenario: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, options },
      responseLongOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Send a post request with header values "scenario": "positive", "value": 0.07 or "scenario":
   * "negative", "value": -3.0
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param value Send a post request with header values 0.07 or -3.0
   * @param options The options parameters.
   */
  paramFloat(
    scenario: string,
    value: number,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, value, options },
      paramFloatOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get a response with header value "value": 0.07 or -3.0
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param options The options parameters.
   */
  responseFloat(
    scenario: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, options },
      responseFloatOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Send a post request with header values "scenario": "positive", "value": 7e120 or "scenario":
   * "negative", "value": -3.0
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param value Send a post request with header values 7e120 or -3.0
   * @param options The options parameters.
   */
  paramDouble(
    scenario: string,
    value: number,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, value, options },
      paramDoubleOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get a response with header value "value": 7e120 or -3.0
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param options The options parameters.
   */
  responseDouble(
    scenario: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, options },
      responseDoubleOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Send a post request with header values "scenario": "true", "value": true or "scenario": "false",
   * "value": false
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param value Send a post request with header values true or false
   * @param options The options parameters.
   */
  paramBool(
    scenario: string,
    value: boolean,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, value, options },
      paramBoolOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get a response with header value "value": true or false
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param options The options parameters.
   */
  responseBool(
    scenario: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, options },
      responseBoolOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Send a post request with header values "scenario": "valid", "value": "The quick brown fox jumps over
   * the lazy dog" or "scenario": "null", "value": null or "scenario": "empty", "value": ""
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param options The options parameters.
   */
  paramString(
    scenario: string,
    options?: Models.HeaderParamStringOptionalParams
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, options },
      paramStringOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get a response with header values "The quick brown fox jumps over the lazy dog" or null or ""
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param options The options parameters.
   */
  responseString(
    scenario: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, options },
      responseStringOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Send a post request with header values "scenario": "valid", "value": "2010-01-01" or "scenario":
   * "min", "value": "0001-01-01"
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param value Send a post request with header values "2010-01-01" or "0001-01-01"
   * @param options The options parameters.
   */
  paramDate(
    scenario: string,
    value: Date,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, value, options },
      paramDateOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get a response with header values "2010-01-01" or "0001-01-01"
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param options The options parameters.
   */
  responseDate(
    scenario: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, options },
      responseDateOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Send a post request with header values "scenario": "valid", "value": "2010-01-01T12:34:56Z" or
   * "scenario": "min", "value": "0001-01-01T00:00:00Z"
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param value Send a post request with header values "2010-01-01T12:34:56Z" or "0001-01-01T00:00:00Z"
   * @param options The options parameters.
   */
  paramDatetime(
    scenario: string,
    value: Date,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, value, options },
      paramDatetimeOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get a response with header values "2010-01-01T12:34:56Z" or "0001-01-01T00:00:00Z"
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param options The options parameters.
   */
  responseDatetime(
    scenario: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, options },
      responseDatetimeOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Send a post request with header values "scenario": "valid", "value": "Wed, 01 Jan 2010 12:34:56 GMT"
   * or "scenario": "min", "value": "Mon, 01 Jan 0001 00:00:00 GMT"
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param options The options parameters.
   */
  paramDatetimeRfc1123(
    scenario: string,
    options?: Models.HeaderParamDatetimeRfc1123OptionalParams
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, options },
      paramDatetimeRfc1123OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get a response with header values "Wed, 01 Jan 2010 12:34:56 GMT" or "Mon, 01 Jan 0001 00:00:00 GMT"
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param options The options parameters.
   */
  responseDatetimeRfc1123(
    scenario: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, options },
      responseDatetimeRfc1123OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Send a post request with header values "scenario": "valid", "value": "P123DT22H14M12.011S"
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param value Send a post request with header values "P123DT22H14M12.011S"
   * @param options The options parameters.
   */
  paramDuration(
    scenario: string,
    value: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, value, options },
      paramDurationOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get a response with header values "P123DT22H14M12.011S"
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param options The options parameters.
   */
  responseDuration(
    scenario: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, options },
      responseDurationOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Send a post request with header values "scenario": "valid", "value": "啊齄丂狛狜隣郎隣兀﨩"
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param value Send a post request with header values "啊齄丂狛狜隣郎隣兀﨩"
   * @param options The options parameters.
   */
  paramByte(
    scenario: string,
    value: Uint8Array,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, value, options },
      paramByteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get a response with header values "啊齄丂狛狜隣郎隣兀﨩"
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param options The options parameters.
   */
  responseByte(
    scenario: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, options },
      responseByteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Send a post request with header values "scenario": "valid", "value": "GREY" or "scenario": "null",
   * "value": null
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param options The options parameters.
   */
  paramEnum(
    scenario: string,
    options?: Models.HeaderParamEnumOptionalParams
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, options },
      paramEnumOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get a response with header values "GREY" or null
   * @param scenario Send a post request with header values "scenario": "positive" or "negative"
   * @param options The options parameters.
   */
  responseEnum(
    scenario: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { scenario, options },
      responseEnumOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Send x-ms-client-request-id = 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0 in the header of the request
   * @param options The options parameters.
   */
  customRequestId(
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { options },
      customRequestIdOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, false);

const paramExistingKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/header/param/existingkey",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.userAgent],
  serializer
};
const responseExistingKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/header/response/existingkey",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  serializer
};
const paramProtectedKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/header/param/protectedkey",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  serializer
};
const responseProtectedKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/header/response/protectedkey",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  serializer
};
const paramIntegerOperationSpec: coreHttp.OperationSpec = {
  path: "/header/param/prim/integer",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario, Parameters.value],
  serializer
};
const responseIntegerOperationSpec: coreHttp.OperationSpec = {
  path: "/header/response/prim/integer",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario],
  serializer
};
const paramLongOperationSpec: coreHttp.OperationSpec = {
  path: "/header/param/prim/long",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario, Parameters.value1],
  serializer
};
const responseLongOperationSpec: coreHttp.OperationSpec = {
  path: "/header/response/prim/long",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario],
  serializer
};
const paramFloatOperationSpec: coreHttp.OperationSpec = {
  path: "/header/param/prim/float",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario, Parameters.value2],
  serializer
};
const responseFloatOperationSpec: coreHttp.OperationSpec = {
  path: "/header/response/prim/float",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario],
  serializer
};
const paramDoubleOperationSpec: coreHttp.OperationSpec = {
  path: "/header/param/prim/double",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario, Parameters.value3],
  serializer
};
const responseDoubleOperationSpec: coreHttp.OperationSpec = {
  path: "/header/response/prim/double",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario],
  serializer
};
const paramBoolOperationSpec: coreHttp.OperationSpec = {
  path: "/header/param/prim/bool",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario, Parameters.value4],
  serializer
};
const responseBoolOperationSpec: coreHttp.OperationSpec = {
  path: "/header/response/prim/bool",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario],
  serializer
};
const paramStringOperationSpec: coreHttp.OperationSpec = {
  path: "/header/param/prim/string",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario, Parameters.value5],
  serializer
};
const responseStringOperationSpec: coreHttp.OperationSpec = {
  path: "/header/response/prim/string",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario],
  serializer
};
const paramDateOperationSpec: coreHttp.OperationSpec = {
  path: "/header/param/prim/date",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario, Parameters.value6],
  serializer
};
const responseDateOperationSpec: coreHttp.OperationSpec = {
  path: "/header/response/prim/date",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario],
  serializer
};
const paramDatetimeOperationSpec: coreHttp.OperationSpec = {
  path: "/header/param/prim/datetime",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario, Parameters.value7],
  serializer
};
const responseDatetimeOperationSpec: coreHttp.OperationSpec = {
  path: "/header/response/prim/datetime",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario],
  serializer
};
const paramDatetimeRfc1123OperationSpec: coreHttp.OperationSpec = {
  path: "/header/param/prim/datetimerfc1123",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario, Parameters.value8],
  serializer
};
const responseDatetimeRfc1123OperationSpec: coreHttp.OperationSpec = {
  path: "/header/response/prim/datetimerfc1123",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario],
  serializer
};
const paramDurationOperationSpec: coreHttp.OperationSpec = {
  path: "/header/param/prim/duration",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario, Parameters.value9],
  serializer
};
const responseDurationOperationSpec: coreHttp.OperationSpec = {
  path: "/header/response/prim/duration",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario],
  serializer
};
const paramByteOperationSpec: coreHttp.OperationSpec = {
  path: "/header/param/prim/byte",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario, Parameters.value10],
  serializer
};
const responseByteOperationSpec: coreHttp.OperationSpec = {
  path: "/header/response/prim/byte",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario],
  serializer
};
const paramEnumOperationSpec: coreHttp.OperationSpec = {
  path: "/header/param/prim/enum",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario, Parameters.value11],
  serializer
};
const responseEnumOperationSpec: coreHttp.OperationSpec = {
  path: "/header/response/prim/enum",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.scenario],
  serializer
};
const customRequestIdOperationSpec: coreHttp.OperationSpec = {
  path:
    "/header/custom/x-ms-client-request-id/9C4D50EE-2D56-4CD3-8152-34347DC9F2B0",
  httpMethod: "POST",
  responses: { 200: {}, default: { bodyMapper: Mappers.ErrorModel } },
  urlParameters: [Parameters.$host],
  serializer
};
