// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ValueTypesContext } from "../../api/valueTypesContext.js";
import { UnknownStringProperty } from "../../models/models.js";
import {
  unknownStringGet,
  unknownStringPut,
} from "../../api/unknownString/index.js";
import {
  UnknownStringGetOptionalParams,
  UnknownStringPutOptionalParams,
} from "../../models/options.js";

export interface UnknownStringOperations {
  get: (
    options?: UnknownStringGetOptionalParams,
  ) => Promise<UnknownStringProperty>;
  put: (
    body: UnknownStringProperty,
    options?: UnknownStringPutOptionalParams,
  ) => Promise<void>;
}

export function getUnknownString(context: ValueTypesContext) {
  return {
    get: (options?: UnknownStringGetOptionalParams) =>
      unknownStringGet(context, options),
    put: (
      body: UnknownStringProperty,
      options?: UnknownStringPutOptionalParams,
    ) => unknownStringPut(context, body, options),
  };
}

export function getUnknownStringOperations(
  context: ValueTypesContext,
): UnknownStringOperations {
  return {
    ...getUnknownString(context),
  };
}
