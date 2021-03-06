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
import { NetworkManagementClient } from "../networkManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  PublicIPAddressesGetOptionalParams,
  PublicIPAddressesGetResponse,
  PublicIPAddress,
  PublicIPAddressesCreateOrUpdateResponse,
  TagsObject,
  PublicIPAddressesUpdateTagsResponse,
  PublicIPAddressesListAllResponse,
  PublicIPAddressesListResponse,
  PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesResponse,
  PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesResponse,
  PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressOptionalParams,
  PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressResponse,
  PublicIPAddressesListAllNextResponse,
  PublicIPAddressesListNextResponse,
  PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesNextResponse,
  PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesNextResponse
} from "../models";

/**
 * Class representing a PublicIPAddresses.
 */
export class PublicIPAddresses {
  private readonly client: NetworkManagementClient;

  /**
   * Initialize a new instance of the class PublicIPAddresses class.
   * @param client Reference to the service client
   */
  constructor(client: NetworkManagementClient) {
    this.client = client;
  }

  /**
   * Deletes the specified public IP address.
   * @param resourceGroupName The name of the resource group.
   * @param publicIpAddressName The name of the subnet.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    publicIpAddressName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      publicIpAddressName,
      options: this.getOperationOptions(options, "location")
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
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * Gets the specified public IP address in a specified resource group.
   * @param resourceGroupName The name of the resource group.
   * @param publicIpAddressName The name of the subnet.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    publicIpAddressName: string,
    options?: PublicIPAddressesGetOptionalParams
  ): Promise<PublicIPAddressesGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      publicIpAddressName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<PublicIPAddressesGetResponse>;
  }

  /**
   * Creates or updates a static or dynamic public IP address.
   * @param resourceGroupName The name of the resource group.
   * @param publicIpAddressName The name of the public IP address.
   * @param parameters Parameters supplied to the create or update public IP address operation.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    publicIpAddressName: string,
    parameters: PublicIPAddress,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<PublicIPAddressesCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      publicIpAddressName,
      parameters,
      options: this.getOperationOptions(options, "azure-async-operation")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        PublicIPAddressesCreateOrUpdateResponse
      >;
    const initialOperationResult = await sendOperation(
      operationArguments,
      createOrUpdateOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createOrUpdateOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "azure-async-operation"
    });
  }

  /**
   * Updates public IP address tags.
   * @param resourceGroupName The name of the resource group.
   * @param publicIpAddressName The name of the public IP address.
   * @param parameters Parameters supplied to update public IP address tags.
   * @param options The options parameters.
   */
  updateTags(
    resourceGroupName: string,
    publicIpAddressName: string,
    parameters: TagsObject,
    options?: coreHttp.OperationOptions
  ): Promise<PublicIPAddressesUpdateTagsResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      publicIpAddressName,
      parameters,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      updateTagsOperationSpec
    ) as Promise<PublicIPAddressesUpdateTagsResponse>;
  }

  /**
   * Gets all the public IP addresses in a subscription.
   * @param options The options parameters.
   */
  listAll(
    options?: coreHttp.OperationOptions
  ): Promise<PublicIPAddressesListAllResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listAllOperationSpec
    ) as Promise<PublicIPAddressesListAllResponse>;
  }

  /**
   * Gets all public IP addresses in a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<PublicIPAddressesListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<PublicIPAddressesListResponse>;
  }

  /**
   * Gets information about all public IP addresses on a virtual machine scale set level.
   * @param resourceGroupName The name of the resource group.
   * @param virtualMachineScaleSetName The name of the virtual machine scale set.
   * @param options The options parameters.
   */
  listVirtualMachineScaleSetPublicIPAddresses(
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    options?: coreHttp.OperationOptions
  ): Promise<
    PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesResponse
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualMachineScaleSetName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listVirtualMachineScaleSetPublicIPAddressesOperationSpec
    ) as Promise<
      PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesResponse
    >;
  }

  /**
   * Gets information about all public IP addresses in a virtual machine IP configuration in a virtual
   * machine scale set.
   * @param resourceGroupName The name of the resource group.
   * @param virtualMachineScaleSetName The name of the virtual machine scale set.
   * @param virtualmachineIndex The virtual machine index.
   * @param networkInterfaceName The network interface name.
   * @param ipConfigurationName The IP configuration name.
   * @param options The options parameters.
   */
  listVirtualMachineScaleSetVMPublicIPAddresses(
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    virtualmachineIndex: string,
    networkInterfaceName: string,
    ipConfigurationName: string,
    options?: coreHttp.OperationOptions
  ): Promise<
    PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesResponse
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualMachineScaleSetName,
      virtualmachineIndex,
      networkInterfaceName,
      ipConfigurationName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listVirtualMachineScaleSetVMPublicIPAddressesOperationSpec
    ) as Promise<
      PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesResponse
    >;
  }

  /**
   * Get the specified public IP address in a virtual machine scale set.
   * @param resourceGroupName The name of the resource group.
   * @param virtualMachineScaleSetName The name of the virtual machine scale set.
   * @param virtualmachineIndex The virtual machine index.
   * @param networkInterfaceName The name of the network interface.
   * @param ipConfigurationName The name of the IP configuration.
   * @param publicIpAddressName The name of the public IP Address.
   * @param options The options parameters.
   */
  getVirtualMachineScaleSetPublicIPAddress(
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    virtualmachineIndex: string,
    networkInterfaceName: string,
    ipConfigurationName: string,
    publicIpAddressName: string,
    options?: PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressOptionalParams
  ): Promise<
    PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressResponse
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualMachineScaleSetName,
      virtualmachineIndex,
      networkInterfaceName,
      ipConfigurationName,
      publicIpAddressName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getVirtualMachineScaleSetPublicIPAddressOperationSpec
    ) as Promise<
      PublicIPAddressesGetVirtualMachineScaleSetPublicIPAddressResponse
    >;
  }

  /**
   * ListAllNext
   * @param nextLink The nextLink from the previous successful call to the ListAll method.
   * @param options The options parameters.
   */
  listAllNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<PublicIPAddressesListAllNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listAllNextOperationSpec
    ) as Promise<PublicIPAddressesListAllNextResponse>;
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    resourceGroupName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<PublicIPAddressesListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<PublicIPAddressesListNextResponse>;
  }

  /**
   * ListVirtualMachineScaleSetPublicIPAddressesNext
   * @param resourceGroupName The name of the resource group.
   * @param virtualMachineScaleSetName The name of the virtual machine scale set.
   * @param nextLink The nextLink from the previous successful call to the
   *                 ListVirtualMachineScaleSetPublicIPAddresses method.
   * @param options The options parameters.
   */
  listVirtualMachineScaleSetPublicIPAddressesNext(
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<
    PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesNextResponse
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualMachineScaleSetName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listVirtualMachineScaleSetPublicIPAddressesNextOperationSpec
    ) as Promise<
      PublicIPAddressesListVirtualMachineScaleSetPublicIPAddressesNextResponse
    >;
  }

  /**
   * ListVirtualMachineScaleSetVMPublicIPAddressesNext
   * @param resourceGroupName The name of the resource group.
   * @param virtualMachineScaleSetName The name of the virtual machine scale set.
   * @param virtualmachineIndex The virtual machine index.
   * @param networkInterfaceName The network interface name.
   * @param ipConfigurationName The IP configuration name.
   * @param nextLink The nextLink from the previous successful call to the
   *                 ListVirtualMachineScaleSetVMPublicIPAddresses method.
   * @param options The options parameters.
   */
  listVirtualMachineScaleSetVMPublicIPAddressesNext(
    resourceGroupName: string,
    virtualMachineScaleSetName: string,
    virtualmachineIndex: string,
    networkInterfaceName: string,
    ipConfigurationName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<
    PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesNextResponse
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualMachineScaleSetName,
      virtualmachineIndex,
      networkInterfaceName,
      ipConfigurationName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listVirtualMachineScaleSetVMPublicIPAddressesNextOperationSpec
    ) as Promise<
      PublicIPAddressesListVirtualMachineScaleSetVMPublicIPAddressesNextResponse
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

const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}",
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
    Parameters.publicIpAddressName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PublicIPAddress
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
    Parameters.publicIpAddressName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.PublicIPAddress
    },
    201: {
      bodyMapper: Mappers.PublicIPAddress
    },
    202: {
      bodyMapper: Mappers.PublicIPAddress
    },
    204: {
      bodyMapper: Mappers.PublicIPAddress
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters42,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.publicIpAddressName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateTagsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/{publicIpAddressName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.PublicIPAddress
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.publicIpAddressName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listAllOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/publicIPAddresses",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PublicIPAddressListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPAddresses",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PublicIPAddressListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listVirtualMachineScaleSetPublicIPAddressesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/publicipaddresses",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PublicIPAddressListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.virtualMachineScaleSetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listVirtualMachineScaleSetVMPublicIPAddressesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/virtualMachines/{virtualmachineIndex}/networkInterfaces/{networkInterfaceName}/ipconfigurations/{ipConfigurationName}/publicipaddresses",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PublicIPAddressListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.networkInterfaceName,
    Parameters.virtualMachineScaleSetName,
    Parameters.virtualmachineIndex,
    Parameters.ipConfigurationName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getVirtualMachineScaleSetPublicIPAddressOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/virtualMachines/{virtualmachineIndex}/networkInterfaces/{networkInterfaceName}/ipconfigurations/{ipConfigurationName}/publicipaddresses/{publicIpAddressName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PublicIPAddress
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.expand, Parameters.apiVersion1],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.networkInterfaceName,
    Parameters.virtualMachineScaleSetName,
    Parameters.virtualmachineIndex,
    Parameters.ipConfigurationName,
    Parameters.publicIpAddressName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listAllNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PublicIPAddressListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PublicIPAddressListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listVirtualMachineScaleSetPublicIPAddressesNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PublicIPAddressListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.virtualMachineScaleSetName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listVirtualMachineScaleSetVMPublicIPAddressesNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PublicIPAddressListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.networkInterfaceName,
    Parameters.virtualMachineScaleSetName,
    Parameters.virtualmachineIndex,
    Parameters.ipConfigurationName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
