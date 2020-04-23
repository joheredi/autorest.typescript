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
import { NetAppManagementClient } from "../netAppManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  AccountsListResponse,
  AccountsGetResponse,
  NetAppAccount,
  AccountsCreateOrUpdateResponse,
  NetAppAccountPatch,
  AccountsUpdateResponse
} from "../models";

/**
 * Class representing a Accounts.
 */
export class Accounts {
  private readonly client: NetAppManagementClient;

  /**
   * Initialize a new instance of the class Accounts class.
   * @param client Reference to the service client
   */
  constructor(client: NetAppManagementClient) {
    this.client = client;
  }

  /**
   * List and describe all NetApp accounts in the resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<AccountsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, options: operationOptions },
      listOperationSpec
    ) as Promise<AccountsListResponse>;
  }

  /**
   * Get the NetApp account
   * @param resourceGroupName The name of the resource group.
   * @param accountName The name of the NetApp account
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
   * Create or update the specified NetApp account within the resource group
   * @param resourceGroupName The name of the resource group.
   * @param accountName The name of the NetApp account
   * @param body NetApp Account object supplied in the body of the operation.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    accountName: string,
    body: NetAppAccount,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<AccountsCreateOrUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      accountName,
      body,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        AccountsCreateOrUpdateResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      createOrUpdateOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: createOrUpdateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Delete the specified NetApp account
   * @param resourceGroupName The name of the resource group.
   * @param accountName The name of the NetApp account
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
   * Patch the specified NetApp account
   * @param resourceGroupName The name of the resource group.
   * @param accountName The name of the NetApp account
   * @param body NetApp Account object supplied in the body of the operation.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    accountName: string,
    body: NetAppAccountPatch,
    options?: coreHttp.OperationOptions
  ): Promise<AccountsUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, body, options: operationOptions },
      updateOperationSpec
    ) as Promise<AccountsUpdateResponse>;
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NetAppAccountList
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NetAppAccount
    },
    default: {}
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
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.NetAppAccount
    },
    201: {
      bodyMapper: Mappers.NetAppAccount
    },
    202: {
      bodyMapper: Mappers.NetAppAccount
    },
    204: {
      bodyMapper: Mappers.NetAppAccount
    },
    default: {}
  },
  requestBody: Parameters.body2,
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {}, default: {} },
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.NetAppAccount
    },
    default: {}
  },
  requestBody: Parameters.body3,
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
