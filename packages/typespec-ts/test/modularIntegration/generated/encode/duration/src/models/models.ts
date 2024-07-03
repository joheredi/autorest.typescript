// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "../rest/outputModels.js";
import {
  deserializeStringDuration,
  withNullChecks,
  deserializeNumericDuration,
  deserializeArray,
} from "../helpers/serializerHelpers.js";
import {
  DefaultDurationPropertyOutput,
  Float64SecondsDurationPropertyOutput,
  FloatSecondsDurationArrayPropertyOutput,
  FloatSecondsDurationPropertyOutput,
  Int32SecondsDurationPropertyOutput,
  ISO8601DurationPropertyOutput,
} from "../rest/outputModels.js";
import {
  DefaultDurationProperty as DefaultDurationPropertyRest,
  ISO8601DurationProperty as ISO8601DurationPropertyRest,
  Int32SecondsDurationProperty as Int32SecondsDurationPropertyRest,
  FloatSecondsDurationProperty as FloatSecondsDurationPropertyRest,
  Float64SecondsDurationProperty as Float64SecondsDurationPropertyRest,
  FloatSecondsDurationArrayProperty as FloatSecondsDurationArrayPropertyRest,
} from "../rest/index.js";

export interface DefaultDurationProperty {
  value: string;
}

function _deserializeDefaultDurationProperty(
  input: DefaultDurationPropertyOutput,
): DefaultDurationProperty {
  return {
    value: deserializeStringDuration(input["value"]),
  };
}

export const deserializeDefaultDurationProperty = withNullChecks(
  _deserializeDefaultDurationProperty,
);

export function defaultDurationPropertySerializer(
  item: DefaultDurationProperty,
): DefaultDurationPropertyRest {
  return {
    value: item["value"],
  };
}

export interface ISO8601DurationProperty {
  value: string;
}

function _deserializeISO8601DurationProperty(
  input: ISO8601DurationPropertyOutput,
): ISO8601DurationProperty {
  return {
    value: deserializeStringDuration(input["value"]),
  };
}

export const deserializeISO8601DurationProperty = withNullChecks(
  _deserializeISO8601DurationProperty,
);

export function iSO8601DurationPropertySerializer(
  item: ISO8601DurationProperty,
): ISO8601DurationPropertyRest {
  return {
    value: item["value"],
  };
}

export interface Int32SecondsDurationProperty {
  value: number;
}

function _deserializeInt32SecondsDurationProperty(
  input: Int32SecondsDurationPropertyOutput,
): Int32SecondsDurationProperty {
  return {
    value: deserializeNumericDuration(input["value"]),
  };
}

export const deserializeInt32SecondsDurationProperty = withNullChecks(
  _deserializeInt32SecondsDurationProperty,
);

export function int32SecondsDurationPropertySerializer(
  item: Int32SecondsDurationProperty,
): Int32SecondsDurationPropertyRest {
  return {
    value: item["value"],
  };
}

export interface FloatSecondsDurationProperty {
  value: number;
}

function _deserializeFloatSecondsDurationProperty(
  input: FloatSecondsDurationPropertyOutput,
): FloatSecondsDurationProperty {
  return {
    value: deserializeNumericDuration(input["value"]),
  };
}

export const deserializeFloatSecondsDurationProperty = withNullChecks(
  _deserializeFloatSecondsDurationProperty,
);

export function floatSecondsDurationPropertySerializer(
  item: FloatSecondsDurationProperty,
): FloatSecondsDurationPropertyRest {
  return {
    value: item["value"],
  };
}

export interface Float64SecondsDurationProperty {
  value: number;
}

function _deserializeFloat64SecondsDurationProperty(
  input: Float64SecondsDurationPropertyOutput,
): Float64SecondsDurationProperty {
  return {
    value: deserializeNumericDuration(input["value"]),
  };
}

export const deserializeFloat64SecondsDurationProperty = withNullChecks(
  _deserializeFloat64SecondsDurationProperty,
);

export function float64SecondsDurationPropertySerializer(
  item: Float64SecondsDurationProperty,
): Float64SecondsDurationPropertyRest {
  return {
    value: item["value"],
  };
}

export interface FloatSecondsDurationArrayProperty {
  value: number[];
}

function _deserializeFloatSecondsDurationArrayProperty(
  input: FloatSecondsDurationArrayPropertyOutput,
): FloatSecondsDurationArrayProperty {
  return {
    value: deserializeArray(input["value"], (i) =>
      deserializeNumericDuration(i, "seconds"),
    ),
  };
}

export const deserializeFloatSecondsDurationArrayProperty = withNullChecks(
  _deserializeFloatSecondsDurationArrayProperty,
);

export function floatSecondsDurationArrayPropertySerializer(
  item: FloatSecondsDurationArrayProperty,
): FloatSecondsDurationArrayPropertyRest {
  return {
    value: item["value"].map((p) => p),
  };
}
