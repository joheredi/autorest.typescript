// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  NestedDiscriminatorClient,
  NestedDiscriminatorClientOptions,
} from "./nestedDiscriminatorClient.js";
export {
  Fish,
  Shark,
  SawShark,
  GoblinShark,
  Salmon,
  deserializeFish,
  deserializeFishUnion,
  deserializeShark,
  deserializeSharkUnion,
  deserializeSawShark,
  deserializeGoblinShark,
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
