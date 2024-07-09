// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  deserializeNumericDuration,
  deserializeStringDuration,
  withNullChecks,
  deserializeArray,
} from "../helpers/serializerHelpers.js";
import {
  DefaultDurationProperty as DefaultDurationPropertyRest,
  ISO8601DurationProperty as ISO8601DurationPropertyRest,
  Int32SecondsDurationProperty as Int32SecondsDurationPropertyRest,
  FloatSecondsDurationProperty as FloatSecondsDurationPropertyRest,
  Float64SecondsDurationProperty as Float64SecondsDurationPropertyRest,
  FloatSecondsDurationArrayProperty as FloatSecondsDurationArrayPropertyRest,
  DefaultDurationPropertyOutput,
  Float64SecondsDurationPropertyOutput,
  FloatSecondsDurationArrayPropertyOutput,
  FloatSecondsDurationPropertyOutput,
  Int32SecondsDurationPropertyOutput,
  ISO8601DurationPropertyOutput,
} from "../rest/index.js";

export interface DefaultDurationProperty {
  value: string;
}

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

export function floatSecondsDurationArrayPropertySerializer(
  item: FloatSecondsDurationArrayProperty,
): FloatSecondsDurationArrayPropertyRest {
  return {
    value: item["value"].map((p) => p),
  };
}

function _deserializeDefaultDurationProperty(
  input: DefaultDurationPropertyOutput,
): DefaultDurationProperty {
  return {
    value: deserializeStringDuration(input["value"]) as any,
  } as any;
}

export const deserializeDefaultDurationProperty = withNullChecks(
  _deserializeDefaultDurationProperty,
);

function _deserializeISO8601DurationProperty(
  input: ISO8601DurationPropertyOutput,
): ISO8601DurationProperty {
  return {
    value: deserializeStringDuration(input["value"]) as any,
  } as any;
}

export const deserializeISO8601DurationProperty = withNullChecks(
  _deserializeISO8601DurationProperty,
);

function _deserializeInt32SecondsDurationProperty(
  input: Int32SecondsDurationPropertyOutput,
): Int32SecondsDurationProperty {
  return {
    value: deserializeNumericDuration(input["value"]) as any,
  } as any;
}

export const deserializeInt32SecondsDurationProperty = withNullChecks(
  _deserializeInt32SecondsDurationProperty,
);

function _deserializeFloatSecondsDurationProperty(
  input: FloatSecondsDurationPropertyOutput,
): FloatSecondsDurationProperty {
  return {
    value: deserializeNumericDuration(input["value"]) as any,
  } as any;
}

export const deserializeFloatSecondsDurationProperty = withNullChecks(
  _deserializeFloatSecondsDurationProperty,
);

function _deserializeFloat64SecondsDurationProperty(
  input: Float64SecondsDurationPropertyOutput,
): Float64SecondsDurationProperty {
  return {
    value: deserializeNumericDuration(input["value"]) as any,
  } as any;
}

export const deserializeFloat64SecondsDurationProperty = withNullChecks(
  _deserializeFloat64SecondsDurationProperty,
);

function _deserializeFloatSecondsDurationArrayProperty(
  input: FloatSecondsDurationArrayPropertyOutput,
): FloatSecondsDurationArrayProperty {
  return {
    value: deserializeArray(input["value"], (i) =>
      deserializeNumericDuration(i, "seconds"),
    ) as any,
  } as any;
}

export const deserializeFloatSecondsDurationArrayProperty = withNullChecks(
  _deserializeFloatSecondsDurationArrayProperty,
);
