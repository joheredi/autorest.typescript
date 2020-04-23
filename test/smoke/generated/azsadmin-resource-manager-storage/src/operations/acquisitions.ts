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
import { StorageAdminClient } from "../storageAdminClient";
import { AcquisitionsListResponse } from "../models";

/**
 * Class representing a Acquisitions.
 */
export class Acquisitions {
  private readonly client: StorageAdminClient;

  /**
   * Initialize a new instance of the class Acquisitions class.
   * @param client Reference to the service client
   */
  constructor(client: StorageAdminClient) {
    this.client = client;
  }

  /**
   * Returns a list of BLOB acquisitions.
   * @param subscriptionId Subscription Id.
   * @param location Resource location.
   * @param options The options parameters.
   */
  list(
    subscriptionId: string,
    location: string,
    options?: coreHttp.OperationOptions
  ): Promise<AcquisitionsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { subscriptionId, location, options: operationOptions },
      listOperationSpec
    ) as Promise<AcquisitionsListResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Storage.Admin/locations/{location}/acquisitions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AcquisitionList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location
  ],
  serializer
};
