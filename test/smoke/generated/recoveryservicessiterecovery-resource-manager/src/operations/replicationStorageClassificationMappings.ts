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
  ReplicationStorageClassificationMappingsListByReplicationStorageClassificationsResponse,
  ReplicationStorageClassificationMappingsGetResponse,
  StorageClassificationMappingInput,
  ReplicationStorageClassificationMappingsCreateResponse,
  ReplicationStorageClassificationMappingsListResponse,
  ReplicationStorageClassificationMappingsListByReplicationStorageClassificationsNextResponse,
  ReplicationStorageClassificationMappingsListNextResponse
} from "../models";

/**
 * Class representing a ReplicationStorageClassificationMappings.
 */
export class ReplicationStorageClassificationMappings {
  private readonly client: SiteRecoveryManagementClient;

  /**
   * Initialize a new instance of the class ReplicationStorageClassificationMappings class.
   * @param client Reference to the service client
   */
  constructor(client: SiteRecoveryManagementClient) {
    this.client = client;
  }

  /**
   * Lists the storage classification mappings for the fabric.
   * @param fabricName Fabric name.
   * @param storageClassificationName Storage classification name.
   * @param options The options parameters.
   */
  listByReplicationStorageClassifications(
    fabricName: string,
    storageClassificationName: string,
    options?: coreHttp.OperationOptions
  ): Promise<
    ReplicationStorageClassificationMappingsListByReplicationStorageClassificationsResponse
  > {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { fabricName, storageClassificationName, options: operationOptions },
      listByReplicationStorageClassificationsOperationSpec
    ) as Promise<
      ReplicationStorageClassificationMappingsListByReplicationStorageClassificationsResponse
    >;
  }

  /**
   * Gets the details of the specified storage classification mapping.
   * @param fabricName Fabric name.
   * @param storageClassificationName Storage classification name.
   * @param storageClassificationMappingName Storage classification mapping name.
   * @param options The options parameters.
   */
  get(
    fabricName: string,
    storageClassificationName: string,
    storageClassificationMappingName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ReplicationStorageClassificationMappingsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        fabricName,
        storageClassificationName,
        storageClassificationMappingName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<ReplicationStorageClassificationMappingsGetResponse>;
  }

  /**
   * The operation to create a storage classification mapping.
   * @param fabricName Fabric name.
   * @param storageClassificationName Storage classification name.
   * @param storageClassificationMappingName Storage classification mapping name.
   * @param pairingInput Pairing input.
   * @param options The options parameters.
   */
  async create(
    fabricName: string,
    storageClassificationName: string,
    storageClassificationMappingName: string,
    pairingInput: StorageClassificationMappingInput,
    options?: coreHttp.OperationOptions
  ): Promise<
    LROPoller<ReplicationStorageClassificationMappingsCreateResponse>
  > {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      fabricName,
      storageClassificationName,
      storageClassificationMappingName,
      pairingInput,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        ReplicationStorageClassificationMappingsCreateResponse
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
   * The operation to delete a storage classification mapping.
   * @param fabricName Fabric name.
   * @param storageClassificationName Storage classification name.
   * @param storageClassificationMappingName Storage classification mapping name.
   * @param options The options parameters.
   */
  async delete(
    fabricName: string,
    storageClassificationName: string,
    storageClassificationMappingName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      fabricName,
      storageClassificationName,
      storageClassificationMappingName,
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
   * Lists the storage classification mappings in the vault.
   * @param options The options parameters.
   */
  list(
    options?: coreHttp.OperationOptions
  ): Promise<ReplicationStorageClassificationMappingsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listOperationSpec
    ) as Promise<ReplicationStorageClassificationMappingsListResponse>;
  }

  /**
   * ListByReplicationStorageClassificationsNext
   * @param fabricName Fabric name.
   * @param storageClassificationName Storage classification name.
   * @param nextLink The nextLink from the previous successful call to the
   *                 ListByReplicationStorageClassifications method.
   * @param options The options parameters.
   */
  listByReplicationStorageClassificationsNext(
    fabricName: string,
    storageClassificationName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<
    ReplicationStorageClassificationMappingsListByReplicationStorageClassificationsNextResponse
  > {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        fabricName,
        storageClassificationName,
        nextLink,
        options: operationOptions
      },
      listByReplicationStorageClassificationsNextOperationSpec
    ) as Promise<
      ReplicationStorageClassificationMappingsListByReplicationStorageClassificationsNextResponse
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
  ): Promise<ReplicationStorageClassificationMappingsListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<ReplicationStorageClassificationMappingsListNextResponse>;
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

const listByReplicationStorageClassificationsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationStorageClassifications/{storageClassificationName}/replicationStorageClassificationMappings",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageClassificationMappingCollection
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.fabricName,
    Parameters.storageClassificationName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationStorageClassifications/{storageClassificationName}/replicationStorageClassificationMappings/{storageClassificationMappingName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageClassificationMapping
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.fabricName,
    Parameters.storageClassificationName,
    Parameters.storageClassificationMappingName
  ],
  serializer
};
const createOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationStorageClassifications/{storageClassificationName}/replicationStorageClassificationMappings/{storageClassificationMappingName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.StorageClassificationMapping
    },
    201: {
      bodyMapper: Mappers.StorageClassificationMapping
    },
    202: {
      bodyMapper: Mappers.StorageClassificationMapping
    },
    204: {
      bodyMapper: Mappers.StorageClassificationMapping
    }
  },
  requestBody: Parameters.pairingInput,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.fabricName,
    Parameters.storageClassificationName,
    Parameters.storageClassificationMappingName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationStorageClassifications/{storageClassificationName}/replicationStorageClassificationMappings/{storageClassificationMappingName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.fabricName,
    Parameters.storageClassificationName,
    Parameters.storageClassificationMappingName
  ],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationStorageClassificationMappings",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageClassificationMappingCollection
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
const listByReplicationStorageClassificationsNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageClassificationMappingCollection
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.fabricName,
    Parameters.storageClassificationName,
    Parameters.nextLink6
  ],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageClassificationMappingCollection
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
