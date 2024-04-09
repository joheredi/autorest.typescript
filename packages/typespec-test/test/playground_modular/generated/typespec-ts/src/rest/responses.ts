// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import { WidgetOutput, ErrorModelOutput } from "./outputModels.js";

/** The request has succeeded. */
export interface List200Response extends HttpResponse {
  status: "200";
  body: Array<WidgetOutput>;
}

export interface ListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** The request has succeeded. */
export interface Read200Response extends HttpResponse {
  status: "200";
  body: WidgetOutput;
}

export interface ReadDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** The request has succeeded. */
export interface Create200Response extends HttpResponse {
  status: "200";
  body: WidgetOutput;
}

export interface CreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** The request has succeeded. */
export interface Update200Response extends HttpResponse {
  status: "200";
  body: WidgetOutput;
}

export interface UpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteOperation204Response extends HttpResponse {
  status: "204";
}

export interface DeleteOperationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}

/** The request has succeeded. */
export interface Analyze200Response extends HttpResponse {
  status: "200";
  body: string;
}

export interface AnalyzeDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorModelOutput;
}
