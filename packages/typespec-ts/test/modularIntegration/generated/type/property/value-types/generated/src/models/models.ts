// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "../rest/outputModels.js";
import {
  passthroughDeserializer,
  withNullChecks,
  deserializeRecord,
  serializeRecord,
  deserializeArray,
  deserializeStringDuration,
  deserializeUtcDateTime,
  deserializeBytes,
} from "../helpers/serializerHelpers.js";
import {
  BooleanLiteralPropertyOutput,
  BooleanPropertyOutput,
  BytesPropertyOutput,
  CollectionsIntPropertyOutput,
  CollectionsModelPropertyOutput,
  CollectionsStringPropertyOutput,
  DatetimePropertyOutput,
  Decimal128PropertyOutput,
  DecimalPropertyOutput,
  DictionaryStringPropertyOutput,
  DurationPropertyOutput,
  EnumPropertyOutput,
  ExtensibleEnumPropertyOutput,
  FloatLiteralPropertyOutput,
  FloatPropertyOutput,
  InnerModelOutput,
  IntLiteralPropertyOutput,
  IntPropertyOutput,
  ModelPropertyOutput,
  NeverPropertyOutput,
  StringLiteralPropertyOutput,
  StringPropertyOutput,
  UnionEnumValuePropertyOutput,
  UnionFloatLiteralPropertyOutput,
  UnionIntLiteralPropertyOutput,
  UnionStringLiteralPropertyOutput,
  UnknownArrayPropertyOutput,
  UnknownDictPropertyOutput,
  UnknownIntPropertyOutput,
  UnknownStringPropertyOutput,
} from "../rest/outputModels.js";
import { uint8ArrayToString } from "@azure/core-util";
import {
  UnionEnumValueProperty as UnionEnumValuePropertyRest,
  UnionFloatLiteralProperty as UnionFloatLiteralPropertyRest,
  UnionIntLiteralProperty as UnionIntLiteralPropertyRest,
  UnionStringLiteralProperty as UnionStringLiteralPropertyRest,
  BooleanLiteralProperty as BooleanLiteralPropertyRest,
  FloatLiteralProperty as FloatLiteralPropertyRest,
  IntLiteralProperty as IntLiteralPropertyRest,
  StringLiteralProperty as StringLiteralPropertyRest,
  UnknownArrayProperty as UnknownArrayPropertyRest,
  UnknownDictProperty as UnknownDictPropertyRest,
  UnknownIntProperty as UnknownIntPropertyRest,
  UnknownStringProperty as UnknownStringPropertyRest,
  DictionaryStringProperty as DictionaryStringPropertyRest,
  CollectionsModelProperty as CollectionsModelPropertyRest,
  InnerModel as InnerModelRest,
  CollectionsIntProperty as CollectionsIntPropertyRest,
  CollectionsStringProperty as CollectionsStringPropertyRest,
  ModelProperty as ModelPropertyRest,
  ExtensibleEnumProperty as ExtensibleEnumPropertyRest,
  EnumProperty as EnumPropertyRest,
  DurationProperty as DurationPropertyRest,
  DatetimeProperty as DatetimePropertyRest,
  Decimal128Property as Decimal128PropertyRest,
  DecimalProperty as DecimalPropertyRest,
  FloatProperty as FloatPropertyRest,
  IntProperty as IntPropertyRest,
  BytesProperty as BytesPropertyRest,
  StringProperty as StringPropertyRest,
  BooleanProperty as BooleanPropertyRest,
} from "../rest/index.js";

/** Template type for testing models with specific properties. Pass in the type of the property you are looking for */
export interface UnionEnumValueProperty {
  /** Property */
  property: "value2";
}

function _deserializeUnionEnumValueProperty(
  input: UnionEnumValuePropertyOutput,
): UnionEnumValueProperty {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeUnionEnumValueProperty = withNullChecks(
  _deserializeUnionEnumValueProperty,
);

export function unionEnumValuePropertySerializer(
  item: UnionEnumValueProperty,
): UnionEnumValuePropertyRest {
  return {
    property: item["property"],
  };
}

/** Type of ExtendedEnum */
export type ExtendedEnum = "value2";

/** Model with a union of float literal as property. */
export interface UnionFloatLiteralProperty {
  /** Property */
  property: 43.125 | 46.875;
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

/** Model with a union of int literal as property. */
export interface UnionIntLiteralProperty {
  /** Property */
  property: 42 | 43;
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

/** Model with a union of string literal as property. */
export interface UnionStringLiteralProperty {
  /** Property */
  property: "hello" | "world";
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

/** Model with a boolean literal property. */
export interface BooleanLiteralProperty {
  /** Property */
  property: true;
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

/** Model with a float literal property. */
export interface FloatLiteralProperty {
  /** Property */
  property: 43.125;
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

/** Model with a int literal property. */
export interface IntLiteralProperty {
  /** Property */
  property: 42;
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

/** Model with a string literal property. */
export interface StringLiteralProperty {
  /** Property */
  property: "hello";
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

/** Model with a property unknown, and the data is an array. */
export interface UnknownArrayProperty {
  /** Property */
  property: any;
}

function _deserializeUnknownArrayProperty(
  input: UnknownArrayPropertyOutput,
): UnknownArrayProperty {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeUnknownArrayProperty = withNullChecks(
  _deserializeUnknownArrayProperty,
);

export function unknownArrayPropertySerializer(
  item: UnknownArrayProperty,
): UnknownArrayPropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with a property unknown, and the data is a dictionnary. */
export interface UnknownDictProperty {
  /** Property */
  property: any;
}

function _deserializeUnknownDictProperty(
  input: UnknownDictPropertyOutput,
): UnknownDictProperty {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeUnknownDictProperty = withNullChecks(
  _deserializeUnknownDictProperty,
);

export function unknownDictPropertySerializer(
  item: UnknownDictProperty,
): UnknownDictPropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with a property unknown, and the data is a int32. */
export interface UnknownIntProperty {
  /** Property */
  property: any;
}

function _deserializeUnknownIntProperty(
  input: UnknownIntPropertyOutput,
): UnknownIntProperty {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeUnknownIntProperty = withNullChecks(
  _deserializeUnknownIntProperty,
);

export function unknownIntPropertySerializer(
  item: UnknownIntProperty,
): UnknownIntPropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with a property unknown, and the data is a string. */
export interface UnknownStringProperty {
  /** Property */
  property: any;
}

function _deserializeUnknownStringProperty(
  input: UnknownStringPropertyOutput,
): UnknownStringProperty {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeUnknownStringProperty = withNullChecks(
  _deserializeUnknownStringProperty,
);

export function unknownStringPropertySerializer(
  item: UnknownStringProperty,
): UnknownStringPropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with a property never. (This property should not be included). */
export interface NeverProperty {}

function _deserializeNeverProperty(input: NeverPropertyOutput): NeverProperty {
  return input as NeverProperty;
}

export const deserializeNeverProperty = withNullChecks(
  _deserializeNeverProperty,
);

export function neverPropertySerializer(item: NeverProperty) {
  return item as any;
}

/** Model with dictionary string properties */
export interface DictionaryStringProperty {
  /** Property */
  property: Record<string, string>;
}

function _deserializeDictionaryStringProperty(
  input: DictionaryStringPropertyOutput,
): DictionaryStringProperty {
  return {
    property: deserializeRecord(input["property"], passthroughDeserializer),
  };
}

export const deserializeDictionaryStringProperty = withNullChecks(
  _deserializeDictionaryStringProperty,
);

export function dictionaryStringPropertySerializer(
  item: DictionaryStringProperty,
): DictionaryStringPropertyRest {
  return {
    property: serializeRecord(item.property as any) as any,
  };
}

/** Model with collection model properties */
export interface CollectionsModelProperty {
  /** Property */
  property: InnerModel[];
}

function _deserializeCollectionsModelProperty(
  input: CollectionsModelPropertyOutput,
): CollectionsModelProperty {
  return {
    property: deserializeArray(input["property"], deserializeInnerModel),
  };
}

export const deserializeCollectionsModelProperty = withNullChecks(
  _deserializeCollectionsModelProperty,
);

export function collectionsModelPropertySerializer(
  item: CollectionsModelProperty,
): CollectionsModelPropertyRest {
  return {
    property: item["property"].map(innerModelSerializer),
  };
}

/** Inner model. Will be a property type for ModelWithModelProperties */
export interface InnerModel {
  /** Required string property */
  property: string;
}

function _deserializeInnerModel(input: InnerModelOutput): InnerModel {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeInnerModel = withNullChecks(_deserializeInnerModel);

export function innerModelSerializer(item: InnerModel): InnerModelRest {
  return {
    property: item["property"],
  };
}

/** Model with collection int properties */
export interface CollectionsIntProperty {
  /** Property */
  property: number[];
}

function _deserializeCollectionsIntProperty(
  input: CollectionsIntPropertyOutput,
): CollectionsIntProperty {
  return {
    property: deserializeArray(input["property"], passthroughDeserializer),
  };
}

export const deserializeCollectionsIntProperty = withNullChecks(
  _deserializeCollectionsIntProperty,
);

export function collectionsIntPropertySerializer(
  item: CollectionsIntProperty,
): CollectionsIntPropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with collection string properties */
export interface CollectionsStringProperty {
  /** Property */
  property: string[];
}

function _deserializeCollectionsStringProperty(
  input: CollectionsStringPropertyOutput,
): CollectionsStringProperty {
  return {
    property: deserializeArray(input["property"], passthroughDeserializer),
  };
}

export const deserializeCollectionsStringProperty = withNullChecks(
  _deserializeCollectionsStringProperty,
);

export function collectionsStringPropertySerializer(
  item: CollectionsStringProperty,
): CollectionsStringPropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with model properties */
export interface ModelProperty {
  /** Property */
  property: InnerModel;
}

function _deserializeModelProperty(input: ModelPropertyOutput): ModelProperty {
  return {
    property: deserializeInnerModel(input["property"]),
  };
}

export const deserializeModelProperty = withNullChecks(
  _deserializeModelProperty,
);

export function modelPropertySerializer(
  item: ModelProperty,
): ModelPropertyRest {
  return {
    property: innerModelSerializer(item.property),
  };
}

/** Model with extensible enum properties */
export interface ExtensibleEnumProperty {
  /** Property */
  property: InnerEnum;
}

function _deserializeExtensibleEnumProperty(
  input: ExtensibleEnumPropertyOutput,
): ExtensibleEnumProperty {
  return {
    property: passthroughDeserializer(input["property"] as any),
  };
}

export const deserializeExtensibleEnumProperty = withNullChecks(
  _deserializeExtensibleEnumProperty,
);

export function extensibleEnumPropertySerializer(
  item: ExtensibleEnumProperty,
): ExtensibleEnumPropertyRest {
  return {
    property: item["property"],
  };
}

/** Enum that will be used as a property for model EnumProperty. Extensible. */
export type InnerEnum = "ValueOne" | "ValueTwo";

/** Model with enum properties */
export interface EnumProperty {
  /** Property */
  property: FixedInnerEnum;
}

function _deserializeEnumProperty(input: EnumPropertyOutput): EnumProperty {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeEnumProperty = withNullChecks(_deserializeEnumProperty);

export function enumPropertySerializer(item: EnumProperty): EnumPropertyRest {
  return {
    property: item["property"],
  };
}

/** Enum that will be used as a property for model EnumProperty. Non-extensible. */
export type FixedInnerEnum = "ValueOne" | "ValueTwo";

/** Model with a duration property */
export interface DurationProperty {
  /** Property */
  property: string;
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
  property: Date;
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
    property: item["property"].toISOString(),
  };
}

/** Model with a decimal128 property */
export interface Decimal128Property {
  /** Property */
  property: number;
}

function _deserializeDecimal128Property(
  input: Decimal128PropertyOutput,
): Decimal128Property {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeDecimal128Property = withNullChecks(
  _deserializeDecimal128Property,
);

export function decimal128PropertySerializer(
  item: Decimal128Property,
): Decimal128PropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with a decimal property */
export interface DecimalProperty {
  /** Property */
  property: number;
}

function _deserializeDecimalProperty(
  input: DecimalPropertyOutput,
): DecimalProperty {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeDecimalProperty = withNullChecks(
  _deserializeDecimalProperty,
);

export function decimalPropertySerializer(
  item: DecimalProperty,
): DecimalPropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with a float property */
export interface FloatProperty {
  /** Property */
  property: number;
}

function _deserializeFloatProperty(input: FloatPropertyOutput): FloatProperty {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeFloatProperty = withNullChecks(
  _deserializeFloatProperty,
);

export function floatPropertySerializer(
  item: FloatProperty,
): FloatPropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with a int property */
export interface IntProperty {
  /** Property */
  property: number;
}

function _deserializeIntProperty(input: IntPropertyOutput): IntProperty {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeIntProperty = withNullChecks(_deserializeIntProperty);

export function intPropertySerializer(item: IntProperty): IntPropertyRest {
  return {
    property: item["property"],
  };
}

/** Model with a bytes property */
export interface BytesProperty {
  /** Property */
  property: Uint8Array;
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
    property: uint8ArrayToString(item["property"], "base64"),
  };
}

/** Model with a string property */
export interface StringProperty {
  /** Property */
  property: string;
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

/** Model with a boolean property */
export interface BooleanProperty {
  /** Property */
  property: boolean;
}

function _deserializeBooleanProperty(
  input: BooleanPropertyOutput,
): BooleanProperty {
  return {
    property: passthroughDeserializer(input["property"]),
  };
}

export const deserializeBooleanProperty = withNullChecks(
  _deserializeBooleanProperty,
);

export function booleanPropertySerializer(
  item: BooleanProperty,
): BooleanPropertyRest {
  return {
    property: item["property"],
  };
}
