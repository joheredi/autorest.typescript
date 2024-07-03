// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  NestedDiscriminatorClient,
  NestedDiscriminatorClientOptions,
} from "./nestedDiscriminatorClient.js";
export {
  Fish,
  deserializeFish,
  deserializeFishUnion,
  Shark,
  deserializeShark,
  deserializeSharkUnion,
  SawShark,
  deserializeSawShark,
  GoblinShark,
  deserializeGoblinShark,
  Salmon,
  deserializeSalmon,
  FishUnion,
  SharkUnion,
  GetModelOptionalParams,
  PutModelOptionalParams,
  GetRecursiveModelOptionalParams,
  PutRecursiveModelOptionalParams,
  GetMissingDiscriminatorOptionalParams,
  GetWrongDiscriminatorOptionalParams,
} from "./models/index.js";
