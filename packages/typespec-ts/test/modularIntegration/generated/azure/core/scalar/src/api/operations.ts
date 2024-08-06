// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLocationModel } from "../models/models.js";
import { ScalarContext as Client } from "./index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import {
  GetOptionalParams,
  PutOptionalParams,
  PostOptionalParams,
  HeaderOptionalParams,
  QueryOptionalParams,
} from "../models/options.js";

export function _getSend(
  context: Client,
  options: GetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/azure/core/scalar/azureLocation")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<string> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** get azureLocation value */
export async function get(
  context: Client,
  options: GetOptionalParams = { requestOptions: {} },
): Promise<string> {
  const result = await _getSend(context, options);
  return _getDeserialize(result);
}

export function _putSend(
  context: Client,
  body: string,
  options: PutOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/azure/core/scalar/azureLocation")
    .put({ ...operationOptionsToRequestParameters(options), body: body });
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

/** put azureLocation value */
export async function put(
  context: Client,
  body: string,
  options: PutOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _putSend(context, body, options);
  return _putDeserialize(result);
}

export function _postSend(
  context: Client,
  body: AzureLocationModel,
  options: PostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/azure/core/scalar/azureLocation")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { location: body["location"] },
    });
}

export async function _postDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureLocationModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    location: result.body["location"],
  };
}

/** post a model which has azureLocation property */
export async function post(
  context: Client,
  body: AzureLocationModel,
  options: PostOptionalParams = { requestOptions: {} },
): Promise<AzureLocationModel> {
  const result = await _postSend(context, body, options);
  return _postDeserialize(result);
}

export function _headerSend(
  context: Client,
  region: string,
  options: HeaderOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/azure/core/scalar/azureLocation/header")
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { region: region },
    });
}

export async function _headerDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** azureLocation value header */
export async function header(
  context: Client,
  region: string,
  options: HeaderOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _headerSend(context, region, options);
  return _headerDeserialize(result);
}

export function _querySend(
  context: Client,
  region: string,
  options: QueryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/azure/core/scalar/azureLocation/query")
    .post({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { region: region },
    });
}

export async function _queryDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** azureLocation value query */
export async function query(
  context: Client,
  region: string,
  options: QueryOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _querySend(context, region, options);
  return _queryDeserialize(result);
}
