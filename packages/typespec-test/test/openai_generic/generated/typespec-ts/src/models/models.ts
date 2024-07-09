// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  deserializeRecord,
  serializeRecord,
  passthroughDeserializer,
  deserializeUtcDateTime,
  withNullChecks,
  deserializeArray,
  deserializeBytes,
} from "../helpers/serializerHelpers.js";
import { uint8ArrayToString } from "@azure/core-util";
import {
  CreateModerationRequest as CreateModerationRequestRest,
  CreateImageRequest as CreateImageRequestRest,
  CreateImageEditRequest as CreateImageEditRequestRest,
  CreateImageVariationRequest as CreateImageVariationRequestRest,
  CreateFineTuneRequest as CreateFineTuneRequestRest,
  CreateFileRequest as CreateFileRequestRest,
  CreateEmbeddingRequest as CreateEmbeddingRequestRest,
  CreateEditRequest as CreateEditRequestRest,
  CreateCompletionRequest as CreateCompletionRequestRest,
  CreateFineTuningJobRequest as CreateFineTuningJobRequestRest,
  ChatCompletionRequestMessage as ChatCompletionRequestMessageRest,
  ChatCompletionFunctions as ChatCompletionFunctionsRest,
  ChatCompletionFunctionParameters as ChatCompletionFunctionParametersRest,
  ChatCompletionFunctionCallOption as ChatCompletionFunctionCallOptionRest,
  CreateChatCompletionRequest as CreateChatCompletionRequestRest,
  CreateTranslationRequest as CreateTranslationRequestRest,
  CreateTranscriptionRequest as CreateTranscriptionRequestRest,
  ChatCompletionResponseMessageOutput,
  CompletionUsageOutput,
  CreateChatCompletionResponseOutput,
  CreateCompletionResponseOutput,
  CreateEditResponseOutput,
  CreateEmbeddingResponseOutput,
  CreateModerationResponseOutput,
  CreateTranscriptionResponseOutput,
  CreateTranslationResponseOutput,
  DeleteFileResponseOutput,
  DeleteModelResponseOutput,
  EmbeddingOutput,
  ErrorModelOutput,
  ErrorResponseOutput,
  FineTuneEventOutput,
  FineTuneOutput,
  FineTuningJobEventOutput,
  FineTuningJobOutput,
  ImageOutput,
  ImagesResponseOutput,
  ListFilesResponseOutput,
  ListFineTuneEventsResponseOutput,
  ListFineTunesResponseOutput,
  ListFineTuningJobEventsResponseOutput,
  ListModelsResponseOutput,
  ListPaginatedFineTuningJobsResponseOutput,
  ModelOutput,
  OpenAIFileOutput,
} from "../rest/index.js";

export interface CreateModerationRequest {
  /** The input text to classify */
  input: string | string[];
  /**
   * Two content moderations models are available: `text-moderation-stable` and
   * `text-moderation-latest`. The default is `text-moderation-latest` which will be automatically
   * upgraded over time. This ensures you are always using our most accurate model. If you use
   * `text-moderation-stable`, we will provide advanced notice before updating the model. Accuracy
   * of `text-moderation-stable` may be slightly lower than for `text-moderation-latest`.
   */
  model?: string | "text-moderation-latest" | "text-moderation-stable";
}

export function createModerationRequestSerializer(
  item: CreateModerationRequest,
): CreateModerationRequestRest {
  return {
    input: item["input"],
    model: item["model"],
  };
}

export interface CreateModerationResponse {
  /** The unique identifier for the moderation request. */
  id: string;
  /** The model used to generate the moderation results. */
  model: string;
  /** A list of moderation objects. */
  results: {
    flagged: boolean;
    categories: {
      hate: boolean;
      "hate/threatening": boolean;
      harassment: boolean;
      "harassment/threatening": boolean;
      selfHarm: boolean;
      "selfHarm/intent": boolean;
      "selfHarm/instructive": boolean;
      sexual: boolean;
      "sexual/minors": boolean;
      violence: boolean;
      "violence/graphic": boolean;
    };
    categoryScores: {
      hate: number;
      "hate/threatening": number;
      harassment: number;
      "harassment/threatening": number;
      selfHarm: number;
      "selfHarm/intent": number;
      "selfHarm/instructive": number;
      sexual: number;
      "sexual/minors": number;
      violence: number;
      "violence/graphic": number;
    };
  }[];
}

export interface ErrorResponse {
  error: ErrorModel;
}

export interface ErrorModel {
  type: string;
  message: string;
  param: string | null;
  code: string | null;
}

export interface CreateImageRequest {
  /** A text description of the desired image(s). The maximum length is 1000 characters. */
  prompt: string;
  /** The number of images to generate. Must be between 1 and 10. */
  n?: number | null;
  /** The size of the generated images. Must be one of `256x256`, `512x512`, or `1024x1024`. */
  size?: "256x256" | "512x512" | "1024x1024";
  /** The format in which the generated images are returned. Must be one of `url` or `b64_json`. */
  responseFormat?: "url" | "b64_json";
  user?: string;
}

export function createImageRequestSerializer(
  item: CreateImageRequest,
): CreateImageRequestRest {
  return {
    prompt: item["prompt"],
    n: item["n"],
    size: item["size"],
    response_format: item["responseFormat"],
    user: item["user"],
  };
}

export interface ImagesResponse {
  created: Date;
  data: Image[];
}

/** Represents the url or the content of an image generated by the OpenAI API. */
export interface Image {
  /** The URL of the generated image, if `response_format` is `url` (default). */
  url?: string;
  /** The base64-encoded JSON of the generated image, if `response_format` is `b64_json`. */
  b64Json?: Uint8Array;
}

export interface CreateImageEditRequest {
  /** A text description of the desired image(s). The maximum length is 1000 characters. */
  prompt: string;
  /**
   * The image to edit. Must be a valid PNG file, less than 4MB, and square. If mask is not
   * provided, image must have transparency, which will be used as the mask.
   */
  image: Uint8Array;
  /**
   * An additional image whose fully transparent areas (e.g. where alpha is zero) indicate where
   * `image` should be edited. Must be a valid PNG file, less than 4MB, and have the same dimensions
   * as `image`.
   */
  mask?: Uint8Array;
  /** The number of images to generate. Must be between 1 and 10. */
  n?: number | null;
  /** The size of the generated images. Must be one of `256x256`, `512x512`, or `1024x1024`. */
  size?: "256x256" | "512x512" | "1024x1024";
  /** The format in which the generated images are returned. Must be one of `url` or `b64_json`. */
  responseFormat?: "url" | "b64_json";
  user?: string;
}

export function createImageEditRequestSerializer(
  item: CreateImageEditRequest,
): CreateImageEditRequestRest {
  return {
    prompt: item["prompt"],
    image: uint8ArrayToString(item["image"], "base64"),
    mask:
      item["mask"] !== undefined
        ? uint8ArrayToString(item["mask"], "base64")
        : undefined,
    n: item["n"],
    size: item["size"],
    response_format: item["responseFormat"],
    user: item["user"],
  };
}

export interface CreateImageVariationRequest {
  /**
   * The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB,
   * and square.
   */
  image: Uint8Array;
  /** The number of images to generate. Must be between 1 and 10. */
  n?: number | null;
  /** The size of the generated images. Must be one of `256x256`, `512x512`, or `1024x1024`. */
  size?: "256x256" | "512x512" | "1024x1024";
  /** The format in which the generated images are returned. Must be one of `url` or `b64_json`. */
  responseFormat?: "url" | "b64_json";
  user?: string;
}

export function createImageVariationRequestSerializer(
  item: CreateImageVariationRequest,
): CreateImageVariationRequestRest {
  return {
    image: uint8ArrayToString(item["image"], "base64"),
    n: item["n"],
    size: item["size"],
    response_format: item["responseFormat"],
    user: item["user"],
  };
}

export interface ListModelsResponse {
  object: string;
  data: Model[];
}

/** Describes an OpenAI model offering that can be used with the API. */
export interface Model {
  /** The model identifier, which can be referenced in the API endpoints. */
  id: string;
  /** The object type, which is always "model". */
  object: "model";
  /** The Unix timestamp (in seconds) when the model was created. */
  created: Date;
  /** The organization that owns the model. */
  ownedBy: string;
}

export interface DeleteModelResponse {
  id: string;
  object: string;
  deleted: boolean;
}

export interface CreateFineTuneRequest {
  /**
   * The ID of an uploaded file that contains training data.
   *
   * See [upload file](/docs/api-reference/files/upload) for how to upload a file.
   *
   * Your dataset must be formatted as a JSONL file, where each training example is a JSON object
   * with the keys "prompt" and "completion". Additionally, you must upload your file with the
   * purpose `fine-tune`.
   *
   * See the [fine-tuning guide](/docs/guides/legacy-fine-tuning/creating-training-data) for more
   * details.
   */
  trainingFile: string;
  /**
   * The ID of an uploaded file that contains validation data.
   *
   * If you provide this file, the data is used to generate validation metrics periodically during
   * fine-tuning. These metrics can be viewed in the
   * [fine-tuning results file](/docs/guides/legacy-fine-tuning/analyzing-your-fine-tuned-model).
   * Your train and validation data should be mutually exclusive.
   *
   * Your dataset must be formatted as a JSONL file, where each validation example is a JSON object
   * with the keys "prompt" and "completion". Additionally, you must upload your file with the
   * purpose `fine-tune`.
   *
   * See the [fine-tuning guide](/docs/guides/legacy-fine-tuning/creating-training-data) for more
   * details.
   */
  validationFile?: string | null;
  /**
   * The name of the base model to fine-tune. You can select one of "ada", "babbage", "curie",
   * "davinci", or a fine-tuned model created after 2022-04-21 and before 2023-08-22. To learn more
   * about these models, see the [Models](/docs/models) documentation.
   */
  model?: string | "ada" | "babbage" | "curie" | "davinci";
  /**
   * The number of epochs to train the model for. An epoch refers to one full cycle through the
   * training dataset.
   */
  nEpochs?: number | null;
  /**
   * The batch size to use for training. The batch size is the number of training examples used to
   * train a single forward and backward pass.
   *
   * By default, the batch size will be dynamically configured to be ~0.2% of the number of examples
   * in the training set, capped at 256 - in general, we've found that larger batch sizes tend to
   * work better for larger datasets.
   */
  batchSize?: number | null;
  /**
   * The learning rate multiplier to use for training. The fine-tuning learning rate is the original
   * learning rate used for pretraining multiplied by this value.
   *
   * By default, the learning rate multiplier is the 0.05, 0.1, or 0.2 depending on final
   * `batch_size` (larger learning rates tend to perform better with larger batch sizes). We
   * recommend experimenting with values in the range 0.02 to 0.2 to see what produces the best
   * results.
   */
  learningRateMultiplier?: number | null;
  /**
   * The weight to use for loss on the prompt tokens. This controls how much the model tries to
   * learn to generate the prompt (as compared to the completion which always has a weight of 1.0),
   * and can add a stabilizing effect to training when completions are short.
   *
   * If prompts are extremely long (relative to completions), it may make sense to reduce this
   * weight so as to avoid over-prioritizing learning the prompt.
   */
  promptLossRate?: number | null;
  /**
   * If set, we calculate classification-specific metrics such as accuracy and F-1 score using the
   * validation set at the end of every epoch. These metrics can be viewed in the
   * [results file](/docs/guides/legacy-fine-tuning/analyzing-your-fine-tuned-model).
   *
   * In order to compute classification metrics, you must provide a `validation_file`. Additionally,
   * you must specify `classification_n_classes` for multiclass classification or
   * `classification_positive_class` for binary classification.
   */
  computeClassificationMetrics?: boolean | null;
  /**
   * The number of classes in a classification task.
   *
   * This parameter is required for multiclass classification.
   */
  classificationNClasses?: number | null;
  /**
   * The positive class in binary classification.
   *
   * This parameter is needed to generate precision, recall, and F1 metrics when doing binary
   * classification.
   */
  classificationPositiveClass?: string | null;
  /**
   * If this is provided, we calculate F-beta scores at the specified beta values. The F-beta score
   * is a generalization of F-1 score. This is only used for binary classification.
   *
   * With a beta of 1 (i.e. the F-1 score), precision and recall are given the same weight. A larger
   * beta score puts more weight on recall and less on precision. A smaller beta score puts more
   * weight on precision and less on recall.
   */
  classificationBetas?: number[] | null;
  /**
   * A string of up to 18 characters that will be added to your fine-tuned model name.
   *
   * For example, a `suffix` of "custom-model-name" would produce a model name like
   * `ada:ft-your-org:custom-model-name-2022-02-15-04-21-04`.
   */
  suffix?: string | null;
}

export function createFineTuneRequestSerializer(
  item: CreateFineTuneRequest,
): CreateFineTuneRequestRest {
  return {
    training_file: item["trainingFile"],
    validation_file: item["validationFile"],
    model: item["model"],
    n_epochs: item["nEpochs"],
    batch_size: item["batchSize"],
    learning_rate_multiplier: item["learningRateMultiplier"],
    prompt_loss_rate: item["promptLossRate"],
    compute_classification_metrics: item["computeClassificationMetrics"],
    classification_n_classes: item["classificationNClasses"],
    classification_positive_class: item["classificationPositiveClass"],
    classification_betas: item["classificationBetas"],
    suffix: item["suffix"],
  };
}

/** The `FineTune` object represents a legacy fine-tune job that has been created through the API. */
export interface FineTune {
  /** The object identifier, which can be referenced in the API endpoints. */
  id: string;
  /** The object type, which is always "fine-tune". */
  object: "fine-tune";
  /** The Unix timestamp (in seconds) for when the fine-tuning job was created. */
  createdAt: Date;
  /** The Unix timestamp (in seconds) for when the fine-tuning job was last updated. */
  updatedAt: Date;
  /** The base model that is being fine-tuned. */
  model: string;
  /** The name of the fine-tuned model that is being created. */
  fineTunedModel: string | null;
  /** The organization that owns the fine-tuning job. */
  organizationId: string;
  /**
   * The current status of the fine-tuning job, which can be either `created`, `running`,
   * `succeeded`, `failed`, or `cancelled`.
   */
  status: "created" | "running" | "succeeded" | "failed" | "cancelled";
  /**
   * The hyperparameters used for the fine-tuning job. See the
   * [fine-tuning guide](/docs/guides/legacy-fine-tuning/hyperparameters) for more details.
   */
  hyperparams: {
    nEpochs: number;
    batchSize: number;
    promptLossWeight: number;
    learningRateMultiplier: number;
    computeClassificationMetrics?: boolean;
    classificationPositiveClass?: string;
    classificationNClasses?: number;
  };
  /** The list of files used for training. */
  trainingFiles: OpenAIFile[];
  /** The list of files used for validation. */
  validationFiles: OpenAIFile[];
  /** The compiled results files for the fine-tuning job. */
  resultFiles: OpenAIFile[];
  /** The list of events that have been observed in the lifecycle of the FineTune job. */
  events?: FineTuneEvent[];
}

/** The `File` object represents a document that has been uploaded to OpenAI. */
export interface OpenAIFile {
  /** The file identifier, which can be referenced in the API endpoints. */
  id: string;
  /** The object type, which is always "file". */
  object: "file";
  /** The size of the file in bytes. */
  bytes: number;
  /** The Unix timestamp (in seconds) for when the file was created. */
  createdAt: Date;
  /** The name of the file. */
  filename: string;
  /** The intended purpose of the file. Currently, only "fine-tune" is supported. */
  purpose: string;
  /**
   * The current status of the file, which can be either `uploaded`, `processed`, `pending`,
   * `error`, `deleting` or `deleted`.
   */
  status:
    | "uploaded"
    | "processed"
    | "pending"
    | "error"
    | "deleting"
    | "deleted";
  /**
   * Additional details about the status of the file. If the file is in the `error` state, this will
   * include a message describing the error.
   */
  statusDetails?: string | null;
}

export interface FineTuneEvent {
  object: string;
  createdAt: Date;
  level: string;
  message: string;
}

export interface ListFineTunesResponse {
  object: string;
  data: FineTune[];
}

export interface ListFineTuneEventsResponse {
  object: string;
  data: FineTuneEvent[];
}

export interface ListFilesResponse {
  object: string;
  data: OpenAIFile[];
}

export interface CreateFileRequest {
  /**
   * Name of the [JSON Lines](https://jsonlines.readthedocs.io/en/latest/) file to be uploaded.
   *
   * If the `purpose` is set to "fine-tune", the file will be used for fine-tuning.
   */
  file: Uint8Array;
  /**
   * The intended purpose of the uploaded documents. Use "fine-tune" for
   * [fine-tuning](/docs/api-reference/fine-tuning). This allows us to validate the format of the
   * uploaded file.
   */
  purpose: string;
}

export function createFileRequestSerializer(
  item: CreateFileRequest,
): CreateFileRequestRest {
  return {
    file: uint8ArrayToString(item["file"], "base64"),
    purpose: item["purpose"],
  };
}

export interface DeleteFileResponse {
  id: string;
  object: string;
  deleted: boolean;
}

export interface CreateEmbeddingRequest {
  /** ID of the model to use. You can use the [List models](/docs/api-reference/models/list) API to see all of your available models, or see our [Model overview](/docs/models/overview) for descriptions of them. */
  model: string | "text-embedding-ada-002";
  /**
   * Input text to embed, encoded as a string or array of tokens. To embed multiple inputs in a
   * single request, pass an array of strings or array of token arrays. Each input must not exceed
   * the max input tokens for the model (8191 tokens for `text-embedding-ada-002`) and cannot be an empty string.
   * [Example Python code](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb)
   * for counting tokens.
   */
  input: string | string[] | number[] | number[][];
  user?: string;
}

export function createEmbeddingRequestSerializer(
  item: CreateEmbeddingRequest,
): CreateEmbeddingRequestRest {
  return {
    model: item["model"],
    input: item["input"],
    user: item["user"],
  };
}

export interface CreateEmbeddingResponse {
  /** The object type, which is always "embedding". */
  object: "embedding";
  /** The name of the model used to generate the embedding. */
  model: string;
  /** The list of embeddings generated by the model. */
  data: Embedding[];
  /** The usage information for the request. */
  usage: { promptTokens: number; totalTokens: number };
}

/** Represents an embedding vector returned by embedding endpoint. */
export interface Embedding {
  /** The index of the embedding in the list of embeddings. */
  index: number;
  /** The object type, which is always "embedding". */
  object: "embedding";
  /**
   * The embedding vector, which is a list of floats. The length of vector depends on the model as\
   *    * listed in the [embedding guide](/docs/guides/embeddings).
   */
  embedding: number[];
}

export interface CreateEditRequest {
  /**
   * ID of the model to use. You can use the `text-davinci-edit-001` or `code-davinci-edit-001`
   * model with this endpoint.
   */
  model: string | "text-davinci-edit-001" | "code-davinci-edit-001";
  /** The input text to use as a starting point for the edit. */
  input?: string | null;
  /** The instruction that tells the model how to edit the prompt. */
  instruction: string;
  /** How many edits to generate for the input and instruction. */
  n?: number | null;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output
   * more random, while lower values like 0.2 will make it more focused and deterministic.
   *
   * We generally recommend altering this or `top_p` but not both.
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers
   * the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising
   * the top 10% probability mass are considered.
   *
   * We generally recommend altering this or `temperature` but not both.
   */
  topP?: number | null;
}

export function createEditRequestSerializer(
  item: CreateEditRequest,
): CreateEditRequestRest {
  return {
    model: item["model"],
    input: item["input"],
    instruction: item["instruction"],
    n: item["n"],
    temperature: item["temperature"],
    top_p: item["topP"],
  };
}

export interface CreateEditResponse {
  /** The object type, which is always `edit`. */
  object: "edit";
  /** The Unix timestamp (in seconds) of when the edit was created. */
  created: Date;
  /** description: A list of edit choices. Can be more than one if `n` is greater than 1. */
  choices: { text: string; index: number; finishReason: "stop" | "length" }[];
  usage: CompletionUsage;
}

/** Usage statistics for the completion request. */
export interface CompletionUsage {
  /** Number of tokens in the prompt. */
  promptTokens: number;
  /** Number of tokens in the generated completion */
  completionTokens: number;
  /** Total number of tokens used in the request (prompt + completion). */
  totalTokens: number;
}

export interface CreateCompletionRequest {
  /**
   * ID of the model to use. You can use the [List models](/docs/api-reference/models/list) API to
   * see all of your available models, or see our [Model overview](/docs/models/overview) for
   * descriptions of them.
   */
  model:
    | string
    | "babbage-002"
    | "davinci-002"
    | "text-davinci-003"
    | "text-davinci-002"
    | "text-davinci-001"
    | "code-davinci-002"
    | "text-curie-001"
    | "text-babbage-001"
    | "text-ada-001";
  /**
   * The prompt(s) to generate completions for, encoded as a string, array of strings, array of
   * tokens, or array of token arrays.
   *
   * Note that <|endoftext|> is the document separator that the model sees during training, so if a
   * prompt is not specified the model will generate as if from the beginning of a new document.
   */
  prompt: Prompt;
  /** The suffix that comes after a completion of inserted text. */
  suffix?: string | null;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output
   * more random, while lower values like 0.2 will make it more focused and deterministic.
   *
   * We generally recommend altering this or `top_p` but not both.
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers
   * the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising
   * the top 10% probability mass are considered.
   *
   * We generally recommend altering this or `temperature` but not both.
   */
  topP?: number | null;
  /**
   * How many completions to generate for each prompt.
   * **Note:** Because this parameter generates many completions, it can quickly consume your token
   * quota. Use carefully and ensure that you have reasonable settings for `max_tokens` and `stop`.
   */
  n?: number | null;
  /**
   * The maximum number of [tokens](/tokenizer) to generate in the completion.
   *
   * The token count of your prompt plus `max_tokens` cannot exceed the model's context length.
   * [Example Python code](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb)
   * for counting tokens.
   */
  maxTokens?: number | null;
  /** Up to 4 sequences where the API will stop generating further tokens. */
  stop?: Stop;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear
   * in the text so far, increasing the model's likelihood to talk about new topics.
   *
   * [See more information about frequency and presence penalties.](/docs/guides/gpt/parameter-details)
   */
  presencePenalty?: number | null;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing
   * frequency in the text so far, decreasing the model's likelihood to repeat the same line
   * verbatim.
   *
   * [See more information about frequency and presence penalties.](/docs/guides/gpt/parameter-details)
   */
  frequencyPenalty?: number | null;
  /**
   * Modify the likelihood of specified tokens appearing in the completion.
   * Accepts a json object that maps tokens (specified by their token ID in the tokenizer) to an
   * associated bias value from -100 to 100. Mathematically, the bias is added to the logits
   * generated by the model prior to sampling. The exact effect will vary per model, but values
   * between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100
   * should result in a ban or exclusive selection of the relevant token.
   */
  logitBias?: Record<string, number>;
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect
   * abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
   */
  user?: string;
  /**
   * If set, partial message deltas will be sent, like in ChatGPT. Tokens will be sent as data-only
   * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format)
   * as they become available, with the stream terminated by a `data: [DONE]` message.
   * [Example Python code](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_stream_completions.ipynb).
   */
  stream?: boolean | null;
  /**
   * Include the log probabilities on the `logprobs` most likely tokens, as well the chosen tokens.
   * For example, if `logprobs` is 5, the API will return a list of the 5 most likely tokens. The
   * API will always return the `logprob` of the sampled token, so there may be up to `logprobs+1`
   * elements in the response.
   *
   * The maximum value for `logprobs` is 5.
   */
  logprobs?: number | null;
  /** Echo back the prompt in addition to the completion */
  echo?: boolean | null;
  /**
   * Generates `best_of` completions server-side and returns the "best" (the one with the highest
   * log probability per token). Results cannot be streamed.
   *
   * When used with `n`, `best_of` controls the number of candidate completions and `n` specifies
   * how many to return – `best_of` must be greater than `n`.
   *
   * **Note:** Because this parameter generates many completions, it can quickly consume your token
   * quota. Use carefully and ensure that you have reasonable settings for `max_tokens` and `stop`.
   */
  bestOf?: number | null;
}

export function createCompletionRequestSerializer(
  item: CreateCompletionRequest,
): CreateCompletionRequestRest {
  return {
    model: item["model"],
    prompt: item["prompt"],
    suffix: item["suffix"],
    temperature: item["temperature"],
    top_p: item["topP"],
    n: item["n"],
    max_tokens: item["maxTokens"],
    stop: item["stop"],
    presence_penalty: item["presencePenalty"],
    frequency_penalty: item["frequencyPenalty"],
    logit_bias: !item.logitBias
      ? item.logitBias
      : (serializeRecord(item.logitBias as any) as any),
    user: item["user"],
    stream: item["stream"],
    logprobs: item["logprobs"],
    echo: item["echo"],
    best_of: item["bestOf"],
  };
}

/**
 * Represents a completion response from the API. Note: both the streamed and non-streamed response
 * objects share the same shape (unlike the chat endpoint).
 */
export interface CreateCompletionResponse {
  /** A unique identifier for the completion. */
  id: string;
  /** The object type, which is always `text_completion`. */
  object: string;
  /** The Unix timestamp (in seconds) of when the completion was created. */
  created: Date;
  /** The model used for the completion. */
  model: string;
  /** The list of completion choices the model generated for the input. */
  choices: {
    index: number;
    text: string;
    logprobs: {
      tokens: string[];
      tokenLogprobs: number[];
      topLogprobs: Record<string, number>[];
      textOffset: number[];
    } | null;
    finishReason: "stop" | "length" | "content_filter";
  }[];
  usage?: CompletionUsage;
}

export interface CreateFineTuningJobRequest {
  /**
   * The ID of an uploaded file that contains training data.
   *
   * See [upload file](/docs/api-reference/files/upload) for how to upload a file.
   *
   * Your dataset must be formatted as a JSONL file. Additionally, you must upload your file with
   * the purpose `fine-tune`.
   *
   * See the [fine-tuning guide](/docs/guides/fine-tuning) for more details.
   */
  trainingFile: string;
  /**
   * The ID of an uploaded file that contains validation data.
   *
   * If you provide this file, the data is used to generate validation metrics periodically during
   * fine-tuning. These metrics can be viewed in the fine-tuning results file. The same data should
   * not be present in both train and validation files.
   *
   * Your dataset must be formatted as a JSONL file. You must upload your file with the purpose
   * `fine-tune`.
   *
   * See the [fine-tuning guide](/docs/guides/fine-tuning) for more details.
   */
  validationFile?: string | null;
  /**
   * The name of the model to fine-tune. You can select one of the
   * [supported models](/docs/guides/fine-tuning/what-models-can-be-fine-tuned).
   */
  model: string | "babbage-002" | "davinci-002" | "gpt-3.5-turbo";
  /** The hyperparameters used for the fine-tuning job. */
  hyperparameters?: { nEpochs?: "auto" | number };
  /**
   * A string of up to 18 characters that will be added to your fine-tuned model name.
   *
   * For example, a `suffix` of "custom-model-name" would produce a model name like
   * `ft:gpt-3.5-turbo:openai:custom-model-name:7p4lURel`.
   */
  suffix?: string | null;
}

export function createFineTuningJobRequestSerializer(
  item: CreateFineTuningJobRequest,
): CreateFineTuningJobRequestRest {
  return {
    training_file: item["trainingFile"],
    validation_file: item["validationFile"],
    model: item["model"],
    hyperparameters: !item.hyperparameters
      ? undefined
      : { n_epochs: item.hyperparameters?.["nEpochs"] },
    suffix: item["suffix"],
  };
}

export interface FineTuningJob {
  /** The object identifier, which can be referenced in the API endpoints. */
  id: string;
  /** The object type, which is always "fine_tuning.job". */
  object: "fine_tuning.job";
  /** The Unix timestamp (in seconds) for when the fine-tuning job was created. */
  createdAt: Date;
  /**
   * The Unix timestamp (in seconds) for when the fine-tuning job was finished. The value will be
   * null if the fine-tuning job is still running.
   */
  finishedAt: Date | null;
  /** The base model that is being fine-tuned. */
  model: string;
  /**
   * The name of the fine-tuned model that is being created. The value will be null if the
   * fine-tuning job is still running.
   */
  fineTunedModel: string | null;
  /** The organization that owns the fine-tuning job. */
  organizationId: string;
  /**
   * The current status of the fine-tuning job, which can be either `created`, `pending`, `running`,
   * `succeeded`, `failed`, or `cancelled`.
   */
  status:
    | "created"
    | "pending"
    | "running"
    | "succeeded"
    | "failed"
    | "cancelled";
  /**
   * The hyperparameters used for the fine-tuning job. See the
   * [fine-tuning guide](/docs/guides/fine-tuning) for more details.
   */
  hyperparameters: { nEpochs?: "auto" | number };
  /**
   * The file ID used for training. You can retrieve the training data with the
   * [Files API](/docs/api-reference/files/retrieve-contents).
   */
  trainingFile: string;
  /**
   * The file ID used for validation. You can retrieve the validation results with the
   * [Files API](/docs/api-reference/files/retrieve-contents).
   */
  validationFile: string | null;
  /**
   * The compiled results file ID(s) for the fine-tuning job. You can retrieve the results with the
   * [Files API](/docs/api-reference/files/retrieve-contents).
   */
  resultFiles: string[];
  /**
   * The total number of billable tokens processed by this fine tuning job. The value will be null
   * if the fine-tuning job is still running.
   */
  trainedTokens: number | null;
  /**
   * For fine-tuning jobs that have `failed`, this will contain more information on the cause of the
   * failure.
   */
  error: { message?: string; code?: string; param?: string | null } | null;
}

export interface ListPaginatedFineTuningJobsResponse {
  object: string;
  data: FineTuningJob[];
  hasMore: boolean;
}

export interface ListFineTuningJobEventsResponse {
  object: string;
  data: FineTuningJobEvent[];
}

export interface FineTuningJobEvent {
  id: string;
  object: string;
  createdAt: Date;
  level: "info" | "warn" | "error";
  message: string;
}

export interface ChatCompletionRequestMessage {
  /** The role of the messages author. One of `system`, `user`, `assistant`, or `function`. */
  role: "system" | "user" | "assistant" | "function";
  /**
   * The contents of the message. `content` is required for all messages, and may be null for
   * assistant messages with function calls.
   */
  content: string | null;
  /**
   * The name of the author of this message. `name` is required if role is `function`, and it
   * should be the name of the function whose response is in the `content`. May contain a-z,
   * A-Z, 0-9, and underscores, with a maximum length of 64 characters.
   */
  name?: string;
  /** The name and arguments of a function that should be called, as generated by the model. */
  functionCall?: { name: string; arguments: string };
}

export function chatCompletionRequestMessageSerializer(
  item: ChatCompletionRequestMessage,
): ChatCompletionRequestMessageRest {
  return {
    role: item["role"],
    content: item["content"],
    name: item["name"],
    function_call: !item.functionCall
      ? undefined
      : {
          name: item.functionCall?.["name"],
          arguments: item.functionCall?.["arguments"],
        },
  };
}

export interface ChatCompletionFunctions {
  /**
   * The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and
   * dashes, with a maximum length of 64.
   */
  name: string;
  /**
   * A description of what the function does, used by the model to choose when and how to call the
   * function.
   */
  description?: string;
  /**
   * The parameters the functions accepts, described as a JSON Schema object. See the
   * [guide](/docs/guides/gpt/function-calling) for examples, and the
   * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation
   * about the format.\n\nTo describe a function that accepts no parameters, provide the value
   * `{\"type\": \"object\", \"properties\": {}}`.
   */
  parameters: ChatCompletionFunctionParameters;
}

export function chatCompletionFunctionsSerializer(
  item: ChatCompletionFunctions,
): ChatCompletionFunctionsRest {
  return {
    name: item["name"],
    description: item["description"],
    parameters: serializeRecord(item.parameters as any) as any,
  };
}

export interface ChatCompletionFunctionParameters extends Record<string, any> {}

export function chatCompletionFunctionParametersSerializer(
  item: ChatCompletionFunctionParameters,
): ChatCompletionFunctionParametersRest {
  return {
    ...item,
  };
}

export interface ChatCompletionFunctionCallOption {
  /** The name of the function to call. */
  name: string;
}

export function chatCompletionFunctionCallOptionSerializer(
  item: ChatCompletionFunctionCallOption,
): ChatCompletionFunctionCallOptionRest {
  return {
    name: item["name"],
  };
}

export interface CreateChatCompletionRequest {
  /**
   * ID of the model to use. See the [model endpoint compatibility](/docs/models/model-endpoint-compatibility)
   * table for details on which models work with the Chat API.
   */
  model:
    | string
    | "gpt4"
    | "gpt-4-0314"
    | "gpt-4-0613"
    | "gpt-4-32k"
    | "gpt-4-32k-0314"
    | "gpt-4-32k-0613"
    | "gpt-3.5-turbo"
    | "gpt-3.5-turbo-16k"
    | "gpt-3.5-turbo-0301"
    | "gpt-3.5-turbo-0613"
    | "gpt-3.5-turbo-16k-0613";
  /**
   * A list of messages comprising the conversation so far.
   * [Example Python code](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_format_inputs_to_ChatGPT_models.ipynb).
   */
  messages: ChatCompletionRequestMessage[];
  /** A list of functions the model may generate JSON inputs for. */
  functions?: ChatCompletionFunctions[];
  /**
   * Controls how the model responds to function calls. `none` means the model does not call a
   * function, and responds to the end-user. `auto` means the model can pick between an end-user or
   * calling a function.  Specifying a particular function via `{\"name":\ \"my_function\"}` forces the
   * model to call that function. `none` is the default when no functions are present. `auto` is the
   * default if functions are present.
   */
  functionCall?: "none" | "auto" | ChatCompletionFunctionCallOption;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output
   * more random, while lower values like 0.2 will make it more focused and deterministic.
   *
   * We generally recommend altering this or `top_p` but not both.
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers
   * the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising
   * the top 10% probability mass are considered.
   *
   * We generally recommend altering this or `temperature` but not both.
   */
  topP?: number | null;
  /**
   * How many completions to generate for each prompt.
   * **Note:** Because this parameter generates many completions, it can quickly consume your token
   * quota. Use carefully and ensure that you have reasonable settings for `max_tokens` and `stop`.
   */
  n?: number | null;
  /**
   * The maximum number of [tokens](/tokenizer) to generate in the completion.
   *
   * The token count of your prompt plus `max_tokens` cannot exceed the model's context length.
   * [Example Python code](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb)
   * for counting tokens.
   */
  maxTokens?: number | null;
  /** Up to 4 sequences where the API will stop generating further tokens. */
  stop?: Stop;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear
   * in the text so far, increasing the model's likelihood to talk about new topics.
   *
   * [See more information about frequency and presence penalties.](/docs/guides/gpt/parameter-details)
   */
  presencePenalty?: number | null;
  /**
   * Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing
   * frequency in the text so far, decreasing the model's likelihood to repeat the same line
   * verbatim.
   *
   * [See more information about frequency and presence penalties.](/docs/guides/gpt/parameter-details)
   */
  frequencyPenalty?: number | null;
  /**
   * Modify the likelihood of specified tokens appearing in the completion.
   * Accepts a json object that maps tokens (specified by their token ID in the tokenizer) to an
   * associated bias value from -100 to 100. Mathematically, the bias is added to the logits
   * generated by the model prior to sampling. The exact effect will vary per model, but values
   * between -1 and 1 should decrease or increase likelihood of selection; values like -100 or 100
   * should result in a ban or exclusive selection of the relevant token.
   */
  logitBias?: Record<string, number>;
  /**
   * A unique identifier representing your end-user, which can help OpenAI to monitor and detect
   * abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
   */
  user?: string;
  /**
   * If set, partial message deltas will be sent, like in ChatGPT. Tokens will be sent as data-only
   * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format)
   * as they become available, with the stream terminated by a `data: [DONE]` message.
   * [Example Python code](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_stream_completions.ipynb).
   */
  stream?: boolean | null;
}

export function createChatCompletionRequestSerializer(
  item: CreateChatCompletionRequest,
): CreateChatCompletionRequestRest {
  return {
    model: item["model"],
    messages: item["messages"].map(chatCompletionRequestMessageSerializer),
    functions:
      item["functions"] === undefined
        ? item["functions"]
        : item["functions"].map(chatCompletionFunctionsSerializer),
    function_call: item["functionCall"],
    temperature: item["temperature"],
    top_p: item["topP"],
    n: item["n"],
    max_tokens: item["maxTokens"],
    stop: item["stop"],
    presence_penalty: item["presencePenalty"],
    frequency_penalty: item["frequencyPenalty"],
    logit_bias: !item.logitBias
      ? item.logitBias
      : (serializeRecord(item.logitBias as any) as any),
    user: item["user"],
    stream: item["stream"],
  };
}

/** Represents a chat completion response returned by model, based on the provided input. */
export interface CreateChatCompletionResponse {
  /** A unique identifier for the chat completion. */
  id: string;
  /** The object type, which is always `chat.completion`. */
  object: string;
  /** The Unix timestamp (in seconds) of when the chat completion was created. */
  created: Date;
  /** The model used for the chat completion. */
  model: string;
  /** A list of chat completion choices. Can be more than one if `n` is greater than 1. */
  choices: {
    index: number;
    message: ChatCompletionResponseMessage;
    finishReason: "stop" | "length" | "function_call" | "content_filter";
  }[];
  usage?: CompletionUsage;
}

export interface ChatCompletionResponseMessage {
  /** The role of the author of this message. */
  role: "system" | "user" | "assistant" | "function";
  /** The contents of the message. */
  content: string | null;
  /** The name and arguments of a function that should be called, as generated by the model. */
  functionCall?: { name: string; arguments: string };
}

export interface CreateTranslationRequest {
  /**
   * The audio file object (not file name) to translate, in one of these formats: flac, mp3, mp4,
   * mpeg, mpga, m4a, ogg, wav, or webm.
   */
  file: Uint8Array;
  /** ID of the model to use. Only `whisper-1` is currently available. */
  model: string | "whisper-1";
  /**
   * An optional text to guide the model's style or continue a previous audio segment. The
   * [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.
   */
  prompt?: string;
  /**
   * The format of the transcript output, in one of these options: json, text, srt, verbose_json, or
   * vtt.
   */
  responseFormat?: "json" | "text" | "srt" | "verbose_json" | "vtt";
  /**
   * The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more
   * random, while lower values like 0.2 will make it more focused and deterministic. If set to 0,
   * the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to
   * automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
}

export function createTranslationRequestSerializer(
  item: CreateTranslationRequest,
): CreateTranslationRequestRest {
  return {
    file: uint8ArrayToString(item["file"], "base64"),
    model: item["model"],
    prompt: item["prompt"],
    response_format: item["responseFormat"],
    temperature: item["temperature"],
  };
}

export interface CreateTranslationResponse {
  text: string;
}

export interface CreateTranscriptionRequest {
  /**
   * The audio file object (not file name) to transcribe, in one of these formats: flac, mp3, mp4,
   * mpeg, mpga, m4a, ogg, wav, or webm.
   */
  file: Uint8Array;
  /** ID of the model to use. Only `whisper-1` is currently available. */
  model: string | "whisper-1";
  /**
   * An optional text to guide the model's style or continue a previous audio segment. The
   * [prompt](/docs/guides/speech-to-text/prompting) should match the audio language.
   */
  prompt?: string;
  /**
   * The format of the transcript output, in one of these options: json, text, srt, verbose_json, or
   * vtt.
   */
  responseFormat?: "json" | "text" | "srt" | "verbose_json" | "vtt";
  /**
   * The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more
   * random, while lower values like 0.2 will make it more focused and deterministic. If set to 0,
   * the model will use [log probability](https://en.wikipedia.org/wiki/Log_probability) to
   * automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
  /**
   * The language of the input audio. Supplying the input language in
   * [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format will improve accuracy
   * and latency.
   */
  language?: string;
}

export function createTranscriptionRequestSerializer(
  item: CreateTranscriptionRequest,
): CreateTranscriptionRequestRest {
  return {
    file: uint8ArrayToString(item["file"], "base64"),
    model: item["model"],
    prompt: item["prompt"],
    response_format: item["responseFormat"],
    temperature: item["temperature"],
    language: item["language"],
  };
}

export interface CreateTranscriptionResponse {
  text: string;
}

/** This interface for an anonymous model */
interface CreateModerationResponseResult {
  /** Whether the content violates [OpenAI's usage policies](/policies/usage-policies). */
  flagged: boolean;
  /** A list of the categories, and whether they are flagged or not. */
  categories: CreateModerationResponseResultCategories;
  /** A list of the categories along with their scores as predicted by model. */
  categoryScores: CreateModerationResponseResultCategoryScores;
}

/** This interface for an anonymous model */
interface CreateModerationResponseResultCategories {
  /**
   * Content that expresses, incites, or promotes hate based on race, gender, ethnicity,
   * religion, nationality, sexual orientation, disability status, or caste. Hateful content
   * aimed at non-protected groups (e.g., chess players) is harrassment.
   */
  hate: boolean;
  /**
   * Hateful content that also includes violence or serious harm towards the targeted group
   * based on race, gender, ethnicity, religion, nationality, sexual orientation, disability
   * status, or caste.
   */
  "hate/threatening": boolean;
  /** Content that expresses, incites, or promotes harassing language towards any target. */
  harassment: boolean;
  /** Harassment content that also includes violence or serious harm towards any target. */
  "harassment/threatening": boolean;
  /**
   * Content that promotes, encourages, or depicts acts of self-harm, such as suicide, cutting,
   * and eating disorders.
   */
  selfHarm: boolean;
  /**
   * Content where the speaker expresses that they are engaging or intend to engage in acts of
   * self-harm, such as suicide, cutting, and eating disorders.
   */
  "selfHarm/intent": boolean;
  /**
   * Content that encourages performing acts of self-harm, such as suicide, cutting, and eating
   * disorders, or that gives instructions or advice on how to commit such acts.
   */
  "selfHarm/instructive": boolean;
  /**
   * Content meant to arouse sexual excitement, such as the description of sexual activity, or
   * that promotes sexual services (excluding sex education and wellness).
   */
  sexual: boolean;
  /** Sexual content that includes an individual who is under 18 years old. */
  "sexual/minors": boolean;
  /** Content that depicts death, violence, or physical injury. */
  violence: boolean;
  /** Content that depicts death, violence, or physical injury in graphic detail. */
  "violence/graphic": boolean;
}

/** This interface for an anonymous model */
interface CreateModerationResponseResultCategoryScores {
  /** The score for the category 'hate'. */
  hate: number;
  /** The score for the category 'hate/threatening'. */
  "hate/threatening": number;
  /** The score for the category 'harassment'. */
  harassment: number;
  /** The score for the category 'harassment/threatening'. */
  "harassment/threatening": number;
  /** The score for the category 'self-harm'. */
  selfHarm: number;
  /** The score for the category 'self-harm/intent'. */
  "selfHarm/intent": number;
  /** The score for the category 'self-harm/instructive'. */
  "selfHarm/instructive": number;
  /** The score for the category 'sexual'. */
  sexual: number;
  /** The score for the category 'sexual/minors'. */
  "sexual/minors": number;
  /** The score for the category 'violence'. */
  violence: number;
  /** The score for the category 'violence/graphic'. */
  "violence/graphic": number;
}

/** This interface for an anonymous model */
interface FineTuneHyperparams {
  /**
   * The number of epochs to train the model for. An epoch refers to one full cycle through the
   * training dataset.
   */
  nEpochs: number;
  /**
   * The batch size to use for training. The batch size is the number of training examples used to
   * train a single forward and backward pass.
   */
  batchSize: number;
  /** The weight to use for loss on the prompt tokens. */
  promptLossWeight: number;
  /** The learning rate multiplier to use for training. */
  learningRateMultiplier: number;
  /** The classification metrics to compute using the validation dataset at the end of every epoch. */
  computeClassificationMetrics?: boolean;
  /** The positive class to use for computing classification metrics. */
  classificationPositiveClass?: string;
  /** The number of classes to use for computing classification metrics. */
  classificationNClasses?: number;
}

/** This interface for an anonymous model */
interface CreateEmbeddingResponseUsage {
  /** The number of tokens used by the prompt. */
  promptTokens: number;
  /** The total number of tokens used by the request. */
  totalTokens: number;
}

/** This interface for an anonymous model */
interface CreateEditResponseChoice {
  /** The edited result. */
  text: string;
  /** The index of the choice in the list of choices. */
  index: number;
  /**
   * The reason the model stopped generating tokens. This will be `stop` if the model hit a
   * natural stop point or a provided stop sequence, or `length` if the maximum number of tokens
   * specified in the request was reached.
   */
  finishReason: "stop" | "length";
}

/** This interface for an anonymous model */
interface CreateCompletionResponseChoice {
  index: number;
  text: string;
  logprobs: CreateCompletionResponseChoiceLogprobs | null;
  /**
   * The reason the model stopped generating tokens. This will be `stop` if the model hit a
   * natural stop point or a provided stop sequence, or `content_filter` if content was omitted
   * due to a flag from our content filters, `length` if the maximum number of tokens specified
   * in the request was reached, or `content_filter` if content was omitted due to a flag from our
   * content filters.
   */
  finishReason: "stop" | "length" | "content_filter";
}

/** This interface for an anonymous model */
interface CreateCompletionResponseChoiceLogprobs {
  tokens: string[];
  tokenLogprobs: number[];
  topLogprobs: Record<string, number>[];
  textOffset: number[];
}

/** This interface for an anonymous model */
interface FineTuningJobHyperparameters {
  /**
   * The number of epochs to train the model for. An epoch refers to one full cycle through the
   * training dataset.
   *
   * "Auto" decides the optimal number of epochs based on the size of the dataset. If setting the
   * number manually, we support any number between 1 and 50 epochs.
   */
  nEpochs?: "auto" | number;
}

/** This interface for an anonymous model */
interface FineTuningJobError {
  /** A human-readable error message. */
  message?: string;
  /** A machine-readable error code. */
  code?: string;
  /**
   * The parameter that was invalid, usually `training_file` or `validation_file`. This field
   * will be null if the failure was not parameter-specific.
   */
  param?: string | null;
}

/** This interface for an anonymous model */
interface CreateChatCompletionResponseChoice {
  /** The index of the choice in the list of choices. */
  index: number;
  message: ChatCompletionResponseMessage;
  /**
   * The reason the model stopped generating tokens. This will be `stop` if the model hit a
   * natural stop point or a provided stop sequence, `length` if the maximum number of tokens
   * specified in the request was reached, `content_filter` if the content was omitted due to
   * a flag from our content filters, or `function_call` if the model called a function.
   */
  finishReason: "stop" | "length" | "function_call" | "content_filter";
}

/** This interface for an anonymous model */
interface ChatCompletionResponseMessageFunctionCall {
  /** The name of the function to call. */
  name: string;
  /**
   * The arguments to call the function with, as generated by the model in JSON format. Note that
   * the model does not always generate valid JSON, and may hallucinate parameters not defined by
   * your function schema. Validate the arguments in your code before calling your function.
   */
  arguments: string;
}

export interface ChatCompletionResponseMessage {
  /** The role of the author of this message. */
  role: "system" | "user" | "assistant" | "function";
  /** The contents of the message. */
  content: string | null;
  /** The name and arguments of a function that should be called, as generated by the model. */
  functionCall?: ChatCompletionResponseMessageFunctionCall;
}

function _deserializeCreateModerationResponse(
  input: CreateModerationResponseOutput,
): CreateModerationResponse {
  return {
    id: passthroughDeserializer(input["id"]) as any,
    model: passthroughDeserializer(input["model"]) as any,
    results: deserializeArray(
      input["results"],
      deserializeCreateModerationResponseResult,
    ) as any,
  } as any;
}

export const deserializeCreateModerationResponse = withNullChecks(
  _deserializeCreateModerationResponse,
);

function _deserializeErrorResponse(input: ErrorResponseOutput): ErrorResponse {
  return {
    error: deserializeErrorModel(input["error"]) as any,
  } as any;
}

export const deserializeErrorResponse = withNullChecks(
  _deserializeErrorResponse,
);

function _deserializeErrorModel(input: ErrorModelOutput): ErrorModel {
  return {
    type: passthroughDeserializer(input["type"]) as any,
    message: passthroughDeserializer(input["message"]) as any,
    param: passthroughDeserializer(input["param"]) as any,
    code: passthroughDeserializer(input["code"]) as any,
  } as any;
}

export const deserializeErrorModel = withNullChecks(_deserializeErrorModel);

function _deserializeImagesResponse(
  input: ImagesResponseOutput,
): ImagesResponse {
  return {
    created: deserializeUtcDateTime(input["created"]) as any,
    data: deserializeArray(input["data"], deserializeImage) as any,
  } as any;
}

export const deserializeImagesResponse = withNullChecks(
  _deserializeImagesResponse,
);

function _deserializeImage(input: ImageOutput): Image {
  return {
    url: passthroughDeserializer(input["url"]) as any,
    b64Json: deserializeBytes(input["b64_json"], "base64") as any,
  } as any;
}

export const deserializeImage = withNullChecks(_deserializeImage);

function _deserializeListModelsResponse(
  input: ListModelsResponseOutput,
): ListModelsResponse {
  return {
    object: passthroughDeserializer(input["object"]) as any,
    data: deserializeArray(input["data"], deserializeModel) as any,
  } as any;
}

export const deserializeListModelsResponse = withNullChecks(
  _deserializeListModelsResponse,
);

function _deserializeModel(input: ModelOutput): Model {
  return {
    id: passthroughDeserializer(input["id"]) as any,
    object: passthroughDeserializer(input["object"]) as any,
    created: deserializeUtcDateTime(input["created"]) as any,
    ownedBy: passthroughDeserializer(input["owned_by"]) as any,
  } as any;
}

export const deserializeModel = withNullChecks(_deserializeModel);

function _deserializeDeleteModelResponse(
  input: DeleteModelResponseOutput,
): DeleteModelResponse {
  return {
    id: passthroughDeserializer(input["id"]) as any,
    object: passthroughDeserializer(input["object"]) as any,
    deleted: passthroughDeserializer(input["deleted"]) as any,
  } as any;
}

export const deserializeDeleteModelResponse = withNullChecks(
  _deserializeDeleteModelResponse,
);

function _deserializeFineTune(input: FineTuneOutput): FineTune {
  return {
    id: passthroughDeserializer(input["id"]) as any,
    object: passthroughDeserializer(input["object"]) as any,
    createdAt: deserializeUtcDateTime(input["created_at"]) as any,
    updatedAt: deserializeUtcDateTime(input["updated_at"]) as any,
    model: passthroughDeserializer(input["model"]) as any,
    fineTunedModel: passthroughDeserializer(input["fine_tuned_model"]) as any,
    organizationId: passthroughDeserializer(input["organization_id"]) as any,
    status: passthroughDeserializer(input["status"]) as any,
    hyperparams: deserializeFineTuneHyperparams(input["hyperparams"]) as any,
    trainingFiles: deserializeArray(
      input["training_files"],
      deserializeOpenAIFile,
    ) as any,
    validationFiles: deserializeArray(
      input["validation_files"],
      deserializeOpenAIFile,
    ) as any,
    resultFiles: deserializeArray(
      input["result_files"],
      deserializeOpenAIFile,
    ) as any,
    events: deserializeArray(input["events"], deserializeFineTuneEvent) as any,
  } as any;
}

export const deserializeFineTune = withNullChecks(_deserializeFineTune);

function _deserializeOpenAIFile(input: OpenAIFileOutput): OpenAIFile {
  return {
    id: passthroughDeserializer(input["id"]) as any,
    object: passthroughDeserializer(input["object"]) as any,
    bytes: passthroughDeserializer(input["bytes"]) as any,
    createdAt: deserializeUtcDateTime(input["createdAt"]) as any,
    filename: passthroughDeserializer(input["filename"]) as any,
    purpose: passthroughDeserializer(input["purpose"]) as any,
    status: passthroughDeserializer(input["status"]) as any,
    statusDetails: passthroughDeserializer(input["status_details"]) as any,
  } as any;
}

export const deserializeOpenAIFile = withNullChecks(_deserializeOpenAIFile);

function _deserializeFineTuneEvent(input: FineTuneEventOutput): FineTuneEvent {
  return {
    object: passthroughDeserializer(input["object"]) as any,
    createdAt: deserializeUtcDateTime(input["created_at"]) as any,
    level: passthroughDeserializer(input["level"]) as any,
    message: passthroughDeserializer(input["message"]) as any,
  } as any;
}

export const deserializeFineTuneEvent = withNullChecks(
  _deserializeFineTuneEvent,
);

function _deserializeListFineTunesResponse(
  input: ListFineTunesResponseOutput,
): ListFineTunesResponse {
  return {
    object: passthroughDeserializer(input["object"]) as any,
    data: deserializeArray(input["data"], deserializeFineTune) as any,
  } as any;
}

export const deserializeListFineTunesResponse = withNullChecks(
  _deserializeListFineTunesResponse,
);

function _deserializeListFineTuneEventsResponse(
  input: ListFineTuneEventsResponseOutput,
): ListFineTuneEventsResponse {
  return {
    object: passthroughDeserializer(input["object"]) as any,
    data: deserializeArray(input["data"], deserializeFineTuneEvent) as any,
  } as any;
}

export const deserializeListFineTuneEventsResponse = withNullChecks(
  _deserializeListFineTuneEventsResponse,
);

function _deserializeListFilesResponse(
  input: ListFilesResponseOutput,
): ListFilesResponse {
  return {
    object: passthroughDeserializer(input["object"]) as any,
    data: deserializeArray(input["data"], deserializeOpenAIFile) as any,
  } as any;
}

export const deserializeListFilesResponse = withNullChecks(
  _deserializeListFilesResponse,
);

function _deserializeDeleteFileResponse(
  input: DeleteFileResponseOutput,
): DeleteFileResponse {
  return {
    id: passthroughDeserializer(input["id"]) as any,
    object: passthroughDeserializer(input["object"]) as any,
    deleted: passthroughDeserializer(input["deleted"]) as any,
  } as any;
}

export const deserializeDeleteFileResponse = withNullChecks(
  _deserializeDeleteFileResponse,
);

function _deserializeCreateEmbeddingResponse(
  input: CreateEmbeddingResponseOutput,
): CreateEmbeddingResponse {
  return {
    object: passthroughDeserializer(input["object"]) as any,
    model: passthroughDeserializer(input["model"]) as any,
    data: deserializeArray(input["data"], deserializeEmbedding) as any,
    usage: deserializeCreateEmbeddingResponseUsage(input["usage"]) as any,
  } as any;
}

export const deserializeCreateEmbeddingResponse = withNullChecks(
  _deserializeCreateEmbeddingResponse,
);

function _deserializeEmbedding(input: EmbeddingOutput): Embedding {
  return {
    index: passthroughDeserializer(input["index"]) as any,
    object: passthroughDeserializer(input["object"]) as any,
    embedding: deserializeArray(
      input["embedding"],
      passthroughDeserializer,
    ) as any,
  } as any;
}

export const deserializeEmbedding = withNullChecks(_deserializeEmbedding);

function _deserializeCreateEditResponse(
  input: CreateEditResponseOutput,
): CreateEditResponse {
  return {
    object: passthroughDeserializer(input["object"]) as any,
    created: deserializeUtcDateTime(input["created"]) as any,
    choices: deserializeArray(
      input["choices"],
      deserializeCreateEditResponseChoice,
    ) as any,
    usage: deserializeCompletionUsage(input["usage"]) as any,
  } as any;
}

export const deserializeCreateEditResponse = withNullChecks(
  _deserializeCreateEditResponse,
);

function _deserializeCompletionUsage(
  input: CompletionUsageOutput,
): CompletionUsage {
  return {
    promptTokens: passthroughDeserializer(input["prompt_tokens"]) as any,
    completionTokens: passthroughDeserializer(
      input["completion_tokens"],
    ) as any,
    totalTokens: passthroughDeserializer(input["total_tokens"]) as any,
  } as any;
}

export const deserializeCompletionUsage = withNullChecks(
  _deserializeCompletionUsage,
);

function _deserializeCreateCompletionResponse(
  input: CreateCompletionResponseOutput,
): CreateCompletionResponse {
  return {
    id: passthroughDeserializer(input["id"]) as any,
    object: passthroughDeserializer(input["object"]) as any,
    created: deserializeUtcDateTime(input["created"]) as any,
    model: passthroughDeserializer(input["model"]) as any,
    choices: deserializeArray(
      input["choices"],
      deserializeCreateCompletionResponseChoice,
    ) as any,
    usage: deserializeCompletionUsage(input["usage"]) as any,
  } as any;
}

export const deserializeCreateCompletionResponse = withNullChecks(
  _deserializeCreateCompletionResponse,
);

function _deserializeFineTuningJob(input: FineTuningJobOutput): FineTuningJob {
  return {
    id: passthroughDeserializer(input["id"]) as any,
    object: passthroughDeserializer(input["object"]) as any,
    createdAt: deserializeUtcDateTime(input["created_at"]) as any,
    finishedAt: deserializeUtcDateTime(input["finished_at"]) as any,
    model: passthroughDeserializer(input["model"]) as any,
    fineTunedModel: passthroughDeserializer(input["fine_tuned_model"]) as any,
    organizationId: passthroughDeserializer(input["organization_id"]) as any,
    status: passthroughDeserializer(input["status"]) as any,
    hyperparameters: deserializeFineTuningJobHyperparameters(
      input["hyperparameters"],
    ) as any,
    trainingFile: passthroughDeserializer(input["training_file"]) as any,
    validationFile: passthroughDeserializer(input["validation_file"]) as any,
    resultFiles: deserializeArray(
      input["result_files"],
      passthroughDeserializer,
    ) as any,
    trainedTokens: passthroughDeserializer(input["trained_tokens"]) as any,
    error: deserializeFineTuningJobError(input["error"]) as any,
  } as any;
}

export const deserializeFineTuningJob = withNullChecks(
  _deserializeFineTuningJob,
);

function _deserializeListPaginatedFineTuningJobsResponse(
  input: ListPaginatedFineTuningJobsResponseOutput,
): ListPaginatedFineTuningJobsResponse {
  return {
    object: passthroughDeserializer(input["object"]) as any,
    data: deserializeArray(input["data"], deserializeFineTuningJob) as any,
    hasMore: passthroughDeserializer(input["has_more"]) as any,
  } as any;
}

export const deserializeListPaginatedFineTuningJobsResponse = withNullChecks(
  _deserializeListPaginatedFineTuningJobsResponse,
);

function _deserializeListFineTuningJobEventsResponse(
  input: ListFineTuningJobEventsResponseOutput,
): ListFineTuningJobEventsResponse {
  return {
    object: passthroughDeserializer(input["object"]) as any,
    data: deserializeArray(input["data"], deserializeFineTuningJobEvent) as any,
  } as any;
}

export const deserializeListFineTuningJobEventsResponse = withNullChecks(
  _deserializeListFineTuningJobEventsResponse,
);

function _deserializeFineTuningJobEvent(
  input: FineTuningJobEventOutput,
): FineTuningJobEvent {
  return {
    id: passthroughDeserializer(input["id"]) as any,
    object: passthroughDeserializer(input["object"]) as any,
    createdAt: deserializeUtcDateTime(input["created_at"]) as any,
    level: passthroughDeserializer(input["level"]) as any,
    message: passthroughDeserializer(input["message"]) as any,
  } as any;
}

export const deserializeFineTuningJobEvent = withNullChecks(
  _deserializeFineTuningJobEvent,
);

function _deserializeCreateChatCompletionResponse(
  input: CreateChatCompletionResponseOutput,
): CreateChatCompletionResponse {
  return {
    id: passthroughDeserializer(input["id"]) as any,
    object: passthroughDeserializer(input["object"]) as any,
    created: deserializeUtcDateTime(input["created"]) as any,
    model: passthroughDeserializer(input["model"]) as any,
    choices: deserializeArray(
      input["choices"],
      deserializeCreateChatCompletionResponseChoice,
    ) as any,
    usage: deserializeCompletionUsage(input["usage"]) as any,
  } as any;
}

export const deserializeCreateChatCompletionResponse = withNullChecks(
  _deserializeCreateChatCompletionResponse,
);

function _deserializeChatCompletionResponseMessage(
  input: ChatCompletionResponseMessageOutput,
): ChatCompletionResponseMessage {
  return {
    role: passthroughDeserializer(input["role"]) as any,
    content: passthroughDeserializer(input["content"]) as any,
    functionCall: deserializeChatCompletionResponseMessageFunctionCall(
      input["function_call"],
    ) as any,
  } as any;
}

export const deserializeChatCompletionResponseMessage = withNullChecks(
  _deserializeChatCompletionResponseMessage,
);

function _deserializeCreateTranslationResponse(
  input: CreateTranslationResponseOutput,
): CreateTranslationResponse {
  return {
    text: passthroughDeserializer(input["text"]) as any,
  } as any;
}

export const deserializeCreateTranslationResponse = withNullChecks(
  _deserializeCreateTranslationResponse,
);

function _deserializeCreateTranscriptionResponse(
  input: CreateTranscriptionResponseOutput,
): CreateTranscriptionResponse {
  return {
    text: passthroughDeserializer(input["text"]) as any,
  } as any;
}

export const deserializeCreateTranscriptionResponse = withNullChecks(
  _deserializeCreateTranscriptionResponse,
);

function _deserializeCreateModerationResponseResult(
  input: any,
): CreateModerationResponseResult {
  return {
    flagged: passthroughDeserializer(input["flagged"]) as any,
    categories: deserializeCreateModerationResponseResultCategories(
      input["categories"],
    ) as any,
    categoryScores: deserializeCreateModerationResponseResultCategoryScores(
      input["category_scores"],
    ) as any,
  } as any;
}

export const deserializeCreateModerationResponseResult = withNullChecks(
  _deserializeCreateModerationResponseResult,
);

function _deserializeCreateModerationResponseResultCategories(
  input: any,
): CreateModerationResponseResultCategories {
  return {
    hate: passthroughDeserializer(input["hate"]) as any,
    "hate/threatening": passthroughDeserializer(
      input["hate/threatening"],
    ) as any,
    harassment: passthroughDeserializer(input["harassment"]) as any,
    "harassment/threatening": passthroughDeserializer(
      input["harassment/threatening"],
    ) as any,
    selfHarm: passthroughDeserializer(input["self-harm"]) as any,
    "selfHarm/intent": passthroughDeserializer(
      input["self-harm/intent"],
    ) as any,
    "selfHarm/instructive": passthroughDeserializer(
      input["self-harm/instructive"],
    ) as any,
    sexual: passthroughDeserializer(input["sexual"]) as any,
    "sexual/minors": passthroughDeserializer(input["sexual/minors"]) as any,
    violence: passthroughDeserializer(input["violence"]) as any,
    "violence/graphic": passthroughDeserializer(
      input["violence/graphic"],
    ) as any,
  } as any;
}

export const deserializeCreateModerationResponseResultCategories =
  withNullChecks(_deserializeCreateModerationResponseResultCategories);

function _deserializeCreateModerationResponseResultCategoryScores(
  input: any,
): CreateModerationResponseResultCategoryScores {
  return {
    hate: passthroughDeserializer(input["hate"]) as any,
    "hate/threatening": passthroughDeserializer(
      input["hate/threatening"],
    ) as any,
    harassment: passthroughDeserializer(input["harassment"]) as any,
    "harassment/threatening": passthroughDeserializer(
      input["harassment/threatening"],
    ) as any,
    selfHarm: passthroughDeserializer(input["self-harm"]) as any,
    "selfHarm/intent": passthroughDeserializer(
      input["self-harm/intent"],
    ) as any,
    "selfHarm/instructive": passthroughDeserializer(
      input["self-harm/instructive"],
    ) as any,
    sexual: passthroughDeserializer(input["sexual"]) as any,
    "sexual/minors": passthroughDeserializer(input["sexual/minors"]) as any,
    violence: passthroughDeserializer(input["violence"]) as any,
    "violence/graphic": passthroughDeserializer(
      input["violence/graphic"],
    ) as any,
  } as any;
}

export const deserializeCreateModerationResponseResultCategoryScores =
  withNullChecks(_deserializeCreateModerationResponseResultCategoryScores);

function _deserializeFineTuneHyperparams(input: any): FineTuneHyperparams {
  return {
    nEpochs: passthroughDeserializer(input["n_epochs"]) as any,
    batchSize: passthroughDeserializer(input["batch_size"]) as any,
    promptLossWeight: passthroughDeserializer(
      input["prompt_loss_weight"],
    ) as any,
    learningRateMultiplier: passthroughDeserializer(
      input["learning_rate_multiplier"],
    ) as any,
    computeClassificationMetrics: passthroughDeserializer(
      input["compute_classification_metrics"],
    ) as any,
    classificationPositiveClass: passthroughDeserializer(
      input["classification_positive_class"],
    ) as any,
    classificationNClasses: passthroughDeserializer(
      input["classification_n_classes"],
    ) as any,
  } as any;
}

export const deserializeFineTuneHyperparams = withNullChecks(
  _deserializeFineTuneHyperparams,
);

function _deserializeCreateEmbeddingResponseUsage(
  input: any,
): CreateEmbeddingResponseUsage {
  return {
    promptTokens: passthroughDeserializer(input["prompt_tokens"]) as any,
    totalTokens: passthroughDeserializer(input["total_tokens"]) as any,
  } as any;
}

export const deserializeCreateEmbeddingResponseUsage = withNullChecks(
  _deserializeCreateEmbeddingResponseUsage,
);

function _deserializeCreateEditResponseChoice(
  input: any,
): CreateEditResponseChoice {
  return {
    text: passthroughDeserializer(input["text"]) as any,
    index: passthroughDeserializer(input["index"]) as any,
    finishReason: passthroughDeserializer(input["finish_reason"]) as any,
  } as any;
}

export const deserializeCreateEditResponseChoice = withNullChecks(
  _deserializeCreateEditResponseChoice,
);

function _deserializeCreateCompletionResponseChoice(
  input: any,
): CreateCompletionResponseChoice {
  return {
    index: passthroughDeserializer(input["index"]) as any,
    text: passthroughDeserializer(input["text"]) as any,
    logprobs: deserializeCreateCompletionResponseChoiceLogprobs(
      input["logprobs"],
    ) as any,
    finishReason: passthroughDeserializer(input["finish_reason"]) as any,
  } as any;
}

export const deserializeCreateCompletionResponseChoice = withNullChecks(
  _deserializeCreateCompletionResponseChoice,
);

function _deserializeCreateCompletionResponseChoiceLogprobs(
  input: any,
): CreateCompletionResponseChoiceLogprobs {
  return {
    tokens: deserializeArray(input["tokens"], passthroughDeserializer) as any,
    tokenLogprobs: deserializeArray(
      input["token_logprobs"],
      passthroughDeserializer,
    ) as any,
    topLogprobs: deserializeArray(input["top_logprobs"], (i: any) =>
      deserializeRecord(i, passthroughDeserializer),
    ) as any,
    textOffset: deserializeArray(
      input["text_offset"],
      passthroughDeserializer,
    ) as any,
  } as any;
}

export const deserializeCreateCompletionResponseChoiceLogprobs = withNullChecks(
  _deserializeCreateCompletionResponseChoiceLogprobs,
);

function _deserializeFineTuningJobHyperparameters(
  input: any,
): FineTuningJobHyperparameters {
  return {
    nEpochs: passthroughDeserializer(input["n_epochs"]) as any,
  } as any;
}

export const deserializeFineTuningJobHyperparameters = withNullChecks(
  _deserializeFineTuningJobHyperparameters,
);

function _deserializeFineTuningJobError(input: any): FineTuningJobError {
  return {
    message: passthroughDeserializer(input["message"]) as any,
    code: passthroughDeserializer(input["code"]) as any,
    param: passthroughDeserializer(input["param"]) as any,
  } as any;
}

export const deserializeFineTuningJobError = withNullChecks(
  _deserializeFineTuningJobError,
);

function _deserializeCreateChatCompletionResponseChoice(
  input: any,
): CreateChatCompletionResponseChoice {
  return {
    index: passthroughDeserializer(input["index"]) as any,
    message: deserializeChatCompletionResponseMessage(input["message"]) as any,
    finishReason: passthroughDeserializer(input["finish_reason"]) as any,
  } as any;
}

export const deserializeCreateChatCompletionResponseChoice = withNullChecks(
  _deserializeCreateChatCompletionResponseChoice,
);

function _deserializeChatCompletionResponseMessageFunctionCall(
  input: any,
): ChatCompletionResponseMessageFunctionCall {
  return {
    name: passthroughDeserializer(input["name"]) as any,
    arguments: passthroughDeserializer(input["arguments"]) as any,
  } as any;
}

export const deserializeChatCompletionResponseMessageFunctionCall =
  withNullChecks(_deserializeChatCompletionResponseMessageFunctionCall);

/** Alias for Prompt */
export type Prompt = string | string[] | number[] | number[][];
/** Alias for Stop */
export type Stop = string | string[];
