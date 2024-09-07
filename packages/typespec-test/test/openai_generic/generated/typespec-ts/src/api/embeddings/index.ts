// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OpenAIContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import {
  CreateEmbeddingRequest,
  CreateEmbeddingResponse,
} from "../../models/models.js";
import {
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import { EmbeddingsCreateOptionalParams } from "../../models/options.js";

export function _createSend(
  context: Client,
  embedding: CreateEmbeddingRequest,
  options: EmbeddingsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/embeddings")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        model: embedding["model"],
        input: embedding["input"],
        user: embedding["user"],
      },
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<CreateEmbeddingResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    object: result.body["object"],
    model: result.body["model"],
    data: result.body["data"].map((p: any) => {
      return {
        index: p["index"],
        object: p["object"],
        embedding: p["embedding"],
      };
    }),
    usage: {
      prompt_tokens: result.body.usage["prompt_tokens"],
      total_tokens: result.body.usage["total_tokens"],
    },
  };
}

export async function create(
  context: Client,
  embedding: CreateEmbeddingRequest,
  options: EmbeddingsCreateOptionalParams = { requestOptions: {} },
): Promise<CreateEmbeddingResponse> {
  const result = await _createSend(context, embedding, options);
  return _createDeserialize(result);
}
