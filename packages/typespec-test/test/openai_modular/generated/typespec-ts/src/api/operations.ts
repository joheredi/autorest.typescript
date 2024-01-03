// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  EmbeddingsOptions,
  Embeddings,
  CompletionsOptions,
  Completions,
  ChatCompletionsOptions,
  ChatCompletions,
  BatchImageGenerationOperationResponse,
  ImageGenerationOptions,
} from "../models/models.js";
import {
  BeginAzureBatchImageGeneration202Response,
  BeginAzureBatchImageGenerationDefaultResponse,
  BeginAzureBatchImageGenerationLogicalResponse,
  GetAzureBatchImageGenerationOperationStatus200Response,
  GetAzureBatchImageGenerationOperationStatusDefaultResponse,
  GetChatCompletions200Response,
  GetChatCompletionsDefaultResponse,
  GetChatCompletionsWithAzureExtensions200Response,
  GetChatCompletionsWithAzureExtensionsDefaultResponse,
  GetCompletions200Response,
  GetCompletionsDefaultResponse,
  GetEmbeddings200Response,
  GetEmbeddingsDefaultResponse,
  isUnexpected,
  OpenAIContext as Client,
} from "../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  GetEmbeddingsOptions,
  GetCompletionsOptions,
  GetChatCompletionsOptions,
  GetChatCompletionsWithAzureExtensionsOptions,
  GetAzureBatchImageGenerationOperationStatusOptions,
  BeginAzureBatchImageGenerationOptions,
} from "../models/options.js";

export function _getEmbeddingsSend(
  context: Client,
  deploymentId: string,
  body: EmbeddingsOptions,
  options: GetEmbeddingsOptions = { requestOptions: {} }
): StreamableMethod<GetEmbeddings200Response | GetEmbeddingsDefaultResponse> {
  return context
    .path("/deployments/{deploymentId}/embeddings", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { user: body["user"], model: body["model"], input: body["input"] },
    });
}

export async function _getEmbeddingsDeserialize(
  result: GetEmbeddings200Response | GetEmbeddingsDefaultResponse
): Promise<Embeddings> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  let deserializedResponse: any = result.body;

  // Rename
  deserializedResponse.usage.promptTokens =
    deserializedResponse.usage.promptTokens;
  delete deserializedResponse.usage.prompt_tokens;

  // Rename
  deserializedResponse.usage.totalTokens =
    deserializedResponse.usage.totalTokens;
  delete deserializedResponse.usage.total_tokens;

  return deserializedResponse as Embeddings;
}

/** Return the embeddings for a given prompt. */
export async function getEmbeddings(
  context: Client,
  deploymentId: string,
  body: EmbeddingsOptions,
  options: GetEmbeddingsOptions = { requestOptions: {} }
): Promise<Embeddings> {
  const result = await _getEmbeddingsSend(context, deploymentId, body, options);
  return _getEmbeddingsDeserialize(result);
}

export function _getCompletionsSend(
  context: Client,
  deploymentId: string,
  body: CompletionsOptions,
  options: GetCompletionsOptions = { requestOptions: {} }
): StreamableMethod<GetCompletions200Response | GetCompletionsDefaultResponse> {
  return context
    .path("/deployments/{deploymentId}/completions", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        prompt: body["prompt"],
        max_tokens: body["maxTokens"],
        temperature: body["temperature"],
        top_p: body["topP"],
        logit_bias: body["logitBias"],
        user: body["user"],
        n: body["n"],
        logprobs: body["logprobs"],
        echo: body["echo"],
        stop: body["stop"],
        presence_penalty: body["presencePenalty"],
        frequency_penalty: body["frequencyPenalty"],
        best_of: body["bestOf"],
        stream: body["stream"],
        model: body["model"],
      },
    });
}

export async function _getCompletionsDeserialize(
  result: GetCompletions200Response | GetCompletionsDefaultResponse
): Promise<Completions> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  let deserializedResponse: any = result.body;
  deserializedResponse.created = new Date(deserializedResponse.created);

  // Rename
  deserializedResponse.promptFilterResults =
    deserializedResponse.prompt_annotations;
  delete deserializedResponse.prompt_annotations;

  // Rename items in array
  deserializedResponse.promptFilterResults.forEach((prompt: any) => {
    // Rename
    prompt.contentFilterResults = prompt.prompt_index;
    delete prompt.prompt_index;
  });

  // Rename items in array
  deserializedResponse.choices.forEach((choice: any) => {
    choice.finishReason = choice.finish_reason;
    delete choice.finish_reason;

    choice.contentFilterResults = choice.content_filter_results;
    delete choice.content_filter_results;

    choice.contentFilterResults.selfHarm =
      choice.contentFilterResults.self_harm;
    delete choice.contentFilterResults.self_harm;

    choice.tokenLogprobs = choice.logprobs.token_logprobs;
    delete choice.logprobs.token_logprobs;

    choice.topLogprobs = choice.logprobs.top_logprobs;
    delete choice.logprobs.top_logprobs;

    choice.textOffset = choice.logprobs.text_offset;
    delete choice.logprobs.text_offset;
  });

  deserializedResponse.usage.promptTokens =
    deserializedResponse.usage.promptTokens;
  delete deserializedResponse.usage.prompt_tokens;

  deserializedResponse.usage.completionTokens =
    deserializedResponse.usage.completion_tokens;
  delete deserializedResponse.usage.completion_tokens;

  deserializedResponse.usage.totalTokens =
    deserializedResponse.usage.total_tokens;
  delete deserializedResponse.usage.total_tokens;

  return deserializedResponse as Completions;
}

/**
 * Gets completions for the provided input prompts.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export async function getCompletions(
  context: Client,
  deploymentId: string,
  body: CompletionsOptions,
  options: GetCompletionsOptions = { requestOptions: {} }
): Promise<Completions> {
  const result = await _getCompletionsSend(
    context,
    deploymentId,
    body,
    options
  );
  return _getCompletionsDeserialize(result);
}

export function _getChatCompletionsSend(
  context: Client,
  deploymentId: string,
  body: ChatCompletionsOptions,
  options: GetChatCompletionsOptions = { requestOptions: {} }
): StreamableMethod<
  GetChatCompletions200Response | GetChatCompletionsDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/chat/completions", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        messages: body.messages as any,
        functions: !body["functions"]
          ? body["functions"]
          : body["functions"].map((p) => ({
              name: p["name"],
              description: p["description"],
              parameters: p["parameters"],
            })),
        function_call: body["functionCall"],
        max_tokens: body["maxTokens"],
        temperature: body["temperature"],
        top_p: body["topP"],
        logit_bias: body["logitBias"],
        user: body["user"],
        n: body["n"],
        stop: body["stop"],
        presence_penalty: body["presencePenalty"],
        frequency_penalty: body["frequencyPenalty"],
        stream: body["stream"],
        model: body["model"],
        dataSources: !body["dataSources"]
          ? body["dataSources"]
          : body["dataSources"].map((p) => ({
              type: p["type"],
              parameters: p["parameters"],
            })),
      },
    });
}

export async function _getChatCompletionsDeserialize(
  result: GetChatCompletions200Response | GetChatCompletionsDefaultResponse
): Promise<ChatCompletions> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  let deserializedResponse: any = result.body;

  deserializedResponse.created = new Date(deserializedResponse.created);

  deserializedResponse.choices.forEach((choice: any) => {
    choice.finishReason = choice.finish_reason;
    delete choice.finish_reason;

    choice.contentFilterResults = choice.content_filter_results;
    delete choice.content_filter_results;

    choice.contentFilterResults.selfHarm =
      choice.contentFilterResults.self_harm;
    delete choice.contentFilterResults.self_harm;

    choice.tokenLogprobs = choice.logprobs.token_logprobs;
    delete choice.logprobs.token_logprobs;

    choice.topLogprobs = choice.logprobs.top_logprobs;
    delete choice.logprobs.top_logprobs;

    choice.textOffset = choice.logprobs.text_offset;
    delete choice.logprobs.text_offset;

    choice.message.functionCall = choice.message.function_call;
    delete choice.message.function_call;
  });

  deserializedResponse.promptFilterResults =
    deserializedResponse.prompt_annotations;
  delete deserializedResponse.prompt_annotations;

  deserializedResponse.promptFilterResults.forEach((prompt: any) => {
    prompt.promptIndex = prompt.prompt_index;
    delete prompt.prompt_index;

    prompt.contentFilterResults = prompt.content_filter_results;
    delete prompt.content_filter_results;
  });

  deserializedResponse.usage.promptTokens =
    deserializedResponse.usage.promptTokens;

  delete deserializedResponse.usage.prompt_tokens;

  deserializedResponse.usage.completionTokens =
    deserializedResponse.usage.completion_tokens;
  delete deserializedResponse.usage.completion_tokens;

  deserializedResponse.usage.totalTokens =
    deserializedResponse.usage.total_tokens;
  delete deserializedResponse.usage.total_tokens;

  return deserializedResponse as ChatCompletions;
}

/**
 * Gets chat completions for the provided chat messages.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export async function getChatCompletions(
  context: Client,
  deploymentId: string,
  body: ChatCompletionsOptions,
  options: GetChatCompletionsOptions = { requestOptions: {} }
): Promise<ChatCompletions> {
  const result = await _getChatCompletionsSend(
    context,
    deploymentId,
    body,
    options
  );
  return _getChatCompletionsDeserialize(result);
}

export function _getChatCompletionsWithAzureExtensionsSend(
  context: Client,
  deploymentId: string,
  body: ChatCompletionsOptions,
  options: GetChatCompletionsWithAzureExtensionsOptions = { requestOptions: {} }
): StreamableMethod<
  | GetChatCompletionsWithAzureExtensions200Response
  | GetChatCompletionsWithAzureExtensionsDefaultResponse
> {
  return context
    .path(
      "/deployments/{deploymentId}/extensions/chat/completions",
      deploymentId
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        messages: body.messages as any,
        functions: !body["functions"]
          ? body["functions"]
          : body["functions"].map((p) => ({
              name: p["name"],
              description: p["description"],
              parameters: p["parameters"],
            })),
        function_call: body["functionCall"],
        max_tokens: body["maxTokens"],
        temperature: body["temperature"],
        top_p: body["topP"],
        logit_bias: body["logitBias"],
        user: body["user"],
        n: body["n"],
        stop: body["stop"],
        presence_penalty: body["presencePenalty"],
        frequency_penalty: body["frequencyPenalty"],
        stream: body["stream"],
        model: body["model"],
        dataSources: !body["dataSources"]
          ? body["dataSources"]
          : body["dataSources"].map((p) => ({
              type: p["type"],
              parameters: p["parameters"],
            })),
      },
    });
}

export async function _getChatCompletionsWithAzureExtensionsDeserialize(
  result:
    | GetChatCompletionsWithAzureExtensions200Response
    | GetChatCompletionsWithAzureExtensionsDefaultResponse
): Promise<ChatCompletions> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  let deserializedResponse: any = result.body;
  deserializedResponse.created = new Date(deserializedResponse.created);
  deserializedResponse.choices.forEach((choice: any) => {
    choice.finishReason = choice.finish_reason;
    delete choice.finish_reason;

    choice.contentFilterResults = choice.content_filter_results;
    delete choice.content_filter_results;

    choice.contentFilterResults.selfHarm =
      choice.contentFilterResults.self_harm;
    delete choice.contentFilterResults.self_harm;

    choice.message.functionCall = choice.message.function_call;
    delete choice.message.function_call;

    choice.promptFilterResults = choice.prompt_annotations;
    delete choice.prompt_annotations;

    choice.promptFilterResults.forEach((prompt: any) => {
      prompt.promptIndex = prompt.prompt_index;
      delete prompt.prompt_index;

      prompt.contentFilterResults = prompt.content_filter_results;
      delete prompt.content_filter_results;
    });

    choice.completionTokens = choice.completion_tokens;
    delete choice.completion_tokens;

    choice.promptTokens = choice.prompt_tokens;
    delete choice.prompt_tokens;

    choice.totalTokens = choice.total_tokens;
    delete choice.total_tokens;
  });
  return deserializedResponse as ChatCompletions;
}

/**
 * Gets chat completions for the provided chat messages.
 * This is an Azure-specific version of chat completions that supports integration with configured data sources and
 * other augmentations to the base chat completions capabilities.
 */
export async function getChatCompletionsWithAzureExtensions(
  context: Client,
  deploymentId: string,
  body: ChatCompletionsOptions,
  options: GetChatCompletionsWithAzureExtensionsOptions = { requestOptions: {} }
): Promise<ChatCompletions> {
  const result = await _getChatCompletionsWithAzureExtensionsSend(
    context,
    deploymentId,
    body,
    options
  );
  return _getChatCompletionsWithAzureExtensionsDeserialize(result);
}

export function _getAzureBatchImageGenerationOperationStatusSend(
  context: Client,
  operationId: string,
  options: GetAzureBatchImageGenerationOperationStatusOptions = {
    requestOptions: {},
  }
): StreamableMethod<
  | GetAzureBatchImageGenerationOperationStatus200Response
  | GetAzureBatchImageGenerationOperationStatusDefaultResponse
> {
  return context
    .path("/operations/images/{operationId}", operationId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getAzureBatchImageGenerationOperationStatusDeserialize(
  result:
    | GetAzureBatchImageGenerationOperationStatus200Response
    | GetAzureBatchImageGenerationOperationStatusDefaultResponse
): Promise<BatchImageGenerationOperationResponse> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  let deserializedResponse: any = result.body;

  deserializedResponse.created = new Date(deserializedResponse.created);

  deserializedResponse.result.created = new Date(
    deserializedResponse.result.created
  );
  return deserializedResponse as BatchImageGenerationOperationResponse;
}

/** Returns the status of the images operation */
export async function getAzureBatchImageGenerationOperationStatus(
  context: Client,
  operationId: string,
  options: GetAzureBatchImageGenerationOperationStatusOptions = {
    requestOptions: {},
  }
): Promise<BatchImageGenerationOperationResponse> {
  const result = await _getAzureBatchImageGenerationOperationStatusSend(
    context,
    operationId,
    options
  );
  return _getAzureBatchImageGenerationOperationStatusDeserialize(result);
}

export function _beginAzureBatchImageGenerationSend(
  context: Client,
  body: ImageGenerationOptions,
  options: BeginAzureBatchImageGenerationOptions = { requestOptions: {} }
): StreamableMethod<
  | BeginAzureBatchImageGeneration202Response
  | BeginAzureBatchImageGenerationDefaultResponse
  | BeginAzureBatchImageGenerationLogicalResponse
> {
  return context.path("/images/generations:submit").post({
    ...operationOptionsToRequestParameters(options),
    body: {
      prompt: body["prompt"],
      n: body["n"],
      size: body["size"],
      response_format: body["responseFormat"],
      user: body["user"],
    },
  });
}

export async function _beginAzureBatchImageGenerationDeserialize(
  result:
    | BeginAzureBatchImageGeneration202Response
    | BeginAzureBatchImageGenerationDefaultResponse
    | BeginAzureBatchImageGenerationLogicalResponse
): Promise<BatchImageGenerationOperationResponse> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  let deserializedResponse: any = result.body;
  deserializedResponse.created = new Date(deserializedResponse.created);

  deserializedResponse.result.created = new Date(
    deserializedResponse.result.created
  );
  return deserializedResponse as BatchImageGenerationOperationResponse;
}

/** Starts the generation of a batch of images from a text caption */
export async function beginAzureBatchImageGeneration(
  context: Client,
  body: ImageGenerationOptions,
  options: BeginAzureBatchImageGenerationOptions = { requestOptions: {} }
): Promise<BatchImageGenerationOperationResponse> {
  const result = await _beginAzureBatchImageGenerationSend(
    context,
    body,
    options
  );
  return _beginAzureBatchImageGenerationDeserialize(result);
}
