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
import { StorageManagementClient } from "../storageManagementClient";
import { UsagesListByLocationResponse } from "../models";

/**
 * Class representing a Usages.
 */
export class Usages {
  private readonly client: StorageManagementClient;

  /**
   * Initialize a new instance of the class Usages class.
   * @param client Reference to the service client
   */
  constructor(client: StorageManagementClient) {
    this.client = client;
  }

  /**
   * Gets the current usage count and the limit for the resources of the location under the subscription.
   * @param location The location of the Azure Storage resource.
   * @param options The options parameters.
   */
  listByLocation(
    location: string,
    options?: coreHttp.OperationOptions
  ): Promise<UsagesListByLocationResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { location, options: operationOptions },
      listByLocationOperationSpec
    ) as Promise<UsagesListByLocationResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listByLocationOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Storage/locations/{location}/usages",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UsageListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location
  ],
  headerParameters: [Parameters.accept],
  serializer
};
