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
import { LROPoller } from "../lro";
import {
  BastionHost,
  BastionHostsGetResponse,
  BastionHostsCreateOrUpdateResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a BastionHosts. */
export interface BastionHosts {
  /**
   * Lists all Bastion Hosts in a subscription.
   * @param options The options parameters.
   */
  list(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<BastionHost>;
  /**
   * Lists all Bastion Hosts in a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<BastionHost>;
  /**
   * Deletes the specified Bastion Host.
   * @param resourceGroupName The name of the resource group.
   * @param bastionHostName The name of the Bastion Host.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    bastionHostName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>>;
  /**
   * Gets the specified Bastion Host.
   * @param resourceGroupName The name of the resource group.
   * @param bastionHostName The name of the Bastion Host.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    bastionHostName: string,
    options?: coreHttp.OperationOptions
  ): Promise<BastionHostsGetResponse>;
  /**
   * Creates or updates the specified Bastion Host.
   * @param resourceGroupName The name of the resource group.
   * @param bastionHostName The name of the Bastion Host.
   * @param parameters Parameters supplied to the create or update Bastion Host operation.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    bastionHostName: string,
    parameters: BastionHost,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<BastionHostsCreateOrUpdateResponse>>;
}
