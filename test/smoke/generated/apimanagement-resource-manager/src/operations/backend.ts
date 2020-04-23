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
  BackendListByServiceOptionalParams,
  BackendListByServiceResponse,
  BackendGetEntityTagResponse,
  BackendGetResponse,
  BackendContract,
  BackendCreateOrUpdateOptionalParams,
  BackendCreateOrUpdateResponse,
  BackendUpdateParameters,
  BackendReconnectOptionalParams,
  BackendListByServiceNextOptionalParams,
  BackendListByServiceNextResponse
} from "../models";

/**
 * Class representing a Backend.
 */
export class Backend {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class Backend class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Lists a collection of backends in the specified service instance.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param options The options parameters.
   */
  listByService(
    resourceGroupName: string,
    serviceName: string,
    options?: BackendListByServiceOptionalParams
  ): Promise<BackendListByServiceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, options: operationOptions },
      listByServiceOperationSpec
    ) as Promise<BackendListByServiceResponse>;
  }

  /**
   * Gets the entity state (Etag) version of the backend specified by its identifier.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param backendId Identifier of the Backend entity. Must be unique in the current API Management
   *                  service instance.
   * @param options The options parameters.
   */
  getEntityTag(
    resourceGroupName: string,
    serviceName: string,
    backendId: string,
    options?: coreHttp.OperationOptions
  ): Promise<BackendGetEntityTagResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, backendId, options: operationOptions },
      getEntityTagOperationSpec
    ) as Promise<BackendGetEntityTagResponse>;
  }

  /**
   * Gets the details of the backend specified by its identifier.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param backendId Identifier of the Backend entity. Must be unique in the current API Management
   *                  service instance.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    backendId: string,
    options?: coreHttp.OperationOptions
  ): Promise<BackendGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, backendId, options: operationOptions },
      getOperationSpec
    ) as Promise<BackendGetResponse>;
  }

  /**
   * Creates or Updates a backend.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param backendId Identifier of the Backend entity. Must be unique in the current API Management
   *                  service instance.
   * @param parameters Create parameters.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    backendId: string,
    parameters: BackendContract,
    options?: BackendCreateOrUpdateOptionalParams
  ): Promise<BackendCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        backendId,
        parameters,
        options: operationOptions
      },
      createOrUpdateOperationSpec
    ) as Promise<BackendCreateOrUpdateResponse>;
  }

  /**
   * Updates an existing backend.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param backendId Identifier of the Backend entity. Must be unique in the current API Management
   *                  service instance.
   * @param parameters Update parameters.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    serviceName: string,
    ifMatch: string,
    backendId: string,
    parameters: BackendUpdateParameters,
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
        backendId,
        parameters,
        options: operationOptions
      },
      updateOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Deletes the specified backend.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param backendId Identifier of the Backend entity. Must be unique in the current API Management
   *                  service instance.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serviceName: string,
    ifMatch: string,
    backendId: string,
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
        backendId,
        options: operationOptions
      },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Notifies the APIM proxy to create a new connection to the backend after the specified timeout. If no
   * timeout was specified, timeout of 2 minutes is used.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param backendId Identifier of the Backend entity. Must be unique in the current API Management
   *                  service instance.
   * @param options The options parameters.
   */
  reconnect(
    resourceGroupName: string,
    serviceName: string,
    backendId: string,
    options?: BackendReconnectOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, backendId, options: operationOptions },
      reconnectOperationSpec
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
    options?: BackendListByServiceNextOptionalParams
  ): Promise<BackendListByServiceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, nextLink, options: operationOptions },
      listByServiceNextOperationSpec
    ) as Promise<BackendListByServiceNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listByServiceOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/backends",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BackendCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.top,
    Parameters.skip,
    Parameters.apiVersion,
    Parameters.filter14
  ],
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/backends/{backendId}",
  httpMethod: "HEAD",
  responses: {
    200: {
      headersMapper: Mappers.BackendGetEntityTagHeaders
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
    Parameters.backendId
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/backends/{backendId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BackendContract,
      headersMapper: Mappers.BackendGetHeaders
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
    Parameters.backendId
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/backends/{backendId}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.BackendContract,
      headersMapper: Mappers.BackendCreateOrUpdateHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters21,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.backendId
  ],
  headerParameters: [Parameters.contentType, Parameters.ifMatch],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/backends/{backendId}",
  httpMethod: "PATCH",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters22,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.backendId
  ],
  headerParameters: [Parameters.contentType, Parameters.ifMatch1],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/backends/{backendId}",
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
    Parameters.backendId
  ],
  headerParameters: [Parameters.ifMatch1],
  serializer
};
const reconnectOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/backends/{backendId}/reconnect",
  httpMethod: "POST",
  responses: {
    202: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters23,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.backendId
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const listByServiceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BackendCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.top,
    Parameters.skip,
    Parameters.apiVersion,
    Parameters.filter14
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  serializer
};
