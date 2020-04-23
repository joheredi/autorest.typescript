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
import { MicrosoftSupport } from "../microsoftSupport";
import {
  ProblemClassificationsListResponse,
  ProblemClassificationsGetResponse
} from "../models";

/**
 * Class representing a ProblemClassifications.
 */
export class ProblemClassifications {
  private readonly client: MicrosoftSupport;

  /**
   * Initialize a new instance of the class ProblemClassifications class.
   * @param client Reference to the service client
   */
  constructor(client: MicrosoftSupport) {
    this.client = client;
  }

  /**
   * Lists all the problem classifications (categories) available for a specific Azure service. Always
   * use the service and problem classifications obtained programmatically. This practice ensures that
   * you always have the most recent set of service and problem classification Ids.
   * @param serviceName Name of the Azure service for which the problem classifications need to be
   *                    retrieved.
   * @param options The options parameters.
   */
  list(
    serviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ProblemClassificationsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { serviceName, options: operationOptions },
      listOperationSpec
    ) as Promise<ProblemClassificationsListResponse>;
  }

  /**
   * Get problem classification details for a specific Azure service.
   * @param serviceName Name of the Azure service available for support.
   * @param problemClassificationName Name of problem classification.
   * @param options The options parameters.
   */
  get(
    serviceName: string,
    problemClassificationName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ProblemClassificationsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { serviceName, problemClassificationName, options: operationOptions },
      getOperationSpec
    ) as Promise<ProblemClassificationsGetResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/providers/Microsoft.Support/services/{serviceName}/problemClassifications",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProblemClassificationsListResult
    },
    default: {
      bodyMapper: Mappers.ExceptionResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.serviceName1],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/providers/Microsoft.Support/services/{serviceName}/problemClassifications/{problemClassificationName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProblemClassification
    },
    default: {
      bodyMapper: Mappers.ExceptionResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.serviceName2,
    Parameters.problemClassificationName
  ],
  serializer
};
