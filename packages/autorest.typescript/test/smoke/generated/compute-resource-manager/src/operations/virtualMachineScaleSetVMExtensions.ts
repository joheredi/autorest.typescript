/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { VirtualMachineScaleSetVMExtensions } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ComputeManagementClient } from "../computeManagementClient";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl";
import {
  VirtualMachineScaleSetVMExtension,
  VirtualMachineScaleSetVMExtensionsCreateOrUpdateOptionalParams,
  VirtualMachineScaleSetVMExtensionsCreateOrUpdateResponse,
  VirtualMachineScaleSetVMExtensionUpdate,
  VirtualMachineScaleSetVMExtensionsUpdateOptionalParams,
  VirtualMachineScaleSetVMExtensionsUpdateResponse,
  VirtualMachineScaleSetVMExtensionsDeleteOptionalParams,
  VirtualMachineScaleSetVMExtensionsGetOptionalParams,
  VirtualMachineScaleSetVMExtensionsGetResponse,
  VirtualMachineScaleSetVMExtensionsListOptionalParams,
  VirtualMachineScaleSetVMExtensionsListResponse
} from "../models";

/** Class containing VirtualMachineScaleSetVMExtensions operations. */
export class VirtualMachineScaleSetVMExtensionsImpl
  implements VirtualMachineScaleSetVMExtensions {
  private readonly client: ComputeManagementClient;

  /**
   * Initialize a new instance of the class VirtualMachineScaleSetVMExtensions class.
   * @param client Reference to the service client
   */
  constructor(client: ComputeManagementClient) {
    this.client = client;
  }

  /**
   * The operation to create or update the VMSS VM extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param vmExtensionName The name of the virtual machine extension.
   * @param extensionParameters Parameters supplied to the Create Virtual Machine Extension operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    vmExtensionName: string,
    extensionParameters: VirtualMachineScaleSetVMExtension,
    options?: VirtualMachineScaleSetVMExtensionsCreateOrUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<VirtualMachineScaleSetVMExtensionsCreateOrUpdateResponse>,
      VirtualMachineScaleSetVMExtensionsCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<VirtualMachineScaleSetVMExtensionsCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        vmExtensionName,
        extensionParameters,
        options
      },
      spec: createOrUpdateOperationSpec
    });
    const poller = await createHttpPoller<
      VirtualMachineScaleSetVMExtensionsCreateOrUpdateResponse,
      OperationState<VirtualMachineScaleSetVMExtensionsCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });

    return poller;
  }

  /**
   * The operation to create or update the VMSS VM extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param vmExtensionName The name of the virtual machine extension.
   * @param extensionParameters Parameters supplied to the Create Virtual Machine Extension operation.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    vmExtensionName: string,
    extensionParameters: VirtualMachineScaleSetVMExtension,
    options?: VirtualMachineScaleSetVMExtensionsCreateOrUpdateOptionalParams
  ): Promise<VirtualMachineScaleSetVMExtensionsCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      vmScaleSetName,
      instanceId,
      vmExtensionName,
      extensionParameters,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * The operation to update the VMSS VM extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param vmExtensionName The name of the virtual machine extension.
   * @param extensionParameters Parameters supplied to the Update Virtual Machine Extension operation.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    vmExtensionName: string,
    extensionParameters: VirtualMachineScaleSetVMExtensionUpdate,
    options?: VirtualMachineScaleSetVMExtensionsUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<VirtualMachineScaleSetVMExtensionsUpdateResponse>,
      VirtualMachineScaleSetVMExtensionsUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<VirtualMachineScaleSetVMExtensionsUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        vmExtensionName,
        extensionParameters,
        options
      },
      spec: updateOperationSpec
    });
    const poller = await createHttpPoller<
      VirtualMachineScaleSetVMExtensionsUpdateResponse,
      OperationState<VirtualMachineScaleSetVMExtensionsUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });

    return poller;
  }

  /**
   * The operation to update the VMSS VM extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param vmExtensionName The name of the virtual machine extension.
   * @param extensionParameters Parameters supplied to the Update Virtual Machine Extension operation.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    vmExtensionName: string,
    extensionParameters: VirtualMachineScaleSetVMExtensionUpdate,
    options?: VirtualMachineScaleSetVMExtensionsUpdateOptionalParams
  ): Promise<VirtualMachineScaleSetVMExtensionsUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      vmScaleSetName,
      instanceId,
      vmExtensionName,
      extensionParameters,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * The operation to delete the VMSS VM extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param vmExtensionName The name of the virtual machine extension.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    vmExtensionName: string,
    options?: VirtualMachineScaleSetVMExtensionsDeleteOptionalParams
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        vmExtensionName,
        options
      },
      spec: deleteOperationSpec
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });

    return poller;
  }

  /**
   * The operation to delete the VMSS VM extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param vmExtensionName The name of the virtual machine extension.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    vmExtensionName: string,
    options?: VirtualMachineScaleSetVMExtensionsDeleteOptionalParams
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      vmScaleSetName,
      instanceId,
      vmExtensionName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * The operation to get the VMSS VM extension.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param vmExtensionName The name of the virtual machine extension.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    vmExtensionName: string,
    options?: VirtualMachineScaleSetVMExtensionsGetOptionalParams
  ): Promise<VirtualMachineScaleSetVMExtensionsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        vmScaleSetName,
        instanceId,
        vmExtensionName,
        options
      },
      getOperationSpec
    );
  }

  /**
   * The operation to get all extensions of an instance in Virtual Machine Scaleset.
   * @param resourceGroupName The name of the resource group.
   * @param vmScaleSetName The name of the VM scale set.
   * @param instanceId The instance ID of the virtual machine.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    vmScaleSetName: string,
    instanceId: string,
    options?: VirtualMachineScaleSetVMExtensionsListOptionalParams
  ): Promise<VirtualMachineScaleSetVMExtensionsListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, vmScaleSetName, instanceId, options },
      listOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtension
    },
    201: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtension
    },
    202: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtension
    },
    204: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtension
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.extensionParameters4,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmExtensionName,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtension
    },
    201: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtension
    },
    202: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtension
    },
    204: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtension
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.extensionParameters5,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.vmExtensionName,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}",
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
    Parameters.vmExtensionName,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtension
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
    Parameters.vmExtensionName,
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineScaleSetVMExtensionsListResult
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
    Parameters.vmScaleSetName,
    Parameters.instanceId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
