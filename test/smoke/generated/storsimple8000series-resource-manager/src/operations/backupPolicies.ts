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
import { StorSimple8000SeriesManagementClient } from "../storSimple8000SeriesManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  BackupPoliciesListByDeviceResponse,
  BackupPoliciesGetResponse,
  BackupPolicy,
  BackupPoliciesCreateOrUpdateResponse
} from "../models";

/**
 * Class representing a BackupPolicies.
 */
export class BackupPolicies {
  private readonly client: StorSimple8000SeriesManagementClient;

  /**
   * Initialize a new instance of the class BackupPolicies class.
   * @param client Reference to the service client
   */
  constructor(client: StorSimple8000SeriesManagementClient) {
    this.client = client;
  }

  /**
   * Gets all the backup policies in a device.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name
   * @param options The options parameters.
   */
  listByDevice(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<BackupPoliciesListByDeviceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, deviceName, options: operationOptions },
      listByDeviceOperationSpec
    ) as Promise<BackupPoliciesListByDeviceResponse>;
  }

  /**
   * Gets the properties of the specified backup policy name.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name
   * @param backupPolicyName The name of backup policy to be fetched.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    backupPolicyName: string,
    options?: coreHttp.OperationOptions
  ): Promise<BackupPoliciesGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managerName,
        deviceName,
        backupPolicyName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<BackupPoliciesGetResponse>;
  }

  /**
   * Creates or updates the backup policy.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name
   * @param parameters The backup policy.
   * @param backupPolicyName The name of the backup policy to be created/updated.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    parameters: BackupPolicy,
    backupPolicyName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<BackupPoliciesCreateOrUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      managerName,
      deviceName,
      parameters,
      backupPolicyName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        BackupPoliciesCreateOrUpdateResponse
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
   * Deletes the backup policy.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name
   * @param backupPolicyName The name of the backup policy.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    backupPolicyName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      managerName,
      deviceName,
      backupPolicyName,
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
   * Backup the backup policy now.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name
   * @param backupPolicyName The backup policy name.
   * @param backupType The backup Type. This can be cloudSnapshot or localSnapshot.
   * @param options The options parameters.
   */
  async backupNow(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    backupPolicyName: string,
    backupType: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      managerName,
      deviceName,
      backupPolicyName,
      backupType,
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
      backupNowOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: backupNowOperationSpec,
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

const listByDeviceOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/backupPolicies",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BackupPolicyList
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.deviceName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/backupPolicies/{backupPolicyName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BackupPolicy
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.deviceName,
    Parameters.backupPolicyName
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/backupPolicies/{backupPolicyName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.BackupPolicy
    },
    201: {
      bodyMapper: Mappers.BackupPolicy
    },
    202: {
      bodyMapper: Mappers.BackupPolicy
    },
    204: {
      bodyMapper: Mappers.BackupPolicy
    }
  },
  requestBody: Parameters.parameters16,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.deviceName,
    Parameters.backupPolicyName1
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/backupPolicies/{backupPolicyName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.deviceName,
    Parameters.backupPolicyName2
  ],
  serializer
};
const backupNowOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/backupPolicies/{backupPolicyName}/backup",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion, Parameters.backupType],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.deviceName,
    Parameters.backupPolicyName3
  ],
  serializer
};
