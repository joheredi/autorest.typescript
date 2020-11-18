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
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  ExpressRouteCircuitAuthorization,
  ExpressRouteCircuitAuthorizationsGetResponse,
  ExpressRouteCircuitAuthorizationsCreateOrUpdateResponse,
  ExpressRouteCircuitAuthorizationsListResponse,
  ExpressRouteCircuitAuthorizationsListNextResponse
} from "../models";

/**
 * Class representing a ExpressRouteCircuitAuthorizations.
 */
export class ExpressRouteCircuitAuthorizations {
  private readonly client: NetworkManagementClient;

  /**
   * Initialize a new instance of the class ExpressRouteCircuitAuthorizations class.
   * @param client Reference to the service client
   */
  constructor(client: NetworkManagementClient) {
    this.client = client;
  }

  /**
   * Gets all authorizations in an express route circuit.
   * @param resourceGroupName The name of the resource group.
   * @param circuitName The name of the circuit.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    circuitName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<
    ExpressRouteCircuitAuthorization,
    ExpressRouteCircuitAuthorization[]
  > {
    const iter = this.listPagingAll(resourceGroupName, circuitName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(resourceGroupName, circuitName, options);
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    circuitName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<ExpressRouteCircuitAuthorization[]> {
    let result = await this._list(resourceGroupName, circuitName, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        circuitName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    circuitName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<ExpressRouteCircuitAuthorization> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      circuitName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Deletes the specified authorization from the specified express route circuit.
   * @param resourceGroupName The name of the resource group.
   * @param circuitName The name of the express route circuit.
   * @param authorizationName The name of the authorization.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    circuitName: string,
    authorizationName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      circuitName,
      authorizationName,
      options: this.getOperationOptions(options, "location")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      deleteOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * Gets the specified authorization from the specified express route circuit.
   * @param resourceGroupName The name of the resource group.
   * @param circuitName The name of the express route circuit.
   * @param authorizationName The name of the authorization.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    circuitName: string,
    authorizationName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ExpressRouteCircuitAuthorizationsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      circuitName,
      authorizationName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<ExpressRouteCircuitAuthorizationsGetResponse>;
  }

  /**
   * Creates or updates an authorization in the specified express route circuit.
   * @param resourceGroupName The name of the resource group.
   * @param circuitName The name of the express route circuit.
   * @param authorizationName The name of the authorization.
   * @param authorizationParameters Parameters supplied to the create or update express route circuit
   *                                authorization operation.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    circuitName: string,
    authorizationName: string,
    authorizationParameters: ExpressRouteCircuitAuthorization,
    options?: coreHttp.OperationOptions
  ): Promise<
    LROPoller<ExpressRouteCircuitAuthorizationsCreateOrUpdateResponse>
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      circuitName,
      authorizationName,
      authorizationParameters,
      options: this.getOperationOptions(options, "azure-async-operation")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        ExpressRouteCircuitAuthorizationsCreateOrUpdateResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      createOrUpdateOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createOrUpdateOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "azure-async-operation"
    });
  }

  /**
   * Gets all authorizations in an express route circuit.
   * @param resourceGroupName The name of the resource group.
   * @param circuitName The name of the circuit.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    circuitName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ExpressRouteCircuitAuthorizationsListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      circuitName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<ExpressRouteCircuitAuthorizationsListResponse>;
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group.
   * @param circuitName The name of the circuit.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    circuitName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<ExpressRouteCircuitAuthorizationsListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      circuitName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<ExpressRouteCircuitAuthorizationsListNextResponse>;
  }

  private getOperationOptions<TOptions extends coreHttp.OperationOptions>(
    options: TOptions | undefined,
    finalStateVia?: string
  ): coreHttp.RequestOptionsBase {
    const operationOptions: coreHttp.OperationOptions = options || {};
    operationOptions.requestOptions = {
      ...operationOptions.requestOptions,
      shouldDeserialize: shouldDeserializeLRO(finalStateVia)
    };
    return coreHttp.operationOptionsToRequestOptionsBase(operationOptions);
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/authorizations/{authorizationName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.circuitName,
    Parameters.authorizationName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/authorizations/{authorizationName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ExpressRouteCircuitAuthorization
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.circuitName,
    Parameters.authorizationName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/authorizations/{authorizationName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ExpressRouteCircuitAuthorization
    },
    201: {
      bodyMapper: Mappers.ExpressRouteCircuitAuthorization
    },
    202: {
      bodyMapper: Mappers.ExpressRouteCircuitAuthorization
    },
    204: {
      bodyMapper: Mappers.ExpressRouteCircuitAuthorization
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.authorizationParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.circuitName,
    Parameters.authorizationName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/{circuitName}/authorizations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AuthorizationListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.circuitName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AuthorizationListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.circuitName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
