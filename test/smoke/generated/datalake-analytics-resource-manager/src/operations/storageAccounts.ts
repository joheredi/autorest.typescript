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
import { DataLakeAnalyticsAccountManagementClient } from "../dataLakeAnalyticsAccountManagementClient";
import {
  StorageAccountsListByAccountOptionalParams,
  StorageAccountsListByAccountResponse,
  AddStorageAccountParameters,
  StorageAccountsGetResponse,
  StorageAccountsUpdateOptionalParams,
  StorageAccountsListStorageContainersResponse,
  StorageAccountsGetStorageContainerResponse,
  StorageAccountsListSasTokensResponse,
  StorageAccountsListByAccountNextOptionalParams,
  StorageAccountsListByAccountNextResponse,
  StorageAccountsListStorageContainersNextResponse,
  StorageAccountsListSasTokensNextResponse
} from "../models";

/**
 * Class representing a StorageAccounts.
 */
export class StorageAccounts {
  private readonly client: DataLakeAnalyticsAccountManagementClient;

  /**
   * Initialize a new instance of the class StorageAccounts class.
   * @param client Reference to the service client
   */
  constructor(client: DataLakeAnalyticsAccountManagementClient) {
    this.client = client;
  }

  /**
   * Gets the first page of Azure Storage accounts, if any, linked to the specified Data Lake Analytics
   * account. The response includes a link to the next page, if any.
   * @param resourceGroupName The name of the Azure resource group.
   * @param accountName The name of the Data Lake Analytics account.
   * @param options The options parameters.
   */
  listByAccount(
    resourceGroupName: string,
    accountName: string,
    options?: StorageAccountsListByAccountOptionalParams
  ): Promise<StorageAccountsListByAccountResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options: operationOptions },
      listByAccountOperationSpec
    ) as Promise<StorageAccountsListByAccountResponse>;
  }

  /**
   * Updates the specified Data Lake Analytics account to add an Azure Storage account.
   * @param resourceGroupName The name of the Azure resource group.
   * @param accountName The name of the Data Lake Analytics account.
   * @param parameters The parameters containing the access key and optional suffix for the Azure Storage
   *                   Account.
   * @param storageAccountName The name of the Azure Storage account to add
   * @param options The options parameters.
   */
  add(
    resourceGroupName: string,
    accountName: string,
    parameters: AddStorageAccountParameters,
    storageAccountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        parameters,
        storageAccountName,
        options: operationOptions
      },
      addOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Gets the specified Azure Storage account linked to the given Data Lake Analytics account.
   * @param resourceGroupName The name of the Azure resource group.
   * @param accountName The name of the Data Lake Analytics account.
   * @param storageAccountName The name of the Azure Storage account for which to retrieve the details.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    accountName: string,
    storageAccountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<StorageAccountsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        storageAccountName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<StorageAccountsGetResponse>;
  }

  /**
   * Updates the Data Lake Analytics account to replace Azure Storage blob account details, such as the
   * access key and/or suffix.
   * @param resourceGroupName The name of the Azure resource group.
   * @param accountName The name of the Data Lake Analytics account.
   * @param storageAccountName The Azure Storage account to modify
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    accountName: string,
    storageAccountName: string,
    options?: StorageAccountsUpdateOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        storageAccountName,
        options: operationOptions
      },
      updateOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Updates the specified Data Lake Analytics account to remove an Azure Storage account.
   * @param resourceGroupName The name of the Azure resource group.
   * @param accountName The name of the Data Lake Analytics account.
   * @param storageAccountName The name of the Azure Storage account to remove
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    accountName: string,
    storageAccountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        storageAccountName,
        options: operationOptions
      },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Lists the Azure Storage containers, if any, associated with the specified Data Lake Analytics and
   * Azure Storage account combination. The response includes a link to the next page of results, if any.
   * @param resourceGroupName The name of the Azure resource group.
   * @param accountName The name of the Data Lake Analytics account.
   * @param storageAccountName The name of the Azure storage account from which to list blob containers.
   * @param options The options parameters.
   */
  listStorageContainers(
    resourceGroupName: string,
    accountName: string,
    storageAccountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<StorageAccountsListStorageContainersResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        storageAccountName,
        options: operationOptions
      },
      listStorageContainersOperationSpec
    ) as Promise<StorageAccountsListStorageContainersResponse>;
  }

  /**
   * Gets the specified Azure Storage container associated with the given Data Lake Analytics and Azure
   * Storage accounts.
   * @param resourceGroupName The name of the Azure resource group.
   * @param accountName The name of the Data Lake Analytics account.
   * @param storageAccountName The name of the Azure storage account from which to retrieve the blob
   *                           container.
   * @param containerName The name of the Azure storage container to retrieve
   * @param options The options parameters.
   */
  getStorageContainer(
    resourceGroupName: string,
    accountName: string,
    storageAccountName: string,
    containerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<StorageAccountsGetStorageContainerResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        storageAccountName,
        containerName,
        options: operationOptions
      },
      getStorageContainerOperationSpec
    ) as Promise<StorageAccountsGetStorageContainerResponse>;
  }

  /**
   * Gets the SAS token associated with the specified Data Lake Analytics and Azure Storage account and
   * container combination.
   * @param resourceGroupName The name of the Azure resource group.
   * @param accountName The name of the Data Lake Analytics account.
   * @param storageAccountName The name of the Azure storage account for which the SAS token is being
   *                           requested.
   * @param containerName The name of the Azure storage container for which the SAS token is being
   *                      requested.
   * @param options The options parameters.
   */
  listSasTokens(
    resourceGroupName: string,
    accountName: string,
    storageAccountName: string,
    containerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<StorageAccountsListSasTokensResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        storageAccountName,
        containerName,
        options: operationOptions
      },
      listSasTokensOperationSpec
    ) as Promise<StorageAccountsListSasTokensResponse>;
  }

  /**
   * ListByAccountNext
   * @param resourceGroupName The name of the Azure resource group.
   * @param accountName The name of the Data Lake Analytics account.
   * @param nextLink The nextLink from the previous successful call to the ListByAccount method.
   * @param options The options parameters.
   */
  listByAccountNext(
    resourceGroupName: string,
    accountName: string,
    nextLink: string,
    options?: StorageAccountsListByAccountNextOptionalParams
  ): Promise<StorageAccountsListByAccountNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, nextLink, options: operationOptions },
      listByAccountNextOperationSpec
    ) as Promise<StorageAccountsListByAccountNextResponse>;
  }

  /**
   * ListStorageContainersNext
   * @param resourceGroupName The name of the Azure resource group.
   * @param accountName The name of the Data Lake Analytics account.
   * @param storageAccountName The name of the Azure storage account from which to list blob containers.
   * @param nextLink The nextLink from the previous successful call to the ListStorageContainers method.
   * @param options The options parameters.
   */
  listStorageContainersNext(
    resourceGroupName: string,
    accountName: string,
    storageAccountName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<StorageAccountsListStorageContainersNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        storageAccountName,
        nextLink,
        options: operationOptions
      },
      listStorageContainersNextOperationSpec
    ) as Promise<StorageAccountsListStorageContainersNextResponse>;
  }

  /**
   * ListSasTokensNext
   * @param resourceGroupName The name of the Azure resource group.
   * @param accountName The name of the Data Lake Analytics account.
   * @param storageAccountName The name of the Azure storage account for which the SAS token is being
   *                           requested.
   * @param containerName The name of the Azure storage container for which the SAS token is being
   *                      requested.
   * @param nextLink The nextLink from the previous successful call to the ListSasTokens method.
   * @param options The options parameters.
   */
  listSasTokensNext(
    resourceGroupName: string,
    accountName: string,
    storageAccountName: string,
    containerName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<StorageAccountsListSasTokensNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        storageAccountName,
        containerName,
        nextLink,
        options: operationOptions
      },
      listSasTokensNextOperationSpec
    ) as Promise<StorageAccountsListSasTokensNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listByAccountOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/storageAccounts",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccountInformationListResult
    }
  },
  queryParameters: [
    Parameters.top,
    Parameters.skip,
    Parameters.select,
    Parameters.orderby,
    Parameters.count,
    Parameters.apiVersion,
    Parameters.filter1
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName
  ],
  serializer
};
const addOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/storageAccounts/{storageAccountName}",
  httpMethod: "PUT",
  responses: { 200: {} },
  requestBody: Parameters.parameters4,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.storageAccountName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/storageAccounts/{storageAccountName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccountInformation
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.storageAccountName1
  ],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/storageAccounts/{storageAccountName}",
  httpMethod: "PATCH",
  responses: { 200: {} },
  requestBody: Parameters.parameters5,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.storageAccountName2
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/storageAccounts/{storageAccountName}",
  httpMethod: "DELETE",
  responses: { 200: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.storageAccountName3
  ],
  serializer
};
const listStorageContainersOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/storageAccounts/{storageAccountName}/containers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageContainerListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.storageAccountName4
  ],
  serializer
};
const getStorageContainerOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/storageAccounts/{storageAccountName}/containers/{containerName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageContainer
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.storageAccountName5,
    Parameters.containerName
  ],
  serializer
};
const listSasTokensOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeAnalytics/accounts/{accountName}/storageAccounts/{storageAccountName}/containers/{containerName}/listSasTokens",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SasTokenInformationListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.storageAccountName6,
    Parameters.containerName1
  ],
  serializer
};
const listByAccountNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccountInformationListResult
    }
  },
  queryParameters: [
    Parameters.top,
    Parameters.skip,
    Parameters.select,
    Parameters.orderby,
    Parameters.count,
    Parameters.apiVersion,
    Parameters.filter1
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.nextLink2
  ],
  serializer
};
const listStorageContainersNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageContainerListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.storageAccountName4,
    Parameters.nextLink3
  ],
  serializer
};
const listSasTokensNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SasTokenInformationListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.storageAccountName6,
    Parameters.containerName1,
    Parameters.nextLink4
  ],
  serializer
};
