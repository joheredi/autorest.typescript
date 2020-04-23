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
import { CustomerInsightsManagementClient } from "../customerInsightsManagementClient";
import {
  GetImageUploadUrlInput,
  ImagesGetUploadUrlForEntityTypeResponse,
  ImagesGetUploadUrlForDataResponse
} from "../models";

/**
 * Class representing a Images.
 */
export class Images {
  private readonly client: CustomerInsightsManagementClient;

  /**
   * Initialize a new instance of the class Images class.
   * @param client Reference to the service client
   */
  constructor(client: CustomerInsightsManagementClient) {
    this.client = client;
  }

  /**
   * Gets entity type (profile or interaction) image upload URL.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param parameters Parameters supplied to the GetUploadUrlForEntityType operation.
   * @param options The options parameters.
   */
  getUploadUrlForEntityType(
    resourceGroupName: string,
    hubName: string,
    parameters: GetImageUploadUrlInput,
    options?: coreHttp.OperationOptions
  ): Promise<ImagesGetUploadUrlForEntityTypeResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, hubName, parameters, options: operationOptions },
      getUploadUrlForEntityTypeOperationSpec
    ) as Promise<ImagesGetUploadUrlForEntityTypeResponse>;
  }

  /**
   * Gets data image upload URL.
   * @param resourceGroupName The name of the resource group.
   * @param hubName The name of the hub.
   * @param parameters Parameters supplied to the GetUploadUrlForData operation.
   * @param options The options parameters.
   */
  getUploadUrlForData(
    resourceGroupName: string,
    hubName: string,
    parameters: GetImageUploadUrlInput,
    options?: coreHttp.OperationOptions
  ): Promise<ImagesGetUploadUrlForDataResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, hubName, parameters, options: operationOptions },
      getUploadUrlForDataOperationSpec
    ) as Promise<ImagesGetUploadUrlForDataResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getUploadUrlForEntityTypeOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/images/getEntityTypeImageUploadUrl",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ImageDefinition
    }
  },
  requestBody: Parameters.parameters13,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hubName2
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const getUploadUrlForDataOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CustomerInsights/hubs/{hubName}/images/getDataImageUploadUrl",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ImageDefinition
    }
  },
  requestBody: Parameters.parameters14,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.hubName2
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
