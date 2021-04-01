import { RequestParameters } from "@azure-rest/llc-shared";
import { Colors, RefColorConstant } from "./models";

export type GetNullParameters = RequestParameters;

interface PutNullBodyParam {
  body?: string | null;
}

export type PutNullParameters = RequestParameters & PutNullBodyParam;
export type GetEmptyParameters = RequestParameters;
export type PutEmptyParameters = RequestParameters;
export type GetMbcsParameters = RequestParameters;
export type PutMbcsParameters = RequestParameters;
export type GetWhitespaceParameters = RequestParameters;
export type PutWhitespaceParameters = RequestParameters;
export type GetNotProvidedParameters = RequestParameters;
export type GetBase64EncodedParameters = RequestParameters;
export type GetBase64UrlEncodedParameters = RequestParameters;

interface PutBase64UrlEncodedBodyParam {
  body: Uint8Array;
}

export type PutBase64UrlEncodedParameters = RequestParameters &
  PutBase64UrlEncodedBodyParam;
export type GetNullBase64UrlEncodedParameters = RequestParameters;
export type GetNotExpandableParameters = RequestParameters;

interface PutNotExpandableBodyParam {
  body: Colors;
}

export type PutNotExpandableParameters = RequestParameters &
  PutNotExpandableBodyParam;
export type GetReferencedParameters = RequestParameters;

interface PutReferencedBodyParam {
  body: Colors;
}

export type PutReferencedParameters = RequestParameters &
  PutReferencedBodyParam;
export type GetReferencedConstantParameters = RequestParameters;

interface PutReferencedConstantBodyParam {
  body: RefColorConstant;
}

export type PutReferencedConstantParameters = RequestParameters &
  PutReferencedConstantBodyParam;
