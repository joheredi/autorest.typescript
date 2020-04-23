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
import { PrivateDnsManagementClient } from "../privateDnsManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  PrivateZone,
  PrivateZonesCreateOrUpdateOptionalParams,
  PrivateZonesCreateOrUpdateResponse,
  PrivateZonesUpdateOptionalParams,
  PrivateZonesUpdateResponse,
  PrivateZonesDeleteOptionalParams,
  PrivateZonesGetResponse,
  PrivateZonesListOptionalParams,
  PrivateZonesListResponse,
  PrivateZonesListByResourceGroupOptionalParams,
  PrivateZonesListByResourceGroupResponse,
  PrivateZonesListNextOptionalParams,
  PrivateZonesListNextResponse,
  PrivateZonesListByResourceGroupNextOptionalParams,
  PrivateZonesListByResourceGroupNextResponse
} from "../models";

/**
 * Class representing a PrivateZones.
 */
export class PrivateZones {
  private readonly client: PrivateDnsManagementClient;

  /**
   * Initialize a new instance of the class PrivateZones class.
   * @param client Reference to the service client
   */
  constructor(client: PrivateDnsManagementClient) {
    this.client = client;
  }

  /**
   * Creates or updates a Private DNS zone. Does not modify Links to virtual networks or DNS records
   * within the zone.
   * @param parameters Parameters supplied to the CreateOrUpdate operation.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param options The options parameters.
   */
  async createOrUpdate(
    parameters: PrivateZone,
    resourceGroupName: string,
    privateZoneName: string,
    options?: PrivateZonesCreateOrUpdateOptionalParams
  ): Promise<LROPoller<PrivateZonesCreateOrUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      parameters,
      resourceGroupName,
      privateZoneName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        PrivateZonesCreateOrUpdateResponse
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
   * Updates a Private DNS zone. Does not modify virtual network links or DNS records within the zone.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param parameters Parameters supplied to the Update operation.
   * @param options The options parameters.
   */
  async update(
    resourceGroupName: string,
    privateZoneName: string,
    parameters: PrivateZone,
    options?: PrivateZonesUpdateOptionalParams
  ): Promise<LROPoller<PrivateZonesUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      privateZoneName,
      parameters,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        PrivateZonesUpdateResponse
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
   * Deletes a Private DNS zone. WARNING: All DNS records in the zone will also be deleted. This
   * operation cannot be undone. Private DNS zone cannot be deleted unless all virtual network links to
   * it are removed.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    privateZoneName: string,
    options?: PrivateZonesDeleteOptionalParams
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      privateZoneName,
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
   * Gets a Private DNS zone. Retrieves the zone properties, but not the virtual networks links or the
   * record sets within the zone.
   * @param resourceGroupName The name of the resource group.
   * @param privateZoneName The name of the Private DNS zone (without a terminating dot).
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    privateZoneName: string,
    options?: coreHttp.OperationOptions
  ): Promise<PrivateZonesGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, privateZoneName, options: operationOptions },
      getOperationSpec
    ) as Promise<PrivateZonesGetResponse>;
  }

  /**
   * Lists the Private DNS zones in all resource groups in a subscription.
   * @param options The options parameters.
   */
  list(
    options?: PrivateZonesListOptionalParams
  ): Promise<PrivateZonesListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listOperationSpec
    ) as Promise<PrivateZonesListResponse>;
  }

  /**
   * Lists the Private DNS zones within a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: PrivateZonesListByResourceGroupOptionalParams
  ): Promise<PrivateZonesListByResourceGroupResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, options: operationOptions },
      listByResourceGroupOperationSpec
    ) as Promise<PrivateZonesListByResourceGroupResponse>;
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    nextLink: string,
    options?: PrivateZonesListNextOptionalParams
  ): Promise<PrivateZonesListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<PrivateZonesListNextResponse>;
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName The name of the resource group.
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: PrivateZonesListByResourceGroupNextOptionalParams
  ): Promise<PrivateZonesListByResourceGroupNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options: operationOptions },
      listByResourceGroupNextOperationSpec
    ) as Promise<PrivateZonesListByResourceGroupNextResponse>;
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

const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateZone
    },
    201: {
      bodyMapper: Mappers.PrivateZone
    },
    202: {
      bodyMapper: Mappers.PrivateZone
    },
    204: {
      bodyMapper: Mappers.PrivateZone
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.privateZoneName,
    Parameters.subscriptionId
  ],
  headerParameters: [
    Parameters.contentType,
    Parameters.ifMatch,
    Parameters.ifNoneMatch
  ],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateZone
    },
    201: {
      bodyMapper: Mappers.PrivateZone
    },
    202: {
      bodyMapper: Mappers.PrivateZone
    },
    204: {
      bodyMapper: Mappers.PrivateZone
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
    Parameters.privateZoneName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.contentType, Parameters.ifMatch],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}",
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
    Parameters.privateZoneName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.ifMatch1],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones/{privateZoneName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateZone
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.privateZoneName,
    Parameters.subscriptionId
  ],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/privateDnsZones",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateZoneListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.top],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  serializer
};
const listByResourceGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateDnsZones",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateZoneListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.top1],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId
  ],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateZoneListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  serializer
};
const listByResourceGroupNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PrivateZoneListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.top1],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink1
  ],
  serializer
};
