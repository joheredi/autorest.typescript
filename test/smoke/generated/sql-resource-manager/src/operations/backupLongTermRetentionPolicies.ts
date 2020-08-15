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
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  LongTermRetentionPolicyName,
  BackupLongTermRetentionPoliciesGetResponse,
  BackupLongTermRetentionPolicy,
  BackupLongTermRetentionPoliciesCreateOrUpdateResponse,
  BackupLongTermRetentionPoliciesListByDatabaseResponse
} from "../models";

/**
 * Class representing a BackupLongTermRetentionPolicies.
 */
export class BackupLongTermRetentionPolicies {
  private readonly client: SqlManagementClient;

  /**
   * Initialize a new instance of the class BackupLongTermRetentionPolicies class.
   * @param client Reference to the service client
   */
  constructor(client: SqlManagementClient) {
    this.client = client;
  }

  /**
   * Gets a database's long term retention policy.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database.
   * @param policyName The policy name. Should always be Default.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    policyName: LongTermRetentionPolicyName,
    options?: coreHttp.OperationOptions
  ): Promise<BackupLongTermRetentionPoliciesGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serverName,
        databaseName,
        policyName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<BackupLongTermRetentionPoliciesGetResponse>;
  }

  /**
   * Sets a database's long term retention policy.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database.
   * @param policyName The policy name. Should always be Default.
   * @param parameters The long term retention policy info.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    policyName: LongTermRetentionPolicyName,
    parameters: BackupLongTermRetentionPolicy,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<BackupLongTermRetentionPoliciesCreateOrUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      databaseName,
      policyName,
      parameters,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        BackupLongTermRetentionPoliciesCreateOrUpdateResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      createOrUpdateOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: createOrUpdateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets a database's long term retention policy.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database.
   * @param options The options parameters.
   */
  listByDatabase(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: coreHttp.OperationOptions
  ): Promise<BackupLongTermRetentionPoliciesListByDatabaseResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serverName,
        databaseName,
        options: operationOptions
      },
      listByDatabaseOperationSpec
    ) as Promise<BackupLongTermRetentionPoliciesListByDatabaseResponse>;
  }

  private getOperationOptions<TOptions extends coreHttp.OperationOptions>(
    options: TOptions | undefined,
    finalStateVia?: string
  ): coreHttp.RequestOptionsBase {
    const operationOptions: coreHttp.OperationOptions = options || {};
    operationOptions.requestOptions = {
      ...operationOptions.requestOptions,
      shouldDeserialize: shouldDeserializeLRO(finalStateVia)
    };
    return coreHttp.operationOptionsToRequestOptionsBase(operationOptions);
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/backupLongTermRetentionPolicies/{policyName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BackupLongTermRetentionPolicy
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.policyName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/backupLongTermRetentionPolicies/{policyName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.BackupLongTermRetentionPolicy
    },
    201: {
      bodyMapper: Mappers.BackupLongTermRetentionPolicy
    },
    202: {
      bodyMapper: Mappers.BackupLongTermRetentionPolicy
    },
    204: {
      bodyMapper: Mappers.BackupLongTermRetentionPolicy
    },
    default: {}
  },
  requestBody: Parameters.parameters39,
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.policyName
  ],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const listByDatabaseOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/backupLongTermRetentionPolicies",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BackupLongTermRetentionPolicy
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
