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
import { ComputeManagementClient } from "../computeManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  Snapshot,
  SnapshotsCreateOrUpdateResponse,
  SnapshotUpdate,
  SnapshotsUpdateResponse,
  SnapshotsGetResponse,
  SnapshotsListByResourceGroupResponse,
  SnapshotsListResponse,
  GrantAccessData,
  SnapshotsGrantAccessResponse,
  SnapshotsListByResourceGroupNextResponse,
  SnapshotsListNextResponse
} from "../models";

/**
 * Class representing a Snapshots.
 */
export class Snapshots {
  private readonly client: ComputeManagementClient;

  /**
   * Initialize a new instance of the class Snapshots class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClient) {
    this.client = client;
  }

  /**
   * Creates or updates a snapshot.
   * @param resourceGroupName The name of the resource group.
   * @param snapshotName The name of the snapshot that is being created. The name can't be changed after
   *                     the snapshot is created. Supported characters for the name are a-z, A-Z, 0-9 and _. The max name
   *                     length is 80 characters.
   * @param snapshot Snapshot object supplied in the body of the Put disk operation.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    snapshotName: string,
    snapshot: Snapshot,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<SnapshotsCreateOrUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      snapshotName,
      snapshot,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        SnapshotsCreateOrUpdateResponse
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
   * Updates (patches) a snapshot.
   * @param resourceGroupName The name of the resource group.
   * @param snapshotName The name of the snapshot that is being created. The name can't be changed after
   *                     the snapshot is created. Supported characters for the name are a-z, A-Z, 0-9 and _. The max name
   *                     length is 80 characters.
   * @param snapshot Snapshot object supplied in the body of the Patch snapshot operation.
   * @param options The options parameters.
   */
  async update(
    resourceGroupName: string,
    snapshotName: string,
    snapshot: SnapshotUpdate,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<SnapshotsUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      snapshotName,
      snapshot,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        SnapshotsUpdateResponse
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
   * Gets information about a snapshot.
   * @param resourceGroupName The name of the resource group.
   * @param snapshotName The name of the snapshot that is being created. The name can't be changed after
   *                     the snapshot is created. Supported characters for the name are a-z, A-Z, 0-9 and _. The max name
   *                     length is 80 characters.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    snapshotName: string,
    options?: coreHttp.OperationOptions
  ): Promise<SnapshotsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, snapshotName, options: operationOptions },
      getOperationSpec
    ) as Promise<SnapshotsGetResponse>;
  }

  /**
   * Deletes a snapshot.
   * @param resourceGroupName The name of the resource group.
   * @param snapshotName The name of the snapshot that is being created. The name can't be changed after
   *                     the snapshot is created. Supported characters for the name are a-z, A-Z, 0-9 and _. The max name
   *                     length is 80 characters.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    snapshotName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      snapshotName,
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
   * Lists snapshots under a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<SnapshotsListByResourceGroupResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, options: operationOptions },
      listByResourceGroupOperationSpec
    ) as Promise<SnapshotsListByResourceGroupResponse>;
  }

  /**
   * Lists snapshots under a subscription.
   * @param options The options parameters.
   */
  list(options?: coreHttp.OperationOptions): Promise<SnapshotsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listOperationSpec
    ) as Promise<SnapshotsListResponse>;
  }

  /**
   * Grants access to a snapshot.
   * @param resourceGroupName The name of the resource group.
   * @param snapshotName The name of the snapshot that is being created. The name can't be changed after
   *                     the snapshot is created. Supported characters for the name are a-z, A-Z, 0-9 and _. The max name
   *                     length is 80 characters.
   * @param grantAccessData Access data object supplied in the body of the get snapshot access operation.
   * @param options The options parameters.
   */
  async grantAccess(
    resourceGroupName: string,
    snapshotName: string,
    grantAccessData: GrantAccessData,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<SnapshotsGrantAccessResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options,
      "location"
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      snapshotName,
      grantAccessData,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        SnapshotsGrantAccessResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      grantAccessOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: grantAccessOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * Revokes access to a snapshot.
   * @param resourceGroupName The name of the resource group.
   * @param snapshotName The name of the snapshot that is being created. The name can't be changed after
   *                     the snapshot is created. Supported characters for the name are a-z, A-Z, 0-9 and _. The max name
   *                     length is 80 characters.
   * @param options The options parameters.
   */
  async revokeAccess(
    resourceGroupName: string,
    snapshotName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options,
      "location"
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      snapshotName,
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
      revokeAccessOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: revokeAccessOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName The name of the resource group.
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<SnapshotsListByResourceGroupNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options: operationOptions },
      listByResourceGroupNextOperationSpec
    ) as Promise<SnapshotsListByResourceGroupNextResponse>;
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<SnapshotsListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<SnapshotsListNextResponse>;
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Snapshot
    },
    201: {
      bodyMapper: Mappers.Snapshot
    },
    202: {
      bodyMapper: Mappers.Snapshot
    },
    204: {
      bodyMapper: Mappers.Snapshot
    }
  },
  requestBody: Parameters.snapshot,
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.snapshotName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.Snapshot
    },
    201: {
      bodyMapper: Mappers.Snapshot
    },
    202: {
      bodyMapper: Mappers.Snapshot
    },
    204: {
      bodyMapper: Mappers.Snapshot
    }
  },
  requestBody: Parameters.snapshot1,
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.snapshotName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Snapshot
    }
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.snapshotName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.snapshotName
  ],
  serializer
};
const listByResourceGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SnapshotList
    }
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/snapshots",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SnapshotList
    }
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const grantAccessOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}/beginGetAccess",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AccessUri
    },
    201: {
      bodyMapper: Mappers.AccessUri
    },
    202: {
      bodyMapper: Mappers.AccessUri
    },
    204: {
      bodyMapper: Mappers.AccessUri
    }
  },
  requestBody: Parameters.grantAccessData,
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.snapshotName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const revokeAccessOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/snapshots/{snapshotName}/endGetAccess",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.snapshotName
  ],
  serializer
};
const listByResourceGroupNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SnapshotList
    }
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SnapshotList
    }
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
