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
  VirtualNetworkGatewayConnection,
  VirtualNetworkGatewayConnectionsCreateOrUpdateResponse,
  VirtualNetworkGatewayConnectionsGetResponse,
  TagsObject,
  VirtualNetworkGatewayConnectionsUpdateTagsResponse,
  ConnectionSharedKey,
  VirtualNetworkGatewayConnectionsSetSharedKeyResponse,
  VirtualNetworkGatewayConnectionsGetSharedKeyResponse,
  VirtualNetworkGatewayConnectionsListResponse,
  ConnectionResetSharedKey,
  VirtualNetworkGatewayConnectionsResetSharedKeyResponse,
  VirtualNetworkGatewayConnectionsStartPacketCaptureOptionalParams,
  VirtualNetworkGatewayConnectionsStartPacketCaptureResponse,
  VpnPacketCaptureStopParameters,
  VirtualNetworkGatewayConnectionsStopPacketCaptureResponse,
  VirtualNetworkGatewayConnectionsListNextResponse
} from "../models";

/**
 * Class representing a VirtualNetworkGatewayConnections.
 */
export class VirtualNetworkGatewayConnections {
  private readonly client: NetworkManagementClient;

  /**
   * Initialize a new instance of the class VirtualNetworkGatewayConnections class.
   * @param client Reference to the service client
   */
  constructor(client: NetworkManagementClient) {
    this.client = client;
  }

  /**
   * Creates or updates a virtual network gateway connection in the specified resource group.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkGatewayConnectionName The name of the virtual network gateway connection.
   * @param parameters Parameters supplied to the create or update virtual network gateway connection
   *                   operation.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: VirtualNetworkGatewayConnection,
    options?: coreHttp.OperationOptions
  ): Promise<
    LROPoller<VirtualNetworkGatewayConnectionsCreateOrUpdateResponse>
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkGatewayConnectionName,
      parameters,
      options: this.getOperationOptions(options, "azure-async-operation")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        VirtualNetworkGatewayConnectionsCreateOrUpdateResponse
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
   * Gets the specified virtual network gateway connection by resource group.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkGatewayConnectionName The name of the virtual network gateway connection.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualNetworkGatewayConnectionsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkGatewayConnectionName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<VirtualNetworkGatewayConnectionsGetResponse>;
  }

  /**
   * Deletes the specified virtual network Gateway connection.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkGatewayConnectionName The name of the virtual network gateway connection.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkGatewayConnectionName,
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
   * Updates a virtual network gateway connection tags.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkGatewayConnectionName The name of the virtual network gateway connection.
   * @param parameters Parameters supplied to update virtual network gateway connection tags.
   * @param options The options parameters.
   */
  async updateTags(
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: TagsObject,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualNetworkGatewayConnectionsUpdateTagsResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkGatewayConnectionName,
      parameters,
      options: this.getOperationOptions(options, "azure-async-operation")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        VirtualNetworkGatewayConnectionsUpdateTagsResponse
      >;
    const initialOperationResult = await sendOperation(
      operationArguments,
      updateTagsOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: updateTagsOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "azure-async-operation"
    });
  }

  /**
   * The Put VirtualNetworkGatewayConnectionSharedKey operation sets the virtual network gateway
   * connection shared key for passed virtual network gateway connection in the specified resource group
   * through Network resource provider.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkGatewayConnectionName The virtual network gateway connection name.
   * @param parameters Parameters supplied to the Begin Set Virtual Network Gateway connection Shared key
   *                   operation throughNetwork resource provider.
   * @param options The options parameters.
   */
  async setSharedKey(
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: ConnectionSharedKey,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualNetworkGatewayConnectionsSetSharedKeyResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkGatewayConnectionName,
      parameters,
      options: this.getOperationOptions(options, "azure-async-operation")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        VirtualNetworkGatewayConnectionsSetSharedKeyResponse
      >;
    const initialOperationResult = await sendOperation(
      operationArguments,
      setSharedKeyOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: setSharedKeyOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "azure-async-operation"
    });
  }

  /**
   * The Get VirtualNetworkGatewayConnectionSharedKey operation retrieves information about the specified
   * virtual network gateway connection shared key through Network resource provider.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkGatewayConnectionName The virtual network gateway connection shared key name.
   * @param options The options parameters.
   */
  getSharedKey(
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualNetworkGatewayConnectionsGetSharedKeyResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkGatewayConnectionName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getSharedKeyOperationSpec
    ) as Promise<VirtualNetworkGatewayConnectionsGetSharedKeyResponse>;
  }

  /**
   * The List VirtualNetworkGatewayConnections operation retrieves all the virtual network gateways
   * connections created.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualNetworkGatewayConnectionsListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<VirtualNetworkGatewayConnectionsListResponse>;
  }

  /**
   * The VirtualNetworkGatewayConnectionResetSharedKey operation resets the virtual network gateway
   * connection shared key for passed virtual network gateway connection in the specified resource group
   * through Network resource provider.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkGatewayConnectionName The virtual network gateway connection reset shared key
   *                                            Name.
   * @param parameters Parameters supplied to the begin reset virtual network gateway connection shared
   *                   key operation through network resource provider.
   * @param options The options parameters.
   */
  async resetSharedKey(
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: ConnectionResetSharedKey,
    options?: coreHttp.OperationOptions
  ): Promise<
    LROPoller<VirtualNetworkGatewayConnectionsResetSharedKeyResponse>
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkGatewayConnectionName,
      parameters,
      options: this.getOperationOptions(options, "location")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        VirtualNetworkGatewayConnectionsResetSharedKeyResponse
      >;
    const initialOperationResult = await sendOperation(
      operationArguments,
      resetSharedKeyOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: resetSharedKeyOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * Starts packet capture on virtual network gateway connection in the specified resource group.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkGatewayConnectionName The name of the virtual network gateway connection.
   * @param options The options parameters.
   */
  async startPacketCapture(
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    options?: VirtualNetworkGatewayConnectionsStartPacketCaptureOptionalParams
  ): Promise<
    LROPoller<VirtualNetworkGatewayConnectionsStartPacketCaptureResponse>
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkGatewayConnectionName,
      options: this.getOperationOptions(options, "location")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        VirtualNetworkGatewayConnectionsStartPacketCaptureResponse
      >;
    const initialOperationResult = await sendOperation(
      operationArguments,
      startPacketCaptureOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: startPacketCaptureOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * Stops packet capture on virtual network gateway connection in the specified resource group.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkGatewayConnectionName The name of the virtual network gateway Connection.
   * @param parameters Virtual network gateway packet capture parameters supplied to stop packet capture
   *                   on gateway connection.
   * @param options The options parameters.
   */
  async stopPacketCapture(
    resourceGroupName: string,
    virtualNetworkGatewayConnectionName: string,
    parameters: VpnPacketCaptureStopParameters,
    options?: coreHttp.OperationOptions
  ): Promise<
    LROPoller<VirtualNetworkGatewayConnectionsStopPacketCaptureResponse>
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkGatewayConnectionName,
      parameters,
      options: this.getOperationOptions(options, "location")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        VirtualNetworkGatewayConnectionsStopPacketCaptureResponse
      >;
    const initialOperationResult = await sendOperation(
      operationArguments,
      stopPacketCaptureOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: stopPacketCaptureOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    resourceGroupName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualNetworkGatewayConnectionsListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<VirtualNetworkGatewayConnectionsListNextResponse>;
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

const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualNetworkGatewayConnection
    },
    201: {
      bodyMapper: Mappers.VirtualNetworkGatewayConnection
    },
    202: {
      bodyMapper: Mappers.VirtualNetworkGatewayConnection
    },
    204: {
      bodyMapper: Mappers.VirtualNetworkGatewayConnection
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters53,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.virtualNetworkGatewayConnectionName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualNetworkGatewayConnection
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
    Parameters.virtualNetworkGatewayConnectionName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}",
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
    Parameters.virtualNetworkGatewayConnectionName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const updateTagsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualNetworkGatewayConnection
    },
    201: {
      bodyMapper: Mappers.VirtualNetworkGatewayConnection
    },
    202: {
      bodyMapper: Mappers.VirtualNetworkGatewayConnection
    },
    204: {
      bodyMapper: Mappers.VirtualNetworkGatewayConnection
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.virtualNetworkGatewayConnectionName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const setSharedKeyOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/sharedkey",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ConnectionSharedKey
    },
    201: {
      bodyMapper: Mappers.ConnectionSharedKey
    },
    202: {
      bodyMapper: Mappers.ConnectionSharedKey
    },
    204: {
      bodyMapper: Mappers.ConnectionSharedKey
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters54,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.virtualNetworkGatewayConnectionName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getSharedKeyOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/sharedkey",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ConnectionSharedKey
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
    Parameters.virtualNetworkGatewayConnectionName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualNetworkGatewayConnectionListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const resetSharedKeyOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/sharedkey/reset",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ConnectionResetSharedKey
    },
    201: {
      bodyMapper: Mappers.ConnectionResetSharedKey
    },
    202: {
      bodyMapper: Mappers.ConnectionResetSharedKey
    },
    204: {
      bodyMapper: Mappers.ConnectionResetSharedKey
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters55,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.virtualNetworkGatewayConnectionName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const startPacketCaptureOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/startPacketCapture",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" } }
    },
    201: {
      bodyMapper: { type: { name: "String" } }
    },
    202: {
      bodyMapper: { type: { name: "String" } }
    },
    204: {
      bodyMapper: { type: { name: "String" } }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.parameters51,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.virtualNetworkGatewayConnectionName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const stopPacketCaptureOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/stopPacketCapture",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" } }
    },
    201: {
      bodyMapper: { type: { name: "String" } }
    },
    202: {
      bodyMapper: { type: { name: "String" } }
    },
    204: {
      bodyMapper: { type: { name: "String" } }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.parameters52,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.virtualNetworkGatewayConnectionName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualNetworkGatewayConnectionListResult
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
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
