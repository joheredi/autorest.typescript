// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AdditionalPropertiesContext } from "../../api/additionalPropertiesContext.js";
import { DifferentSpreadModelDerived } from "../../models/models.js";
import { get, put } from "../../api/extendsDifferentSpreadModel/index.js";
import {
  ExtendsDifferentSpreadModelGetOptionalParams,
  ExtendsDifferentSpreadModelPutOptionalParams,
} from "../../models/options.js";

export interface ExtendsDifferentSpreadModelOperations {
  get: (
    options?: ExtendsDifferentSpreadModelGetOptionalParams,
  ) => Promise<DifferentSpreadModelDerived>;
  put: (
    body: DifferentSpreadModelDerived,
    options?: ExtendsDifferentSpreadModelPutOptionalParams,
  ) => Promise<void>;
}

export function getExtendsDifferentSpreadModel(
  context: AdditionalPropertiesContext,
) {
  return {
    get: (options?: ExtendsDifferentSpreadModelGetOptionalParams) =>
      get(context, options),
    put: (
      body: DifferentSpreadModelDerived,
      options?: ExtendsDifferentSpreadModelPutOptionalParams,
    ) => put(context, body, options),
  };
}

export function getExtendsDifferentSpreadModelOperations(
  context: AdditionalPropertiesContext,
): ExtendsDifferentSpreadModelOperations {
  return {
    ...getExtendsDifferentSpreadModel(context),
  };
}
