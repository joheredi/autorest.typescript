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
import { LogicManagementClient } from "../logicManagementClient";
import {
  IntegrationServiceEnvironmentManagedApiOperationsListResponse,
  IntegrationServiceEnvironmentManagedApiOperationsListNextResponse
} from "../models";

/**
 * Class representing a IntegrationServiceEnvironmentManagedApiOperations.
 */
export class IntegrationServiceEnvironmentManagedApiOperations {
  private readonly client: LogicManagementClient;

  /**
   * Initialize a new instance of the class IntegrationServiceEnvironmentManagedApiOperations class.
   * @param client Reference to the service client
   */
  constructor(client: LogicManagementClient) {
    this.client = client;
  }

  /**
   * Gets the managed Api operations.
   * @param resourceGroup The resource group.
   * @param integrationServiceEnvironmentName The integration service environment name.
   * @param apiName The api name.
   * @param options The options parameters.
   */
  list(
    resourceGroup: string,
    integrationServiceEnvironmentName: string,
    apiName: string,
    options?: coreHttp.OperationOptions
  ): Promise<IntegrationServiceEnvironmentManagedApiOperationsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroup,
        integrationServiceEnvironmentName,
        apiName,
        options: operationOptions
      },
      listOperationSpec
    ) as Promise<IntegrationServiceEnvironmentManagedApiOperationsListResponse>;
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param resourceGroup The resource group.
   * @param integrationServiceEnvironmentName The integration service environment name.
   * @param apiName The api name.
   * @param options The options parameters.
   */
  listNext(
    nextLink: string,
    resourceGroup: string,
    integrationServiceEnvironmentName: string,
    apiName: string,
    options?: coreHttp.OperationOptions
  ): Promise<
    IntegrationServiceEnvironmentManagedApiOperationsListNextResponse
  > {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        nextLink,
        resourceGroup,
        integrationServiceEnvironmentName,
        apiName,
        options: operationOptions
      },
      listNextOperationSpec
    ) as Promise<
      IntegrationServiceEnvironmentManagedApiOperationsListNextResponse
    >;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Logic/integrationServiceEnvironments/{integrationServiceEnvironmentName}/managedApis/{apiName}/apiOperations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApiOperationListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroup,
    Parameters.integrationServiceEnvironmentName,
    Parameters.apiName
  ],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApiOperationListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink2,
    Parameters.resourceGroup,
    Parameters.integrationServiceEnvironmentName,
    Parameters.apiName
  ],
  serializer
};
