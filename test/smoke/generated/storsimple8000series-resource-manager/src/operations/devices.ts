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
  ConfigureDeviceRequest,
  DevicesListByManagerOptionalParams,
  DevicesListByManagerResponse,
  DevicesGetOptionalParams,
  DevicesGetResponse,
  DevicePatch,
  DevicesUpdateResponse,
  DevicesListFailoverSetsResponse,
  DevicesListMetricsResponse,
  DevicesListMetricDefinitionResponse,
  DevicesGetUpdateSummaryResponse,
  FailoverRequest,
  ListFailoverTargetsRequest,
  DevicesListFailoverTargetsResponse
} from "../models";

/**
 * Class representing a Devices.
 */
export class Devices {
  private readonly client: StorSimple8000SeriesManagementClient;

  /**
   * Initialize a new instance of the class Devices class.
   * @param client Reference to the service client
   */
  constructor(client: StorSimple8000SeriesManagementClient) {
    this.client = client;
  }

  /**
   * Complete minimal setup before using the device.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param parameters The minimal properties to configure a device.
   * @param options The options parameters.
   */
  async configure(
    resourceGroupName: string,
    managerName: string,
    parameters: ConfigureDeviceRequest,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      managerName,
      parameters,
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
      configureOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: configureOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Returns the list of devices for the specified manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  listByManager(
    resourceGroupName: string,
    managerName: string,
    options?: DevicesListByManagerOptionalParams
  ): Promise<DevicesListByManagerResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options: operationOptions },
      listByManagerOperationSpec
    ) as Promise<DevicesListByManagerResponse>;
  }

  /**
   * Returns the properties of the specified device.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    options?: DevicesGetOptionalParams
  ): Promise<DevicesGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, deviceName, options: operationOptions },
      getOperationSpec
    ) as Promise<DevicesGetResponse>;
  }

  /**
   * Deletes the device.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      managerName,
      deviceName,
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
   * Patches the device.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name
   * @param parameters Patch representation of the device.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    parameters: DevicePatch,
    options?: coreHttp.OperationOptions
  ): Promise<DevicesUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managerName,
        deviceName,
        parameters,
        options: operationOptions
      },
      updateOperationSpec
    ) as Promise<DevicesUpdateResponse>;
  }

  /**
   * Authorizes the specified device for service data encryption key rollover.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name
   * @param options The options parameters.
   */
  authorizeForServiceEncryptionKeyRollover(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, deviceName, options: operationOptions },
      authorizeForServiceEncryptionKeyRolloverOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Deactivates the device.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name
   * @param options The options parameters.
   */
  async deactivate(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      managerName,
      deviceName,
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
      deactivateOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: deactivateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Downloads and installs the updates on the device.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name
   * @param options The options parameters.
   */
  async installUpdates(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      managerName,
      deviceName,
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
      installUpdatesOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: installUpdatesOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Returns all failover sets for a given device and their eligibility for participating in a failover.
   * A failover set refers to a set of volume containers that need to be failed-over as a single unit to
   * maintain data integrity.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name
   * @param options The options parameters.
   */
  listFailoverSets(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DevicesListFailoverSetsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, deviceName, options: operationOptions },
      listFailoverSetsOperationSpec
    ) as Promise<DevicesListFailoverSetsResponse>;
  }

  /**
   * Gets the metrics for the specified device.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name
   * @param filter OData Filter options
   * @param options The options parameters.
   */
  listMetrics(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    filter: string,
    options?: coreHttp.OperationOptions
  ): Promise<DevicesListMetricsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managerName,
        deviceName,
        filter,
        options: operationOptions
      },
      listMetricsOperationSpec
    ) as Promise<DevicesListMetricsResponse>;
  }

  /**
   * Gets the metric definitions for the specified device.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name
   * @param options The options parameters.
   */
  listMetricDefinition(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DevicesListMetricDefinitionResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, deviceName, options: operationOptions },
      listMetricDefinitionOperationSpec
    ) as Promise<DevicesListMetricDefinitionResponse>;
  }

  /**
   * Scans for updates on the device.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name
   * @param options The options parameters.
   */
  async scanForUpdates(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      managerName,
      deviceName,
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
      scanForUpdatesOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: scanForUpdatesOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Returns the update summary of the specified device name.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name
   * @param options The options parameters.
   */
  getUpdateSummary(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DevicesGetUpdateSummaryResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, deviceName, options: operationOptions },
      getUpdateSummaryOperationSpec
    ) as Promise<DevicesGetUpdateSummaryResponse>;
  }

  /**
   * Failovers a set of volume containers from a specified source device to a target device.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param parameters FailoverRequest containing the source device and the list of volume containers to
   *                   be failed over.
   * @param sourceDeviceName The source device name on which failover is performed.
   * @param options The options parameters.
   */
  async failover(
    resourceGroupName: string,
    managerName: string,
    parameters: FailoverRequest,
    sourceDeviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      managerName,
      parameters,
      sourceDeviceName,
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
      failoverOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: failoverOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Given a list of volume containers to be failed over from a source device, this method returns the
   * eligibility result, as a failover target, for all devices under that resource.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param sourceDeviceName The source device name on which failover is performed.
   * @param parameters ListFailoverTargetsRequest containing the list of volume containers to be failed
   *                   over.
   * @param options The options parameters.
   */
  listFailoverTargets(
    resourceGroupName: string,
    managerName: string,
    sourceDeviceName: string,
    parameters: ListFailoverTargetsRequest,
    options?: coreHttp.OperationOptions
  ): Promise<DevicesListFailoverTargetsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managerName,
        sourceDeviceName,
        parameters,
        options: operationOptions
      },
      listFailoverTargetsOperationSpec
    ) as Promise<DevicesListFailoverTargetsResponse>;
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

const configureOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/configureDevice",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.parameters8,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const listByManagerOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DeviceList
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Device
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.deviceName
  ],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
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
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.Device
    }
  },
  requestBody: Parameters.parameters9,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.deviceName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const authorizeForServiceEncryptionKeyRolloverOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/authorizeForServiceEncryptionKeyRollover",
  httpMethod: "POST",
  responses: { 204: {} },
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
const deactivateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/deactivate",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
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
const installUpdatesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/installUpdates",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
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
const listFailoverSetsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/listFailoverSets",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.FailoverSetsList
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
const listMetricsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/metrics",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MetricList
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter1],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.deviceName
  ],
  serializer
};
const listMetricDefinitionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/metricsDefinitions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MetricDefinitionList
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
const scanForUpdatesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/scanForUpdates",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
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
const getUpdateSummaryOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/updateSummary/default",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Updates
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
const failoverOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{sourceDeviceName}/failover",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.parameters10,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.sourceDeviceName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const listFailoverTargetsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{sourceDeviceName}/listFailoverTargets",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.FailoverTargetsList
    }
  },
  requestBody: Parameters.parameters11,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.sourceDeviceName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
