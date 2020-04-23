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
import { AzureDataManagementClient } from "../azureDataManagementClient";
import {
  SqlServersGetOptionalParams,
  SqlServersGetResponse,
  SqlServer,
  SqlServersCreateOrUpdateResponse,
  SqlServersListByResourceGroupOptionalParams,
  SqlServersListByResourceGroupResponse,
  SqlServersListByResourceGroupNextOptionalParams,
  SqlServersListByResourceGroupNextResponse
} from "../models";

/**
 * Class representing a SqlServers.
 */
export class SqlServers {
  private readonly client: AzureDataManagementClient;

  /**
   * Initialize a new instance of the class SqlServers class.
   * @param client Reference to the service client
   */
  constructor(client: AzureDataManagementClient) {
    this.client = client;
  }

  /**
   * Gets a SQL Server.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param sqlServerRegistrationName Name of the SQL Server registration.
   * @param sqlServerName Name of the SQL Server.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    sqlServerRegistrationName: string,
    sqlServerName: string,
    options?: SqlServersGetOptionalParams
  ): Promise<SqlServersGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        sqlServerRegistrationName,
        sqlServerName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<SqlServersGetResponse>;
  }

  /**
   * Creates or updates a SQL Server.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param sqlServerRegistrationName Name of the SQL Server registration.
   * @param sqlServerName Name of the SQL Server.
   * @param parameters The SQL Server to be created or updated.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    sqlServerRegistrationName: string,
    sqlServerName: string,
    parameters: SqlServer,
    options?: coreHttp.OperationOptions
  ): Promise<SqlServersCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        sqlServerRegistrationName,
        sqlServerName,
        parameters,
        options: operationOptions
      },
      createOrUpdateOperationSpec
    ) as Promise<SqlServersCreateOrUpdateResponse>;
  }

  /**
   * Deletes a SQL Server.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param sqlServerRegistrationName Name of the SQL Server registration.
   * @param sqlServerName Name of the SQL Server.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    sqlServerRegistrationName: string,
    sqlServerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        sqlServerRegistrationName,
        sqlServerName,
        options: operationOptions
      },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Gets all SQL Servers in a SQL Server Registration.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param sqlServerRegistrationName Name of the SQL Server registration.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    sqlServerRegistrationName: string,
    options?: SqlServersListByResourceGroupOptionalParams
  ): Promise<SqlServersListByResourceGroupResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        sqlServerRegistrationName,
        options: operationOptions
      },
      listByResourceGroupOperationSpec
    ) as Promise<SqlServersListByResourceGroupResponse>;
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param sqlServerRegistrationName Name of the SQL Server registration.
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  listByResourceGroupNext(
    resourceGroupName: string,
    sqlServerRegistrationName: string,
    nextLink: string,
    options?: SqlServersListByResourceGroupNextOptionalParams
  ): Promise<SqlServersListByResourceGroupNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        sqlServerRegistrationName,
        nextLink,
        options: operationOptions
      },
      listByResourceGroupNextOperationSpec
    ) as Promise<SqlServersListByResourceGroupNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureData/sqlServerRegistrations/{sqlServerRegistrationName}/sqlServers/{sqlServerName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SqlServer
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.sqlServerRegistrationName,
    Parameters.subscriptionId,
    Parameters.sqlServerName
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureData/sqlServerRegistrations/{sqlServerRegistrationName}/sqlServers/{sqlServerName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.SqlServer
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.sqlServerRegistrationName,
    Parameters.subscriptionId,
    Parameters.sqlServerName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureData/sqlServerRegistrations/{sqlServerRegistrationName}/sqlServers/{sqlServerName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.sqlServerRegistrationName,
    Parameters.subscriptionId,
    Parameters.sqlServerName
  ],
  serializer
};
const listByResourceGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureData/sqlServerRegistrations/{sqlServerRegistrationName}/sqlServers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SqlServerListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.sqlServerRegistrationName,
    Parameters.subscriptionId
  ],
  serializer
};
const listByResourceGroupNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SqlServerListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.sqlServerRegistrationName,
    Parameters.subscriptionId,
    Parameters.nextLink1
  ],
  serializer
};
