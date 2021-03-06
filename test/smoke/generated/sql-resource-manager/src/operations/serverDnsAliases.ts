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
  ServerDnsAliasesGetResponse,
  ServerDnsAliasesCreateOrUpdateResponse,
  ServerDnsAliasesListByServerResponse,
  ServerDnsAliasAcquisition,
  ServerDnsAliasesListByServerNextResponse
} from "../models";

/**
 * Class representing a ServerDnsAliases.
 */
export class ServerDnsAliases {
  private readonly client: SqlManagementClient;

  /**
   * Initialize a new instance of the class ServerDnsAliases class.
   * @param client Reference to the service client
   */
  constructor(client: SqlManagementClient) {
    this.client = client;
  }

  /**
   * Gets a server DNS alias.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server that the alias is pointing to.
   * @param dnsAliasName The name of the server DNS alias.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serverName: string,
    dnsAliasName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ServerDnsAliasesGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      dnsAliasName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<ServerDnsAliasesGetResponse>;
  }

  /**
   * Creates a server dns alias.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server that the alias is pointing to.
   * @param dnsAliasName The name of the server DNS alias.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    serverName: string,
    dnsAliasName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<ServerDnsAliasesCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      dnsAliasName,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        ServerDnsAliasesCreateOrUpdateResponse
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
   * Deletes the server DNS alias with the given name.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server that the alias is pointing to.
   * @param dnsAliasName The name of the server DNS alias.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    serverName: string,
    dnsAliasName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      dnsAliasName,
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
   * Gets a list of server DNS aliases for a server.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server that the alias is pointing to.
   * @param options The options parameters.
   */
  listByServer(
    resourceGroupName: string,
    serverName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ServerDnsAliasesListByServerResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByServerOperationSpec
    ) as Promise<ServerDnsAliasesListByServerResponse>;
  }

  /**
   * Acquires server DNS alias from another server.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server that the alias is pointing to.
   * @param dnsAliasName The name of the server dns alias.
   * @param parameters A server DNS alias acquisition request.
   * @param options The options parameters.
   */
  async acquire(
    resourceGroupName: string,
    serverName: string,
    dnsAliasName: string,
    parameters: ServerDnsAliasAcquisition,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      dnsAliasName,
      parameters,
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
      acquireOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: acquireOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * ListByServerNext
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server that the alias is pointing to.
   * @param nextLink The nextLink from the previous successful call to the ListByServer method.
   * @param options The options parameters.
   */
  listByServerNext(
    resourceGroupName: string,
    serverName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<ServerDnsAliasesListByServerNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByServerNextOperationSpec
    ) as Promise<ServerDnsAliasesListByServerNextResponse>;
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/dnsAliases/{dnsAliasName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ServerDnsAlias
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.dnsAliasName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/dnsAliases/{dnsAliasName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ServerDnsAlias
    },
    201: {
      bodyMapper: Mappers.ServerDnsAlias
    },
    202: {
      bodyMapper: Mappers.ServerDnsAlias
    },
    204: {
      bodyMapper: Mappers.ServerDnsAlias
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.dnsAliasName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/dnsAliases/{dnsAliasName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {}, default: {} },
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.dnsAliasName
  ],
  serializer
};
const listByServerOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/dnsAliases",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ServerDnsAliasListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const acquireOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/dnsAliases/{dnsAliasName}/acquire",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {}, default: {} },
  requestBody: Parameters.parameters42,
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.dnsAliasName
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const listByServerNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ServerDnsAliasListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion4],
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
