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
  ReplicationAlertSettingsListResponse,
  ReplicationAlertSettingsGetResponse,
  ConfigureAlertRequest,
  ReplicationAlertSettingsCreateResponse,
  ReplicationAlertSettingsListNextResponse
} from "../models";

/**
 * Class representing a ReplicationAlertSettings.
 */
export class ReplicationAlertSettings {
  private readonly client: SiteRecoveryManagementClient;

  /**
   * Initialize a new instance of the class ReplicationAlertSettings class.
   * @param client Reference to the service client
   */
  constructor(client: SiteRecoveryManagementClient) {
    this.client = client;
  }

  /**
   * Gets the list of email notification(alert) configurations for the vault.
   * @param options The options parameters.
   */
  list(
    options?: coreHttp.OperationOptions
  ): Promise<ReplicationAlertSettingsListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listOperationSpec
    ) as Promise<ReplicationAlertSettingsListResponse>;
  }

  /**
   * Gets the details of the specified email notification(alert) configuration.
   * @param alertSettingName The name of the email notification configuration.
   * @param options The options parameters.
   */
  get(
    alertSettingName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ReplicationAlertSettingsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { alertSettingName, options: operationOptions },
      getOperationSpec
    ) as Promise<ReplicationAlertSettingsGetResponse>;
  }

  /**
   * Create or update an email notification(alert) configuration.
   * @param request The input to configure the email notification(alert).
   * @param alertSettingName The name of the email notification(alert) configuration.
   * @param options The options parameters.
   */
  create(
    request: ConfigureAlertRequest,
    alertSettingName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ReplicationAlertSettingsCreateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { request, alertSettingName, options: operationOptions },
      createOperationSpec
    ) as Promise<ReplicationAlertSettingsCreateResponse>;
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<ReplicationAlertSettingsListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<ReplicationAlertSettingsListNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationAlertSettings",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AlertCollection
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
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationAlertSettings/{alertSettingName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Alert
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.alertSettingName
  ],
  serializer
};
const createOperationSpec: coreHttp.OperationSpec = {
  path:
    "/Subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationAlertSettings/{alertSettingName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Alert
    }
  },
  requestBody: Parameters.request,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceName,
    Parameters.alertSettingName1
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AlertCollection
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
