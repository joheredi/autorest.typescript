// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../helpers/serializerHelpers.js";

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
): Record<string, unknown> {
  return {
    messages: item["messages"].map(chatMessageSerializer),
    stream: item["stream"],
    session_state: item["sessionState"],
    context: !item.context
      ? item.context
      : (serializeRecord(item.context as any) as any),
  };
}

export function streamingChatCompletionOptionsRecordDeserializer(
  item: any,
): StreamingChatCompletionOptionsRecord {
  return {
    messages: item["messages"],
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

export function chatMessageSerializer(
  item: ChatMessage,
): Record<string, unknown> {
  return {
    content: item["content"],
    role: item["role"],
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

/** A single response to a streaming completion request. */
export interface ChatCompletionChunkRecord {
  /** The collection of choice deltas received in this chunk. */
  choices: ChoiceDeltaRecord[];
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

/** Representation of the reason why a chat session has finished processing. */
export type FinishReason = "stop" | "length";

export function finishReasonSerializer(item: FinishReason): any {
  return item;
}

export function finishReasonDeserializer(item: any): FinishReason {
  return item;
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
): Record<string, unknown> {
  return {
    messages: item["messages"].map(chatMessageSerializer),
    stream: item["stream"],
    session_state: item["sessionState"],
    context: !item.context
      ? item.context
      : (serializeRecord(item.context as any) as any),
  };
}

export function chatCompletionOptionsRecordDeserializer(
  item: any,
): ChatCompletionOptionsRecord {
  return {
    messages: item["messages"],
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

export type APIVersion = "2023-10-01-preview";

export function aPIVersionSerializer(item: APIVersion): any {
  return item;
}

export function aPIVersionDeserializer(item: any): APIVersion {
  return item;
}
