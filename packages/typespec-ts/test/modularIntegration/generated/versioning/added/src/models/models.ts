// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import {
  ModelV1 as ModelV1Rest,
  ModelV1Output,
  ModelV2 as ModelV2Rest,
  ModelV2Output,
} from "../rest/index.js";

export interface ModelV1 {
  prop: string;
  enumProp: EnumV1;
  unionProp: UnionV1;
}

export function modelV1Serializer(item: ModelV1): ModelV1Rest {
  return {
    prop: item["prop"],
    enumProp: item["enumProp"],
    unionProp: item["unionProp"],
  };
}

/** Type of EnumV1 */
export type EnumV1 = "enumMemberV1" | "enumMemberV2";

export interface ModelV2 {
  prop: string;
  enumProp: EnumV2;
  unionProp: UnionV2;
}

export function modelV2Serializer(item: ModelV2): ModelV2Rest {
  return {
    prop: item["prop"],
    enumProp: item["enumProp"],
    unionProp: item["unionProp"],
  };
}

/** Type of EnumV2 */
export type EnumV2 = "enumMember";
/** The version of the API. */
export type Versions = "v1" | "v2";

function _deserializeModelV1(input: ModelV1Output): ModelV1 {
  return {
    prop: passthroughDeserializer(input["prop"]) as any,
    enumProp: passthroughDeserializer(input["enumProp"]) as any,
    unionProp: passthroughDeserializer(input["unionProp"]) as any,
  } as any;
}

export const deserializeModelV1 = withNullChecks(_deserializeModelV1);

function _deserializeModelV2(input: ModelV2Output): ModelV2 {
  return {
    prop: passthroughDeserializer(input["prop"]) as any,
    enumProp: passthroughDeserializer(input["enumProp"]) as any,
    unionProp: passthroughDeserializer(input["unionProp"]) as any,
  } as any;
}

export const deserializeModelV2 = withNullChecks(_deserializeModelV2);

/** Alias for UnionV1 */
export type UnionV1 = string | number;
/** Alias for UnionV2 */
export type UnionV2 = string | number;
