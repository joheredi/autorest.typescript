/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import {
  DatabaseAutomaticTuningGetResponse,
  DatabaseAutomaticTuningDef,
  DatabaseAutomaticTuningUpdateResponse
} from "../models";

/** Interface representing a DatabaseAutomaticTuning. */
export interface DatabaseAutomaticTuning {
  /**
   * Gets a database's automatic tuning.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DatabaseAutomaticTuningGetResponse>;
  /**
   * Update automatic tuning properties for target database.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param databaseName The name of the database.
   * @param parameters The requested automatic tuning resource state.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    parameters: DatabaseAutomaticTuningDef,
    options?: coreHttp.OperationOptions
  ): Promise<DatabaseAutomaticTuningUpdateResponse>;
}
