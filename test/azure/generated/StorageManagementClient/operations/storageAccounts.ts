/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as coreArm from "@azure/core-arm";
import * as Models from "../models";
import * as Mappers from "../models/storageAccountsMappers";
import * as Parameters from "../models/parameters";
import { StorageManagementClientContext } from "../storageManagementClientContext";

/** Class representing a StorageAccounts. */
export class StorageAccounts {
  private readonly client: StorageManagementClientContext;

  /**
   * Create a StorageAccounts.
   * @param {StorageManagementClientContext} client Reference to the service client.
   */
  constructor(client: StorageManagementClientContext) {
    this.client = client;
  }

  /**
   * Checks that account name is valid and is not in use.
   * @param accountName The name of the storage account within the specified resource group. Storage
   * account names must be between 3 and 24 characters in length and use numbers and lower-case
   * letters only.
   * @param [options] The optional parameters
   * @returns Promise<Models.StorageAccountsCheckNameAvailabilityResponse>
   */
  checkNameAvailability(accountName: Models.StorageAccountCheckNameAvailabilityParameters, options?: coreHttp.RequestOptionsBase): Promise<Models.StorageAccountsCheckNameAvailabilityResponse>;
  /**
   * @param accountName The name of the storage account within the specified resource group. Storage
   * account names must be between 3 and 24 characters in length and use numbers and lower-case
   * letters only.
   * @param callback The callback
   */
  checkNameAvailability(accountName: Models.StorageAccountCheckNameAvailabilityParameters, callback: coreHttp.ServiceCallback<Models.CheckNameAvailabilityResult>): void;
  /**
   * @param accountName The name of the storage account within the specified resource group. Storage
   * account names must be between 3 and 24 characters in length and use numbers and lower-case
   * letters only.
   * @param options The optional parameters
   * @param callback The callback
   */
  checkNameAvailability(accountName: Models.StorageAccountCheckNameAvailabilityParameters, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.CheckNameAvailabilityResult>): void;
  checkNameAvailability(accountName: Models.StorageAccountCheckNameAvailabilityParameters, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.CheckNameAvailabilityResult>, callback?: coreHttp.ServiceCallback<Models.CheckNameAvailabilityResult>): Promise<Models.StorageAccountsCheckNameAvailabilityResponse> {
    return this.client.sendOperationRequest(
      {
        accountName,
        options
      },
      checkNameAvailabilityOperationSpec,
      callback) as Promise<Models.StorageAccountsCheckNameAvailabilityResponse>;
  }

  /**
   * Asynchronously creates a new storage account with the specified parameters. Existing accounts
   * cannot be updated with this API and should instead use the Update Storage Account API. If an
   * account is already created and subsequent PUT request is issued with exact same set of
   * properties, then HTTP 200 would be returned.
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param accountName The name of the storage account within the specified resource group. Storage
   * account names must be between 3 and 24 characters in length and use numbers and lower-case
   * letters only.
   * @param parameters The parameters to provide for the created account.
   * @param [options] The optional parameters
   * @returns Promise<Models.StorageAccountsCreateResponse>
   */
  create(resourceGroupName: string, accountName: string, parameters: Models.StorageAccountCreateParameters, options?: coreHttp.RequestOptionsBase): Promise<Models.StorageAccountsCreateResponse> {
    return this.beginCreate(resourceGroupName,accountName,parameters,options)
      .then(lroPoller => lroPoller.pollUntilFinished()) as Promise<Models.StorageAccountsCreateResponse>;
  }

  /**
   * Deletes a storage account in Microsoft Azure.
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param accountName The name of the storage account within the specified resource group. Storage
   * account names must be between 3 and 24 characters in length and use numbers and lower-case
   * letters only.
   * @param [options] The optional parameters
   * @returns Promise<coreHttp.RestResponse>
   */
  deleteMethod(resourceGroupName: string, accountName: string, options?: coreHttp.RequestOptionsBase): Promise<coreHttp.RestResponse>;
  /**
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param accountName The name of the storage account within the specified resource group. Storage
   * account names must be between 3 and 24 characters in length and use numbers and lower-case
   * letters only.
   * @param callback The callback
   */
  deleteMethod(resourceGroupName: string, accountName: string, callback: coreHttp.ServiceCallback<void>): void;
  /**
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param accountName The name of the storage account within the specified resource group. Storage
   * account names must be between 3 and 24 characters in length and use numbers and lower-case
   * letters only.
   * @param options The optional parameters
   * @param callback The callback
   */
  deleteMethod(resourceGroupName: string, accountName: string, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<void>): void;
  deleteMethod(resourceGroupName: string, accountName: string, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<void>, callback?: coreHttp.ServiceCallback<void>): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        options
      },
      deleteMethodOperationSpec,
      callback);
  }

  /**
   * Returns the properties for the specified storage account including but not limited to name,
   * account type, location, and account status. The ListKeys operation should be used to retrieve
   * storage keys.
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param accountName The name of the storage account within the specified resource group. Storage
   * account names must be between 3 and 24 characters in length and use numbers and lower-case
   * letters only.
   * @param [options] The optional parameters
   * @returns Promise<Models.StorageAccountsGetPropertiesResponse>
   */
  getProperties(resourceGroupName: string, accountName: string, options?: coreHttp.RequestOptionsBase): Promise<Models.StorageAccountsGetPropertiesResponse>;
  /**
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param accountName The name of the storage account within the specified resource group. Storage
   * account names must be between 3 and 24 characters in length and use numbers and lower-case
   * letters only.
   * @param callback The callback
   */
  getProperties(resourceGroupName: string, accountName: string, callback: coreHttp.ServiceCallback<Models.StorageAccount>): void;
  /**
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param accountName The name of the storage account within the specified resource group. Storage
   * account names must be between 3 and 24 characters in length and use numbers and lower-case
   * letters only.
   * @param options The optional parameters
   * @param callback The callback
   */
  getProperties(resourceGroupName: string, accountName: string, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.StorageAccount>): void;
  getProperties(resourceGroupName: string, accountName: string, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.StorageAccount>, callback?: coreHttp.ServiceCallback<Models.StorageAccount>): Promise<Models.StorageAccountsGetPropertiesResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        options
      },
      getPropertiesOperationSpec,
      callback) as Promise<Models.StorageAccountsGetPropertiesResponse>;
  }

  /**
   * Updates the account type or tags for a storage account. It can also be used to add a custom
   * domain (note that custom domains cannot be added via the Create operation). Only one custom
   * domain is supported per storage account. This API can only be used to update one of tags,
   * accountType, or customDomain per call. To update multiple of these properties, call the API
   * multiple times with one change per call. This call does not change the storage keys for the
   * account. If you want to change storage account keys, use the RegenerateKey operation. The
   * location and name of the storage account cannot be changed after creation.
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param accountName The name of the storage account within the specified resource group. Storage
   * account names must be between 3 and 24 characters in length and use numbers and lower-case
   * letters only.
   * @param parameters The parameters to update on the account. Note that only one property can be
   * changed at a time using this API.
   * @param [options] The optional parameters
   * @returns Promise<Models.StorageAccountsUpdateResponse>
   */
  update(resourceGroupName: string, accountName: string, parameters: Models.StorageAccountUpdateParameters, options?: coreHttp.RequestOptionsBase): Promise<Models.StorageAccountsUpdateResponse>;
  /**
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param accountName The name of the storage account within the specified resource group. Storage
   * account names must be between 3 and 24 characters in length and use numbers and lower-case
   * letters only.
   * @param parameters The parameters to update on the account. Note that only one property can be
   * changed at a time using this API.
   * @param callback The callback
   */
  update(resourceGroupName: string, accountName: string, parameters: Models.StorageAccountUpdateParameters, callback: coreHttp.ServiceCallback<Models.StorageAccount>): void;
  /**
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param accountName The name of the storage account within the specified resource group. Storage
   * account names must be between 3 and 24 characters in length and use numbers and lower-case
   * letters only.
   * @param parameters The parameters to update on the account. Note that only one property can be
   * changed at a time using this API.
   * @param options The optional parameters
   * @param callback The callback
   */
  update(resourceGroupName: string, accountName: string, parameters: Models.StorageAccountUpdateParameters, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.StorageAccount>): void;
  update(resourceGroupName: string, accountName: string, parameters: Models.StorageAccountUpdateParameters, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.StorageAccount>, callback?: coreHttp.ServiceCallback<Models.StorageAccount>): Promise<Models.StorageAccountsUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        parameters,
        options
      },
      updateOperationSpec,
      callback) as Promise<Models.StorageAccountsUpdateResponse>;
  }

  /**
   * Lists the access keys for the specified storage account.
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param accountName The name of the storage account.
   * @param [options] The optional parameters
   * @returns Promise<Models.StorageAccountsListKeysResponse>
   */
  listKeys(resourceGroupName: string, accountName: string, options?: coreHttp.RequestOptionsBase): Promise<Models.StorageAccountsListKeysResponse>;
  /**
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param accountName The name of the storage account.
   * @param callback The callback
   */
  listKeys(resourceGroupName: string, accountName: string, callback: coreHttp.ServiceCallback<Models.StorageAccountKeys>): void;
  /**
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param accountName The name of the storage account.
   * @param options The optional parameters
   * @param callback The callback
   */
  listKeys(resourceGroupName: string, accountName: string, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.StorageAccountKeys>): void;
  listKeys(resourceGroupName: string, accountName: string, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.StorageAccountKeys>, callback?: coreHttp.ServiceCallback<Models.StorageAccountKeys>): Promise<Models.StorageAccountsListKeysResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        options
      },
      listKeysOperationSpec,
      callback) as Promise<Models.StorageAccountsListKeysResponse>;
  }

  /**
   * Lists all the storage accounts available under the subscription. Note that storage keys are not
   * returned; use the ListKeys operation for this.
   * @param [options] The optional parameters
   * @returns Promise<Models.StorageAccountsListResponse>
   */
  list(options?: coreHttp.RequestOptionsBase): Promise<Models.StorageAccountsListResponse>;
  /**
   * @param callback The callback
   */
  list(callback: coreHttp.ServiceCallback<Models.StorageAccountListResult>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  list(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.StorageAccountListResult>): void;
  list(options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.StorageAccountListResult>, callback?: coreHttp.ServiceCallback<Models.StorageAccountListResult>): Promise<Models.StorageAccountsListResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      listOperationSpec,
      callback) as Promise<Models.StorageAccountsListResponse>;
  }

  /**
   * Lists all the storage accounts available under the given resource group. Note that storage keys
   * are not returned; use the ListKeys operation for this.
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param [options] The optional parameters
   * @returns Promise<Models.StorageAccountsListByResourceGroupResponse>
   */
  listByResourceGroup(resourceGroupName: string, options?: coreHttp.RequestOptionsBase): Promise<Models.StorageAccountsListByResourceGroupResponse>;
  /**
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param callback The callback
   */
  listByResourceGroup(resourceGroupName: string, callback: coreHttp.ServiceCallback<Models.StorageAccountListResult>): void;
  /**
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param options The optional parameters
   * @param callback The callback
   */
  listByResourceGroup(resourceGroupName: string, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.StorageAccountListResult>): void;
  listByResourceGroup(resourceGroupName: string, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.StorageAccountListResult>, callback?: coreHttp.ServiceCallback<Models.StorageAccountListResult>): Promise<Models.StorageAccountsListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        options
      },
      listByResourceGroupOperationSpec,
      callback) as Promise<Models.StorageAccountsListByResourceGroupResponse>;
  }

  /**
   * Regenerates the access keys for the specified storage account.
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param accountName The name of the storage account within the specified resource group. Storage
   * account names must be between 3 and 24 characters in length and use numbers and lower-case
   * letters only.
   * @param [options] The optional parameters
   * @returns Promise<Models.StorageAccountsRegenerateKeyResponse>
   */
  regenerateKey(resourceGroupName: string, accountName: string, options?: Models.StorageAccountsRegenerateKeyOptionalParams): Promise<Models.StorageAccountsRegenerateKeyResponse>;
  /**
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param accountName The name of the storage account within the specified resource group. Storage
   * account names must be between 3 and 24 characters in length and use numbers and lower-case
   * letters only.
   * @param callback The callback
   */
  regenerateKey(resourceGroupName: string, accountName: string, callback: coreHttp.ServiceCallback<Models.StorageAccountKeys>): void;
  /**
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param accountName The name of the storage account within the specified resource group. Storage
   * account names must be between 3 and 24 characters in length and use numbers and lower-case
   * letters only.
   * @param options The optional parameters
   * @param callback The callback
   */
  regenerateKey(resourceGroupName: string, accountName: string, options: Models.StorageAccountsRegenerateKeyOptionalParams, callback: coreHttp.ServiceCallback<Models.StorageAccountKeys>): void;
  regenerateKey(resourceGroupName: string, accountName: string, options?: Models.StorageAccountsRegenerateKeyOptionalParams | coreHttp.ServiceCallback<Models.StorageAccountKeys>, callback?: coreHttp.ServiceCallback<Models.StorageAccountKeys>): Promise<Models.StorageAccountsRegenerateKeyResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        accountName,
        options
      },
      regenerateKeyOperationSpec,
      callback) as Promise<Models.StorageAccountsRegenerateKeyResponse>;
  }

  /**
   * Asynchronously creates a new storage account with the specified parameters. Existing accounts
   * cannot be updated with this API and should instead use the Update Storage Account API. If an
   * account is already created and subsequent PUT request is issued with exact same set of
   * properties, then HTTP 200 would be returned.
   * @param resourceGroupName The name of the resource group within the user’s subscription.
   * @param accountName The name of the storage account within the specified resource group. Storage
   * account names must be between 3 and 24 characters in length and use numbers and lower-case
   * letters only.
   * @param parameters The parameters to provide for the created account.
   * @param [options] The optional parameters
   * @returns Promise<coreArm.LROPoller>
   */
  beginCreate(resourceGroupName: string, accountName: string, parameters: Models.StorageAccountCreateParameters, options?: coreHttp.RequestOptionsBase): Promise<coreArm.LROPoller> {
    return this.client.sendLRORequest(
      {
        resourceGroupName,
        accountName,
        parameters,
        options
      },
      beginCreateOperationSpec,
      options);
  }
}

// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers);
const checkNameAvailabilityOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "POST",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.Storage/checkNameAvailability",
  urlParameters: [
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "accountName",
    mapper: {
      ...Mappers.StorageAccountCheckNameAvailabilityParameters,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.CheckNameAvailabilityResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const deleteMethodOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "DELETE",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}",
  urlParameters: [
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const getPropertiesOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}",
  urlParameters: [
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccount
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const updateOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "PATCH",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}",
  urlParameters: [
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "parameters",
    mapper: {
      ...Mappers.StorageAccountUpdateParameters,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccount
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listKeysOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "POST",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/listKeys",
  urlParameters: [
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccountKeys
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.Storage/storageAccounts",
  urlParameters: [
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccountListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const listByResourceGroupOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts",
  urlParameters: [
    Parameters.resourceGroupName,
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccountListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const regenerateKeyOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "POST",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/regenerateKey",
  urlParameters: [
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: {
      keyName: [
        "options",
        "keyName"
      ]
    },
    mapper: {
      ...Mappers.StorageAccountRegenerateKeyParameters,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccountKeys
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};

const beginCreateOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "PUT",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}",
  urlParameters: [
    Parameters.resourceGroupName,
    Parameters.accountName,
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: "parameters",
    mapper: {
      ...Mappers.StorageAccountCreateParameters,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccount
    },
    202: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};