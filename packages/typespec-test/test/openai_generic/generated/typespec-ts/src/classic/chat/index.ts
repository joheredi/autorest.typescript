// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OpenAIContext } from "../../api/openAIContext.js";
import {
  ChatCompletionsOperations,
  getChatCompletionsOperations,
} from "./completions/index.js";

export interface ChatOperations {
  completions: ChatCompletionsOperations;
}

export function getChatOperations(context: OpenAIContext): ChatOperations {
  return {
    completions: getChatCompletionsOperations(context),
  };
}
