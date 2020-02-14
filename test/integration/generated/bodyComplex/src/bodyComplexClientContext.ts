/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Models from "./models";

const packageName = "bodyString";
const packageVersion = "1.0.0-preview1";

export class BodyComplexClientContext extends coreHttp.ServiceClient {
  $host: string;
  apiVersion: string;
  baseUri?: string;

  /**
   * Initializes a new instance of the BodyComplexClientContext class.
   * @param options The parameter options
   */
  constructor(options?: Models.BodyComplexClientOptionalParams) {
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

    this.baseUri = options.baseUri || "{$host}";

    // Assigning values to Constant parameters
    this.$host = options.$host || "http://localhost:3000";
    this.apiVersion = options.apiVersion || "2016-02-29";
  }
}
