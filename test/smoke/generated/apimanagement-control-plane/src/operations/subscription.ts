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
  SubscriptionListOptionalParams,
  SubscriptionListResponse,
  SubscriptionGetResponse,
  SubscriptionCreateParameters,
  SubscriptionCreateOrUpdateOptionalParams,
  SubscriptionCreateOrUpdateResponse,
  SubscriptionUpdateParameters,
  SubscriptionUpdateOptionalParams,
  SubscriptionListNextOptionalParams,
  SubscriptionListNextResponse
} from "../models";

/**
 * Class representing a Subscription.
 */
export class Subscription {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class Subscription class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Lists all subscriptions of the API Management service instance.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param options The options parameters.
   */
  list(
    apimBaseUrl: string,
    options?: SubscriptionListOptionalParams
  ): Promise<SubscriptionListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, options: operationOptions },
      listOperationSpec
    ) as Promise<SubscriptionListResponse>;
  }

  /**
   * Gets the specified Subscription entity.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param sid Subscription entity Identifier. The entity represents the association between a user and
   *            a product in API Management.
   * @param options The options parameters.
   */
  get(
    apimBaseUrl: string,
    sid: string,
    options?: coreHttp.OperationOptions
  ): Promise<SubscriptionGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, sid, options: operationOptions },
      getOperationSpec
    ) as Promise<SubscriptionGetResponse>;
  }

  /**
   * Creates or updates the subscription of specified user to the specified product.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param sid Subscription entity Identifier. The entity represents the association between a user and
   *            a product in API Management.
   * @param parameters Create parameters.
   * @param options The options parameters.
   */
  createOrUpdate(
    apimBaseUrl: string,
    sid: string,
    parameters: SubscriptionCreateParameters,
    options?: SubscriptionCreateOrUpdateOptionalParams
  ): Promise<SubscriptionCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, sid, parameters, options: operationOptions },
      createOrUpdateOperationSpec
    ) as Promise<SubscriptionCreateOrUpdateResponse>;
  }

  /**
   * Updates the details of a subscription specified by its identifier.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param sid Subscription entity Identifier. The entity represents the association between a user and
   *            a product in API Management.
   * @param parameters Update parameters.
   * @param ifMatch ETag of the Subscription Entity. ETag should match the current entity state from the
   *                header response of the GET request or it should be * for unconditional update.
   * @param options The options parameters.
   */
  update(
    apimBaseUrl: string,
    sid: string,
    parameters: SubscriptionUpdateParameters,
    ifMatch: string,
    options?: SubscriptionUpdateOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, sid, parameters, ifMatch, options: operationOptions },
      updateOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Deletes the specified subscription.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param sid Subscription entity Identifier. The entity represents the association between a user and
   *            a product in API Management.
   * @param ifMatch ETag of the Subscription Entity. ETag should match the current entity state from the
   *                header response of the GET request or it should be * for unconditional update.
   * @param options The options parameters.
   */
  delete(
    apimBaseUrl: string,
    sid: string,
    ifMatch: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, sid, ifMatch, options: operationOptions },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Regenerates primary key of existing subscription of the API Management service instance.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param sid Subscription entity Identifier. The entity represents the association between a user and
   *            a product in API Management.
   * @param options The options parameters.
   */
  regeneratePrimaryKey(
    apimBaseUrl: string,
    sid: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, sid, options: operationOptions },
      regeneratePrimaryKeyOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Regenerates secondary key of existing subscription of the API Management service instance.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param sid Subscription entity Identifier. The entity represents the association between a user and
   *            a product in API Management.
   * @param options The options parameters.
   */
  regenerateSecondaryKey(
    apimBaseUrl: string,
    sid: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, sid, options: operationOptions },
      regenerateSecondaryKeyOperationSpec
    ) as Promise<coreHttp.RestResponse>;
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
    options?: SubscriptionListNextOptionalParams
  ): Promise<SubscriptionListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<SubscriptionListNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path: "/subscriptions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SubscriptionCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.top,
    Parameters.skip,
    Parameters.filter12
  ],
  urlParameters: [Parameters.apimBaseUrl],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path: "/subscriptions/{sid}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SubscriptionContract,
      headersMapper: Mappers.SubscriptionGetHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.apimBaseUrl, Parameters.sid],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path: "/subscriptions/{sid}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.SubscriptionContract
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters33,
  queryParameters: [Parameters.apiVersion, Parameters.notify],
  urlParameters: [Parameters.apimBaseUrl, Parameters.sid],
  headerParameters: [Parameters.contentType],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path: "/subscriptions/{sid}",
  httpMethod: "PATCH",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters34,
  queryParameters: [Parameters.apiVersion, Parameters.notify1],
  urlParameters: [Parameters.apimBaseUrl, Parameters.sid],
  headerParameters: [Parameters.contentType, Parameters.ifMatch28],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path: "/subscriptions/{sid}",
  httpMethod: "DELETE",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.apimBaseUrl, Parameters.sid],
  headerParameters: [Parameters.ifMatch28],
  serializer
};
const regeneratePrimaryKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/subscriptions/{sid}/regeneratePrimaryKey",
  httpMethod: "POST",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.apimBaseUrl, Parameters.sid],
  serializer
};
const regenerateSecondaryKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/subscriptions/{sid}/regenerateSecondaryKey",
  httpMethod: "POST",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.apimBaseUrl, Parameters.sid],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SubscriptionCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.top,
    Parameters.skip,
    Parameters.filter12
  ],
  urlParameters: [Parameters.apimBaseUrl, Parameters.nextLink],
  serializer
};
