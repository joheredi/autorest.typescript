/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { NetworkManagementClient } from "../networkManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  VirtualNetworkPeering,
  VirtualNetworkPeeringsGetResponse,
  VirtualNetworkPeeringsCreateOrUpdateResponse,
  VirtualNetworkPeeringsListResponse,
  VirtualNetworkPeeringsListNextResponse
} from "../models";

/**
 * Class representing a VirtualNetworkPeerings.
 */
export class VirtualNetworkPeerings {
  private readonly client: NetworkManagementClient;

  /**
   * Initialize a new instance of the class VirtualNetworkPeerings class.
   * @param client Reference to the service client
   */
  constructor(client: NetworkManagementClient) {
    this.client = client;
  }

  /**
   * Gets all virtual network peerings in a virtual network.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkName The name of the virtual network.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<VirtualNetworkPeering> {
    const iter = this.listPagingAll(
      resourceGroupName,
      virtualNetworkName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(
          resourceGroupName,
          virtualNetworkName,
          options
        );
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualNetworkPeering[]> {
    let result = await this._list(
      resourceGroupName,
      virtualNetworkName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        virtualNetworkName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<VirtualNetworkPeering> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      virtualNetworkName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Deletes the specified virtual network peering.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkName The name of the virtual network.
   * @param virtualNetworkPeeringName The name of the virtual network peering.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    virtualNetworkName: string,
    virtualNetworkPeeringName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkName,
      virtualNetworkPeeringName,
      options: this.getOperationOptions(options, "location")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    };

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
   * Gets the specified virtual network peering.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkName The name of the virtual network.
   * @param virtualNetworkPeeringName The name of the virtual network peering.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    virtualNetworkName: string,
    virtualNetworkPeeringName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualNetworkPeeringsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkName,
      virtualNetworkPeeringName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<VirtualNetworkPeeringsGetResponse>;
  }

  /**
   * Creates or updates a peering in the specified virtual network.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkName The name of the virtual network.
   * @param virtualNetworkPeeringName The name of the peering.
   * @param virtualNetworkPeeringParameters Parameters supplied to the create or update virtual network
   *                                        peering operation.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    virtualNetworkName: string,
    virtualNetworkPeeringName: string,
    virtualNetworkPeeringParameters: VirtualNetworkPeering,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualNetworkPeeringsCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkName,
      virtualNetworkPeeringName,
      virtualNetworkPeeringParameters,
      options: this.getOperationOptions(options, "azure-async-operation")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        VirtualNetworkPeeringsCreateOrUpdateResponse
      >;
    };

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
   * Gets all virtual network peerings in a virtual network.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkName The name of the virtual network.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualNetworkPeeringsListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<VirtualNetworkPeeringsListResponse>;
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkName The name of the virtual network.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    virtualNetworkName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualNetworkPeeringsListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<VirtualNetworkPeeringsListNextResponse>;
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

const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/virtualNetworkPeerings/{virtualNetworkPeeringName}",
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
    Parameters.virtualNetworkName,
    Parameters.virtualNetworkPeeringName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/virtualNetworkPeerings/{virtualNetworkPeeringName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualNetworkPeering
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
    Parameters.virtualNetworkName,
    Parameters.virtualNetworkPeeringName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/virtualNetworkPeerings/{virtualNetworkPeeringName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualNetworkPeering
    },
    201: {
      bodyMapper: Mappers.VirtualNetworkPeering
    },
    202: {
      bodyMapper: Mappers.VirtualNetworkPeering
    },
    204: {
      bodyMapper: Mappers.VirtualNetworkPeering
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.virtualNetworkPeeringParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.virtualNetworkName,
    Parameters.virtualNetworkPeeringName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/virtualNetworkPeerings",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualNetworkPeeringListResult
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
    Parameters.virtualNetworkName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualNetworkPeeringListResult
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
    Parameters.virtualNetworkName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
