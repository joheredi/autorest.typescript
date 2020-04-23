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
import { LogicManagementClient } from "../logicManagementClient";
import {
  WorkflowVersionTriggersListCallbackUrlOptionalParams,
  WorkflowVersionTriggersListCallbackUrlResponse
} from "../models";

/**
 * Class representing a WorkflowVersionTriggers.
 */
export class WorkflowVersionTriggers {
  private readonly client: LogicManagementClient;

  /**
   * Initialize a new instance of the class WorkflowVersionTriggers class.
   * @param client Reference to the service client
   */
  constructor(client: LogicManagementClient) {
    this.client = client;
  }

  /**
   * Get the callback url for a trigger of a workflow version.
   * @param resourceGroupName The resource group name.
   * @param workflowName The workflow name.
   * @param versionId The workflow versionId.
   * @param triggerName The workflow trigger name.
   * @param options The options parameters.
   */
  listCallbackUrl(
    resourceGroupName: string,
    workflowName: string,
    versionId: string,
    triggerName: string,
    options?: WorkflowVersionTriggersListCallbackUrlOptionalParams
  ): Promise<WorkflowVersionTriggersListCallbackUrlResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        workflowName,
        versionId,
        triggerName,
        options: operationOptions
      },
      listCallbackUrlOperationSpec
    ) as Promise<WorkflowVersionTriggersListCallbackUrlResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listCallbackUrlOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/versions/{versionId}/triggers/{triggerName}/listCallbackUrl",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.WorkflowTriggerCallbackUrl
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workflowName,
    Parameters.versionId,
    Parameters.triggerName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
