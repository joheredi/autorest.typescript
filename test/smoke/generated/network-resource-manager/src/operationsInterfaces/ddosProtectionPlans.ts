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
  DdosProtectionPlan,
  DdosProtectionPlansGetResponse,
  DdosProtectionPlansCreateOrUpdateResponse,
  TagsObject,
  DdosProtectionPlansUpdateTagsResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a DdosProtectionPlans. */
export interface DdosProtectionPlans {
  /**
   * Gets all DDoS protection plans in a subscription.
   * @param options The options parameters.
   */
  list(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<DdosProtectionPlan>;
  /**
   * Gets all the DDoS protection plans in a resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<DdosProtectionPlan>;
  /**
   * Deletes the specified DDoS protection plan.
   * @param resourceGroupName The name of the resource group.
   * @param ddosProtectionPlanName The name of the DDoS protection plan.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    ddosProtectionPlanName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>>;
  /**
   * Gets information about the specified DDoS protection plan.
   * @param resourceGroupName The name of the resource group.
   * @param ddosProtectionPlanName The name of the DDoS protection plan.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    ddosProtectionPlanName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DdosProtectionPlansGetResponse>;
  /**
   * Creates or updates a DDoS protection plan.
   * @param resourceGroupName The name of the resource group.
   * @param ddosProtectionPlanName The name of the DDoS protection plan.
   * @param parameters Parameters supplied to the create or update operation.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    ddosProtectionPlanName: string,
    parameters: DdosProtectionPlan,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<DdosProtectionPlansCreateOrUpdateResponse>>;
  /**
   * Update a DDoS protection plan tags.
   * @param resourceGroupName The name of the resource group.
   * @param ddosProtectionPlanName The name of the DDoS protection plan.
   * @param parameters Parameters supplied to the update DDoS protection plan resource tags.
   * @param options The options parameters.
   */
  updateTags(
    resourceGroupName: string,
    ddosProtectionPlanName: string,
    parameters: TagsObject,
    options?: coreHttp.OperationOptions
  ): Promise<DdosProtectionPlansUpdateTagsResponse>;
}
