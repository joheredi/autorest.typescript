/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Parameters from "./models/parameters";
import * as Models from "./models";
import * as Mappers from "./mappers";
import { MediaTypesClientContext } from "./mediaTypesClientContext";
import {
  MediaTypesClientOptionalParams,
  ContentType,
  MediaTypesClientAnalyzeBody$binaryOptionalParams,
  MediaTypesClientAnalyzeBody$jsonOptionalParams,
  MediaTypesClientAnalyzeBodyResponse,
  MediaTypesClientContentTypeWithEncodingResponse
} from "./models";

class MediaTypesClient extends MediaTypesClientContext {
  /**
   * Initializes a new instance of the MediaTypesClient class.
   * @param options The parameter options
   */
  constructor(options?: MediaTypesClientOptionalParams) {
    super(options);
  }

  /**
   * Analyze body, that could be different media types.
   * @param contentType Upload file type
   * @param input Input parameter.
   * @param options The options parameters.
   */
  analyzeBody(
    contentType: ContentType,
    input: coreHttp.HttpRequestBody,
    options?: MediaTypesClientAnalyzeBody$binaryOptionalParams
  ): Promise<MediaTypesClientAnalyzeBodyResponse>;
  /**
   * Analyze body, that could be different media types.
   * @param contentType Body Parameter content-type
   * @param options The options parameters.
   */
  analyzeBody(
    contentType: "application/json",
    options?: MediaTypesClientAnalyzeBody$jsonOptionalParams
  ): Promise<MediaTypesClientAnalyzeBodyResponse>;
  /**
   * Analyze body, that could be different media types.
   * @param args Includes all the parameters for this operation.
   */
  analyzeBody(
    ...args:
      | [
          ContentType,
          coreHttp.HttpRequestBody,
          MediaTypesClientAnalyzeBody$binaryOptionalParams?
        ]
      | ["application/json", MediaTypesClientAnalyzeBody$jsonOptionalParams?]
  ): Promise<MediaTypesClientAnalyzeBodyResponse> {
    let operationSpec: coreHttp.OperationSpec;
    let operationArguments: coreHttp.OperationArguments;
    if (
      args[0] === "application/pdf" ||
      args[0] === "image/jpeg" ||
      args[0] === "image/png" ||
      args[0] === "image/tiff"
    ) {
      operationSpec = analyzeBody$binaryOperationSpec;
      operationArguments = {
        contentType: args[0],
        input: args[1],
        options: args[2]
      };
    } else if (args[0] === "application/json") {
      operationSpec = analyzeBody$jsonOperationSpec;
      operationArguments = {
        contentType: args[0],
        options: args[1]
      };
    } else {
      throw new TypeError(
        `"contentType" must be a valid value but instead was "${args[0]}".`
      );
    }
    return this.sendOperationRequest(
      operationArguments,
      operationSpec
    ) as Promise<MediaTypesClientAnalyzeBodyResponse>;
  }

  /**
   * Pass in contentType 'text/plain; encoding=UTF-8' to pass test. Value for input does not matter
   * @param input Input parameter.
   * @param options The options parameters.
   */
  contentTypeWithEncoding(
    input: string,
    options?: coreHttp.OperationOptions
  ): Promise<MediaTypesClientContentTypeWithEncodingResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { input, options: operationOptions },
      contentTypeWithEncodingOperationSpec
    ) as Promise<MediaTypesClientContentTypeWithEncodingResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const analyzeBody$binaryOperationSpec: coreHttp.OperationSpec = {
  path: "/mediatypes/analyze",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" } }
    }
  },
  requestBody: Parameters.input,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  mediaType: "binary",
  serializer
};
const analyzeBody$jsonOperationSpec: coreHttp.OperationSpec = {
  path: "/mediatypes/analyze",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" } }
    }
  },
  requestBody: Parameters.input1,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType1],
  mediaType: "json",
  serializer
};
const contentTypeWithEncodingOperationSpec: coreHttp.OperationSpec = {
  path: "/mediatypes/contentTypeWithEncoding",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" } }
    }
  },
  requestBody: Parameters.input2,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType2],
  mediaType: "text",
  serializer
};

// Operation Specifications

export {
  MediaTypesClient,
  MediaTypesClientContext,
  Models as MediaTypesModels,
  Mappers as MediaTypesMappers
};
