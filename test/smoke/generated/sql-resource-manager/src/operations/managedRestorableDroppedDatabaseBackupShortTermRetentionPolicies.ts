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
  ManagedShortTermRetentionPolicyName,
  ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesGetResponse,
  ManagedBackupShortTermRetentionPolicy,
  ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateResponse,
  ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateResponse,
  ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabaseResponse,
  ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabaseNextResponse
} from "../models";

/**
 * Class representing a ManagedRestorableDroppedDatabaseBackupShortTermRetentionPolicies.
 */
export class ManagedRestorableDroppedDatabaseBackupShortTermRetentionPolicies {
  private readonly client: SqlManagementClient;

  /**
   * Initialize a new instance of the class ManagedRestorableDroppedDatabaseBackupShortTermRetentionPolicies class.
   * @param client Reference to the service client
   */
  constructor(client: SqlManagementClient) {
    this.client = client;
  }

  /**
   * Gets a dropped database's short term retention policy.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param restorableDroppedDatabaseId
   * @param policyName The policy name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    managedInstanceName: string,
    restorableDroppedDatabaseId: string,
    policyName: ManagedShortTermRetentionPolicyName,
    options?: coreHttp.OperationOptions
  ): Promise<
    ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesGetResponse
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      managedInstanceName,
      restorableDroppedDatabaseId,
      policyName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<
      ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesGetResponse
    >;
  }

  /**
   * Sets a database's long term retention policy.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param restorableDroppedDatabaseId
   * @param policyName The policy name. Should always be "default".
   * @param parameters The long term retention policy info.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    managedInstanceName: string,
    restorableDroppedDatabaseId: string,
    policyName: ManagedShortTermRetentionPolicyName,
    parameters: ManagedBackupShortTermRetentionPolicy,
    options?: coreHttp.OperationOptions
  ): Promise<
    LROPoller<
      ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateResponse
    >
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      managedInstanceName,
      restorableDroppedDatabaseId,
      policyName,
      parameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesCreateOrUpdateResponse
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
   * Sets a database's long term retention policy.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param restorableDroppedDatabaseId
   * @param policyName The policy name. Should always be "default".
   * @param parameters The long term retention policy info.
   * @param options The options parameters.
   */
  async update(
    resourceGroupName: string,
    managedInstanceName: string,
    restorableDroppedDatabaseId: string,
    policyName: ManagedShortTermRetentionPolicyName,
    parameters: ManagedBackupShortTermRetentionPolicy,
    options?: coreHttp.OperationOptions
  ): Promise<
    LROPoller<
      ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateResponse
    >
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      managedInstanceName,
      restorableDroppedDatabaseId,
      policyName,
      parameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesUpdateResponse
      >;
    const initialOperationResult = await sendOperation(
      operationArguments,
      updateOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: updateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets a dropped database's short term retention policy list.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param restorableDroppedDatabaseId
   * @param options The options parameters.
   */
  listByRestorableDroppedDatabase(
    resourceGroupName: string,
    managedInstanceName: string,
    restorableDroppedDatabaseId: string,
    options?: coreHttp.OperationOptions
  ): Promise<
    ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabaseResponse
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      managedInstanceName,
      restorableDroppedDatabaseId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByRestorableDroppedDatabaseOperationSpec
    ) as Promise<
      ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabaseResponse
    >;
  }

  /**
   * ListByRestorableDroppedDatabaseNext
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param restorableDroppedDatabaseId
   * @param nextLink The nextLink from the previous successful call to the
   *                 ListByRestorableDroppedDatabase method.
   * @param options The options parameters.
   */
  listByRestorableDroppedDatabaseNext(
    resourceGroupName: string,
    managedInstanceName: string,
    restorableDroppedDatabaseId: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<
    ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabaseNextResponse
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      managedInstanceName,
      restorableDroppedDatabaseId,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByRestorableDroppedDatabaseNextOperationSpec
    ) as Promise<
      ManagedRestorableDroppedDatabaseBackupShortTermRetentionPoliciesListByRestorableDroppedDatabaseNextResponse
    >;
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/restorableDroppedDatabases/{restorableDroppedDatabaseId}/backupShortTermRetentionPolicies/{policyName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedBackupShortTermRetentionPolicy
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managedInstanceName,
    Parameters.policyName1,
    Parameters.restorableDroppedDatabaseId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/restorableDroppedDatabases/{restorableDroppedDatabaseId}/backupShortTermRetentionPolicies/{policyName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedBackupShortTermRetentionPolicy
    },
    201: {
      bodyMapper: Mappers.ManagedBackupShortTermRetentionPolicy
    },
    202: {
      bodyMapper: Mappers.ManagedBackupShortTermRetentionPolicy
    },
    204: {
      bodyMapper: Mappers.ManagedBackupShortTermRetentionPolicy
    },
    default: {}
  },
  requestBody: Parameters.parameters40,
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managedInstanceName,
    Parameters.policyName1,
    Parameters.restorableDroppedDatabaseId
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/restorableDroppedDatabases/{restorableDroppedDatabaseId}/backupShortTermRetentionPolicies/{policyName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedBackupShortTermRetentionPolicy
    },
    201: {
      bodyMapper: Mappers.ManagedBackupShortTermRetentionPolicy
    },
    202: {
      bodyMapper: Mappers.ManagedBackupShortTermRetentionPolicy
    },
    204: {
      bodyMapper: Mappers.ManagedBackupShortTermRetentionPolicy
    },
    default: {}
  },
  requestBody: Parameters.parameters40,
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managedInstanceName,
    Parameters.policyName1,
    Parameters.restorableDroppedDatabaseId
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listByRestorableDroppedDatabaseOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/restorableDroppedDatabases/{restorableDroppedDatabaseId}/backupShortTermRetentionPolicies",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedBackupShortTermRetentionPolicyListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managedInstanceName,
    Parameters.restorableDroppedDatabaseId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByRestorableDroppedDatabaseNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagedBackupShortTermRetentionPolicyListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion4],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink,
    Parameters.managedInstanceName,
    Parameters.restorableDroppedDatabaseId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
