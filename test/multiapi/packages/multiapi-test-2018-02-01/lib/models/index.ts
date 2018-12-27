/*
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
 * Optional Parameters.
 */
export interface PathsGetEmptyOptionalParams extends msRest.RequestOptionsBase {
  /**
   * The key version. Default value 'v1'. Default value: 'v1'.
   */
  keyVersion?: string;
}

/**
 * An interface representing AutoRestParameterizedCustomHostTestClientOptions.
 */
export interface AutoRestParameterizedCustomHostTestClientOptions extends AzureServiceClientOptions {
  /**
   * A string value that is used as a global part of the parameterized host. Default value 'host'.
   * Default value: 'host'.
   */
  dnsSuffix?: string;
}
