// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ListParameters,
  CreateParameters,
  ReadParameters,
  UpdateParameters,
  DeleteParameters,
  AnalyzeParameters,
} from "./parameters.js";
import {
  List200Response,
  ListDefaultResponse,
  Create200Response,
  CreateDefaultResponse,
  Read200Response,
  ReadDefaultResponse,
  Update200Response,
  UpdateDefaultResponse,
  DeleteOperation204Response,
  DeleteOperationDefaultResponse,
  Analyze200Response,
  AnalyzeDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface List {
  get(
    options?: ListParameters,
  ): StreamableMethod<List200Response | ListDefaultResponse>;
  post(
    options?: CreateParameters,
  ): StreamableMethod<Create200Response | CreateDefaultResponse>;
}

export interface Read {
  get(
    options?: ReadParameters,
  ): StreamableMethod<Read200Response | ReadDefaultResponse>;
  patch(
    options?: UpdateParameters,
  ): StreamableMethod<Update200Response | UpdateDefaultResponse>;
  delete(
    options?: DeleteParameters,
  ): StreamableMethod<
    DeleteOperation204Response | DeleteOperationDefaultResponse
  >;
}

export interface Analyze {
  post(
    options?: AnalyzeParameters,
  ): StreamableMethod<Analyze200Response | AnalyzeDefaultResponse>;
}

export interface Routes {
  /** Resource for '/widgets' has methods for the following verbs: get, post */
  (path: "/widgets"): List;
  /** Resource for '/widgets/\{id\}' has methods for the following verbs: get, patch, delete */
  (path: "/widgets/{id}", id: string): Read;
  /** Resource for '/widgets/\{id\}/analyze' has methods for the following verbs: post */
  (path: "/widgets/{id}/analyze", id: string): Analyze;
}

export type DemoServiceContext = Client & {
  path: Routes;
};
