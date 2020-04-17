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
import { AdvisorManagementClient } from "../advisorManagementClient";
import {
  ServiceGetMetricsOptionalParams,
  ServiceGetMetricsResponse
} from "../models";

/**
 * Class representing a Service.
 */
export class Service {
  private readonly client: AdvisorManagementClient;

  /**
   * Initialize a new instance of the class Service class.
   * @param client Reference to the service client
   */
  constructor(client: AdvisorManagementClient) {
    this.client = client;
  }

  /**
   * Gets the server related metrics for a given metric and group combination.
   * @param serviceName The name of the service.
   * @param metricName The metric name
   * @param groupName The group name
   * @param options The options parameters.
   */
  getMetrics(
    serviceName: string,
    metricName: string,
    groupName: string,
    options?: ServiceGetMetricsOptionalParams
  ): Promise<ServiceGetMetricsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { serviceName, metricName, groupName, options: operationOptions },
      getMetricsOperationSpec
    ) as Promise<ServiceGetMetricsResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getMetricsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/providers/Microsoft.ADHybridHealthService/services/{serviceName}/metrics/{metricName}/groups/{groupName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MetricSets
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.groupKey,
    Parameters.fromDate,
    Parameters.toDate
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.serviceName,
    Parameters.metricName,
    Parameters.groupName
  ],
  serializer
};
