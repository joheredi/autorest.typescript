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
  FailoverGroup,
  FailoverGroupsGetResponse,
  FailoverGroupsCreateOrUpdateResponse,
  FailoverGroupUpdate,
  FailoverGroupsUpdateResponse,
  FailoverGroupsFailoverResponse,
  FailoverGroupsForceFailoverAllowDataLossResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a FailoverGroups. */
export interface FailoverGroups {
  /**
   * Lists the failover groups in a server.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server containing the failover group.
   * @param options The options parameters.
   */
  listByServer(
    resourceGroupName: string,
    serverName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<FailoverGroup>;
  /**
   * Gets a failover group.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server containing the failover group.
   * @param failoverGroupName The name of the failover group.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<FailoverGroupsGetResponse>;
  /**
   * Creates or updates a failover group.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server containing the failover group.
   * @param failoverGroupName The name of the failover group.
   * @param parameters The failover group parameters.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    parameters: FailoverGroup,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<FailoverGroupsCreateOrUpdateResponse>>;
  /**
   * Deletes a failover group.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server containing the failover group.
   * @param failoverGroupName The name of the failover group.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>>;
  /**
   * Updates a failover group.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server containing the failover group.
   * @param failoverGroupName The name of the failover group.
   * @param parameters The failover group parameters.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    parameters: FailoverGroupUpdate,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<FailoverGroupsUpdateResponse>>;
  /**
   * Fails over from the current primary server to this server.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server containing the failover group.
   * @param failoverGroupName The name of the failover group.
   * @param options The options parameters.
   */
  failover(
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<FailoverGroupsFailoverResponse>>;
  /**
   * Fails over from the current primary server to this server. This operation might result in data loss.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server containing the failover group.
   * @param failoverGroupName The name of the failover group.
   * @param options The options parameters.
   */
  forceFailoverAllowDataLoss(
    resourceGroupName: string,
    serverName: string,
    failoverGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<FailoverGroupsForceFailoverAllowDataLossResponse>>;
}
