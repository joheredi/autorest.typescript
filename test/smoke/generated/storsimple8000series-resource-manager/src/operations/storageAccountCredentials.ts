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
import { StorSimple8000SeriesManagementClient } from "../storSimple8000SeriesManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  StorageAccountCredentialsListByManagerResponse,
  StorageAccountCredentialsGetResponse,
  StorageAccountCredential,
  StorageAccountCredentialsCreateOrUpdateResponse
} from "../models";

/**
 * Class representing a StorageAccountCredentials.
 */
export class StorageAccountCredentials {
  private readonly client: StorSimple8000SeriesManagementClient;

  /**
   * Initialize a new instance of the class StorageAccountCredentials class.
   * @param client Reference to the service client
   */
  constructor(client: StorSimple8000SeriesManagementClient) {
    this.client = client;
  }

  /**
   * Gets all the storage account credentials in a manager.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param options The options parameters.
   */
  listByManager(
    resourceGroupName: string,
    managerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<StorageAccountCredentialsListByManagerResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, managerName, options: operationOptions },
      listByManagerOperationSpec
    ) as Promise<StorageAccountCredentialsListByManagerResponse>;
  }

  /**
   * Gets the properties of the specified storage account credential name.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param storageAccountCredentialName The name of storage account credential to be fetched.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    managerName: string,
    storageAccountCredentialName: string,
    options?: coreHttp.OperationOptions
  ): Promise<StorageAccountCredentialsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        managerName,
        storageAccountCredentialName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<StorageAccountCredentialsGetResponse>;
  }

  /**
   * Creates or updates the storage account credential.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param parameters The storage account credential to be added or updated.
   * @param storageAccountCredentialName The storage account credential name.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    managerName: string,
    parameters: StorageAccountCredential,
    storageAccountCredentialName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<StorageAccountCredentialsCreateOrUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      managerName,
      parameters,
      storageAccountCredentialName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        StorageAccountCredentialsCreateOrUpdateResponse
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
   * Deletes the storage account credential.
   * @param resourceGroupName The resource group name
   * @param managerName The manager name
   * @param storageAccountCredentialName The name of the storage account credential.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    managerName: string,
    storageAccountCredentialName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      managerName,
      storageAccountCredentialName,
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

const listByManagerOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/storageAccountCredentials",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccountCredentialList
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/storageAccountCredentials/{storageAccountCredentialName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccountCredential
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.storageAccountCredentialName
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/storageAccountCredentials/{storageAccountCredentialName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.StorageAccountCredential
    },
    201: {
      bodyMapper: Mappers.StorageAccountCredential
    },
    202: {
      bodyMapper: Mappers.StorageAccountCredential
    },
    204: {
      bodyMapper: Mappers.StorageAccountCredential
    }
  },
  requestBody: Parameters.parameters22,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.storageAccountCredentialName1
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorSimple/managers/{managerName}/storageAccountCredentials/{storageAccountCredentialName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.managerName,
    Parameters.storageAccountCredentialName2
  ],
  serializer
};
