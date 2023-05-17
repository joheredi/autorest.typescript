// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "../logger";
import { KeyCredential } from "@azure/core-auth";
import { EventGridContext } from "./clientDefinitions.js";

/**
<<<<<<< HEAD:packages/typespec-test/test/eventgrid_modular/generated/typespec-ts/src/rest/eventGridClient.ts
 * Initialize a new instance of `EventGridContext`
 * @param endpoint type: string, The host name of the namespace, e.g. namespaceName1.westus-1.eventgrid.azure.net
 * @param credentials type: KeyCredential, uniquely identify client credential
 * @param options type: ClientOptions, the parameter for all optional parameters
=======
 * Initialize a new instance of `AzureMessagingEventGridContext`
 * @param endpoint - The host name of the namespace, e.g. namespaceName1.westus-1.eventgrid.azure.net
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
>>>>>>> main:packages/typespec-test/test/eventgrid_modular/generated/typespec-ts/src/rest/azureMessagingEventGridClient.ts
 */
export default function createClient(
  endpoint: string,
  credentials: KeyCredential,
  options: ClientOptions = {}
): EventGridContext {
  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2023-06-01-preview";
  options = {
    ...options,
    credentials: {
      apiKeyHeaderName: "SharedAccessKey",
    },
  };

  const userAgentInfo = `azsdk-js-eventgrid-rest/1.0.0-beta.1`;
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

  const client = getClient(baseUrl, credentials, options) as EventGridContext;

  return client;
}
