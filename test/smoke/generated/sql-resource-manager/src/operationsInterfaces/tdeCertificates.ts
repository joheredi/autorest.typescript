/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import { LROPoller } from "../lro";
import { TdeCertificate } from "../models";

/** Interface representing a TdeCertificates. */
export interface TdeCertificates {
  /**
   * Creates a TDE certificate for a given server.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serverName The name of the server.
   * @param parameters The requested TDE certificate to be created or updated.
   * @param options The options parameters.
   */
  create(
    resourceGroupName: string,
    serverName: string,
    parameters: TdeCertificate,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>>;
}
