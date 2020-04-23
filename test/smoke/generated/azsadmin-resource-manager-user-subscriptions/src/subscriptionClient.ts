/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as operations from "./operations";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import { SubscriptionClientContext } from "./subscriptionClientContext";

class SubscriptionClient extends SubscriptionClientContext {
  /**
   * Initializes a new instance of the SubscriptionClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    options?: Models.SubscriptionClientOptionalParams
  ) {
    super(credentials, options);
    this.subscriptions = new operations.Subscriptions(this);
    this.delegatedProviderOffers = new operations.DelegatedProviderOffers(this);
    this.offers = new operations.Offers(this);
  }

  subscriptions: operations.Subscriptions;
  delegatedProviderOffers: operations.DelegatedProviderOffers;
  offers: operations.Offers;
}

// Operation Specifications

export {
  SubscriptionClient,
  SubscriptionClientContext,
  Models as SubscriptionModels,
  Mappers as SubscriptionMappers
};
export * from "./operations";
