/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { SubscriptionInMethod } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { AzureSpecialPropertiesClient } from "../azureSpecialPropertiesClient";
import {
  SubscriptionInMethodPostMethodLocalValidOptionalParams,
  SubscriptionInMethodPostMethodLocalNullOptionalParams,
  SubscriptionInMethodPostPathLocalValidOptionalParams,
  SubscriptionInMethodPostSwaggerLocalValidOptionalParams
} from "../models";

/** Class containing SubscriptionInMethod operations. */
export class SubscriptionInMethodImpl implements SubscriptionInMethod {
  private readonly client: AzureSpecialPropertiesClient;

  /**
   * Initialize a new instance of the class SubscriptionInMethod class.
   * @param client Reference to the service client
   */
  constructor(client: AzureSpecialPropertiesClient) {
    this.client = client;
  }

  /**
   * POST method with subscriptionId modeled in the method.  pass in subscription id =
   * '1234-5678-9012-3456' to succeed
   * @param subscriptionId This should appear as a method parameter, use value '1234-5678-9012-3456'
   * @param options The options parameters.
   */
  postMethodLocalValid(
    subscriptionId: string,
    options?: SubscriptionInMethodPostMethodLocalValidOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { subscriptionId, options },
      postMethodLocalValidOperationSpec
    );
  }

  /**
   * POST method with subscriptionId modeled in the method.  pass in subscription id = null, client-side
   * validation should prevent you from making this call
   * @param subscriptionId This should appear as a method parameter, use value null, client-side
   *                       validation should prvenet the call
   * @param options The options parameters.
   */
  postMethodLocalNull(
    subscriptionId: string,
    options?: SubscriptionInMethodPostMethodLocalNullOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { subscriptionId, options },
      postMethodLocalNullOperationSpec
    );
  }

  /**
   * POST method with subscriptionId modeled in the method.  pass in subscription id =
   * '1234-5678-9012-3456' to succeed
   * @param subscriptionId Should appear as a method parameter -use value '1234-5678-9012-3456'
   * @param options The options parameters.
   */
  postPathLocalValid(
    subscriptionId: string,
    options?: SubscriptionInMethodPostPathLocalValidOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { subscriptionId, options },
      postPathLocalValidOperationSpec
    );
  }

  /**
   * POST method with subscriptionId modeled in the method.  pass in subscription id =
   * '1234-5678-9012-3456' to succeed
   * @param subscriptionId The subscriptionId, which appears in the path, the value is always
   *                       '1234-5678-9012-3456'
   * @param options The options parameters.
   */
  postSwaggerLocalValid(
    subscriptionId: string,
    options?: SubscriptionInMethodPostSwaggerLocalValidOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { subscriptionId, options },
      postSwaggerLocalValidOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const postMethodLocalValidOperationSpec: coreClient.OperationSpec = {
  path:
    "/azurespecials/subscriptionId/method/string/none/path/local/1234-5678-9012-3456/{subscriptionId}",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host, Parameters.subscriptionId1],
  headerParameters: [Parameters.accept],
  serializer
};
const postMethodLocalNullOperationSpec: coreClient.OperationSpec = {
  path:
    "/azurespecials/subscriptionId/method/string/none/path/local/null/{subscriptionId}",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host, Parameters.subscriptionId1],
  headerParameters: [Parameters.accept],
  serializer
};
const postPathLocalValidOperationSpec: coreClient.OperationSpec = {
  path:
    "/azurespecials/subscriptionId/path/string/none/path/local/1234-5678-9012-3456/{subscriptionId}",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host, Parameters.subscriptionId1],
  headerParameters: [Parameters.accept],
  serializer
};
const postSwaggerLocalValidOperationSpec: coreClient.OperationSpec = {
  path:
    "/azurespecials/subscriptionId/swagger/string/none/path/local/1234-5678-9012-3456/{subscriptionId}",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host, Parameters.subscriptionId1],
  headerParameters: [Parameters.accept],
  serializer
};