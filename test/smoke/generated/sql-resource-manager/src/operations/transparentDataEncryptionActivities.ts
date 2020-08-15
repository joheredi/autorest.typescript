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
import { SqlManagementClient } from "../sqlManagementClient";
import {
  TransparentDataEncryptionName,
  TransparentDataEncryptionActivitiesListByConfigurationResponse
} from "../models";

/**
 * Class representing a TransparentDataEncryptionActivities.
 */
export class TransparentDataEncryptionActivities {
  private readonly client: SqlManagementClient;

  /**
   * Initialize a new instance of the class TransparentDataEncryptionActivities class.
   * @param client Reference to the service client
   */
  constructor(client: SqlManagementClient) {
    this.client = client;
  }

  /**
   * Returns a database's transparent data encryption operation result.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database for which the transparent data encryption applies.
   * @param transparentDataEncryptionName The name of the transparent data encryption configuration.
   * @param options The options parameters.
   */
  listByConfiguration(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    transparentDataEncryptionName: TransparentDataEncryptionName,
    options?: coreHttp.OperationOptions
  ): Promise<TransparentDataEncryptionActivitiesListByConfigurationResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serverName,
        databaseName,
        transparentDataEncryptionName,
        options: operationOptions
      },
      listByConfigurationOperationSpec
    ) as Promise<
      TransparentDataEncryptionActivitiesListByConfigurationResponse
    >;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listByConfigurationOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/transparentDataEncryption/{transparentDataEncryptionName}/operationResults",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TransparentDataEncryptionActivityListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.transparentDataEncryptionName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
