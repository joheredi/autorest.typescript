/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import {
  ApplicationStackResource,
  ProviderGetAvailableStacksNextOptionalParams,
  ProviderGetAvailableStacksOptionalParams,
  CsmOperationDescription,
  ProviderGetAvailableStacksOnPremNextOptionalParams,
  ProviderGetAvailableStacksOnPremOptionalParams
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Provider. */
export interface Provider {
  /**
   * Description for Get available application frameworks and their versions
   * @param options The options parameters.
   */
  listAvailableStacks(
    options?: ProviderGetAvailableStacksOptionalParams
  ): PagedAsyncIterableIterator<ApplicationStackResource>;
  /**
   * Description for Gets all available operations for the Microsoft.Web resource provider. Also exposes
   * resource metric definitions
   * @param options The options parameters.
   */
  listOperations(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<CsmOperationDescription>;
  /**
   * Description for Get available application frameworks and their versions
   * @param options The options parameters.
   */
  listAvailableStacksOnPrem(
    options?: ProviderGetAvailableStacksOnPremOptionalParams
  ): PagedAsyncIterableIterator<ApplicationStackResource>;
}
