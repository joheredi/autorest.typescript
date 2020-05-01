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
import { StorageManagementClient } from "../storageManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  StorageAccountCheckNameAvailabilityParameters,
  StorageAccountsCheckNameAvailabilityResponse,
  StorageAccountCreateParameters,
  StorageAccountsCreateResponse,
  StorageAccountsGetPropertiesOptionalParams,
  StorageAccountsGetPropertiesResponse,
  StorageAccountUpdateParameters,
  StorageAccountsUpdateResponse,
  StorageAccountsListResponse,
  StorageAccountsListByResourceGroupResponse,
  StorageAccountsListKeysResponse,
  StorageAccountRegenerateKeyParameters,
  StorageAccountsRegenerateKeyResponse,
  AccountSasParameters,
  StorageAccountsListAccountSASResponse,
  ServiceSasParameters,
  StorageAccountsListServiceSASResponse,
  BlobRestoreParameters,
  StorageAccountsRestoreBlobRangesResponse,
  StorageAccountsListNextResponse
} from "../models";

/**
 * Class representing a StorageAccounts.
 */
export class StorageAccounts {
  private readonly client: StorageManagementClient;

  /**
   * Initialize a new instance of the class StorageAccounts class.
   * @param client Reference to the service client
   */
  constructor(client: StorageManagementClient) {
    this.client = client;
  }

  /**
   * Checks that the storage account name is valid and is not already in use.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param options The options parameters.
   */
  checkNameAvailability(
    accountName: StorageAccountCheckNameAvailabilityParameters,
    options?: coreHttp.OperationOptions
  ): Promise<StorageAccountsCheckNameAvailabilityResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { accountName, options: operationOptions },
      checkNameAvailabilityOperationSpec
    ) as Promise<StorageAccountsCheckNameAvailabilityResponse>;
  }

  /**
   * Asynchronously creates a new storage account with the specified parameters. If an account is already
   * created and a subsequent create request is issued with different properties, the account properties
   * will be updated. If an account is already created and a subsequent create or update request is
   * issued with the exact same set of properties, the request will succeed.
   * @param parameters The parameters to provide for the created account.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param options The options parameters.
   */
  async create(
    parameters: StorageAccountCreateParameters,
    resourceGroupName: string,
    accountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<StorageAccountsCreateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      parameters,
      resourceGroupName,
      accountName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        StorageAccountsCreateResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      createOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: createOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Deletes a storage account in Microsoft Azure.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    accountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options: operationOptions },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Returns the properties for the specified storage account including but not limited to name, SKU
   * name, location, and account status. The ListKeys operation should be used to retrieve storage keys.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param options The options parameters.
   */
  getProperties(
    resourceGroupName: string,
    accountName: string,
    options?: StorageAccountsGetPropertiesOptionalParams
  ): Promise<StorageAccountsGetPropertiesResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options: operationOptions },
      getPropertiesOperationSpec
    ) as Promise<StorageAccountsGetPropertiesResponse>;
  }

  /**
   * The update operation can be used to update the SKU, encryption, access tier, or tags for a storage
   * account. It can also be used to map the account to a custom domain. Only one custom domain is
   * supported per storage account; the replacement/change of custom domain is not supported. In order to
   * replace an old custom domain, the old value must be cleared/unregistered before a new value can be
   * set. The update of multiple properties is supported. This call does not change the storage keys for
   * the account. If you want to change the storage account keys, use the regenerate keys operation. The
   * location and name of the storage account cannot be changed after creation.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param parameters The parameters to provide for the updated account.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    accountName: string,
    parameters: StorageAccountUpdateParameters,
    options?: coreHttp.OperationOptions
  ): Promise<StorageAccountsUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, parameters, options: operationOptions },
      updateOperationSpec
    ) as Promise<StorageAccountsUpdateResponse>;
  }

  /**
   * Lists all the storage accounts available under the subscription. Note that storage keys are not
   * returned; use the ListKeys operation for this.
   * @param options The options parameters.
   */
  list(
    options?: coreHttp.OperationOptions
  ): Promise<StorageAccountsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listOperationSpec
    ) as Promise<StorageAccountsListResponse>;
  }

  /**
   * Lists all the storage accounts available under the given resource group. Note that storage keys are
   * not returned; use the ListKeys operation for this.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<StorageAccountsListByResourceGroupResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, options: operationOptions },
      listByResourceGroupOperationSpec
    ) as Promise<StorageAccountsListByResourceGroupResponse>;
  }

  /**
   * Lists the access keys or Kerberos keys (if active directory enabled) for the specified storage
   * account.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param options The options parameters.
   */
  listKeys(
    resourceGroupName: string,
    accountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<StorageAccountsListKeysResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options: operationOptions },
      listKeysOperationSpec
    ) as Promise<StorageAccountsListKeysResponse>;
  }

  /**
   * Regenerates one of the access keys or Kerberos keys for the specified storage account.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param regenerateKey Specifies name of the key which should be regenerated -- key1, key2, kerb1,
   *                      kerb2.
   * @param options The options parameters.
   */
  regenerateKey(
    resourceGroupName: string,
    accountName: string,
    regenerateKey: StorageAccountRegenerateKeyParameters,
    options?: coreHttp.OperationOptions
  ): Promise<StorageAccountsRegenerateKeyResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        regenerateKey,
        options: operationOptions
      },
      regenerateKeyOperationSpec
    ) as Promise<StorageAccountsRegenerateKeyResponse>;
  }

  /**
   * List SAS credentials of a storage account.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param parameters The parameters to provide to list SAS credentials for the storage account.
   * @param options The options parameters.
   */
  listAccountSAS(
    resourceGroupName: string,
    accountName: string,
    parameters: AccountSasParameters,
    options?: coreHttp.OperationOptions
  ): Promise<StorageAccountsListAccountSASResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, parameters, options: operationOptions },
      listAccountSASOperationSpec
    ) as Promise<StorageAccountsListAccountSASResponse>;
  }

  /**
   * List service SAS credentials of a specific resource.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param parameters The parameters to provide to list service SAS credentials.
   * @param options The options parameters.
   */
  listServiceSAS(
    resourceGroupName: string,
    accountName: string,
    parameters: ServiceSasParameters,
    options?: coreHttp.OperationOptions
  ): Promise<StorageAccountsListServiceSASResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, parameters, options: operationOptions },
      listServiceSASOperationSpec
    ) as Promise<StorageAccountsListServiceSASResponse>;
  }

  /**
   * Failover request can be triggered for a storage account in case of availability issues. The failover
   * occurs from the storage account's primary cluster to secondary cluster for RA-GRS accounts. The
   * secondary cluster will become primary after failover.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param options The options parameters.
   */
  async failover(
    resourceGroupName: string,
    accountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options,
      "location"
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      failoverOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: failoverOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * Restore blobs in the specified blob ranges
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param parameters The parameters to provide for restore blob ranges.
   * @param options The options parameters.
   */
  async restoreBlobRanges(
    resourceGroupName: string,
    accountName: string,
    parameters: BlobRestoreParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<StorageAccountsRestoreBlobRangesResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options,
      "location"
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      parameters,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        StorageAccountsRestoreBlobRangesResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      restoreBlobRangesOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: restoreBlobRangesOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * Revoke user delegation keys.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param options The options parameters.
   */
  revokeUserDelegationKeys(
    resourceGroupName: string,
    accountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options: operationOptions },
      revokeUserDelegationKeysOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<StorageAccountsListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<StorageAccountsListNextResponse>;
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

const checkNameAvailabilityOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Storage/checkNameAvailability",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.CheckNameAvailabilityResult
    }
  },
  requestBody: Parameters.accountName,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.contentType],
  serializer
};
const createOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccount
    },
    201: {
      bodyMapper: Mappers.StorageAccount
    },
    202: {
      bodyMapper: Mappers.StorageAccount
    },
    204: {
      bodyMapper: Mappers.StorageAccount
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName1
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName1
  ],
  serializer
};
const getPropertiesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccount
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName1
  ],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccount
    }
  },
  requestBody: Parameters.parameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName1
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Storage/storageAccounts",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccountListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  serializer
};
const listByResourceGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccountListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  serializer
};
const listKeysOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/listKeys",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccountListKeysResult
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.expand1],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName1
  ],
  serializer
};
const regenerateKeyOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/regenerateKey",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccountListKeysResult
    }
  },
  requestBody: Parameters.regenerateKey,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName1
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const listAccountSASOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/ListAccountSas",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ListAccountSasResponse
    }
  },
  requestBody: Parameters.parameters2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName1
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const listServiceSASOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/ListServiceSas",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ListServiceSasResponse
    }
  },
  requestBody: Parameters.parameters3,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName1
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const failoverOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/failover",
  httpMethod: "POST",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName1
  ],
  serializer
};
const restoreBlobRangesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/restoreBlobRanges",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.BlobRestoreStatus
    },
    201: {
      bodyMapper: Mappers.BlobRestoreStatus
    },
    202: {
      bodyMapper: Mappers.BlobRestoreStatus
    },
    204: {
      bodyMapper: Mappers.BlobRestoreStatus
    }
  },
  requestBody: Parameters.parameters4,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName1
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const revokeUserDelegationKeysOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/revokeUserDelegationKeys",
  httpMethod: "POST",
  responses: { 200: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName1
  ],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccountListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  serializer
};
