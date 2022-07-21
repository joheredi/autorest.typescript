/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";
import { PathsImpl } from "./operations";
import { Paths } from "./operationsInterfaces";
import { CustomUrlClientOptionalParams } from "./models";

export class CustomUrlClient extends coreClient.ServiceClient {
  host: string;

  /**
   * Initializes a new instance of the CustomUrlClient class.
   * @param options The parameter options
   */
  constructor(options?: CustomUrlClientOptionalParams) {
    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: CustomUrlClientOptionalParams = {
      requestContentType: "application/json; charset=utf-8"
    };

    const packageDetails = `azsdk-js-custom-url/1.0.0-preview1`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix
      },
      baseUri:
        options.endpoint ?? options.baseUri ?? "http://{accountName}{host}"
    };
    super(optionsWithDefaults);

    // Assigning values to Constant parameters
    this.host = options.host || "host";
    this.paths = new PathsImpl(this);
  }

  paths: Paths;
}