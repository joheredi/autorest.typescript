/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import { NetworkManagementClientOptionalParams } from "./models";
import { lroPolicy } from "./lro";

const packageName = "network-resource-manager";
const packageVersion = "1.0.0";

export class NetworkManagementClientContext extends coreHttp.ServiceClient {
  $host: string;
  subscriptionId: string;

  /**
   * Initializes a new instance of the NetworkManagementClientContext class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId The subscription credentials which uniquely identify the Microsoft Azure
   *                       subscription. The subscription ID forms part of the URI for every service call.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    subscriptionId: string,
    options?: NetworkManagementClientOptionalParams
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }
    if (subscriptionId === undefined) {
      throw new Error("'subscriptionId' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }

    if (!options.userAgent) {
      const defaultUserAgent = coreHttp.getDefaultUserAgentValue();
      options.userAgent = `${packageName}/${packageVersion} ${defaultUserAgent}`;
    }

    // Building the rquest policy fatories based on the passed factories and the
    // any required factories needed by the client.
    if (Array.isArray(options.requestPolicyFactories)) {
      // When an array of factories is passed in, we'll just add the required factories,
      // in this case lroPolicy(). It is important to note that passing an array of factories
      // to a new client, bypasses core-http default factories. Just the pipelines provided will be run.
      options.requestPolicyFactories = [
        lroPolicy(),
        ...options.requestPolicyFactories
      ];
    } else if (options.requestPolicyFactories) {
      // When we were passed a requestPolicyFactories as a function, we'll create a new one that adds the factories provided
      // in the options plus the required policies. When using this path, the pipelines passed to the client will be added to the
      // default policies added by core-http
      const optionsPolicies = options.requestPolicyFactories([lroPolicy()]) || [
        lroPolicy()
      ];
      options.requestPolicyFactories = (defaultFactories) => [
        ...optionsPolicies,
        ...defaultFactories
      ];
    } else {
      // In case no request policy factories were provided, we'll just need to create a function that will add
      // the lroPolicy to the default pipelines added by core-http
      options.requestPolicyFactories = (defaultFactories) => [
        lroPolicy(),
        ...defaultFactories
      ];
    }

    super(credentials, options);

    this.requestContentType = "application/json; charset=utf-8";

    this.baseUri = options.endpoint || "https://management.azure.com";

    // Parameter assignments
    this.subscriptionId = subscriptionId;

    // Assigning values to Constant parameters
    this.$host = options.$host || "https://management.azure.com";
  }
}
