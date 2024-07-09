// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
