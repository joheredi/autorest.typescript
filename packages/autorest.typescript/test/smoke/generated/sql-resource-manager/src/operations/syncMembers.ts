/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper";
import { SyncMembers } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { SqlManagementClient } from "../sqlManagementClient";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl";
import {
  SyncMember,
  SyncMembersListBySyncGroupNextOptionalParams,
  SyncMembersListBySyncGroupOptionalParams,
  SyncMembersListBySyncGroupResponse,
  SyncFullSchemaProperties,
  SyncMembersListMemberSchemasNextOptionalParams,
  SyncMembersListMemberSchemasOptionalParams,
  SyncMembersListMemberSchemasResponse,
  SyncMembersGetOptionalParams,
  SyncMembersGetResponse,
  SyncMembersCreateOrUpdateOptionalParams,
  SyncMembersCreateOrUpdateResponse,
  SyncMembersDeleteOptionalParams,
  SyncMembersUpdateOptionalParams,
  SyncMembersUpdateResponse,
  SyncMembersRefreshMemberSchemaOptionalParams,
  SyncMembersListBySyncGroupNextResponse,
  SyncMembersListMemberSchemasNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing SyncMembers operations. */
export class SyncMembersImpl implements SyncMembers {
  private readonly client: SqlManagementClient;

  /**
   * Initialize a new instance of the class SyncMembers class.
   * @param client Reference to the service client
   */
  constructor(client: SqlManagementClient) {
    this.client = client;
  }

  /**
   * Lists sync members in the given sync group.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database on which the sync group is hosted.
   * @param syncGroupName The name of the sync group.
   * @param options The options parameters.
   */
  public listBySyncGroup(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    options?: SyncMembersListBySyncGroupOptionalParams
  ): PagedAsyncIterableIterator<SyncMember> {
    const iter = this.listBySyncGroupPagingAll(
      resourceGroupName,
      serverName,
      databaseName,
      syncGroupName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listBySyncGroupPagingPage(
          resourceGroupName,
          serverName,
          databaseName,
          syncGroupName,
          options,
          settings
        );
      }
    };
  }

  private async *listBySyncGroupPagingPage(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    options?: SyncMembersListBySyncGroupOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<SyncMember[]> {
    let result: SyncMembersListBySyncGroupResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listBySyncGroup(
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        options
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listBySyncGroupNext(
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listBySyncGroupPagingAll(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    options?: SyncMembersListBySyncGroupOptionalParams
  ): AsyncIterableIterator<SyncMember> {
    for await (const page of this.listBySyncGroupPagingPage(
      resourceGroupName,
      serverName,
      databaseName,
      syncGroupName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets a sync member database schema.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database on which the sync group is hosted.
   * @param syncGroupName The name of the sync group on which the sync member is hosted.
   * @param syncMemberName The name of the sync member.
   * @param options The options parameters.
   */
  public listMemberSchemas(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    options?: SyncMembersListMemberSchemasOptionalParams
  ): PagedAsyncIterableIterator<SyncFullSchemaProperties> {
    const iter = this.listMemberSchemasPagingAll(
      resourceGroupName,
      serverName,
      databaseName,
      syncGroupName,
      syncMemberName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listMemberSchemasPagingPage(
          resourceGroupName,
          serverName,
          databaseName,
          syncGroupName,
          syncMemberName,
          options,
          settings
        );
      }
    };
  }

  private async *listMemberSchemasPagingPage(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    options?: SyncMembersListMemberSchemasOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<SyncFullSchemaProperties[]> {
    let result: SyncMembersListMemberSchemasResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listMemberSchemas(
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        options
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listMemberSchemasNext(
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listMemberSchemasPagingAll(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    options?: SyncMembersListMemberSchemasOptionalParams
  ): AsyncIterableIterator<SyncFullSchemaProperties> {
    for await (const page of this.listMemberSchemasPagingPage(
      resourceGroupName,
      serverName,
      databaseName,
      syncGroupName,
      syncMemberName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets a sync member.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database on which the sync group is hosted.
   * @param syncGroupName The name of the sync group on which the sync member is hosted.
   * @param syncMemberName The name of the sync member.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    options?: SyncMembersGetOptionalParams
  ): Promise<SyncMembersGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        options
      },
      getOperationSpec
    );
  }

  /**
   * Creates or updates a sync member.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database on which the sync group is hosted.
   * @param syncGroupName The name of the sync group on which the sync member is hosted.
   * @param syncMemberName The name of the sync member.
   * @param parameters The requested sync member resource state.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    parameters: SyncMember,
    options?: SyncMembersCreateOrUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<SyncMembersCreateOrUpdateResponse>,
      SyncMembersCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<SyncMembersCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        parameters,
        options
      },
      spec: createOrUpdateOperationSpec
    });
    const poller = await createHttpPoller<
      SyncMembersCreateOrUpdateResponse,
      OperationState<SyncMembersCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });

    return poller;
  }

  /**
   * Creates or updates a sync member.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database on which the sync group is hosted.
   * @param syncGroupName The name of the sync group on which the sync member is hosted.
   * @param syncMemberName The name of the sync member.
   * @param parameters The requested sync member resource state.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    parameters: SyncMember,
    options?: SyncMembersCreateOrUpdateOptionalParams
  ): Promise<SyncMembersCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      serverName,
      databaseName,
      syncGroupName,
      syncMemberName,
      parameters,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Deletes a sync member.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database on which the sync group is hosted.
   * @param syncGroupName The name of the sync group on which the sync member is hosted.
   * @param syncMemberName The name of the sync member.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    options?: SyncMembersDeleteOptionalParams
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        options
      },
      spec: deleteOperationSpec
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });

    return poller;
  }

  /**
   * Deletes a sync member.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database on which the sync group is hosted.
   * @param syncGroupName The name of the sync group on which the sync member is hosted.
   * @param syncMemberName The name of the sync member.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    options?: SyncMembersDeleteOptionalParams
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      serverName,
      databaseName,
      syncGroupName,
      syncMemberName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Updates an existing sync member.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database on which the sync group is hosted.
   * @param syncGroupName The name of the sync group on which the sync member is hosted.
   * @param syncMemberName The name of the sync member.
   * @param parameters The requested sync member resource state.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    parameters: SyncMember,
    options?: SyncMembersUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<SyncMembersUpdateResponse>,
      SyncMembersUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<SyncMembersUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        parameters,
        options
      },
      spec: updateOperationSpec
    });
    const poller = await createHttpPoller<
      SyncMembersUpdateResponse,
      OperationState<SyncMembersUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });

    return poller;
  }

  /**
   * Updates an existing sync member.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database on which the sync group is hosted.
   * @param syncGroupName The name of the sync group on which the sync member is hosted.
   * @param syncMemberName The name of the sync member.
   * @param parameters The requested sync member resource state.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    parameters: SyncMember,
    options?: SyncMembersUpdateOptionalParams
  ): Promise<SyncMembersUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      serverName,
      databaseName,
      syncGroupName,
      syncMemberName,
      parameters,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Lists sync members in the given sync group.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database on which the sync group is hosted.
   * @param syncGroupName The name of the sync group.
   * @param options The options parameters.
   */
  private _listBySyncGroup(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    options?: SyncMembersListBySyncGroupOptionalParams
  ): Promise<SyncMembersListBySyncGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serverName, databaseName, syncGroupName, options },
      listBySyncGroupOperationSpec
    );
  }

  /**
   * Gets a sync member database schema.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database on which the sync group is hosted.
   * @param syncGroupName The name of the sync group on which the sync member is hosted.
   * @param syncMemberName The name of the sync member.
   * @param options The options parameters.
   */
  private _listMemberSchemas(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    options?: SyncMembersListMemberSchemasOptionalParams
  ): Promise<SyncMembersListMemberSchemasResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        options
      },
      listMemberSchemasOperationSpec
    );
  }

  /**
   * Refreshes a sync member database schema.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database on which the sync group is hosted.
   * @param syncGroupName The name of the sync group on which the sync member is hosted.
   * @param syncMemberName The name of the sync member.
   * @param options The options parameters.
   */
  async beginRefreshMemberSchema(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    options?: SyncMembersRefreshMemberSchemaOptionalParams
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        options
      },
      spec: refreshMemberSchemaOperationSpec
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });

    return poller;
  }

  /**
   * Refreshes a sync member database schema.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database on which the sync group is hosted.
   * @param syncGroupName The name of the sync group on which the sync member is hosted.
   * @param syncMemberName The name of the sync member.
   * @param options The options parameters.
   */
  async beginRefreshMemberSchemaAndWait(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    options?: SyncMembersRefreshMemberSchemaOptionalParams
  ): Promise<void> {
    const poller = await this.beginRefreshMemberSchema(
      resourceGroupName,
      serverName,
      databaseName,
      syncGroupName,
      syncMemberName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * ListBySyncGroupNext
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database on which the sync group is hosted.
   * @param syncGroupName The name of the sync group.
   * @param nextLink The nextLink from the previous successful call to the ListBySyncGroup method.
   * @param options The options parameters.
   */
  private _listBySyncGroupNext(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    nextLink: string,
    options?: SyncMembersListBySyncGroupNextOptionalParams
  ): Promise<SyncMembersListBySyncGroupNextResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        nextLink,
        options
      },
      listBySyncGroupNextOperationSpec
    );
  }

  /**
   * ListMemberSchemasNext
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database on which the sync group is hosted.
   * @param syncGroupName The name of the sync group on which the sync member is hosted.
   * @param syncMemberName The name of the sync member.
   * @param nextLink The nextLink from the previous successful call to the ListMemberSchemas method.
   * @param options The options parameters.
   */
  private _listMemberSchemasNext(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    syncGroupName: string,
    syncMemberName: string,
    nextLink: string,
    options?: SyncMembersListMemberSchemasNextOptionalParams
  ): Promise<SyncMembersListMemberSchemasNextResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serverName,
        databaseName,
        syncGroupName,
        syncMemberName,
        nextLink,
        options
      },
      listMemberSchemasNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SyncMember
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.syncGroupName,
    Parameters.syncMemberName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.SyncMember
    },
    201: {
      bodyMapper: Mappers.SyncMember
    },
    202: {
      bodyMapper: Mappers.SyncMember
    },
    204: {
      bodyMapper: Mappers.SyncMember
    },
    default: {}
  },
  requestBody: Parameters.parameters70,
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.syncGroupName,
    Parameters.syncMemberName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {}, default: {} },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.syncGroupName,
    Parameters.syncMemberName
  ],
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.SyncMember
    },
    201: {
      bodyMapper: Mappers.SyncMember
    },
    202: {
      bodyMapper: Mappers.SyncMember
    },
    204: {
      bodyMapper: Mappers.SyncMember
    },
    default: {}
  },
  requestBody: Parameters.parameters70,
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.syncGroupName,
    Parameters.syncMemberName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listBySyncGroupOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SyncMemberListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.syncGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listMemberSchemasOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}/schemas",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SyncFullSchemaPropertiesListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.syncGroupName,
    Parameters.syncMemberName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const refreshMemberSchemaOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/syncGroups/{syncGroupName}/syncMembers/{syncMemberName}/refreshSchema",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {}, default: {} },
  queryParameters: [Parameters.apiVersion2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.syncGroupName,
    Parameters.syncMemberName
  ],
  serializer
};
const listBySyncGroupNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SyncMemberListResult
    },
    default: {}
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.nextLink,
    Parameters.syncGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listMemberSchemasNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SyncFullSchemaPropertiesListResult
    },
    default: {}
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.nextLink,
    Parameters.syncGroupName,
    Parameters.syncMemberName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
