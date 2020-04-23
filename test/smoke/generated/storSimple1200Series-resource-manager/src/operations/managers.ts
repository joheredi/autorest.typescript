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
import {
  ManagersListResponse,
  ManagersListByResourceGroupResponse,
  ManagersGetResponse,
  Manager,
  ManagersCreateOrUpdateResponse,
  ManagerPatch,
  ManagersUpdateResponse,
  UploadCertificateRequest,
  ManagersUploadRegistrationCertificateResponse,
  ManagersGetEncryptionSettingsResponse,
  ManagersGetExtendedInfoResponse,
  ManagerExtendedInfo,
  ManagersCreateExtendedInfoResponse,
  ManagersUpdateExtendedInfoResponse,
  ManagersGetEncryptionKeyResponse,
  ManagersListMetricsOptionalParams,
  ManagersListMetricsResponse,
  ManagersListMetricDefinitionResponse
} from "../models";

/**
 * Class representing a Managers.
 */
export class Managers {
  private readonly client: StorSimpleManagementClient;

  /**
   * Initialize a new instance of the class Managers class.
   * @param client Reference to the service client
   */
  constructor(client: StorSimpleManagementClient) {
    this.client = client;
  }

  /**
   * Retrieves all the managers in a subscription.
   * @param options The options parameters.
   */
  list(options?: coreHttp.OperationOptions): Promise<ManagersListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listOperationSpec
    ) as Promise<ManagersListResponse>;
  }

  /**
   * Retrieves all the managers in a resource group.
   * @param resourceGroupName The resource group name
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ManagersListByResourceGroupResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, options: operationOptions },
      listByResourceGroupOperationSpec
    ) as Promise<ManagersListByResourceGroupResponse>;
  }

  /**
   * Returns the properties of the specified manager name.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    managerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ManagersGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options: operationOptions },
      getOperationSpec
    ) as Promise<ManagersGetResponse>;
  }

  /**
   * Creates or updates the manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param manager The manager.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    managerName: string,
    manager: Manager,
    options?: coreHttp.OperationOptions
  ): Promise<ManagersCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, manager, options: operationOptions },
      createOrUpdateOperationSpec
    ) as Promise<ManagersCreateOrUpdateResponse>;
  }

  /**
   * Deletes the manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    managerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options: operationOptions },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Updates the StorSimple Manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param parameters The manager update parameters.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    managerName: string,
    parameters: ManagerPatch,
    options?: coreHttp.OperationOptions
  ): Promise<ManagersUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, parameters, options: operationOptions },
      updateOperationSpec
    ) as Promise<ManagersUpdateResponse>;
  }

  /**
   * Upload Vault Cred Certificate.
   * Returns UploadCertificateResponse
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param uploadCertificateRequestrequest UploadCertificateRequest Request
   * @param certificateName Certificate Name
   * @param options The options parameters.
   */
  uploadRegistrationCertificate(
    resourceGroupName: string,
    managerName: string,
    uploadCertificateRequestrequest: UploadCertificateRequest,
    certificateName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ManagersUploadRegistrationCertificateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managerName,
        uploadCertificateRequestrequest,
        certificateName,
        options: operationOptions
      },
      uploadRegistrationCertificateOperationSpec
    ) as Promise<ManagersUploadRegistrationCertificateResponse>;
  }

  /**
   * Returns the encryption settings of the manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  getEncryptionSettings(
    resourceGroupName: string,
    managerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ManagersGetEncryptionSettingsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options: operationOptions },
      getEncryptionSettingsOperationSpec
    ) as Promise<ManagersGetEncryptionSettingsResponse>;
  }

  /**
   * Returns the extended information of the specified manager name.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  getExtendedInfo(
    resourceGroupName: string,
    managerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ManagersGetExtendedInfoResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options: operationOptions },
      getExtendedInfoOperationSpec
    ) as Promise<ManagersGetExtendedInfoResponse>;
  }

  /**
   * Creates the extended info of the manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param managerExtendedInfo The manager extended information.
   * @param options The options parameters.
   */
  createExtendedInfo(
    resourceGroupName: string,
    managerName: string,
    managerExtendedInfo: ManagerExtendedInfo,
    options?: coreHttp.OperationOptions
  ): Promise<ManagersCreateExtendedInfoResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managerName,
        managerExtendedInfo,
        options: operationOptions
      },
      createExtendedInfoOperationSpec
    ) as Promise<ManagersCreateExtendedInfoResponse>;
  }

  /**
   * Deletes the extended info of the manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  deleteExtendedInfo(
    resourceGroupName: string,
    managerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options: operationOptions },
      deleteExtendedInfoOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Updates the extended info of the manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param managerExtendedInfo The manager extended information.
   * @param ifMatch Pass the ETag of ExtendedInfo fetched from GET call
   * @param options The options parameters.
   */
  updateExtendedInfo(
    resourceGroupName: string,
    managerName: string,
    managerExtendedInfo: ManagerExtendedInfo,
    ifMatch: string,
    options?: coreHttp.OperationOptions
  ): Promise<ManagersUpdateExtendedInfoResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managerName,
        managerExtendedInfo,
        ifMatch,
        options: operationOptions
      },
      updateExtendedInfoOperationSpec
    ) as Promise<ManagersUpdateExtendedInfoResponse>;
  }

  /**
   * Returns the symmetric encryption key of the manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  getEncryptionKey(
    resourceGroupName: string,
    managerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ManagersGetEncryptionKeyResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options: operationOptions },
      getEncryptionKeyOperationSpec
    ) as Promise<ManagersGetEncryptionKeyResponse>;
  }

  /**
   * Gets the  manager metrics
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  listMetrics(
    resourceGroupName: string,
    managerName: string,
    options?: ManagersListMetricsOptionalParams
  ): Promise<ManagersListMetricsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options: operationOptions },
      listMetricsOperationSpec
    ) as Promise<ManagersListMetricsResponse>;
  }

  /**
   * Retrieves metric definition of all metrics aggregated at manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  listMetricDefinition(
    resourceGroupName: string,
    managerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ManagersListMetricDefinitionResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options: operationOptions },
      listMetricDefinitionOperationSpec
    ) as Promise<ManagersListMetricDefinitionResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.StorSimple/managers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagerList
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  serializer
};
const listByResourceGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagerList
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Manager
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
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Manager
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.manager,
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
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
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
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.Manager
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.parameters,
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
const uploadRegistrationCertificateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/certificates/{certificateName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.UploadCertificateResponse
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.uploadCertificateRequestrequest,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.certificateName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const getEncryptionSettingsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/encryptionSettings/default",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EncryptionSettings
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
const getExtendedInfoOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/extendedInformation/vaultExtendedInfo",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagerExtendedInfo
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
const createExtendedInfoOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/extendedInformation/vaultExtendedInfo",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ManagerExtendedInfo
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.managerExtendedInfo,
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
const deleteExtendedInfoOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/extendedInformation/vaultExtendedInfo",
  httpMethod: "DELETE",
  responses: {
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
    Parameters.managerName
  ],
  serializer
};
const updateExtendedInfoOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/extendedInformation/vaultExtendedInfo",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.ManagerExtendedInfo
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.managerExtendedInfo,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  headerParameters: [Parameters.contentType, Parameters.ifMatch],
  serializer
};
const getEncryptionKeyOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/getEncryptionKey",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SymmetricEncryptedSecret
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
const listMetricsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/metrics",
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
    Parameters.managerName
  ],
  serializer
};
const listMetricDefinitionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/metricsDefinitions",
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
    Parameters.managerName
  ],
  serializer
};
