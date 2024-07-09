// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import {
  Dog as DogRest,
  Golden as GoldenRest,
  Snake as SnakeRest,
  Cobra as CobraRest,
  CobraOutput,
  DogOutput,
  GoldenOutput,
  SnakeOutput,
} from "../rest/index.js";

/** Test extensible enum type for discriminator */
export interface Dog {
  /** the discriminator possible values: golden */
  kind: DogKind;
  /** Weight of the dog */
  weight: number;
}

export function dogUnionSerializer(item: DogUnion) {
  switch (item.kind) {
    case "golden":
      return goldenSerializer(item as Golden);

    default:
      return dogSerializer(item);
  }
}

export function dogSerializer(item: DogUnion): DogRest {
  return {
    kind: item["kind"],
    weight: item["weight"],
  };
}

/** Golden dog model */
export interface Golden extends Dog {
  /** discriminator property */
  kind: "golden";
}

export function goldenSerializer(item: Golden): GoldenRest {
  return {
    kind: item["kind"],
    weight: item["weight"],
  };
}

/** extensible enum type for discriminator */
export type DogKind = "golden";

/** Test fixed enum type for discriminator */
export interface Snake {
  /** the discriminator possible values: cobra */
  kind: SnakeKind;
  /** Length of the snake */
  length: number;
}

export function snakeUnionSerializer(item: SnakeUnion) {
  switch (item.kind) {
    case "cobra":
      return cobraSerializer(item as Cobra);

    default:
      return snakeSerializer(item);
  }
}

export function snakeSerializer(item: SnakeUnion): SnakeRest {
  return {
    kind: item["kind"],
    length: item["length"],
  };
}

/** Cobra model */
export interface Cobra extends Snake {
  /** discriminator property */
  kind: "cobra";
}

export function cobraSerializer(item: Cobra): CobraRest {
  return {
    kind: item["kind"],
    length: item["length"],
  };
}

/** fixed enum type for discriminator */
export type SnakeKind = "cobra";

function _deserializeDog(input: DogOutput): Dog {
  return {
    kind: passthroughDeserializer(input["kind"] as any) as any,
    weight: passthroughDeserializer(input["weight"]) as any,
  } as any;
}

export const deserializeDog = withNullChecks(_deserializeDog);

function _deserializeDogUnion(input: DogOutput): Dog {
  switch (input["kind"]) {
    case "golden":
      return deserializeGolden(input as Golden);
    default:
      return deserializeDog(input);
  }
}

export const deserializeDogUnion = withNullChecks(_deserializeDogUnion);

function _deserializeGolden(input: GoldenOutput): Golden {
  return {
    ...deserializeDog(input),
    kind: passthroughDeserializer(input["kind"]) as any,
  } as any;
}

export const deserializeGolden = withNullChecks(_deserializeGolden);

function _deserializeSnake(input: SnakeOutput): Snake {
  return {
    kind: passthroughDeserializer(input["kind"]) as any,
    length: passthroughDeserializer(input["length"]) as any,
  } as any;
}

export const deserializeSnake = withNullChecks(_deserializeSnake);

function _deserializeSnakeUnion(input: SnakeOutput): Snake {
  switch (input["kind"]) {
    case "cobra":
      return deserializeCobra(input as Cobra);
    default:
      return deserializeSnake(input);
  }
}

export const deserializeSnakeUnion = withNullChecks(_deserializeSnakeUnion);

function _deserializeCobra(input: CobraOutput): Cobra {
  return {
    ...deserializeSnake(input),
    kind: passthroughDeserializer(input["kind"]) as any,
  } as any;
}

export const deserializeCobra = withNullChecks(_deserializeCobra);

/** Alias for DogUnion */
export type DogUnion = Golden | Dog;
/** Alias for SnakeUnion */
export type SnakeUnion = Cobra | Snake;
