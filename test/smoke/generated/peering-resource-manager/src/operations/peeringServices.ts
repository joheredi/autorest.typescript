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
import { PeeringManagementClient } from "../peeringManagementClient";
import {
  PeeringServicesGetResponse,
  PeeringService,
  PeeringServicesCreateOrUpdateResponse,
  ResourceTags,
  PeeringServicesUpdateResponse,
  PeeringServicesListByResourceGroupResponse,
  PeeringServicesListBySubscriptionResponse,
  PeeringServicesListByResourceGroupNextResponse,
  PeeringServicesListBySubscriptionNextResponse
} from "../models";

/**
 * Class representing a PeeringServices.
 */
export class PeeringServices {
  private readonly client: PeeringManagementClient;

  /**
   * Initialize a new instance of the class PeeringServices class.
   * @param client Reference to the service client
   */
  constructor(client: PeeringManagementClient) {
    this.client = client;
  }

  /**
   * Gets an existing peering service with the specified name under the given subscription and resource
   * group.
   * @param resourceGroupName The name of the resource group.
   * @param peeringServiceName The name of the peering.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    peeringServiceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<PeeringServicesGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, peeringServiceName, options: operationOptions },
      getOperationSpec
    ) as Promise<PeeringServicesGetResponse>;
  }

  /**
   * Creates a new peering service or updates an existing peering with the specified name under the given
   * subscription and resource group.
   * @param resourceGroupName The name of the resource group.
   * @param peeringServiceName The name of the peering service.
   * @param peeringService The properties needed to create or update a peering service.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    peeringServiceName: string,
    peeringService: PeeringService,
    options?: coreHttp.OperationOptions
  ): Promise<PeeringServicesCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        peeringServiceName,
        peeringService,
        options: operationOptions
      },
      createOrUpdateOperationSpec
    ) as Promise<PeeringServicesCreateOrUpdateResponse>;
  }

  /**
   * Deletes an existing peering service with the specified name under the given subscription and
   * resource group.
   * @param resourceGroupName The name of the resource group.
   * @param peeringServiceName The name of the peering service.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    peeringServiceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, peeringServiceName, options: operationOptions },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Updates tags for a peering service with the specified name under the given subscription and resource
   * group.
   * @param resourceGroupName The name of the resource group.
   * @param tags The resource tags.
   * @param peeringServiceName The name of the peering service.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    tags: ResourceTags,
    peeringServiceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<PeeringServicesUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        tags,
        peeringServiceName,
        options: operationOptions
      },
      updateOperationSpec
    ) as Promise<PeeringServicesUpdateResponse>;
  }

  /**
   * Lists all of the peering services under the given subscription and resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<PeeringServicesListByResourceGroupResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, options: operationOptions },
      listByResourceGroupOperationSpec
    ) as Promise<PeeringServicesListByResourceGroupResponse>;
  }

  /**
   * Lists all of the peerings under the given subscription.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: coreHttp.OperationOptions
  ): Promise<PeeringServicesListBySubscriptionResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listBySubscriptionOperationSpec
    ) as Promise<PeeringServicesListBySubscriptionResponse>;
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
    options?: coreHttp.OperationOptions
  ): Promise<PeeringServicesListByResourceGroupNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options: operationOptions },
      listByResourceGroupNextOperationSpec
    ) as Promise<PeeringServicesListByResourceGroupNextResponse>;
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  listBySubscriptionNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<PeeringServicesListBySubscriptionNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listBySubscriptionNextOperationSpec
    ) as Promise<PeeringServicesListBySubscriptionNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PeeringService
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.peeringServiceName1
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.PeeringService
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.peeringService,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.peeringServiceName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.peeringServiceName
  ],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.PeeringService
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.tags,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.peeringServiceName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const listByResourceGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PeeringServiceListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
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
const listBySubscriptionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/peeringServices",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PeeringServiceListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  serializer
};
const listByResourceGroupNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PeeringServiceListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink3
  ],
  serializer
};
const listBySubscriptionNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PeeringServiceListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink1
  ],
  serializer
};
