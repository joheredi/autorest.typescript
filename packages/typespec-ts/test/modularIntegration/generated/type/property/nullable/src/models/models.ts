// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "../rest/outputModels.js";
import {
  passthroughDeserializer,
  withNullChecks,
  deserializeArray,
  deserializeBytes,
  deserializeStringDuration,
  deserializeUtcDateTime,
} from "../helpers/serializerHelpers.js";
import {
  BytesPropertyOutput,
  CollectionsBytePropertyOutput,
  CollectionsModelPropertyOutput,
  DatetimePropertyOutput,
  DurationPropertyOutput,
  InnerModelOutput,
  StringPropertyOutput,
} from "../rest/outputModels.js";
import { uint8ArrayToString } from "@azure/core-util";
import {
  CollectionsModelProperty as CollectionsModelPropertyRest,
  InnerModel as InnerModelRest,
  CollectionsByteProperty as CollectionsBytePropertyRest,
  DurationProperty as DurationPropertyRest,
  DatetimeProperty as DatetimePropertyRest,
  BytesProperty as BytesPropertyRest,
  StringProperty as StringPropertyRest,
} from "../rest/index.js";

/** Model with collection models properties */
export interface CollectionsModelProperty {
  /** Required property */
  requiredProperty: string;
  /** Property */
  nullableProperty: InnerModel[] | null;
}

function _deserializeCollectionsModelProperty(
  input: CollectionsModelPropertyOutput,
): CollectionsModelProperty {
  return {
    requiredProperty: passthroughDeserializer(input["requiredProperty"]),
    nullableProperty: deserializeArray(
      input["nullableProperty"],
      deserializeInnerModel,
    ),
  };
}

export const deserializeCollectionsModelProperty = withNullChecks(
  _deserializeCollectionsModelProperty,
);

export function collectionsModelPropertySerializer(
  item: CollectionsModelProperty,
): CollectionsModelPropertyRest {
  return {
    requiredProperty: item["requiredProperty"],
    nullableProperty:
      item["nullableProperty"] === null
        ? item["nullableProperty"]
        : item["nullableProperty"].map(innerModelSerializer),
  };
}

/** Inner model used in collections model property */
export interface InnerModel {
  /** Inner model property */
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

/** Model with collection bytes properties */
export interface CollectionsByteProperty {
  /** Required property */
  requiredProperty: string;
  /** Property */
  nullableProperty: Uint8Array[] | null;
}

function _deserializeCollectionsByteProperty(
  input: CollectionsBytePropertyOutput,
): CollectionsByteProperty {
  return {
    requiredProperty: passthroughDeserializer(input["requiredProperty"]),
    nullableProperty: deserializeArray(input["nullableProperty"], (i) =>
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
    requiredProperty: item["requiredProperty"],
    nullableProperty:
      item["nullableProperty"] === null
        ? item["nullableProperty"]
        : item["nullableProperty"].map((p) => uint8ArrayToString(p, "base64")),
  };
}

/** Model with a duration property */
export interface DurationProperty {
  /** Required property */
  requiredProperty: string;
  /** Property */
  nullableProperty: string | null;
}

function _deserializeDurationProperty(
  input: DurationPropertyOutput,
): DurationProperty {
  return {
    requiredProperty: passthroughDeserializer(input["requiredProperty"]),
    nullableProperty: deserializeStringDuration(input["nullableProperty"]),
  };
}

export const deserializeDurationProperty = withNullChecks(
  _deserializeDurationProperty,
);

export function durationPropertySerializer(
  item: DurationProperty,
): DurationPropertyRest {
  return {
    requiredProperty: item["requiredProperty"],
    nullableProperty: item["nullableProperty"],
  };
}

/** Model with a datetime property */
export interface DatetimeProperty {
  /** Required property */
  requiredProperty: string;
  /** Property */
  nullableProperty: Date | null;
}

function _deserializeDatetimeProperty(
  input: DatetimePropertyOutput,
): DatetimeProperty {
  return {
    requiredProperty: passthroughDeserializer(input["requiredProperty"]),
    nullableProperty: deserializeUtcDateTime(input["nullableProperty"]),
  };
}

export const deserializeDatetimeProperty = withNullChecks(
  _deserializeDatetimeProperty,
);

export function datetimePropertySerializer(
  item: DatetimeProperty,
): DatetimePropertyRest {
  return {
    requiredProperty: item["requiredProperty"],
    nullableProperty:
      item["nullableProperty"] === null
        ? null
        : item["nullableProperty"].toISOString(),
  };
}

/** Template type for testing models with nullable property. Pass in the type of the property you are looking for */
export interface BytesProperty {
  /** Required property */
  requiredProperty: string;
  /** Property */
  nullableProperty: Uint8Array | null;
}

function _deserializeBytesProperty(input: BytesPropertyOutput): BytesProperty {
  return {
    requiredProperty: passthroughDeserializer(input["requiredProperty"]),
    nullableProperty: deserializeBytes(input["nullableProperty"], "base64"),
  };
}

export const deserializeBytesProperty = withNullChecks(
  _deserializeBytesProperty,
);

export function bytesPropertySerializer(
  item: BytesProperty,
): BytesPropertyRest {
  return {
    requiredProperty: item["requiredProperty"],
    nullableProperty:
      item["nullableProperty"] === null
        ? null
        : uint8ArrayToString(item["nullableProperty"], "base64"),
  };
}

/** Template type for testing models with nullable property. Pass in the type of the property you are looking for */
export interface StringProperty {
  /** Required property */
  requiredProperty: string;
  /** Property */
  nullableProperty: string | null;
}

function _deserializeStringProperty(
  input: StringPropertyOutput,
): StringProperty {
  return {
    requiredProperty: passthroughDeserializer(input["requiredProperty"]),
    nullableProperty: passthroughDeserializer(input["nullableProperty"]),
  };
}

export const deserializeStringProperty = withNullChecks(
  _deserializeStringProperty,
);

export function stringPropertySerializer(
  item: StringProperty,
): StringPropertyRest {
  return {
    requiredProperty: item["requiredProperty"],
    nullableProperty: item["nullableProperty"],
  };
}
