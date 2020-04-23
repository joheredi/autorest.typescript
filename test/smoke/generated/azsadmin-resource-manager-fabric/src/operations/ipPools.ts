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
import { FabricAdminClient } from "../fabricAdminClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  IpPoolsGetResponse,
  IpPool,
  IpPoolsCreateOrUpdateResponse,
  IpPoolsListOptionalParams,
  IpPoolsListResponse,
  IpPoolsListNextOptionalParams,
  IpPoolsListNextResponse
} from "../models";

/**
 * Class representing a IpPools.
 */
export class IpPools {
  private readonly client: FabricAdminClient;

  /**
   * Initialize a new instance of the class IpPools class.
   * @param client Reference to the service client
   */
  constructor(client: FabricAdminClient) {
    this.client = client;
  }

  /**
   * Return the requested IP pool.
   * @param resourceGroupName Name of the resource group.
   * @param location Location of the resource.
   * @param ipPool IP pool name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    location: string,
    ipPool: string,
    options?: coreHttp.OperationOptions
  ): Promise<IpPoolsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, location, ipPool, options: operationOptions },
      getOperationSpec
    ) as Promise<IpPoolsGetResponse>;
  }

  /**
   * Create an IP pool.  Once created an IP pool cannot be deleted.
   * @param resourceGroupName Name of the resource group.
   * @param location Location of the resource.
   * @param ipPool IP pool name.
   * @param pool IP pool object to send.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    location: string,
    ipPool: string,
    pool: IpPool,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<IpPoolsCreateOrUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      location,
      ipPool,
      pool,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        IpPoolsCreateOrUpdateResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      createOrUpdateOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: createOrUpdateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Returns a list of all IP pools at a certain location.
   * @param resourceGroupName Name of the resource group.
   * @param location Location of the resource.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    location: string,
    options?: IpPoolsListOptionalParams
  ): Promise<IpPoolsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, location, options: operationOptions },
      listOperationSpec
    ) as Promise<IpPoolsListResponse>;
  }

  /**
   * ListNext
   * @param resourceGroupName Name of the resource group.
   * @param location Location of the resource.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    resourceGroupName: string,
    location: string,
    nextLink: string,
    options?: IpPoolsListNextOptionalParams
  ): Promise<IpPoolsListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, location, nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<IpPoolsListNextResponse>;
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

const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric.Admin/fabricLocations/{location}/ipPools/{ipPool}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IpPool
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location,
    Parameters.ipPool
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric.Admin/fabricLocations/{location}/ipPools/{ipPool}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.IpPool
    },
    201: {
      bodyMapper: Mappers.IpPool
    },
    202: {
      bodyMapper: Mappers.IpPool
    },
    204: {
      bodyMapper: Mappers.IpPool
    }
  },
  requestBody: Parameters.pool,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location,
    Parameters.ipPool
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Fabric.Admin/fabricLocations/{location}/ipPools",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IpPoolList
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location
  ],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IpPoolList
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.location,
    Parameters.nextLink
  ],
  serializer
};
