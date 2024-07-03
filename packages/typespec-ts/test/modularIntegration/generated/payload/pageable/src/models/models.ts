// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "../rest/outputModels.js";
import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import { UserOutput } from "../rest/outputModels.js";

/** User model */
export interface User {
  /** User name */
  name: string;
}

function _deserializeUser(input: UserOutput): User {
  return {
    name: passthroughDeserializer(input["name"]),
  };
}

export const deserializeUser = withNullChecks(_deserializeUser);

/** Paged collection of User items */
export interface PagedUser {
  /** The User items on this page */
  value: User[];
  /** The link to the next page of items */
  nextLink?: string;
}
