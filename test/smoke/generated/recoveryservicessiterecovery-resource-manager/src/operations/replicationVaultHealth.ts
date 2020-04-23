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
import { SiteRecoveryManagementClient } from "../siteRecoveryManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  ReplicationVaultHealthGetResponse,
  ReplicationVaultHealthRefreshResponse
} from "../models";

/**
 * Class representing a ReplicationVaultHealth.
 */
export class ReplicationVaultHealth {
  private readonly client: SiteRecoveryManagementClient;

  /**
   * Initialize a new instance of the class ReplicationVaultHealth class.
   * @param client Reference to the service client
   */
  constructor(client: SiteRecoveryManagementClient) {
    this.client = client;
  }

  /**
   * Gets the health details of the vault.
   * @param options The options parameters.
   */
  get(
    options?: coreHttp.OperationOptions
  ): Promise<ReplicationVaultHealthGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getOperationSpec
    ) as Promise<ReplicationVaultHealthGetResponse>;
  }

  /**
   * Refreshes health summary of the vault.
   * @param options The options parameters.
   */
  async refresh(
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<ReplicationVaultHealthRefreshResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = { options: operationOptions };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        ReplicationVaultHealthRefreshResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      refreshOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: refreshOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  private getOperationOptions<TOptions extends coreHttp.OperationOptions>(
    options: TOptions | undefined,
    finalStateVia?: string
  ): coreHttp.RequestOptionsBase {
    const operationOptions: coreHttp.OperationOptions = options || {};
    operationOptions.requestOptions = {
      ...operationOptions.requestOptions,
      shouldDeserialize: shouldDeserializeLRO(finalStateVia)
    };
    return coreHttp.operationOptionsToRequestOptionsBase(operationOptions);
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationVaultHealth",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VaultHealthDetails
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName
  ],
  serializer
};
const refreshOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationVaultHealth/default/refresh",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.VaultHealthDetails
    },
    201: {
      bodyMapper: Mappers.VaultHealthDetails
    },
    202: {
      bodyMapper: Mappers.VaultHealthDetails
    },
    204: {
      bodyMapper: Mappers.VaultHealthDetails
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName
  ],
  serializer
};
