/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as operations from "./operations";
import * as Parameters from "./models/parameters";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import { CommerceAdminClientContext } from "./commerceAdminClientContext";

class CommerceAdminClient extends CommerceAdminClientContext {
  /**
   * Initializes a new instance of the CommerceAdminClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId Subscription credentials which uniquely identify Microsoft Azure
   *                       subscription.The subscription ID forms part of the URI for every service call.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    subscriptionId: string,
    options?: Models.CommerceAdminClientOptionalParams
  ) {
    super(credentials, subscriptionId, options);
    this.operations = new operations.Operations(this);
    this.subscriberUsageAggregates = new operations.SubscriberUsageAggregates(
      this
    );
  }

  /**
   * Update the encryption.
   * @param options The options parameters.
   */
  updateEncryption(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      updateEncryptionOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  operations: operations.Operations;
  subscriberUsageAggregates: operations.SubscriberUsageAggregates;
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const updateEncryptionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Commerce.Admin/updateEncryption",
  httpMethod: "POST",
  responses: { 200: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  serializer
};

// Operation Specifications

export {
  CommerceAdminClient,
  CommerceAdminClientContext,
  Models as CommerceAdminModels,
  Mappers as CommerceAdminMappers
};
export * from "./operations";
