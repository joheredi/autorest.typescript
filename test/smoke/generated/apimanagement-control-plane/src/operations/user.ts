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
  UserListOptionalParams,
  UserListResponse,
  UserGetResponse,
  UserCreateParameters,
  UserCreateOrUpdateResponse,
  UserUpdateParameters,
  UserDeleteOptionalParams,
  UserGenerateSsoUrlResponse,
  UserTokenParameters,
  UserGetSharedAccessTokenResponse,
  UserListNextOptionalParams,
  UserListNextResponse
} from "../models";

/**
 * Class representing a User.
 */
export class User {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class User class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Lists a collection of registered users in the specified service instance.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param options The options parameters.
   */
  list(
    apimBaseUrl: string,
    options?: UserListOptionalParams
  ): Promise<UserListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, options: operationOptions },
      listOperationSpec
    ) as Promise<UserListResponse>;
  }

  /**
   * Gets the details of the user specified by its identifier.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param uid User identifier. Must be unique in the current API Management service instance.
   * @param options The options parameters.
   */
  get(
    apimBaseUrl: string,
    uid: string,
    options?: coreHttp.OperationOptions
  ): Promise<UserGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, uid, options: operationOptions },
      getOperationSpec
    ) as Promise<UserGetResponse>;
  }

  /**
   * Creates or Updates a user.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param uid User identifier. Must be unique in the current API Management service instance.
   * @param parameters Create or update parameters.
   * @param options The options parameters.
   */
  createOrUpdate(
    apimBaseUrl: string,
    uid: string,
    parameters: UserCreateParameters,
    options?: coreHttp.OperationOptions
  ): Promise<UserCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, uid, parameters, options: operationOptions },
      createOrUpdateOperationSpec
    ) as Promise<UserCreateOrUpdateResponse>;
  }

  /**
   * Updates the details of the user specified by its identifier.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param uid User identifier. Must be unique in the current API Management service instance.
   * @param parameters Update parameters.
   * @param ifMatch The entity state (Etag) version of the user to update. A value of "*" can be used for
   *                If-Match to unconditionally apply the operation.
   * @param options The options parameters.
   */
  update(
    apimBaseUrl: string,
    uid: string,
    parameters: UserUpdateParameters,
    ifMatch: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, uid, parameters, ifMatch, options: operationOptions },
      updateOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Deletes specific user.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param uid User identifier. Must be unique in the current API Management service instance.
   * @param ifMatch The entity state (Etag) version of the user to delete. A value of "*" can be used for
   *                If-Match to unconditionally apply the operation.
   * @param options The options parameters.
   */
  delete(
    apimBaseUrl: string,
    uid: string,
    ifMatch: string,
    options?: UserDeleteOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, uid, ifMatch, options: operationOptions },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Retrieves a redirection URL containing an authentication token for signing a given user into the
   * developer portal.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param uid User identifier. Must be unique in the current API Management service instance.
   * @param options The options parameters.
   */
  generateSsoUrl(
    apimBaseUrl: string,
    uid: string,
    options?: coreHttp.OperationOptions
  ): Promise<UserGenerateSsoUrlResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, uid, options: operationOptions },
      generateSsoUrlOperationSpec
    ) as Promise<UserGenerateSsoUrlResponse>;
  }

  /**
   * Gets the Shared Access Authorization Token for the User.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param uid User identifier. Must be unique in the current API Management service instance.
   * @param parameters Create Authorization Token parameters.
   * @param options The options parameters.
   */
  getSharedAccessToken(
    apimBaseUrl: string,
    uid: string,
    parameters: UserTokenParameters,
    options?: coreHttp.OperationOptions
  ): Promise<UserGetSharedAccessTokenResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, uid, parameters, options: operationOptions },
      getSharedAccessTokenOperationSpec
    ) as Promise<UserGetSharedAccessTokenResponse>;
  }

  /**
   * ListNext
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    apimBaseUrl: string,
    nextLink: string,
    options?: UserListNextOptionalParams
  ): Promise<UserListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<UserListNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path: "/users",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UserCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.top,
    Parameters.skip,
    Parameters.filter8
  ],
  urlParameters: [Parameters.apimBaseUrl],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path: "/users/{uid}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UserContract,
      headersMapper: Mappers.UserGetHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.apimBaseUrl, Parameters.uid],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path: "/users/{uid}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.UserContract
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters39,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.apimBaseUrl, Parameters.uid],
  headerParameters: [Parameters.contentType],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path: "/users/{uid}",
  httpMethod: "PATCH",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters40,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.apimBaseUrl, Parameters.uid],
  headerParameters: [Parameters.contentType, Parameters.ifMatch29],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path: "/users/{uid}",
  httpMethod: "DELETE",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.deleteSubscriptions1,
    Parameters.notify2
  ],
  urlParameters: [Parameters.apimBaseUrl, Parameters.uid],
  headerParameters: [Parameters.ifMatch30],
  serializer
};
const generateSsoUrlOperationSpec: coreHttp.OperationSpec = {
  path: "/users/{uid}/generateSsoUrl",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.GenerateSsoUrlResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.apimBaseUrl, Parameters.uid],
  serializer
};
const getSharedAccessTokenOperationSpec: coreHttp.OperationSpec = {
  path: "/users/{uid}/token",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.UserTokenResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters41,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.apimBaseUrl, Parameters.uid],
  headerParameters: [Parameters.contentType],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UserCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.top,
    Parameters.skip,
    Parameters.filter8
  ],
  urlParameters: [Parameters.apimBaseUrl, Parameters.nextLink],
  serializer
};
