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
import { FabricAdminClient } from "../fabricAdminClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  InfraRoleInstancesGetResponse,
  InfraRoleInstancesListOptionalParams,
  InfraRoleInstancesListResponse,
  InfraRoleInstancesListNextOptionalParams,
  InfraRoleInstancesListNextResponse
} from "../models";

/**
 * Class representing a InfraRoleInstances.
 */
export class InfraRoleInstances {
  private readonly client: FabricAdminClient;

  /**
   * Initialize a new instance of the class InfraRoleInstances class.
   * @param client Reference to the service client
   */
  constructor(client: FabricAdminClient) {
    this.client = client;
  }

  /**
   * Power off an infrastructure role instance.
   * @param resourceGroupName Name of the resource group.
   * @param location Location of the resource.
   * @param infraRoleInstance Name of an infrastructure role instance.
   * @param options The options parameters.
   */
  async powerOff(
    resourceGroupName: string,
    location: string,
    infraRoleInstance: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      location,
      infraRoleInstance,
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
      powerOffOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: powerOffOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Power on an infrastructure role instance.
   * @param resourceGroupName Name of the resource group.
   * @param location Location of the resource.
   * @param infraRoleInstance Name of an infrastructure role instance.
   * @param options The options parameters.
   */
  async powerOn(
    resourceGroupName: string,
    location: string,
    infraRoleInstance: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      location,
      infraRoleInstance,
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
      powerOnOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: powerOnOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Shut down an infrastructure role instance.
   * @param resourceGroupName Name of the resource group.
   * @param location Location of the resource.
   * @param infraRoleInstance Name of an infrastructure role instance.
   * @param options The options parameters.
   */
  async shutdown(
    resourceGroupName: string,
    location: string,
    infraRoleInstance: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      location,
      infraRoleInstance,
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
      shutdownOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: shutdownOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Reboot an infrastructure role instance.
   * @param resourceGroupName Name of the resource group.
   * @param location Location of the resource.
   * @param infraRoleInstance Name of an infrastructure role instance.
   * @param options The options parameters.
   */
  async reboot(
    resourceGroupName: string,
    location: string,
    infraRoleInstance: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      location,
      infraRoleInstance,
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
      rebootOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: rebootOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Return the requested infrastructure role instance.
   * @param resourceGroupName Name of the resource group.
   * @param location Location of the resource.
   * @param infraRoleInstance Name of an infrastructure role instance.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    location: string,
    infraRoleInstance: string,
    options?: coreHttp.OperationOptions
  ): Promise<InfraRoleInstancesGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        location,
        infraRoleInstance,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<InfraRoleInstancesGetResponse>;
  }

  /**
   * Returns a list of all infrastructure role instances at a location.
   * @param resourceGroupName Name of the resource group.
   * @param location Location of the resource.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    location: string,
    options?: InfraRoleInstancesListOptionalParams
  ): Promise<InfraRoleInstancesListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, location, options: operationOptions },
      listOperationSpec
    ) as Promise<InfraRoleInstancesListResponse>;
  }

  /**
   * ListNext
   * @param resourceGroupName Name of the resource group.
   * @param location Location of the resource.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    resourceGroupName: string,
    location: string,
    nextLink: string,
    options?: InfraRoleInstancesListNextOptionalParams
  ): Promise<InfraRoleInstancesListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, location, nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<InfraRoleInstancesListNextResponse>;
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

const powerOffOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric.Admin/fabricLocations/{location}/infraRoleInstances/{infraRoleInstance}/PowerOff",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location,
    Parameters.infraRoleInstance
  ],
  serializer
};
const powerOnOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric.Admin/fabricLocations/{location}/infraRoleInstances/{infraRoleInstance}/PowerOn",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location,
    Parameters.infraRoleInstance
  ],
  serializer
};
const shutdownOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric.Admin/fabricLocations/{location}/infraRoleInstances/{infraRoleInstance}/Shutdown",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location,
    Parameters.infraRoleInstance
  ],
  serializer
};
const rebootOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric.Admin/fabricLocations/{location}/infraRoleInstances/{infraRoleInstance}/Reboot",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location,
    Parameters.infraRoleInstance
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric.Admin/fabricLocations/{location}/infraRoleInstances/{infraRoleInstance}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.InfraRoleInstance
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location,
    Parameters.infraRoleInstance
  ],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric.Admin/fabricLocations/{location}/infraRoleInstances",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.InfraRoleInstanceList
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location
  ],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.InfraRoleInstanceList
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location,
    Parameters.nextLink
  ],
  serializer
};
