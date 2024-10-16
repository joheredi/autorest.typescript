// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FloatProperty } from "../../models/models.js";
import {
  FloatGet200Response,
  FloatPut204Response,
  ValueTypesContext as Client,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  FloatGetOptionalParams,
  FloatPutOptionalParams,
} from "../../models/options.js";

export function _floatGetSend(
  context: Client,
  options: FloatGetOptionalParams = { requestOptions: {} },
): StreamableMethod<FloatGet200Response> {
  return context
    .path("/type/property/value-types/float")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _floatGetDeserialize(
  result: FloatGet200Response,
): Promise<FloatProperty> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    property: result.body["property"],
  };
}

/** Get call */
export async function floatGet(
  context: Client,
  options: FloatGetOptionalParams = { requestOptions: {} },
): Promise<FloatProperty> {
  const result = await _floatGetSend(context, options);
  return _floatGetDeserialize(result);
}

export function _floatPutSend(
  context: Client,
  body: FloatProperty,
  options: FloatPutOptionalParams = { requestOptions: {} },
): StreamableMethod<FloatPut204Response> {
  return context
    .path("/type/property/value-types/float")
    .put({
      ...operationOptionsToRequestParameters(options),
      body: { property: body["property"] },
    });
}

export async function _floatPutDeserialize(
  result: FloatPut204Response,
): Promise<void> {
  if (result.status !== "204") {
    throw createRestError(result);
  }

  return;
}

/** Put operation */
export async function floatPut(
  context: Client,
  body: FloatProperty,
  options: FloatPutOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _floatPutSend(context, body, options);
  return _floatPutDeserialize(result);
}
