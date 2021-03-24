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
import { VirtualMachineSize } from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a VirtualMachineSizes. */
export interface VirtualMachineSizes {
  /**
   * This API is deprecated. Use [Resources
   * Skus](https://docs.microsoft.com/en-us/rest/api/compute/resourceskus/list)
   * @param location The location upon which virtual-machine-sizes is queried.
   * @param options The options parameters.
   */
  list(
    location: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<VirtualMachineSize>;
}
