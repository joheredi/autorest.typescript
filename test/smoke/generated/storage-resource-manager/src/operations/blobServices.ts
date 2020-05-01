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
import {
  BlobServicesListResponse,
  BlobServiceProperties,
  BlobServicesSetServicePropertiesResponse,
  BlobServicesGetServicePropertiesResponse
} from "../models";

/**
 * Class representing a BlobServices.
 */
export class BlobServices {
  private readonly client: StorageManagementClient;

  /**
   * Initialize a new instance of the class BlobServices class.
   * @param client Reference to the service client
   */
  constructor(client: StorageManagementClient) {
    this.client = client;
  }

  /**
   * List blob services of storage account. It returns a collection of one object named default.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    accountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<BlobServicesListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options: operationOptions },
      listOperationSpec
    ) as Promise<BlobServicesListResponse>;
  }

  /**
   * Sets the properties of a storage account’s Blob service, including properties for Storage Analytics
   * and CORS (Cross-Origin Resource Sharing) rules.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param parameters The properties of a storage account’s Blob service, including properties for
   *                   Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
   * @param options The options parameters.
   */
  setServiceProperties(
    resourceGroupName: string,
    accountName: string,
    parameters: BlobServiceProperties,
    options?: coreHttp.OperationOptions
  ): Promise<BlobServicesSetServicePropertiesResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, parameters, options: operationOptions },
      setServicePropertiesOperationSpec
    ) as Promise<BlobServicesSetServicePropertiesResponse>;
  }

  /**
   * Gets the properties of a storage account’s Blob service, including properties for Storage Analytics
   * and CORS (Cross-Origin Resource Sharing) rules.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param accountName The name of the storage account within the specified resource group. Storage
   *                    account names must be between 3 and 24 characters in length and use numbers and lower-case letters
   *                    only.
   * @param options The options parameters.
   */
  getServiceProperties(
    resourceGroupName: string,
    accountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<BlobServicesGetServicePropertiesResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, accountName, options: operationOptions },
      getServicePropertiesOperationSpec
    ) as Promise<BlobServicesGetServicePropertiesResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BlobServiceItems
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName1
  ],
  serializer
};
const setServicePropertiesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/{BlobServicesName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.BlobServiceProperties
    }
  },
  requestBody: Parameters.parameters5,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName1,
    Parameters.blobServicesName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const getServicePropertiesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}/blobServices/{BlobServicesName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BlobServiceProperties
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.accountName1,
    Parameters.blobServicesName
  ],
  serializer
};
