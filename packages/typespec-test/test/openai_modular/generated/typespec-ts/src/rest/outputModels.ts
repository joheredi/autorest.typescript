// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ErrorModel } from "@azure-rest/core-client";

/** Result information for an operation that transcribed spoken audio into written text. */
export interface AudioTranscriptionOutput {
  /** The transcribed text for the provided audio data. */
  text: string;
  /** The label that describes which operation type generated the accompanying response data. */
  task?: AudioTaskLabelOutput;
  /**
   * The spoken language that was detected in the transcribed audio data.
   * This is expressed as a two-letter ISO-639-1 language code like 'en' or 'fr'.
   */
  language?: string;
  /** The total duration of the audio processed to produce accompanying transcription information. */
  duration?: number;
  /** A collection of information about the timing, probabilities, and other detail of each processed audio segment. */
  segments?: Array<AudioTranscriptionSegmentOutput>;
}

/**
 * Extended information about a single segment of transcribed audio data.
 * Segments generally represent roughly 5-10 seconds of speech. Segment boundaries typically occur between words but not
 * necessarily sentences.
 */
export interface AudioTranscriptionSegmentOutput {
  /** The 0-based index of this segment within a transcription. */
  id: number;
  /** The time at which this segment started relative to the beginning of the transcribed audio. */
  start: number;
  /** The time at which this segment ended relative to the beginning of the transcribed audio. */
  end: number;
  /** The transcribed text that was part of this audio segment. */
  text: string;
  /** The temperature score associated with this audio segment. */
  temperature: number;
  /** The average log probability associated with this audio segment. */
  avg_logprob: number;
  /** The compression ratio of this audio segment. */
  compression_ratio: number;
  /** The probability of no speech detection within this audio segment. */
  no_speech_prob: number;
  /** The token IDs matching the transcribed text in this audio segment. */
  tokens: number[];
  /**
   * The seek position associated with the processing of this audio segment.
   * Seek positions are expressed as hundredths of seconds.
   * The model may process several segments from a single seek position, so while the seek position will never represent
   * a later time than the segment's start, the segment's start may represent a significantly later time than the
   * segment's associated seek position.
   */
  seek: number;
}

/** Result information for an operation that translated spoken audio into written text. */
export interface AudioTranslationOutput {
  /** The translated text for the provided audio data. */
  text: string;
  /** The label that describes which operation type generated the accompanying response data. */
  task?: AudioTaskLabelOutput;
  /**
   * The spoken language that was detected in the translated audio data.
   * This is expressed as a two-letter ISO-639-1 language code like 'en' or 'fr'.
   */
  language?: string;
  /** The total duration of the audio processed to produce accompanying translation information. */
  duration?: number;
  /** A collection of information about the timing, probabilities, and other detail of each processed audio segment. */
  segments?: Array<AudioTranslationSegmentOutput>;
}

/**
 * Extended information about a single segment of translated audio data.
 * Segments generally represent roughly 5-10 seconds of speech. Segment boundaries typically occur between words but not
 * necessarily sentences.
 */
export interface AudioTranslationSegmentOutput {
  /** The 0-based index of this segment within a translation. */
  id: number;
  /** The time at which this segment started relative to the beginning of the translated audio. */
  start: number;
  /** The time at which this segment ended relative to the beginning of the translated audio. */
  end: number;
  /** The translated text that was part of this audio segment. */
  text: string;
  /** The temperature score associated with this audio segment. */
  temperature: number;
  /** The average log probability associated with this audio segment. */
  avg_logprob: number;
  /** The compression ratio of this audio segment. */
  compression_ratio: number;
  /** The probability of no speech detection within this audio segment. */
  no_speech_prob: number;
  /** The token IDs matching the translated text in this audio segment. */
  tokens: number[];
  /**
   * The seek position associated with the processing of this audio segment.
   * Seek positions are expressed as hundredths of seconds.
   * The model may process several segments from a single seek position, so while the seek position will never represent
   * a later time than the segment's start, the segment's start may represent a significantly later time than the
   * segment's associated seek position.
   */
  seek: number;
}

/**
 * Representation of the response data from a completions request.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export interface CompletionsOutput {
  /** A unique identifier associated with this completions response. */
  id: string;
  /**
   * The first timestamp associated with generation activity for this completions response,
   * represented as seconds since the beginning of the Unix epoch of 00:00 on 1 Jan 1970.
   */
  created: number;
  /**
   * Content filtering results for zero or more prompts in the request. In a streaming request,
   * results for different prompts may arrive at different times or in different orders.
   */
  prompt_filter_results?: Array<ContentFilterResultsForPromptOutput>;
  /**
   * The collection of completions choices associated with this completions response.
   * Generally, `n` choices are generated per provided prompt with a default value of 1.
   * Token limits and other settings may limit the number of choices generated.
   */
  choices: Array<ChoiceOutput>;
  /** Usage information for tokens processed and generated as part of this completions operation. */
  usage: CompletionsUsageOutput;
}

/** Content filtering results for a single prompt in the request. */
export interface ContentFilterResultsForPromptOutput {
  /** The index of this prompt in the set of prompt results */
  prompt_index: number;
  /** Content filtering results for this prompt */
  content_filter_results: ContentFilterResultDetailsForPromptOutput;
}

/** Information about content filtering evaluated against input data to Azure OpenAI. */
export interface ContentFilterResultDetailsForPromptOutput {
  /**
   * Describes language related to anatomical organs and genitals, romantic relationships,
   *  acts portrayed in erotic or affectionate terms, physical sexual acts, including
   *  those portrayed as an assault or a forced sexual violent act against one’s will,
   *  prostitution, pornography, and abuse.
   */
  sexual?: ContentFilterResultOutput;
  /**
   * Describes language related to physical actions intended to hurt, injure, damage, or
   * kill someone or something; describes weapons, etc.
   */
  violence?: ContentFilterResultOutput;
  /**
   * Describes language attacks or uses that include pejorative or discriminatory language
   * with reference to a person or identity group on the basis of certain differentiating
   * attributes of these groups including but not limited to race, ethnicity, nationality,
   * gender identity and expression, sexual orientation, religion, immigration status, ability
   * status, personal appearance, and body size.
   */
  hate?: ContentFilterResultOutput;
  /**
   * Describes language related to physical actions intended to purposely hurt, injure,
   * or damage one’s body, or kill oneself.
   */
  self_harm?: ContentFilterResultOutput;
  /** Describes whether profanity was detected. */
  profanity?: ContentFilterDetectionResultOutput;
  /** Describes detection results against configured custom blocklists. */
  custom_blocklists?: Array<ContentFilterBlocklistIdResultOutput>;
  /**
   * Describes an error returned if the content filtering system is
   * down or otherwise unable to complete the operation in time.
   */
  error?: ErrorModel;
  /** Whether a jailbreak attempt was detected in the prompt. */
  jailbreak?: ContentFilterDetectionResultOutput;
}

/** Information about filtered content severity level and if it has been filtered or not. */
export interface ContentFilterResultOutput {
  /** Ratings for the intensity and risk level of filtered content. */
  severity: ContentFilterSeverityOutput;
  /** A value indicating whether or not the content has been filtered. */
  filtered: boolean;
}

/** Represents the outcome of a detection operation performed by content filtering. */
export interface ContentFilterDetectionResultOutput {
  /** A value indicating whether or not the content has been filtered. */
  filtered: boolean;
  /** A value indicating whether detection occurred, irrespective of severity or whether the content was filtered. */
  detected: boolean;
}

/** Represents the outcome of an evaluation against a custom blocklist as performed by content filtering. */
export interface ContentFilterBlocklistIdResultOutput {
  /** The ID of the custom blocklist evaluated. */
  id: string;
  /** A value indicating whether or not the content has been filtered. */
  filtered: boolean;
}

/**
 * The representation of a single prompt completion as part of an overall completions request.
 * Generally, `n` choices are generated per provided prompt with a default value of 1.
 * Token limits and other settings may limit the number of choices generated.
 */
export interface ChoiceOutput {
  /** The generated text for a given completions prompt. */
  text: string;
  /** The ordered index associated with this completions choice. */
  index: number;
  /**
   * Information about the content filtering category (hate, sexual, violence, self_harm), if it
   * has been detected, as well as the severity level (very_low, low, medium, high-scale that
   * determines the intensity and risk level of harmful content) and if it has been filtered or not.
   */
  content_filter_results?: ContentFilterResultsForChoiceOutput;
  /** The log probabilities model for tokens associated with this completions choice. */
  logprobs: CompletionsLogProbabilityModelOutput | null;
  /** Reason for finishing */
  finish_reason: CompletionsFinishReasonOutput | null;
}

/** Information about content filtering evaluated against generated model output. */
export interface ContentFilterResultsForChoiceOutput {
  /**
   * Describes language related to anatomical organs and genitals, romantic relationships,
   *  acts portrayed in erotic or affectionate terms, physical sexual acts, including
   *  those portrayed as an assault or a forced sexual violent act against one’s will,
   *  prostitution, pornography, and abuse.
   */
  sexual?: ContentFilterResultOutput;
  /**
   * Describes language related to physical actions intended to hurt, injure, damage, or
   * kill someone or something; describes weapons, etc.
   */
  violence?: ContentFilterResultOutput;
  /**
   * Describes language attacks or uses that include pejorative or discriminatory language
   * with reference to a person or identity group on the basis of certain differentiating
   * attributes of these groups including but not limited to race, ethnicity, nationality,
   * gender identity and expression, sexual orientation, religion, immigration status, ability
   * status, personal appearance, and body size.
   */
  hate?: ContentFilterResultOutput;
  /**
   * Describes language related to physical actions intended to purposely hurt, injure,
   * or damage one’s body, or kill oneself.
   */
  self_harm?: ContentFilterResultOutput;
  /** Describes whether profanity was detected. */
  profanity?: ContentFilterDetectionResultOutput;
  /** Describes detection results against configured custom blocklists. */
  custom_blocklists?: Array<ContentFilterBlocklistIdResultOutput>;
  /**
   * Describes an error returned if the content filtering system is
   * down or otherwise unable to complete the operation in time.
   */
  error?: ErrorModel;
  /** Information about detection of protected text material. */
  protected_material_text?: ContentFilterDetectionResultOutput;
  /** Information about detection of protected code material. */
  protected_material_code?: ContentFilterCitedDetectionResultOutput;
}

/** Represents the outcome of a detection operation against protected resources as performed by content filtering. */
export interface ContentFilterCitedDetectionResultOutput {
  /** A value indicating whether or not the content has been filtered. */
  filtered: boolean;
  /** A value indicating whether detection occurred, irrespective of severity or whether the content was filtered. */
  detected: boolean;
  /** The internet location associated with the detection. */
  URL?: string;
  /** The license description associated with the detection. */
  license: string;
}

/** Representation of a log probabilities model for a completions generation. */
export interface CompletionsLogProbabilityModelOutput {
  /** The textual forms of tokens evaluated in this probability model. */
  tokens: string[];
  /** A collection of log probability values for the tokens in this completions data. */
  token_logprobs: (number | null)[];
  /** A mapping of tokens to maximum log probability values in this completions data. */
  top_logprobs: Record<string, number | null>[];
  /** The text offsets associated with tokens in this completions data. */
  text_offset: number[];
}

/**
 * Representation of the token counts processed for a completions request.
 * Counts consider all tokens across prompts, choices, choice alternates, best_of generations, and
 * other consumers.
 */
export interface CompletionsUsageOutput {
  /** The number of tokens generated across all completions emissions. */
  completion_tokens: number;
  /** The number of tokens in the provided prompts for the completions request. */
  prompt_tokens: number;
  /** The total number of tokens processed for the completions request and response. */
  total_tokens: number;
}

/**
 * An abstract representation of a tool call that must be resolved in a subsequent request to perform the requested
 * chat completion.
 */
export interface ChatCompletionsToolCallOutputParent {
  /** The ID of the tool call. */
  id: string;
  type: string;
}

/**
 * A tool call to a function tool, issued by the model in evaluation of a configured function tool, that represents
 * a function invocation needed for a subsequent chat completions request to resolve.
 */
export interface ChatCompletionsFunctionToolCallOutput
  extends ChatCompletionsToolCallOutputParent {
  /** The type of tool call, in this case always 'function'. */
  type: "function";
  /** The details of the function invocation requested by the tool call. */
  function: FunctionCallOutput;
}

/** The name and arguments of a function that should be called, as generated by the model. */
export interface FunctionCallOutput {
  /** The name of the function to call. */
  name: string;
  /**
   * The arguments to call the function with, as generated by the model in JSON format.
   * Note that the model does not always generate valid JSON, and may hallucinate parameters
   * not defined by your function schema. Validate the arguments in your code before calling
   * your function.
   */
  arguments: string;
}

/**
 * Representation of the response data from a chat completions request.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export interface ChatCompletionsOutput {
  /** A unique identifier associated with this chat completions response. */
  id: string;
  /**
   * The first timestamp associated with generation activity for this completions response,
   * represented as seconds since the beginning of the Unix epoch of 00:00 on 1 Jan 1970.
   */
  created: number;
  /**
   * The collection of completions choices associated with this completions response.
   * Generally, `n` choices are generated per provided prompt with a default value of 1.
   * Token limits and other settings may limit the number of choices generated.
   */
  choices: Array<ChatChoiceOutput>;
  /**
   * Content filtering results for zero or more prompts in the request. In a streaming request,
   * results for different prompts may arrive at different times or in different orders.
   */
  prompt_filter_results?: Array<ContentFilterResultsForPromptOutput>;
  /**
   * Can be used in conjunction with the `seed` request parameter to understand when backend changes have been made that
   * might impact determinism.
   */
  system_fingerprint?: string;
  /** Usage information for tokens processed and generated as part of this completions operation. */
  usage: CompletionsUsageOutput;
}

/**
 * The representation of a single prompt completion as part of an overall chat completions request.
 * Generally, `n` choices are generated per provided prompt with a default value of 1.
 * Token limits and other settings may limit the number of choices generated.
 */
export interface ChatChoiceOutput {
  /** The chat message for a given chat completions prompt. */
  message?: ChatResponseMessageOutput;
  /** The log probability information for this choice, as enabled via the 'logprobs' request option. */
  logprobs: ChatChoiceLogProbabilityInfoOutput | null;
  /** The ordered index associated with this chat completions choice. */
  index: number;
  /** The reason that this chat completions choice completed its generated. */
  finish_reason: CompletionsFinishReasonOutput | null;
  /**
   * The reason the model stopped generating tokens, together with any applicable details.
   * This structured representation replaces 'finish_reason' for some models.
   */
  finish_details?: ChatFinishDetailsOutput;
  /** The delta message content for a streaming response. */
  delta?: ChatResponseMessageOutput;
  /**
   * Information about the content filtering category (hate, sexual, violence, self_harm), if it
   * has been detected, as well as the severity level (very_low, low, medium, high-scale that
   * determines the intensity and risk level of harmful content) and if it has been filtered or not.
   */
  content_filter_results?: ContentFilterResultsForChoiceOutput;
  /**
   * Represents the output results of Azure OpenAI enhancements to chat completions, as configured via the matching input
   * provided in the request. This supplementary information is only available when using Azure OpenAI and only when the
   * request is configured to use enhancements.
   */
  enhancements?: AzureChatEnhancementsOutput;
}

/** A representation of a chat message as received in a response. */
export interface ChatResponseMessageOutput {
  /** The chat role associated with the message. */
  role: ChatRoleOutput;
  /** The content of the message. */
  content: string | null;
  /**
   * The tool calls that must be resolved and have their outputs appended to subsequent input messages for the chat
   * completions request to resolve as configured.
   */
  tool_calls?: Array<ChatCompletionsToolCallOutput>;
  /**
   * The function call that must be resolved and have its output appended to subsequent input messages for the chat
   * completions request to resolve as configured.
   */
  function_call?: FunctionCallOutput;
  /**
   * If Azure OpenAI chat extensions are configured, this array represents the incremental steps performed by those
   * extensions while processing the chat completions request.
   */
  context?: AzureChatExtensionsMessageContextOutput;
}

/**
 *   A representation of the additional context information available when Azure OpenAI chat extensions are involved
 *   in the generation of a corresponding chat completions response. This context information is only populated when
 *   using an Azure OpenAI request configured to use a matching extension.
 */
export interface AzureChatExtensionsMessageContextOutput {
  /**
   *   The contextual information associated with the Azure chat extensions used for a chat completions request.
   *   These messages describe the data source retrievals, plugin invocations, and other intermediate steps taken in the
   *   course of generating a chat completions response that was augmented by capabilities from Azure OpenAI chat
   *   extensions.
   */
  citations?: Array<AzureChatExtensionDataSourceResponseCitationOutput>;
  /** The detected intent from the chat history, used to pass to the next turn to carry over the context. */
  intent?: string;
}

/**
 * A single instance of additional context information available when Azure OpenAI chat extensions are involved
 * in the generation of a corresponding chat completions response. This context information is only populated when
 * using an Azure OpenAI request configured to use a matching extension.
 */
export interface AzureChatExtensionDataSourceResponseCitationOutput {
  /** The content of the citation. */
  content: string;
  /** The title of the citation. */
  title?: string;
  /** The URL of the citation. */
  url?: string;
  /** The file path of the citation. */
  filepath?: string;
  /** The chunk ID of the citation. */
  chunk_id?: string;
}

/** Log probability information for a choice, as requested via 'logprobs' and 'top_logprobs'. */
export interface ChatChoiceLogProbabilityInfoOutput {
  /** The list of log probability information entries for the choice's message content tokens, as requested via the 'logprobs' option. */
  content: Array<ChatTokenLogProbabilityResultOutput> | null;
}

/** A representation of the log probability information for a single content token, including a list of most likely tokens if 'top_logprobs' were requested. */
export interface ChatTokenLogProbabilityResultOutput {
  /** The message content token. */
  token: string;
  /** The log probability of the message content token. */
  logprob: number;
  /** A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be null if there is no bytes representation for the token. */
  bytes: number[] | null;
  /** The list of most likely tokens and their log probability information, as requested via 'top_logprobs'. */
  top_logprobs: Array<ChatTokenLogProbabilityInfoOutput> | null;
}

/** A representation of the log probability information for a single message content token. */
export interface ChatTokenLogProbabilityInfoOutput {
  /** The message content token. */
  token: string;
  /** The log probability of the message content token. */
  logprob: number;
  /** A list of integers representing the UTF-8 bytes representation of the token. Useful in instances where characters are represented by multiple tokens and their byte representations must be combined to generate the correct text representation. Can be null if there is no bytes representation for the token. */
  bytes: number[] | null;
}

/** An abstract representation of structured information about why a chat completions response terminated. */
export interface ChatFinishDetailsOutputParent {
  type: string;
}

/** A structured representation of a stop reason that signifies natural termination by the model. */
export interface StopFinishDetailsOutput extends ChatFinishDetailsOutputParent {
  /** The object type, which is always 'stop' for this object. */
  type: "stop";
  /** The token sequence that the model terminated with. */
  stop: string;
}

/**
 * A structured representation of a stop reason that signifies a token limit was reached before the model could naturally
 * complete.
 */
export interface MaxTokensFinishDetailsOutput
  extends ChatFinishDetailsOutputParent {
  /** The object type, which is always 'max_tokens' for this object. */
  type: "max_tokens";
}

/**
 * Represents the output results of Azure enhancements to chat completions, as configured via the matching input provided
 * in the request.
 */
export interface AzureChatEnhancementsOutput {
  /** The grounding enhancement that returns the bounding box of the objects detected in the image. */
  grounding?: AzureGroundingEnhancementOutput;
}

/** The grounding enhancement that returns the bounding box of the objects detected in the image. */
export interface AzureGroundingEnhancementOutput {
  /** The lines of text detected by the grounding enhancement. */
  lines: Array<AzureGroundingEnhancementLineOutput>;
}

/** A content line object consisting of an adjacent sequence of content elements, such as words and selection marks. */
export interface AzureGroundingEnhancementLineOutput {
  /** The text within the line. */
  text: string;
  /** An array of spans that represent detected objects and its bounding box information. */
  spans: Array<AzureGroundingEnhancementLineSpanOutput>;
}

/** A span object that represents a detected object and its bounding box information. */
export interface AzureGroundingEnhancementLineSpanOutput {
  /** The text content of the span that represents the detected object. */
  text: string;
  /**
   * The character offset within the text where the span begins. This offset is defined as the position of the first
   * character of the span, counting from the start of the text as Unicode codepoints.
   */
  offset: number;
  /** The length of the span in characters, measured in Unicode codepoints. */
  length: number;
  /** An array of objects representing points in the polygon that encloses the detected object. */
  polygon: Array<AzureGroundingEnhancementCoordinatePointOutput>;
}

/** A representation of a single polygon point as used by the Azure grounding enhancement. */
export interface AzureGroundingEnhancementCoordinatePointOutput {
  /** The x-coordinate (horizontal axis) of the point. */
  x: number;
  /** The y-coordinate (vertical axis) of the point. */
  y: number;
}

/** The result of a successful image generation operation. */
export interface ImageGenerationsOutput {
  /**
   * A timestamp representing when this operation was started.
   * Expressed in seconds since the Unix epoch of 1970-01-01T00:00:00+0000.
   */
  created: number;
  /** The images generated by the operation. */
  data: Array<ImageGenerationDataOutput>;
}

/**
 * A representation of a single generated image, provided as either base64-encoded data or as a URL from which the image
 * may be retrieved.
 */
export interface ImageGenerationDataOutput {
  /** The URL that provides temporary access to download the generated image. */
  url?: string;
  /** The complete data for an image, represented as a base64-encoded string. */
  b64_json?: string;
  /**
   * The final prompt used by the model to generate the image.
   * Only provided with dall-3-models and only when revisions were made to the prompt.
   */
  revised_prompt?: string;
}

/**
 * Representation of the response data from an embeddings request.
 * Embeddings measure the relatedness of text strings and are commonly used for search, clustering,
 * recommendations, and other similar scenarios.
 */
export interface EmbeddingsOutput {
  /** Embedding values for the prompts submitted in the request. */
  data: Array<EmbeddingItemOutput>;
  /** Usage counts for tokens input using the embeddings API. */
  usage: EmbeddingsUsageOutput;
}

/** Representation of a single embeddings relatedness comparison. */
export interface EmbeddingItemOutput {
  /**
   * List of embeddings value for the input prompt. These represent a measurement of the
   * vector-based relatedness of the provided input.
   */
  embedding: number[];
  /** Index of the prompt to which the EmbeddingItem corresponds. */
  index: number;
}

/** Measurement of the amount of tokens used in this request and response. */
export interface EmbeddingsUsageOutput {
  /** Number of tokens sent in the original request. */
  prompt_tokens: number;
  /** Total number of tokens transacted in this request/response. */
  total_tokens: number;
}

/**
 * An abstract representation of a tool call that must be resolved in a subsequent request to perform the requested
 * chat completion.
 */
export type ChatCompletionsToolCallOutput =
  | ChatCompletionsToolCallOutputParent
  | ChatCompletionsFunctionToolCallOutput;
/** An abstract representation of structured information about why a chat completions response terminated. */
export type ChatFinishDetailsOutput =
  | ChatFinishDetailsOutputParent
  | StopFinishDetailsOutput
  | MaxTokensFinishDetailsOutput;
/** Defines the possible descriptors for available audio operation responses. */
export type AudioTaskLabelOutput = "transcribe" | "translate";
/** Ratings for the intensity and risk level of harmful content. */
export type ContentFilterSeverityOutput = "safe" | "low" | "medium" | "high";
/** Representation of the manner in which a completions response concluded. */
export type CompletionsFinishReasonOutput =
  | "stop"
  | "length"
  | "content_filter"
  | "function_call"
  | "tool_calls";
/** A description of the intended purpose of a message within a chat completions interaction. */
export type ChatRoleOutput =
  | "system"
  | "assistant"
  | "user"
  | "function"
  | "tool";
