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
  BirdOutput,
  DinosaurOutput,
  EagleOutput,
  GooseOutput,
  SeaGullOutput,
  SparrowOutput,
  TRexOutput,
} from "../rest/outputModels.js";
import {
  Bird as BirdRest,
  SeaGull as SeaGullRest,
  Sparrow as SparrowRest,
  Goose as GooseRest,
  Eagle as EagleRest,
} from "../rest/index.js";

/** This is base model for polymorphic single level inheritance with a discriminator. */
export interface Bird {
  /** the discriminator possible values: seagull, sparrow, goose, eagle */
  kind: string;
  wingspan: number;
}

function _deserializeBird(input: BirdOutput): Bird {
  return {
    kind: passthroughDeserializer(input["kind"]),
    wingspan: passthroughDeserializer(input["wingspan"]),
  };
}

export const deserializeBird = withNullChecks(_deserializeBird);

function _deserializeBirdUnion(input: BirdOutput): Bird {
  switch (input["kind"]) {
    case "seagull":
      return deserializeSeaGull(input as SeaGull);
    case "sparrow":
      return deserializeSparrow(input as Sparrow);
    case "goose":
      return deserializeGoose(input as Goose);
    case "eagle":
      return deserializeEagle(input as Eagle);
    default:
      return deserializeBird(input);
  }
}

export const deserializeBirdUnion = withNullChecks(_deserializeBirdUnion);

export function birdUnionSerializer(item: BirdUnion) {
  switch (item.kind) {
    case "seagull":
      return seaGullSerializer(item as SeaGull);

    case "sparrow":
      return sparrowSerializer(item as Sparrow);

    case "goose":
      return gooseSerializer(item as Goose);

    case "eagle":
      return eagleSerializer(item as Eagle);

    default:
      return birdSerializer(item);
  }
}

export function birdSerializer(item: BirdUnion): BirdRest {
  return {
    kind: item["kind"],
    wingspan: item["wingspan"],
  };
}

/** The second level model in polymorphic single level inheritance. */
export interface SeaGull extends Bird {
  kind: "seagull";
}

function _deserializeSeaGull(input: SeaGullOutput): SeaGull {
  return {
    ...deserializeBird(input),
    kind: passthroughDeserializer(input["kind"]),
  };
}

export const deserializeSeaGull = withNullChecks(_deserializeSeaGull);

export function seaGullSerializer(item: SeaGull): SeaGullRest {
  return {
    kind: item["kind"],
    wingspan: item["wingspan"],
  };
}

/** The second level model in polymorphic single level inheritance. */
export interface Sparrow extends Bird {
  kind: "sparrow";
}

function _deserializeSparrow(input: SparrowOutput): Sparrow {
  return {
    ...deserializeBird(input),
    kind: passthroughDeserializer(input["kind"]),
  };
}

export const deserializeSparrow = withNullChecks(_deserializeSparrow);

export function sparrowSerializer(item: Sparrow): SparrowRest {
  return {
    kind: item["kind"],
    wingspan: item["wingspan"],
  };
}

/** The second level model in polymorphic single level inheritance. */
export interface Goose extends Bird {
  kind: "goose";
}

function _deserializeGoose(input: GooseOutput): Goose {
  return {
    ...deserializeBird(input),
    kind: passthroughDeserializer(input["kind"]),
  };
}

export const deserializeGoose = withNullChecks(_deserializeGoose);

export function gooseSerializer(item: Goose): GooseRest {
  return {
    kind: item["kind"],
    wingspan: item["wingspan"],
  };
}

/** The second level model in polymorphic single levels inheritance which contains references to other polymorphic instances. */
export interface Eagle extends Bird {
  kind: "eagle";
  friends?: BirdUnion[];
  hate?: Record<string, BirdUnion>;
  partner?: BirdUnion;
}

function _deserializeEagle(input: EagleOutput): Eagle {
  return {
    ...deserializeBird(input),
    kind: passthroughDeserializer(input["kind"]),
    friends: deserializeArray(input["friends"], deserializeBirdUnion),
    hate: deserializeRecord(input["hate"], deserializeBirdUnion),
    partner: deserializeBirdUnion(input["partner"]),
  };
}

export const deserializeEagle = withNullChecks(_deserializeEagle);

export function eagleSerializer(item: Eagle): EagleRest {
  return {
    kind: item["kind"],
    wingspan: item["wingspan"],
    friends: item["friends"],
    hate: !item.hate
      ? item.hate
      : (serializeRecord(item.hate as any, birdUnionSerializer) as any),
    partner: !item.partner ? item.partner : birdUnionSerializer(item.partner),
  };
}

/** Define a base class in the legacy way. Discriminator property is not explicitly defined in the model. */
export interface Dinosaur {
  size: number;
  /** the discriminator possible values: t-rex */
  kind: string;
}

function _deserializeDinosaur(input: DinosaurOutput): Dinosaur {
  return {
    kind: passthroughDeserializer(input["kind"]),
    size: passthroughDeserializer(input["size"]),
  };
}

export const deserializeDinosaur = withNullChecks(_deserializeDinosaur);

function _deserializeDinosaurUnion(input: DinosaurOutput): Dinosaur {
  switch (input["kind"]) {
    case "t-rex":
      return deserializeTRex(input as TRex);
    default:
      return deserializeDinosaur(input);
  }
}

export const deserializeDinosaurUnion = withNullChecks(
  _deserializeDinosaurUnion,
);

/** The second level legacy model in polymorphic single level inheritance. */
export interface TRex extends Dinosaur {
  kind: "t-rex";
}

function _deserializeTRex(input: TRexOutput): TRex {
  return {
    ...deserializeDinosaur(input),
    kind: passthroughDeserializer(input["kind"]),
  };
}

export const deserializeTRex = withNullChecks(_deserializeTRex);

/** Alias for BirdUnion */
export type BirdUnion = SeaGull | Sparrow | Goose | Eagle | Bird;
/** Alias for DinosaurUnion */
export type DinosaurUnion = TRex | Dinosaur;
