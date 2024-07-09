// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  deserializeRecord,
  serializeRecord,
  passthroughDeserializer,
  withNullChecks,
  deserializeArray,
} from "../helpers/serializerHelpers.js";
import {
  Bird as BirdRest,
  SeaGull as SeaGullRest,
  Sparrow as SparrowRest,
  Goose as GooseRest,
  Eagle as EagleRest,
  BirdOutput,
  DinosaurOutput,
  EagleOutput,
  GooseOutput,
  SeaGullOutput,
  SparrowOutput,
  TRexOutput,
} from "../rest/index.js";

/** This is base model for polymorphic single level inheritance with a discriminator. */
export interface Bird {
  /** the discriminator possible values: seagull, sparrow, goose, eagle */
  kind: string;
  wingspan: number;
}

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

/** The second level legacy model in polymorphic single level inheritance. */
export interface TRex extends Dinosaur {
  kind: "t-rex";
}

function _deserializeBird(input: BirdOutput): Bird {
  return {
    kind: passthroughDeserializer(input["kind"]) as any,
    wingspan: passthroughDeserializer(input["wingspan"]) as any,
  } as any;
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

function _deserializeSeaGull(input: SeaGullOutput): SeaGull {
  return {
    ...deserializeBird(input),
    kind: passthroughDeserializer(input["kind"]) as any,
  } as any;
}

export const deserializeSeaGull = withNullChecks(_deserializeSeaGull);

function _deserializeSparrow(input: SparrowOutput): Sparrow {
  return {
    ...deserializeBird(input),
    kind: passthroughDeserializer(input["kind"]) as any,
  } as any;
}

export const deserializeSparrow = withNullChecks(_deserializeSparrow);

function _deserializeGoose(input: GooseOutput): Goose {
  return {
    ...deserializeBird(input),
    kind: passthroughDeserializer(input["kind"]) as any,
  } as any;
}

export const deserializeGoose = withNullChecks(_deserializeGoose);

function _deserializeEagle(input: EagleOutput): Eagle {
  return {
    ...deserializeBird(input),
    kind: passthroughDeserializer(input["kind"]) as any,
    friends: deserializeArray(input["friends"], deserializeBirdUnion) as any,
    hate: deserializeRecord(input["hate"], deserializeBirdUnion) as any,
    partner: deserializeBirdUnion(input["partner"]) as any,
  } as any;
}

export const deserializeEagle = withNullChecks(_deserializeEagle);

function _deserializeDinosaur(input: DinosaurOutput): Dinosaur {
  return {
    kind: passthroughDeserializer(input["kind"]) as any,
    size: passthroughDeserializer(input["size"]) as any,
  } as any;
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

function _deserializeTRex(input: TRexOutput): TRex {
  return {
    ...deserializeDinosaur(input),
    kind: passthroughDeserializer(input["kind"]) as any,
  } as any;
}

export const deserializeTRex = withNullChecks(_deserializeTRex);

/** Alias for BirdUnion */
export type BirdUnion = SeaGull | Sparrow | Goose | Eagle | Bird;
/** Alias for DinosaurUnion */
export type DinosaurUnion = TRex | Dinosaur;
