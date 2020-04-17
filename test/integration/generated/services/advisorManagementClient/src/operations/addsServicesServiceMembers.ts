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
import { AdvisorManagementClient } from "../advisorManagementClient";
import {
  AddsServicesServiceMembersListOptionalParams,
  AddsServicesServiceMembersListResponse,
  ServiceMember,
  AddsServicesServiceMembersAddResponse,
  AddsServicesServiceMembersListNextOptionalParams,
  AddsServicesServiceMembersListNextResponse
} from "../models";

/**
 * Class representing a AddsServicesServiceMembers.
 */
export class AddsServicesServiceMembers {
  private readonly client: AdvisorManagementClient;

  /**
   * Initialize a new instance of the class AddsServicesServiceMembers class.
   * @param client Reference to the service client
   */
  constructor(client: AdvisorManagementClient) {
    this.client = client;
  }

  /**
   * Gets the details of the servers, for a given Active Directory Domain Controller service, that are
   * onboarded to Azure Active Directory Connect Health Service.
   * @param serviceName The name of the service.
   * @param options The options parameters.
   */
  list(
    serviceName: string,
    options?: AddsServicesServiceMembersListOptionalParams
  ): Promise<AddsServicesServiceMembersListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { serviceName, options: operationOptions },
      listOperationSpec
    ) as Promise<AddsServicesServiceMembersListResponse>;
  }

  /**
   * Onboards  a server, for a given Active Directory Domain Controller service, to Azure Active
   * Directory Connect Health Service.
   * @param serviceMember The server object.
   * @param serviceName The name of the service under which the server is to be onboarded.
   * @param options The options parameters.
   */
  add(
    serviceMember: ServiceMember,
    serviceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<AddsServicesServiceMembersAddResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { serviceMember, serviceName, options: operationOptions },
      addOperationSpec
    ) as Promise<AddsServicesServiceMembersAddResponse>;
  }

  /**
   * ListNext
   * @param serviceName The name of the service.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    serviceName: string,
    nextLink: string,
    options?: AddsServicesServiceMembersListNextOptionalParams
  ): Promise<AddsServicesServiceMembersListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { serviceName, nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<AddsServicesServiceMembersListNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/servicemembers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ServiceMembers
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.$filter1,
    Parameters.dimensionType,
    Parameters.dimensionSignature
  ],
  urlParameters: [Parameters.$host, Parameters.serviceName],
  serializer
};
const addOperationSpec: coreHttp.OperationSpec = {
  path:
    "/providers/Microsoft.ADHybridHealthService/addsservices/{serviceName}/servicemembers",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ServiceMember
    }
  },
  requestBody: Parameters.serviceMember,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.serviceName2],
  headerParameters: [Parameters.contentType],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ServiceMembers
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.dimensionType,
    Parameters.dimensionSignature,
    Parameters.$filter1
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.serviceName,
    Parameters.nextLink
  ],
  serializer
};
