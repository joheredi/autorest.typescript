/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

/**
 * List of subscriptions.
 */
export interface SubscriptionList {
  /**
   * Subscription definition.
   */
  value?: Subscription[];
  /**
   * URI to the next page.
   */
  nextLink?: string;
}

/**
 * List of supported operations.
 */
export interface Subscription {
  /**
   * Subscription name.
   */
  displayName?: string;
  /**
   * Fully qualified identifier.
   */
  id?: string;
  /**
   * Identifier of the offer under the scope of a delegated provider.
   */
  offerId?: string;
  /**
   * Subscription state.
   */
  state?: SubscriptionState;
  /**
   * Subscription identifier.
   */
  subscriptionId?: string;
  /**
   * Directory tenant identifier.
   */
  tenantId?: string;
}

/**
 * List of public offers.
 */
export interface OfferList {
  /**
   * List of public offers.
   */
  value?: Offer[];
  /**
   * URI to next page.
   */
  nextLink?: string;
}

/**
 * Represents an offering of services against which a subscription can be created.
 */
export interface Offer {
  /**
   * Display name of offer.
   */
  displayName?: string;
  /**
   * Description of offer.
   */
  description?: string;
  /**
   * The name of the offer.
   */
  name?: string;
  /**
   * The offer ID
   */
  id?: string;
}

/**
 * Base Resource Object
 */
export interface Resource {
  /**
   * URI of the resource.
   */
  readonly id?: string;
  /**
   * Name of the resource.
   */
  readonly name?: string;
  /**
   * Type of resource.
   */
  readonly type?: string;
  /**
   * Location of the resource
   */
  location?: string;
  /**
   * List of key-value pairs.
   */
  readonly tags?: { [propertyName: string]: string };
}

/**
 * Defines values for SubscriptionState.
 */
export type SubscriptionState =
  | "NotDefined"
  | "Enabled"
  | "Warned"
  | "PastDue"
  | "Disabled"
  | "Deleted";

/**
 * Contains response data for the list operation.
 */
export type SubscriptionsListResponse = SubscriptionList & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: SubscriptionList;
  };
};

/**
 * Contains response data for the get operation.
 */
export type SubscriptionsGetResponse = Subscription & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Subscription;
  };
};

/**
 * Contains response data for the createOrUpdate operation.
 */
export type SubscriptionsCreateOrUpdateResponse = Subscription & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Subscription;
  };
};

/**
 * Contains response data for the list operation.
 */
export type DelegatedProviderOffersListResponse = OfferList & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: OfferList;
  };
};

/**
 * Contains response data for the get operation.
 */
export type DelegatedProviderOffersGetResponse = Offer & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Offer;
  };
};

/**
 * Contains response data for the listNext operation.
 */
export type DelegatedProviderOffersListNextResponse = OfferList & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: OfferList;
  };
};

/**
 * Contains response data for the list operation.
 */
export type OffersListResponse = OfferList & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: OfferList;
  };
};

/**
 * Contains response data for the listNext operation.
 */
export type OffersListNextResponse = OfferList & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: OfferList;
  };
};

/**
 * Optional parameters.
 */
export interface SubscriptionClientOptionalParams
  extends coreHttp.ServiceClientOptions {
  /**
   * server parameter
   */
  $host?: string;
  /**
   * Api Version
   */
  apiVersion?: string;
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}
