/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { ServiceClientOptions } from "@azure/core-http";
import * as coreHttp from "@azure/core-http";

/**
 * An interface representing ErrorModel.
 */
export interface ErrorModel {
  status?: number;
  message?: string;
}

/**
 * An interface representing AutoRestReportServiceOptions.
 */
export interface AutoRestReportServiceOptions extends ServiceClientOptions {
  baseUri?: string;
}

/**
 * Optional Parameters.
 */
export interface AutoRestReportServiceGetReportOptionalParams extends coreHttp.RequestOptionsBase {
  /**
   * If specified, qualifies the generated report further (e.g. '2.7' vs '3.5' in for Python). The
   * only effect is, that generators that run all tests several times, can distinguish the
   * generated reports.
   */
  qualifier?: string;
}

/**
 * Contains response data for the getReport operation.
 */
export type GetReportResponse = {
  /**
   * The response body properties.
   */
  [propertyName: string]: number;
} & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: { [propertyName: string]: number };
    };
};
