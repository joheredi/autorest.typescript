// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  Dog,
  deserializeDog,
  deserializeDogUnion,
  Golden,
  deserializeGolden,
  DogKind,
  Snake,
  deserializeSnake,
  deserializeSnakeUnion,
  Cobra,
  deserializeCobra,
  SnakeKind,
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
