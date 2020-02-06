/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

/**
 * An interface representing Error.
 */
export interface ErrorModel {
  status?: number;
  message?: string;
}

/**
 * Defines values for GreyscaleColors.
 */
export type GreyscaleColors = "White" | "black" | "GREY";

/**
 * Optional parameters.
 */
export interface HeaderParamStringOptionalParams
  extends coreHttp.RequestOptionsBase {
  /**
   * Send a post request with header values "The quick brown fox jumps over the lazy dog" or null or ""
   */
  value?: string;
}

/**
 * Optional parameters.
 */
export interface HeaderParamDatetimeRfc1123OptionalParams
  extends coreHttp.RequestOptionsBase {
  /**
   * Send a post request with header values "Wed, 01 Jan 2010 12:34:56 GMT" or "Mon, 01 Jan 0001 00:00:00 GMT"
   */
  value?: Date;
}

/**
 * Optional parameters.
 */
export interface HeaderParamEnumOptionalParams
  extends coreHttp.RequestOptionsBase {
  /**
   * Send a post request with header values 'GREY'
   */
  value?: GreyscaleColors;
}
