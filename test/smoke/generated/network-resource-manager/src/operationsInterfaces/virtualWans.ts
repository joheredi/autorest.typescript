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
  VirtualWAN,
  VirtualWansGetResponse,
  VirtualWansCreateOrUpdateResponse,
  TagsObject,
  VirtualWansUpdateTagsResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a VirtualWans. */
export interface VirtualWans {
  /**
   * Lists all the VirtualWANs in a resource group.
   * @param resourceGroupName The resource group name of the VirtualWan.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<VirtualWAN>;
  /**
   * Lists all the VirtualWANs in a subscription.
   * @param options The options parameters.
   */
  list(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<VirtualWAN>;
  /**
   * Retrieves the details of a VirtualWAN.
   * @param resourceGroupName The resource group name of the VirtualWan.
   * @param virtualWANName The name of the VirtualWAN being retrieved.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    virtualWANName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualWansGetResponse>;
  /**
   * Creates a VirtualWAN resource if it doesn't exist else updates the existing VirtualWAN.
   * @param resourceGroupName The resource group name of the VirtualWan.
   * @param virtualWANName The name of the VirtualWAN being created or updated.
   * @param wANParameters Parameters supplied to create or update VirtualWAN.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    virtualWANName: string,
    wANParameters: VirtualWAN,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VirtualWansCreateOrUpdateResponse>>;
  /**
   * Updates a VirtualWAN tags.
   * @param resourceGroupName The resource group name of the VirtualWan.
   * @param virtualWANName The name of the VirtualWAN being updated.
   * @param wANParameters Parameters supplied to Update VirtualWAN tags.
   * @param options The options parameters.
   */
  updateTags(
    resourceGroupName: string,
    virtualWANName: string,
    wANParameters: TagsObject,
    options?: coreHttp.OperationOptions
  ): Promise<VirtualWansUpdateTagsResponse>;
  /**
   * Deletes a VirtualWAN.
   * @param resourceGroupName The resource group name of the VirtualWan.
   * @param virtualWANName The name of the VirtualWAN being deleted.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    virtualWANName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>>;
}
