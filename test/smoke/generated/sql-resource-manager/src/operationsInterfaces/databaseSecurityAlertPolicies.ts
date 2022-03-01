/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  DatabaseSecurityAlertPolicy,
  DatabaseSecurityAlertPoliciesListByDatabaseOptionalParams,
  SecurityAlertPolicyName,
  DatabaseSecurityAlertPoliciesGetOptionalParams,
  DatabaseSecurityAlertPoliciesGetResponse,
  DatabaseSecurityAlertPoliciesCreateOrUpdateOptionalParams,
  DatabaseSecurityAlertPoliciesCreateOrUpdateResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a DatabaseSecurityAlertPolicies. */
export interface DatabaseSecurityAlertPolicies {
  /**
   * Gets a list of database's security alert policies.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the  server.
   * @param databaseName The name of the  database for which the security alert policy is defined.
   * @param options The options parameters.
   */
  listByDatabase(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: DatabaseSecurityAlertPoliciesListByDatabaseOptionalParams
  ): PagedAsyncIterableIterator<DatabaseSecurityAlertPolicy>;
  /**
   * Gets a database's security alert policy.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the  server.
   * @param databaseName The name of the  database for which the security alert policy is defined.
   * @param securityAlertPolicyName The name of the security alert policy.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    securityAlertPolicyName: SecurityAlertPolicyName,
    options?: DatabaseSecurityAlertPoliciesGetOptionalParams
  ): Promise<DatabaseSecurityAlertPoliciesGetResponse>;
  /**
   * Creates or updates a database's security alert policy.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the  server.
   * @param databaseName The name of the  database for which the security alert policy is defined.
   * @param securityAlertPolicyName The name of the security alert policy.
   * @param parameters The database security alert policy.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    securityAlertPolicyName: SecurityAlertPolicyName,
    parameters: DatabaseSecurityAlertPolicy,
    options?: DatabaseSecurityAlertPoliciesCreateOrUpdateOptionalParams
  ): Promise<DatabaseSecurityAlertPoliciesCreateOrUpdateResponse>;
}