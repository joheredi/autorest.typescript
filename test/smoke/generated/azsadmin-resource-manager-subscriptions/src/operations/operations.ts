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
import { SubscriptionsAdminClient } from "../subscriptionsAdminClient";
import { OperationsListResponse } from "../models";

/**
 * Class representing a Operations.
 */
export class Operations {
  private readonly client: SubscriptionsAdminClient;

  /**
   * Initialize a new instance of the class Operations class.
   * @param client Reference to the service client
   */
  constructor(client: SubscriptionsAdminClient) {
    this.client = client;
  }

  /**
   * Get the list of Operations.
   * @param options The options parameters.
   */
  list(options?: coreHttp.OperationOptions): Promise<OperationsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listOperationSpec
    ) as Promise<OperationsListResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path: "/providers/Microsoft.Subscriptions.Admin/operations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OperationList
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host],
  serializer
};
