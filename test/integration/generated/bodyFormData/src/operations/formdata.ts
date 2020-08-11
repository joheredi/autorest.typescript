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
import { BodyFormData } from "../bodyFormData";
import {
  FormdataUploadFileResponse,
  FormdataUploadFileViaBodyResponse
} from "../models";

/**
 * Class representing a Formdata.
 */
export class Formdata {
  private readonly client: BodyFormData;

  /**
   * Initialize a new instance of the class Formdata class.
   * @param client Reference to the service client
   */
  constructor(client: BodyFormData) {
    this.client = client;
  }

  /**
   * Upload file
   * @param fileContent File to upload.
   * @param fileName File name to upload. Name has to be spelled exactly as written here.
   * @param options The options parameters.
   */
  uploadFile(
    fileContent: coreHttp.HttpRequestBody,
    fileName: string,
    options?: coreHttp.OperationOptions
  ): Promise<FormdataUploadFileResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { fileContent, fileName, options: operationOptions },
      uploadFileOperationSpec
    ) as Promise<FormdataUploadFileResponse>;
  }

  /**
   * Upload file
   * @param fileContent File to upload.
   * @param options The options parameters.
   */
  uploadFileViaBody(
    fileContent: coreHttp.HttpRequestBody,
    options?: coreHttp.OperationOptions
  ): Promise<FormdataUploadFileViaBodyResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { fileContent, options: operationOptions },
      uploadFileViaBodyOperationSpec
    ) as Promise<FormdataUploadFileViaBodyResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const uploadFileOperationSpec: coreHttp.OperationSpec = {
  path: "/formdata/stream/uploadfile",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: { type: { name: "Stream" }, serializedName: "parsedResponse" }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  formDataParameters: [Parameters.fileContent, Parameters.fileName],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  contentType: "multipart/form-data",
  serializer
};
const uploadFileViaBodyOperationSpec: coreHttp.OperationSpec = {
  path: "/formdata/stream/uploadfile",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: { type: { name: "Stream" }, serializedName: "parsedResponse" }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.fileContent1,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType1],
  mediaType: "binary",
  serializer
};
