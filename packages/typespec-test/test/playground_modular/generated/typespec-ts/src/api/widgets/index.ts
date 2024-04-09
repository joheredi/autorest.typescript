// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Widget } from "../../models/models.js";
import {
  isUnexpected,
  DemoServiceContext as Client,
  Analyze200Response,
  AnalyzeDefaultResponse,
  Create200Response,
  CreateDefaultResponse,
  DeleteOperation204Response,
  DeleteOperationDefaultResponse,
  List200Response,
  ListDefaultResponse,
  Read200Response,
  ReadDefaultResponse,
  Update200Response,
  UpdateDefaultResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  WidgetsListOptions,
  WidgetsReadOptions,
  WidgetsCreateOptions,
  WidgetsUpdateOptions,
  WidgetsDeleteOperationOptions,
  WidgetsAnalyzeOptions,
} from "../../models/options.js";

export function _listSend(
  context: Client,
  options: WidgetsListOptions = { requestOptions: {} },
): StreamableMethod<List200Response | ListDefaultResponse> {
  return context
    .path("/widgets")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _listDeserialize(
  result: List200Response | ListDefaultResponse,
): Promise<Widget[]> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return result.body === undefined
    ? result.body
    : result.body.map((p) => ({ weight: p["weight"], color: p["color"] }));
}

export async function list(
  context: Client,
  options: WidgetsListOptions = { requestOptions: {} },
): Promise<Widget[]> {
  const result = await _listSend(context, options);
  return _listDeserialize(result);
}

export function _readSend(
  context: Client,
  id: string,
  options: WidgetsReadOptions = { requestOptions: {} },
): StreamableMethod<Read200Response | ReadDefaultResponse> {
  return context
    .path("/widgets/{id}", id)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _readDeserialize(
  result: Read200Response | ReadDefaultResponse,
): Promise<Widget> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    weight: result.body["weight"],
    color: result.body["color"],
  };
}

export async function read(
  context: Client,
  id: string,
  options: WidgetsReadOptions = { requestOptions: {} },
): Promise<Widget> {
  const result = await _readSend(context, id, options);
  return _readDeserialize(result);
}

export function _createSend(
  context: Client,
  body: Widget,
  options: WidgetsCreateOptions = { requestOptions: {} },
): StreamableMethod<Create200Response | CreateDefaultResponse> {
  return context
    .path("/widgets")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { weight: body["weight"], color: body["color"] },
    });
}

export async function _createDeserialize(
  result: Create200Response | CreateDefaultResponse,
): Promise<Widget> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    weight: result.body["weight"],
    color: result.body["color"],
  };
}

export async function create(
  context: Client,
  body: Widget,
  options: WidgetsCreateOptions = { requestOptions: {} },
): Promise<Widget> {
  const result = await _createSend(context, body, options);
  return _createDeserialize(result);
}

export function _updateSend(
  context: Client,
  id: string,
  body: Widget,
  options: WidgetsUpdateOptions = { requestOptions: {} },
): StreamableMethod<Update200Response | UpdateDefaultResponse> {
  return context
    .path("/widgets/{id}", id)
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: { weight: body["weight"], color: body["color"] },
    });
}

export async function _updateDeserialize(
  result: Update200Response | UpdateDefaultResponse,
): Promise<Widget> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    weight: result.body["weight"],
    color: result.body["color"],
  };
}

export async function update(
  context: Client,
  id: string,
  body: Widget,
  options: WidgetsUpdateOptions = { requestOptions: {} },
): Promise<Widget> {
  const result = await _updateSend(context, id, body, options);
  return _updateDeserialize(result);
}

export function _deleteOperationSend(
  context: Client,
  id: string,
  options: WidgetsDeleteOperationOptions = { requestOptions: {} },
): StreamableMethod<
  DeleteOperation204Response | DeleteOperationDefaultResponse
> {
  return context
    .path("/widgets/{id}", id)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteOperationDeserialize(
  result: DeleteOperation204Response | DeleteOperationDefaultResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return;
}

export async function deleteOperation(
  context: Client,
  id: string,
  options: WidgetsDeleteOperationOptions = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteOperationSend(context, id, options);
  return _deleteOperationDeserialize(result);
}

export function _analyzeSend(
  context: Client,
  id: string,
  options: WidgetsAnalyzeOptions = { requestOptions: {} },
): StreamableMethod<Analyze200Response | AnalyzeDefaultResponse> {
  return context
    .path("/widgets/{id}/analyze", id)
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _analyzeDeserialize(
  result: Analyze200Response | AnalyzeDefaultResponse,
): Promise<string> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return result.body;
}

export async function analyze(
  context: Client,
  id: string,
  options: WidgetsAnalyzeOptions = { requestOptions: {} },
): Promise<string> {
  const result = await _analyzeSend(context, id, options);
  return _analyzeDeserialize(result);
}
