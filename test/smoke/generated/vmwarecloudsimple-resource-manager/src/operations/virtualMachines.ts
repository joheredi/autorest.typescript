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
import { VMwareCloudSimple } from "../vMwareCloudSimple";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  VirtualMachinesListBySubscriptionOptionalParams,
  VirtualMachinesListBySubscriptionResponse,
  VirtualMachinesListByResourceGroupOptionalParams,
  VirtualMachinesListByResourceGroupResponse,
  VirtualMachinesGetResponse,
  VirtualMachine,
  VirtualMachinesCreateOrUpdateResponse,
  VirtualMachinesDeleteResponse,
  PatchPayload,
  VirtualMachinesUpdateResponse,
  VirtualMachinesStopOptionalParams,
  VirtualMachinesListBySubscriptionNextOptionalParams,
  VirtualMachinesListBySubscriptionNextResponse,
  VirtualMachinesListByResourceGroupNextOptionalParams,
  VirtualMachinesListByResourceGroupNextResponse
} from "../models";

/**
 * Class representing a VirtualMachines.
 */
export class VirtualMachines {
  private readonly client: VMwareCloudSimple;

  /**
   * Initialize a new instance of the class VirtualMachines class.
   * @param client Reference to the service client
   */
  constructor(client: VMwareCloudSimple) {
    this.client = client;
  }

  /**
   * Returns list virtual machine within subscription
   * @param options The options parameters.
   */
  listBySubscription(
    options?: VirtualMachinesListBySubscriptionOptionalParams
  ): Promise<VirtualMachinesListBySubscriptionResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listBySubscriptionOperationSpec
    ) as Promise<VirtualMachinesListBySubscriptionResponse>;
  }

  /**
   * Returns list of virtual machine within resource group
   * @param resourceGroupName The name of the resource group
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: VirtualMachinesListByResourceGroupOptionalParams
  ): Promise<VirtualMachinesListByResourceGroupResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, options: operationOptions },
      listByResourceGroupOperationSpec
    ) as Promise<VirtualMachinesListByResourceGroupResponse>;
  }

  /**
   * Get virtual machine
   * @param options The options parameters.
   */
  getModel(
    options?: coreHttp.OperationOptions
  ): Promise<VirtualMachinesGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getModelOperationSpec
    ) as Promise<VirtualMachinesGetResponse>;
  }

  /**
   * Create Or Update Virtual Machine
   * @param resourceGroupName The name of the resource group
   * @param virtualMachineRequest Create or Update Virtual Machine request
   * @param virtualMachineName virtual machine name
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    virtualMachineRequest: VirtualMachine,
    virtualMachineName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachinesCreateOrUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualMachineRequest,
      virtualMachineName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachinesCreateOrUpdateResponse
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
   * Delete virtual machine
   * @param options The options parameters.
   */
  async deleteModel(
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachinesDeleteResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = { options: operationOptions };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachinesDeleteResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      deleteModelOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: deleteModelOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Patch virtual machine properties
   * @param resourceGroupName The name of the resource group
   * @param virtualMachineName virtual machine name
   * @param virtualMachineRequest Patch virtual machine request
   * @param options The options parameters.
   */
  async update(
    resourceGroupName: string,
    virtualMachineName: string,
    virtualMachineRequest: PatchPayload,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualMachinesUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualMachineName,
      virtualMachineRequest,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        VirtualMachinesUpdateResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      updateOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: updateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Power on virtual machine
   * @param resourceGroupName The name of the resource group
   * @param virtualMachineName virtual machine name
   * @param options The options parameters.
   */
  async start(
    resourceGroupName: string,
    virtualMachineName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualMachineName,
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
      startOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: startOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Power off virtual machine, options: shutdown, poweroff, and suspend
   * @param resourceGroupName The name of the resource group
   * @param virtualMachineName virtual machine name
   * @param options The options parameters.
   */
  async stop(
    resourceGroupName: string,
    virtualMachineName: string,
    options?: VirtualMachinesStopOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualMachineName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    const initialOperationResult = await sendOperation(args, stopOperationSpec);

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: stopOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  listBySubscriptionNext(
    nextLink: string,
    options?: VirtualMachinesListBySubscriptionNextOptionalParams
  ): Promise<VirtualMachinesListBySubscriptionNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listBySubscriptionNextOperationSpec
    ) as Promise<VirtualMachinesListBySubscriptionNextResponse>;
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName The name of the resource group
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: VirtualMachinesListByResourceGroupNextOptionalParams
  ): Promise<VirtualMachinesListByResourceGroupNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options: operationOptions },
      listByResourceGroupNextOperationSpec
    ) as Promise<VirtualMachinesListByResourceGroupNextResponse>;
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

const listBySubscriptionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/virtualMachines",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineListResponse
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.top,
    Parameters.filter1,
    Parameters.skipToken1
  ],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  serializer
};
const listByResourceGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/virtualMachines",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineListResponse
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.top,
    Parameters.filter1,
    Parameters.skipToken1
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  serializer
};
const getModelOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/virtualMachines/{virtualMachineName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachine
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/virtualMachines/{virtualMachineName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachine,
      headersMapper: Mappers.VirtualMachinesCreateOrUpdateHeaders
    },
    201: {
      bodyMapper: Mappers.VirtualMachine,
      headersMapper: Mappers.VirtualMachinesCreateOrUpdateHeaders
    },
    202: {
      bodyMapper: Mappers.VirtualMachine,
      headersMapper: Mappers.VirtualMachinesCreateOrUpdateHeaders
    },
    204: {
      bodyMapper: Mappers.VirtualMachine,
      headersMapper: Mappers.VirtualMachinesCreateOrUpdateHeaders
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  requestBody: Parameters.virtualMachineRequest,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.virtualMachineName1
  ],
  headerParameters: [Parameters.referer, Parameters.contentType],
  serializer
};
const deleteModelOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/virtualMachines/{virtualMachineName}",
  httpMethod: "DELETE",
  responses: {
    200: {
      headersMapper: Mappers.VirtualMachinesDeleteModelHeaders
    },
    201: {
      headersMapper: Mappers.VirtualMachinesDeleteModelHeaders
    },
    202: {
      headersMapper: Mappers.VirtualMachinesDeleteModelHeaders
    },
    204: {
      headersMapper: Mappers.VirtualMachinesDeleteModelHeaders
    },
    default: {
      bodyMapper: Mappers.CsrpError,
      headersMapper: Mappers.VirtualMachinesDeleteModelHeaders
    }
  },
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/virtualMachines/{virtualMachineName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachine
    },
    201: {
      bodyMapper: Mappers.VirtualMachine
    },
    202: {
      bodyMapper: Mappers.VirtualMachine
    },
    204: {
      bodyMapper: Mappers.VirtualMachine
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  requestBody: Parameters.virtualMachineRequest1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.virtualMachineName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const startOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/virtualMachines/{virtualMachineName}/start",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CsrpError,
      headersMapper: Mappers.VirtualMachinesStartHeaders
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.virtualMachineName
  ],
  headerParameters: [Parameters.referer],
  serializer
};
const stopOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.VMwareCloudSimple/virtualMachines/{virtualMachineName}/stop",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CsrpError,
      headersMapper: Mappers.VirtualMachinesStopHeaders
    }
  },
  requestBody: Parameters.m,
  queryParameters: [Parameters.apiVersion, Parameters.mode],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.virtualMachineName
  ],
  headerParameters: [Parameters.referer, Parameters.contentType],
  serializer
};
const listBySubscriptionNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineListResponse
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.top,
    Parameters.filter1,
    Parameters.skipToken1
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink1
  ],
  serializer
};
const listByResourceGroupNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualMachineListResponse
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.top,
    Parameters.filter1,
    Parameters.skipToken1
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink2
  ],
  serializer
};
