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
  ProductApiListByProductOptionalParams,
  ProductApiListByProductResponse,
  ProductApiCreateOrUpdateResponse,
  ProductApiListByProductNextOptionalParams,
  ProductApiListByProductNextResponse
} from "../models";

/**
 * Class representing a ProductApi.
 */
export class ProductApi {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class ProductApi class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Lists a collection of the APIs associated with a product.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param productId Product identifier. Must be unique in the current API Management service instance.
   * @param options The options parameters.
   */
  listByProduct(
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    options?: ProductApiListByProductOptionalParams
  ): Promise<ProductApiListByProductResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, productId, options: operationOptions },
      listByProductOperationSpec
    ) as Promise<ProductApiListByProductResponse>;
  }

  /**
   * Checks that API entity specified by identifier is associated with the Product entity.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param productId Product identifier. Must be unique in the current API Management service instance.
   * @param options The options parameters.
   */
  checkEntityExists(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    productId: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        apiId,
        productId,
        options: operationOptions
      },
      checkEntityExistsOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Adds an API to the specified product.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param productId Product identifier. Must be unique in the current API Management service instance.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    productId: string,
    options?: coreHttp.OperationOptions
  ): Promise<ProductApiCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        apiId,
        productId,
        options: operationOptions
      },
      createOrUpdateOperationSpec
    ) as Promise<ProductApiCreateOrUpdateResponse>;
  }

  /**
   * Deletes the specified API from the specified product.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param productId Product identifier. Must be unique in the current API Management service instance.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    productId: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        apiId,
        productId,
        options: operationOptions
      },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * ListByProductNext
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param productId Product identifier. Must be unique in the current API Management service instance.
   * @param nextLink The nextLink from the previous successful call to the ListByProduct method.
   * @param options The options parameters.
   */
  listByProductNext(
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    nextLink: string,
    options?: ProductApiListByProductNextOptionalParams
  ): Promise<ProductApiListByProductNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        productId,
        nextLink,
        options: operationOptions
      },
      listByProductNextOperationSpec
    ) as Promise<ProductApiListByProductNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listByProductOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/products/{productId}/apis",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApiCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.filter,
    Parameters.top,
    Parameters.skip,
    Parameters.apiVersion
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.productId
  ],
  serializer
};
const checkEntityExistsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/products/{productId}/apis/{apiId}",
  httpMethod: "HEAD",
  responses: {
    204: {},
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
    Parameters.apiId,
    Parameters.productId
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/products/{productId}/apis/{apiId}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ApiContract
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
    Parameters.apiId,
    Parameters.productId
  ],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/products/{productId}/apis/{apiId}",
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
    Parameters.apiId,
    Parameters.productId
  ],
  serializer
};
const listByProductNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApiCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.filter,
    Parameters.top,
    Parameters.skip,
    Parameters.apiVersion
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.productId,
    Parameters.nextLink4
  ],
  serializer
};
