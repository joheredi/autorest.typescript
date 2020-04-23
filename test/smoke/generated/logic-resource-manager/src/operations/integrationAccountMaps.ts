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
import { LogicManagementClient } from "../logicManagementClient";
import {
  IntegrationAccountMapsListOptionalParams,
  IntegrationAccountMapsListResponse,
  IntegrationAccountMapsGetResponse,
  IntegrationAccountMap,
  IntegrationAccountMapsCreateOrUpdateResponse,
  GetCallbackUrlParameters,
  IntegrationAccountMapsListContentCallbackUrlResponse,
  IntegrationAccountMapsListNextOptionalParams,
  IntegrationAccountMapsListNextResponse
} from "../models";

/**
 * Class representing a IntegrationAccountMaps.
 */
export class IntegrationAccountMaps {
  private readonly client: LogicManagementClient;

  /**
   * Initialize a new instance of the class IntegrationAccountMaps class.
   * @param client Reference to the service client
   */
  constructor(client: LogicManagementClient) {
    this.client = client;
  }

  /**
   * Gets a list of integration account maps.
   * @param resourceGroupName The resource group name.
   * @param integrationAccountName The integration account name.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    integrationAccountName: string,
    options?: IntegrationAccountMapsListOptionalParams
  ): Promise<IntegrationAccountMapsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, integrationAccountName, options: operationOptions },
      listOperationSpec
    ) as Promise<IntegrationAccountMapsListResponse>;
  }

  /**
   * Gets an integration account map.
   * @param resourceGroupName The resource group name.
   * @param integrationAccountName The integration account name.
   * @param mapName The integration account map name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    integrationAccountName: string,
    mapName: string,
    options?: coreHttp.OperationOptions
  ): Promise<IntegrationAccountMapsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        integrationAccountName,
        mapName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<IntegrationAccountMapsGetResponse>;
  }

  /**
   * Creates or updates an integration account map.
   * @param resourceGroupName The resource group name.
   * @param integrationAccountName The integration account name.
   * @param mapName The integration account map name.
   * @param map The integration account map.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    integrationAccountName: string,
    mapName: string,
    map: IntegrationAccountMap,
    options?: coreHttp.OperationOptions
  ): Promise<IntegrationAccountMapsCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        integrationAccountName,
        mapName,
        map,
        options: operationOptions
      },
      createOrUpdateOperationSpec
    ) as Promise<IntegrationAccountMapsCreateOrUpdateResponse>;
  }

  /**
   * Deletes an integration account map.
   * @param resourceGroupName The resource group name.
   * @param integrationAccountName The integration account name.
   * @param mapName The integration account map name.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    integrationAccountName: string,
    mapName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        integrationAccountName,
        mapName,
        options: operationOptions
      },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get the content callback url.
   * @param resourceGroupName The resource group name.
   * @param integrationAccountName The integration account name.
   * @param listContentCallbackUrl The callback url parameters.
   * @param mapName The integration account map name.
   * @param options The options parameters.
   */
  listContentCallbackUrl(
    resourceGroupName: string,
    integrationAccountName: string,
    listContentCallbackUrl: GetCallbackUrlParameters,
    mapName: string,
    options?: coreHttp.OperationOptions
  ): Promise<IntegrationAccountMapsListContentCallbackUrlResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        integrationAccountName,
        listContentCallbackUrl,
        mapName,
        options: operationOptions
      },
      listContentCallbackUrlOperationSpec
    ) as Promise<IntegrationAccountMapsListContentCallbackUrlResponse>;
  }

  /**
   * ListNext
   * @param resourceGroupName The resource group name.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param integrationAccountName The integration account name.
   * @param options The options parameters.
   */
  listNext(
    resourceGroupName: string,
    nextLink: string,
    integrationAccountName: string,
    options?: IntegrationAccountMapsListNextOptionalParams
  ): Promise<IntegrationAccountMapsListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        nextLink,
        integrationAccountName,
        options: operationOptions
      },
      listNextOperationSpec
    ) as Promise<IntegrationAccountMapsListNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/maps",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationAccountMapListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.top, Parameters.filter5],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.integrationAccountName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/maps/{mapName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationAccountMap
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.integrationAccountName,
    Parameters.mapName
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/maps/{mapName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationAccountMap
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.map,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.integrationAccountName,
    Parameters.mapName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/maps/{mapName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.integrationAccountName,
    Parameters.mapName
  ],
  serializer
};
const listContentCallbackUrlOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/integrationAccounts/{integrationAccountName}/maps/{mapName}/listContentCallbackUrl",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.WorkflowTriggerCallbackUrl
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.listContentCallbackUrl,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.integrationAccountName,
    Parameters.mapName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IntegrationAccountMapListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.top, Parameters.filter5],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink2,
    Parameters.integrationAccountName
  ],
  serializer
};
