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
import { WebSiteManagementClient } from "../webSiteManagementClient";
import {
  ApplicationStackResource,
  ProviderGetAvailableStacksNextOptionalParams,
  ProviderGetAvailableStacksOptionalParams,
  CsmOperationDescription,
  ProviderGetAvailableStacksOnPremNextOptionalParams,
  ProviderGetAvailableStacksOnPremOptionalParams,
  ProviderGetAvailableStacksResponse,
  ProviderListOperationsResponse,
  ProviderGetAvailableStacksOnPremResponse,
  ProviderGetAvailableStacksNextResponse,
  ProviderListOperationsNextResponse,
  ProviderGetAvailableStacksOnPremNextResponse
} from "../models";

/**
 * Class representing a Provider.
 */
export class Provider {
  private readonly client: WebSiteManagementClient;

  /**
   * Initialize a new instance of the class Provider class.
   * @param client Reference to the service client
   */
  constructor(client: WebSiteManagementClient) {
    this.client = client;
  }

  /**
   * Description for Get available application frameworks and their versions
   * @param options The options parameters.
   */
  public listAvailableStacks(
    options?: ProviderGetAvailableStacksOptionalParams
  ): PagedAsyncIterableIterator<
    ApplicationStackResource,
    ApplicationStackResource[]
  > {
    const iter = this.getAvailableStacksPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.getAvailableStacksPagingPage(options);
      }
    };
  }

  private async *getAvailableStacksPagingPage(
    options?: ProviderGetAvailableStacksOptionalParams
  ): AsyncIterableIterator<ApplicationStackResource[]> {
    let result = await this._getAvailableStacks(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getAvailableStacksNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getAvailableStacksPagingAll(
    options?: ProviderGetAvailableStacksOptionalParams
  ): AsyncIterableIterator<ApplicationStackResource> {
    for await (const page of this.getAvailableStacksPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Description for Gets all available operations for the Microsoft.Web resource provider. Also exposes
   * resource metric definitions
   * @param options The options parameters.
   */
  public listOperations(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<
    CsmOperationDescription,
    CsmOperationDescription[]
  > {
    const iter = this.listOperationsPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listOperationsPagingPage(options);
      }
    };
  }

  private async *listOperationsPagingPage(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<CsmOperationDescription[]> {
    let result = await this._listOperations(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listOperationsNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listOperationsPagingAll(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<CsmOperationDescription> {
    for await (const page of this.listOperationsPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Description for Get available application frameworks and their versions
   * @param options The options parameters.
   */
  public listAvailableStacksOnPrem(
    options?: ProviderGetAvailableStacksOnPremOptionalParams
  ): PagedAsyncIterableIterator<
    ApplicationStackResource,
    ApplicationStackResource[]
  > {
    const iter = this.getAvailableStacksOnPremPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.getAvailableStacksOnPremPagingPage(options);
      }
    };
  }

  private async *getAvailableStacksOnPremPagingPage(
    options?: ProviderGetAvailableStacksOnPremOptionalParams
  ): AsyncIterableIterator<ApplicationStackResource[]> {
    let result = await this._getAvailableStacksOnPrem(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getAvailableStacksOnPremNext(
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getAvailableStacksOnPremPagingAll(
    options?: ProviderGetAvailableStacksOnPremOptionalParams
  ): AsyncIterableIterator<ApplicationStackResource> {
    for await (const page of this.getAvailableStacksOnPremPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Description for Get available application frameworks and their versions
   * @param options The options parameters.
   */
  private _getAvailableStacks(
    options?: ProviderGetAvailableStacksOptionalParams
  ): Promise<ProviderGetAvailableStacksResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getAvailableStacksOperationSpec
    ) as Promise<ProviderGetAvailableStacksResponse>;
  }

  /**
   * Description for Gets all available operations for the Microsoft.Web resource provider. Also exposes
   * resource metric definitions
   * @param options The options parameters.
   */
  private _listOperations(
    options?: coreHttp.OperationOptions
  ): Promise<ProviderListOperationsResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationsOperationSpec
    ) as Promise<ProviderListOperationsResponse>;
  }

  /**
   * Description for Get available application frameworks and their versions
   * @param options The options parameters.
   */
  private _getAvailableStacksOnPrem(
    options?: ProviderGetAvailableStacksOnPremOptionalParams
  ): Promise<ProviderGetAvailableStacksOnPremResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getAvailableStacksOnPremOperationSpec
    ) as Promise<ProviderGetAvailableStacksOnPremResponse>;
  }

  /**
   * GetAvailableStacksNext
   * @param nextLink The nextLink from the previous successful call to the GetAvailableStacks method.
   * @param options The options parameters.
   */
  private _getAvailableStacksNext(
    nextLink: string,
    options?: ProviderGetAvailableStacksNextOptionalParams
  ): Promise<ProviderGetAvailableStacksNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getAvailableStacksNextOperationSpec
    ) as Promise<ProviderGetAvailableStacksNextResponse>;
  }

  /**
   * ListOperationsNext
   * @param nextLink The nextLink from the previous successful call to the ListOperations method.
   * @param options The options parameters.
   */
  private _listOperationsNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<ProviderListOperationsNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationsNextOperationSpec
    ) as Promise<ProviderListOperationsNextResponse>;
  }

  /**
   * GetAvailableStacksOnPremNext
   * @param nextLink The nextLink from the previous successful call to the GetAvailableStacksOnPrem
   *                 method.
   * @param options The options parameters.
   */
  private _getAvailableStacksOnPremNext(
    nextLink: string,
    options?: ProviderGetAvailableStacksOnPremNextOptionalParams
  ): Promise<ProviderGetAvailableStacksOnPremNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getAvailableStacksOnPremNextOperationSpec
    ) as Promise<ProviderGetAvailableStacksOnPremNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getAvailableStacksOperationSpec: coreHttp.OperationSpec = {
  path: "/providers/Microsoft.Web/availableStacks",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApplicationStackCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.osTypeSelected],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationsOperationSpec: coreHttp.OperationSpec = {
  path: "/providers/Microsoft.Web/operations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CsmOperationCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const getAvailableStacksOnPremOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/availableStacks",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApplicationStackCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.osTypeSelected1],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const getAvailableStacksNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApplicationStackCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.osTypeSelected],
  urlParameters: [Parameters.$host, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationsNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CsmOperationCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
const getAvailableStacksOnPremNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApplicationStackCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.osTypeSelected1],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
