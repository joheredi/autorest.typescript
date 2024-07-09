// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
} from "./models.js";
export {
  GetModelOptionalParams,
  PutModelOptionalParams,
  GetRecursiveModelOptionalParams,
  PutRecursiveModelOptionalParams,
  GetMissingDiscriminatorOptionalParams,
  GetWrongDiscriminatorOptionalParams,
} from "./options.js";
