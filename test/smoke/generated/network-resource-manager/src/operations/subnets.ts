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
  SubnetsGetOptionalParams,
  SubnetsGetResponse,
  Subnet,
  SubnetsCreateOrUpdateResponse,
  PrepareNetworkPoliciesRequest,
  UnprepareNetworkPoliciesRequest,
  SubnetsListResponse,
  SubnetsListNextResponse
} from "../models";

/**
 * Class representing a Subnets.
 */
export class Subnets {
  private readonly client: NetworkManagementClient;

  /**
   * Initialize a new instance of the class Subnets class.
   * @param client Reference to the service client
   */
  constructor(client: NetworkManagementClient) {
    this.client = client;
  }

  /**
   * Deletes the specified subnet.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkName The name of the virtual network.
   * @param subnetName The name of the subnet.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkName,
      subnetName,
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
   * Gets the specified subnet by virtual network and resource group.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkName The name of the virtual network.
   * @param subnetName The name of the subnet.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    options?: SubnetsGetOptionalParams
  ): Promise<SubnetsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkName,
      subnetName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<SubnetsGetResponse>;
  }

  /**
   * Creates or updates a subnet in the specified virtual network.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkName The name of the virtual network.
   * @param subnetName The name of the subnet.
   * @param subnetParameters Parameters supplied to the create or update subnet operation.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    subnetParameters: Subnet,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<SubnetsCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkName,
      subnetName,
      subnetParameters,
      options: this.getOperationOptions(options, "azure-async-operation")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        SubnetsCreateOrUpdateResponse
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
   * Prepares a subnet by applying network intent policies.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkName The name of the virtual network.
   * @param subnetName The name of the subnet.
   * @param prepareNetworkPoliciesRequestParameters Parameters supplied to prepare subnet by applying
   *                                                network intent policies.
   * @param options The options parameters.
   */
  async prepareNetworkPolicies(
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    prepareNetworkPoliciesRequestParameters: PrepareNetworkPoliciesRequest,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkName,
      subnetName,
      prepareNetworkPoliciesRequestParameters,
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
      prepareNetworkPoliciesOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: prepareNetworkPoliciesOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * Unprepares a subnet by removing network intent policies.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkName The name of the virtual network.
   * @param subnetName The name of the subnet.
   * @param unprepareNetworkPoliciesRequestParameters Parameters supplied to unprepare subnet to remove
   *                                                  network intent policies.
   * @param options The options parameters.
   */
  async unprepareNetworkPolicies(
    resourceGroupName: string,
    virtualNetworkName: string,
    subnetName: string,
    unprepareNetworkPoliciesRequestParameters: UnprepareNetworkPoliciesRequest,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkName,
      subnetName,
      unprepareNetworkPoliciesRequestParameters,
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
      unprepareNetworkPoliciesOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: unprepareNetworkPoliciesOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * Gets all subnets in a virtual network.
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkName The name of the virtual network.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    virtualNetworkName: string,
    options?: coreHttp.OperationOptions
  ): Promise<SubnetsListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<SubnetsListResponse>;
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group.
   * @param virtualNetworkName The name of the virtual network.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    resourceGroupName: string,
    virtualNetworkName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<SubnetsListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualNetworkName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<SubnetsListNextResponse>;
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

const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}",
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
    Parameters.virtualNetworkName,
    Parameters.subnetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Subnet
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.virtualNetworkName,
    Parameters.subnetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Subnet
    },
    201: {
      bodyMapper: Mappers.Subnet
    },
    202: {
      bodyMapper: Mappers.Subnet
    },
    204: {
      bodyMapper: Mappers.Subnet
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.subnetParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.virtualNetworkName,
    Parameters.subnetName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const prepareNetworkPoliciesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}/PrepareNetworkPolicies",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.prepareNetworkPoliciesRequestParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.virtualNetworkName,
    Parameters.subnetName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const unprepareNetworkPoliciesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}/UnprepareNetworkPolicies",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.unprepareNetworkPoliciesRequestParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.virtualNetworkName,
    Parameters.subnetName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SubnetListResult
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
    Parameters.virtualNetworkName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SubnetListResult
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
    Parameters.virtualNetworkName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
