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
import { QuotasListResponse, QuotasGetResponse } from "../models";

/**
 * Class representing a Quotas.
 */
export class Quotas {
  private readonly client: SubscriptionsAdminClient;

  /**
   * Initialize a new instance of the class Quotas class.
   * @param client Reference to the service client
   */
  constructor(client: SubscriptionsAdminClient) {
    this.client = client;
  }

  /**
   * Get the list of quotas at a location.
   * @param location The AzureStack location.
   * @param options The options parameters.
   */
  list(
    location: string,
    options?: coreHttp.OperationOptions
  ): Promise<QuotasListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { location, options: operationOptions },
      listOperationSpec
    ) as Promise<QuotasListResponse>;
  }

  /**
   * Gets a quota by name.
   * @param location The AzureStack location.
   * @param quota Name of the quota.
   * @param options The options parameters.
   */
  get(
    location: string,
    quota: string,
    options?: coreHttp.OperationOptions
  ): Promise<QuotasGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { location, quota, options: operationOptions },
      getOperationSpec
    ) as Promise<QuotasGetResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Subscriptions.Admin/locations/{location}/quotas",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.QuotaList
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
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Subscriptions.Admin/locations/{location}/quotas/{quota}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Quota
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location,
    Parameters.quota
  ],
  serializer
};
