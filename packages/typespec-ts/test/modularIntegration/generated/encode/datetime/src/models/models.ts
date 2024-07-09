// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  deserializeUtcDateTime,
  withNullChecks,
  deserializeArray,
} from "../helpers/serializerHelpers.js";
import {
  DefaultDatetimeProperty as DefaultDatetimePropertyRest,
  Rfc3339DatetimeProperty as Rfc3339DatetimePropertyRest,
  Rfc7231DatetimeProperty as Rfc7231DatetimePropertyRest,
  UnixTimestampDatetimeProperty as UnixTimestampDatetimePropertyRest,
  UnixTimestampArrayDatetimeProperty as UnixTimestampArrayDatetimePropertyRest,
  DefaultDatetimePropertyOutput,
  Rfc3339DatetimePropertyOutput,
  Rfc7231DatetimePropertyOutput,
  UnixTimestampArrayDatetimePropertyOutput,
  UnixTimestampDatetimePropertyOutput,
} from "../rest/index.js";

export interface DefaultDatetimeProperty {
  value: Date;
}

export function defaultDatetimePropertySerializer(
  item: DefaultDatetimeProperty,
): DefaultDatetimePropertyRest {
  return {
    value: item["value"].toISOString(),
  };
}

export interface Rfc3339DatetimeProperty {
  value: Date;
}

export function rfc3339DatetimePropertySerializer(
  item: Rfc3339DatetimeProperty,
): Rfc3339DatetimePropertyRest {
  return {
    value: item["value"].toISOString(),
  };
}

export interface Rfc7231DatetimeProperty {
  value: Date;
}

export function rfc7231DatetimePropertySerializer(
  item: Rfc7231DatetimeProperty,
): Rfc7231DatetimePropertyRest {
  return {
    value: item["value"].toUTCString(),
  };
}

export interface UnixTimestampDatetimeProperty {
  value: Date;
}

export function unixTimestampDatetimePropertySerializer(
  item: UnixTimestampDatetimeProperty,
): UnixTimestampDatetimePropertyRest {
  return {
    value: item["value"].getTime(),
  };
}

export interface UnixTimestampArrayDatetimeProperty {
  value: Date[];
}

export function unixTimestampArrayDatetimePropertySerializer(
  item: UnixTimestampArrayDatetimeProperty,
): UnixTimestampArrayDatetimePropertyRest {
  return {
    value: item["value"].map((p) => p.getTime()),
  };
}

function _deserializeDefaultDatetimeProperty(
  input: DefaultDatetimePropertyOutput,
): DefaultDatetimeProperty {
  return {
    value: deserializeUtcDateTime(input["value"]) as any,
  } as any;
}

export const deserializeDefaultDatetimeProperty = withNullChecks(
  _deserializeDefaultDatetimeProperty,
);

function _deserializeRfc3339DatetimeProperty(
  input: Rfc3339DatetimePropertyOutput,
): Rfc3339DatetimeProperty {
  return {
    value: deserializeUtcDateTime(input["value"]) as any,
  } as any;
}

export const deserializeRfc3339DatetimeProperty = withNullChecks(
  _deserializeRfc3339DatetimeProperty,
);

function _deserializeRfc7231DatetimeProperty(
  input: Rfc7231DatetimePropertyOutput,
): Rfc7231DatetimeProperty {
  return {
    value: deserializeUtcDateTime(input["value"]) as any,
  } as any;
}

export const deserializeRfc7231DatetimeProperty = withNullChecks(
  _deserializeRfc7231DatetimeProperty,
);

function _deserializeUnixTimestampDatetimeProperty(
  input: UnixTimestampDatetimePropertyOutput,
): UnixTimestampDatetimeProperty {
  return {
    value: deserializeUtcDateTime(input["value"]) as any,
  } as any;
}

export const deserializeUnixTimestampDatetimeProperty = withNullChecks(
  _deserializeUnixTimestampDatetimeProperty,
);

function _deserializeUnixTimestampArrayDatetimeProperty(
  input: UnixTimestampArrayDatetimePropertyOutput,
): UnixTimestampArrayDatetimeProperty {
  return {
    value: deserializeArray(input["value"], (i) =>
      deserializeUtcDateTime(i, "unixTimestamp"),
    ) as any,
  } as any;
}

export const deserializeUnixTimestampArrayDatetimeProperty = withNullChecks(
  _deserializeUnixTimestampArrayDatetimeProperty,
);
