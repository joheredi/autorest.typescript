// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger.js";
import { NotDiscriminatedClient } from "./clientDefinitions.js";

/** The optional parameters for the client */
export interface NotDiscriminatedClientOptions extends ClientOptions {}

/**
 * Initialize a new instance of `NotDiscriminatedClient`
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  options: NotDiscriminatedClientOptions = {},
): NotDiscriminatedClient {
  const endpointUrl =
    options.endpoint ?? options.baseUrl ?? `http://localhost:3000`;
  const userAgentInfo = `azsdk-js-model-inheritance-not-discriminated-rest/1.0.0`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
    loggingOptions: {
      logger: options.loggingOptions?.logger ?? logger.info,
    },
  };
  const client = getClient(endpointUrl, options) as NotDiscriminatedClient;

  client.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  if (options.apiVersion) {
    logger.warning(
      "This client does not support client api-version, please change it at the operation level",
    );
  }

  return client;
}
