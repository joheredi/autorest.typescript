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
import {
  JobTargetGroup,
  JobTargetGroupsGetResponse,
  JobTargetGroupsCreateOrUpdateResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a JobTargetGroups. */
export interface JobTargetGroups {
  /**
   * Gets all target groups in an agent.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param jobAgentName The name of the job agent.
   * @param options The options parameters.
   */
  listByAgent(
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<JobTargetGroup>;
  /**
   * Gets a target group.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param jobAgentName The name of the job agent.
   * @param targetGroupName The name of the target group.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    targetGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<JobTargetGroupsGetResponse>;
  /**
   * Creates or updates a target group.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param jobAgentName The name of the job agent.
   * @param targetGroupName The name of the target group.
   * @param parameters The requested state of the target group.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    targetGroupName: string,
    parameters: JobTargetGroup,
    options?: coreHttp.OperationOptions
  ): Promise<JobTargetGroupsCreateOrUpdateResponse>;
  /**
   * Deletes a target group.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param jobAgentName The name of the job agent.
   * @param targetGroupName The name of the target group.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    targetGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
}
