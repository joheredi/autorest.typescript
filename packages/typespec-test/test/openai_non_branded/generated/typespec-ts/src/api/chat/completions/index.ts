// Licensed under the MIT License.

import { OpenAIContext as Client } from "../../index.js";
import {
  CreateChatCompletionRequest,
  createChatCompletionRequestSerializer,
  CreateChatCompletionResponse,
  createChatCompletionResponseDeserializer,
} from "../../../models/models.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@typespec/ts-http-runtime";
import { ChatCompletionsCreateOptionalParams } from "../../../models/options.js";

export function _createSend(
  context: Client,
  body: CreateChatCompletionRequest,
  options: ChatCompletionsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/chat/completions")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: createChatCompletionRequestSerializer(body),
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<CreateChatCompletionResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return createChatCompletionResponseDeserializer(result.body);
}

export async function create(
  context: Client,
  body: CreateChatCompletionRequest,
  options: ChatCompletionsCreateOptionalParams = { requestOptions: {} },
): Promise<CreateChatCompletionResponse> {
  const result = await _createSend(context, body, options);
  return _createDeserialize(result);
}
