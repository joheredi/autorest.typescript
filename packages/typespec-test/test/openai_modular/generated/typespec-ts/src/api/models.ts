// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** */
export interface DeploymentEmbeddingsOptionsEmbeddings {
  /** Type of the data field */
  object: "list";
  /** Embedding values for the prompts submitted in the request */
  data: EmbeddingItem[];
  /** ID of the model to use */
  model?: string;
  /** Usage counts for tokens input using the embeddings API */
  usage: EmbeddingsUsage;
}

/** Expected response schema to embeddings object list item request */
export interface EmbeddingItem {
  /** Name of the field in which the embedding is contained */
  object: "embedding";
  /** List of embeddings value for the input prompt. These represents a measurement of releated of text strings */
  embedding: number[];
  /** Index of the prompt to which the EmbeddingItem corresponds */
  index: number;
}

/** Measurment of the amount of tokens used in this request and response */
export interface EmbeddingsUsage {
  /** Number of tokens sent in the original request */
  promptTokens: number;
  /** Total number of tokens transacted in this request/response */
  totalTokens: number;
}

/** */
export interface EmbeddingsOptions {
  /** The ID of the end-user, for use in tracking and rate-limiting. */
  user?: string;
  /** input type of embedding search to use */
  inputType?: string;
  /** ID of the model to use */
  model?: string;
  /**
   * Input text to get embeddings for, encoded as a string.
   * To get embeddings for multiple inputs in a single request, pass an array of strings.
   * Each input must not exceed 2048 tokens in length.
   *
   * Unless you are embedding code, we suggest replacing newlines (\n) in your input with a single space,
   * as we have observed inferior results when newlines are present.
   */
  input: string | string[];
}

/** */
export interface DeploymentCompletionsOptionsCompletions {
  /** Id for completion response */
  id?: string;
  /** Object for completion response */
  object: "text_completion";
  /** Created time for completion response */
  created?: number;
  /** Model used for completion response */
  model?: string;
  /** Array of choices returned containing text completions to prompts sent */
  choices?: Choice[];
  /** Usage counts for tokens input using the completions API */
  usage: CompletionsUsage;
}

/** Choice model within completion response */
export interface Choice {
  /** Generated text for given completion prompt */
  text?: string;
  /** Index */
  index?: number;
  /** Log Prob Model */
  logprobs?: CompletionsLogProbs;
  /** Reason for finishing */
  finishReason?: string;
}

/** LogProbs model within completion choice */
export interface CompletionsLogProbs {
  /** Tokens */
  tokens?: string[];
  /** LogProbs of Tokens */
  tokenLogprobs?: number[];
  /** Top LogProbs */
  topLogprobs?: Record<string, number>[];
  /** Text offset */
  textOffset?: number[];
}

/**
 * Representation of the token counts processed for a completions request.
 * Counts consider all tokens across prompts, choices, choice alternates, best_of generations, and other consumers.
 */
export interface CompletionsUsage {
  /** Number of tokens received in the completion */
  completionTokens: number;
  /** Number of tokens sent in the original request */
  promptTokens: number;
  /** Total number of tokens transacted in this request/response */
  totalTokens: number;
}

/** */
export interface CompletionsOptions {
  /**
   * An optional prompt to complete from, encoded as a string, a list of strings, or
   * a list of token lists. Defaults to <|endoftext|>. The prompt to complete from.
   * If you would like to provide multiple prompts, use the POST variant of this
   * method. Note that <|endoftext|> is the document separator that the model sees
   * during training, so if a prompt is not specified the model will generate as if
   * from the beginning of a new document. Maximum allowed size of string list is
   * 2048.
   */
  prompt?: string[];
  /** The maximum number of tokens to generate. Has minimum of 0. */
  maxTokens?: number;
  /**
   * What sampling temperature to use. Higher values means the model will take more
   * risks. Try 0.9 for more creative applications, and 0 (argmax sampling) for ones
   * with a well-defined answer.
   * We generally recommend using this or `top_p` but
   * not both.
   * Minimum of 0 and maximum of 2 allowed.
   *
   */
  temperature?: number;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the
   * model considers the results of the tokens with top_p probability mass. So 0.1
   * means only the tokens comprising the top 10% probability mass are
   * considered.
   * We generally recommend using this or `temperature` but not
   * both.
   * Minimum of 0 and maximum of 1 allowed.
   *
   */
  topP?: number;
  /**
   * Defaults to null. Modify the likelihood of specified tokens appearing in the
   * completion. Accepts a json object that maps tokens (specified by their token ID
   * in the GPT tokenizer) to an associated bias value from -100 to 100. You can use
   * this tokenizer tool (which works for both GPT-2 and GPT-3) to convert text to
   * token IDs. Mathematically, the bias is added to the logits generated by the
   * model prior to sampling. The exact effect will vary per model, but values
   * between -1 and 1 should decrease or increase likelihood of selection; values
   * like -100 or 100 should result in a ban or exclusive selection of the relevant
   * token. As an example, you can pass {"50256" &#58; -100} to prevent the
   * <|endoftext|> token from being generated.
   */
  logitBias?: Record<string, number>;
  /** The ID of the end-user, for use in tracking and rate-limiting. */
  user?: string;
  /**
   * How many snippets to generate for each prompt. Minimum of 1 and maximum of 128
   * allowed.
   */
  n?: number;
  /**
   * Include the log probabilities on the `logprobs` most likely tokens, as well the
   * chosen tokens. So for example, if `logprobs` is 10, the API will return a list
   * of the 10 most likely tokens. If `logprobs` is 0, only the chosen tokens will
   * have logprobs returned. Minimum of 0 and maximum of 100 allowed.
   */
  logprobs?: number;
  /** The name of the model to use */
  model?: string;
  /** Echo back the prompt in addition to the completion */
  echo?: boolean;
  /** A sequence which indicates the end of the current document. */
  stop?: string[];
  /** Completion configuration */
  completionConfig?: string;
  /**
   * can be used to disable any server-side caching, 0=no cache, 1=prompt prefix
   * enabled, 2=full cache
   */
  cacheLevel?: number;
  /**
   * How much to penalize new tokens based on their existing frequency in the text
   * so far. Decreases the model's likelihood to repeat the same line verbatim. Has
   * minimum of -2 and maximum of 2.
   */
  presencePenalty?: number;
  /**
   * How much to penalize new tokens based on whether they appear in the text so
   * far. Increases the model's likelihood to talk about new topics.
   */
  frequencyPenalty?: number;
  /**
   * How many generations to create server side, and display only the best. Will not
   * stream intermediate progress if best_of > 1. Has maximum value of 128.
   */
  bestOf?: number;
}