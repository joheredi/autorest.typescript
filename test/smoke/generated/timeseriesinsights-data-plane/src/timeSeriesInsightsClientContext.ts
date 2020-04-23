/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Models from "./models";

const packageName = "timeseriesinsights-data-plane";
const packageVersion = "";

export class TimeSeriesInsightsClientContext extends coreHttp.ServiceClient {
  environmentFqdn: string;
  apiVersion: string;

  /**
   * Initializes a new instance of the TimeSeriesInsightsClientContext class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param environmentFqdn Per environment FQDN, for example
   *                        10000000-0000-0000-0000-100000000109.env.timeseries.azure.com. You can obtain this domain name from
   *                        the response of the Get Environments API, Azure portal, or Azure Resource Manager.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    environmentFqdn: string,
    options?: Models.TimeSeriesInsightsClientOptionalParams
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }
    if (environmentFqdn === undefined) {
      throw new Error("'environmentFqdn' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }

    if (!options.userAgent) {
      const defaultUserAgent = coreHttp.getDefaultUserAgentValue();
      options.userAgent = `${packageName}/${packageVersion} ${defaultUserAgent}`;
    }

    super(credentials, options);

    this.requestContentType = "application/json; charset=utf-8";

    this.baseUri = options.endpoint || "https://{environmentFqdn}";

    // Parameter assignments
    this.environmentFqdn = environmentFqdn;

    // Assigning values to Constant parameters
    this.apiVersion = options.apiVersion || "2018-11-01-preview";
  }
}
