// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
  deserializeRecord,
  serializeRecord,
  deserializeArray,
} from "../helpers/serializerHelpers.js";
import {
  FishOutput,
  GoblinSharkOutput,
  SalmonOutput,
  SawSharkOutput,
  SharkOutput,
} from "../rest/outputModels.js";
import {
  Fish as FishRest,
  Shark as SharkRest,
  SawShark as SawSharkRest,
  GoblinShark as GoblinSharkRest,
  Salmon as SalmonRest,
} from "../rest/index.js";

/** This is base model for polymorphic multiple levels inheritance with a discriminator. */
export interface Fish {
  age: number;
  /** the discriminator possible values: shark, salmon */
  kind: string;
}

function _deserializeFish(input: FishOutput): Fish {
  return {
    kind: passthroughDeserializer(input["kind"]),
    age: passthroughDeserializer(input["age"]),
  };
}

export const deserializeFish = withNullChecks(_deserializeFish);

function _deserializeFishUnion(input: FishOutput): Fish {
  switch (input["kind"]) {
    case "shark":
      return deserializeShark(input as Shark);
    case "salmon":
      return deserializeSalmon(input as Salmon);
    default:
      return deserializeFish(input);
  }
}

export const deserializeFishUnion = withNullChecks(_deserializeFishUnion);

export function fishUnionSerializer(item: FishUnion) {
  switch (item.kind) {
    case "shark":
      return sharkUnionSerializer(item as SharkUnion);

    case "salmon":
      return salmonSerializer(item as Salmon);

    default:
      return fishSerializer(item);
  }
}

export function fishSerializer(item: FishUnion): FishRest {
  return {
    age: item["age"],
    kind: item["kind"],
  };
}

/** The second level model in polymorphic multiple levels inheritance and it defines a new discriminator. */
export interface Shark extends Fish {
  kind: "shark";
  /** the discriminator possible values: saw, goblin */
  sharktype: string;
}

function _deserializeShark(input: SharkOutput): Shark {
  return {
    ...deserializeFish(input),
    kind: passthroughDeserializer(input["kind"]),
    sharktype: passthroughDeserializer(input["sharktype"]),
  };
}

export const deserializeShark = withNullChecks(_deserializeShark);

function _deserializeSharkUnion(input: SharkOutput): Shark {
  switch (input["sharktype"]) {
    case "saw":
      return deserializeSawShark(input as SawShark);
    case "goblin":
      return deserializeGoblinShark(input as GoblinShark);
    default:
      return deserializeShark(input);
  }
}

export const deserializeSharkUnion = withNullChecks(_deserializeSharkUnion);

export function sharkUnionSerializer(item: SharkUnion) {
  switch (item.sharktype) {
    case "saw":
      return sawSharkSerializer(item as SawShark);

    case "goblin":
      return goblinSharkSerializer(item as GoblinShark);

    default:
      return sharkSerializer(item);
  }
}

export function sharkSerializer(item: SharkUnion): SharkRest {
  return {
    age: item["age"],
    kind: item["kind"],
    sharktype: item["sharktype"],
  };
}

/** The third level model SawShark in polymorphic multiple levels inheritance. */
export interface SawShark extends Shark {
  sharktype: "saw";
}

function _deserializeSawShark(input: SawSharkOutput): SawShark {
  return {
    ...deserializeShark(input),
    sharktype: passthroughDeserializer(input["sharktype"]),
  };
}

export const deserializeSawShark = withNullChecks(_deserializeSawShark);

export function sawSharkSerializer(item: SawShark): SawSharkRest {
  return {
    kind: item["kind"],
    sharktype: item["sharktype"],
    age: item["age"],
  };
}

/** The third level model GoblinShark in polymorphic multiple levels inheritance. */
export interface GoblinShark extends Shark {
  sharktype: "goblin";
}

function _deserializeGoblinShark(input: GoblinSharkOutput): GoblinShark {
  return {
    ...deserializeShark(input),
    sharktype: passthroughDeserializer(input["sharktype"]),
  };
}

export const deserializeGoblinShark = withNullChecks(_deserializeGoblinShark);

export function goblinSharkSerializer(item: GoblinShark): GoblinSharkRest {
  return {
    kind: item["kind"],
    sharktype: item["sharktype"],
    age: item["age"],
  };
}

/** The second level model in polymorphic multiple levels inheritance which contains references to other polymorphic instances. */
export interface Salmon extends Fish {
  kind: "salmon";
  friends?: FishUnion[];
  hate?: Record<string, FishUnion>;
  partner?: FishUnion;
}

function _deserializeSalmon(input: SalmonOutput): Salmon {
  return {
    ...deserializeFish(input),
    kind: passthroughDeserializer(input["kind"]),
    friends: deserializeArray(input["friends"], deserializeFishUnion),
    hate: deserializeRecord(input["hate"], deserializeFishUnion),
    partner: deserializeFishUnion(input["partner"]),
  };
}

export const deserializeSalmon = withNullChecks(_deserializeSalmon);

export function salmonSerializer(item: Salmon): SalmonRest {
  return {
    age: item["age"],
    kind: item["kind"],
    friends: item["friends"],
    hate: !item.hate
      ? item.hate
      : (serializeRecord(item.hate as any, fishUnionSerializer) as any),
    partner: !item.partner ? item.partner : fishUnionSerializer(item.partner),
  };
}

/** Alias for FishUnion */
export type FishUnion = SharkUnion | Salmon | Fish;
/** Alias for SharkUnion */
export type SharkUnion = SawShark | GoblinShark | Shark;
