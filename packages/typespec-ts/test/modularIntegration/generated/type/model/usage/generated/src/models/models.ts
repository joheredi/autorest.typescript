// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import {
  InputOutputRecordOutput,
  OutputRecordOutput,
} from "../rest/outputModels.js";
import {
  InputRecord as InputRecordRest,
  InputOutputRecord as InputOutputRecordRest,
} from "../rest/index.js";

/** Record used in operation parameters */
export interface InputRecord {
  requiredProp: string;
}

export function inputRecordSerializer(item: InputRecord): InputRecordRest {
  return {
    requiredProp: item["requiredProp"],
  };
}

/** Record used in operation return type */
export interface OutputRecord {
  requiredProp: string;
}

function _deserializeOutputRecord(input: OutputRecordOutput): OutputRecord {
  return {
    requiredProp: passthroughDeserializer(input["requiredProp"]),
  };
}

export const deserializeOutputRecord = withNullChecks(_deserializeOutputRecord);

/** Record used both as operation parameter and return type */
export interface InputOutputRecord {
  requiredProp: string;
}

function _deserializeInputOutputRecord(
  input: InputOutputRecordOutput,
): InputOutputRecord {
  return {
    requiredProp: passthroughDeserializer(input["requiredProp"]),
  };
}

export const deserializeInputOutputRecord = withNullChecks(
  _deserializeInputOutputRecord,
);

export function inputOutputRecordSerializer(
  item: InputOutputRecord,
): InputOutputRecordRest {
  return {
    requiredProp: item["requiredProp"],
  };
}
