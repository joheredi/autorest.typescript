/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import {
  DurationGetNullResponse,
  DurationGetPositiveDurationResponse,
  DurationGetInvalidResponse
} from "../models";

/** Interface representing a Duration. */
export interface Duration {
  /**
   * Get null duration value
   * @param options The options parameters.
   */
  getNull(
    options?: coreHttp.OperationOptions
  ): Promise<DurationGetNullResponse>;
  /**
   * Put a positive duration value
   * @param durationBody duration body
   * @param options The options parameters.
   */
  putPositiveDuration(
    durationBody: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Get a positive duration value
   * @param options The options parameters.
   */
  getPositiveDuration(
    options?: coreHttp.OperationOptions
  ): Promise<DurationGetPositiveDurationResponse>;
  /**
   * Get an invalid duration value
   * @param options The options parameters.
   */
  getInvalid(
    options?: coreHttp.OperationOptions
  ): Promise<DurationGetInvalidResponse>;
}
