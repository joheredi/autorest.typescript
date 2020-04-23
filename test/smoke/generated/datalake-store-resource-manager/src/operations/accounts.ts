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
import { DataLakeStoreAccountManagementClient } from "../dataLakeStoreAccountManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  AccountsListOptionalParams,
  AccountsListResponse,
  AccountsListByResourceGroupOptionalParams,
  AccountsListByResourceGroupResponse,
  CreateDataLakeStoreAccountParameters,
  AccountsCreateResponse,
  AccountsGetResponse,
  UpdateDataLakeStoreAccountParameters,
  AccountsUpdateResponse,
  CheckNameAvailabilityParameters,
  AccountsCheckNameAvailabilityResponse,
  AccountsListNextOptionalParams,
  AccountsListNextResponse,
  AccountsListByResourceGroupNextOptionalParams,
  AccountsListByResourceGroupNextResponse
} from "../models";

/**
 * Class representing a Accounts.
 */
export class Accounts {
  private readonly client: DataLakeStoreAccountManagementClient;

  /**
   * Initialize a new instance of the class Accounts class.
   * @param client Reference to the service client
   */
  constructor(client: DataLakeStoreAccountManagementClient) {
    this.client = client;
  }

  /**
   * Lists the Data Lake Store accounts within the subscription. The response includes a link to the next
   * page of results, if any.
   * @param options The options parameters.
   */
  list(options?: AccountsListOptionalParams): Promise<AccountsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listOperationSpec
    ) as Promise<AccountsListResponse>;
  }

  /**
   * Lists the Data Lake Store accounts within a specific resource group. The response includes a link to
   * the next page of results, if any.
   * @param resourceGroupName The name of the Azure resource group.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: AccountsListByResourceGroupOptionalParams
  ): Promise<AccountsListByResourceGroupResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, options: operationOptions },
      listByResourceGroupOperationSpec
    ) as Promise<AccountsListByResourceGroupResponse>;
  }

  /**
   * Creates the specified Data Lake Store account.
   * @param resourceGroupName The name of the Azure resource group.
   * @param parameters Parameters supplied to create the Data Lake Store account.
   * @param accountName The name of the Data Lake Store account.
   * @param options The options parameters.
   */
  async create(
    resourceGroupName: string,
    parameters: CreateDataLakeStoreAccountParameters,
    accountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<AccountsCreateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      parameters,
      accountName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        AccountsCreateResponse
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
   * Gets the specified Data Lake Store account.
   * @param resourceGroupName The name of the Azure resource group.
   * @param accountName The name of the Data Lake Store account.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    accountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<AccountsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options: operationOptions },
      getOperationSpec
    ) as Promise<AccountsGetResponse>;
  }

  /**
   * Updates the specified Data Lake Store account information.
   * @param resourceGroupName The name of the Azure resource group.
   * @param accountName The name of the Data Lake Store account.
   * @param parameters Parameters supplied to update the Data Lake Store account.
   * @param options The options parameters.
   */
  async update(
    resourceGroupName: string,
    accountName: string,
    parameters: UpdateDataLakeStoreAccountParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<AccountsUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
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
        AccountsUpdateResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      updateOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: updateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Deletes the specified Data Lake Store account.
   * @param resourceGroupName The name of the Azure resource group.
   * @param accountName The name of the Data Lake Store account.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    accountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
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
      deleteOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: deleteOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Attempts to enable a user managed Key Vault for encryption of the specified Data Lake Store account.
   * @param resourceGroupName The name of the Azure resource group.
   * @param accountName The name of the Data Lake Store account.
   * @param options The options parameters.
   */
  enableKeyVault(
    resourceGroupName: string,
    accountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options: operationOptions },
      enableKeyVaultOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Checks whether the specified account name is available or taken.
   * @param parameters Parameters supplied to check the Data Lake Store account name availability.
   * @param location The resource location without whitespace.
   * @param options The options parameters.
   */
  checkNameAvailability(
    parameters: CheckNameAvailabilityParameters,
    location: string,
    options?: coreHttp.OperationOptions
  ): Promise<AccountsCheckNameAvailabilityResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { parameters, location, options: operationOptions },
      checkNameAvailabilityOperationSpec
    ) as Promise<AccountsCheckNameAvailabilityResponse>;
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    nextLink: string,
    options?: AccountsListNextOptionalParams
  ): Promise<AccountsListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<AccountsListNextResponse>;
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName The name of the Azure resource group.
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: AccountsListByResourceGroupNextOptionalParams
  ): Promise<AccountsListByResourceGroupNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options: operationOptions },
      listByResourceGroupNextOperationSpec
    ) as Promise<AccountsListByResourceGroupNextResponse>;
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

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataLakeStore/accounts",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataLakeStoreAccountListResult
    }
  },
  queryParameters: [
    Parameters.filter,
    Parameters.top,
    Parameters.skip,
    Parameters.select,
    Parameters.orderby,
    Parameters.count,
    Parameters.apiVersion
  ],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  serializer
};
const listByResourceGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataLakeStoreAccountListResult
    }
  },
  queryParameters: [
    Parameters.filter,
    Parameters.top,
    Parameters.skip,
    Parameters.select,
    Parameters.orderby,
    Parameters.apiVersion,
    Parameters.count1
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  serializer
};
const createOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.DataLakeStoreAccount
    },
    201: {
      bodyMapper: Mappers.DataLakeStoreAccount
    },
    202: {
      bodyMapper: Mappers.DataLakeStoreAccount
    },
    204: {
      bodyMapper: Mappers.DataLakeStoreAccount
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataLakeStoreAccount
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName
  ],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.DataLakeStoreAccount
    },
    201: {
      bodyMapper: Mappers.DataLakeStoreAccount
    },
    202: {
      bodyMapper: Mappers.DataLakeStoreAccount
    },
    204: {
      bodyMapper: Mappers.DataLakeStoreAccount
    }
  },
  requestBody: Parameters.parameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName
  ],
  serializer
};
const enableKeyVaultOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataLakeStore/accounts/{accountName}/enableKeyVault",
  httpMethod: "POST",
  responses: { 200: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName
  ],
  serializer
};
const checkNameAvailabilityOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataLakeStore/locations/{location}/checkNameAvailability",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.NameAvailabilityInformation
    }
  },
  requestBody: Parameters.parameters2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataLakeStoreAccountListResult
    }
  },
  queryParameters: [
    Parameters.filter,
    Parameters.top,
    Parameters.skip,
    Parameters.select,
    Parameters.orderby,
    Parameters.count,
    Parameters.apiVersion
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  serializer
};
const listByResourceGroupNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DataLakeStoreAccountListResult
    }
  },
  queryParameters: [
    Parameters.filter,
    Parameters.top,
    Parameters.skip,
    Parameters.select,
    Parameters.orderby,
    Parameters.apiVersion,
    Parameters.count1
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink1
  ],
  serializer
};
