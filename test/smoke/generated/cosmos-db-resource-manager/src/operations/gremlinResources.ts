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
import { CosmosDBManagementClient } from "../cosmosDBManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  GremlinResourcesListGremlinDatabasesResponse,
  GremlinResourcesGetGremlinDatabaseResponse,
  GremlinDatabaseCreateUpdateParameters,
  GremlinResourcesCreateUpdateGremlinDatabaseResponse,
  GremlinResourcesGetGremlinDatabaseThroughputResponse,
  ThroughputSettingsUpdateParameters,
  GremlinResourcesUpdateGremlinDatabaseThroughputResponse,
  GremlinResourcesListGremlinGraphsResponse,
  GremlinResourcesGetGremlinGraphResponse,
  GremlinGraphCreateUpdateParameters,
  GremlinResourcesCreateUpdateGremlinGraphResponse,
  GremlinResourcesGetGremlinGraphThroughputResponse,
  GremlinResourcesUpdateGremlinGraphThroughputResponse
} from "../models";

/**
 * Class representing a GremlinResources.
 */
export class GremlinResources {
  private readonly client: CosmosDBManagementClient;

  /**
   * Initialize a new instance of the class GremlinResources class.
   * @param client Reference to the service client
   */
  constructor(client: CosmosDBManagementClient) {
    this.client = client;
  }

  /**
   * Lists the Gremlin databases under an existing Azure Cosmos DB database account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param options The options parameters.
   */
  listGremlinDatabases(
    resourceGroupName: string,
    accountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<GremlinResourcesListGremlinDatabasesResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options: operationOptions },
      listGremlinDatabasesOperationSpec
    ) as Promise<GremlinResourcesListGremlinDatabasesResponse>;
  }

  /**
   * Gets the Gremlin databases under an existing Azure Cosmos DB database account with the provided
   * name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param options The options parameters.
   */
  getGremlinDatabase(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: coreHttp.OperationOptions
  ): Promise<GremlinResourcesGetGremlinDatabaseResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        databaseName,
        options: operationOptions
      },
      getGremlinDatabaseOperationSpec
    ) as Promise<GremlinResourcesGetGremlinDatabaseResponse>;
  }

  /**
   * Create or update an Azure Cosmos DB Gremlin database
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param createUpdateGremlinDatabaseParameters The parameters to provide for the current Gremlin
   *                                              database.
   * @param options The options parameters.
   */
  async createUpdateGremlinDatabase(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    createUpdateGremlinDatabaseParameters: GremlinDatabaseCreateUpdateParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<GremlinResourcesCreateUpdateGremlinDatabaseResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      databaseName,
      createUpdateGremlinDatabaseParameters,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        GremlinResourcesCreateUpdateGremlinDatabaseResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      createUpdateGremlinDatabaseOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: createUpdateGremlinDatabaseOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Deletes an existing Azure Cosmos DB Gremlin database.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param options The options parameters.
   */
  async deleteGremlinDatabase(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      databaseName,
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
      deleteGremlinDatabaseOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: deleteGremlinDatabaseOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets the RUs per second of the Gremlin database under an existing Azure Cosmos DB database account
   * with the provided name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param options The options parameters.
   */
  getGremlinDatabaseThroughput(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: coreHttp.OperationOptions
  ): Promise<GremlinResourcesGetGremlinDatabaseThroughputResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        databaseName,
        options: operationOptions
      },
      getGremlinDatabaseThroughputOperationSpec
    ) as Promise<GremlinResourcesGetGremlinDatabaseThroughputResponse>;
  }

  /**
   * Update RUs per second of an Azure Cosmos DB Gremlin database
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param updateThroughputParameters The RUs per second of the parameters to provide for the current
   *                                   Gremlin database.
   * @param options The options parameters.
   */
  async updateGremlinDatabaseThroughput(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: coreHttp.OperationOptions
  ): Promise<
    LROPoller<GremlinResourcesUpdateGremlinDatabaseThroughputResponse>
  > {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      databaseName,
      updateThroughputParameters,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        GremlinResourcesUpdateGremlinDatabaseThroughputResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      updateGremlinDatabaseThroughputOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: updateGremlinDatabaseThroughputOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Lists the Gremlin graph under an existing Azure Cosmos DB database account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param options The options parameters.
   */
  listGremlinGraphs(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    options?: coreHttp.OperationOptions
  ): Promise<GremlinResourcesListGremlinGraphsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        databaseName,
        options: operationOptions
      },
      listGremlinGraphsOperationSpec
    ) as Promise<GremlinResourcesListGremlinGraphsResponse>;
  }

  /**
   * Gets the Gremlin graph under an existing Azure Cosmos DB database account.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param graphName Cosmos DB graph name.
   * @param options The options parameters.
   */
  getGremlinGraph(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    options?: coreHttp.OperationOptions
  ): Promise<GremlinResourcesGetGremlinGraphResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        options: operationOptions
      },
      getGremlinGraphOperationSpec
    ) as Promise<GremlinResourcesGetGremlinGraphResponse>;
  }

  /**
   * Create or update an Azure Cosmos DB Gremlin graph
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param graphName Cosmos DB graph name.
   * @param createUpdateGremlinGraphParameters The parameters to provide for the current Gremlin graph.
   * @param options The options parameters.
   */
  async createUpdateGremlinGraph(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    createUpdateGremlinGraphParameters: GremlinGraphCreateUpdateParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<GremlinResourcesCreateUpdateGremlinGraphResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      databaseName,
      graphName,
      createUpdateGremlinGraphParameters,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        GremlinResourcesCreateUpdateGremlinGraphResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      createUpdateGremlinGraphOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: createUpdateGremlinGraphOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Deletes an existing Azure Cosmos DB Gremlin graph.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param graphName Cosmos DB graph name.
   * @param options The options parameters.
   */
  async deleteGremlinGraph(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      databaseName,
      graphName,
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
      deleteGremlinGraphOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: deleteGremlinGraphOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets the Gremlin graph throughput under an existing Azure Cosmos DB database account with the
   * provided name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param graphName Cosmos DB graph name.
   * @param options The options parameters.
   */
  getGremlinGraphThroughput(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    options?: coreHttp.OperationOptions
  ): Promise<GremlinResourcesGetGremlinGraphThroughputResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        databaseName,
        graphName,
        options: operationOptions
      },
      getGremlinGraphThroughputOperationSpec
    ) as Promise<GremlinResourcesGetGremlinGraphThroughputResponse>;
  }

  /**
   * Update RUs per second of an Azure Cosmos DB Gremlin graph
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName Cosmos DB database account name.
   * @param databaseName Cosmos DB database name.
   * @param graphName Cosmos DB graph name.
   * @param updateThroughputParameters The RUs per second of the parameters to provide for the current
   *                                   Gremlin graph.
   * @param options The options parameters.
   */
  async updateGremlinGraphThroughput(
    resourceGroupName: string,
    accountName: string,
    databaseName: string,
    graphName: string,
    updateThroughputParameters: ThroughputSettingsUpdateParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<GremlinResourcesUpdateGremlinGraphThroughputResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      databaseName,
      graphName,
      updateThroughputParameters,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        GremlinResourcesUpdateGremlinGraphThroughputResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      updateGremlinGraphThroughputOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: updateGremlinGraphThroughputOperationSpec,
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

const listGremlinDatabasesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GremlinDatabaseListResult
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
const getGremlinDatabaseOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GremlinDatabaseGetResults
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
const createUpdateGremlinDatabaseOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.GremlinDatabaseGetResults
    },
    201: {
      bodyMapper: Mappers.GremlinDatabaseGetResults
    },
    202: {
      bodyMapper: Mappers.GremlinDatabaseGetResults
    },
    204: {
      bodyMapper: Mappers.GremlinDatabaseGetResults
    }
  },
  requestBody: Parameters.createUpdateGremlinDatabaseParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.databaseName
  ],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const deleteGremlinDatabaseOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}",
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
const getGremlinDatabaseThroughputOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/throughputSettings/default",
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
const updateGremlinDatabaseThroughputOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/throughputSettings/default",
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
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const listGremlinGraphsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GremlinGraphListResult
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
const getGremlinGraphOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GremlinGraphGetResults
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.databaseName,
    Parameters.graphName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createUpdateGremlinGraphOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.GremlinGraphGetResults
    },
    201: {
      bodyMapper: Mappers.GremlinGraphGetResults
    },
    202: {
      bodyMapper: Mappers.GremlinGraphGetResults
    },
    204: {
      bodyMapper: Mappers.GremlinGraphGetResults
    }
  },
  requestBody: Parameters.createUpdateGremlinGraphParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.databaseName,
    Parameters.graphName
  ],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const deleteGremlinGraphOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.databaseName,
    Parameters.graphName
  ],
  serializer
};
const getGremlinGraphThroughputOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}/throughputSettings/default",
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
    Parameters.graphName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const updateGremlinGraphThroughputOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/gremlinDatabases/{databaseName}/graphs/{graphName}/throughputSettings/default",
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
    Parameters.graphName
  ],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
