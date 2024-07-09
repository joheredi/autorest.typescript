// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { withNullChecks } from "../helpers/serializerHelpers.js";
import {
  EmptyOutputOutput,
  EmptyInputOutputOutput,
} from "../rest/outputModels.js";

/** Empty model used in operation parameters */
export interface EmptyInput {}

export function emptyInputSerializer(item: EmptyInput) {
  return item as any;
}

/** Empty model used in operation return type */
export interface EmptyOutput {}

/** Empty model used in both parameter and return type */
export interface EmptyInputOutput {}

export function emptyInputOutputSerializer(item: EmptyInputOutput) {
  return item as any;
}

function _deserializeEmptyOutput(input: EmptyOutputOutput): EmptyOutput {
  return input as EmptyOutput;
}

export const deserializeEmptyOutput = withNullChecks(_deserializeEmptyOutput);

function _deserializeEmptyInputOutput(
  input: EmptyInputOutputOutput,
): EmptyInputOutput {
  return input as EmptyInputOutput;
}

export const deserializeEmptyInputOutput = withNullChecks(
  _deserializeEmptyInputOutput,
);
