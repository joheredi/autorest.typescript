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
import * as Mappers from "./models/mappers";
import { MediaTypesClientContext } from "./mediaTypesClientContext";
import {
  MediaTypesClientAnalyzeBodyResponse,
  MediaTypesClientAnalyzeBodyOptionalParams
} from "./models";

class MediaTypesClient extends MediaTypesClientContext {
  /**
   * Initializes a new instance of the MediaTypesClient class.
   * @param options The parameter options
   */
  constructor(options?: Models.MediaTypesClientOptionalParams) {
    super(options);
  }

  /**
   * Analyze body, that could be different media types.
   * @param options The options parameters.
   */
  analyzeBody(
    options?: MediaTypesClientAnalyzeBodyOptionalParams
  ): Promise<MediaTypesClientAnalyzeBodyResponse> {
    let operationSpec: coreHttp.OperationSpec;
    if (
      options &&
      "contentType" in options &&
      ["application/pdf", "image/jpeg", "image/png", "image/tiff"].indexOf(
        options.contentType ?? ""
      ) > -1
    ) {
      operationSpec = analyzeBody$binaryOperationSpec;
    } else {
      operationSpec = analyzeBody$jsonOperationSpec;
    }
    return this.sendOperationRequest({ options }, operationSpec) as Promise<
      MediaTypesClientAnalyzeBodyResponse
    >;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const analyzeBody$binaryOperationSpec: coreHttp.OperationSpec = {
  path: "/mediatypes/analyze",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" }, serializedName: "String" }
    }
  },
  requestBody: Parameters.input,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  serializer
};
const analyzeBody$jsonOperationSpec: coreHttp.OperationSpec = {
  path: "/mediatypes/analyze",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" }, serializedName: "String" }
    }
  },
  requestBody: Parameters.input1,
  urlParameters: [Parameters.$host],
  serializer
};

// Operation Specifications

export {
  MediaTypesClient,
  MediaTypesClientContext,
  Models as MediaTypesModels,
  Mappers as MediaTypesMappers
};
