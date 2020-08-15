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
  DedicatedHost,
  DedicatedHostsCreateOrUpdateResponse,
  DedicatedHostUpdate,
  DedicatedHostsUpdateResponse,
  DedicatedHostsGetResponse,
  DedicatedHostsListByHostGroupResponse,
  DedicatedHostsListByHostGroupNextResponse
} from "../models";

/**
 * Class representing a DedicatedHosts.
 */
export class DedicatedHosts {
  private readonly client: ComputeManagementClient;

  /**
   * Initialize a new instance of the class DedicatedHosts class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClient) {
    this.client = client;
  }

  /**
   * Create or update a dedicated host .
   * @param resourceGroupName The name of the resource group.
   * @param hostGroupName The name of the dedicated host group.
   * @param hostName The name of the dedicated host .
   * @param parameters Parameters supplied to the Create Dedicated Host.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    parameters: DedicatedHost,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<DedicatedHostsCreateOrUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      hostGroupName,
      hostName,
      parameters,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        DedicatedHostsCreateOrUpdateResponse
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
   * Update an dedicated host .
   * @param resourceGroupName The name of the resource group.
   * @param hostGroupName The name of the dedicated host group.
   * @param hostName The name of the dedicated host .
   * @param parameters Parameters supplied to the Update Dedicated Host operation.
   * @param options The options parameters.
   */
  async update(
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    parameters: DedicatedHostUpdate,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<DedicatedHostsUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      hostGroupName,
      hostName,
      parameters,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        DedicatedHostsUpdateResponse
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
   * Delete a dedicated host.
   * @param resourceGroupName The name of the resource group.
   * @param hostGroupName The name of the dedicated host group.
   * @param hostName The name of the dedicated host.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      hostGroupName,
      hostName,
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
   * Retrieves information about a dedicated host.
   * @param resourceGroupName The name of the resource group.
   * @param hostGroupName The name of the dedicated host group.
   * @param hostName The name of the dedicated host.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    hostGroupName: string,
    hostName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DedicatedHostsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, hostGroupName, hostName, options: operationOptions },
      getOperationSpec
    ) as Promise<DedicatedHostsGetResponse>;
  }

  /**
   * Lists all of the dedicated hosts in the specified dedicated host group. Use the nextLink property in
   * the response to get the next page of dedicated hosts.
   * @param resourceGroupName The name of the resource group.
   * @param hostGroupName The name of the dedicated host group.
   * @param options The options parameters.
   */
  listByHostGroup(
    resourceGroupName: string,
    hostGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DedicatedHostsListByHostGroupResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, hostGroupName, options: operationOptions },
      listByHostGroupOperationSpec
    ) as Promise<DedicatedHostsListByHostGroupResponse>;
  }

  /**
   * ListByHostGroupNext
   * @param resourceGroupName The name of the resource group.
   * @param hostGroupName The name of the dedicated host group.
   * @param nextLink The nextLink from the previous successful call to the ListByHostGroup method.
   * @param options The options parameters.
   */
  listByHostGroupNext(
    resourceGroupName: string,
    hostGroupName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<DedicatedHostsListByHostGroupNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, hostGroupName, nextLink, options: operationOptions },
      listByHostGroupNextOperationSpec
    ) as Promise<DedicatedHostsListByHostGroupNextResponse>;
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.DedicatedHost
    },
    201: {
      bodyMapper: Mappers.DedicatedHost
    },
    202: {
      bodyMapper: Mappers.DedicatedHost
    },
    204: {
      bodyMapper: Mappers.DedicatedHost
    }
  },
  requestBody: Parameters.parameters6,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hostGroupName,
    Parameters.hostName
  ],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.DedicatedHost
    },
    201: {
      bodyMapper: Mappers.DedicatedHost
    },
    202: {
      bodyMapper: Mappers.DedicatedHost
    },
    204: {
      bodyMapper: Mappers.DedicatedHost
    }
  },
  requestBody: Parameters.parameters7,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hostGroupName,
    Parameters.hostName
  ],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hostGroupName,
    Parameters.hostName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DedicatedHost
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand1],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hostGroupName,
    Parameters.hostName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByHostGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DedicatedHostListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hostGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByHostGroupNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DedicatedHostListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.hostGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
