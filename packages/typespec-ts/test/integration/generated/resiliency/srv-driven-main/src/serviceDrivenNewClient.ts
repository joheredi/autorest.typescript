// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger.js";
import { ServiceDrivenNewClient } from "./clientDefinitions.js";

/** The optional parameters for the client */
export interface ServiceDrivenNewClientOptions extends ClientOptions {
  /** Pass in either 'v1' or 'v2'. This represents the API version of a service. */
  apiVersion?: string;
}

/**
 * Initialize a new instance of `ServiceDrivenNewClient`
 * @param endpointParam - Need to be set as 'http://localhost:3000' in client.
 * @param serviceDeploymentVersion - Pass in either 'v1' or 'v2'. This represents a version of the service deployment in history. 'v1' is for the deployment when the service had only one api version. 'v2' is for the deployment when the service had api-versions 'v1' and 'v2'.
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpointParam: string,
  serviceDeploymentVersion: string,
  { apiVersion = "v2", ...options }: ServiceDrivenNewClientOptions = {},
): ServiceDrivenNewClient {
  const endpointUrl =
    options.endpoint ??
    options.baseUrl ??
    `${endpointParam}/resiliency/service-driven/client:v2/service:${serviceDeploymentVersion}/api-version:${apiVersion}`;
  const userAgentInfo = `azsdk-js-srv-driven-main-rest/1.0.0`;
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
  const client = getClient(endpointUrl, options) as ServiceDrivenNewClient;

  client.pipeline.removePolicy({ name: "ApiVersionPolicy" });

  return client;
}
