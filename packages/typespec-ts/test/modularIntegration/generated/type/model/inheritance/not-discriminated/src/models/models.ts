// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import {
  Pet as PetRest,
  Cat as CatRest,
  Siamese as SiameseRest,
  CatOutput,
  PetOutput,
  SiameseOutput,
} from "../rest/index.js";

/** This is base model for not-discriminated normal multiple levels inheritance. */
export interface Pet {
  name: string;
}

export function petSerializer(item: Pet): PetRest {
  return {
    name: item["name"],
  };
}

/** The second level model in the normal multiple levels inheritance. */
export interface Cat extends Pet {
  age: number;
}

export function catSerializer(item: Cat): CatRest {
  return {
    name: item["name"],
    age: item["age"],
  };
}

/** The third level model in the normal multiple levels inheritance. */
export interface Siamese extends Cat {
  smart: boolean;
}

export function siameseSerializer(item: Siamese): SiameseRest {
  return {
    age: item["age"],
    name: item["name"],
    smart: item["smart"],
  };
}

function _deserializePet(input: PetOutput): Pet {
  return {
    name: passthroughDeserializer(input["name"]) as any,
  } as any;
}

export const deserializePet = withNullChecks(_deserializePet);

function _deserializeCat(input: CatOutput): Cat {
  return {
    ...deserializePet(input),
    age: passthroughDeserializer(input["age"]) as any,
  } as any;
}

export const deserializeCat = withNullChecks(_deserializeCat);

function _deserializeSiamese(input: SiameseOutput): Siamese {
  return {
    ...deserializeCat(input),
    smart: passthroughDeserializer(input["smart"]) as any,
  } as any;
}

export const deserializeSiamese = withNullChecks(_deserializeSiamese);
