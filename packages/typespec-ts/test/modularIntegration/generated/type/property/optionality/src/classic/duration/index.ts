// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OptionalContext } from "../../api/optionalContext.js";
import { DurationProperty } from "../../models/models.js";
import {
  getAll,
  getDefault,
  putAll,
  putDefault,
} from "../../api/duration/index.js";
import {
  DurationGetAllOptionalParams,
  DurationGetDefaultOptionalParams,
  DurationPutAllOptionalParams,
  DurationPutDefaultOptionalParams,
} from "../../models/options.js";

export interface DurationOperations {
  getAll: (options?: DurationGetAllOptionalParams) => Promise<DurationProperty>;
  getDefault: (
    options?: DurationGetDefaultOptionalParams,
  ) => Promise<DurationProperty>;
  putAll: (
    body: DurationProperty,
    options?: DurationPutAllOptionalParams,
  ) => Promise<void>;
  putDefault: (
    body: DurationProperty,
    options?: DurationPutDefaultOptionalParams,
  ) => Promise<void>;
}

export function getDuration(context: OptionalContext) {
  return {
    getAll: (options?: DurationGetAllOptionalParams) =>
      getAll(context, options),
    getDefault: (options?: DurationGetDefaultOptionalParams) =>
      getDefault(context, options),
    putAll: (body: DurationProperty, options?: DurationPutAllOptionalParams) =>
      putAll(context, body, options),
    putDefault: (
      body: DurationProperty,
      options?: DurationPutDefaultOptionalParams,
    ) => putDefault(context, body, options),
  };
}

export function getDurationOperations(
  context: OptionalContext,
): DurationOperations {
  return {
    ...getDuration(context),
  };
}
