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
import { InstanceMetadataClient } from "../instanceMetadataClient";
import {
  AttestedGetDocumentOptionalParams,
  AttestedGetDocumentResponse
} from "../models";

/**
 * Class representing a Attested.
 */
export class Attested {
  private readonly client: InstanceMetadataClient;

  /**
   * Initialize a new instance of the class Attested class.
   * @param client Reference to the service client
   */
  constructor(client: InstanceMetadataClient) {
    this.client = client;
  }

  /**
   * Get Attested Data for the Virtual Machine.
   * @param options The options parameters.
   */
  getDocument(
    options?: AttestedGetDocumentOptionalParams
  ): Promise<AttestedGetDocumentResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getDocumentOperationSpec
    ) as Promise<AttestedGetDocumentResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getDocumentOperationSpec: coreHttp.OperationSpec = {
  path: "/attested/document",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AttestedData
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.nonce],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.metadata],
  serializer
};
