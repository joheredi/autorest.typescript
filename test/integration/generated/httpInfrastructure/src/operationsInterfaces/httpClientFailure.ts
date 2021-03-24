/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

/** Interface representing a HttpClientFailure. */
export interface HttpClientFailure {
  /**
   * Return 400 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  head400(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 400 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  get400(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 400 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  options400(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Return 400 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  put400(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 400 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  patch400(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 400 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  post400(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 400 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  delete400(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Return 401 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  head401(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 402 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  get402(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 403 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  options403(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Return 403 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  get403(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 404 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  put404(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 405 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  patch405(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 406 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  post406(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 407 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  delete407(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Return 409 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  put409(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 410 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  head410(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 411 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  get411(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 412 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  options412(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Return 412 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  get412(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 413 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  put413(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 414 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  patch414(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 415 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  post415(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 416 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  get416(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
  /**
   * Return 417 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  delete417(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Return 429 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  head429(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse>;
}
