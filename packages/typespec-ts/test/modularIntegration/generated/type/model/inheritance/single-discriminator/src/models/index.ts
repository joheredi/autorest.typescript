// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
} from "./models.js";
export {
  GetModelOptionalParams,
  PutModelOptionalParams,
  GetRecursiveModelOptionalParams,
  PutRecursiveModelOptionalParams,
  GetMissingDiscriminatorOptionalParams,
  GetWrongDiscriminatorOptionalParams,
  GetLegacyModelOptionalParams,
} from "./options.js";
