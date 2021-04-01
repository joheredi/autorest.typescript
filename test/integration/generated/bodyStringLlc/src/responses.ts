import { Error, Colors, RefColorConstant } from "./models";
import { HttpResponse } from "@azure-rest/llc-shared";
import { RawHttpHeaders } from "@azure/core-https";

export type GetNull200Response = GetNull200Properties & HttpResponse;

interface GetNull200Properties {
  status: 200;
  parsedBody: string | null;
}

export type GetNulldefaultResponse = GetNulldefaultProperties & HttpResponse;

interface GetNulldefaultProperties {
  status: number;
  parsedBody: Error;
}

export type PutNull200Response = PutNull200Properties & HttpResponse;

interface PutNull200Properties {
  status: 200;
}

export type PutNulldefaultResponse = PutNulldefaultProperties & HttpResponse;

interface PutNulldefaultProperties {
  status: number;
  parsedBody: Error;
}

export type GetEmpty200Response = GetEmpty200Properties & HttpResponse;

interface GetEmpty200Properties {
  status: 200;
  parsedBody: string;
}

export type GetEmptydefaultResponse = GetEmptydefaultProperties & HttpResponse;

interface GetEmptydefaultProperties {
  status: number;
  parsedBody: Error;
}

export type PutEmpty200Response = PutEmpty200Properties & HttpResponse;

interface PutEmpty200Properties {
  status: 200;
}

export type PutEmptydefaultResponse = PutEmptydefaultProperties & HttpResponse;

interface PutEmptydefaultProperties {
  status: number;
  parsedBody: Error;
}

export type GetMbcs200Response = GetMbcs200Properties & HttpResponse;

interface GetMbcs200Properties {
  status: 200;
  parsedBody: string;
}

export type GetMbcsdefaultResponse = GetMbcsdefaultProperties & HttpResponse;

interface GetMbcsdefaultProperties {
  status: number;
  parsedBody: Error;
}

export type PutMbcs200Response = PutMbcs200Properties & HttpResponse;

interface PutMbcs200Properties {
  status: 200;
}

export type PutMbcsdefaultResponse = PutMbcsdefaultProperties & HttpResponse;

interface PutMbcsdefaultProperties {
  status: number;
  parsedBody: Error;
}

export type GetWhitespace200Response = GetWhitespace200Properties &
  HttpResponse;

interface GetWhitespace200Properties {
  status: 200;
  parsedBody: string;
}

export type GetWhitespacedefaultResponse = GetWhitespacedefaultProperties &
  HttpResponse;

interface GetWhitespacedefaultProperties {
  status: number;
  parsedBody: Error;
}

export type PutWhitespace200Response = PutWhitespace200Properties &
  HttpResponse;

interface PutWhitespace200Properties {
  status: 200;
}

export type PutWhitespacedefaultResponse = PutWhitespacedefaultProperties &
  HttpResponse;

interface PutWhitespacedefaultProperties {
  status: number;
  parsedBody: Error;
}

export type GetNotProvided200Response = GetNotProvided200Properties &
  HttpResponse;

interface GetNotProvided200Properties {
  status: 200;
  parsedBody: string;
}

export type GetNotProvideddefaultResponse = GetNotProvideddefaultProperties &
  HttpResponse;

interface GetNotProvideddefaultProperties {
  status: number;
  parsedBody: Error;
}

export type GetBase64Encoded200Response = GetBase64Encoded200Properties &
  HttpResponse;

interface GetBase64Encoded200Properties {
  status: 200;
  parsedBody: Uint8Array;
}

export type GetBase64EncodeddefaultResponse = GetBase64EncodeddefaultProperties &
  HttpResponse;

interface GetBase64EncodeddefaultProperties {
  status: number;
  parsedBody: Error;
}

export type GetBase64UrlEncoded200Response = GetBase64UrlEncoded200Properties &
  HttpResponse;

interface GetBase64UrlEncoded200Properties {
  status: 200;
  parsedBody: Uint8Array;
}

export type GetBase64UrlEncodeddefaultResponse = GetBase64UrlEncodeddefaultProperties &
  HttpResponse;

interface GetBase64UrlEncodeddefaultProperties {
  status: number;
  parsedBody: Error;
}

export type PutBase64UrlEncoded200Response = PutBase64UrlEncoded200Properties &
  HttpResponse;

interface PutBase64UrlEncoded200Properties {
  status: 200;
}

export type PutBase64UrlEncodeddefaultResponse = PutBase64UrlEncodeddefaultProperties &
  HttpResponse;

interface PutBase64UrlEncodeddefaultProperties {
  status: number;
  parsedBody: Error;
}

export type GetNullBase64UrlEncoded200Response = GetNullBase64UrlEncoded200Properties &
  HttpResponse;

interface GetNullBase64UrlEncoded200Properties {
  status: 200;
  parsedBody: Uint8Array | null;
}

export type GetNullBase64UrlEncodeddefaultResponse = GetNullBase64UrlEncodeddefaultProperties &
  HttpResponse;

interface GetNullBase64UrlEncodeddefaultProperties {
  status: number;
  parsedBody: Error;
}

export type GetNotExpandable200Response = GetNotExpandable200Properties &
  HttpResponse;

interface GetNotExpandable200Properties {
  status: 200;
  parsedBody: Colors;
}

export type GetNotExpandabledefaultResponse = GetNotExpandabledefaultProperties &
  HttpResponse;

interface GetNotExpandabledefaultProperties {
  status: number;
  parsedBody: Error;
}

export type PutNotExpandable200Response = PutNotExpandable200Properties &
  HttpResponse;

interface PutNotExpandable200Properties {
  status: 200;
}

export type PutNotExpandabledefaultResponse = PutNotExpandabledefaultProperties &
  HttpResponse;

interface PutNotExpandabledefaultProperties {
  status: number;
  parsedBody: Error;
}

export type GetReferenced200Response = GetReferenced200Properties &
  HttpResponse;

interface GetReferenced200Properties {
  status: 200;
  parsedBody: Colors;
}

export type GetReferenceddefaultResponse = GetReferenceddefaultProperties &
  HttpResponse;

interface GetReferenceddefaultProperties {
  status: number;
  parsedBody: Error;
}

export type PutReferenced200Response = PutReferenced200Properties &
  HttpResponse;

interface PutReferenced200Properties {
  status: 200;
}

export type PutReferenceddefaultResponse = PutReferenceddefaultProperties &
  HttpResponse;

interface PutReferenceddefaultProperties {
  status: number;
  parsedBody: Error;
}

export type GetReferencedConstant200Response = GetReferencedConstant200Properties &
  HttpResponse;

interface GetReferencedConstant200Properties {
  status: 200;
  parsedBody: RefColorConstant;
}

export type GetReferencedConstantdefaultResponse = GetReferencedConstantdefaultProperties &
  HttpResponse;

interface GetReferencedConstantdefaultProperties {
  status: number;
  parsedBody: Error;
}

export type PutReferencedConstant200Response = PutReferencedConstant200Properties &
  HttpResponse;

interface PutReferencedConstant200Properties {
  status: 200;
}

export type PutReferencedConstantdefaultResponse = PutReferencedConstantdefaultProperties &
  HttpResponse;

interface PutReferencedConstantdefaultProperties {
  status: number;
  parsedBody: Error;
}
