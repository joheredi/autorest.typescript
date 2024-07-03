// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "../rest/outputModels.js";
import { withNullChecks } from "../helpers/serializerHelpers.js";
import {
  EmptyInputOutputOutput,
  EmptyOutputOutput,
} from "../rest/outputModels.js";

/** Empty model used in operation parameters */
export interface EmptyInput {}

export function emptyInputSerializer(item: EmptyInput) {
  return item as any;
}

/** Empty model used in operation return type */
export interface EmptyOutput {}

function _deserializeEmptyOutput(input: EmptyOutputOutput): EmptyOutput {
  return input as EmptyOutput;
}

export const deserializeEmptyOutput = withNullChecks(_deserializeEmptyOutput);

/** Empty model used in both parameter and return type */
export interface EmptyInputOutput {}

function _deserializeEmptyInputOutput(
  input: EmptyInputOutputOutput,
): EmptyInputOutput {
  return input as EmptyInputOutput;
}

export const deserializeEmptyInputOutput = withNullChecks(
  _deserializeEmptyInputOutput,
);

export function emptyInputOutputSerializer(item: EmptyInputOutput) {
  return item as any;
}
