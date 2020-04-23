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
import { ApiManagementClient } from "../apiManagementClient";
import {
  CacheListByServiceOptionalParams,
  CacheListByServiceResponse,
  CacheGetEntityTagResponse,
  CacheGetResponse,
  CacheContract,
  CacheCreateOrUpdateOptionalParams,
  CacheCreateOrUpdateResponse,
  CacheUpdateParameters,
  CacheListByServiceNextOptionalParams,
  CacheListByServiceNextResponse
} from "../models";

/**
 * Class representing a Cache.
 */
export class Cache {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class Cache class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Lists a collection of all external Caches in the specified service instance.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param options The options parameters.
   */
  listByService(
    resourceGroupName: string,
    serviceName: string,
    options?: CacheListByServiceOptionalParams
  ): Promise<CacheListByServiceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, options: operationOptions },
      listByServiceOperationSpec
    ) as Promise<CacheListByServiceResponse>;
  }

  /**
   * Gets the entity state (Etag) version of the Cache specified by its identifier.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param cacheId Identifier of the Cache entity. Cache identifier (should be either 'default' or valid
   *                Azure region identifier).
   * @param options The options parameters.
   */
  getEntityTag(
    resourceGroupName: string,
    serviceName: string,
    cacheId: string,
    options?: coreHttp.OperationOptions
  ): Promise<CacheGetEntityTagResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, cacheId, options: operationOptions },
      getEntityTagOperationSpec
    ) as Promise<CacheGetEntityTagResponse>;
  }

  /**
   * Gets the details of the Cache specified by its identifier.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param cacheId Identifier of the Cache entity. Cache identifier (should be either 'default' or valid
   *                Azure region identifier).
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    cacheId: string,
    options?: coreHttp.OperationOptions
  ): Promise<CacheGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, cacheId, options: operationOptions },
      getOperationSpec
    ) as Promise<CacheGetResponse>;
  }

  /**
   * Creates or updates an External Cache to be used in Api Management instance.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param cacheId Identifier of the Cache entity. Cache identifier (should be either 'default' or valid
   *                Azure region identifier).
   * @param parameters Create or Update parameters.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    cacheId: string,
    parameters: CacheContract,
    options?: CacheCreateOrUpdateOptionalParams
  ): Promise<CacheCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        cacheId,
        parameters,
        options: operationOptions
      },
      createOrUpdateOperationSpec
    ) as Promise<CacheCreateOrUpdateResponse>;
  }

  /**
   * Updates the details of the cache specified by its identifier.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param cacheId Identifier of the Cache entity. Cache identifier (should be either 'default' or valid
   *                Azure region identifier).
   * @param parameters Update parameters.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    serviceName: string,
    ifMatch: string,
    cacheId: string,
    parameters: CacheUpdateParameters,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        ifMatch,
        cacheId,
        parameters,
        options: operationOptions
      },
      updateOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Deletes specific Cache.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param cacheId Identifier of the Cache entity. Cache identifier (should be either 'default' or valid
   *                Azure region identifier).
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serviceName: string,
    ifMatch: string,
    cacheId: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        ifMatch,
        cacheId,
        options: operationOptions
      },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * ListByServiceNext
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param nextLink The nextLink from the previous successful call to the ListByService method.
   * @param options The options parameters.
   */
  listByServiceNext(
    resourceGroupName: string,
    serviceName: string,
    nextLink: string,
    options?: CacheListByServiceNextOptionalParams
  ): Promise<CacheListByServiceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, nextLink, options: operationOptions },
      listByServiceNextOperationSpec
    ) as Promise<CacheListByServiceNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listByServiceOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/caches",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CacheCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.top, Parameters.skip, Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId
  ],
  serializer
};
const getEntityTagOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/caches/{cacheId}",
  httpMethod: "HEAD",
  responses: {
    200: {
      headersMapper: Mappers.CacheGetEntityTagHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.cacheId
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/caches/{cacheId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CacheContract,
      headersMapper: Mappers.CacheGetHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.cacheId
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/caches/{cacheId}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.CacheContract,
      headersMapper: Mappers.CacheCreateOrUpdateHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters24,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.cacheId
  ],
  headerParameters: [Parameters.contentType, Parameters.ifMatch],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/caches/{cacheId}",
  httpMethod: "PATCH",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters25,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.cacheId
  ],
  headerParameters: [Parameters.contentType, Parameters.ifMatch1],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/caches/{cacheId}",
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
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.cacheId
  ],
  headerParameters: [Parameters.ifMatch1],
  serializer
};
const listByServiceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CacheCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.top, Parameters.skip, Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  serializer
};
