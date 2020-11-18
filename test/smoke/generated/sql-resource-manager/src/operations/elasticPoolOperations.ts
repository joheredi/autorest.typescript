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
import { SqlManagementClient } from "../sqlManagementClient";
import {
  ElasticPoolOperation,
  ElasticPoolOperationsListByElasticPoolResponse,
  ElasticPoolOperationsListByElasticPoolNextResponse
} from "../models";

/**
 * Class representing a ElasticPoolOperations.
 */
export class ElasticPoolOperations {
  private readonly client: SqlManagementClient;

  /**
   * Initialize a new instance of the class ElasticPoolOperations class.
   * @param client Reference to the service client
   */
  constructor(client: SqlManagementClient) {
    this.client = client;
  }

  /**
   * Gets a list of operations performed on the elastic pool.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param elasticPoolName
   * @param options The options parameters.
   */
  public listByElasticPool(
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<ElasticPoolOperation, ElasticPoolOperation[]> {
    const iter = this.listByElasticPoolPagingAll(
      resourceGroupName,
      serverName,
      elasticPoolName,
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
        return this.listByElasticPoolPagingPage(
          resourceGroupName,
          serverName,
          elasticPoolName,
          options
        );
      }
    };
  }

  private async *listByElasticPoolPagingPage(
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<ElasticPoolOperation[]> {
    let result = await this._listByElasticPool(
      resourceGroupName,
      serverName,
      elasticPoolName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByElasticPoolNext(
        resourceGroupName,
        serverName,
        elasticPoolName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByElasticPoolPagingAll(
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<ElasticPoolOperation> {
    for await (const page of this.listByElasticPoolPagingPage(
      resourceGroupName,
      serverName,
      elasticPoolName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Cancels the asynchronous operation on the elastic pool.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param elasticPoolName
   * @param operationId The operation identifier.
   * @param options The options parameters.
   */
  cancel(
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    operationId: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      elasticPoolName,
      operationId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      cancelOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Gets a list of operations performed on the elastic pool.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param elasticPoolName
   * @param options The options parameters.
   */
  private _listByElasticPool(
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ElasticPoolOperationsListByElasticPoolResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      elasticPoolName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByElasticPoolOperationSpec
    ) as Promise<ElasticPoolOperationsListByElasticPoolResponse>;
  }

  /**
   * ListByElasticPoolNext
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param elasticPoolName
   * @param nextLink The nextLink from the previous successful call to the ListByElasticPool method.
   * @param options The options parameters.
   */
  private _listByElasticPoolNext(
    resourceGroupName: string,
    serverName: string,
    elasticPoolName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<ElasticPoolOperationsListByElasticPoolNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      elasticPoolName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByElasticPoolNextOperationSpec
    ) as Promise<ElasticPoolOperationsListByElasticPoolNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const cancelOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools/{elasticPoolName}/operations/{operationId}/cancel",
  httpMethod: "POST",
  responses: { 200: {}, default: {} },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.elasticPoolName,
    Parameters.operationId
  ],
  serializer
};
const listByElasticPoolOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/elasticPools/{elasticPoolName}/operations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ElasticPoolOperationListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.elasticPoolName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByElasticPoolNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ElasticPoolOperationListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.elasticPoolName,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
