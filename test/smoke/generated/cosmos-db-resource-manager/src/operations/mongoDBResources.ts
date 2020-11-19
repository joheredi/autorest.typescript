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
import { CosmosDBManagementClient } from "../cosmosDBManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  MongoDBDatabaseGetResults,
  MongoDBCollectionGetResults,
  MongoDBResourcesListMongoDBDatabasesResponse,
  MongoDBResourcesGetMongoDBDatabaseResponse,
  MongoDBDatabaseCreateUpdateParameters,
  MongoDBResourcesCreateUpdateMongoDBDatabaseResponse,
  MongoDBResourcesGetMongoDBDatabaseThroughputResponse,
  ThroughputSettingsUpdateParameters,
  MongoDBResourcesUpdateMongoDBDatabaseThroughputResponse,
  MongoDBResourcesListMongoDBCollectionsResponse,
  MongoDBResourcesGetMongoDBCollectionResponse,
  MongoDBCollectionCreateUpdateParameters,
  MongoDBResourcesCreateUpdateMongoDBCollectionResponse,
  MongoDBResourcesGetMongoDBCollectionThroughputResponse,
  MongoDBResourcesUpdateMongoDBCollectionThroughputResponse
} from "../models";

/**
 * Class representing a MongoDBResources.
 */
export class MongoDBResources {
  private readonly client: CosmosDBManagementClient;

  /**
   * Initialize a new instance of the class MongoDBResources class.
   * @param client Reference to the service client
   */
  constructor(client: CosmosDBManagementClient) {
    this.client = client;
  }

  /**
   * Lists the MongoDB databases under an existing Azure Cosmos DB database account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param options The options parameters.
   */
  public listMongoDBDatabases(
    resourceGroupName: string,
    accountName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<MongoDBDatabaseGetResults> {
    const iter = this.listMongoDBDatabasesPagingAll(
      resourceGroupName,
      accountName,
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
        return this.listMongoDBDatabasesPagingPage(
          resourceGroupName,
          accountName,
          options
        );
      }
    };
  }

  private async *listMongoDBDatabasesPagingPage(
    resourceGroupName: string,
    accountName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<MongoDBDatabaseGetResults[]> {
    let result = await this._listMongoDBDatabases(
      resourceGroupName,
      accountName,
      options
    );
    yield result.value || [];
  }

  private async *listMongoDBDatabasesPagingAll(
    resourceGroupName: string,
    accountName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<MongoDBDatabaseGetResults> {
    for await (const page of this.listMongoDBDatabasesPagingPage(
      resourceGroupName,
      accountName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Lists the MongoDB collection under an existing Azure Cosmos DB database account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param options The options parameters.
   */
  public listMongoDBCollections(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<MongoDBCollectionGetResults> {
    const iter = this.listMongoDBCollectionsPagingAll(
      resourceGroupName,
      accountName,
      databaseName,
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
        return this.listMongoDBCollectionsPagingPage(
          resourceGroupName,
          accountName,
          databaseName,
          options
        );
      }
    };
  }

  private async *listMongoDBCollectionsPagingPage(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<MongoDBCollectionGetResults[]> {
    let result = await this._listMongoDBCollections(
      resourceGroupName,
      accountName,
      databaseName,
      options
    );
    yield result.value || [];
  }

  private async *listMongoDBCollectionsPagingAll(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<MongoDBCollectionGetResults> {
    for await (const page of this.listMongoDBCollectionsPagingPage(
      resourceGroupName,
      accountName,
      databaseName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Lists the MongoDB databases under an existing Azure Cosmos DB database account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param options The options parameters.
   */
  private _listMongoDBDatabases(
    resourceGroupName: string,
    accountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<MongoDBResourcesListMongoDBDatabasesResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listMongoDBDatabasesOperationSpec
    ) as Promise<MongoDBResourcesListMongoDBDatabasesResponse>;
  }

  /**
   * Gets the MongoDB databases under an existing Azure Cosmos DB database account with the provided
   * name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param options The options parameters.
   */
  getMongoDBDatabase(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: coreHttp.OperationOptions
  ): Promise<MongoDBResourcesGetMongoDBDatabaseResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      databaseName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getMongoDBDatabaseOperationSpec
    ) as Promise<MongoDBResourcesGetMongoDBDatabaseResponse>;
  }

  /**
   * Create or updates Azure Cosmos DB MongoDB database
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param createUpdateMongoDBDatabaseParameters The parameters to provide for the current MongoDB
   *                                              database.
   * @param options The options parameters.
   */
  async createUpdateMongoDBDatabase(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    createUpdateMongoDBDatabaseParameters: MongoDBDatabaseCreateUpdateParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<MongoDBResourcesCreateUpdateMongoDBDatabaseResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      databaseName,
      createUpdateMongoDBDatabaseParameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        MongoDBResourcesCreateUpdateMongoDBDatabaseResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      createUpdateMongoDBDatabaseOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createUpdateMongoDBDatabaseOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Deletes an existing Azure Cosmos DB MongoDB database.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param options The options parameters.
   */
  async deleteMongoDBDatabase(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      databaseName,
      options: this.getOperationOptions(options, "undefined")
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
      deleteMongoDBDatabaseOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteMongoDBDatabaseOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets the RUs per second of the MongoDB database under an existing Azure Cosmos DB database account
   * with the provided name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param options The options parameters.
   */
  getMongoDBDatabaseThroughput(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: coreHttp.OperationOptions
  ): Promise<MongoDBResourcesGetMongoDBDatabaseThroughputResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      databaseName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getMongoDBDatabaseThroughputOperationSpec
    ) as Promise<MongoDBResourcesGetMongoDBDatabaseThroughputResponse>;
  }

  /**
   * Update RUs per second of the an Azure Cosmos DB MongoDB database
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param updateThroughputParameters The RUs per second of the parameters to provide for the current
   *                                   MongoDB database.
   * @param options The options parameters.
   */
  async updateMongoDBDatabaseThroughput(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: coreHttp.OperationOptions
  ): Promise<
    LROPoller<MongoDBResourcesUpdateMongoDBDatabaseThroughputResponse>
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      databaseName,
      updateThroughputParameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        MongoDBResourcesUpdateMongoDBDatabaseThroughputResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      updateMongoDBDatabaseThroughputOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: updateMongoDBDatabaseThroughputOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Lists the MongoDB collection under an existing Azure Cosmos DB database account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param options The options parameters.
   */
  private _listMongoDBCollections(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: coreHttp.OperationOptions
  ): Promise<MongoDBResourcesListMongoDBCollectionsResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      databaseName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listMongoDBCollectionsOperationSpec
    ) as Promise<MongoDBResourcesListMongoDBCollectionsResponse>;
  }

  /**
   * Gets the MongoDB collection under an existing Azure Cosmos DB database account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param collectionName Cosmos DB collection name.
   * @param options The options parameters.
   */
  getMongoDBCollection(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<MongoDBResourcesGetMongoDBCollectionResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      databaseName,
      collectionName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getMongoDBCollectionOperationSpec
    ) as Promise<MongoDBResourcesGetMongoDBCollectionResponse>;
  }

  /**
   * Create or update an Azure Cosmos DB MongoDB Collection
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param collectionName Cosmos DB collection name.
   * @param createUpdateMongoDBCollectionParameters The parameters to provide for the current MongoDB
   *                                                Collection.
   * @param options The options parameters.
   */
  async createUpdateMongoDBCollection(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    createUpdateMongoDBCollectionParameters: MongoDBCollectionCreateUpdateParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<MongoDBResourcesCreateUpdateMongoDBCollectionResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      databaseName,
      collectionName,
      createUpdateMongoDBCollectionParameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        MongoDBResourcesCreateUpdateMongoDBCollectionResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      createUpdateMongoDBCollectionOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createUpdateMongoDBCollectionOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Deletes an existing Azure Cosmos DB MongoDB Collection.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param collectionName Cosmos DB collection name.
   * @param options The options parameters.
   */
  async deleteMongoDBCollection(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      databaseName,
      collectionName,
      options: this.getOperationOptions(options, "undefined")
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
      deleteMongoDBCollectionOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteMongoDBCollectionOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets the RUs per second of the MongoDB collection under an existing Azure Cosmos DB database account
   * with the provided name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param collectionName Cosmos DB collection name.
   * @param options The options parameters.
   */
  getMongoDBCollectionThroughput(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<MongoDBResourcesGetMongoDBCollectionThroughputResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      databaseName,
      collectionName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getMongoDBCollectionThroughputOperationSpec
    ) as Promise<MongoDBResourcesGetMongoDBCollectionThroughputResponse>;
  }

  /**
   * Update the RUs per second of an Azure Cosmos DB MongoDB collection
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param collectionName Cosmos DB collection name.
   * @param updateThroughputParameters The RUs per second of the parameters to provide for the current
   *                                   MongoDB collection.
   * @param options The options parameters.
   */
  async updateMongoDBCollectionThroughput(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    collectionName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: coreHttp.OperationOptions
  ): Promise<
    LROPoller<MongoDBResourcesUpdateMongoDBCollectionThroughputResponse>
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      databaseName,
      collectionName,
      updateThroughputParameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        MongoDBResourcesUpdateMongoDBCollectionThroughputResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      updateMongoDBCollectionThroughputOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: updateMongoDBCollectionThroughputOperationSpec,
      initialOperationResult,
      sendOperation
    });
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

const listMongoDBDatabasesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MongoDBDatabaseListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getMongoDBDatabaseOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MongoDBDatabaseGetResults
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.databaseName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createUpdateMongoDBDatabaseOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.MongoDBDatabaseGetResults
    },
    201: {
      bodyMapper: Mappers.MongoDBDatabaseGetResults
    },
    202: {
      bodyMapper: Mappers.MongoDBDatabaseGetResults
    },
    204: {
      bodyMapper: Mappers.MongoDBDatabaseGetResults
    }
  },
  requestBody: Parameters.createUpdateMongoDBDatabaseParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.databaseName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteMongoDBDatabaseOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.databaseName
  ],
  serializer
};
const getMongoDBDatabaseThroughputOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/throughputSettings/default",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ThroughputSettingsGetResults
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.databaseName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const updateMongoDBDatabaseThroughputOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/throughputSettings/default",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ThroughputSettingsGetResults
    },
    201: {
      bodyMapper: Mappers.ThroughputSettingsGetResults
    },
    202: {
      bodyMapper: Mappers.ThroughputSettingsGetResults
    },
    204: {
      bodyMapper: Mappers.ThroughputSettingsGetResults
    }
  },
  requestBody: Parameters.updateThroughputParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.databaseName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listMongoDBCollectionsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MongoDBCollectionListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.databaseName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getMongoDBCollectionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MongoDBCollectionGetResults
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.databaseName,
    Parameters.collectionName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createUpdateMongoDBCollectionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.MongoDBCollectionGetResults
    },
    201: {
      bodyMapper: Mappers.MongoDBCollectionGetResults
    },
    202: {
      bodyMapper: Mappers.MongoDBCollectionGetResults
    },
    204: {
      bodyMapper: Mappers.MongoDBCollectionGetResults
    }
  },
  requestBody: Parameters.createUpdateMongoDBCollectionParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.databaseName,
    Parameters.collectionName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteMongoDBCollectionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.databaseName,
    Parameters.collectionName
  ],
  serializer
};
const getMongoDBCollectionThroughputOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/throughputSettings/default",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ThroughputSettingsGetResults
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.databaseName,
    Parameters.collectionName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const updateMongoDBCollectionThroughputOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/mongodbDatabases/{databaseName}/collections/{collectionName}/throughputSettings/default",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ThroughputSettingsGetResults
    },
    201: {
      bodyMapper: Mappers.ThroughputSettingsGetResults
    },
    202: {
      bodyMapper: Mappers.ThroughputSettingsGetResults
    },
    204: {
      bodyMapper: Mappers.ThroughputSettingsGetResults
    }
  },
  requestBody: Parameters.updateThroughputParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.databaseName,
    Parameters.collectionName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
