/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ManagementLocks } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ManagementLockClient } from "../managementLockClient";
import {
  ManagementLockObject,
  ManagementLocksListAtResourceGroupLevelNextOptionalParams,
  ManagementLocksListAtResourceGroupLevelOptionalParams,
  ManagementLocksListAtResourceLevelNextOptionalParams,
  ManagementLocksListAtResourceLevelOptionalParams,
  ManagementLocksListAtSubscriptionLevelNextOptionalParams,
  ManagementLocksListAtSubscriptionLevelOptionalParams,
  ManagementLocksListByScopeNextOptionalParams,
  ManagementLocksListByScopeOptionalParams,
  ManagementLocksCreateOrUpdateAtResourceGroupLevelOptionalParams,
  ManagementLocksCreateOrUpdateAtResourceGroupLevelResponse,
  ManagementLocksDeleteAtResourceGroupLevelOptionalParams,
  ManagementLocksGetAtResourceGroupLevelOptionalParams,
  ManagementLocksGetAtResourceGroupLevelResponse,
  ManagementLocksCreateOrUpdateByScopeOptionalParams,
  ManagementLocksCreateOrUpdateByScopeResponse,
  ManagementLocksDeleteByScopeOptionalParams,
  ManagementLocksGetByScopeOptionalParams,
  ManagementLocksGetByScopeResponse,
  ManagementLocksCreateOrUpdateAtResourceLevelOptionalParams,
  ManagementLocksCreateOrUpdateAtResourceLevelResponse,
  ManagementLocksDeleteAtResourceLevelOptionalParams,
  ManagementLocksGetAtResourceLevelOptionalParams,
  ManagementLocksGetAtResourceLevelResponse,
  ManagementLocksCreateOrUpdateAtSubscriptionLevelOptionalParams,
  ManagementLocksCreateOrUpdateAtSubscriptionLevelResponse,
  ManagementLocksDeleteAtSubscriptionLevelOptionalParams,
  ManagementLocksGetAtSubscriptionLevelOptionalParams,
  ManagementLocksGetAtSubscriptionLevelResponse,
  ManagementLocksListAtResourceGroupLevelResponse,
  ManagementLocksListAtResourceLevelResponse,
  ManagementLocksListAtSubscriptionLevelResponse,
  ManagementLocksListByScopeResponse,
  ManagementLocksListAtResourceGroupLevelNextResponse,
  ManagementLocksListAtResourceLevelNextResponse,
  ManagementLocksListAtSubscriptionLevelNextResponse,
  ManagementLocksListByScopeNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing ManagementLocks operations. */
export class ManagementLocksImpl implements ManagementLocks {
  private readonly client: ManagementLockClient;

  /**
   * Initialize a new instance of the class ManagementLocks class.
   * @param client Reference to the service client
   */
  constructor(client: ManagementLockClient) {
    this.client = client;
  }

  /**
   * Gets all the management locks for a resource group.
   * @param resourceGroupName The name of the resource group containing the locks to get.
   * @param options The options parameters.
   */
  public listAtResourceGroupLevel(
    resourceGroupName: string,
    options?: ManagementLocksListAtResourceGroupLevelOptionalParams
  ): PagedAsyncIterableIterator<ManagementLockObject> {
    const iter = this.listAtResourceGroupLevelPagingAll(
      resourceGroupName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listAtResourceGroupLevelPagingPage(
          resourceGroupName,
          options
        );
      }
    };
  }

  private async *listAtResourceGroupLevelPagingPage(
    resourceGroupName: string,
    options?: ManagementLocksListAtResourceGroupLevelOptionalParams
  ): AsyncIterableIterator<ManagementLockObject[]> {
    let result = await this._listAtResourceGroupLevel(
      resourceGroupName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listAtResourceGroupLevelNext(
        resourceGroupName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listAtResourceGroupLevelPagingAll(
    resourceGroupName: string,
    options?: ManagementLocksListAtResourceGroupLevelOptionalParams
  ): AsyncIterableIterator<ManagementLockObject> {
    for await (const page of this.listAtResourceGroupLevelPagingPage(
      resourceGroupName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets all the management locks for a resource or any level below resource.
   * @param resourceGroupName The name of the resource group containing the locked resource. The name is
   *                          case insensitive.
   * @param resourceProviderNamespace The namespace of the resource provider.
   * @param parentResourcePath The parent resource identity.
   * @param resourceType The resource type of the locked resource.
   * @param resourceName The name of the locked resource.
   * @param options The options parameters.
   */
  public listAtResourceLevel(
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    options?: ManagementLocksListAtResourceLevelOptionalParams
  ): PagedAsyncIterableIterator<ManagementLockObject> {
    const iter = this.listAtResourceLevelPagingAll(
      resourceGroupName,
      resourceProviderNamespace,
      parentResourcePath,
      resourceType,
      resourceName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listAtResourceLevelPagingPage(
          resourceGroupName,
          resourceProviderNamespace,
          parentResourcePath,
          resourceType,
          resourceName,
          options
        );
      }
    };
  }

  private async *listAtResourceLevelPagingPage(
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    options?: ManagementLocksListAtResourceLevelOptionalParams
  ): AsyncIterableIterator<ManagementLockObject[]> {
    let result = await this._listAtResourceLevel(
      resourceGroupName,
      resourceProviderNamespace,
      parentResourcePath,
      resourceType,
      resourceName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listAtResourceLevelNext(
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listAtResourceLevelPagingAll(
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    options?: ManagementLocksListAtResourceLevelOptionalParams
  ): AsyncIterableIterator<ManagementLockObject> {
    for await (const page of this.listAtResourceLevelPagingPage(
      resourceGroupName,
      resourceProviderNamespace,
      parentResourcePath,
      resourceType,
      resourceName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Gets all the management locks for a subscription.
   * @param options The options parameters.
   */
  public listAtSubscriptionLevel(
    options?: ManagementLocksListAtSubscriptionLevelOptionalParams
  ): PagedAsyncIterableIterator<ManagementLockObject> {
    const iter = this.listAtSubscriptionLevelPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listAtSubscriptionLevelPagingPage(options);
      }
    };
  }

  private async *listAtSubscriptionLevelPagingPage(
    options?: ManagementLocksListAtSubscriptionLevelOptionalParams
  ): AsyncIterableIterator<ManagementLockObject[]> {
    let result = await this._listAtSubscriptionLevel(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listAtSubscriptionLevelNext(
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listAtSubscriptionLevelPagingAll(
    options?: ManagementLocksListAtSubscriptionLevelOptionalParams
  ): AsyncIterableIterator<ManagementLockObject> {
    for await (const page of this.listAtSubscriptionLevelPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Gets all the management locks for a scope.
   * @param scope The scope for the lock. When providing a scope for the assignment, use
   *              '/subscriptions/{subscriptionId}' for subscriptions,
   *              '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}' for resource groups, and
   *              '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePathIfPresent}/{resourceType}/{resourceName}'
   *              for resources.
   * @param options The options parameters.
   */
  public listByScope(
    scope: string,
    options?: ManagementLocksListByScopeOptionalParams
  ): PagedAsyncIterableIterator<ManagementLockObject> {
    const iter = this.listByScopePagingAll(scope, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listByScopePagingPage(scope, options);
      }
    };
  }

  private async *listByScopePagingPage(
    scope: string,
    options?: ManagementLocksListByScopeOptionalParams
  ): AsyncIterableIterator<ManagementLockObject[]> {
    let result = await this._listByScope(scope, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByScopeNext(scope, continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByScopePagingAll(
    scope: string,
    options?: ManagementLocksListByScopeOptionalParams
  ): AsyncIterableIterator<ManagementLockObject> {
    for await (const page of this.listByScopePagingPage(scope, options)) {
      yield* page;
    }
  }

  /**
   * When you apply a lock at a parent scope, all child resources inherit the same lock. To create
   * management locks, you must have access to Microsoft.Authorization/* or
   * Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access
   * Administrator are granted those actions.
   * @param resourceGroupName The name of the resource group to lock.
   * @param lockName The lock name. The lock name can be a maximum of 260 characters. It cannot contain
   *                 <, > %, &, :, \, ?, /, or any control characters.
   * @param parameters The management lock parameters.
   * @param options The options parameters.
   */
  createOrUpdateAtResourceGroupLevel(
    resourceGroupName: string,
    lockName: string,
    parameters: ManagementLockObject,
    options?: ManagementLocksCreateOrUpdateAtResourceGroupLevelOptionalParams
  ): Promise<ManagementLocksCreateOrUpdateAtResourceGroupLevelResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, lockName, parameters, options },
      createOrUpdateAtResourceGroupLevelOperationSpec
    );
  }

  /**
   * To delete management locks, you must have access to Microsoft.Authorization/* or
   * Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access
   * Administrator are granted those actions.
   * @param resourceGroupName The name of the resource group containing the lock.
   * @param lockName The name of lock to delete.
   * @param options The options parameters.
   */
  deleteAtResourceGroupLevel(
    resourceGroupName: string,
    lockName: string,
    options?: ManagementLocksDeleteAtResourceGroupLevelOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, lockName, options },
      deleteAtResourceGroupLevelOperationSpec
    );
  }

  /**
   * Gets a management lock at the resource group level.
   * @param resourceGroupName The name of the locked resource group.
   * @param lockName The name of the lock to get.
   * @param options The options parameters.
   */
  getAtResourceGroupLevel(
    resourceGroupName: string,
    lockName: string,
    options?: ManagementLocksGetAtResourceGroupLevelOptionalParams
  ): Promise<ManagementLocksGetAtResourceGroupLevelResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, lockName, options },
      getAtResourceGroupLevelOperationSpec
    );
  }

  /**
   * Create or update a management lock by scope.
   * @param scope The scope for the lock. When providing a scope for the assignment, use
   *              '/subscriptions/{subscriptionId}' for subscriptions,
   *              '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}' for resource groups, and
   *              '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePathIfPresent}/{resourceType}/{resourceName}'
   *              for resources.
   * @param lockName The name of lock.
   * @param parameters Create or update management lock parameters.
   * @param options The options parameters.
   */
  createOrUpdateByScope(
    scope: string,
    lockName: string,
    parameters: ManagementLockObject,
    options?: ManagementLocksCreateOrUpdateByScopeOptionalParams
  ): Promise<ManagementLocksCreateOrUpdateByScopeResponse> {
    return this.client.sendOperationRequest(
      { scope, lockName, parameters, options },
      createOrUpdateByScopeOperationSpec
    );
  }

  /**
   * Delete a management lock by scope.
   * @param scope The scope for the lock.
   * @param lockName The name of lock.
   * @param options The options parameters.
   */
  deleteByScope(
    scope: string,
    lockName: string,
    options?: ManagementLocksDeleteByScopeOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { scope, lockName, options },
      deleteByScopeOperationSpec
    );
  }

  /**
   * Get a management lock by scope.
   * @param scope The scope for the lock.
   * @param lockName The name of lock.
   * @param options The options parameters.
   */
  getByScope(
    scope: string,
    lockName: string,
    options?: ManagementLocksGetByScopeOptionalParams
  ): Promise<ManagementLocksGetByScopeResponse> {
    return this.client.sendOperationRequest(
      { scope, lockName, options },
      getByScopeOperationSpec
    );
  }

  /**
   * When you apply a lock at a parent scope, all child resources inherit the same lock. To create
   * management locks, you must have access to Microsoft.Authorization/* or
   * Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access
   * Administrator are granted those actions.
   * @param resourceGroupName The name of the resource group containing the resource to lock.
   * @param resourceProviderNamespace The resource provider namespace of the resource to lock.
   * @param parentResourcePath The parent resource identity.
   * @param resourceType The resource type of the resource to lock.
   * @param resourceName The name of the resource to lock.
   * @param lockName The name of lock. The lock name can be a maximum of 260 characters. It cannot
   *                 contain <, > %, &, :, \, ?, /, or any control characters.
   * @param parameters Parameters for creating or updating a  management lock.
   * @param options The options parameters.
   */
  createOrUpdateAtResourceLevel(
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    lockName: string,
    parameters: ManagementLockObject,
    options?: ManagementLocksCreateOrUpdateAtResourceLevelOptionalParams
  ): Promise<ManagementLocksCreateOrUpdateAtResourceLevelResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        lockName,
        parameters,
        options
      },
      createOrUpdateAtResourceLevelOperationSpec
    );
  }

  /**
   * To delete management locks, you must have access to Microsoft.Authorization/* or
   * Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access
   * Administrator are granted those actions.
   * @param resourceGroupName The name of the resource group containing the resource with the lock to
   *                          delete.
   * @param resourceProviderNamespace The resource provider namespace of the resource with the lock to
   *                                  delete.
   * @param parentResourcePath The parent resource identity.
   * @param resourceType The resource type of the resource with the lock to delete.
   * @param resourceName The name of the resource with the lock to delete.
   * @param lockName The name of the lock to delete.
   * @param options The options parameters.
   */
  deleteAtResourceLevel(
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    lockName: string,
    options?: ManagementLocksDeleteAtResourceLevelOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        lockName,
        options
      },
      deleteAtResourceLevelOperationSpec
    );
  }

  /**
   * Get the management lock of a resource or any level below resource.
   * @param resourceGroupName The name of the resource group.
   * @param resourceProviderNamespace The namespace of the resource provider.
   * @param parentResourcePath An extra path parameter needed in some services, like SQL Databases.
   * @param resourceType The type of the resource.
   * @param resourceName The name of the resource.
   * @param lockName The name of lock.
   * @param options The options parameters.
   */
  getAtResourceLevel(
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    lockName: string,
    options?: ManagementLocksGetAtResourceLevelOptionalParams
  ): Promise<ManagementLocksGetAtResourceLevelResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        lockName,
        options
      },
      getAtResourceLevelOperationSpec
    );
  }

  /**
   * When you apply a lock at a parent scope, all child resources inherit the same lock. To create
   * management locks, you must have access to Microsoft.Authorization/* or
   * Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access
   * Administrator are granted those actions.
   * @param lockName The name of lock. The lock name can be a maximum of 260 characters. It cannot
   *                 contain <, > %, &, :, \, ?, /, or any control characters.
   * @param parameters The management lock parameters.
   * @param options The options parameters.
   */
  createOrUpdateAtSubscriptionLevel(
    lockName: string,
    parameters: ManagementLockObject,
    options?: ManagementLocksCreateOrUpdateAtSubscriptionLevelOptionalParams
  ): Promise<ManagementLocksCreateOrUpdateAtSubscriptionLevelResponse> {
    return this.client.sendOperationRequest(
      { lockName, parameters, options },
      createOrUpdateAtSubscriptionLevelOperationSpec
    );
  }

  /**
   * To delete management locks, you must have access to Microsoft.Authorization/* or
   * Microsoft.Authorization/locks/* actions. Of the built-in roles, only Owner and User Access
   * Administrator are granted those actions.
   * @param lockName The name of lock to delete.
   * @param options The options parameters.
   */
  deleteAtSubscriptionLevel(
    lockName: string,
    options?: ManagementLocksDeleteAtSubscriptionLevelOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { lockName, options },
      deleteAtSubscriptionLevelOperationSpec
    );
  }

  /**
   * Gets a management lock at the subscription level.
   * @param lockName The name of the lock to get.
   * @param options The options parameters.
   */
  getAtSubscriptionLevel(
    lockName: string,
    options?: ManagementLocksGetAtSubscriptionLevelOptionalParams
  ): Promise<ManagementLocksGetAtSubscriptionLevelResponse> {
    return this.client.sendOperationRequest(
      { lockName, options },
      getAtSubscriptionLevelOperationSpec
    );
  }

  /**
   * Gets all the management locks for a resource group.
   * @param resourceGroupName The name of the resource group containing the locks to get.
   * @param options The options parameters.
   */
  private _listAtResourceGroupLevel(
    resourceGroupName: string,
    options?: ManagementLocksListAtResourceGroupLevelOptionalParams
  ): Promise<ManagementLocksListAtResourceGroupLevelResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listAtResourceGroupLevelOperationSpec
    );
  }

  /**
   * Gets all the management locks for a resource or any level below resource.
   * @param resourceGroupName The name of the resource group containing the locked resource. The name is
   *                          case insensitive.
   * @param resourceProviderNamespace The namespace of the resource provider.
   * @param parentResourcePath The parent resource identity.
   * @param resourceType The resource type of the locked resource.
   * @param resourceName The name of the locked resource.
   * @param options The options parameters.
   */
  private _listAtResourceLevel(
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    options?: ManagementLocksListAtResourceLevelOptionalParams
  ): Promise<ManagementLocksListAtResourceLevelResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        options
      },
      listAtResourceLevelOperationSpec
    );
  }

  /**
   * Gets all the management locks for a subscription.
   * @param options The options parameters.
   */
  private _listAtSubscriptionLevel(
    options?: ManagementLocksListAtSubscriptionLevelOptionalParams
  ): Promise<ManagementLocksListAtSubscriptionLevelResponse> {
    return this.client.sendOperationRequest(
      { options },
      listAtSubscriptionLevelOperationSpec
    );
  }

  /**
   * Gets all the management locks for a scope.
   * @param scope The scope for the lock. When providing a scope for the assignment, use
   *              '/subscriptions/{subscriptionId}' for subscriptions,
   *              '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}' for resource groups, and
   *              '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePathIfPresent}/{resourceType}/{resourceName}'
   *              for resources.
   * @param options The options parameters.
   */
  private _listByScope(
    scope: string,
    options?: ManagementLocksListByScopeOptionalParams
  ): Promise<ManagementLocksListByScopeResponse> {
    return this.client.sendOperationRequest(
      { scope, options },
      listByScopeOperationSpec
    );
  }

  /**
   * ListAtResourceGroupLevelNext
   * @param resourceGroupName The name of the resource group containing the locks to get.
   * @param nextLink The nextLink from the previous successful call to the ListAtResourceGroupLevel
   *                 method.
   * @param options The options parameters.
   */
  private _listAtResourceGroupLevelNext(
    resourceGroupName: string,
    nextLink: string,
    options?: ManagementLocksListAtResourceGroupLevelNextOptionalParams
  ): Promise<ManagementLocksListAtResourceGroupLevelNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listAtResourceGroupLevelNextOperationSpec
    );
  }

  /**
   * ListAtResourceLevelNext
   * @param resourceGroupName The name of the resource group containing the locked resource. The name is
   *                          case insensitive.
   * @param resourceProviderNamespace The namespace of the resource provider.
   * @param parentResourcePath The parent resource identity.
   * @param resourceType The resource type of the locked resource.
   * @param resourceName The name of the locked resource.
   * @param nextLink The nextLink from the previous successful call to the ListAtResourceLevel method.
   * @param options The options parameters.
   */
  private _listAtResourceLevelNext(
    resourceGroupName: string,
    resourceProviderNamespace: string,
    parentResourcePath: string,
    resourceType: string,
    resourceName: string,
    nextLink: string,
    options?: ManagementLocksListAtResourceLevelNextOptionalParams
  ): Promise<ManagementLocksListAtResourceLevelNextResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        nextLink,
        options
      },
      listAtResourceLevelNextOperationSpec
    );
  }

  /**
   * ListAtSubscriptionLevelNext
   * @param nextLink The nextLink from the previous successful call to the ListAtSubscriptionLevel
   *                 method.
   * @param options The options parameters.
   */
  private _listAtSubscriptionLevelNext(
    nextLink: string,
    options?: ManagementLocksListAtSubscriptionLevelNextOptionalParams
  ): Promise<ManagementLocksListAtSubscriptionLevelNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listAtSubscriptionLevelNextOperationSpec
    );
  }

  /**
   * ListByScopeNext
   * @param scope The scope for the lock. When providing a scope for the assignment, use
   *              '/subscriptions/{subscriptionId}' for subscriptions,
   *              '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}' for resource groups, and
   *              '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePathIfPresent}/{resourceType}/{resourceName}'
   *              for resources.
   * @param nextLink The nextLink from the previous successful call to the ListByScope method.
   * @param options The options parameters.
   */
  private _listByScopeNext(
    scope: string,
    nextLink: string,
    options?: ManagementLocksListByScopeNextOptionalParams
  ): Promise<ManagementLocksListByScopeNextResponse> {
    return this.client.sendOperationRequest(
      { scope, nextLink, options },
      listByScopeNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const createOrUpdateAtResourceGroupLevelOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/locks/{lockName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ManagementLockObject
    },
    201: {
      bodyMapper: Mappers.ManagementLockObject
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.lockName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteAtResourceGroupLevelOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/locks/{lockName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.lockName,
    Parameters.subscriptionId
  ],
  serializer
};
const getAtResourceGroupLevelOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/locks/{lockName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagementLockObject
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.lockName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateByScopeOperationSpec: coreClient.OperationSpec = {
  path: "/{scope}/providers/Microsoft.Authorization/locks/{lockName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ManagementLockObject
    },
    201: {
      bodyMapper: Mappers.ManagementLockObject
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.lockName, Parameters.scope],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteByScopeOperationSpec: coreClient.OperationSpec = {
  path: "/{scope}/providers/Microsoft.Authorization/locks/{lockName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.lockName, Parameters.scope],
  serializer
};
const getByScopeOperationSpec: coreClient.OperationSpec = {
  path: "/{scope}/providers/Microsoft.Authorization/locks/{lockName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagementLockObject
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.lockName, Parameters.scope],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateAtResourceLevelOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePath}/{resourceType}/{resourceName}/providers/Microsoft.Authorization/locks/{lockName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ManagementLockObject
    },
    201: {
      bodyMapper: Mappers.ManagementLockObject
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.lockName,
    Parameters.subscriptionId,
    Parameters.resourceProviderNamespace,
    Parameters.parentResourcePath,
    Parameters.resourceType,
    Parameters.resourceName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteAtResourceLevelOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePath}/{resourceType}/{resourceName}/providers/Microsoft.Authorization/locks/{lockName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.lockName,
    Parameters.subscriptionId,
    Parameters.resourceProviderNamespace,
    Parameters.parentResourcePath,
    Parameters.resourceType,
    Parameters.resourceName
  ],
  serializer
};
const getAtResourceLevelOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePath}/{resourceType}/{resourceName}/providers/Microsoft.Authorization/locks/{lockName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagementLockObject
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.lockName,
    Parameters.subscriptionId,
    Parameters.resourceProviderNamespace,
    Parameters.parentResourcePath,
    Parameters.resourceType,
    Parameters.resourceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateAtSubscriptionLevelOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/locks/{lockName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ManagementLockObject
    },
    201: {
      bodyMapper: Mappers.ManagementLockObject
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.lockName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteAtSubscriptionLevelOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/locks/{lockName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.lockName,
    Parameters.subscriptionId
  ],
  serializer
};
const getAtSubscriptionLevelOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/locks/{lockName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagementLockObject
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.lockName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listAtResourceGroupLevelOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/locks",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagementLockListResult
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listAtResourceLevelOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{parentResourcePath}/{resourceType}/{resourceName}/providers/Microsoft.Authorization/locks",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagementLockListResult
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceProviderNamespace,
    Parameters.parentResourcePath,
    Parameters.resourceType,
    Parameters.resourceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listAtSubscriptionLevelOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/locks",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagementLockListResult
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listByScopeOperationSpec: coreClient.OperationSpec = {
  path: "/{scope}/providers/Microsoft.Authorization/locks",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagementLockListResult
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [Parameters.$host, Parameters.scope],
  headerParameters: [Parameters.accept],
  serializer
};
const listAtResourceGroupLevelNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagementLockListResult
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.resourceGroupName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listAtResourceLevelNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagementLockListResult
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.resourceProviderNamespace,
    Parameters.parentResourcePath,
    Parameters.resourceType,
    Parameters.resourceName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listAtSubscriptionLevelNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagementLockListResult
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByScopeNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagementLockListResult
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter],
  urlParameters: [Parameters.$host, Parameters.nextLink, Parameters.scope],
  headerParameters: [Parameters.accept],
  serializer
};