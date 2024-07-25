// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions, getClient } from "@azure-rest/core-client";

/** Optional parameters for the client. */
export interface WidgetServiceClientOptionalParams extends ClientOptions {}

export { WidgetServiceContext } from "../rest/index.js";

export function createWidgetService(
  endpoint: string,
  options: WidgetServiceClientOptionalParams = {},
) {
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api`
    : "azsdk-js-api";

  const clientContext = getClient(endpoint, {
    ...options,
    userAgentOptions: { userAgentPrefix },
  });
  return clientContext;
}
