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
import { NetworkManagementClient } from "../networkManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  VpnConnectionsGetResponse,
  VpnConnection,
  VpnConnectionsCreateOrUpdateResponse,
  VpnConnectionsListByVpnGatewayResponse,
  VpnConnectionsListByVpnGatewayNextResponse
} from "../models";

/**
 * Class representing a VpnConnections.
 */
export class VpnConnections {
  private readonly client: NetworkManagementClient;

  /**
   * Initialize a new instance of the class VpnConnections class.
   * @param client Reference to the service client
   */
  constructor(client: NetworkManagementClient) {
    this.client = client;
  }

  /**
   * Retrieves the details of a vpn connection.
   * @param resourceGroupName The resource group name of the VpnGateway.
   * @param gatewayName The name of the gateway.
   * @param connectionName The name of the vpn connection.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VpnConnectionsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      gatewayName,
      connectionName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<VpnConnectionsGetResponse>;
  }

  /**
   * Creates a vpn connection to a scalable vpn gateway if it doesn't exist else updates the existing
   * connection.
   * @param resourceGroupName The resource group name of the VpnGateway.
   * @param gatewayName The name of the gateway.
   * @param connectionName The name of the connection.
   * @param vpnConnectionParameters Parameters supplied to create or Update a VPN Connection.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    vpnConnectionParameters: VpnConnection,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VpnConnectionsCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      gatewayName,
      connectionName,
      vpnConnectionParameters,
      options: this.getOperationOptions(options, "azure-async-operation")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        VpnConnectionsCreateOrUpdateResponse
      >;
    const initialOperationResult = await sendOperation(
      operationArguments,
      createOrUpdateOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createOrUpdateOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "azure-async-operation"
    });
  }

  /**
   * Deletes a vpn connection.
   * @param resourceGroupName The resource group name of the VpnGateway.
   * @param gatewayName The name of the gateway.
   * @param connectionName The name of the connection.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    gatewayName: string,
    connectionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      gatewayName,
      connectionName,
      options: this.getOperationOptions(options, "location")
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
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * Retrieves all vpn connections for a particular virtual wan vpn gateway.
   * @param resourceGroupName The resource group name of the VpnGateway.
   * @param gatewayName The name of the gateway.
   * @param options The options parameters.
   */
  listByVpnGateway(
    resourceGroupName: string,
    gatewayName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VpnConnectionsListByVpnGatewayResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      gatewayName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByVpnGatewayOperationSpec
    ) as Promise<VpnConnectionsListByVpnGatewayResponse>;
  }

  /**
   * ListByVpnGatewayNext
   * @param resourceGroupName The resource group name of the VpnGateway.
   * @param gatewayName The name of the gateway.
   * @param nextLink The nextLink from the previous successful call to the ListByVpnGateway method.
   * @param options The options parameters.
   */
  listByVpnGatewayNext(
    resourceGroupName: string,
    gatewayName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<VpnConnectionsListByVpnGatewayNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      gatewayName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByVpnGatewayNextOperationSpec
    ) as Promise<VpnConnectionsListByVpnGatewayNextResponse>;
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VpnConnection
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.connectionName,
    Parameters.gatewayName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.VpnConnection
    },
    201: {
      bodyMapper: Mappers.VpnConnection
    },
    202: {
      bodyMapper: Mappers.VpnConnection
    },
    204: {
      bodyMapper: Mappers.VpnConnection
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.vpnConnectionParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.connectionName,
    Parameters.gatewayName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections/{connectionName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.connectionName,
    Parameters.gatewayName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByVpnGatewayOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnGateways/{gatewayName}/vpnConnections",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ListVpnConnectionsResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.gatewayName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByVpnGatewayNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ListVpnConnectionsResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.gatewayName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
