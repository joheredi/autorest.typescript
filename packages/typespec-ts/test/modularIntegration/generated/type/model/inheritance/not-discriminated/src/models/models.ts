// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "../rest/outputModels.js";
import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import { CatOutput, PetOutput, SiameseOutput } from "../rest/outputModels.js";
import {
  Pet as PetRest,
  Cat as CatRest,
  Siamese as SiameseRest,
} from "../rest/index.js";

/** This is base model for not-discriminated normal multiple levels inheritance. */
export interface Pet {
  name: string;
}

function _deserializePet(input: PetOutput): Pet {
  return {
    name: passthroughDeserializer(input["name"]),
  };
}

export const deserializePet = withNullChecks(_deserializePet);

export function petSerializer(item: Pet): PetRest {
  return {
    name: item["name"],
  };
}

/** The second level model in the normal multiple levels inheritance. */
export interface Cat extends Pet {
  age: number;
}

function _deserializeCat(input: CatOutput): Cat {
  return {
    ...deserializePet(input),
    age: passthroughDeserializer(input["age"]),
  };
}

export const deserializeCat = withNullChecks(_deserializeCat);

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

function _deserializeSiamese(input: SiameseOutput): Siamese {
  return {
    ...deserializeCat(input),
    smart: passthroughDeserializer(input["smart"]),
  };
}

export const deserializeSiamese = withNullChecks(_deserializeSiamese);

export function siameseSerializer(item: Siamese): SiameseRest {
  return {
    age: item["age"],
    name: item["name"],
    smart: item["smart"],
  };
}
