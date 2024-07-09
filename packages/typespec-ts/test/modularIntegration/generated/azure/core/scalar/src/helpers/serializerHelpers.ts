// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { stringToUint8Array, EncodingType } from "@azure/core-util";

export function serializeRecord<
  T extends string | number | boolean | Date | null,
  R,
>(item: Record<string, T>): Record<string, R>;
export function serializeRecord<T, R>(
  item: Record<string, T>,
  serializer: (item: T) => R,
): Record<string, R>;
export function serializeRecord<T, R>(
  item: Record<string, T>,
  serializer?: (item: T) => R,
): Record<string, R> {
  return Object.keys(item).reduce(
    (acc, key) => {
      if (isPassthroughElement(item[key])) {
        acc[key] = item[key] as any;
      } else if (serializer) {
        const value = item[key];
        if (value !== undefined) {
          acc[key] = serializer(value);
        }
      } else {
        console.warn(`Don't know how to serialize ${item[key]}`);
        acc[key] = item[key] as any;
      }
      return acc;
    },
    {} as Record<string, R>,
  );
}

function isPassthroughElement(t: any) {
  return (
    ["number", "string", "boolean", "null"].includes(typeof t) ||
    t instanceof Date
  );
}

function _deserializeRecord<T, R>(
  item: Record<string, R>,
  deserializer: (item: R) => T,
): Record<string, T> {
  return Object.keys(item).reduce(
    (acc, key) => {
      const value = item[key];
      if (isPassthroughElement(value)) {
        acc[key] = value as any;
      } else if (deserializer) {
        if (value !== undefined) {
          acc[key] = deserializer(value);
        }
      } else {
        console.warn(`Don't know how to deserialize ${item[key]}`);
        acc[key] = value as any;
      }
      return acc;
    },
    {} as Record<string, T>,
  );
}

export const deserializeRecord = withNullChecks(_deserializeRecord);

type SafeReturn<I, R> = I extends null
  ? I extends undefined
    ? R
    : R | null
  : I extends undefined
    ? I extends null
      ? R
      : R | undefined
    : R;

export function withNullChecks<I, R, A extends any[]>(
  fn: (input: NonNullable<I>, ...args: A) => R,
): (input: I | null | undefined, ...args: A) => SafeReturn<I, R> {
  return function (input: I | null | undefined, ...args: A): SafeReturn<I, R> {
    if (input === null || input === undefined) {
      return input as SafeReturn<I, R>;
    }

    return fn(input as NonNullable<I>, ...args) as SafeReturn<I, R>;
  };
}

function _deserializePlainDate(date: string): string {
  return date;
}
export const deserializePlainDate = withNullChecks(_deserializePlainDate);

function _deserializePlainTime(time: string): string {
  return time;
}
export const deserializePlainTime = withNullChecks(_deserializePlainTime);

function _deserializeUtcDateTime(
  datetime: number | string,
  _encoding?: string,
): Date {
  return new Date(datetime);
}
export const deserializeUtcDateTime = withNullChecks(_deserializeUtcDateTime);

function _deserializeOffsetDateTime(datetime: string): string {
  return datetime;
}
export const deserializeOffsetDateTime = withNullChecks(
  _deserializeOffsetDateTime,
);

function _passthroughDeserializer<T>(input: T): T {
  return input;
}

export const passthroughDeserializer = withNullChecks(_passthroughDeserializer);

function _deserializeBytes(bytes: string, encoding: EncodingType): Uint8Array {
  return stringToUint8Array(bytes, encoding);
}

export const deserializeBytes = withNullChecks(_deserializeBytes);

function _deserializeArray<T, R>(
  items: R[],
  deserializer: (item: R) => T,
): T[] {
  return items.map((item) => {
    if (isPassthroughElement(item)) {
      return item as any;
    } else if (deserializer) {
      if (item !== undefined) {
        return deserializer(item);
      }
    } else {
      console.warn(`Don't know how to deserialize ${item}`);
      return item as any;
    }
  });
}

export const deserializeArray = withNullChecks(_deserializeArray);

function _deserializeStringDuration(
  duration: string,
  encoding: string = "ISO8601",
): string {
  if (encoding === "ISO8601") {
    return duration;
  } else {
    throw new Error(
      `Unsupported encoding ${encoding} or type ${typeof duration}`,
    );
  }
}

export const deserializeStringDuration = withNullChecks(
  _deserializeStringDuration,
);

function _deserializeNumericDuration(
  duration: number,
  _encoding = "seconds",
): number {
  return duration;
}

export const deserializeNumericDuration = withNullChecks(
  _deserializeNumericDuration,
);
