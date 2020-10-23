/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { BaseResource, CloudError, AzureServiceClientOptions } from "@azure/ms-rest-azure-js";
import * as msRest from "@azure/ms-rest-js";

export { BaseResource, CloudError };

/**
 * An interface representing SampleResourceGroup.
 */
export interface SampleResourceGroup {
  /**
   * resource group name 'testgroup101'
   */
  name?: string;
  /**
   * resource group location 'West US'
   */
  location?: string;
}

/**
 * An interface representing ErrorModel.
 */
export interface ErrorModel {
  code?: number;
  message?: string;
}

/**
 * An interface representing MicrosoftAzureTestUrlOptions.
 */
export interface MicrosoftAzureTestUrlOptions extends AzureServiceClientOptions {
  baseUri?: string;
}

/**
 * Contains response data for the getSampleResourceGroup operation.
 */
export type GroupGetSampleResourceGroupResponse = SampleResourceGroup & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: SampleResourceGroup;
    };
};
