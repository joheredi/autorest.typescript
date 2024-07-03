// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
} from "./models.js";
export {
  GetModelOptionalParams,
  PutModelOptionalParams,
  GetRecursiveModelOptionalParams,
  PutRecursiveModelOptionalParams,
  GetMissingDiscriminatorOptionalParams,
  GetWrongDiscriminatorOptionalParams,
} from "./options.js";
