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
import { EventGridManagementClient } from "../eventGridManagementClient";
import { LROPoller, shouldDeserializeLRO } from "../lro";
import {
  DomainTopicsGetResponse,
  DomainTopicsCreateOrUpdateResponse,
  DomainTopicsListByDomainOptionalParams,
  DomainTopicsListByDomainResponse,
  DomainTopicsListByDomainNextOptionalParams,
  DomainTopicsListByDomainNextResponse
} from "../models";

/**
 * Class representing a DomainTopics.
 */
export class DomainTopics {
  private readonly client: EventGridManagementClient;

  /**
   * Initialize a new instance of the class DomainTopics class.
   * @param client Reference to the service client
   */
  constructor(client: EventGridManagementClient) {
    this.client = client;
  }

  /**
   * Get properties of a domain topic.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param domainName Name of the domain.
   * @param domainTopicName Name of the topic.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    domainName: string,
    domainTopicName: string,
    options?: coreHttp.OperationOptions
  ): Promise<DomainTopicsGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        domainName,
        domainTopicName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<DomainTopicsGetResponse>;
  }

  /**
   * Asynchronously creates or updates a new domain topic with the specified parameters.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param domainName Name of the domain.
   * @param domainTopicName Name of the domain topic.
   * @param options The options parameters.
   */
  async createOrUpdate(
    resourceGroupName: string,
    domainName: string,
    domainTopicName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<DomainTopicsCreateOrUpdateResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      domainName,
      domainTopicName,
      options: operationOptions
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.client.sendOperationRequest(args, spec) as Promise<
        DomainTopicsCreateOrUpdateResponse
      >;
    const initialOperationResult = await sendOperation(
      args,
      createOrUpdateOperationSpec
    );

    return new LROPoller({
      initialOperationArguments: args,
      initialOperationSpec: createOrUpdateOperationSpec,
      initialOperationResult,
      sendOperation
    });
  }

  /**
   * Delete existing domain topic.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param domainName Name of the domain.
   * @param domainTopicName Name of the domain topic.
   * @param options The options parameters.
   */
  async delete(
    resourceGroupName: string,
    domainName: string,
    domainTopicName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationOptions: coreHttp.RequestOptionsBase = this.getOperationOptions(
      options
    );

    const args: coreHttp.OperationArguments = {
      resourceGroupName,
      domainName,
      domainTopicName,
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
   * List all the topics in a domain.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param domainName Domain name.
   * @param options The options parameters.
   */
  listByDomain(
    resourceGroupName: string,
    domainName: string,
    options?: DomainTopicsListByDomainOptionalParams
  ): Promise<DomainTopicsListByDomainResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, domainName, options: operationOptions },
      listByDomainOperationSpec
    ) as Promise<DomainTopicsListByDomainResponse>;
  }

  /**
   * ListByDomainNext
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param domainName Domain name.
   * @param nextLink The nextLink from the previous successful call to the ListByDomain method.
   * @param options The options parameters.
   */
  listByDomainNext(
    resourceGroupName: string,
    domainName: string,
    nextLink: string,
    options?: DomainTopicsListByDomainNextOptionalParams
  ): Promise<DomainTopicsListByDomainNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, domainName, nextLink, options: operationOptions },
      listByDomainNextOperationSpec
    ) as Promise<DomainTopicsListByDomainNextResponse>;
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{domainTopicName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DomainTopic
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.domainName,
    Parameters.domainTopicName
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{domainTopicName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.DomainTopic
    },
    201: {
      bodyMapper: Mappers.DomainTopic
    },
    202: {
      bodyMapper: Mappers.DomainTopic
    },
    204: {
      bodyMapper: Mappers.DomainTopic
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.domainName,
    Parameters.domainTopicName1
  ],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics/{domainTopicName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {}, default: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.domainName,
    Parameters.domainTopicName1
  ],
  serializer
};
const listByDomainOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/domains/{domainName}/topics",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DomainTopicsListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.domainName1
  ],
  serializer
};
const listByDomainNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DomainTopicsListResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.domainName1,
    Parameters.nextLink2
  ],
  serializer
};
