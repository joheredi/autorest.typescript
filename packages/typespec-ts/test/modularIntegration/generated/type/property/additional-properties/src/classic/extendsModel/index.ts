// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AdditionalPropertiesContext } from "../../api/additionalPropertiesContext.js";
import { ExtendsModelAdditionalProperties } from "../../models/models.js";
import { get, put } from "../../api/extendsModel/index.js";
import {
  ExtendsModelGetOptionalParams,
  ExtendsModelPutOptionalParams,
} from "../../models/options.js";

export interface ExtendsModelOperations {
  get: (
    options?: ExtendsModelGetOptionalParams,
  ) => Promise<ExtendsModelAdditionalProperties>;
  put: (
    body: ExtendsModelAdditionalProperties,
    options?: ExtendsModelPutOptionalParams,
  ) => Promise<void>;
}

export function getExtendsModel(context: AdditionalPropertiesContext) {
  return {
    get: (options?: ExtendsModelGetOptionalParams) => get(context, options),
    put: (
      body: ExtendsModelAdditionalProperties,
      options?: ExtendsModelPutOptionalParams,
    ) => put(context, body, options),
  };
}

export function getExtendsModelOperations(
  context: AdditionalPropertiesContext,
): ExtendsModelOperations {
  return {
    ...getExtendsModel(context),
  };
}
