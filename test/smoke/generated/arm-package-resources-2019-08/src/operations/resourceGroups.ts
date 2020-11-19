/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ResourceManagementClient } from "../resourceManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  ResourceGroup,
  ResourceGroupsListNextOptionalParams,
  ResourceGroupsListOptionalParams,
  ResourceGroupsCreateOrUpdateResponse,
  ResourceGroupsGetResponse,
  ResourceGroupPatchable,
  ResourceGroupsUpdateResponse,
  ExportTemplateRequest,
  ResourceGroupsExportTemplateResponse,
  ResourceGroupsListResponse,
  ResourceGroupsListNextResponse
} from "../models";

/**
 * Class representing a ResourceGroups.
 */
export class ResourceGroups {
  private readonly client: ResourceManagementClient;

  /**
   * Initialize a new instance of the class ResourceGroups class.
   * @param client Reference to the service client
   */
  constructor(client: ResourceManagementClient) {
    this.client = client;
  }

  /**
   * Gets all the resource groups for a subscription.
   * @param options The options parameters.
   */
  public list(
    options?: ResourceGroupsListOptionalParams
  ): PagedAsyncIterableIterator<ResourceGroup> {
    const iter = this.listPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(options);
      }
    };
  }

  private async *listPagingPage(
    options?: ResourceGroupsListOptionalParams
  ): AsyncIterableIterator<ResourceGroup[]> {
    let result = await this._list(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    options?: ResourceGroupsListOptionalParams
  ): AsyncIterableIterator<ResourceGroup> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Checks whether a resource group exists.
   * @param resourceGroupName The name of the resource group to check. The name is case insensitive.
   * @param options The options parameters.
   */
  checkExistence(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      checkExistenceOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Creates or updates a resource group.
   * @param resourceGroupName The name of the resource group to create or update. Can include
   *                          alphanumeric, underscore, parentheses, hyphen, period (except at end), and Unicode characters that
   *                          match the allowed characters.
   * @param parameters Parameters supplied to the create or update a resource group.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    parameters: ResourceGroup,
    options?: coreHttp.OperationOptions
  ): Promise<ResourceGroupsCreateOrUpdateResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      parameters,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      createOrUpdateOperationSpec
    ) as Promise<ResourceGroupsCreateOrUpdateResponse>;
  }

  /**
   * When you delete a resource group, all of its resources are also deleted. Deleting a resource group
   * deletes all of its template deployments and currently stored operations.
   * @param resourceGroupName The name of the resource group to delete. The name is case insensitive.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        coreHttp.RestResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      deleteOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Gets a resource group.
   * @param resourceGroupName The name of the resource group to get. The name is case insensitive.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ResourceGroupsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<ResourceGroupsGetResponse>;
  }

  /**
   * Resource groups can be updated through a simple PATCH operation to a group address. The format of
   * the request is the same as that for creating a resource group. If a field is unspecified, the
   * current value is retained.
   * @param resourceGroupName The name of the resource group to update. The name is case insensitive.
   * @param parameters Parameters supplied to update a resource group.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    parameters: ResourceGroupPatchable,
    options?: coreHttp.OperationOptions
  ): Promise<ResourceGroupsUpdateResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      parameters,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      updateOperationSpec
    ) as Promise<ResourceGroupsUpdateResponse>;
  }

  /**
   * Captures the specified resource group as a template.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param parameters Parameters for exporting the template.
   * @param options The options parameters.
   */
  async exportTemplate(
    resourceGroupName: string,
    parameters: ExportTemplateRequest,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<ResourceGroupsExportTemplateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      parameters,
      options: this.getOperationOptions(options, "location")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        ResourceGroupsExportTemplateResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      exportTemplateOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: exportTemplateOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * Gets all the resource groups for a subscription.
   * @param options The options parameters.
   */
  private _list(
    options?: ResourceGroupsListOptionalParams
  ): Promise<ResourceGroupsListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<ResourceGroupsListResponse>;
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    nextLink: string,
    options?: ResourceGroupsListNextOptionalParams
  ): Promise<ResourceGroupsListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<ResourceGroupsListNextResponse>;
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

const checkExistenceOperationSpec: coreHttp.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}",
  httpMethod: "HEAD",
  responses: {
    204: {},
    404: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ResourceGroup
    },
    201: {
      bodyMapper: Mappers.ResourceGroup
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters5,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}",
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
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResourceGroup
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.ResourceGroup
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters6,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const exportTemplateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/exportTemplate",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ResourceGroupExportResult
    },
    201: {
      bodyMapper: Mappers.ResourceGroupExportResult
    },
    202: {
      bodyMapper: Mappers.ResourceGroupExportResult
    },
    204: {
      bodyMapper: Mappers.ResourceGroupExportResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.parameters7,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourcegroups",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResourceGroupListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter, Parameters.top],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ResourceGroupListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
