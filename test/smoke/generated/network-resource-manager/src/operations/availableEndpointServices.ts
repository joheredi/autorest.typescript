/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { NetworkManagementClient } from "../networkManagementClient";
import {
  EndpointServiceResult,
  AvailableEndpointServicesListResponse,
  AvailableEndpointServicesListNextResponse
} from "../models";

/**
 * Class representing a AvailableEndpointServices.
 */
export class AvailableEndpointServices {
  private readonly client: NetworkManagementClient;

  /**
   * Initialize a new instance of the class AvailableEndpointServices class.
   * @param client Reference to the service client
   */
  constructor(client: NetworkManagementClient) {
    this.client = client;
  }

  /**
   * List what values of endpoint services are available for use.
   * @param location The location to check available endpoint services.
   * @param options The options parameters.
   */
  public list(
    location: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<EndpointServiceResult> {
    const iter = this.listPagingAll(location, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(location, options);
      }
    };
  }

  private async *listPagingPage(
    location: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<EndpointServiceResult[]> {
    let result = await this._list(location, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(location, continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    location: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<EndpointServiceResult> {
    for await (const page of this.listPagingPage(location, options)) {
      yield* page;
    }
  }

  /**
   * List what values of endpoint services are available for use.
   * @param location The location to check available endpoint services.
   * @param options The options parameters.
   */
  private _list(
    location: string,
    options?: coreHttp.OperationOptions
  ): Promise<AvailableEndpointServicesListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<AvailableEndpointServicesListResponse>;
  }

  /**
   * ListNext
   * @param location The location to check available endpoint services.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    location: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<AvailableEndpointServicesListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<AvailableEndpointServicesListNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/locations/{location}/virtualNetworkAvailableEndpointServices",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EndpointServicesListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EndpointServicesListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.location
  ],
  headerParameters: [Parameters.accept],
  serializer
};
