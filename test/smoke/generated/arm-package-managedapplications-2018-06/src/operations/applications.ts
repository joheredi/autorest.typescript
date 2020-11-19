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
import { ApplicationClient } from "../applicationClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  Application,
  ApplicationsGetResponse,
  ApplicationsCreateOrUpdateResponse,
  ApplicationsUpdateOptionalParams,
  ApplicationsUpdateResponse,
  ApplicationsListByResourceGroupResponse,
  ApplicationsListBySubscriptionResponse,
  ApplicationsGetByIdResponse,
  ApplicationsCreateOrUpdateByIdResponse,
  ApplicationsUpdateByIdOptionalParams,
  ApplicationsUpdateByIdResponse,
  ApplicationsListByResourceGroupNextResponse,
  ApplicationsListBySubscriptionNextResponse
} from "../models";

/**
 * Class representing a Applications.
 */
export class Applications {
  private readonly client: ApplicationClient;

  /**
   * Initialize a new instance of the class Applications class.
   * @param client Reference to the service client
   */
  constructor(client: ApplicationClient) {
    this.client = client;
  }

  /**
   * Gets all the applications within a resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<Application> {
    const iter = this.listByResourceGroupPagingAll(resourceGroupName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listByResourceGroupPagingPage(resourceGroupName, options);
      }
    };
  }

  private async *listByResourceGroupPagingPage(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<Application[]> {
    let result = await this._listByResourceGroup(resourceGroupName, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByResourceGroupNext(
        resourceGroupName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByResourceGroupPagingAll(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<Application> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets all the applications within a subscription.
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<Application> {
    const iter = this.listBySubscriptionPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listBySubscriptionPagingPage(options);
      }
    };
  }

  private async *listBySubscriptionPagingPage(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<Application[]> {
    let result = await this._listBySubscription(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listBySubscriptionNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listBySubscriptionPagingAll(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<Application> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Gets the managed application.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param applicationName The name of the managed application.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    applicationName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ApplicationsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      applicationName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<ApplicationsGetResponse>;
  }

  /**
   * Deletes the managed application.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param applicationName The name of the managed application.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    applicationName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      applicationName,
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
   * Creates a new managed application.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param applicationName The name of the managed application.
   * @param parameters Parameters supplied to the create or update a managed application.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    applicationName: string,
    parameters: Application,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<ApplicationsCreateOrUpdateResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      applicationName,
      parameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        ApplicationsCreateOrUpdateResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      createOrUpdateOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createOrUpdateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Updates an existing managed application. The only value that can be updated via PATCH currently is
   * the tags.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param applicationName The name of the managed application.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    applicationName: string,
    options?: ApplicationsUpdateOptionalParams
  ): Promise<ApplicationsUpdateResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      applicationName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      updateOperationSpec
    ) as Promise<ApplicationsUpdateResponse>;
  }

  /**
   * Gets all the applications within a resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<ApplicationsListByResourceGroupResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByResourceGroupOperationSpec
    ) as Promise<ApplicationsListByResourceGroupResponse>;
  }

  /**
   * Gets all the applications within a subscription.
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: coreHttp.OperationOptions
  ): Promise<ApplicationsListBySubscriptionResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listBySubscriptionOperationSpec
    ) as Promise<ApplicationsListBySubscriptionResponse>;
  }

  /**
   * Gets the managed application.
   * @param applicationId The fully qualified ID of the managed application, including the managed
   *                      application name and the managed application resource type. Use the format,
   *                      /subscriptions/{guid}/resourceGroups/{resource-group-name}/Microsoft.Solutions/applications/{application-name}
   * @param options The options parameters.
   */
  getById(
    applicationId: string,
    options?: coreHttp.OperationOptions
  ): Promise<ApplicationsGetByIdResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      applicationId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getByIdOperationSpec
    ) as Promise<ApplicationsGetByIdResponse>;
  }

  /**
   * Deletes the managed application.
   * @param applicationId The fully qualified ID of the managed application, including the managed
   *                      application name and the managed application resource type. Use the format,
   *                      /subscriptions/{guid}/resourceGroups/{resource-group-name}/Microsoft.Solutions/applications/{application-name}
   * @param options The options parameters.
   */
  async deleteById(
    applicationId: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      applicationId,
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
      deleteByIdOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteByIdOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Creates a new managed application.
   * @param applicationId The fully qualified ID of the managed application, including the managed
   *                      application name and the managed application resource type. Use the format,
   *                      /subscriptions/{guid}/resourceGroups/{resource-group-name}/Microsoft.Solutions/applications/{application-name}
   * @param parameters Parameters supplied to the create or update a managed application.
   * @param options The options parameters.
   */
  async createOrUpdateById(
    applicationId: string,
    parameters: Application,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<ApplicationsCreateOrUpdateByIdResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      applicationId,
      parameters,
      options: this.getOperationOptions(options, "undefined")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) => {
      return this.client.sendOperationRequest(args, spec) as Promise<
        ApplicationsCreateOrUpdateByIdResponse
      >;
    };

    const initialOperationResult = await sendOperation(
      operationArguments,
      createOrUpdateByIdOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: createOrUpdateByIdOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Updates an existing managed application. The only value that can be updated via PATCH currently is
   * the tags.
   * @param applicationId The fully qualified ID of the managed application, including the managed
   *                      application name and the managed application resource type. Use the format,
   *                      /subscriptions/{guid}/resourceGroups/{resource-group-name}/Microsoft.Solutions/applications/{application-name}
   * @param options The options parameters.
   */
  updateById(
    applicationId: string,
    options?: ApplicationsUpdateByIdOptionalParams
  ): Promise<ApplicationsUpdateByIdResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      applicationId,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      updateByIdOperationSpec
    ) as Promise<ApplicationsUpdateByIdResponse>;
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  private _listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<ApplicationsListByResourceGroupNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listByResourceGroupNextOperationSpec
    ) as Promise<ApplicationsListByResourceGroupNextResponse>;
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<ApplicationsListBySubscriptionNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listBySubscriptionNextOperationSpec
    ) as Promise<ApplicationsListBySubscriptionNextResponse>;
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

const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications/{applicationName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Application
    },
    404: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.applicationName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications/{applicationName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.applicationName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications/{applicationName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Application
    },
    201: {
      bodyMapper: Mappers.Application
    },
    202: {
      bodyMapper: Mappers.Application
    },
    204: {
      bodyMapper: Mappers.Application
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.applicationName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications/{applicationName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.Application
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.applicationName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listByResourceGroupOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Solutions/applications",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApplicationListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listBySubscriptionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Solutions/applications",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApplicationListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const getByIdOperationSpec: coreHttp.OperationSpec = {
  path: "/{applicationId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Application
    },
    404: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.applicationId],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteByIdOperationSpec: coreHttp.OperationSpec = {
  path: "/{applicationId}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.applicationId],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateByIdOperationSpec: coreHttp.OperationSpec = {
  path: "/{applicationId}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Application
    },
    201: {
      bodyMapper: Mappers.Application
    },
    202: {
      bodyMapper: Mappers.Application
    },
    204: {
      bodyMapper: Mappers.Application
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.applicationId],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const updateByIdOperationSpec: coreHttp.OperationSpec = {
  path: "/{applicationId}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.Application
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.applicationId],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listByResourceGroupNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApplicationListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listBySubscriptionNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApplicationListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
