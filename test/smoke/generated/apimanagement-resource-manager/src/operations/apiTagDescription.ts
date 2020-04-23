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
  ApiTagDescriptionListByServiceOptionalParams,
  ApiTagDescriptionListByServiceResponse,
  ApiTagDescriptionGetEntityTagResponse,
  ApiTagDescriptionGetResponse,
  TagDescriptionCreateParameters,
  ApiTagDescriptionCreateOrUpdateOptionalParams,
  ApiTagDescriptionCreateOrUpdateResponse,
  ApiTagDescriptionListByServiceNextOptionalParams,
  ApiTagDescriptionListByServiceNextResponse
} from "../models";

/**
 * Class representing a ApiTagDescription.
 */
export class ApiTagDescription {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class ApiTagDescription class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Lists all Tags descriptions in scope of API. Model similar to swagger - tagDescription is defined on
   * API level but tag may be assigned to the Operations
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param options The options parameters.
   */
  listByService(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiTagDescriptionListByServiceOptionalParams
  ): Promise<ApiTagDescriptionListByServiceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, apiId, options: operationOptions },
      listByServiceOperationSpec
    ) as Promise<ApiTagDescriptionListByServiceResponse>;
  }

  /**
   * Gets the entity state version of the tag specified by its identifier.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param tagDescriptionId Tag description identifier. Used when creating tagDescription for API/Tag
   *                         association. Based on API and Tag names.
   * @param options The options parameters.
   */
  getEntityTag(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    tagDescriptionId: string,
    options?: coreHttp.OperationOptions
  ): Promise<ApiTagDescriptionGetEntityTagResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        apiId,
        tagDescriptionId,
        options: operationOptions
      },
      getEntityTagOperationSpec
    ) as Promise<ApiTagDescriptionGetEntityTagResponse>;
  }

  /**
   * Get Tag description in scope of API
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param tagDescriptionId Tag description identifier. Used when creating tagDescription for API/Tag
   *                         association. Based on API and Tag names.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    tagDescriptionId: string,
    options?: coreHttp.OperationOptions
  ): Promise<ApiTagDescriptionGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        apiId,
        tagDescriptionId,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<ApiTagDescriptionGetResponse>;
  }

  /**
   * Create/Update tag description in scope of the Api.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param tagDescriptionId Tag description identifier. Used when creating tagDescription for API/Tag
   *                         association. Based on API and Tag names.
   * @param parameters Create parameters.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    tagDescriptionId: string,
    parameters: TagDescriptionCreateParameters,
    options?: ApiTagDescriptionCreateOrUpdateOptionalParams
  ): Promise<ApiTagDescriptionCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        apiId,
        tagDescriptionId,
        parameters,
        options: operationOptions
      },
      createOrUpdateOperationSpec
    ) as Promise<ApiTagDescriptionCreateOrUpdateResponse>;
  }

  /**
   * Delete tag description for the Api.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param tagDescriptionId Tag description identifier. Used when creating tagDescription for API/Tag
   *                         association. Based on API and Tag names.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    ifMatch: string,
    tagDescriptionId: string,
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
        ifMatch,
        tagDescriptionId,
        options: operationOptions
      },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * ListByServiceNext
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param nextLink The nextLink from the previous successful call to the ListByService method.
   * @param options The options parameters.
   */
  listByServiceNext(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    nextLink: string,
    options?: ApiTagDescriptionListByServiceNextOptionalParams
  ): Promise<ApiTagDescriptionListByServiceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        apiId,
        nextLink,
        options: operationOptions
      },
      listByServiceNextOperationSpec
    ) as Promise<ApiTagDescriptionListByServiceNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listByServiceOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tagDescriptions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TagDescriptionCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.top,
    Parameters.skip,
    Parameters.apiVersion,
    Parameters.filter5
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.apiId
  ],
  serializer
};
const getEntityTagOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tagDescriptions/{tagDescriptionId}",
  httpMethod: "HEAD",
  responses: {
    200: {
      headersMapper: Mappers.ApiTagDescriptionGetEntityTagHeaders
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
    Parameters.tagDescriptionId
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tagDescriptions/{tagDescriptionId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TagDescriptionContract,
      headersMapper: Mappers.ApiTagDescriptionGetHeaders
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
    Parameters.tagDescriptionId
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tagDescriptions/{tagDescriptionId}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.TagDescriptionContract,
      headersMapper: Mappers.ApiTagDescriptionCreateOrUpdateHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters16,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.apiId,
    Parameters.tagDescriptionId
  ],
  headerParameters: [Parameters.contentType, Parameters.ifMatch],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/tagDescriptions/{tagDescriptionId}",
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
    Parameters.tagDescriptionId
  ],
  headerParameters: [Parameters.ifMatch1],
  serializer
};
const listByServiceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TagDescriptionCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.top,
    Parameters.skip,
    Parameters.apiVersion,
    Parameters.filter5
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.apiId,
    Parameters.nextLink
  ],
  serializer
};
