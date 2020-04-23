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
  ReplicationRecoveryServicesProvidersListByReplicationFabricsResponse,
  ReplicationRecoveryServicesProvidersGetResponse,
  AddRecoveryServicesProviderInput,
  ReplicationRecoveryServicesProvidersCreateResponse,
  ReplicationRecoveryServicesProvidersRefreshProviderResponse,
  ReplicationRecoveryServicesProvidersListResponse,
  ReplicationRecoveryServicesProvidersListByReplicationFabricsNextResponse,
  ReplicationRecoveryServicesProvidersListNextResponse
} from "../models";

/**
 * Class representing a ReplicationRecoveryServicesProviders.
 */
export class ReplicationRecoveryServicesProviders {
  private readonly client: SiteRecoveryManagementClient;

  /**
   * Initialize a new instance of the class ReplicationRecoveryServicesProviders class.
   * @param client Reference to the service client
   */
  constructor(client: SiteRecoveryManagementClient) {
    this.client = client;
  }

  /**
   * Lists the registered recovery services providers for the specified fabric.
   * @param fabricName Fabric name
   * @param options The options parameters.
   */
  listByReplicationFabrics(
    fabricName: string,
    options?: coreHttp.OperationOptions
  ): Promise<
    ReplicationRecoveryServicesProvidersListByReplicationFabricsResponse
  > {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { fabricName, options: operationOptions },
      listByReplicationFabricsOperationSpec
    ) as Promise<
      ReplicationRecoveryServicesProvidersListByReplicationFabricsResponse
    >;
  }

  /**
   * Gets the details of registered recovery services provider.
   * @param fabricName Fabric name.
   * @param providerName Recovery services provider name
   * @param options The options parameters.
   */
  get(
    fabricName: string,
    providerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ReplicationRecoveryServicesProvidersGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { fabricName, providerName, options: operationOptions },
      getOperationSpec
    ) as Promise<ReplicationRecoveryServicesProvidersGetResponse>;
  }

  /**
   * The operation to add a recovery services provider.
   * @param fabricName Fabric name.
   * @param addProviderInput Add provider input.
   * @param providerName Recovery services provider name.
   * @param options The options parameters.
   */
  async create(
    fabricName: string,
    addProviderInput: AddRecoveryServicesProviderInput,
    providerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<ReplicationRecoveryServicesProvidersCreateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      fabricName,
      addProviderInput,
      providerName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        ReplicationRecoveryServicesProvidersCreateResponse
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
   * The operation to purge(force delete) a recovery services provider from the vault.
   * @param fabricName Fabric name.
   * @param providerName Recovery services provider name.
   * @param options The options parameters.
   */
  async purge(
    fabricName: string,
    providerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      fabricName,
      providerName,
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
      purgeOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: purgeOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * The operation to refresh the information from the recovery services provider.
   * @param fabricName Fabric name.
   * @param providerName Recovery services provider name.
   * @param options The options parameters.
   */
  async refreshProvider(
    fabricName: string,
    providerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<
    LROPoller<ReplicationRecoveryServicesProvidersRefreshProviderResponse>
  > {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      fabricName,
      providerName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        ReplicationRecoveryServicesProvidersRefreshProviderResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      refreshProviderOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: refreshProviderOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * The operation to removes/delete(unregister) a recovery services provider from the vault
   * @param fabricName Fabric name.
   * @param providerName Recovery services provider name.
   * @param options The options parameters.
   */
  async delete(
    fabricName: string,
    providerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      fabricName,
      providerName,
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
   * Lists the registered recovery services providers in the vault
   * @param options The options parameters.
   */
  list(
    options?: coreHttp.OperationOptions
  ): Promise<ReplicationRecoveryServicesProvidersListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listOperationSpec
    ) as Promise<ReplicationRecoveryServicesProvidersListResponse>;
  }

  /**
   * ListByReplicationFabricsNext
   * @param nextLink The nextLink from the previous successful call to the ListByReplicationFabrics
   *                 method.
   * @param fabricName Fabric name
   * @param options The options parameters.
   */
  listByReplicationFabricsNext(
    nextLink: string,
    fabricName: string,
    options?: coreHttp.OperationOptions
  ): Promise<
    ReplicationRecoveryServicesProvidersListByReplicationFabricsNextResponse
  > {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, fabricName, options: operationOptions },
      listByReplicationFabricsNextOperationSpec
    ) as Promise<
      ReplicationRecoveryServicesProvidersListByReplicationFabricsNextResponse
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
  ): Promise<ReplicationRecoveryServicesProvidersListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<ReplicationRecoveryServicesProvidersListNextResponse>;
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

const listByReplicationFabricsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationRecoveryServicesProviders",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RecoveryServicesProviderCollection
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.fabricName8
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationRecoveryServicesProviders/{providerName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RecoveryServicesProvider
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.fabricName,
    Parameters.providerName
  ],
  serializer
};
const createOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationRecoveryServicesProviders/{providerName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.RecoveryServicesProvider
    },
    201: {
      bodyMapper: Mappers.RecoveryServicesProvider
    },
    202: {
      bodyMapper: Mappers.RecoveryServicesProvider
    },
    204: {
      bodyMapper: Mappers.RecoveryServicesProvider
    }
  },
  requestBody: Parameters.addProviderInput,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.fabricName,
    Parameters.providerName1
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const purgeOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationRecoveryServicesProviders/{providerName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.fabricName,
    Parameters.providerName1
  ],
  serializer
};
const refreshProviderOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationRecoveryServicesProviders/{providerName}/refreshProvider",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.RecoveryServicesProvider
    },
    201: {
      bodyMapper: Mappers.RecoveryServicesProvider
    },
    202: {
      bodyMapper: Mappers.RecoveryServicesProvider
    },
    204: {
      bodyMapper: Mappers.RecoveryServicesProvider
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.fabricName,
    Parameters.providerName1
  ],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationRecoveryServicesProviders/{providerName}/remove",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.fabricName,
    Parameters.providerName1
  ],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryServicesProviders",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RecoveryServicesProviderCollection
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
const listByReplicationFabricsNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RecoveryServicesProviderCollection
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.nextLink1,
    Parameters.fabricName8
  ],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RecoveryServicesProviderCollection
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
