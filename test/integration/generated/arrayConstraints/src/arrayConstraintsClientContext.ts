/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import { Enum0, ArrayConstraintsClientOptionalParams } from "./models";

const packageName = "array-constraints-client";
const packageVersion = "1.0.0-preview1";

export class ArrayConstraintsClientContext extends coreHttp.ServiceClient {
  $host: string;
  apiVersion: Enum0;

  /**
   * Initializes a new instance of the ArrayConstraintsClientContext class.
   * @param $host server parameter
   * @param apiVersion
   * @param options The parameter options
   */
  constructor(
    $host: string,
    apiVersion: Enum0,
    options?: ArrayConstraintsClientOptionalParams
  ) {
    if ($host === undefined) {
      throw new Error("'$host' cannot be null");
    }
    if (apiVersion === undefined) {
      throw new Error("'apiVersion' cannot be null");
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

    this.baseUri = options.endpoint || "{$host}";

    // Parameter assignments
    this.$host = $host;
    this.apiVersion = apiVersion;
  }
}
