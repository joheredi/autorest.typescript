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
import { ApiManagementClient } from "../apiManagementClient";
import {
  NotificationListByServiceOptionalParams,
  NotificationListByServiceResponse,
  NotificationName,
  NotificationGetResponse,
  NotificationCreateOrUpdateOptionalParams,
  NotificationCreateOrUpdateResponse,
  NotificationListByServiceNextOptionalParams,
  NotificationListByServiceNextResponse
} from "../models";

/**
 * Class representing a Notification.
 */
export class Notification {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class Notification class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Lists a collection of properties defined within a service instance.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param options The options parameters.
   */
  listByService(
    resourceGroupName: string,
    serviceName: string,
    options?: NotificationListByServiceOptionalParams
  ): Promise<NotificationListByServiceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, options: operationOptions },
      listByServiceOperationSpec
    ) as Promise<NotificationListByServiceResponse>;
  }

  /**
   * Gets the details of the Notification specified by its identifier.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param notificationName Notification Name Identifier.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    notificationName: NotificationName,
    options?: coreHttp.OperationOptions
  ): Promise<NotificationGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        notificationName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<NotificationGetResponse>;
  }

  /**
   * Create or Update API Management publisher notification.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param notificationName Notification Name Identifier.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    notificationName: NotificationName,
    options?: NotificationCreateOrUpdateOptionalParams
  ): Promise<NotificationCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        notificationName,
        options: operationOptions
      },
      createOrUpdateOperationSpec
    ) as Promise<NotificationCreateOrUpdateResponse>;
  }

  /**
   * ListByServiceNext
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param nextLink The nextLink from the previous successful call to the ListByService method.
   * @param options The options parameters.
   */
  listByServiceNext(
    resourceGroupName: string,
    serviceName: string,
    nextLink: string,
    options?: NotificationListByServiceNextOptionalParams
  ): Promise<NotificationListByServiceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, nextLink, options: operationOptions },
      listByServiceNextOperationSpec
    ) as Promise<NotificationListByServiceNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listByServiceOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/notifications",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NotificationCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.top, Parameters.skip, Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/notifications/{notificationName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NotificationContract
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.notificationName
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/notifications/{notificationName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.NotificationContract
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.notificationName
  ],
  headerParameters: [Parameters.ifMatch],
  serializer
};
const listByServiceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NotificationCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.top, Parameters.skip, Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  serializer
};
