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
import { NetworkManagementClient } from "../networkManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  HubRouteTable,
  HubRouteTablesCreateOrUpdateResponse,
  HubRouteTablesGetResponse,
  HubRouteTablesListResponse,
  HubRouteTablesListNextResponse
} from "../models";

/**
 * Class representing a HubRouteTables.
 */
export class HubRouteTables {
  private readonly client: NetworkManagementClient;

  /**
   * Initialize a new instance of the class HubRouteTables class.
   * @param client Reference to the service client
   */
  constructor(client: NetworkManagementClient) {
    this.client = client;
  }

  /**
   * Creates a RouteTable resource if it doesn't exist else updates the existing RouteTable.
   * @param resourceGroupName The resource group name of the VirtualHub.
   * @param virtualHubName The name of the VirtualHub.
   * @param routeTableName The name of the RouteTable.
   * @param routeTableParameters Parameters supplied to create or update RouteTable.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    routeTableParameters: HubRouteTable,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<HubRouteTablesCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualHubName,
      routeTableName,
      routeTableParameters,
      options: this.getOperationOptions(options, "azure-async-operation")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        HubRouteTablesCreateOrUpdateResponse
      >;
    const initialOperationResult = await sendOperation(
      operationArguments,
      createOrUpdateOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createOrUpdateOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "azure-async-operation"
    });
  }

  /**
   * Retrieves the details of a RouteTable.
   * @param resourceGroupName The resource group name of the VirtualHub.
   * @param virtualHubName The name of the VirtualHub.
   * @param routeTableName The name of the RouteTable.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    options?: coreHttp.OperationOptions
  ): Promise<HubRouteTablesGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualHubName,
      routeTableName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<HubRouteTablesGetResponse>;
  }

  /**
   * Deletes a RouteTable.
   * @param resourceGroupName The resource group name of the RouteTable.
   * @param virtualHubName The name of the VirtualHub.
   * @param routeTableName The name of the RouteTable.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualHubName,
      routeTableName,
      options: this.getOperationOptions(options, "location")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    const initialOperationResult = await sendOperation(
      operationArguments,
      deleteOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * Retrieves the details of all RouteTables.
   * @param resourceGroupName The resource group name of the VirtualHub.
   * @param virtualHubName The name of the VirtualHub.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    virtualHubName: string,
    options?: coreHttp.OperationOptions
  ): Promise<HubRouteTablesListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualHubName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<HubRouteTablesListResponse>;
  }

  /**
   * ListNext
   * @param resourceGroupName The resource group name of the VirtualHub.
   * @param virtualHubName The name of the VirtualHub.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    resourceGroupName: string,
    virtualHubName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<HubRouteTablesListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualHubName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<HubRouteTablesListNextResponse>;
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/hubRouteTables/{routeTableName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.HubRouteTable
    },
    201: {
      bodyMapper: Mappers.HubRouteTable
    },
    202: {
      bodyMapper: Mappers.HubRouteTable
    },
    204: {
      bodyMapper: Mappers.HubRouteTable
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.routeTableParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.routeTableName,
    Parameters.virtualHubName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/hubRouteTables/{routeTableName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.HubRouteTable
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.routeTableName,
    Parameters.virtualHubName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/hubRouteTables/{routeTableName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.routeTableName,
    Parameters.virtualHubName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/hubRouteTables",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ListHubRouteTablesResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.virtualHubName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ListHubRouteTablesResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.virtualHubName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
