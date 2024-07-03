// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  EmptyInput,
  EmptyOutput,
  deserializeEmptyOutput,
  EmptyInputOutput,
  deserializeEmptyInputOutput,
} from "../models/models.js";
import {
  EmptyContext as Client,
  GetEmpty200Response,
  PostRoundTripEmpty200Response,
  PutEmpty204Response,
} from "../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  PutEmptyOptionalParams,
  GetEmptyOptionalParams,
  PostRoundTripEmptyOptionalParams,
} from "../models/options.js";

export function _putEmptySend(
  context: Client,
  input: EmptyInput,
  options: PutEmptyOptionalParams = { requestOptions: {} },
): StreamableMethod<PutEmpty204Response> {
  return context
    .path("/type/model/empty/alone")
    .put({ ...operationOptionsToRequestParameters(options), body: input });
}

export async function _putEmptyDeserialize(
  result: PutEmpty204Response,
): Promise<void> {
  if (result.status !== "204") {
    throw createRestError(result);
  }

  return;
}

export async function putEmpty(
  context: Client,
  input: EmptyInput,
  options: PutEmptyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _putEmptySend(context, input, options);
  return _putEmptyDeserialize(result);
}

export function _getEmptySend(
  context: Client,
  options: GetEmptyOptionalParams = { requestOptions: {} },
): StreamableMethod<GetEmpty200Response> {
  return context
    .path("/type/model/empty/alone")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getEmptyDeserialize(
  result: GetEmpty200Response,
): Promise<EmptyOutput> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return deserializeEmptyOutput(result.body);
}

export async function getEmpty(
  context: Client,
  options: GetEmptyOptionalParams = { requestOptions: {} },
): Promise<EmptyOutput> {
  const result = await _getEmptySend(context, options);
  return _getEmptyDeserialize(result);
}

export function _postRoundTripEmptySend(
  context: Client,
  body: EmptyInputOutput,
  options: PostRoundTripEmptyOptionalParams = { requestOptions: {} },
): StreamableMethod<PostRoundTripEmpty200Response> {
  return context
    .path("/type/model/empty/round-trip")
    .post({ ...operationOptionsToRequestParameters(options), body: body });
}

export async function _postRoundTripEmptyDeserialize(
  result: PostRoundTripEmpty200Response,
): Promise<EmptyInputOutput> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return deserializeEmptyInputOutput(result.body);
}

export async function postRoundTripEmpty(
  context: Client,
  body: EmptyInputOutput,
  options: PostRoundTripEmptyOptionalParams = { requestOptions: {} },
): Promise<EmptyInputOutput> {
  const result = await _postRoundTripEmptySend(context, body, options);
  return _postRoundTripEmptyDeserialize(result);
}
