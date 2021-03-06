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
  SyncAgentsGetResponse,
  SyncAgent,
  SyncAgentsCreateOrUpdateResponse,
  SyncAgentsListByServerResponse,
  SyncAgentsGenerateKeyResponse,
  SyncAgentsListLinkedDatabasesResponse,
  SyncAgentsListByServerNextResponse,
  SyncAgentsListLinkedDatabasesNextResponse
} from "../models";

/**
 * Class representing a SyncAgents.
 */
export class SyncAgents {
  private readonly client: SqlManagementClient;

  /**
   * Initialize a new instance of the class SyncAgents class.
   * @param client Reference to the service client
   */
  constructor(client: SqlManagementClient) {
    this.client = client;
  }

  /**
   * Gets a sync agent.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server on which the sync agent is hosted.
   * @param syncAgentName The name of the sync agent.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serverName: string,
    syncAgentName: string,
    options?: coreHttp.OperationOptions
  ): Promise<SyncAgentsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      syncAgentName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<SyncAgentsGetResponse>;
  }

  /**
   * Creates or updates a sync agent.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server on which the sync agent is hosted.
   * @param syncAgentName The name of the sync agent.
   * @param parameters The requested sync agent resource state.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    serverName: string,
    syncAgentName: string,
    parameters: SyncAgent,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<SyncAgentsCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      syncAgentName,
      parameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        SyncAgentsCreateOrUpdateResponse
      >;
    const initialOperationResult = await sendOperation(
      operationArguments,
      createOrUpdateOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createOrUpdateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Deletes a sync agent.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server on which the sync agent is hosted.
   * @param syncAgentName The name of the sync agent.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    serverName: string,
    syncAgentName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      syncAgentName,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    const initialOperationResult = await sendOperation(
      operationArguments,
      deleteOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Lists sync agents in a server.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server on which the sync agent is hosted.
   * @param options The options parameters.
   */
  listByServer(
    resourceGroupName: string,
    serverName: string,
    options?: coreHttp.OperationOptions
  ): Promise<SyncAgentsListByServerResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByServerOperationSpec
    ) as Promise<SyncAgentsListByServerResponse>;
  }

  /**
   * Generates a sync agent key.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server on which the sync agent is hosted.
   * @param syncAgentName The name of the sync agent.
   * @param options The options parameters.
   */
  generateKey(
    resourceGroupName: string,
    serverName: string,
    syncAgentName: string,
    options?: coreHttp.OperationOptions
  ): Promise<SyncAgentsGenerateKeyResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      syncAgentName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      generateKeyOperationSpec
    ) as Promise<SyncAgentsGenerateKeyResponse>;
  }

  /**
   * Lists databases linked to a sync agent.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server on which the sync agent is hosted.
   * @param syncAgentName The name of the sync agent.
   * @param options The options parameters.
   */
  listLinkedDatabases(
    resourceGroupName: string,
    serverName: string,
    syncAgentName: string,
    options?: coreHttp.OperationOptions
  ): Promise<SyncAgentsListLinkedDatabasesResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      syncAgentName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listLinkedDatabasesOperationSpec
    ) as Promise<SyncAgentsListLinkedDatabasesResponse>;
  }

  /**
   * ListByServerNext
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server on which the sync agent is hosted.
   * @param nextLink The nextLink from the previous successful call to the ListByServer method.
   * @param options The options parameters.
   */
  listByServerNext(
    resourceGroupName: string,
    serverName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<SyncAgentsListByServerNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByServerNextOperationSpec
    ) as Promise<SyncAgentsListByServerNextResponse>;
  }

  /**
   * ListLinkedDatabasesNext
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server on which the sync agent is hosted.
   * @param syncAgentName The name of the sync agent.
   * @param nextLink The nextLink from the previous successful call to the ListLinkedDatabases method.
   * @param options The options parameters.
   */
  listLinkedDatabasesNext(
    resourceGroupName: string,
    serverName: string,
    syncAgentName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<SyncAgentsListLinkedDatabasesNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      syncAgentName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listLinkedDatabasesNextOperationSpec
    ) as Promise<SyncAgentsListLinkedDatabasesNextResponse>;
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents/{syncAgentName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SyncAgent
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.syncAgentName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents/{syncAgentName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.SyncAgent
    },
    201: {
      bodyMapper: Mappers.SyncAgent
    },
    202: {
      bodyMapper: Mappers.SyncAgent
    },
    204: {
      bodyMapper: Mappers.SyncAgent
    },
    default: {}
  },
  requestBody: Parameters.parameters22,
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.syncAgentName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents/{syncAgentName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {}, default: {} },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.syncAgentName
  ],
  serializer
};
const listByServerOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SyncAgentListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const generateKeyOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents/{syncAgentName}/generateKey",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SyncAgentKeyProperties
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.syncAgentName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listLinkedDatabasesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/syncAgents/{syncAgentName}/linkedDatabases",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SyncAgentLinkedDatabaseListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.syncAgentName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByServerNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SyncAgentListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listLinkedDatabasesNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SyncAgentLinkedDatabaseListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.nextLink,
    Parameters.syncAgentName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
