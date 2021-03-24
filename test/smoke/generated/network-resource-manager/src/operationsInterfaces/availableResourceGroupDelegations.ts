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
import { AvailableDelegation } from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a AvailableResourceGroupDelegations. */
export interface AvailableResourceGroupDelegations {
  /**
   * Gets all of the available subnet delegations for this resource group in this region.
   * @param location The location of the domain name.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  list(
    location: string,
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<AvailableDelegation>;
}
