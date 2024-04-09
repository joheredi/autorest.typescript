// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WorldParameters } from "./parameters.js";
import { World200Response } from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface World {
  get(options?: WorldParameters): StreamableMethod<World200Response>;
}

export interface Routes {
  /** Resource for '/hello/world' has methods for the following verbs: get */
  (path: "/hello/world"): World;
}

export type HelloClient = Client & {
  path: Routes;
};
