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
import { VMwareCloudSimple } from "../vMwareCloudSimple";
import {
  UsagesListOptionalParams,
  UsagesListResponse,
  UsagesListNextOptionalParams,
  UsagesListNextResponse
} from "../models";

/**
 * Class representing a Usages.
 */
export class Usages {
  private readonly client: VMwareCloudSimple;

  /**
   * Initialize a new instance of the class Usages class.
   * @param client Reference to the service client
   */
  constructor(client: VMwareCloudSimple) {
    this.client = client;
  }

  /**
   * Returns list of usage in region
   * @param regionId The region Id (westus, eastus)
   * @param options The options parameters.
   */
  list(
    regionId: string,
    options?: UsagesListOptionalParams
  ): Promise<UsagesListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { regionId, options: operationOptions },
      listOperationSpec
    ) as Promise<UsagesListResponse>;
  }

  /**
   * ListNext
   * @param regionId The region Id (westus, eastus)
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    regionId: string,
    nextLink: string,
    options?: UsagesListNextOptionalParams
  ): Promise<UsagesListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { regionId, nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<UsagesListNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/locations/{regionId}/usages",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UsageListResponse
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.regionId
  ],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.UsageListResponse
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.regionId,
    Parameters.nextLink
  ],
  serializer
};
