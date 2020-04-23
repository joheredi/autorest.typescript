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
import { DataBoxEdgeManagementClient } from "../dataBoxEdgeManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  DevicesListBySubscriptionOptionalParams,
  DevicesListBySubscriptionResponse,
  DevicesListByResourceGroupOptionalParams,
  DevicesListByResourceGroupResponse,
  DevicesGetResponse,
  DataBoxEdgeDevice,
  DevicesCreateOrUpdateResponse,
  DataBoxEdgeDevicePatch,
  DevicesUpdateResponse,
  DevicesGetExtendedInformationResponse,
  DevicesGetNetworkSettingsResponse,
  SecuritySettings,
  DevicesGetUpdateSummaryResponse,
  UploadCertificateRequest,
  DevicesUploadCertificateResponse,
  DevicesListBySubscriptionNextOptionalParams,
  DevicesListBySubscriptionNextResponse,
  DevicesListByResourceGroupNextOptionalParams,
  DevicesListByResourceGroupNextResponse
} from "../models";

/**
 * Class representing a Devices.
 */
export class Devices {
  private readonly client: DataBoxEdgeManagementClient;

  /**
   * Initialize a new instance of the class Devices class.
   * @param client Reference to the service client
   */
  constructor(client: DataBoxEdgeManagementClient) {
    this.client = client;
  }

  /**
   * Gets all the Data Box Edge/Data Box Gateway devices in a subscription.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: DevicesListBySubscriptionOptionalParams
  ): Promise<DevicesListBySubscriptionResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listBySubscriptionOperationSpec
    ) as Promise<DevicesListBySubscriptionResponse>;
  }

  /**
   * Gets all the Data Box Edge/Data Box Gateway devices in a resource group.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: DevicesListByResourceGroupOptionalParams
  ): Promise<DevicesListByResourceGroupResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, options: operationOptions },
      listByResourceGroupOperationSpec
    ) as Promise<DevicesListByResourceGroupResponse>;
  }

  /**
   * Gets the properties of the Data Box Edge/Data Box Gateway device.
   * @param resourceGroupName The resource group name.
   * @param deviceName The device name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    deviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DevicesGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, deviceName, options: operationOptions },
      getOperationSpec
    ) as Promise<DevicesGetResponse>;
  }

  /**
   * Creates or updates a Data Box Edge/Data Box Gateway resource.
   * @param resourceGroupName The resource group name.
   * @param deviceName The device name.
   * @param dataBoxEdgeDevice The resource object.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    deviceName: string,
    dataBoxEdgeDevice: DataBoxEdgeDevice,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<DevicesCreateOrUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      deviceName,
      dataBoxEdgeDevice,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        DevicesCreateOrUpdateResponse
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
   * Deletes the Data Box Edge/Data Box Gateway device.
   * @param resourceGroupName The resource group name.
   * @param deviceName The device name.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    deviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
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
   * Modifies a Data Box Edge/Data Box Gateway resource.
   * @param resourceGroupName The resource group name.
   * @param deviceName The device name.
   * @param parameters The resource parameters.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    deviceName: string,
    parameters: DataBoxEdgeDevicePatch,
    options?: coreHttp.OperationOptions
  ): Promise<DevicesUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, deviceName, parameters, options: operationOptions },
      updateOperationSpec
    ) as Promise<DevicesUpdateResponse>;
  }

  /**
   * Downloads the updates on a Data Box Edge/Data Box Gateway device.
   * @param resourceGroupName The resource group name.
   * @param deviceName The device name.
   * @param options The options parameters.
   */
  async downloadUpdates(
    resourceGroupName: string,
    deviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
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
      downloadUpdatesOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: downloadUpdatesOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets additional information for the specified Data Box Edge/Data Box Gateway device.
   * @param resourceGroupName The resource group name.
   * @param deviceName The device name.
   * @param options The options parameters.
   */
  getExtendedInformation(
    resourceGroupName: string,
    deviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DevicesGetExtendedInformationResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, deviceName, options: operationOptions },
      getExtendedInformationOperationSpec
    ) as Promise<DevicesGetExtendedInformationResponse>;
  }

  /**
   * Installs the updates on the Data Box Edge/Data Box Gateway device.
   * @param resourceGroupName The resource group name.
   * @param deviceName The device name.
   * @param options The options parameters.
   */
  async installUpdates(
    resourceGroupName: string,
    deviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
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
   * Gets the network settings of the specified Data Box Edge/Data Box Gateway device.
   * @param resourceGroupName The resource group name.
   * @param deviceName The device name.
   * @param options The options parameters.
   */
  getNetworkSettings(
    resourceGroupName: string,
    deviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DevicesGetNetworkSettingsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, deviceName, options: operationOptions },
      getNetworkSettingsOperationSpec
    ) as Promise<DevicesGetNetworkSettingsResponse>;
  }

  /**
   * Scans for updates on a Data Box Edge/Data Box Gateway device.
   * @param resourceGroupName The resource group name.
   * @param deviceName The device name.
   * @param options The options parameters.
   */
  async scanForUpdates(
    resourceGroupName: string,
    deviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
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
   * Updates the security settings on a Data Box Edge/Data Box Gateway device.
   * @param resourceGroupName The resource group name.
   * @param deviceName The device name.
   * @param securitySettings The security settings.
   * @param options The options parameters.
   */
  async createOrUpdateSecuritySettings(
    resourceGroupName: string,
    deviceName: string,
    securitySettings: SecuritySettings,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      deviceName,
      securitySettings,
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
      createOrUpdateSecuritySettingsOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: createOrUpdateSecuritySettingsOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets information about the availability of updates based on the last scan of the device. It also
   * gets information about any ongoing download or install jobs on the device.
   * @param resourceGroupName The resource group name.
   * @param deviceName The device name.
   * @param options The options parameters.
   */
  getUpdateSummary(
    resourceGroupName: string,
    deviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DevicesGetUpdateSummaryResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, deviceName, options: operationOptions },
      getUpdateSummaryOperationSpec
    ) as Promise<DevicesGetUpdateSummaryResponse>;
  }

  /**
   * Uploads registration certificate for the device.
   * @param resourceGroupName The resource group name.
   * @param deviceName The device name.
   * @param parameters The upload certificate request.
   * @param options The options parameters.
   */
  uploadCertificate(
    resourceGroupName: string,
    deviceName: string,
    parameters: UploadCertificateRequest,
    options?: coreHttp.OperationOptions
  ): Promise<DevicesUploadCertificateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, deviceName, parameters, options: operationOptions },
      uploadCertificateOperationSpec
    ) as Promise<DevicesUploadCertificateResponse>;
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  listBySubscriptionNext(
    nextLink: string,
    options?: DevicesListBySubscriptionNextOptionalParams
  ): Promise<DevicesListBySubscriptionNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listBySubscriptionNextOperationSpec
    ) as Promise<DevicesListBySubscriptionNextResponse>;
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName The resource group name.
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: DevicesListByResourceGroupNextOptionalParams
  ): Promise<DevicesListByResourceGroupNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options: operationOptions },
      listByResourceGroupNextOperationSpec
    ) as Promise<DevicesListByResourceGroupNextResponse>;
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
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataBoxEdgeDeviceList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  serializer
};
const listByResourceGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataBoxEdgeDeviceList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataBoxEdgeDevice
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.DataBoxEdgeDevice
    },
    201: {
      bodyMapper: Mappers.DataBoxEdgeDevice
    },
    202: {
      bodyMapper: Mappers.DataBoxEdgeDevice
    },
    204: {
      bodyMapper: Mappers.DataBoxEdgeDevice
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.dataBoxEdgeDevice,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}",
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
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName
  ],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.DataBoxEdgeDevice
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const downloadUpdatesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/downloadUpdates",
  httpMethod: "POST",
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
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName
  ],
  serializer
};
const getExtendedInformationOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/getExtendedInformation",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.DataBoxEdgeDeviceExtendedInfo
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName
  ],
  serializer
};
const installUpdatesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/installUpdates",
  httpMethod: "POST",
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
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName
  ],
  serializer
};
const getNetworkSettingsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/networkSettings/default",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NetworkSettings
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName
  ],
  serializer
};
const scanForUpdatesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/scanForUpdates",
  httpMethod: "POST",
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
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName
  ],
  serializer
};
const createOrUpdateSecuritySettingsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/securitySettings/default/update",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.securitySettings,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const getUpdateSummaryOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/updateSummary/default",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UpdateSummary
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName
  ],
  serializer
};
const uploadCertificateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/{deviceName}/uploadCertificate",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.UploadCertificateResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.deviceName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const listBySubscriptionNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataBoxEdgeDeviceList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
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
      bodyMapper: Mappers.DataBoxEdgeDeviceList
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink2
  ],
  serializer
};
