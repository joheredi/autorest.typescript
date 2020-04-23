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
  HardwareComponentGroupsListByDeviceResponse,
  ControllerPowerStateChangeRequest
} from "../models";

/**
 * Class representing a HardwareComponentGroups.
 */
export class HardwareComponentGroups {
  private readonly client: StorSimple8000SeriesManagementClient;

  /**
   * Initialize a new instance of the class HardwareComponentGroups class.
   * @param client Reference to the service client
   */
  constructor(client: StorSimple8000SeriesManagementClient) {
    this.client = client;
  }

  /**
   * Lists the hardware component groups at device-level.
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
  ): Promise<HardwareComponentGroupsListByDeviceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, deviceName, options: operationOptions },
      listByDeviceOperationSpec
    ) as Promise<HardwareComponentGroupsListByDeviceResponse>;
  }

  /**
   * Changes the power state of the controller.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param deviceName The device name
   * @param parameters The controller power state change request.
   * @param hardwareComponentGroupName The hardware component group name.
   * @param options The options parameters.
   */
  async changeControllerPowerState(
    resourceGroupName: string,
    managerName: string,
    deviceName: string,
    parameters: ControllerPowerStateChangeRequest,
    hardwareComponentGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      managerName,
      deviceName,
      parameters,
      hardwareComponentGroupName,
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
      changeControllerPowerStateOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: changeControllerPowerStateOperationSpec,
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/hardwareComponentGroups",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.HardwareComponentGroupList
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
const changeControllerPowerStateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/devices/{deviceName}/hardwareComponentGroups/{hardwareComponentGroupName}/changeControllerPowerState",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  requestBody: Parameters.parameters19,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.deviceName,
    Parameters.hardwareComponentGroupName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
