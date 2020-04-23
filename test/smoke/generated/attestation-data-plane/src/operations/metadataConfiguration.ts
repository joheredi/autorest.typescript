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
import { AttestationClient } from "../attestationClient";
import { MetadataConfigurationGetResponse } from "../models";

/**
 * Class representing a MetadataConfiguration.
 */
export class MetadataConfiguration {
  private readonly client: AttestationClient;

  /**
   * Initialize a new instance of the class MetadataConfiguration class.
   * @param client Reference to the service client
   */
  constructor(client: AttestationClient) {
    this.client = client;
  }

  /**
   * Retrieves metadata about the attestation signing keys in use by the  attestation service
   * @param options The options parameters.
   */
  get(
    options?: coreHttp.OperationOptions
  ): Promise<MetadataConfigurationGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getOperationSpec
    ) as Promise<MetadataConfigurationGetResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getOperationSpec: coreHttp.OperationSpec = {
  path: "/.well-known/openid-configuration",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "any" }, serializedName: "any" }
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  urlParameters: [Parameters.tenantBaseUrl],
  serializer
};
