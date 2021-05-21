// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { Colors, RefColorConstant } from "./models";

export type StringGetNullParameters = RequestParameters;

export interface StringPutNullBodyParam {
  body?: string | null;
}

export type StringPutNullParameters = RequestParameters &
  StringPutNullBodyParam;
export type StringGetEmptyParameters = RequestParameters;
export type StringPutEmptyParameters = RequestParameters;
export type StringGetMbcsParameters = RequestParameters;
export type StringPutMbcsParameters = RequestParameters;
export type StringGetWhitespaceParameters = RequestParameters;
export type StringPutWhitespaceParameters = RequestParameters;
export type StringGetNotProvidedParameters = RequestParameters;
export type StringGetBase64EncodedParameters = RequestParameters;
export type StringGetBase64UrlEncodedParameters = RequestParameters;

export interface StringPutBase64UrlEncodedBodyParam {
  body: Uint8Array;
}

export type StringPutBase64UrlEncodedParameters = RequestParameters &
  StringPutBase64UrlEncodedBodyParam;
export type StringGetNullBase64UrlEncodedParameters = RequestParameters;
export type EnumGetNotExpandableParameters = RequestParameters;

export interface EnumPutNotExpandableBodyParam {
  body: Colors;
}

export type EnumPutNotExpandableParameters = RequestParameters &
  EnumPutNotExpandableBodyParam;
export type EnumGetReferencedParameters = RequestParameters;

export interface EnumPutReferencedBodyParam {
  body: Colors;
}

export type EnumPutReferencedParameters = RequestParameters &
  EnumPutReferencedBodyParam;
export type EnumGetReferencedConstantParameters = RequestParameters;

export interface EnumPutReferencedConstantBodyParam {
  body: RefColorConstant;
}

export type EnumPutReferencedConstantParameters = RequestParameters &
  EnumPutReferencedConstantBodyParam;
