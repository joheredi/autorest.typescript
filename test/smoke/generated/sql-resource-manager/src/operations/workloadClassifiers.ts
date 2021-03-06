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
import { SqlManagementClient } from "../sqlManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  WorkloadClassifiersGetResponse,
  WorkloadClassifier,
  WorkloadClassifiersCreateOrUpdateResponse,
  WorkloadClassifiersListByWorkloadGroupResponse,
  WorkloadClassifiersListByWorkloadGroupNextResponse
} from "../models";

/**
 * Class representing a WorkloadClassifiers.
 */
export class WorkloadClassifiers {
  private readonly client: SqlManagementClient;

  /**
   * Initialize a new instance of the class WorkloadClassifiers class.
   * @param client Reference to the service client
   */
  constructor(client: SqlManagementClient) {
    this.client = client;
  }

  /**
   * Gets a workload classifier
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database.
   * @param workloadGroupName The name of the workload group from which to receive the classifier from.
   * @param workloadClassifierName The name of the workload classifier.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    workloadClassifierName: string,
    options?: coreHttp.OperationOptions
  ): Promise<WorkloadClassifiersGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      databaseName,
      workloadGroupName,
      workloadClassifierName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<WorkloadClassifiersGetResponse>;
  }

  /**
   * Creates or updates a workload classifier.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database.
   * @param workloadGroupName The name of the workload group from which to receive the classifier from.
   * @param workloadClassifierName The name of the workload classifier to create/update.
   * @param parameters The properties of the workload classifier.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    workloadClassifierName: string,
    parameters: WorkloadClassifier,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<WorkloadClassifiersCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      databaseName,
      workloadGroupName,
      workloadClassifierName,
      parameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        WorkloadClassifiersCreateOrUpdateResponse
      >;
    const initialOperationResult = await sendOperation(
      operationArguments,
      createOrUpdateOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createOrUpdateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Deletes a workload classifier.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database.
   * @param workloadGroupName The name of the workload group from which to receive the classifier from.
   * @param workloadClassifierName The name of the workload classifier to delete.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    workloadClassifierName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      databaseName,
      workloadGroupName,
      workloadClassifierName,
      options: this.getOperationOptions(options, "undefined")
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
      sendOperation
    });
  }

  /**
   * Gets the list of workload classifiers for a workload group
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database.
   * @param workloadGroupName The name of the workload group from which to receive the classifiers from.
   * @param options The options parameters.
   */
  listByWorkloadGroup(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<WorkloadClassifiersListByWorkloadGroupResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      databaseName,
      workloadGroupName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByWorkloadGroupOperationSpec
    ) as Promise<WorkloadClassifiersListByWorkloadGroupResponse>;
  }

  /**
   * ListByWorkloadGroupNext
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database.
   * @param workloadGroupName The name of the workload group from which to receive the classifiers from.
   * @param nextLink The nextLink from the previous successful call to the ListByWorkloadGroup method.
   * @param options The options parameters.
   */
  listByWorkloadGroupNext(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    workloadGroupName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<WorkloadClassifiersListByWorkloadGroupNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      serverName,
      databaseName,
      workloadGroupName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByWorkloadGroupNextOperationSpec
    ) as Promise<WorkloadClassifiersListByWorkloadGroupNextResponse>;
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/workloadGroups/{workloadGroupName}/workloadClassifiers/{workloadClassifierName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.WorkloadClassifier
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion5],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.workloadGroupName,
    Parameters.workloadClassifierName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/workloadGroups/{workloadGroupName}/workloadClassifiers/{workloadClassifierName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.WorkloadClassifier
    },
    201: {
      bodyMapper: Mappers.WorkloadClassifier
    },
    202: {
      bodyMapper: Mappers.WorkloadClassifier
    },
    204: {
      bodyMapper: Mappers.WorkloadClassifier
    },
    default: {}
  },
  requestBody: Parameters.parameters66,
  queryParameters: [Parameters.apiVersion5],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.workloadGroupName,
    Parameters.workloadClassifierName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/workloadGroups/{workloadGroupName}/workloadClassifiers/{workloadClassifierName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {}, default: {} },
  queryParameters: [Parameters.apiVersion5],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.workloadGroupName,
    Parameters.workloadClassifierName
  ],
  serializer
};
const listByWorkloadGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/workloadGroups/{workloadGroupName}/workloadClassifiers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.WorkloadClassifierListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion5],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.workloadGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByWorkloadGroupNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.WorkloadClassifierListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion5],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.serverName,
    Parameters.databaseName,
    Parameters.nextLink,
    Parameters.workloadGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
