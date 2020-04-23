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
import {
  ReplicationVaultSettingListResponse,
  ReplicationVaultSettingGetResponse,
  VaultSettingCreationInput,
  ReplicationVaultSettingCreateResponse,
  ReplicationVaultSettingListNextResponse
} from "../models";

/**
 * Class representing a ReplicationVaultSetting.
 */
export class ReplicationVaultSetting {
  private readonly client: SiteRecoveryManagementClient;

  /**
   * Initialize a new instance of the class ReplicationVaultSetting class.
   * @param client Reference to the service client
   */
  constructor(client: SiteRecoveryManagementClient) {
    this.client = client;
  }

  /**
   * Gets the list of vault setting. This includes the Migration Hub connection settings.
   * @param options The options parameters.
   */
  list(
    options?: coreHttp.OperationOptions
  ): Promise<ReplicationVaultSettingListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listOperationSpec
    ) as Promise<ReplicationVaultSettingListResponse>;
  }

  /**
   * Gets the vault setting. This includes the Migration Hub connection settings.
   * @param vaultSettingName Vault setting name.
   * @param options The options parameters.
   */
  get(
    vaultSettingName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ReplicationVaultSettingGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { vaultSettingName, options: operationOptions },
      getOperationSpec
    ) as Promise<ReplicationVaultSettingGetResponse>;
  }

  /**
   * The operation to configure vault setting.
   * @param vaultSettingName Vault setting name.
   * @param input Vault setting creation input.
   * @param options The options parameters.
   */
  create(
    vaultSettingName: string,
    input: VaultSettingCreationInput,
    options?: coreHttp.OperationOptions
  ): Promise<ReplicationVaultSettingCreateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { vaultSettingName, input, options: operationOptions },
      createOperationSpec
    ) as Promise<ReplicationVaultSettingCreateResponse>;
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<ReplicationVaultSettingListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<ReplicationVaultSettingListNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationVaultSettings",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VaultSettingCollection
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
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationVaultSettings/{vaultSettingName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VaultSetting
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.vaultSettingName
  ],
  serializer
};
const createOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationVaultSettings/{vaultSettingName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.VaultSetting
    }
  },
  requestBody: Parameters.input14,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.vaultSettingName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VaultSettingCollection
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.resourceName
  ],
  serializer
};
