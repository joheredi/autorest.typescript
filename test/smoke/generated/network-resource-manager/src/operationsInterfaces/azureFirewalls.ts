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
  AzureFirewall,
  AzureFirewallsGetResponse,
  AzureFirewallsCreateOrUpdateResponse,
  TagsObject,
  AzureFirewallsUpdateTagsResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a AzureFirewalls. */
export interface AzureFirewalls {
  /**
   * Lists all Azure Firewalls in a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<AzureFirewall>;
  /**
   * Gets all the Azure Firewalls in a subscription.
   * @param options The options parameters.
   */
  listAll(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<AzureFirewall>;
  /**
   * Deletes the specified Azure Firewall.
   * @param resourceGroupName The name of the resource group.
   * @param azureFirewallName The name of the Azure Firewall.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    azureFirewallName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>>;
  /**
   * Gets the specified Azure Firewall.
   * @param resourceGroupName The name of the resource group.
   * @param azureFirewallName The name of the Azure Firewall.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    azureFirewallName: string,
    options?: coreHttp.OperationOptions
  ): Promise<AzureFirewallsGetResponse>;
  /**
   * Creates or updates the specified Azure Firewall.
   * @param resourceGroupName The name of the resource group.
   * @param azureFirewallName The name of the Azure Firewall.
   * @param parameters Parameters supplied to the create or update Azure Firewall operation.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    azureFirewallName: string,
    parameters: AzureFirewall,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<AzureFirewallsCreateOrUpdateResponse>>;
  /**
   * Updates tags of an Azure Firewall resource.
   * @param resourceGroupName The name of the resource group.
   * @param azureFirewallName The name of the Azure Firewall.
   * @param parameters Parameters supplied to update azure firewall tags.
   * @param options The options parameters.
   */
  updateTags(
    resourceGroupName: string,
    azureFirewallName: string,
    parameters: TagsObject,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<AzureFirewallsUpdateTagsResponse>>;
}
