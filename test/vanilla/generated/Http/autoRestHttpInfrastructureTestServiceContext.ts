/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Models from "./models";

const packageName = "";
const packageVersion = "";

export class AutoRestHttpInfrastructureTestServiceContext extends coreHttp.ServiceClient {

  /**
   * Initializes a new instance of the AutoRestHttpInfrastructureTestServiceContext class.
   * @param [options] The parameter options
   */
  constructor(options?: Models.AutoRestHttpInfrastructureTestServiceOptions) {
    if (!options) {
      options = {};
    }

    if (!options.userAgent) {
      const defaultUserAgent = coreHttp.getDefaultUserAgentValue();
      options.userAgent = `${packageName}/${packageVersion} ${defaultUserAgent}`;
    }

    super(undefined, options);

    this.baseUri = options.baseUri || this.baseUri || "http://localhost:3000";
    this.requestContentType = "application/json; charset=utf-8";
  }
}
