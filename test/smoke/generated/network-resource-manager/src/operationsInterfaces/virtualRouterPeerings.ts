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
  VirtualRouterPeering,
  VirtualRouterPeeringsGetResponse,
  VirtualRouterPeeringsCreateOrUpdateResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a VirtualRouterPeerings. */
export interface VirtualRouterPeerings {
  /**
   * Lists all Virtual Router Peerings in a Virtual Router resource.
   * @param resourceGroupName The name of the resource group.
   * @param virtualRouterName The name of the Virtual Router.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    virtualRouterName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<VirtualRouterPeering>;
  /**
   * Deletes the specified peering from a Virtual Router.
   * @param resourceGroupName The name of the resource group.
   * @param virtualRouterName The name of the Virtual Router.
   * @param peeringName The name of the peering.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    virtualRouterName: string,
    peeringName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>>;
  /**
   * Gets the specified Virtual Router Peering.
   * @param resourceGroupName The name of the resource group.
   * @param virtualRouterName The name of the Virtual Router.
   * @param peeringName The name of the Virtual Router Peering.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    virtualRouterName: string,
    peeringName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualRouterPeeringsGetResponse>;
  /**
   * Creates or updates the specified Virtual Router Peering.
   * @param resourceGroupName The name of the resource group.
   * @param virtualRouterName The name of the Virtual Router.
   * @param peeringName The name of the Virtual Router Peering.
   * @param parameters Parameters supplied to the create or update Virtual Router Peering operation.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    virtualRouterName: string,
    peeringName: string,
    parameters: VirtualRouterPeering,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualRouterPeeringsCreateOrUpdateResponse>>;
}
