/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { LoadBalancerProbes } from "../operationsInterfaces";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { NetworkManagementClientContext } from "../networkManagementClientContext";
import {
  Probe,
  LoadBalancerProbesListResponse,
  LoadBalancerProbesGetResponse,
  LoadBalancerProbesListNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class representing a LoadBalancerProbes. */
export class LoadBalancerProbesImpl implements LoadBalancerProbes {
  private readonly client: NetworkManagementClientContext;

  /**
   * Initialize a new instance of the class LoadBalancerProbes class.
   * @param client Reference to the service client
   */
  constructor(client: NetworkManagementClientContext) {
    this.client = client;
  }

  /**
   * Gets all the load balancer probes.
   * @param resourceGroupName The name of the resource group.
   * @param loadBalancerName The name of the load balancer.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    loadBalancerName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<Probe> {
    const iter = this.listPagingAll(
      resourceGroupName,
      loadBalancerName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(
          resourceGroupName,
          loadBalancerName,
          options
        );
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    loadBalancerName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<Probe[]> {
    let result = await this._list(resourceGroupName, loadBalancerName, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(
        resourceGroupName,
        loadBalancerName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    resourceGroupName: string,
    loadBalancerName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<Probe> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      loadBalancerName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets all the load balancer probes.
   * @param resourceGroupName The name of the resource group.
   * @param loadBalancerName The name of the load balancer.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    loadBalancerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LoadBalancerProbesListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      loadBalancerName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<LoadBalancerProbesListResponse>;
  }

  /**
   * Gets load balancer probe.
   * @param resourceGroupName The name of the resource group.
   * @param loadBalancerName The name of the load balancer.
   * @param probeName The name of the probe.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    loadBalancerName: string,
    probeName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LoadBalancerProbesGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      loadBalancerName,
      probeName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<LoadBalancerProbesGetResponse>;
  }

  /**
   * ListNext
   * @param resourceGroupName The name of the resource group.
   * @param loadBalancerName The name of the load balancer.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    resourceGroupName: string,
    loadBalancerName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<LoadBalancerProbesListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      loadBalancerName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<LoadBalancerProbesListNextResponse>;
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/probes",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LoadBalancerProbeListResult
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
    Parameters.loadBalancerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/probes/{probeName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Probe
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
    Parameters.loadBalancerName,
    Parameters.probeName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LoadBalancerProbeListResult
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
    Parameters.loadBalancerName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
