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
  ManagedBackupShortTermRetentionPolicy,
  ManagedShortTermRetentionPolicyName,
  ManagedBackupShortTermRetentionPoliciesGetResponse,
  ManagedBackupShortTermRetentionPoliciesCreateOrUpdateResponse,
  ManagedBackupShortTermRetentionPoliciesUpdateResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ManagedBackupShortTermRetentionPolicies. */
export interface ManagedBackupShortTermRetentionPolicies {
  /**
   * Gets a managed database's short term retention policy list.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param databaseName The name of the database.
   * @param options The options parameters.
   */
  listByDatabase(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<ManagedBackupShortTermRetentionPolicy>;
  /**
   * Gets a managed database's short term retention policy.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param databaseName The name of the database.
   * @param policyName The policy name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    policyName: ManagedShortTermRetentionPolicyName,
    options?: coreHttp.OperationOptions
  ): Promise<ManagedBackupShortTermRetentionPoliciesGetResponse>;
  /**
   * Updates a managed database's short term retention policy.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param databaseName The name of the database.
   * @param policyName The policy name. Should always be "default".
   * @param parameters The short term retention policy info.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    policyName: ManagedShortTermRetentionPolicyName,
    parameters: ManagedBackupShortTermRetentionPolicy,
    options?: coreHttp.OperationOptions
  ): Promise<
    LROPoller<ManagedBackupShortTermRetentionPoliciesCreateOrUpdateResponse>
  >;
  /**
   * Updates a managed database's short term retention policy.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param managedInstanceName The name of the managed instance.
   * @param databaseName The name of the database.
   * @param policyName The policy name. Should always be "default".
   * @param parameters The short term retention policy info.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    managedInstanceName: string,
    databaseName: string,
    policyName: ManagedShortTermRetentionPolicyName,
    parameters: ManagedBackupShortTermRetentionPolicy,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<ManagedBackupShortTermRetentionPoliciesUpdateResponse>>;
}
