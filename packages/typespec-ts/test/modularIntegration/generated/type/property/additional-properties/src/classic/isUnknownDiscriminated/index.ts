// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AdditionalPropertiesContext } from "../../api/additionalPropertiesContext.js";
import { IsUnknownAdditionalPropertiesDiscriminatedUnion } from "../../models/models.js";
import { get, put } from "../../api/isUnknownDiscriminated/index.js";
import {
  IsUnknownDiscriminatedGetOptionalParams,
  IsUnknownDiscriminatedPutOptionalParams,
} from "../../models/options.js";

export interface IsUnknownDiscriminatedOperations {
  get: (
    options?: IsUnknownDiscriminatedGetOptionalParams,
  ) => Promise<IsUnknownAdditionalPropertiesDiscriminatedUnion>;
  put: (
    body: IsUnknownAdditionalPropertiesDiscriminatedUnion,
    options?: IsUnknownDiscriminatedPutOptionalParams,
  ) => Promise<void>;
}

export function getIsUnknownDiscriminated(
  context: AdditionalPropertiesContext,
) {
  return {
    get: (options?: IsUnknownDiscriminatedGetOptionalParams) =>
      get(context, options),
    put: (
      body: IsUnknownAdditionalPropertiesDiscriminatedUnion,
      options?: IsUnknownDiscriminatedPutOptionalParams,
    ) => put(context, body, options),
  };
}

export function getIsUnknownDiscriminatedOperations(
  context: AdditionalPropertiesContext,
): IsUnknownDiscriminatedOperations {
  return {
    ...getIsUnknownDiscriminated(context),
  };
}
