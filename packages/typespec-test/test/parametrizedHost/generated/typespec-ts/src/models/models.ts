// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import { CollectionOutput } from "../rest/outputModels.js";

/** Identifier for collections. */
export interface Collection {
  readonly collectionId: string;
}

function _deserializeCollection(input: CollectionOutput): Collection {
  return {
    collectionId: passthroughDeserializer(input["collectionId"]) as any,
  } as any;
}

export const deserializeCollection = withNullChecks(_deserializeCollection);
