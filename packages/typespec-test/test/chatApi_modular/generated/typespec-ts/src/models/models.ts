// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The configuration for a streaming chat completion request. */
export interface StreamingChatCompletionOptionsRecord {
  /** The collection of context messages associated with this completion request. */
  messages: ChatMessage[];
  /** Indicates whether the completion is a streaming or non-streaming completion. */
  stream: true;
  /**
   * Field that allows the chat app to store and retrieve data, the structure of such data is dependant on the backend
   * being used. The client must send back the data in this field unchanged in subsequent requests, until the chat app
   * sends a new one. The data in this field can be used to implement stateful services, such as remembering previous
   * conversations or user preferences.
   */
  sessionState?: any;
  /**
   * Context allows the chat app to receive extra parameters from the client, such as temperature, functions, or
   * customer_info. These parameters are specific to the chat app and not understood by the generic clients.
   */
  context?: Record<string, any>;
}

export function streamingChatCompletionOptionsRecordSerializer(
  item: StreamingChatCompletionOptionsRecord,
): any {
  return {
    messages: chatMessageArraySerializer(item["messages"]),
    stream: item["stream"],
    session_state: item["sessionState"],
    context: item["context"],
  };
}

export function streamingChatCompletionOptionsRecordDeserializer(
  item: any,
): StreamingChatCompletionOptionsRecord {
  return {
    messages: chatMessageArrayDeserializer(item["messages"]),
    stream: item["stream"],
    sessionState: item["session_state"],
    context: item["context"],
  };
}

/** A single, role-attributed message within a chat completion interaction. */
export interface ChatMessage {
  /** The text associated with the message. */
  content: string;
  /** The role associated with the message. */
  role: ChatRole;
  /**
   * Field that allows the chat app to store and retrieve data, the structure of such data is dependant on the backend
   * being used. The client must send back the data in this field unchanged in subsequent requests, until the chat app
   * sends a new one. The data in this field can be used to implement stateful services, such as remembering previous
   * conversations or user preferences.
   */
  sessionState?: any;
}

export function chatMessageSerializer(item: ChatMessage): any {
  return {
    content: item["content"],
    role: chatRoleSerializer(item["role"]),
    session_state: item["sessionState"],
  };
}

export function chatMessageDeserializer(item: any): ChatMessage {
  return {
    content: item["content"],
    role: chatRoleDeserializer(item["role"]),
    sessionState: item["session_state"],
  };
}

/** A representation of the intended purpose of a message. */
export type ChatRole = "user" | "system" | "assistant";

export function chatRoleSerializer(item: ChatRole): any {
  return item;
}

export function chatRoleDeserializer(item: any): ChatRole {
  return item;
}

export function chatMessageArraySerializer(result: Array<ChatMessage>): any[] {
  return result.map((item) => {
    chatMessageSerializer(item);
  });
}

export function chatMessageArrayDeserializer(
  result: Array<ChatMessage>,
): any[] {
  return result.map((item) => {
    chatMessageDeserializer(item);
  });
}

/** A single response to a streaming completion request. */
export interface ChatCompletionChunkRecord {
  /** The collection of choice deltas received in this chunk. */
  choices: ChoiceDeltaRecord[];
}

export function chatCompletionChunkRecordSerializer(
  item: ChatCompletionChunkRecord,
): any {
  return { choices: choiceDeltaRecordArraySerializer(item["choices"]) };
}

export function chatCompletionChunkRecordDeserializer(
  item: any,
): ChatCompletionChunkRecord {
  return {
    choices: choiceDeltaRecordArrayDeserializer(item["choices"]),
  };
}

/** The representation of an incremental choice received in a streaming completion. */
export interface ChoiceDeltaRecord {
  /** The index of the of the chat choice, relative to the other choices in the same completion. */
  index: number;
  /** The partial message received for this choice. */
  delta: ChatMessageDelta;
  /**
   * Field that allows the chat app to store and retrieve data, the structure of such data is dependant on the backend
   * being used. The client must send back the data in this field unchanged in subsequent requests, until the chat app
   * sends a new one. The data in this field can be used to implement stateful services, such as remembering previous
   * conversations or user preferences.
   */
  sessionState?: any;
  /**
   * Context allows the chat app to receive extra parameters from the client, such as temperature, functions, or
   * customer_info. These parameters are specific to the chat app and not understood by the generic clients.
   */
  context?: Record<string, any>;
  /** The reason this chat completion completed its generation. */
  finishReason?: FinishReason;
}

export function choiceDeltaRecordSerializer(item: ChoiceDeltaRecord): any {
  return {
    index: item["index"],
    delta: chatMessageDeltaSerializer(item["delta"]),
    session_state: item["sessionState"],
    context: item["context"],
    finish_reason: !item["finishReason"]
      ? item["finishReason"]
      : finishReasonSerializer(item["finishReason"]),
  };
}

export function choiceDeltaRecordDeserializer(item: any): ChoiceDeltaRecord {
  return {
    index: item["index"],
    delta: chatMessageDeltaDeserializer(item["delta"]),
    sessionState: item["session_state"],
    context: item["context"],
    finishReason: !item["finish_reason"]
      ? item["finish_reason"]
      : finishReasonDeserializer(item["finish_reason"]),
  };
}

/** The representation of a delta message received in a streaming completion. */
export interface ChatMessageDelta {
  /** An incremental part of the text associated with the message. */
  content?: string;
  /** The role associated with the message. */
  role?: ChatRole;
  /**
   * Field that allows the chat app to store and retrieve data, the structure of such data is dependant on the backend
   * being used. The client must send back the data in this field unchanged in subsequent requests, until the chat app
   * sends a new one. The data in this field can be used to implement stateful services, such as remembering previous
   * conversations or user preferences.
   */
  sessionState?: any;
}

export function chatMessageDeltaSerializer(item: ChatMessageDelta): any {
  return {
    content: item["content"],
    role: !item["role"] ? item["role"] : chatRoleSerializer(item["role"]),
    session_state: item["sessionState"],
  };
}

export function chatMessageDeltaDeserializer(item: any): ChatMessageDelta {
  return {
    content: item["content"],
    role: !item["role"] ? item["role"] : chatRoleDeserializer(item["role"]),
    sessionState: item["session_state"],
  };
}

/** Representation of the reason why a chat session has finished processing. */
export type FinishReason = "stop" | "length";

export function finishReasonSerializer(item: FinishReason): any {
  return item;
}

export function finishReasonDeserializer(item: any): FinishReason {
  return item;
}

export function choiceDeltaRecordArraySerializer(
  result: Array<ChoiceDeltaRecord>,
): any[] {
  return result.map((item) => {
    choiceDeltaRecordSerializer(item);
  });
}

export function choiceDeltaRecordArrayDeserializer(
  result: Array<ChoiceDeltaRecord>,
): any[] {
  return result.map((item) => {
    choiceDeltaRecordDeserializer(item);
  });
}

/** The configuration for a chat completion request. */
export interface ChatCompletionOptionsRecord {
  /** The collection of context messages associated with this completion request. */
  messages: ChatMessage[];
  /** Indicates whether the completion is a streaming or non-streaming completion. */
  stream: false;
  /**
   * Field that allows the chat app to store and retrieve data, the structure of such data is dependant on the backend
   * being used. The client must send back the data in this field unchanged in subsequent requests, until the chat app
   * sends a new one. The data in this field can be used to implement stateful services, such as remembering previous
   * conversations or user preferences.
   */
  sessionState?: any;
  /**
   * Context allows the chat app to receive extra parameters from the client, such as temperature, functions, or
   * customer_info. These parameters are specific to the chat app and not understood by the generic clients.
   */
  context?: Record<string, any>;
}

export function chatCompletionOptionsRecordSerializer(
  item: ChatCompletionOptionsRecord,
): any {
  return {
    messages: chatMessageArraySerializer(item["messages"]),
    stream: item["stream"],
    session_state: item["sessionState"],
    context: item["context"],
  };
}

export function chatCompletionOptionsRecordDeserializer(
  item: any,
): ChatCompletionOptionsRecord {
  return {
    messages: chatMessageArrayDeserializer(item["messages"]),
    stream: item["stream"],
    sessionState: item["session_state"],
    context: item["context"],
  };
}

/** Representation of the response to a chat completion request. */
export interface ChatCompletionRecord {
  /** The collection of generated completions. */
  choices: ChatChoiceRecord[];
}

export function chatCompletionRecordSerializer(
  item: ChatCompletionRecord,
): any {
  return { choices: chatChoiceRecordArraySerializer(item["choices"]) };
}

export function chatCompletionRecordDeserializer(
  item: any,
): ChatCompletionRecord {
  return {
    choices: chatChoiceRecordArrayDeserializer(item["choices"]),
  };
}

/** The representation of a single generated completion. */
export interface ChatChoiceRecord {
  /** The index of the of the chat choice, relative to the other choices in the same completion. */
  index: number;
  /** The chat message for a given chat completion. */
  message: ChatMessage;
  /**
   * Field that allows the chat app to store and retrieve data, the structure of such data is dependant on the backend
   * being used. The client must send back the data in this field unchanged in subsequent requests, until the chat app
   * sends a new one. The data in this field can be used to implement stateful services, such as remembering previous
   * conversations or user preferences.
   */
  sessionState?: any;
  /**
   * Context allows the chat app to receive extra parameters from the client, such as temperature, functions, or
   * customer_info. These parameters are specific to the chat app and not understood by the generic clients.
   */
  context?: Record<string, any>;
  /** The reason this chat completion completed its generation. */
  finishReason: FinishReason;
}

export function chatChoiceRecordSerializer(item: ChatChoiceRecord): any {
  return {
    index: item["index"],
    message: chatMessageSerializer(item["message"]),
    session_state: item["sessionState"],
    context: item["context"],
    finish_reason: finishReasonSerializer(item["finishReason"]),
  };
}

export function chatChoiceRecordDeserializer(item: any): ChatChoiceRecord {
  return {
    index: item["index"],
    message: chatMessageDeserializer(item["message"]),
    sessionState: item["session_state"],
    context: item["context"],
    finishReason: finishReasonDeserializer(item["finish_reason"]),
  };
}

export function chatChoiceRecordArraySerializer(
  result: Array<ChatChoiceRecord>,
): any[] {
  return result.map((item) => {
    chatChoiceRecordSerializer(item);
  });
}

export function chatChoiceRecordArrayDeserializer(
  result: Array<ChatChoiceRecord>,
): any[] {
  return result.map((item) => {
    chatChoiceRecordDeserializer(item);
  });
}

/** Type of APIVersion */
export type APIVersion = "2023-10-01-preview";

export function aPIVersionSerializer(item: APIVersion): any {
  return item;
}

export function aPIVersionDeserializer(item: any): APIVersion {
  return item;
}
