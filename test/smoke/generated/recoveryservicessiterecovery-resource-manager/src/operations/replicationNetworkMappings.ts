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
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  ReplicationNetworkMappingsListByReplicationNetworksResponse,
  ReplicationNetworkMappingsGetResponse,
  CreateNetworkMappingInput,
  ReplicationNetworkMappingsCreateResponse,
  UpdateNetworkMappingInput,
  ReplicationNetworkMappingsUpdateResponse,
  ReplicationNetworkMappingsListResponse,
  ReplicationNetworkMappingsListByReplicationNetworksNextResponse,
  ReplicationNetworkMappingsListNextResponse
} from "../models";

/**
 * Class representing a ReplicationNetworkMappings.
 */
export class ReplicationNetworkMappings {
  private readonly client: SiteRecoveryManagementClient;

  /**
   * Initialize a new instance of the class ReplicationNetworkMappings class.
   * @param client Reference to the service client
   */
  constructor(client: SiteRecoveryManagementClient) {
    this.client = client;
  }

  /**
   * Lists all ASR network mappings for the specified network.
   * @param networkName Primary network name.
   * @param fabricName Primary fabric name.
   * @param options The options parameters.
   */
  listByReplicationNetworks(
    networkName: string,
    fabricName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ReplicationNetworkMappingsListByReplicationNetworksResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { networkName, fabricName, options: operationOptions },
      listByReplicationNetworksOperationSpec
    ) as Promise<ReplicationNetworkMappingsListByReplicationNetworksResponse>;
  }

  /**
   * Gets the details of an ASR network mapping
   * @param networkName Primary network name.
   * @param fabricName Primary fabric name.
   * @param networkMappingName Network mapping name.
   * @param options The options parameters.
   */
  get(
    networkName: string,
    fabricName: string,
    networkMappingName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ReplicationNetworkMappingsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        networkName,
        fabricName,
        networkMappingName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<ReplicationNetworkMappingsGetResponse>;
  }

  /**
   * The operation to create an ASR network mapping.
   * @param networkName Primary network name.
   * @param fabricName Primary fabric name.
   * @param networkMappingName Network mapping name.
   * @param input Create network mapping input.
   * @param options The options parameters.
   */
  async create(
    networkName: string,
    fabricName: string,
    networkMappingName: string,
    input: CreateNetworkMappingInput,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<ReplicationNetworkMappingsCreateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      networkName,
      fabricName,
      networkMappingName,
      input,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        ReplicationNetworkMappingsCreateResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      createOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: createOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * The operation to delete a network mapping.
   * @param networkName Primary network name.
   * @param fabricName Primary fabric name.
   * @param networkMappingName ARM Resource Name for network mapping.
   * @param options The options parameters.
   */
  async delete(
    networkName: string,
    fabricName: string,
    networkMappingName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      networkName,
      fabricName,
      networkMappingName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      deleteOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: deleteOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * The operation to update an ASR network mapping.
   * @param networkName Primary network name.
   * @param fabricName Primary fabric name.
   * @param networkMappingName Network mapping name.
   * @param input Update network mapping input.
   * @param options The options parameters.
   */
  async update(
    networkName: string,
    fabricName: string,
    networkMappingName: string,
    input: UpdateNetworkMappingInput,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<ReplicationNetworkMappingsUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      networkName,
      fabricName,
      networkMappingName,
      input,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        ReplicationNetworkMappingsUpdateResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      updateOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: updateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Lists all ASR network mappings in the vault.
   * @param options The options parameters.
   */
  list(
    options?: coreHttp.OperationOptions
  ): Promise<ReplicationNetworkMappingsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listOperationSpec
    ) as Promise<ReplicationNetworkMappingsListResponse>;
  }

  /**
   * ListByReplicationNetworksNext
   * @param networkName Primary network name.
   * @param fabricName Primary fabric name.
   * @param nextLink The nextLink from the previous successful call to the ListByReplicationNetworks
   *                 method.
   * @param options The options parameters.
   */
  listByReplicationNetworksNext(
    networkName: string,
    fabricName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<ReplicationNetworkMappingsListByReplicationNetworksNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { networkName, fabricName, nextLink, options: operationOptions },
      listByReplicationNetworksNextOperationSpec
    ) as Promise<
      ReplicationNetworkMappingsListByReplicationNetworksNextResponse
    >;
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<ReplicationNetworkMappingsListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<ReplicationNetworkMappingsListNextResponse>;
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

const listByReplicationNetworksOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationNetworks/{networkName}/replicationNetworkMappings",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NetworkMappingCollection
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.networkName,
    Parameters.fabricName9
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationNetworks/{networkName}/replicationNetworkMappings/{networkMappingName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NetworkMapping
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.networkName,
    Parameters.fabricName9,
    Parameters.networkMappingName
  ],
  serializer
};
const createOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationNetworks/{networkName}/replicationNetworkMappings/{networkMappingName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.NetworkMapping
    },
    201: {
      bodyMapper: Mappers.NetworkMapping
    },
    202: {
      bodyMapper: Mappers.NetworkMapping
    },
    204: {
      bodyMapper: Mappers.NetworkMapping
    }
  },
  requestBody: Parameters.input1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.networkName,
    Parameters.fabricName9,
    Parameters.networkMappingName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationNetworks/{networkName}/replicationNetworkMappings/{networkMappingName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.networkName,
    Parameters.fabricName9,
    Parameters.networkMappingName1
  ],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationNetworks/{networkName}/replicationNetworkMappings/{networkMappingName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.NetworkMapping
    },
    201: {
      bodyMapper: Mappers.NetworkMapping
    },
    202: {
      bodyMapper: Mappers.NetworkMapping
    },
    204: {
      bodyMapper: Mappers.NetworkMapping
    }
  },
  requestBody: Parameters.input2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.networkName,
    Parameters.fabricName9,
    Parameters.networkMappingName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationNetworkMappings",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NetworkMappingCollection
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName
  ],
  serializer
};
const listByReplicationNetworksNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NetworkMappingCollection
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.networkName,
    Parameters.fabricName9,
    Parameters.nextLink2
  ],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NetworkMappingCollection
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.resourceName
  ],
  serializer
};
