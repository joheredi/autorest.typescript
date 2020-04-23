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
import { NotificationHubsManagementClient } from "../notificationHubsManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  CheckAvailabilityParameters,
  NamespacesCheckAvailabilityResponse,
  NamespaceCreateOrUpdateParameters,
  NamespacesCreateOrUpdateResponse,
  NamespacePatchParameters,
  NamespacesPatchResponse,
  NamespacesGetResponse,
  SharedAccessAuthorizationRuleCreateOrUpdateParameters,
  NamespacesCreateOrUpdateAuthorizationRuleResponse,
  NamespacesGetAuthorizationRuleResponse,
  NamespacesListResponse,
  NamespacesListAllResponse,
  NamespacesListAuthorizationRulesResponse,
  NamespacesListKeysResponse,
  PolicykeyResource,
  NamespacesRegenerateKeysResponse,
  NamespacesListNextResponse,
  NamespacesListAllNextResponse,
  NamespacesListAuthorizationRulesNextResponse
} from "../models";

/**
 * Class representing a Namespaces.
 */
export class Namespaces {
  private readonly client: NotificationHubsManagementClient;

  /**
   * Initialize a new instance of the class Namespaces class.
   * @param client Reference to the service client
   */
  constructor(client: NotificationHubsManagementClient) {
    this.client = client;
  }

  /**
   * Checks the availability of the given service namespace across all Azure subscriptions. This is
   * useful because the domain name is created based on the service namespace name.
   * @param parameters The namespace name.
   * @param options The options parameters.
   */
  checkAvailability(
    parameters: CheckAvailabilityParameters,
    options?: coreHttp.OperationOptions
  ): Promise<NamespacesCheckAvailabilityResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { parameters, options: operationOptions },
      checkAvailabilityOperationSpec
    ) as Promise<NamespacesCheckAvailabilityResponse>;
  }

  /**
   * Creates/Updates a service namespace. Once created, this namespace's resource manifest is immutable.
   * This operation is idempotent.
   * @param parameters Parameters supplied to create a Namespace Resource.
   * @param resourceGroupName The name of the resource group.
   * @param namespaceName The namespace name.
   * @param options The options parameters.
   */
  createOrUpdate(
    parameters: NamespaceCreateOrUpdateParameters,
    resourceGroupName: string,
    namespaceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<NamespacesCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        parameters,
        resourceGroupName,
        namespaceName,
        options: operationOptions
      },
      createOrUpdateOperationSpec
    ) as Promise<NamespacesCreateOrUpdateResponse>;
  }

  /**
   * Patches the existing namespace
   * @param resourceGroupName The name of the resource group.
   * @param namespaceName The namespace name.
   * @param parameters Parameters supplied to patch a Namespace Resource.
   * @param options The options parameters.
   */
  patch(
    resourceGroupName: string,
    namespaceName: string,
    parameters: NamespacePatchParameters,
    options?: coreHttp.OperationOptions
  ): Promise<NamespacesPatchResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        namespaceName,
        parameters,
        options: operationOptions
      },
      patchOperationSpec
    ) as Promise<NamespacesPatchResponse>;
  }

  /**
   * Deletes an existing namespace. This operation also removes all associated notificationHubs under the
   * namespace.
   * @param resourceGroupName The name of the resource group.
   * @param namespaceName The namespace name.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    namespaceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      namespaceName,
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

  /**
   * Returns the description for the specified namespace.
   * @param resourceGroupName The name of the resource group.
   * @param namespaceName The namespace name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    namespaceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<NamespacesGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, namespaceName, options: operationOptions },
      getOperationSpec
    ) as Promise<NamespacesGetResponse>;
  }

  /**
   * Creates an authorization rule for a namespace
   * @param resourceGroupName The name of the resource group.
   * @param namespaceName The namespace name.
   * @param parameters The shared access authorization rule.
   * @param authorizationRuleName Authorization Rule Name.
   * @param options The options parameters.
   */
  createOrUpdateAuthorizationRule(
    resourceGroupName: string,
    namespaceName: string,
    parameters: SharedAccessAuthorizationRuleCreateOrUpdateParameters,
    authorizationRuleName: string,
    options?: coreHttp.OperationOptions
  ): Promise<NamespacesCreateOrUpdateAuthorizationRuleResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        namespaceName,
        parameters,
        authorizationRuleName,
        options: operationOptions
      },
      createOrUpdateAuthorizationRuleOperationSpec
    ) as Promise<NamespacesCreateOrUpdateAuthorizationRuleResponse>;
  }

  /**
   * Deletes a namespace authorization rule
   * @param resourceGroupName The name of the resource group.
   * @param namespaceName The namespace name.
   * @param authorizationRuleName Authorization Rule Name.
   * @param options The options parameters.
   */
  deleteAuthorizationRule(
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        namespaceName,
        authorizationRuleName,
        options: operationOptions
      },
      deleteAuthorizationRuleOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Gets an authorization rule for a namespace by name.
   * @param resourceGroupName The name of the resource group.
   * @param namespaceName The namespace name
   * @param authorizationRuleName Authorization rule name.
   * @param options The options parameters.
   */
  getAuthorizationRule(
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    options?: coreHttp.OperationOptions
  ): Promise<NamespacesGetAuthorizationRuleResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        namespaceName,
        authorizationRuleName,
        options: operationOptions
      },
      getAuthorizationRuleOperationSpec
    ) as Promise<NamespacesGetAuthorizationRuleResponse>;
  }

  /**
   * Lists the available namespaces within a resourceGroup.
   * @param resourceGroupName The name of the resource group. If resourceGroupName value is null the
   *                          method lists all the namespaces within subscription
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<NamespacesListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, options: operationOptions },
      listOperationSpec
    ) as Promise<NamespacesListResponse>;
  }

  /**
   * Lists all the available namespaces within the subscription irrespective of the resourceGroups.
   * @param options The options parameters.
   */
  listAll(
    options?: coreHttp.OperationOptions
  ): Promise<NamespacesListAllResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listAllOperationSpec
    ) as Promise<NamespacesListAllResponse>;
  }

  /**
   * Gets the authorization rules for a namespace.
   * @param resourceGroupName The name of the resource group.
   * @param namespaceName The namespace name
   * @param options The options parameters.
   */
  listAuthorizationRules(
    resourceGroupName: string,
    namespaceName: string,
    options?: coreHttp.OperationOptions
  ): Promise<NamespacesListAuthorizationRulesResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, namespaceName, options: operationOptions },
      listAuthorizationRulesOperationSpec
    ) as Promise<NamespacesListAuthorizationRulesResponse>;
  }

  /**
   * Gets the Primary and Secondary ConnectionStrings to the namespace
   * @param resourceGroupName The name of the resource group.
   * @param namespaceName The namespace name.
   * @param authorizationRuleName The connection string of the namespace for the specified
   *                              authorizationRule.
   * @param options The options parameters.
   */
  listKeys(
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    options?: coreHttp.OperationOptions
  ): Promise<NamespacesListKeysResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        namespaceName,
        authorizationRuleName,
        options: operationOptions
      },
      listKeysOperationSpec
    ) as Promise<NamespacesListKeysResponse>;
  }

  /**
   * Regenerates the Primary/Secondary Keys to the Namespace Authorization Rule
   * @param resourceGroupName The name of the resource group.
   * @param namespaceName The namespace name.
   * @param authorizationRuleName The connection string of the namespace for the specified
   *                              authorizationRule.
   * @param parameters Parameters supplied to regenerate the Namespace Authorization Rule Key.
   * @param options The options parameters.
   */
  regenerateKeys(
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    parameters: PolicykeyResource,
    options?: coreHttp.OperationOptions
  ): Promise<NamespacesRegenerateKeysResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        namespaceName,
        authorizationRuleName,
        parameters,
        options: operationOptions
      },
      regenerateKeysOperationSpec
    ) as Promise<NamespacesRegenerateKeysResponse>;
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param resourceGroupName The name of the resource group. If resourceGroupName value is null the
   *                          method lists all the namespaces within subscription
   * @param options The options parameters.
   */
  listNext(
    nextLink: string,
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): Promise<NamespacesListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, resourceGroupName, options: operationOptions },
      listNextOperationSpec
    ) as Promise<NamespacesListNextResponse>;
  }

  /**
   * ListAllNext
   * @param nextLink The nextLink from the previous successful call to the ListAll method.
   * @param options The options parameters.
   */
  listAllNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<NamespacesListAllNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listAllNextOperationSpec
    ) as Promise<NamespacesListAllNextResponse>;
  }

  /**
   * ListAuthorizationRulesNext
   * @param resourceGroupName The name of the resource group.
   * @param namespaceName The namespace name
   * @param nextLink The nextLink from the previous successful call to the ListAuthorizationRules method.
   * @param options The options parameters.
   */
  listAuthorizationRulesNext(
    resourceGroupName: string,
    namespaceName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<NamespacesListAuthorizationRulesNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, namespaceName, nextLink, options: operationOptions },
      listAuthorizationRulesNextOperationSpec
    ) as Promise<NamespacesListAuthorizationRulesNextResponse>;
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

const checkAvailabilityOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.NotificationHubs/checkNamespaceAvailability",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.CheckAvailabilityResult
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.contentType],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.NamespaceResource
    }
  },
  requestBody: Parameters.parameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const patchOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.NamespaceResource
    }
  },
  requestBody: Parameters.parameters2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NamespaceResource
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName
  ],
  serializer
};
const createOrUpdateAuthorizationRuleOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/AuthorizationRules/{authorizationRuleName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.SharedAccessAuthorizationRuleResource
    }
  },
  requestBody: Parameters.parameters3,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName,
    Parameters.authorizationRuleName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteAuthorizationRuleOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/AuthorizationRules/{authorizationRuleName}",
  httpMethod: "DELETE",
  responses: { 200: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName,
    Parameters.authorizationRuleName
  ],
  serializer
};
const getAuthorizationRuleOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/AuthorizationRules/{authorizationRuleName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SharedAccessAuthorizationRuleResource
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName1,
    Parameters.authorizationRuleName1
  ],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NamespaceListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName1
  ],
  serializer
};
const listAllOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.NotificationHubs/namespaces",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NamespaceListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  serializer
};
const listAuthorizationRulesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/AuthorizationRules",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SharedAccessAuthorizationRuleListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName1
  ],
  serializer
};
const listKeysOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/AuthorizationRules/{authorizationRuleName}/listKeys",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SharedAccessAuthorizationRuleListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName,
    Parameters.authorizationRuleName2
  ],
  serializer
};
const regenerateKeysOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NotificationHubs/namespaces/{namespaceName}/AuthorizationRules/{authorizationRuleName}/regenerateKeys",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ResourceListKeys
    }
  },
  requestBody: Parameters.parameters4,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName,
    Parameters.authorizationRuleName2
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NamespaceListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName1
  ],
  serializer
};
const listAllNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NamespaceListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink1
  ],
  serializer
};
const listAuthorizationRulesNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SharedAccessAuthorizationRuleListResult
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName1,
    Parameters.nextLink2
  ],
  serializer
};
