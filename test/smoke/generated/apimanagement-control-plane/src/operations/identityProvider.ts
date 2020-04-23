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
  IdentityProviderListResponse,
  IdentityProviderType,
  IdentityProviderGetResponse,
  IdentityProviderContract,
  IdentityProviderCreateOrUpdateResponse,
  IdentityProviderUpdateParameters
} from "../models";

/**
 * Class representing a IdentityProvider.
 */
export class IdentityProvider {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class IdentityProvider class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Lists a collection of Identity Provider configured in the specified service instance.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param options The options parameters.
   */
  list(
    apimBaseUrl: string,
    options?: coreHttp.OperationOptions
  ): Promise<IdentityProviderListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, options: operationOptions },
      listOperationSpec
    ) as Promise<IdentityProviderListResponse>;
  }

  /**
   * Gets the configuration details of the identity Provider configured in specified service instance.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param identityProviderName Identity Provider Type identifier.
   * @param options The options parameters.
   */
  get(
    apimBaseUrl: string,
    identityProviderName: IdentityProviderType,
    options?: coreHttp.OperationOptions
  ): Promise<IdentityProviderGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, identityProviderName, options: operationOptions },
      getOperationSpec
    ) as Promise<IdentityProviderGetResponse>;
  }

  /**
   * Creates or Updates the IdentityProvider configuration.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param identityProviderName Identity Provider Type identifier.
   * @param parameters Create parameters.
   * @param options The options parameters.
   */
  createOrUpdate(
    apimBaseUrl: string,
    identityProviderName: IdentityProviderType,
    parameters: IdentityProviderContract,
    options?: coreHttp.OperationOptions
  ): Promise<IdentityProviderCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        apimBaseUrl,
        identityProviderName,
        parameters,
        options: operationOptions
      },
      createOrUpdateOperationSpec
    ) as Promise<IdentityProviderCreateOrUpdateResponse>;
  }

  /**
   * Updates an existing IdentityProvider configuration.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param identityProviderName Identity Provider Type identifier.
   * @param parameters Update parameters.
   * @param ifMatch The entity state (Etag) version of the identity provider configuration to update. A
   *                value of "*" can be used for If-Match to unconditionally apply the operation.
   * @param options The options parameters.
   */
  update(
    apimBaseUrl: string,
    identityProviderName: IdentityProviderType,
    parameters: IdentityProviderUpdateParameters,
    ifMatch: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        apimBaseUrl,
        identityProviderName,
        parameters,
        ifMatch,
        options: operationOptions
      },
      updateOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Deletes the specified identity provider configuration.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param ifMatch The entity state (Etag) version of the backend to delete. A value of "*" can be used
   *                for If-Match to unconditionally apply the operation.
   * @param identityProviderName Identity Provider Type identifier.
   * @param options The options parameters.
   */
  delete(
    apimBaseUrl: string,
    ifMatch: string,
    identityProviderName: IdentityProviderType,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, ifMatch, identityProviderName, options: operationOptions },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path: "/identityProviders",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IdentityProviderList
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.apimBaseUrl],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path: "/identityProviders/{identityProviderName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IdentityProviderContract,
      headersMapper: Mappers.IdentityProviderGetHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.apimBaseUrl, Parameters.identityProviderName],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path: "/identityProviders/{identityProviderName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.IdentityProviderContract
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters15,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.apimBaseUrl, Parameters.identityProviderName],
  headerParameters: [Parameters.contentType],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path: "/identityProviders/{identityProviderName}",
  httpMethod: "PATCH",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters16,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.apimBaseUrl, Parameters.identityProviderName],
  headerParameters: [Parameters.contentType, Parameters.ifMatch19],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path: "/identityProviders/{identityProviderName}",
  httpMethod: "DELETE",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.apimBaseUrl, Parameters.identityProviderName],
  headerParameters: [Parameters.ifMatch14],
  serializer
};
