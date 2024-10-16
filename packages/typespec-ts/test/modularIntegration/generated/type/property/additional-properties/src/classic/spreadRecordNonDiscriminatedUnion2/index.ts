// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AdditionalPropertiesContext } from "../../api/additionalPropertiesContext.js";
import { SpreadRecordForNonDiscriminatedUnion2 } from "../../models/models.js";
import {
  get,
  put,
} from "../../api/spreadRecordNonDiscriminatedUnion2/index.js";
import {
  SpreadRecordNonDiscriminatedUnion2GetOptionalParams,
  SpreadRecordNonDiscriminatedUnion2PutOptionalParams,
} from "../../models/options.js";

export interface SpreadRecordNonDiscriminatedUnion2Operations {
  get: (
    options?: SpreadRecordNonDiscriminatedUnion2GetOptionalParams,
  ) => Promise<SpreadRecordForNonDiscriminatedUnion2>;
  put: (
    body: SpreadRecordForNonDiscriminatedUnion2,
    options?: SpreadRecordNonDiscriminatedUnion2PutOptionalParams,
  ) => Promise<void>;
}

export function getSpreadRecordNonDiscriminatedUnion2(
  context: AdditionalPropertiesContext,
) {
  return {
    get: (options?: SpreadRecordNonDiscriminatedUnion2GetOptionalParams) =>
      get(context, options),
    put: (
      body: SpreadRecordForNonDiscriminatedUnion2,
      options?: SpreadRecordNonDiscriminatedUnion2PutOptionalParams,
    ) => put(context, body, options),
  };
}

export function getSpreadRecordNonDiscriminatedUnion2Operations(
  context: AdditionalPropertiesContext,
): SpreadRecordNonDiscriminatedUnion2Operations {
  return {
    ...getSpreadRecordNonDiscriminatedUnion2(context),
  };
}
