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
import { WebSiteManagementClient } from "../webSiteManagementClient";
import {
  CertificateRegistrationProviderListOperationsResponse,
  CertificateRegistrationProviderListOperationsNextResponse
} from "../models";

/**
 * Class representing a CertificateRegistrationProvider.
 */
export class CertificateRegistrationProvider {
  private readonly client: WebSiteManagementClient;

  /**
   * Initialize a new instance of the class CertificateRegistrationProvider class.
   * @param client Reference to the service client
   */
  constructor(client: WebSiteManagementClient) {
    this.client = client;
  }

  /**
   * Description for Implements Csm operations Api to exposes the list of available Csm Apis under the
   * resource provider
   * @param options The options parameters.
   */
  listOperations(
    options?: coreHttp.OperationOptions
  ): Promise<CertificateRegistrationProviderListOperationsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listOperationsOperationSpec
    ) as Promise<CertificateRegistrationProviderListOperationsResponse>;
  }

  /**
   * ListOperationsNext
   * @param nextLink The nextLink from the previous successful call to the ListOperations method.
   * @param options The options parameters.
   */
  listOperationsNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<CertificateRegistrationProviderListOperationsNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listOperationsNextOperationSpec
    ) as Promise<CertificateRegistrationProviderListOperationsNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationsOperationSpec: coreHttp.OperationSpec = {
  path: "/providers/Microsoft.CertificateRegistration/operations",
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
  urlParameters: [Parameters.$host, Parameters.nextLink3],
  serializer
};
