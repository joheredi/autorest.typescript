// Licensed under the MIT license.

import { getClient, ClientOptions } from "@typespec/ts-http-runtime";
import { UsageContext } from "./clientDefinitions.js";

/** The optional parameters for the client */
export interface UsageContextOptions extends ClientOptions {}

/**
 * Initialize a new instance of `UsageContext`
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  options: UsageContextOptions = {},
): UsageContext {
  const endpointUrl =
    options.endpoint ?? options.baseUrl ?? `http://localhost:3000`;
  const userAgentInfo = `azsdk-js-usage-rest/1.0.0`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
  };
  const client = getClient(endpointUrl, options) as UsageContext;

  client.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  return client;
}
