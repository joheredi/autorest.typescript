// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
} from "./models.js";
export {
  GetExtensibleModelOptionalParams,
  PutExtensibleModelOptionalParams,
  GetExtensibleModelMissingDiscriminatorOptionalParams,
  GetExtensibleModelWrongDiscriminatorOptionalParams,
  GetFixedModelOptionalParams,
  PutFixedModelOptionalParams,
  GetFixedModelMissingDiscriminatorOptionalParams,
  GetFixedModelWrongDiscriminatorOptionalParams,
} from "./options.js";
