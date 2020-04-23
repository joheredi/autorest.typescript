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
import { EventHubManagementClient } from "../eventHubManagementClient";
import {
  EventHubsListByNamespaceOptionalParams,
  EventHubsListByNamespaceResponse,
  Eventhub,
  EventHubsCreateOrUpdateResponse,
  EventHubsGetResponse,
  EventHubsListAuthorizationRulesResponse,
  AuthorizationRule,
  EventHubsCreateOrUpdateAuthorizationRuleResponse,
  EventHubsGetAuthorizationRuleResponse,
  EventHubsListKeysResponse,
  RegenerateAccessKeyParameters,
  EventHubsRegenerateKeysResponse,
  EventHubsListByNamespaceNextOptionalParams,
  EventHubsListByNamespaceNextResponse,
  EventHubsListAuthorizationRulesNextResponse
} from "../models";

/**
 * Class representing a EventHubs.
 */
export class EventHubs {
  private readonly client: EventHubManagementClient;

  /**
   * Initialize a new instance of the class EventHubs class.
   * @param client Reference to the service client
   */
  constructor(client: EventHubManagementClient) {
    this.client = client;
  }

  /**
   * Gets all the Event Hubs in a Namespace.
   * @param resourceGroupName Name of the resource group within the azure subscription.
   * @param namespaceName The Namespace name
   * @param options The options parameters.
   */
  listByNamespace(
    resourceGroupName: string,
    namespaceName: string,
    options?: EventHubsListByNamespaceOptionalParams
  ): Promise<EventHubsListByNamespaceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, namespaceName, options: operationOptions },
      listByNamespaceOperationSpec
    ) as Promise<EventHubsListByNamespaceResponse>;
  }

  /**
   * Creates or updates a new Event Hub as a nested resource within a Namespace.
   * @param resourceGroupName Name of the resource group within the azure subscription.
   * @param namespaceName The Namespace name
   * @param parameters Parameters supplied to create an Event Hub resource.
   * @param eventHubName The Event Hub name
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    namespaceName: string,
    parameters: Eventhub,
    eventHubName: string,
    options?: coreHttp.OperationOptions
  ): Promise<EventHubsCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        namespaceName,
        parameters,
        eventHubName,
        options: operationOptions
      },
      createOrUpdateOperationSpec
    ) as Promise<EventHubsCreateOrUpdateResponse>;
  }

  /**
   * Deletes an Event Hub from the specified Namespace and resource group.
   * @param resourceGroupName Name of the resource group within the azure subscription.
   * @param namespaceName The Namespace name
   * @param eventHubName The Event Hub name
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        namespaceName,
        eventHubName,
        options: operationOptions
      },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Gets an Event Hubs description for the specified Event Hub.
   * @param resourceGroupName Name of the resource group within the azure subscription.
   * @param namespaceName The Namespace name
   * @param eventHubName The Event Hub name
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    options?: coreHttp.OperationOptions
  ): Promise<EventHubsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        namespaceName,
        eventHubName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<EventHubsGetResponse>;
  }

  /**
   * Gets the authorization rules for an Event Hub.
   * @param resourceGroupName Name of the resource group within the azure subscription.
   * @param namespaceName The Namespace name
   * @param eventHubName The Event Hub name
   * @param options The options parameters.
   */
  listAuthorizationRules(
    resourceGroupName: string,
    namespaceName: string,
    eventHubName: string,
    options?: coreHttp.OperationOptions
  ): Promise<EventHubsListAuthorizationRulesResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        namespaceName,
        eventHubName,
        options: operationOptions
      },
      listAuthorizationRulesOperationSpec
    ) as Promise<EventHubsListAuthorizationRulesResponse>;
  }

  /**
   * Creates or updates an AuthorizationRule for the specified Event Hub. Creation/update of the
   * AuthorizationRule will take a few seconds to take effect.
   * @param resourceGroupName Name of the resource group within the azure subscription.
   * @param namespaceName The Namespace name
   * @param parameters The shared access AuthorizationRule.
   * @param authorizationRuleName The authorization rule name.
   * @param eventHubName The Event Hub name
   * @param options The options parameters.
   */
  createOrUpdateAuthorizationRule(
    resourceGroupName: string,
    namespaceName: string,
    parameters: AuthorizationRule,
    authorizationRuleName: string,
    eventHubName: string,
    options?: coreHttp.OperationOptions
  ): Promise<EventHubsCreateOrUpdateAuthorizationRuleResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        namespaceName,
        parameters,
        authorizationRuleName,
        eventHubName,
        options: operationOptions
      },
      createOrUpdateAuthorizationRuleOperationSpec
    ) as Promise<EventHubsCreateOrUpdateAuthorizationRuleResponse>;
  }

  /**
   * Gets an AuthorizationRule for an Event Hub by rule name.
   * @param resourceGroupName Name of the resource group within the azure subscription.
   * @param namespaceName The Namespace name
   * @param authorizationRuleName The authorization rule name.
   * @param eventHubName The Event Hub name
   * @param options The options parameters.
   */
  getAuthorizationRule(
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    eventHubName: string,
    options?: coreHttp.OperationOptions
  ): Promise<EventHubsGetAuthorizationRuleResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        namespaceName,
        authorizationRuleName,
        eventHubName,
        options: operationOptions
      },
      getAuthorizationRuleOperationSpec
    ) as Promise<EventHubsGetAuthorizationRuleResponse>;
  }

  /**
   * Deletes an Event Hub AuthorizationRule.
   * @param resourceGroupName Name of the resource group within the azure subscription.
   * @param namespaceName The Namespace name
   * @param authorizationRuleName The authorization rule name.
   * @param eventHubName The Event Hub name
   * @param options The options parameters.
   */
  deleteAuthorizationRule(
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    eventHubName: string,
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
        eventHubName,
        options: operationOptions
      },
      deleteAuthorizationRuleOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Gets the ACS and SAS connection strings for the Event Hub.
   * @param resourceGroupName Name of the resource group within the azure subscription.
   * @param namespaceName The Namespace name
   * @param authorizationRuleName The authorization rule name.
   * @param eventHubName The Event Hub name
   * @param options The options parameters.
   */
  listKeys(
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    eventHubName: string,
    options?: coreHttp.OperationOptions
  ): Promise<EventHubsListKeysResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        namespaceName,
        authorizationRuleName,
        eventHubName,
        options: operationOptions
      },
      listKeysOperationSpec
    ) as Promise<EventHubsListKeysResponse>;
  }

  /**
   * Regenerates the ACS and SAS connection strings for the Event Hub.
   * @param resourceGroupName Name of the resource group within the azure subscription.
   * @param namespaceName The Namespace name
   * @param authorizationRuleName The authorization rule name.
   * @param eventHubName The Event Hub name
   * @param parameters Parameters supplied to regenerate the AuthorizationRule Keys
   *                   (PrimaryKey/SecondaryKey).
   * @param options The options parameters.
   */
  regenerateKeys(
    resourceGroupName: string,
    namespaceName: string,
    authorizationRuleName: string,
    eventHubName: string,
    parameters: RegenerateAccessKeyParameters,
    options?: coreHttp.OperationOptions
  ): Promise<EventHubsRegenerateKeysResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        namespaceName,
        authorizationRuleName,
        eventHubName,
        parameters,
        options: operationOptions
      },
      regenerateKeysOperationSpec
    ) as Promise<EventHubsRegenerateKeysResponse>;
  }

  /**
   * ListByNamespaceNext
   * @param resourceGroupName Name of the resource group within the azure subscription.
   * @param namespaceName The Namespace name
   * @param nextLink The nextLink from the previous successful call to the ListByNamespace method.
   * @param options The options parameters.
   */
  listByNamespaceNext(
    resourceGroupName: string,
    namespaceName: string,
    nextLink: string,
    options?: EventHubsListByNamespaceNextOptionalParams
  ): Promise<EventHubsListByNamespaceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, namespaceName, nextLink, options: operationOptions },
      listByNamespaceNextOperationSpec
    ) as Promise<EventHubsListByNamespaceNextResponse>;
  }

  /**
   * ListAuthorizationRulesNext
   * @param resourceGroupName Name of the resource group within the azure subscription.
   * @param namespaceName The Namespace name
   * @param nextLink The nextLink from the previous successful call to the ListAuthorizationRules method.
   * @param eventHubName The Event Hub name
   * @param options The options parameters.
   */
  listAuthorizationRulesNext(
    resourceGroupName: string,
    namespaceName: string,
    nextLink: string,
    eventHubName: string,
    options?: coreHttp.OperationOptions
  ): Promise<EventHubsListAuthorizationRulesNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        namespaceName,
        nextLink,
        eventHubName,
        options: operationOptions
      },
      listAuthorizationRulesNextOperationSpec
    ) as Promise<EventHubsListAuthorizationRulesNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listByNamespaceOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EventHubListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.skip, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Eventhub
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters8,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName,
    Parameters.eventHubName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName,
    Parameters.eventHubName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Eventhub
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName,
    Parameters.eventHubName
  ],
  serializer
};
const listAuthorizationRulesOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/authorizationRules",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AuthorizationRuleListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName,
    Parameters.eventHubName
  ],
  serializer
};
const createOrUpdateAuthorizationRuleOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/authorizationRules/{authorizationRuleName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.AuthorizationRule
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters3,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName,
    Parameters.authorizationRuleName,
    Parameters.eventHubName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const getAuthorizationRuleOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/authorizationRules/{authorizationRuleName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AuthorizationRule
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName,
    Parameters.authorizationRuleName,
    Parameters.eventHubName
  ],
  serializer
};
const deleteAuthorizationRuleOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/authorizationRules/{authorizationRuleName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName,
    Parameters.authorizationRuleName,
    Parameters.eventHubName
  ],
  serializer
};
const listKeysOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/authorizationRules/{authorizationRuleName}/ListKeys",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AccessKeys
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName,
    Parameters.authorizationRuleName,
    Parameters.eventHubName
  ],
  serializer
};
const regenerateKeysOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventHub/namespaces/{namespaceName}/eventhubs/{eventHubName}/authorizationRules/{authorizationRuleName}/regenerateKeys",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AccessKeys
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters9,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName,
    Parameters.authorizationRuleName,
    Parameters.eventHubName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const listByNamespaceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EventHubListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.skip, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName,
    Parameters.nextLink4
  ],
  serializer
};
const listAuthorizationRulesNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AuthorizationRuleListResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.namespaceName,
    Parameters.nextLink2,
    Parameters.eventHubName
  ],
  serializer
};
