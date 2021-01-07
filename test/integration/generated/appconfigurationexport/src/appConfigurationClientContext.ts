/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import { AppConfigurationClientOptionalParams } from "./models";

const packageName = "appconfiguration";
const packageVersion = "1.0.0-preview1";

/** @hidden */
export class AppConfigurationClientContext extends coreHttp.ServiceClient {
  endpoint: string;
  syncToken?: string;
  apiVersion: string;

  /**
   * Initializes a new instance of the AppConfigurationClientContext class.
   * @param endpoint The endpoint of the App Configuration instance to send requests to.
   * @param options The parameter options
   */
  constructor(
    endpoint: string,
    options?: AppConfigurationClientOptionalParams
  ) {
    if (endpoint === undefined) {
      throw new Error("'endpoint' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }

    if (!options.userAgent) {
      const defaultUserAgent = coreHttp.getDefaultUserAgentValue();
      options.userAgent = `${packageName}/${packageVersion} ${defaultUserAgent}`;
    }

    super(undefined, options);

    this.requestContentType = "application/json; charset=utf-8";

    this.baseUri = options.endpoint || "{endpoint}";

    // Parameter assignments
    this.endpoint = endpoint;

    // Assigning values to Constant parameters
    this.apiVersion = options.apiVersion || "1.0";
  }
}