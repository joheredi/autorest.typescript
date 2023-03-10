// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { ClientOptions } from "../common/interfaces.js";
import getClient, { BatchServiceClient } from "../rest/index.js";

/** A client for issuing REST requests to the Azure Batch service. */
export function createBatchServiceClient(
  endpoint: string,
  credential: TokenCredential,
  options: ClientOptions = {}
): BatchServiceClient {
  const baseUrl = endpoint;
  const clientContext = getClient(baseUrl, credential, options);
  return clientContext;
}
