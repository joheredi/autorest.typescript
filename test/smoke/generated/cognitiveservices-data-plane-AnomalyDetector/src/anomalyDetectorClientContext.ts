/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import { AnomalyDetectorClientOptionalParams } from "./models";

const packageName = "cognitiveservices-data-plane-AnomalyDetector";
const packageVersion = "1.0.0";

export class AnomalyDetectorClientContext extends coreHttp.ServiceClient {
  endpoint: string;

  /**
   * Initializes a new instance of the AnomalyDetectorClientContext class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param endpoint Supported Cognitive Services endpoints (protocol and hostname, for example:
   *                 https://westus2.api.cognitive.microsoft.com).
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    endpoint: string,
    options?: AnomalyDetectorClientOptionalParams
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }
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

    super(credentials, options);

    this.requestContentType = "application/json; charset=utf-8";

    this.baseUri = options.endpoint || "{Endpoint}/anomalydetector/v1.0";

    // Parameter assignments
    this.endpoint = endpoint;
  }
}
