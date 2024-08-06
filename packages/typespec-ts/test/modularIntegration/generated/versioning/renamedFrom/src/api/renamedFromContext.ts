// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Versions } from "../models/models.js";
import { ClientOptions, Client, getClient } from "@azure-rest/core-client";
import { logger } from "../logger.js";

export interface RenamedFromContext extends Client {}

/** Optional parameters for the client. */
export interface RenamedFromClientOptionalParams extends ClientOptions {}

/** Test for the `@renamedFrom` decorator. */
export function createRenamedFrom(
  endpointParam: string,
  version: Versions,
  options: RenamedFromClientOptionalParams = {},
): RenamedFromContext {
  const endpointUrl =
    options.endpoint ??
    options.baseUrl ??
    `${endpointParam}/versioning/renamed-from/api-version:${version}`;

  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api`
    : "azsdk-js-api";
  const updatedOptions = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
  };
  const clientContext = getClient(endpointUrl, undefined, updatedOptions);
  clientContext.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  if (options.apiVersion) {
    logger.warning(
      "This client does not support client api-version, please change it at the operation level",
    );
  }
  return clientContext;
}
