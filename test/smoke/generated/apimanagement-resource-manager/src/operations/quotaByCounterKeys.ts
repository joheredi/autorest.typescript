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
import { ApiManagementClient } from "../apiManagementClient";
import {
  QuotaByCounterKeysListByServiceResponse,
  QuotaCounterValueContractProperties
} from "../models";

/**
 * Class representing a QuotaByCounterKeys.
 */
export class QuotaByCounterKeys {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class QuotaByCounterKeys class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Lists a collection of current quota counter periods associated with the counter-key configured in
   * the policy on the specified service instance. The api does not support paging yet.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param quotaCounterKey Quota counter key identifier.This is the result of expression defined in
   *                        counter-key attribute of the quota-by-key policy.For Example, if you specify counter-key="boo" in
   *                        the policy, then it’s accessible by "boo" counter key. But if it’s defined as
   *                        counter-key="@("b"+"a")" then it will be accessible by "ba" key
   * @param options The options parameters.
   */
  listByService(
    resourceGroupName: string,
    serviceName: string,
    quotaCounterKey: string,
    options?: coreHttp.OperationOptions
  ): Promise<QuotaByCounterKeysListByServiceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        quotaCounterKey,
        options: operationOptions
      },
      listByServiceOperationSpec
    ) as Promise<QuotaByCounterKeysListByServiceResponse>;
  }

  /**
   * Updates all the quota counter values specified with the existing quota counter key to a value in the
   * specified service instance. This should be used for reset of the quota counter values.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param quotaCounterKey Quota counter key identifier.This is the result of expression defined in
   *                        counter-key attribute of the quota-by-key policy.For Example, if you specify counter-key="boo" in
   *                        the policy, then it’s accessible by "boo" counter key. But if it’s defined as
   *                        counter-key="@("b"+"a")" then it will be accessible by "ba" key
   * @param parameters The value of the quota counter to be applied to all quota counter periods.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    serviceName: string,
    quotaCounterKey: string,
    parameters: QuotaCounterValueContractProperties,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        quotaCounterKey,
        parameters,
        options: operationOptions
      },
      updateOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listByServiceOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/quotas/{quotaCounterKey}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.QuotaCounterCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.quotaCounterKey
  ],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/quotas/{quotaCounterKey}",
  httpMethod: "PATCH",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters58,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.quotaCounterKey
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
