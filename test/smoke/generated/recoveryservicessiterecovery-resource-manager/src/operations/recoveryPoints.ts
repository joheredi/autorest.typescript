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
import { SiteRecoveryManagementClient } from "../siteRecoveryManagementClient";
import {
  RecoveryPointsListByReplicationProtectedItemsResponse,
  RecoveryPointsGetResponse,
  RecoveryPointsListByReplicationProtectedItemsNextResponse
} from "../models";

/**
 * Class representing a RecoveryPoints.
 */
export class RecoveryPoints {
  private readonly client: SiteRecoveryManagementClient;

  /**
   * Initialize a new instance of the class RecoveryPoints class.
   * @param client Reference to the service client
   */
  constructor(client: SiteRecoveryManagementClient) {
    this.client = client;
  }

  /**
   * Lists the available recovery points for a replication protected item.
   * @param protectionContainerName The protection container name.
   * @param fabricName The fabric name.
   * @param replicatedProtectedItemName The replication protected item's name.
   * @param options The options parameters.
   */
  listByReplicationProtectedItems(
    protectionContainerName: string,
    fabricName: string,
    replicatedProtectedItemName: string,
    options?: coreHttp.OperationOptions
  ): Promise<RecoveryPointsListByReplicationProtectedItemsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        protectionContainerName,
        fabricName,
        replicatedProtectedItemName,
        options: operationOptions
      },
      listByReplicationProtectedItemsOperationSpec
    ) as Promise<RecoveryPointsListByReplicationProtectedItemsResponse>;
  }

  /**
   * Get the details of specified recovery point.
   * @param protectionContainerName The protection container name.
   * @param fabricName The fabric name.
   * @param replicatedProtectedItemName The replication protected item's name.
   * @param recoveryPointName The recovery point name.
   * @param options The options parameters.
   */
  get(
    protectionContainerName: string,
    fabricName: string,
    replicatedProtectedItemName: string,
    recoveryPointName: string,
    options?: coreHttp.OperationOptions
  ): Promise<RecoveryPointsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        protectionContainerName,
        fabricName,
        replicatedProtectedItemName,
        recoveryPointName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<RecoveryPointsGetResponse>;
  }

  /**
   * ListByReplicationProtectedItemsNext
   * @param protectionContainerName The protection container name.
   * @param fabricName The fabric name.
   * @param replicatedProtectedItemName The replication protected item's name.
   * @param nextLink The nextLink from the previous successful call to the
   *                 ListByReplicationProtectedItems method.
   * @param options The options parameters.
   */
  listByReplicationProtectedItemsNext(
    protectionContainerName: string,
    fabricName: string,
    replicatedProtectedItemName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<RecoveryPointsListByReplicationProtectedItemsNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        protectionContainerName,
        fabricName,
        replicatedProtectedItemName,
        nextLink,
        options: operationOptions
      },
      listByReplicationProtectedItemsNextOperationSpec
    ) as Promise<RecoveryPointsListByReplicationProtectedItemsNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listByReplicationProtectedItemsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/recoveryPoints",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RecoveryPointCollection
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.protectionContainerName3,
    Parameters.fabricName17,
    Parameters.replicatedProtectedItemName4
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/recoveryPoints/{recoveryPointName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RecoveryPoint
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.protectionContainerName3,
    Parameters.fabricName17,
    Parameters.replicatedProtectedItemName4,
    Parameters.recoveryPointName
  ],
  serializer
};
const listByReplicationProtectedItemsNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RecoveryPointCollection
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.protectionContainerName3,
    Parameters.fabricName17,
    Parameters.replicatedProtectedItemName4,
    Parameters.nextLink5
  ],
  serializer
};
