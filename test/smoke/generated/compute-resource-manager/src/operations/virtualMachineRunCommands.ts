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
import {
  VirtualMachineRunCommandsListResponse,
  VirtualMachineRunCommandsGetResponse,
  VirtualMachineRunCommandsListNextResponse
} from "../models";

/**
 * Class representing a VirtualMachineRunCommands.
 */
export class VirtualMachineRunCommands {
  private readonly client: ComputeManagementClient;

  /**
   * Initialize a new instance of the class VirtualMachineRunCommands class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClient) {
    this.client = client;
  }

  /**
   * Lists all available run commands for a subscription in a location.
   * @param location The location upon which run commands is queried.
   * @param options The options parameters.
   */
  list(
    location: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineRunCommandsListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<VirtualMachineRunCommandsListResponse>;
  }

  /**
   * Gets specific run command for a subscription in a location.
   * @param location The location upon which run commands is queried.
   * @param commandId The command id.
   * @param options The options parameters.
   */
  get(
    location: string,
    commandId: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineRunCommandsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      commandId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<VirtualMachineRunCommandsGetResponse>;
  }

  /**
   * ListNext
   * @param location The location upon which run commands is queried.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    location: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachineRunCommandsListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<VirtualMachineRunCommandsListNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/runCommands",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RunCommandListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location1
  ],
  headerParameters: [Parameters.accept1],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/runCommands/{commandId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RunCommandDocument
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location1,
    Parameters.commandId
  ],
  headerParameters: [Parameters.accept1],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RunCommandListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.location1
  ],
  headerParameters: [Parameters.accept1],
  serializer
};
