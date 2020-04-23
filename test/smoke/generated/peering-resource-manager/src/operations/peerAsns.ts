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
  PeerAsnsGetResponse,
  PeerAsn,
  PeerAsnsCreateOrUpdateResponse,
  PeerAsnsListBySubscriptionResponse,
  PeerAsnsListBySubscriptionNextResponse
} from "../models";

/**
 * Class representing a PeerAsns.
 */
export class PeerAsns {
  private readonly client: PeeringManagementClient;

  /**
   * Initialize a new instance of the class PeerAsns class.
   * @param client Reference to the service client
   */
  constructor(client: PeeringManagementClient) {
    this.client = client;
  }

  /**
   * Gets the peer ASN with the specified name under the given subscription.
   * @param peerAsnName The peer ASN name.
   * @param options The options parameters.
   */
  get(
    peerAsnName: string,
    options?: coreHttp.OperationOptions
  ): Promise<PeerAsnsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { peerAsnName, options: operationOptions },
      getOperationSpec
    ) as Promise<PeerAsnsGetResponse>;
  }

  /**
   * Creates a new peer ASN or updates an existing peer ASN with the specified name under the given
   * subscription.
   * @param peerAsnName The peer ASN name.
   * @param peerAsn The peer ASN.
   * @param options The options parameters.
   */
  createOrUpdate(
    peerAsnName: string,
    peerAsn: PeerAsn,
    options?: coreHttp.OperationOptions
  ): Promise<PeerAsnsCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { peerAsnName, peerAsn, options: operationOptions },
      createOrUpdateOperationSpec
    ) as Promise<PeerAsnsCreateOrUpdateResponse>;
  }

  /**
   * Deletes an existing peer ASN with the specified name under the given subscription.
   * @param peerAsnName The peer ASN name.
   * @param options The options parameters.
   */
  delete(
    peerAsnName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { peerAsnName, options: operationOptions },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Lists all of the peer ASNs under the given subscription.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: coreHttp.OperationOptions
  ): Promise<PeerAsnsListBySubscriptionResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listBySubscriptionOperationSpec
    ) as Promise<PeerAsnsListBySubscriptionResponse>;
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  listBySubscriptionNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<PeerAsnsListBySubscriptionNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listBySubscriptionNextOperationSpec
    ) as Promise<PeerAsnsListBySubscriptionNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/peerAsns/{peerAsnName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PeerAsn
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.peerAsnName
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/peerAsns/{peerAsnName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.PeerAsn
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.peerAsn,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.peerAsnName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/peerAsns/{peerAsnName}",
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
    Parameters.peerAsnName
  ],
  serializer
};
const listBySubscriptionOperationSpec: coreHttp.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/peerAsns",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PeerAsnListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  serializer
};
const listBySubscriptionNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PeerAsnListResult
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
