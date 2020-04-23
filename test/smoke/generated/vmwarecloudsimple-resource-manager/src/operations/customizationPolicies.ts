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
  CustomizationPoliciesListOptionalParams,
  CustomizationPoliciesListResponse,
  CustomizationPoliciesGetResponse,
  CustomizationPoliciesListNextOptionalParams,
  CustomizationPoliciesListNextResponse
} from "../models";

/**
 * Class representing a CustomizationPolicies.
 */
export class CustomizationPolicies {
  private readonly client: VMwareCloudSimple;

  /**
   * Initialize a new instance of the class CustomizationPolicies class.
   * @param client Reference to the service client
   */
  constructor(client: VMwareCloudSimple) {
    this.client = client;
  }

  /**
   * Returns list of customization policies in region for private cloud
   * @param regionId The region Id (westus, eastus)
   * @param pcName The private cloud name
   * @param options The options parameters.
   */
  list(
    regionId: string,
    pcName: string,
    options?: CustomizationPoliciesListOptionalParams
  ): Promise<CustomizationPoliciesListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { regionId, pcName, options: operationOptions },
      listOperationSpec
    ) as Promise<CustomizationPoliciesListResponse>;
  }

  /**
   * Returns customization policy by its name
   * @param options The options parameters.
   */
  getModel(
    options?: coreHttp.OperationOptions
  ): Promise<CustomizationPoliciesGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getModelOperationSpec
    ) as Promise<CustomizationPoliciesGetResponse>;
  }

  /**
   * ListNext
   * @param regionId The region Id (westus, eastus)
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param pcName The private cloud name
   * @param options The options parameters.
   */
  listNext(
    regionId: string,
    nextLink: string,
    pcName: string,
    options?: CustomizationPoliciesListNextOptionalParams
  ): Promise<CustomizationPoliciesListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { regionId, nextLink, pcName, options: operationOptions },
      listNextOperationSpec
    ) as Promise<CustomizationPoliciesListNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/locations/{regionId}/privateClouds/{pcName}/customizationPolicies",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CustomizationPoliciesListResponse
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.regionId,
    Parameters.pcName
  ],
  serializer
};
const getModelOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.VMwareCloudSimple/locations/{regionId}/privateClouds/{pcName}/customizationPolicies/{customizationPolicyName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CustomizationPolicy
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CustomizationPoliciesListResponse
    },
    default: {
      bodyMapper: Mappers.CsrpError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter2],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.regionId,
    Parameters.nextLink,
    Parameters.pcName
  ],
  serializer
};
