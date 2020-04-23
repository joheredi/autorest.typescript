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
import { SqlVirtualMachineManagementClient } from "../sqlVirtualMachineManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  AvailabilityGroupListenersGetResponse,
  AvailabilityGroupListener,
  AvailabilityGroupListenersCreateOrUpdateResponse,
  AvailabilityGroupListenersListByGroupResponse,
  AvailabilityGroupListenersListByGroupNextResponse
} from "../models";

/**
 * Class representing a AvailabilityGroupListeners.
 */
export class AvailabilityGroupListeners {
  private readonly client: SqlVirtualMachineManagementClient;

  /**
   * Initialize a new instance of the class AvailabilityGroupListeners class.
   * @param client Reference to the service client
   */
  constructor(client: SqlVirtualMachineManagementClient) {
    this.client = client;
  }

  /**
   * Gets an availability group listener.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param sqlVirtualMachineGroupName Name of the SQL virtual machine group.
   * @param availabilityGroupListenerName Name of the availability group listener.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    availabilityGroupListenerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<AvailabilityGroupListenersGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        sqlVirtualMachineGroupName,
        availabilityGroupListenerName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<AvailabilityGroupListenersGetResponse>;
  }

  /**
   * Creates or updates an availability group listener.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param sqlVirtualMachineGroupName Name of the SQL virtual machine group.
   * @param availabilityGroupListenerName Name of the availability group listener.
   * @param parameters The availability group listener.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    availabilityGroupListenerName: string,
    parameters: AvailabilityGroupListener,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<AvailabilityGroupListenersCreateOrUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      sqlVirtualMachineGroupName,
      availabilityGroupListenerName,
      parameters,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        AvailabilityGroupListenersCreateOrUpdateResponse
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
   * Deletes an availability group listener.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param sqlVirtualMachineGroupName Name of the SQL virtual machine group.
   * @param availabilityGroupListenerName Name of the availability group listener.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    availabilityGroupListenerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      sqlVirtualMachineGroupName,
      availabilityGroupListenerName,
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
   * Lists all availability group listeners in a SQL virtual machine group.
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param sqlVirtualMachineGroupName Name of the SQL virtual machine group.
   * @param options The options parameters.
   */
  listByGroup(
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<AvailabilityGroupListenersListByGroupResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        sqlVirtualMachineGroupName,
        options: operationOptions
      },
      listByGroupOperationSpec
    ) as Promise<AvailabilityGroupListenersListByGroupResponse>;
  }

  /**
   * ListByGroupNext
   * @param resourceGroupName Name of the resource group that contains the resource. You can obtain this
   *                          value from the Azure Resource Manager API or the portal.
   * @param sqlVirtualMachineGroupName Name of the SQL virtual machine group.
   * @param nextLink The nextLink from the previous successful call to the ListByGroup method.
   * @param options The options parameters.
   */
  listByGroupNext(
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<AvailabilityGroupListenersListByGroupNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        sqlVirtualMachineGroupName,
        nextLink,
        options: operationOptions
      },
      listByGroupNextOperationSpec
    ) as Promise<AvailabilityGroupListenersListByGroupNextResponse>;
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}/availabilityGroupListeners/{availabilityGroupListenerName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AvailabilityGroupListener
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.sqlVirtualMachineGroupName,
    Parameters.availabilityGroupListenerName,
    Parameters.subscriptionId
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}/availabilityGroupListeners/{availabilityGroupListenerName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.AvailabilityGroupListener
    },
    201: {
      bodyMapper: Mappers.AvailabilityGroupListener
    },
    202: {
      bodyMapper: Mappers.AvailabilityGroupListener
    },
    204: {
      bodyMapper: Mappers.AvailabilityGroupListener
    },
    default: {}
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.sqlVirtualMachineGroupName,
    Parameters.availabilityGroupListenerName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}/availabilityGroupListeners/{availabilityGroupListenerName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {}, default: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.sqlVirtualMachineGroupName,
    Parameters.availabilityGroupListenerName,
    Parameters.subscriptionId
  ],
  serializer
};
const listByGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}/availabilityGroupListeners",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AvailabilityGroupListenerListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.sqlVirtualMachineGroupName,
    Parameters.subscriptionId
  ],
  serializer
};
const listByGroupNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AvailabilityGroupListenerListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.sqlVirtualMachineGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  serializer
};
