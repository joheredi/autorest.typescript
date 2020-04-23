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
import { AzureBotService } from "../azureBotService";
import {
  BotConnectionListServiceProvidersResponse,
  BotConnectionListWithSecretsResponse,
  ConnectionSetting,
  BotConnectionCreateResponse,
  BotConnectionUpdateResponse,
  BotConnectionGetResponse,
  BotConnectionListByBotServiceResponse,
  BotConnectionListByBotServiceNextResponse
} from "../models";

/**
 * Class representing a BotConnection.
 */
export class BotConnection {
  private readonly client: AzureBotService;

  /**
   * Initialize a new instance of the class BotConnection class.
   * @param client Reference to the service client
   */
  constructor(client: AzureBotService) {
    this.client = client;
  }

  /**
   * Lists the available Service Providers for creating Connection Settings
   * @param options The options parameters.
   */
  listServiceProviders(
    options?: coreHttp.OperationOptions
  ): Promise<BotConnectionListServiceProvidersResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listServiceProvidersOperationSpec
    ) as Promise<BotConnectionListServiceProvidersResponse>;
  }

  /**
   * Get a Connection Setting registration for a Bot Service
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param connectionName The name of the Bot Service Connection Setting resource
   * @param options The options parameters.
   */
  listWithSecrets(
    resourceGroupName: string,
    resourceName: string,
    connectionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<BotConnectionListWithSecretsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceName,
        connectionName,
        options: operationOptions
      },
      listWithSecretsOperationSpec
    ) as Promise<BotConnectionListWithSecretsResponse>;
  }

  /**
   * Register a new Auth Connection for a Bot Service
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param connectionName The name of the Bot Service Connection Setting resource
   * @param parameters The parameters to provide for creating the Connection Setting.
   * @param options The options parameters.
   */
  create(
    resourceGroupName: string,
    resourceName: string,
    connectionName: string,
    parameters: ConnectionSetting,
    options?: coreHttp.OperationOptions
  ): Promise<BotConnectionCreateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceName,
        connectionName,
        parameters,
        options: operationOptions
      },
      createOperationSpec
    ) as Promise<BotConnectionCreateResponse>;
  }

  /**
   * Updates a Connection Setting registration for a Bot Service
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param connectionName The name of the Bot Service Connection Setting resource
   * @param parameters The parameters to provide for updating the Connection Setting.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    resourceName: string,
    connectionName: string,
    parameters: ConnectionSetting,
    options?: coreHttp.OperationOptions
  ): Promise<BotConnectionUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceName,
        connectionName,
        parameters,
        options: operationOptions
      },
      updateOperationSpec
    ) as Promise<BotConnectionUpdateResponse>;
  }

  /**
   * Get a Connection Setting registration for a Bot Service
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param connectionName The name of the Bot Service Connection Setting resource
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    resourceName: string,
    connectionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<BotConnectionGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceName,
        connectionName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<BotConnectionGetResponse>;
  }

  /**
   * Deletes a Connection Setting registration for a Bot Service
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param connectionName The name of the Bot Service Connection Setting resource
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    resourceName: string,
    connectionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceName,
        connectionName,
        options: operationOptions
      },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Returns all the Connection Settings registered to a particular BotService resource
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param options The options parameters.
   */
  listByBotService(
    resourceGroupName: string,
    resourceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<BotConnectionListByBotServiceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, resourceName, options: operationOptions },
      listByBotServiceOperationSpec
    ) as Promise<BotConnectionListByBotServiceResponse>;
  }

  /**
   * ListByBotServiceNext
   * @param resourceGroupName The name of the Bot resource group in the user subscription.
   * @param resourceName The name of the Bot resource.
   * @param nextLink The nextLink from the previous successful call to the ListByBotService method.
   * @param options The options parameters.
   */
  listByBotServiceNext(
    resourceGroupName: string,
    resourceName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<BotConnectionListByBotServiceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, resourceName, nextLink, options: operationOptions },
      listByBotServiceNextOperationSpec
    ) as Promise<BotConnectionListByBotServiceNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listServiceProvidersOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.BotService/listAuthServiceProviders",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ServiceProviderResponseList
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  serializer
};
const listWithSecretsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/Connections/{connectionName}/listWithSecrets",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ConnectionSetting
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.resourceName,
    Parameters.subscriptionId,
    Parameters.connectionName
  ],
  serializer
};
const createOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/Connections/{connectionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ConnectionSetting
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.parameters5,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.resourceName,
    Parameters.subscriptionId,
    Parameters.connectionName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/Connections/{connectionName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.ConnectionSetting
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.parameters6,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.resourceName,
    Parameters.subscriptionId,
    Parameters.connectionName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/Connections/{connectionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ConnectionSetting
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.resourceName,
    Parameters.subscriptionId,
    Parameters.connectionName
  ],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/Connections/{connectionName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.resourceName,
    Parameters.subscriptionId,
    Parameters.connectionName
  ],
  serializer
};
const listByBotServiceOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/connections",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ConnectionSettingResponseList
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.resourceName,
    Parameters.subscriptionId
  ],
  serializer
};
const listByBotServiceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ConnectionSettingResponseList
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.resourceName,
    Parameters.subscriptionId,
    Parameters.nextLink2
  ],
  serializer
};
