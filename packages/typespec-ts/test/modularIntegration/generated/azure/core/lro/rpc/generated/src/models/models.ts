// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "../rest/outputModels.js";
import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import { GenerationResultOutput } from "../rest/outputModels.js";
import { GenerationOptions as GenerationOptionsRest } from "../rest/index.js";

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

function _deserializeGenerationResult(
  input: GenerationResultOutput,
): GenerationResult {
  return {
    data: passthroughDeserializer(input["data"]),
  };
}

export const deserializeGenerationResult = withNullChecks(
  _deserializeGenerationResult,
);

/** The API version. */
export type Versions = "2022-12-01-preview";
