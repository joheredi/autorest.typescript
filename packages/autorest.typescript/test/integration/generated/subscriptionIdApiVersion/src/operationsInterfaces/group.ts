/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  GroupGetSampleResourceGroupOptionalParams,
  GroupGetSampleResourceGroupResponse
} from "../models";

/** Interface representing a Group. */
export interface Group {
  /**
   * Provides a resouce group with name 'testgroup101' and location 'West US'.
   * @param resourceGroupName Resource Group name 'testgroup101'.
   * @param options The options parameters.
   */
  getSampleResourceGroup(
    resourceGroupName: string,
    options?: GroupGetSampleResourceGroupOptionalParams
  ): Promise<GroupGetSampleResourceGroupResponse>;
}