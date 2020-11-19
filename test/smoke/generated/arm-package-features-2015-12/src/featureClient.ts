/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Features } from "./operations";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import { FeatureClientContext } from "./featureClientContext";
import {
  FeatureClientOptionalParams,
  Operation,
  FeatureClientListOperationsResponse,
  FeatureClientListOperationsNextResponse
} from "./models";

export class FeatureClient extends FeatureClientContext {
  /**
   * Initializes a new instance of the FeatureClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId The ID of the target subscription.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    subscriptionId: string,
    options?: FeatureClientOptionalParams
  ) {
    super(credentials, subscriptionId, options);
    this.features = new Features(this);
  }

  /**
   * Lists all of the available Microsoft.Features REST API operations.
   * @param options The options parameters.
   */
  public listOperations(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<Operation> {
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
  ): AsyncIterableIterator<Operation[]> {
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
  ): AsyncIterableIterator<Operation> {
    for await (const page of this.listOperationsPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Lists all of the available Microsoft.Features REST API operations.
   * @param options The options parameters.
   */
  private _listOperations(
    options?: coreHttp.OperationOptions
  ): Promise<FeatureClientListOperationsResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      listOperationsOperationSpec
    ) as Promise<FeatureClientListOperationsResponse>;
  }

  /**
   * ListOperationsNext
   * @param nextLink The nextLink from the previous successful call to the ListOperations method.
   * @param options The options parameters.
   */
  private _listOperationsNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<FeatureClientListOperationsNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      listOperationsNextOperationSpec
    ) as Promise<FeatureClientListOperationsNextResponse>;
  }

  features: Features;
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationsOperationSpec: coreHttp.OperationSpec = {
  path: "/providers/Microsoft.Features/operations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OperationListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationsNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OperationListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
