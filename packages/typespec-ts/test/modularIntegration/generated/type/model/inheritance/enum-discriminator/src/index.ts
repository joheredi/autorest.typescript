// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  EnumDiscriminatorClient,
  EnumDiscriminatorClientOptions,
} from "./enumDiscriminatorClient.js";
export {
  Dog,
  Golden,
  DogKind,
  Snake,
  Cobra,
  SnakeKind,
  deserializeDog,
  deserializeDogUnion,
  deserializeGolden,
  deserializeSnake,
  deserializeSnakeUnion,
  deserializeCobra,
  DogUnion,
  SnakeUnion,
  GetExtensibleModelOptionalParams,
  PutExtensibleModelOptionalParams,
  GetExtensibleModelMissingDiscriminatorOptionalParams,
  GetExtensibleModelWrongDiscriminatorOptionalParams,
  GetFixedModelOptionalParams,
  PutFixedModelOptionalParams,
  GetFixedModelMissingDiscriminatorOptionalParams,
  GetFixedModelWrongDiscriminatorOptionalParams,
} from "./models/index.js";
