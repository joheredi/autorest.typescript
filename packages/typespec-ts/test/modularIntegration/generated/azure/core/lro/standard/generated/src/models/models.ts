// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "../rest/outputModels.js";
import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import { ExportedUserOutput } from "../rest/outputModels.js";
import { User as UserRest } from "../rest/index.js";

/** Details about a user. */
export interface User {
  /** The name of user. */
  readonly name: string;
  /** The role of user */
  role: string;
}

export function userSerializer(item: User): UserRest {
  return {
    role: item["role"],
  };
}

/** The exported user data. */
export interface ExportedUser {
  /** The name of user. */
  name: string;
  /** The exported URI. */
  resourceUri: string;
}

function _deserializeExportedUser(input: ExportedUserOutput): ExportedUser {
  return {
    name: passthroughDeserializer(input["name"]),
    resourceUri: passthroughDeserializer(input["resourceUri"]),
  };
}

export const deserializeExportedUser = withNullChecks(_deserializeExportedUser);

/** The API version. */
export type Versions = "2022-12-01-preview";
