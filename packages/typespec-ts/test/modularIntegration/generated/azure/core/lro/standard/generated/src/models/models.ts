// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import { ExportedUserOutput, User as UserRest } from "../rest/index.js";

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

/** The API version. */
export type Versions = "2022-12-01-preview";

function _deserializeExportedUser(input: ExportedUserOutput): ExportedUser {
  return {
    name: passthroughDeserializer(input["name"]) as any,
    resourceUri: passthroughDeserializer(input["resourceUri"]) as any,
  } as any;
}

export const deserializeExportedUser = withNullChecks(_deserializeExportedUser);
