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
import { SubscriptionClient } from "../subscriptionClient";
import {
  DelegatedProviderOffersListResponse,
  DelegatedProviderOffersGetResponse,
  DelegatedProviderOffersListNextResponse
} from "../models";

/**
 * Class representing a DelegatedProviderOffers.
 */
export class DelegatedProviderOffers {
  private readonly client: SubscriptionClient;

  /**
   * Initialize a new instance of the class DelegatedProviderOffers class.
   * @param client Reference to the service client
   */
  constructor(client: SubscriptionClient) {
    this.client = client;
  }

  /**
   * Get the list of offers for the specified delegated provider.
   * @param delegatedProviderId Id of the delegated provider.
   * @param options The options parameters.
   */
  list(
    delegatedProviderId: string,
    options?: coreHttp.OperationOptions
  ): Promise<DelegatedProviderOffersListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { delegatedProviderId, options: operationOptions },
      listOperationSpec
    ) as Promise<DelegatedProviderOffersListResponse>;
  }

  /**
   * Get the specified offer for the delegated provider.
   * @param delegatedProviderId Id of the delegated provider.
   * @param offerName Name of the offer.
   * @param options The options parameters.
   */
  get(
    delegatedProviderId: string,
    offerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DelegatedProviderOffersGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { delegatedProviderId, offerName, options: operationOptions },
      getOperationSpec
    ) as Promise<DelegatedProviderOffersGetResponse>;
  }

  /**
   * ListNext
   * @param delegatedProviderId Id of the delegated provider.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    delegatedProviderId: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<DelegatedProviderOffersListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { delegatedProviderId, nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<DelegatedProviderOffersListNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path: "/delegatedProviders/{delegatedProviderId}/offers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OfferList
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.delegatedProviderId],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path: "/delegatedProviders/{delegatedProviderId}/offers/{offerName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Offer
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.delegatedProviderId,
    Parameters.offerName
  ],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OfferList
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.delegatedProviderId,
    Parameters.nextLink
  ],
  serializer
};
