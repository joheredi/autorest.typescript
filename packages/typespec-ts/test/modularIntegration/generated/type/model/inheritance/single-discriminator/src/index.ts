// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  SingleDiscriminatorClient,
  SingleDiscriminatorClientOptions,
} from "./singleDiscriminatorClient.js";
export {
  Bird,
  SeaGull,
  Sparrow,
  Goose,
  Eagle,
  Dinosaur,
  TRex,
  deserializeBird,
  deserializeBirdUnion,
  deserializeSeaGull,
  deserializeSparrow,
  deserializeGoose,
  deserializeEagle,
  deserializeDinosaur,
  deserializeDinosaurUnion,
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
