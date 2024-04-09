// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { Widget } from "./models.js";

export type ListParameters = RequestParameters;
export type ReadParameters = RequestParameters;

export interface CreateBodyParam {
  body?: Widget;
}

export type CreateParameters = CreateBodyParam & RequestParameters;

export interface UpdateBodyParam {
  body?: Widget;
}

export type UpdateParameters = UpdateBodyParam & RequestParameters;
export type DeleteParameters = RequestParameters;
export type AnalyzeParameters = RequestParameters;
