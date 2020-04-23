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
import { BatchAI } from "../batchAI";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  FileServerCreateParameters,
  FileServersCreateResponse,
  FileServersGetResponse,
  FileServersListByWorkspaceOptionalParams,
  FileServersListByWorkspaceResponse,
  FileServersListByWorkspaceNextOptionalParams,
  FileServersListByWorkspaceNextResponse
} from "../models";

/**
 * Class representing a FileServers.
 */
export class FileServers {
  private readonly client: BatchAI;

  /**
   * Initialize a new instance of the class FileServers class.
   * @param client Reference to the service client
   */
  constructor(client: BatchAI) {
    this.client = client;
  }

  /**
   * Creates a File Server in the given workspace.
   * @param resourceGroupName Name of the resource group to which the resource belongs.
   * @param workspaceName The name of the workspace. Workspace names can only contain a combination of
   *                      alphanumeric characters along with dash (-) and underscore (_). The name must be from 1 through 64
   *                      characters long.
   * @param parameters The parameters to provide for File Server creation.
   * @param fileServerName The name of the file server within the specified resource group. File server
   *                       names can only contain a combination of alphanumeric characters along with dash (-) and underscore
   *                       (_). The name must be from 1 through 64 characters long.
   * @param options The options parameters.
   */
  async create(
    resourceGroupName: string,
    workspaceName: string,
    parameters: FileServerCreateParameters,
    fileServerName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<FileServersCreateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      workspaceName,
      parameters,
      fileServerName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        FileServersCreateResponse
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
   * Deletes a File Server.
   * @param options The options parameters.
   */
  async deleteModel(
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = { options: operationOptions };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      deleteModelOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: deleteModelOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets information about a File Server.
   * @param options The options parameters.
   */
  getModel(
    options?: coreHttp.OperationOptions
  ): Promise<FileServersGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getModelOperationSpec
    ) as Promise<FileServersGetResponse>;
  }

  /**
   * Gets a list of File Servers associated with the specified workspace.
   * @param resourceGroupName Name of the resource group to which the resource belongs.
   * @param workspaceName The name of the workspace. Workspace names can only contain a combination of
   *                      alphanumeric characters along with dash (-) and underscore (_). The name must be from 1 through 64
   *                      characters long.
   * @param options The options parameters.
   */
  listByWorkspace(
    resourceGroupName: string,
    workspaceName: string,
    options?: FileServersListByWorkspaceOptionalParams
  ): Promise<FileServersListByWorkspaceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, workspaceName, options: operationOptions },
      listByWorkspaceOperationSpec
    ) as Promise<FileServersListByWorkspaceResponse>;
  }

  /**
   * ListByWorkspaceNext
   * @param resourceGroupName Name of the resource group to which the resource belongs.
   * @param workspaceName The name of the workspace. Workspace names can only contain a combination of
   *                      alphanumeric characters along with dash (-) and underscore (_). The name must be from 1 through 64
   *                      characters long.
   * @param nextLink The nextLink from the previous successful call to the ListByWorkspace method.
   * @param options The options parameters.
   */
  listByWorkspaceNext(
    resourceGroupName: string,
    workspaceName: string,
    nextLink: string,
    options?: FileServersListByWorkspaceNextOptionalParams
  ): Promise<FileServersListByWorkspaceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, workspaceName, nextLink, options: operationOptions },
      listByWorkspaceNextOperationSpec
    ) as Promise<FileServersListByWorkspaceNextResponse>;
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

const createOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BatchAI/workspaces/{workspaceName}/fileServers/{fileServerName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.FileServer
    },
    201: {
      bodyMapper: Mappers.FileServer
    },
    202: {
      bodyMapper: Mappers.FileServer
    },
    204: {
      bodyMapper: Mappers.FileServer
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters3,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.fileServerName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteModelOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BatchAI/workspaces/{workspaceName}/fileServers/{fileServerName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};
const getModelOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BatchAI/workspaces/{workspaceName}/fileServers/{fileServerName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.FileServer
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};
const listByWorkspaceOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BatchAI/workspaces/{workspaceName}/fileServers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.FileServerListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.maxResults5],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName
  ],
  serializer
};
const listByWorkspaceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.FileServerListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.maxResults5],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workspaceName,
    Parameters.nextLink2
  ],
  serializer
};
