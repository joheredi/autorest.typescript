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
import { TimeSeriesInsightsClient } from "../timeSeriesInsightsClient";
import {
  TimeSeriesHierarchiesGetOptionalParams,
  TimeSeriesHierarchiesGetResponse,
  HierarchiesBatchRequest,
  TimeSeriesHierarchiesExecuteBatchOptionalParams,
  TimeSeriesHierarchiesExecuteBatchResponse
} from "../models";

/**
 * Class representing a TimeSeriesHierarchies.
 */
export class TimeSeriesHierarchies {
  private readonly client: TimeSeriesInsightsClient;

  /**
   * Initialize a new instance of the class TimeSeriesHierarchies class.
   * @param client Reference to the service client
   */
  constructor(client: TimeSeriesInsightsClient) {
    this.client = client;
  }

  /**
   * Returns time series hierarchies definitions in pages.
   * @param options The options parameters.
   */
  get(
    options?: TimeSeriesHierarchiesGetOptionalParams
  ): Promise<TimeSeriesHierarchiesGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getOperationSpec
    ) as Promise<TimeSeriesHierarchiesGetResponse>;
  }

  /**
   * Executes a batch get, create, update, delete operation on multiple time series hierarchy
   * definitions.
   * @param parameters Time series hierarchies batch request body.
   * @param options The options parameters.
   */
  executeBatch(
    parameters: HierarchiesBatchRequest,
    options?: TimeSeriesHierarchiesExecuteBatchOptionalParams
  ): Promise<TimeSeriesHierarchiesExecuteBatchResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { parameters, options: operationOptions },
      executeBatchOperationSpec
    ) as Promise<TimeSeriesHierarchiesExecuteBatchResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getOperationSpec: coreHttp.OperationSpec = {
  path: "/timeseries/hierarchies",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GetHierarchiesPage,
      headersMapper: Mappers.TimeSeriesHierarchiesGetHeaders
    },
    default: {
      bodyMapper: Mappers.TsiError,
      headersMapper: Mappers.TimeSeriesHierarchiesGetHeaders
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.environmentFqdn],
  headerParameters: [
    Parameters.clientRequestId,
    Parameters.clientSessionId,
    Parameters.continuationToken
  ],
  serializer
};
const executeBatchOperationSpec: coreHttp.OperationSpec = {
  path: "/timeseries/hierarchies/$batch",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.HierarchiesBatchResponse,
      headersMapper: Mappers.TimeSeriesHierarchiesExecuteBatchHeaders
    },
    default: {
      bodyMapper: Mappers.TsiError,
      headersMapper: Mappers.TimeSeriesHierarchiesExecuteBatchHeaders
    }
  },
  requestBody: Parameters.parameters7,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.environmentFqdn],
  headerParameters: [
    Parameters.clientRequestId,
    Parameters.clientSessionId,
    Parameters.contentType
  ],
  serializer
};
