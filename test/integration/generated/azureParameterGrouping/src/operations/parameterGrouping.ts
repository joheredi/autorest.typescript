/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { ParameterGrouping } from "../operationsInterfaces";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { AzureParameterGroupingClientContext } from "../azureParameterGroupingClientContext";
import {
  ParameterGroupingPostRequiredParameters,
  ParameterGroupingPostOptionalOptionalParams,
  ParameterGroupingPostMultiParamGroupsOptionalParams,
  ParameterGroupingPostSharedParameterGroupObjectOptionalParams
} from "../models";

/** Class representing a ParameterGrouping. */
export class ParameterGroupingImpl implements ParameterGrouping {
  private readonly client: AzureParameterGroupingClientContext;

  /**
   * Initialize a new instance of the class ParameterGrouping class.
   * @param client Reference to the service client
   */
  constructor(client: AzureParameterGroupingClientContext) {
    this.client = client;
  }

  /**
   * Post a bunch of required parameters grouped
   * @param parameterGroupingPostRequiredParameters Parameter group
   * @param options The options parameters.
   */
  postRequired(
    parameterGroupingPostRequiredParameters: ParameterGroupingPostRequiredParameters,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      parameterGroupingPostRequiredParameters,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      postRequiredOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Post a bunch of optional parameters grouped
   * @param options The options parameters.
   */
  postOptional(
    options?: ParameterGroupingPostOptionalOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      postOptionalOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Post parameters from multiple different parameter groups
   * @param options The options parameters.
   */
  postMultiParamGroups(
    options?: ParameterGroupingPostMultiParamGroupsOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      postMultiParamGroupsOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Post parameters with a shared parameter group object
   * @param options The options parameters.
   */
  postSharedParameterGroupObject(
    options?: ParameterGroupingPostSharedParameterGroupObjectOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      postSharedParameterGroupObjectOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const postRequiredOperationSpec: coreHttp.OperationSpec = {
  path: "/parameterGrouping/postRequired/{path}",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.body,
  queryParameters: [Parameters.query],
  urlParameters: [Parameters.$host, Parameters.path],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept,
    Parameters.customHeader
  ],
  mediaType: "json",
  serializer
};
const postOptionalOperationSpec: coreHttp.OperationSpec = {
  path: "/parameterGrouping/postOptional",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.query1],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept, Parameters.customHeader1],
  serializer
};
const postMultiParamGroupsOperationSpec: coreHttp.OperationSpec = {
  path: "/parameterGrouping/postMultipleParameterGroups",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.queryOne, Parameters.queryTwo],
  urlParameters: [Parameters.$host],
  headerParameters: [
    Parameters.accept,
    Parameters.headerOne,
    Parameters.headerTwo
  ],
  serializer
};
const postSharedParameterGroupObjectOperationSpec: coreHttp.OperationSpec = {
  path: "/parameterGrouping/sharedParameterGroupObject",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.queryOne],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept, Parameters.headerOne],
  serializer
};
