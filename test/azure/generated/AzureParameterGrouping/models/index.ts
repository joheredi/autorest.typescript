/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { BaseResource, CloudError, AzureServiceClientOptions } from "@azure/ms-rest-azure-js";
import * as msRest from "@azure/ms-rest-js";

export { BaseResource, CloudError };

/**
 * An interface representing ErrorModel.
 */
export interface ErrorModel {
  status?: number;
  message?: string;
}

/**
 * Additional parameters for postRequired operation.
 */
export interface ParameterGroupingPostRequiredParameters {
  body: number;
  customHeader?: string;
  /**
   * Query parameter with default. Default value: 30.
   */
  query?: number;
  /**
   * Path parameter
   */
  path: string;
}

/**
 * Additional parameters for postOptional operation.
 */
export interface ParameterGroupingPostOptionalParameters {
  customHeader?: string;
  /**
   * Query parameter with default. Default value: 30.
   */
  query?: number;
}

/**
 * Additional parameters for a set of operations, such as: ParameterGrouping_postMultiParamGroups,
 * ParameterGrouping_postSharedParameterGroupObject.
 */
export interface FirstParameterGroup {
  headerOne?: string;
  /**
   * Query parameter with default. Default value: 30.
   */
  queryOne?: number;
}

/**
 * Additional parameters for postMultiParamGroups operation.
 */
export interface ParameterGroupingPostMultiParamGroupsSecondParamGroup {
  headerTwo?: string;
  /**
   * Query parameter with default. Default value: 30.
   */
  queryTwo?: number;
}

/**
 * Optional Parameters.
 */
export interface ParameterGroupingPostOptionalOptionalParams extends msRest.RequestOptionsBase {
  /**
   * Additional parameters for the operation
   */
  parameterGroupingPostOptionalParameters?: ParameterGroupingPostOptionalParameters;
}

/**
 * Optional Parameters.
 */
export interface ParameterGroupingPostMultiParamGroupsOptionalParams extends msRest.RequestOptionsBase {
  /**
   * Additional parameters for the operation
   */
  firstParameterGroup?: FirstParameterGroup;
  /**
   * Additional parameters for the operation
   */
  parameterGroupingPostMultiParamGroupsSecondParamGroup?: ParameterGroupingPostMultiParamGroupsSecondParamGroup;
}

/**
 * Optional Parameters.
 */
export interface ParameterGroupingPostSharedParameterGroupObjectOptionalParams extends msRest.RequestOptionsBase {
  /**
   * Additional parameters for the operation
   */
  firstParameterGroup?: FirstParameterGroup;
}

/**
 * An interface representing AutoRestParameterGroupingTestServiceOptions.
 */
export interface AutoRestParameterGroupingTestServiceOptions extends AzureServiceClientOptions {
  baseUri?: string;
}
