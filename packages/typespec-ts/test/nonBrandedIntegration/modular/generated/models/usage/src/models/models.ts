// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import {
  InputRecord as InputRecordRest,
  InputOutputRecord as InputOutputRecordRest,
  InputOutputRecordOutput,
  OutputRecordOutput,
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

/** Record used both as operation parameter and return type */
export interface InputOutputRecord {
  requiredProp: string;
}

export function inputOutputRecordSerializer(
  item: InputOutputRecord,
): InputOutputRecordRest {
  return {
    requiredProp: item["requiredProp"],
  };
}

function _deserializeOutputRecord(input: OutputRecordOutput): OutputRecord {
  return {
    requiredProp: passthroughDeserializer(input["requiredProp"]) as any,
  } as any;
}

export const deserializeOutputRecord = withNullChecks(_deserializeOutputRecord);

function _deserializeInputOutputRecord(
  input: InputOutputRecordOutput,
): InputOutputRecord {
  return {
    requiredProp: passthroughDeserializer(input["requiredProp"]) as any,
  } as any;
}

export const deserializeInputOutputRecord = withNullChecks(
  _deserializeInputOutputRecord,
);
