// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  differentSpreadStringDerivedSerializer,
  DifferentSpreadStringDerived,
} from "../../models/models.js";
import { AdditionalPropertiesContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import {
  ExtendsDifferentSpreadStringGetOptionalParams,
  ExtendsDifferentSpreadStringPutOptionalParams,
} from "../../models/options.js";

export function _getSend(
  context: Client,
  options: ExtendsDifferentSpreadStringGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path("/type/property/additionalProperties/extendsDifferentSpreadString")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<DifferentSpreadStringDerived> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body as any;
}

/** Get call */
export async function get(
  context: Client,
  options: ExtendsDifferentSpreadStringGetOptionalParams = {
    requestOptions: {},
  },
): Promise<DifferentSpreadStringDerived> {
  const result = await _getSend(context, options);
  return _getDeserialize(result);
}

export function _putSend(
  context: Client,
  body: DifferentSpreadStringDerived,
  options: ExtendsDifferentSpreadStringPutOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path("/type/property/additionalProperties/extendsDifferentSpreadString")
    .put({
      ...operationOptionsToRequestParameters(options),
      body: differentSpreadStringDerivedSerializer(body),
    });
}

export async function _putDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Put operation */
export async function put(
  context: Client,
  body: DifferentSpreadStringDerived,
  options: ExtendsDifferentSpreadStringPutOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _putSend(context, body, options);
  return _putDeserialize(result);
}
