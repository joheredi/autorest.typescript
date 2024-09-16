// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../../logger.js";
import {
  _Metrics,
  _metricsSerializer,
  _metricsDeserializer,
  _PagedTestFileInfo,
  _pagedTestFileInfoSerializer,
  _pagedTestFileInfoDeserializer,
  _PagedTest,
  _pagedTestSerializer,
  _pagedTestDeserializer,
  _PagedTestRun,
  _pagedTestRunSerializer,
  _pagedTestRunDeserializer,
  _PagedTestProfile,
  _pagedTestProfileSerializer,
  _pagedTestProfileDeserializer,
  _PagedTestProfileRun,
  _pagedTestProfileRunSerializer,
  _pagedTestProfileRunDeserializer,
} from "../../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface TestProfileRunContext extends Client {}

/** Optional parameters for the client. */
export interface TestProfileRunClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  apiVersion?: string;
}

export function createTestProfileRun(
  endpointParam: string,
  credential: TokenCredential,
  options: TestProfileRunClientOptionalParams = {},
): TestProfileRunContext {
  const endpointUrl =
    options.endpoint ?? options.baseUrl ?? `https://${endpointParam}`;

  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api`
    : "azsdk-js-api";
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? [
        "https://cnt-prod.loadtesting.azure.com/.default",
      ],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  clientContext.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  return clientContext;
}
