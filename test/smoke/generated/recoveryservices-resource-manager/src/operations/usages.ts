/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { RecoveryServicesClient } from "../recoveryServicesClient";
import { UsagesListByVaultsResponse } from "../models";

/**
 * Class representing a Usages.
 */
export class Usages {
  private readonly client: RecoveryServicesClient;

  /**
   * Initialize a new instance of the class Usages class.
   * @param client Reference to the service client
   */
  constructor(client: RecoveryServicesClient) {
    this.client = client;
  }

  /**
   * Fetches the usages of the vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param vaultName The name of the recovery services vault.
   * @param options The options parameters.
   */
  listByVaults(
    resourceGroupName: string,
    vaultName: string,
    options?: coreHttp.OperationOptions
  ): Promise<UsagesListByVaultsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, vaultName, options: operationOptions },
      listByVaultsOperationSpec
    ) as Promise<UsagesListByVaultsResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listByVaultsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/usages",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VaultUsageList
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.vaultName
  ],
  serializer
};
