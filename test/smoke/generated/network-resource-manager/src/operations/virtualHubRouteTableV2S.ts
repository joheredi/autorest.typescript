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
  VirtualHubRouteTableV2SGetResponse,
  VirtualHubRouteTableV2,
  VirtualHubRouteTableV2SCreateOrUpdateResponse,
  VirtualHubRouteTableV2SListResponse,
  VirtualHubRouteTableV2SListNextResponse
} from "../models";

/**
 * Class representing a VirtualHubRouteTableV2S.
 */
export class VirtualHubRouteTableV2S {
  private readonly client: NetworkManagementClient;

  /**
   * Initialize a new instance of the class VirtualHubRouteTableV2S class.
   * @param client Reference to the service client
   */
  constructor(client: NetworkManagementClient) {
    this.client = client;
  }

  /**
   * Retrieves the details of a VirtualHubRouteTableV2.
   * @param resourceGroupName The resource group name of the VirtualHubRouteTableV2.
   * @param virtualHubName The name of the VirtualHub.
   * @param routeTableName The name of the VirtualHubRouteTableV2.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualHubRouteTableV2SGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualHubName,
      routeTableName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<VirtualHubRouteTableV2SGetResponse>;
  }

  /**
   * Creates a VirtualHubRouteTableV2 resource if it doesn't exist else updates the existing
   * VirtualHubRouteTableV2.
   * @param resourceGroupName The resource group name of the VirtualHub.
   * @param virtualHubName The name of the VirtualHub.
   * @param routeTableName The name of the VirtualHubRouteTableV2.
   * @param virtualHubRouteTableV2Parameters Parameters supplied to create or update
   *                                         VirtualHubRouteTableV2.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    virtualHubName: string,
    routeTableName: string,
    virtualHubRouteTableV2Parameters: VirtualHubRouteTableV2,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualHubRouteTableV2SCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualHubName,
      routeTableName,
      virtualHubRouteTableV2Parameters,
      options: this.getOperationOptions(options, "azure-async-operation")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        VirtualHubRouteTableV2SCreateOrUpdateResponse
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
   * Deletes a VirtualHubRouteTableV2.
   * @param resourceGroupName The resource group name of the VirtualHubRouteTableV2.
   * @param virtualHubName The name of the VirtualHub.
   * @param routeTableName The name of the VirtualHubRouteTableV2.
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
   * Retrieves the details of all VirtualHubRouteTableV2s.
   * @param resourceGroupName The resource group name of the VirtualHub.
   * @param virtualHubName The name of the VirtualHub.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    virtualHubName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualHubRouteTableV2SListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualHubName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<VirtualHubRouteTableV2SListResponse>;
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
  ): Promise<VirtualHubRouteTableV2SListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualHubName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<VirtualHubRouteTableV2SListNextResponse>;
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

const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routeTables/{routeTableName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualHubRouteTableV2
    },
    default: {
      bodyMapper: Mappers.ErrorModel
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
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routeTables/{routeTableName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualHubRouteTableV2
    },
    201: {
      bodyMapper: Mappers.VirtualHubRouteTableV2
    },
    202: {
      bodyMapper: Mappers.VirtualHubRouteTableV2
    },
    204: {
      bodyMapper: Mappers.VirtualHubRouteTableV2
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.virtualHubRouteTableV2Parameters,
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
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routeTables/{routeTableName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorModel
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routeTables",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ListVirtualHubRouteTableV2SResult
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
      bodyMapper: Mappers.ListVirtualHubRouteTableV2SResult
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
