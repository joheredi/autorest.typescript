// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { uint8ArrayToString } from "@azure/core-util";
import {
  passthroughDeserializer,
  withNullChecks,
  deserializeArray,
  deserializeBytes,
  deserializeStringDuration,
  deserializeUtcDateTime,
} from "../helpers/serializerHelpers.js";
import {
  BooleanLiteralPropertyOutput,
  BytesPropertyOutput,
  CollectionsBytePropertyOutput,
  CollectionsModelPropertyOutput,
  DatetimePropertyOutput,
  DurationPropertyOutput,
  FloatLiteralPropertyOutput,
  IntLiteralPropertyOutput,
  RequiredAndOptionalPropertyOutput,
  StringLiteralPropertyOutput,
  StringPropertyOutput,
  UnionFloatLiteralPropertyOutput,
  UnionIntLiteralPropertyOutput,
  UnionStringLiteralPropertyOutput,
} from "../rest/outputModels.js";
import {
  RequiredAndOptionalProperty as RequiredAndOptionalPropertyRest,
  UnionFloatLiteralProperty as UnionFloatLiteralPropertyRest,
  UnionIntLiteralProperty as UnionIntLiteralPropertyRest,
  UnionStringLiteralProperty as UnionStringLiteralPropertyRest,
  BooleanLiteralProperty as BooleanLiteralPropertyRest,
  FloatLiteralProperty as FloatLiteralPropertyRest,
  IntLiteralProperty as IntLiteralPropertyRest,
  StringLiteralProperty as StringLiteralPropertyRest,
  CollectionsModelProperty as CollectionsModelPropertyRest,
  StringProperty as StringPropertyRest,
  CollectionsByteProperty as CollectionsBytePropertyRest,
  DurationProperty as DurationPropertyRest,
  DatetimeProperty as DatetimePropertyRest,
  BytesProperty as BytesPropertyRest,
} from "../rest/index.js";

/** Model with required and optional properties */
export interface RequiredAndOptionalProperty {
  /** optional string property */
  optionalProperty?: string;
  /** required int property */
  requiredProperty: number;
}

function _deserializeRequiredAndOptionalProperty(
  input: RequiredAndOptionalPropertyOutput,
): RequiredAndOptionalProperty {
  return {
    optionalProperty: passthroughDeserializer(input["optionalProperty"]),
    requiredProperty: passthroughDeserializer(input["requiredProperty"]),
  };
}

export const deserializeRequiredAndOptionalProperty = withNullChecks(
  _deserializeRequiredAndOptionalProperty,
);

export function requiredAndOptionalPropertySerializer(
  item: RequiredAndOptionalProperty,
): RequiredAndOptionalPropertyRest {
  return {
    optionalProperty: item["optionalProperty"],
    requiredProperty: item["requiredProperty"],
  };
}

/** Model with union of float literal property */
export interface UnionFloatLiteralProperty {
  /** Property */
  property?: 1.25 | 2.375;
}

function _deserializeUnionFloatLiteralProperty(
  input: UnionFloatLiteralPropertyOutput,
): UnionFloatLiteralProperty {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeUnionFloatLiteralProperty = withNullChecks(
  _deserializeUnionFloatLiteralProperty,
);

export function unionFloatLiteralPropertySerializer(
  item: UnionFloatLiteralProperty,
): UnionFloatLiteralPropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with union of int literal property */
export interface UnionIntLiteralProperty {
  /** Property */
  property?: 1 | 2;
}

function _deserializeUnionIntLiteralProperty(
  input: UnionIntLiteralPropertyOutput,
): UnionIntLiteralProperty {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeUnionIntLiteralProperty = withNullChecks(
  _deserializeUnionIntLiteralProperty,
);

export function unionIntLiteralPropertySerializer(
  item: UnionIntLiteralProperty,
): UnionIntLiteralPropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with union of string literal property */
export interface UnionStringLiteralProperty {
  /** Property */
  property?: "hello" | "world";
}

function _deserializeUnionStringLiteralProperty(
  input: UnionStringLiteralPropertyOutput,
): UnionStringLiteralProperty {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeUnionStringLiteralProperty = withNullChecks(
  _deserializeUnionStringLiteralProperty,
);

export function unionStringLiteralPropertySerializer(
  item: UnionStringLiteralProperty,
): UnionStringLiteralPropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with boolean literal property */
export interface BooleanLiteralProperty {
  /** Property */
  property?: true;
}

function _deserializeBooleanLiteralProperty(
  input: BooleanLiteralPropertyOutput,
): BooleanLiteralProperty {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeBooleanLiteralProperty = withNullChecks(
  _deserializeBooleanLiteralProperty,
);

export function booleanLiteralPropertySerializer(
  item: BooleanLiteralProperty,
): BooleanLiteralPropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with float literal property */
export interface FloatLiteralProperty {
  /** Property */
  property?: 1.25;
}

function _deserializeFloatLiteralProperty(
  input: FloatLiteralPropertyOutput,
): FloatLiteralProperty {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeFloatLiteralProperty = withNullChecks(
  _deserializeFloatLiteralProperty,
);

export function floatLiteralPropertySerializer(
  item: FloatLiteralProperty,
): FloatLiteralPropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with int literal property */
export interface IntLiteralProperty {
  /** Property */
  property?: 1;
}

function _deserializeIntLiteralProperty(
  input: IntLiteralPropertyOutput,
): IntLiteralProperty {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeIntLiteralProperty = withNullChecks(
  _deserializeIntLiteralProperty,
);

export function intLiteralPropertySerializer(
  item: IntLiteralProperty,
): IntLiteralPropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with string literal property */
export interface StringLiteralProperty {
  /** Property */
  property?: "hello";
}

function _deserializeStringLiteralProperty(
  input: StringLiteralPropertyOutput,
): StringLiteralProperty {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeStringLiteralProperty = withNullChecks(
  _deserializeStringLiteralProperty,
);

export function stringLiteralPropertySerializer(
  item: StringLiteralProperty,
): StringLiteralPropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with collection models properties */
export interface CollectionsModelProperty {
  /** Property */
  property?: StringProperty[];
}

function _deserializeCollectionsModelProperty(
  input: CollectionsModelPropertyOutput,
): CollectionsModelProperty {
  return {
    property: deserializeArray(input["property"], deserializeStringProperty),
  };
}

export const deserializeCollectionsModelProperty = withNullChecks(
  _deserializeCollectionsModelProperty,
);

export function collectionsModelPropertySerializer(
  item: CollectionsModelProperty,
): CollectionsModelPropertyRest {
  return {
    property:
      item["property"] === undefined
        ? item["property"]
        : item["property"].map(stringPropertySerializer),
  };
}

/** Template type for testing models with optional property. Pass in the type of the property you are looking for */
export interface StringProperty {
  /** Property */
  property?: string;
}

function _deserializeStringProperty(
  input: StringPropertyOutput,
): StringProperty {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeStringProperty = withNullChecks(
  _deserializeStringProperty,
);

export function stringPropertySerializer(
  item: StringProperty,
): StringPropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with collection bytes properties */
export interface CollectionsByteProperty {
  /** Property */
  property?: Uint8Array[];
}

function _deserializeCollectionsByteProperty(
  input: CollectionsBytePropertyOutput,
): CollectionsByteProperty {
  return {
    property: deserializeArray(input["property"], (i) =>
      deserializeBytes(i, "base64"),
    ),
  };
}

export const deserializeCollectionsByteProperty = withNullChecks(
  _deserializeCollectionsByteProperty,
);

export function collectionsBytePropertySerializer(
  item: CollectionsByteProperty,
): CollectionsBytePropertyRest {
  return {
    property:
      item["property"] === undefined
        ? item["property"]
        : item["property"].map((p) => uint8ArrayToString(p, "base64")),
  };
}

/** Model with a duration property */
export interface DurationProperty {
  /** Property */
  property?: string;
}

function _deserializeDurationProperty(
  input: DurationPropertyOutput,
): DurationProperty {
  return {
    property: deserializeStringDuration(input["property"]),
  };
}

export const deserializeDurationProperty = withNullChecks(
  _deserializeDurationProperty,
);

export function durationPropertySerializer(
  item: DurationProperty,
): DurationPropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with a datetime property */
export interface DatetimeProperty {
  /** Property */
  property?: Date;
}

function _deserializeDatetimeProperty(
  input: DatetimePropertyOutput,
): DatetimeProperty {
  return {
    property: deserializeUtcDateTime(input["property"]),
  };
}

export const deserializeDatetimeProperty = withNullChecks(
  _deserializeDatetimeProperty,
);

export function datetimePropertySerializer(
  item: DatetimeProperty,
): DatetimePropertyRest {
  return {
    property: item["property"]?.toISOString(),
  };
}

/** Template type for testing models with optional property. Pass in the type of the property you are looking for */
export interface BytesProperty {
  /** Property */
  property?: Uint8Array;
}

function _deserializeBytesProperty(input: BytesPropertyOutput): BytesProperty {
  return {
    property: deserializeBytes(input["property"], "base64"),
  };
}

export const deserializeBytesProperty = withNullChecks(
  _deserializeBytesProperty,
);

export function bytesPropertySerializer(
  item: BytesProperty,
): BytesPropertyRest {
  return {
    property:
      item["property"] !== undefined
        ? uint8ArrayToString(item["property"], "base64")
        : undefined,
  };
}
