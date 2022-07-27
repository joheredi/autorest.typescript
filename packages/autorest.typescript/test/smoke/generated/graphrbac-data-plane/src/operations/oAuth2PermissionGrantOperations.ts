/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { OAuth2PermissionGrantOperations } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { GraphRbacManagementClient } from "../graphRbacManagementClient";
import {
  OAuth2PermissionGrant,
  OAuth2PermissionGrantListNextOptionalParams,
  OAuth2PermissionGrantListOptionalParams,
  OAuth2PermissionGrantListResponse,
  OAuth2PermissionGrantCreateOptionalParams,
  OAuth2PermissionGrantCreateResponse,
  OAuth2PermissionGrantDeleteOptionalParams,
  OAuth2PermissionGrantListNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing OAuth2PermissionGrantOperations operations. */
export class OAuth2PermissionGrantOperationsImpl
  implements OAuth2PermissionGrantOperations {
  private readonly client: GraphRbacManagementClient;

  /**
   * Initialize a new instance of the class OAuth2PermissionGrantOperations class.
   * @param client Reference to the service client
   */
  constructor(client: GraphRbacManagementClient) {
    this.client = client;
  }

  /**
   * Queries OAuth2 permissions grants for the relevant SP ObjectId of an app.
   * @param options The options parameters.
   */
  public list(
    options?: OAuth2PermissionGrantListOptionalParams
  ): PagedAsyncIterableIterator<OAuth2PermissionGrant> {
    const iter = this.listPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(options);
      }
    };
  }

  private async *listPagingPage(
    options?: OAuth2PermissionGrantListOptionalParams
  ): AsyncIterableIterator<OAuth2PermissionGrant[]> {
    let result = await this._list(options);
    yield result.value || [];
    let continuationToken = result.odataNextLink;
    while (continuationToken) {
      result = await this._listNext(continuationToken, options);
      continuationToken = result.odataNextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    options?: OAuth2PermissionGrantListOptionalParams
  ): AsyncIterableIterator<OAuth2PermissionGrant> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Gets the next page of OAuth2 permission grants
   * @param nextLink Next link for the list operation.
   * @param options The options parameters.
   */
  public listNext(
    nextLink: string,
    options?: OAuth2PermissionGrantListNextOptionalParams
  ): PagedAsyncIterableIterator<OAuth2PermissionGrant> {
    const iter = this.listNextPagingAll(nextLink, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listNextPagingPage(nextLink, options);
      }
    };
  }

  private async *listNextPagingPage(
    nextLink: string,
    options?: OAuth2PermissionGrantListNextOptionalParams
  ): AsyncIterableIterator<OAuth2PermissionGrant[]> {
    let result = await this._listNext(nextLink, options);
    yield result.value || [];
    let continuationToken = result.odataNextLink;
    while (continuationToken) {
      result = await this._listNext(continuationToken, options);
      continuationToken = result.odataNextLink;
      yield result.value || [];
    }
  }

  private async *listNextPagingAll(
    nextLink: string,
    options?: OAuth2PermissionGrantListNextOptionalParams
  ): AsyncIterableIterator<OAuth2PermissionGrant> {
    for await (const page of this.listNextPagingPage(nextLink, options)) {
      yield* page;
    }
  }

  /**
   * Queries OAuth2 permissions grants for the relevant SP ObjectId of an app.
   * @param options The options parameters.
   */
  private _list(
    options?: OAuth2PermissionGrantListOptionalParams
  ): Promise<OAuth2PermissionGrantListResponse> {
    return this.client.sendOperationRequest({ options }, listOperationSpec);
  }

  /**
   * Grants OAuth2 permissions for the relevant resource Ids of an app.
   * @param options The options parameters.
   */
  create(
    options?: OAuth2PermissionGrantCreateOptionalParams
  ): Promise<OAuth2PermissionGrantCreateResponse> {
    return this.client.sendOperationRequest({ options }, createOperationSpec);
  }

  /**
   * Delete a OAuth2 permission grant for the relevant resource Ids of an app.
   * @param objectId The object ID of a permission grant.
   * @param options The options parameters.
   */
  delete(
    objectId: string,
    options?: OAuth2PermissionGrantDeleteOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { objectId, options },
      deleteOperationSpec
    );
  }

  /**
   * Gets the next page of OAuth2 permission grants
   * @param nextLink Next link for the list operation.
   * @param options The options parameters.
   */
  private _listNext(
    nextLink: string,
    options?: OAuth2PermissionGrantListNextOptionalParams
  ): Promise<OAuth2PermissionGrantListNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/{tenantID}/oauth2PermissionGrants",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OAuth2PermissionGrantListResult
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [Parameters.$host, Parameters.tenantID],
  headerParameters: [Parameters.accept1],
  serializer
};
const createOperationSpec: coreClient.OperationSpec = {
  path: "/{tenantID}/oauth2PermissionGrants",
  httpMethod: "POST",
  responses: {
    201: {
      bodyMapper: Mappers.OAuth2PermissionGrant
    }
  },
  requestBody: Parameters.body,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.tenantID],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/{tenantID}/oauth2PermissionGrants/{objectId}",
  httpMethod: "DELETE",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.GraphError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.tenantID, Parameters.objectId],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "/{tenantID}/{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OAuth2PermissionGrantListResult
    },
    default: {
      bodyMapper: Mappers.GraphError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.tenantID, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};