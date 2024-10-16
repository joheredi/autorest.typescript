// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  differentSpreadFloatDerivedSerializer,
  DifferentSpreadFloatDerived,
} from "../../models/models.js";
import {
  AdditionalPropertiesContext as Client,
  ExtendsDifferentSpreadFloatGet200Response,
  ExtendsDifferentSpreadFloatPut204Response,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  ExtendsDifferentSpreadFloatGetOptionalParams,
  ExtendsDifferentSpreadFloatPutOptionalParams,
} from "../../models/options.js";

export function _getSend(
  context: Client,
  options: ExtendsDifferentSpreadFloatGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod<ExtendsDifferentSpreadFloatGet200Response> {
  return context
    .path("/type/property/additionalProperties/extendsDifferentSpreadFloat")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getDeserialize(
  result: ExtendsDifferentSpreadFloatGet200Response,
): Promise<DifferentSpreadFloatDerived> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return result.body as any;
}

/** Get call */
export async function get(
  context: Client,
  options: ExtendsDifferentSpreadFloatGetOptionalParams = {
    requestOptions: {},
  },
): Promise<DifferentSpreadFloatDerived> {
  const result = await _getSend(context, options);
  return _getDeserialize(result);
}

export function _putSend(
  context: Client,
  body: DifferentSpreadFloatDerived,
  options: ExtendsDifferentSpreadFloatPutOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod<ExtendsDifferentSpreadFloatPut204Response> {
  return context
    .path("/type/property/additionalProperties/extendsDifferentSpreadFloat")
    .put({
      ...operationOptionsToRequestParameters(options),
      body: differentSpreadFloatDerivedSerializer(body),
    });
}

export async function _putDeserialize(
  result: ExtendsDifferentSpreadFloatPut204Response,
): Promise<void> {
  if (result.status !== "204") {
    throw createRestError(result);
  }

  return;
}

/** Put operation */
export async function put(
  context: Client,
  body: DifferentSpreadFloatDerived,
  options: ExtendsDifferentSpreadFloatPutOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _putSend(context, body, options);
  return _putDeserialize(result);
}
