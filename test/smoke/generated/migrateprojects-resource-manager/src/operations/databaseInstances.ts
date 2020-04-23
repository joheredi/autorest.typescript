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
import { AzureMigrateHub } from "../azureMigrateHub";
import {
  DatabaseInstancesEnumerateDatabaseInstancesOptionalParams,
  DatabaseInstancesEnumerateDatabaseInstancesResponse,
  DatabaseInstancesGetDatabaseInstanceResponse
} from "../models";

/**
 * Class representing a DatabaseInstances.
 */
export class DatabaseInstances {
  private readonly client: AzureMigrateHub;

  /**
   * Initialize a new instance of the class DatabaseInstances class.
   * @param client Reference to the service client
   */
  constructor(client: AzureMigrateHub) {
    this.client = client;
  }

  /**
   * Gets a list of database instances in the migrate project.
   * @param resourceGroupName Name of the Azure Resource Group that migrate project is part of.
   * @param migrateProjectName Name of the Azure Migrate project.
   * @param options The options parameters.
   */
  enumerateDatabaseInstances(
    resourceGroupName: string,
    migrateProjectName: string,
    options?: DatabaseInstancesEnumerateDatabaseInstancesOptionalParams
  ): Promise<DatabaseInstancesEnumerateDatabaseInstancesResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, migrateProjectName, options: operationOptions },
      enumerateDatabaseInstancesOperationSpec
    ) as Promise<DatabaseInstancesEnumerateDatabaseInstancesResponse>;
  }

  /**
   * Gets a database instance in the migrate project.
   * @param resourceGroupName Name of the Azure Resource Group that migrate project is part of.
   * @param migrateProjectName Name of the Azure Migrate project.
   * @param databaseInstanceName Unique name of a database instance in Azure migration hub.
   * @param options The options parameters.
   */
  getDatabaseInstance(
    resourceGroupName: string,
    migrateProjectName: string,
    databaseInstanceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DatabaseInstancesGetDatabaseInstanceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        migrateProjectName,
        databaseInstanceName,
        options: operationOptions
      },
      getDatabaseInstanceOperationSpec
    ) as Promise<DatabaseInstancesGetDatabaseInstanceResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const enumerateDatabaseInstancesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/databaseInstances",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DatabaseInstanceCollection
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.continuationToken,
    Parameters.pageSize
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.migrateProjectName
  ],
  headerParameters: [Parameters.acceptLanguage],
  serializer
};
const getDatabaseInstanceOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/databaseInstances/{databaseInstanceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DatabaseInstance
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.migrateProjectName,
    Parameters.databaseInstanceName
  ],
  headerParameters: [Parameters.acceptLanguage],
  serializer
};
