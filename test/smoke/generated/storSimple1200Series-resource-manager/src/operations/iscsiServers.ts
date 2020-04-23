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
import { StorSimpleManagementClient } from "../storSimpleManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  IscsiServersListByDeviceResponse,
  IscsiServersGetResponse,
  IscsiServer,
  IscsiServersCreateOrUpdateResponse,
  IscsiServersListMetricsOptionalParams,
  IscsiServersListMetricsResponse,
  IscsiServersListMetricDefinitionResponse,
  IscsiServersListByManagerResponse
} from "../models";

/**
 * Class representing a IscsiServers.
 */
export class IscsiServers {
  private readonly client: StorSimpleManagementClient;

  /**
   * Initialize a new instance of the class IscsiServers class.
   * @param client Reference to the service client
   */
  constructor(client: StorSimpleManagementClient) {
    this.client = client;
  }

  /**
   * Retrieves all the iSCSI in a device.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name.
   * @param options The options parameters.
   */
  listByDevice(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<IscsiServersListByDeviceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, deviceName, options: operationOptions },
      listByDeviceOperationSpec
    ) as Promise<IscsiServersListByDeviceResponse>;
  }

  /**
   * Returns the properties of the specified iSCSI server name.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name.
   * @param iscsiServerName The iSCSI server name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    iscsiServerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<IscsiServersGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managerName,
        deviceName,
        iscsiServerName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<IscsiServersGetResponse>;
  }

  /**
   * Creates or updates the iSCSI server.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name.
   * @param iscsiServerName The iSCSI server name.
   * @param iscsiServer The iSCSI server.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    iscsiServerName: string,
    iscsiServer: IscsiServer,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<IscsiServersCreateOrUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      managerName,
      deviceName,
      iscsiServerName,
      iscsiServer,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        IscsiServersCreateOrUpdateResponse
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
   * Deletes the iSCSI server.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name.
   * @param iscsiServerName The iSCSI server name.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    iscsiServerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      managerName,
      deviceName,
      iscsiServerName,
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
   * Backup the iSCSI server now.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name.
   * @param iscsiServerName The iSCSI server name.
   * @param options The options parameters.
   */
  async backupNow(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    iscsiServerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      managerName,
      deviceName,
      iscsiServerName,
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

  /**
   * Gets the iSCSI server metrics
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name.
   * @param iscsiServerName The iSCSI server name.
   * @param options The options parameters.
   */
  listMetrics(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    iscsiServerName: string,
    options?: IscsiServersListMetricsOptionalParams
  ): Promise<IscsiServersListMetricsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managerName,
        deviceName,
        iscsiServerName,
        options: operationOptions
      },
      listMetricsOperationSpec
    ) as Promise<IscsiServersListMetricsResponse>;
  }

  /**
   * Retrieves metric definitions for all metrics aggregated at iSCSI server.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name.
   * @param iscsiServerName The iSCSI server name.
   * @param options The options parameters.
   */
  listMetricDefinition(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    iscsiServerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<IscsiServersListMetricDefinitionResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managerName,
        deviceName,
        iscsiServerName,
        options: operationOptions
      },
      listMetricDefinitionOperationSpec
    ) as Promise<IscsiServersListMetricDefinitionResponse>;
  }

  /**
   * Retrieves all the iSCSI servers in a manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  listByManager(
    resourceGroupName: string,
    managerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<IscsiServersListByManagerResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options: operationOptions },
      listByManagerOperationSpec
    ) as Promise<IscsiServersListByManagerResponse>;
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/iscsiservers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IscsiServerList
    },
    default: {
      bodyMapper: Mappers.ErrorModel
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/iscsiservers/{iscsiServerName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IscsiServer
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.deviceName,
    Parameters.iscsiServerName
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/iscsiservers/{iscsiServerName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.IscsiServer
    },
    201: {
      bodyMapper: Mappers.IscsiServer
    },
    202: {
      bodyMapper: Mappers.IscsiServer
    },
    204: {
      bodyMapper: Mappers.IscsiServer
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.iscsiServer,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.deviceName,
    Parameters.iscsiServerName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/iscsiservers/{iscsiServerName}",
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
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.deviceName,
    Parameters.iscsiServerName
  ],
  serializer
};
const backupNowOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/iscsiservers/{iscsiServerName}/backup",
  httpMethod: "POST",
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
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.deviceName,
    Parameters.iscsiServerName
  ],
  serializer
};
const listMetricsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/iscsiservers/{iscsiServerName}/metrics",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MetricList
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.deviceName,
    Parameters.iscsiServerName
  ],
  serializer
};
const listMetricDefinitionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/iscsiservers/{iscsiServerName}/metricsDefinitions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MetricDefinitionList
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.deviceName,
    Parameters.iscsiServerName
  ],
  serializer
};
const listByManagerOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/iscsiservers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IscsiServerList
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  serializer
};
