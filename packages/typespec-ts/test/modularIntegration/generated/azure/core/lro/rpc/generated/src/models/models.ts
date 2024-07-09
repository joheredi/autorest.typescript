// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import {
  GenerationOptions as GenerationOptionsRest,
  GenerationResultOutput,
} from "../rest/index.js";

/** Options for the generation. */
export interface GenerationOptions {
  /** Prompt. */
  prompt: string;
}

export function generationOptionsSerializer(
  item: GenerationOptions,
): GenerationOptionsRest {
  return {
    prompt: item["prompt"],
  };
}

/** Result of the generation. */
export interface GenerationResult {
  /** The data. */
  data: string;
}

/** The API version. */
export type Versions = "2022-12-01-preview";

function _deserializeGenerationResult(
  input: GenerationResultOutput,
): GenerationResult {
  return {
    data: passthroughDeserializer(input["data"]) as any,
  } as any;
}

export const deserializeGenerationResult = withNullChecks(
  _deserializeGenerationResult,
);
