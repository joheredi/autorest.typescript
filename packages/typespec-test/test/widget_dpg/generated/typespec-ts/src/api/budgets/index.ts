// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { User } from "../../models/models.js";
import { BudgetsCreateOrReplaceOptionalParams } from "../../models/options.js";
import { getLongRunningPoller } from "../pollingHelpers.js";
import {
  Client,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Long-running resource create or replace operation template. */
export function createOrReplace(
  context: Client,
  name: string,
  resource: User,
  options: BudgetsCreateOrReplaceOptionalParams = { requestOptions: {} },
) {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(context, name, resource, options),
  }) as PollerLike<OperationState<User>, User>;
}

export function _createOrReplaceSend(
  context: Client,
  name: string,
  resource: User,
  options: BudgetsCreateOrReplaceOptionalParams = { requestOptions: {} },
) {
  return context
    .path("/budgets/widgets/createOrReplace/users/{name}", name)
    .put({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { "api-version": options?.apiVersion ?? "1.0.0" },
      body: { role: resource["role"], id: resource["id"] },
    });
}

export async function _createOrReplaceDeserialize(result: any): Promise<User> {
  if (result.status !== "200" || result.status !== "201") {
    throw createRestError(result);
  }

  return {
    name: result.body["name"],
    role: result.body["role"],
    id: result.body["id"],
  };
}
