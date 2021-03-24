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
  VirtualNetworkRule,
  VirtualNetworkRulesGetResponse,
  VirtualNetworkRulesCreateOrUpdateResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a VirtualNetworkRules. */
export interface VirtualNetworkRules {
  /**
   * Gets a list of virtual network rules in a server.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param options The options parameters.
   */
  listByServer(
    resourceGroupName: string,
    serverName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<VirtualNetworkRule>;
  /**
   * Gets a virtual network rule.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param virtualNetworkRuleName The name of the virtual network rule.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serverName: string,
    virtualNetworkRuleName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualNetworkRulesGetResponse>;
  /**
   * Creates or updates an existing virtual network rule.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param virtualNetworkRuleName The name of the virtual network rule.
   * @param parameters The requested virtual Network Rule Resource state.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serverName: string,
    virtualNetworkRuleName: string,
    parameters: VirtualNetworkRule,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualNetworkRulesCreateOrUpdateResponse>>;
  /**
   * Deletes the virtual network rule with the given name.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param virtualNetworkRuleName The name of the virtual network rule.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serverName: string,
    virtualNetworkRuleName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>>;
}
