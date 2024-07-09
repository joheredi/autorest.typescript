// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
  deserializeArray,
} from "../helpers/serializerHelpers.js";
import {
  MixedTypesCases as MixedTypesCasesRest,
  Cat as CatRest,
  MixedLiteralsCases as MixedLiteralsCasesRest,
  StringAndArrayCases as StringAndArrayCasesRest,
  EnumsOnlyCases as EnumsOnlyCasesRest,
  Dog as DogRest,
  CatOutput,
  DogOutput,
  EnumsOnlyCasesOutput,
  MixedLiteralsCasesOutput,
  MixedTypesCasesOutput,
  StringAndArrayCasesOutput,
} from "../rest/index.js";

export interface MixedTypesCases {
  /** This should be receive/send the Cat variant */
  model: Cat | "a" | number | boolean;
  /** This should be receive/send the "a" variant */
  literal: Cat | "a" | number | boolean;
  /** This should be receive/send the int variant */
  int: Cat | "a" | number | boolean;
  /** This should be receive/send the boolean variant */
  boolean: Cat | "a" | number | boolean;
  /** This should be receive/send 4 element with Cat, "a", int, and boolean */
  array: (Cat | "a" | number | boolean)[];
}

export function mixedTypesCasesSerializer(
  item: MixedTypesCases,
): MixedTypesCasesRest {
  return {
    model: item["model"],
    literal: item["literal"],
    int: item["int"],
    boolean: item["boolean"],
    array: item["array"],
  };
}

export interface Cat {
  name: string;
}

export function catSerializer(item: Cat): CatRest {
  return {
    name: item["name"],
  };
}

export interface MixedLiteralsCases {
  /** This should be receive/send the "a" variant */
  stringLiteral: "a" | 2 | 3.3 | true;
  /** This should be receive/send the 2 variant */
  intLiteral: "a" | 2 | 3.3 | true;
  /** This should be receive/send the 3.3 variant */
  floatLiteral: "a" | 2 | 3.3 | true;
  /** This should be receive/send the true variant */
  booleanLiteral: "a" | 2 | 3.3 | true;
}

export function mixedLiteralsCasesSerializer(
  item: MixedLiteralsCases,
): MixedLiteralsCasesRest {
  return {
    stringLiteral: item["stringLiteral"],
    intLiteral: item["intLiteral"],
    floatLiteral: item["floatLiteral"],
    booleanLiteral: item["booleanLiteral"],
  };
}

export interface StringAndArrayCases {
  /** This should be receive/send the string variant */
  string: string | string[];
  /** This should be receive/send the array variant */
  array: string | string[];
}

export function stringAndArrayCasesSerializer(
  item: StringAndArrayCases,
): StringAndArrayCasesRest {
  return {
    string: item["string"],
    array: item["array"],
  };
}

export interface EnumsOnlyCases {
  /** This should be receive/send the left variant */
  lr: Lr | Ud;
  /** This should be receive/send the up variant */
  ud: Ud | Ud;
}

export function enumsOnlyCasesSerializer(
  item: EnumsOnlyCases,
): EnumsOnlyCasesRest {
  return {
    lr: item["lr"],
    ud: item["ud"],
  };
}

/** Type of Lr */
export type Lr = "left" | "right";
/** Type of Ud */
export type Ud = "up" | "down";

export interface Dog {
  bark: string;
}

export function dogSerializer(item: Dog): DogRest {
  return {
    bark: item["bark"],
  };
}

/** Type of StringExtensibleNamedUnion */
export type StringExtensibleNamedUnion = string;

export enum KnownStringExtensibleNamedUnion {
  b = "b",
  c = "c",
}

/** This interface for an anonymous model */
interface GetResponse {
  prop: MixedTypesCases;
}

/** This interface for an anonymous model */
interface GetResponse1 {
  prop: MixedLiteralsCases;
}

/** This interface for an anonymous model */
interface GetResponse2 {
  prop: StringAndArrayCases;
}

/** This interface for an anonymous model */
interface GetResponse3 {
  prop: EnumsOnlyCases;
}

/** This interface for an anonymous model */
interface GetResponse4 {
  prop: Cat | Dog;
}

/** This interface for an anonymous model */
interface GetResponse5 {
  prop: 1.1 | 2.2 | 3.3;
}

/** This interface for an anonymous model */
interface GetResponse6 {
  prop: 1 | 2 | 3;
}

/** This interface for an anonymous model */
interface GetResponse7 {
  prop: "b" | "c";
}

/** This interface for an anonymous model */
interface GetResponse8 {
  prop: "b" | "c";
}

/** This interface for an anonymous model */
interface GetResponse9 {
  prop: "a" | "b" | "c";
}

export interface MixedTypesCases {
  /** This should be receive/send the Cat variant */
  model: Cat | "a" | number | boolean;
  /** This should be receive/send the "a" variant */
  literal: Cat | "a" | number | boolean;
  /** This should be receive/send the int variant */
  int: Cat | "a" | number | boolean;
  /** This should be receive/send the boolean variant */
  boolean: Cat | "a" | number | boolean;
  /** This should be receive/send 4 element with Cat, "a", int, and boolean */
  array: (Cat | "a" | number | boolean)[];
}

export interface MixedLiteralsCases {
  /** This should be receive/send the "a" variant */
  stringLiteral: "a" | 2 | 3.3 | true;
  /** This should be receive/send the 2 variant */
  intLiteral: "a" | 2 | 3.3 | true;
  /** This should be receive/send the 3.3 variant */
  floatLiteral: "a" | 2 | 3.3 | true;
  /** This should be receive/send the true variant */
  booleanLiteral: "a" | 2 | 3.3 | true;
}

export interface StringAndArrayCases {
  /** This should be receive/send the string variant */
  string: string | string[];
  /** This should be receive/send the array variant */
  array: string | string[];
}

export interface EnumsOnlyCases {
  /** This should be receive/send the left variant */
  lr: ("left" | "right") | ("up" | "down");
  /** This should be receive/send the up variant */
  ud: ("up" | "down") | ("up" | "down");
}

export interface Cat {
  name: string;
}

export interface Dog {
  bark: string;
}

function _deserializeMixedTypesCases(
  input: MixedTypesCasesOutput,
): MixedTypesCases {
  return {
    model: passthroughDeserializer(input["model"]) as any,
    literal: passthroughDeserializer(input["literal"]) as any,
    int: passthroughDeserializer(input["int"]) as any,
    boolean: passthroughDeserializer(input["boolean"]) as any,
    array: deserializeArray(input["array"], passthroughDeserializer) as any,
  } as any;
}

export const deserializeMixedTypesCases = withNullChecks(
  _deserializeMixedTypesCases,
);

function _deserializeCat(input: CatOutput): Cat {
  return {
    name: passthroughDeserializer(input["name"]) as any,
  } as any;
}

export const deserializeCat = withNullChecks(_deserializeCat);

function _deserializeMixedLiteralsCases(
  input: MixedLiteralsCasesOutput,
): MixedLiteralsCases {
  return {
    stringLiteral: passthroughDeserializer(input["stringLiteral"]) as any,
    intLiteral: passthroughDeserializer(input["intLiteral"]) as any,
    floatLiteral: passthroughDeserializer(input["floatLiteral"]) as any,
    booleanLiteral: passthroughDeserializer(input["booleanLiteral"]) as any,
  } as any;
}

export const deserializeMixedLiteralsCases = withNullChecks(
  _deserializeMixedLiteralsCases,
);

function _deserializeStringAndArrayCases(
  input: StringAndArrayCasesOutput,
): StringAndArrayCases {
  return {
    string: passthroughDeserializer(input["string"]) as any,
    array: passthroughDeserializer(input["array"]) as any,
  } as any;
}

export const deserializeStringAndArrayCases = withNullChecks(
  _deserializeStringAndArrayCases,
);

function _deserializeEnumsOnlyCases(
  input: EnumsOnlyCasesOutput,
): EnumsOnlyCases {
  return {
    lr: passthroughDeserializer(input["lr"]) as any,
    ud: passthroughDeserializer(input["ud"]) as any,
  } as any;
}

export const deserializeEnumsOnlyCases = withNullChecks(
  _deserializeEnumsOnlyCases,
);

function _deserializeDog(input: DogOutput): Dog {
  return {
    bark: passthroughDeserializer(input["bark"]) as any,
  } as any;
}

export const deserializeDog = withNullChecks(_deserializeDog);

function _deserializeGetResponse(input: any): GetResponse {
  return {
    prop: deserializeMixedTypesCases(input["prop"]) as any,
  } as any;
}

export const deserializeGetResponse = withNullChecks(_deserializeGetResponse);

function _deserializeGetResponse1(input: any): GetResponse1 {
  return {
    prop: deserializeMixedLiteralsCases(input["prop"]) as any,
  } as any;
}

export const deserializeGetResponse1 = withNullChecks(_deserializeGetResponse1);

function _deserializeGetResponse2(input: any): GetResponse2 {
  return {
    prop: deserializeStringAndArrayCases(input["prop"]) as any,
  } as any;
}

export const deserializeGetResponse2 = withNullChecks(_deserializeGetResponse2);

function _deserializeGetResponse3(input: any): GetResponse3 {
  return {
    prop: deserializeEnumsOnlyCases(input["prop"]) as any,
  } as any;
}

export const deserializeGetResponse3 = withNullChecks(_deserializeGetResponse3);

function _deserializeGetResponse4(input: any): GetResponse4 {
  return {
    prop: passthroughDeserializer(input["prop"]) as any,
  } as any;
}

export const deserializeGetResponse4 = withNullChecks(_deserializeGetResponse4);

function _deserializeGetResponse5(input: any): GetResponse5 {
  return {
    prop: passthroughDeserializer(input["prop"]) as any,
  } as any;
}

export const deserializeGetResponse5 = withNullChecks(_deserializeGetResponse5);

function _deserializeGetResponse6(input: any): GetResponse6 {
  return {
    prop: passthroughDeserializer(input["prop"]) as any,
  } as any;
}

export const deserializeGetResponse6 = withNullChecks(_deserializeGetResponse6);

function _deserializeGetResponse7(input: any): GetResponse7 {
  return {
    prop: passthroughDeserializer(input["prop"] as any) as any,
  } as any;
}

export const deserializeGetResponse7 = withNullChecks(_deserializeGetResponse7);

function _deserializeGetResponse8(input: any): GetResponse8 {
  return {
    prop: passthroughDeserializer(input["prop"] as any) as any,
  } as any;
}

export const deserializeGetResponse8 = withNullChecks(_deserializeGetResponse8);

function _deserializeGetResponse9(input: any): GetResponse9 {
  return {
    prop: passthroughDeserializer(input["prop"]) as any,
  } as any;
}

export const deserializeGetResponse9 = withNullChecks(_deserializeGetResponse9);
