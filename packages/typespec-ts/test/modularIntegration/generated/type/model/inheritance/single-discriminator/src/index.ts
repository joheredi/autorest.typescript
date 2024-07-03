// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  SingleDiscriminatorClient,
  SingleDiscriminatorClientOptions,
} from "./singleDiscriminatorClient.js";
export {
  Bird,
  deserializeBird,
  deserializeBirdUnion,
  SeaGull,
  deserializeSeaGull,
  Sparrow,
  deserializeSparrow,
  Goose,
  deserializeGoose,
  Eagle,
  deserializeEagle,
  Dinosaur,
  deserializeDinosaur,
  deserializeDinosaurUnion,
  TRex,
  deserializeTRex,
  BirdUnion,
  DinosaurUnion,
  GetModelOptionalParams,
  PutModelOptionalParams,
  GetRecursiveModelOptionalParams,
  PutRecursiveModelOptionalParams,
  GetMissingDiscriminatorOptionalParams,
  GetWrongDiscriminatorOptionalParams,
  GetLegacyModelOptionalParams,
} from "./models/index.js";
