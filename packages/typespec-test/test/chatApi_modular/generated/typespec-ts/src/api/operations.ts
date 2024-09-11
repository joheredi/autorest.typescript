// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChatProtocolContext as Client } from "./index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import {
  StreamingChatCompletionOptionsRecord,
  streamingChatCompletionOptionsRecordSerializer,
  ChatCompletionChunkRecord,
  ChatCompletionOptionsRecord,
  chatCompletionOptionsRecordSerializer,
  ChatCompletionRecord,
} from "../models/models.js";
import {
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import {
  CreateStreamingOptionalParams,
  CreateOptionalParams,
} from "../models/options.js";

export function _createStreamingSend(
  context: Client,
  body: StreamingChatCompletionOptionsRecord,
  options: CreateStreamingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/chat")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: streamingChatCompletionOptionsRecordSerializer(body),
    });
}

export async function _createStreamingDeserialize(
  result: PathUncheckedResponse,
): Promise<ChatCompletionChunkRecord> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Creates a new streaming chat completion. */
export async function createStreaming(
  context: Client,
  body: StreamingChatCompletionOptionsRecord,
  options: CreateStreamingOptionalParams = { requestOptions: {} },
): Promise<ChatCompletionChunkRecord> {
  const result = await _createStreamingSend(context, body, options);
  return _createStreamingDeserialize(result);
}

export function _createSend(
  context: Client,
  body: ChatCompletionOptionsRecord,
  options: CreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/chat")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: chatCompletionOptionsRecordSerializer(body),
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ChatCompletionRecord> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Creates a new chat completion. */
export async function create(
  context: Client,
  body: ChatCompletionOptionsRecord,
  options: CreateOptionalParams = { requestOptions: {} },
): Promise<ChatCompletionRecord> {
  const result = await _createSend(context, body, options);
  return _createDeserialize(result);
}
