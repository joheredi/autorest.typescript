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
  IntegrationAccountBatchConfigurationsListResponse,
  IntegrationAccountBatchConfigurationsGetResponse,
  BatchConfiguration,
  IntegrationAccountBatchConfigurationsCreateOrUpdateResponse
} from "../models";

/**
 * Class representing a IntegrationAccountBatchConfigurations.
 */
export class IntegrationAccountBatchConfigurations {
  private readonly client: LogicManagementClient;

  /**
   * Initialize a new instance of the class IntegrationAccountBatchConfigurations class.
   * @param client Reference to the service client
   */
  constructor(client: LogicManagementClient) {
    this.client = client;
  }

  /**
   * List the batch configurations for an integration account.
   * @param resourceGroupName The resource group name.
   * @param integrationAccountName The integration account name.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    integrationAccountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<IntegrationAccountBatchConfigurationsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, integrationAccountName, options: operationOptions },
      listOperationSpec
    ) as Promise<IntegrationAccountBatchConfigurationsListResponse>;
  }

  /**
   * Get a batch configuration for an integration account.
   * @param resourceGroupName The resource group name.
   * @param integrationAccountName The integration account name.
   * @param batchConfigurationName The batch configuration name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    integrationAccountName: string,
    batchConfigurationName: string,
    options?: coreHttp.OperationOptions
  ): Promise<IntegrationAccountBatchConfigurationsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        integrationAccountName,
        batchConfigurationName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<IntegrationAccountBatchConfigurationsGetResponse>;
  }

  /**
   * Create or update a batch configuration for an integration account.
   * @param resourceGroupName The resource group name.
   * @param integrationAccountName The integration account name.
   * @param batchConfigurationName The batch configuration name.
   * @param batchConfiguration The batch configuration.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    integrationAccountName: string,
    batchConfigurationName: string,
    batchConfiguration: BatchConfiguration,
    options?: coreHttp.OperationOptions
  ): Promise<IntegrationAccountBatchConfigurationsCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        integrationAccountName,
        batchConfigurationName,
        batchConfiguration,
        options: operationOptions
      },
      createOrUpdateOperationSpec
    ) as Promise<IntegrationAccountBatchConfigurationsCreateOrUpdateResponse>;
  }

  /**
   * Delete a batch configuration for an integration account.
   * @param resourceGroupName The resource group name.
   * @param integrationAccountName The integration account name.
   * @param batchConfigurationName The batch configuration name.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    integrationAccountName: string,
    batchConfigurationName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        integrationAccountName,
        batchConfigurationName,
        options: operationOptions
      },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/batchConfigurations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BatchConfigurationCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.integrationAccountName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/batchConfigurations/{batchConfigurationName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BatchConfiguration
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.integrationAccountName,
    Parameters.batchConfigurationName
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/batchConfigurations/{batchConfigurationName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.BatchConfiguration
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.batchConfiguration,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.integrationAccountName,
    Parameters.batchConfigurationName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/batchConfigurations/{batchConfigurationName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.integrationAccountName,
    Parameters.batchConfigurationName
  ],
  serializer
};
