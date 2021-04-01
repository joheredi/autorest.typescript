import {
  GetNullParameters,
  PutNullParameters,
  GetEmptyParameters,
  PutEmptyParameters,
  GetMbcsParameters,
  PutMbcsParameters,
  GetWhitespaceParameters,
  PutWhitespaceParameters,
  GetNotProvidedParameters,
  GetBase64EncodedParameters,
  GetBase64UrlEncodedParameters,
  PutBase64UrlEncodedParameters,
  GetNullBase64UrlEncodedParameters,
  GetNotExpandableParameters,
  PutNotExpandableParameters,
  GetReferencedParameters,
  PutReferencedParameters,
  GetReferencedConstantParameters,
  PutReferencedConstantParameters
} from "./parameters";
import {
  GetNull200Response,
  GetNulldefaultResponse,
  PutNull200Response,
  PutNulldefaultResponse,
  GetEmpty200Response,
  GetEmptydefaultResponse,
  PutEmpty200Response,
  PutEmptydefaultResponse,
  GetMbcs200Response,
  GetMbcsdefaultResponse,
  PutMbcs200Response,
  PutMbcsdefaultResponse,
  GetWhitespace200Response,
  GetWhitespacedefaultResponse,
  PutWhitespace200Response,
  PutWhitespacedefaultResponse,
  GetNotProvided200Response,
  GetNotProvideddefaultResponse,
  GetBase64Encoded200Response,
  GetBase64EncodeddefaultResponse,
  GetBase64UrlEncoded200Response,
  GetBase64UrlEncodeddefaultResponse,
  PutBase64UrlEncoded200Response,
  PutBase64UrlEncodeddefaultResponse,
  GetNullBase64UrlEncoded200Response,
  GetNullBase64UrlEncodeddefaultResponse,
  GetNotExpandable200Response,
  GetNotExpandabledefaultResponse,
  PutNotExpandable200Response,
  PutNotExpandabledefaultResponse,
  GetReferenced200Response,
  GetReferenceddefaultResponse,
  PutReferenced200Response,
  PutReferenceddefaultResponse,
  GetReferencedConstant200Response,
  GetReferencedConstantdefaultResponse,
  PutReferencedConstant200Response,
  PutReferencedConstantdefaultResponse
} from "./responses";
import {
  getClient,
  ClientOptions,
  PathUncheckedClient
} from "@azure-rest/llc-shared";
import { KeyCredential, TokenCredential } from "@azure/core-auth";

export interface PutNull {
  /** Get null string value value */
  get(
    options?: GetNullParameters
  ): Promise<GetNull200Response | GetNulldefaultResponse>;
  /** Set string value null */
  put(
    options?: PutNullParameters
  ): Promise<PutNull200Response | PutNulldefaultResponse>;
}

export interface PutEmpty {
  /** Get empty string value value '' */
  get(
    options?: GetEmptyParameters
  ): Promise<GetEmpty200Response | GetEmptydefaultResponse>;
  /** Set string value empty '' */
  put(
    options?: PutEmptyParameters
  ): Promise<PutEmpty200Response | PutEmptydefaultResponse>;
}

export interface PutMbcs {
  /** Get mbcs string value '啊齄丂狛狜隣郎隣兀﨩ˊ〞〡￤℡㈱‐ー﹡﹢﹫、〓ⅰⅹ⒈€㈠㈩ⅠⅫ！￣ぁんァヶΑ︴АЯаяāɡㄅㄩ─╋︵﹄︻︱︳︴ⅰⅹɑɡ〇〾⿻⺁䜣€' */
  get(
    options?: GetMbcsParameters
  ): Promise<GetMbcs200Response | GetMbcsdefaultResponse>;
  /** Set string value mbcs '啊齄丂狛狜隣郎隣兀﨩ˊ〞〡￤℡㈱‐ー﹡﹢﹫、〓ⅰⅹ⒈€㈠㈩ⅠⅫ！￣ぁんァヶΑ︴АЯаяāɡㄅㄩ─╋︵﹄︻︱︳︴ⅰⅹɑɡ〇〾⿻⺁䜣€' */
  put(
    options?: PutMbcsParameters
  ): Promise<PutMbcs200Response | PutMbcsdefaultResponse>;
}

export interface PutWhitespace {
  /** Get string value with leading and trailing whitespace '<tab><space><space>Now is the time for all good men to come to the aid of their country<tab><space><space>' */
  get(
    options?: GetWhitespaceParameters
  ): Promise<GetWhitespace200Response | GetWhitespacedefaultResponse>;
  /** Set String value with leading and trailing whitespace '<tab><space><space>Now is the time for all good men to come to the aid of their country<tab><space><space>' */
  put(
    options?: PutWhitespaceParameters
  ): Promise<PutWhitespace200Response | PutWhitespacedefaultResponse>;
}

export interface GetNotProvided {
  /** Get String value when no string value is sent in response payload */
  get(
    options?: GetNotProvidedParameters
  ): Promise<GetNotProvided200Response | GetNotProvideddefaultResponse>;
}

export interface GetBase64Encoded {
  /** Get value that is base64 encoded */
  get(
    options?: GetBase64EncodedParameters
  ): Promise<GetBase64Encoded200Response | GetBase64EncodeddefaultResponse>;
}

export interface PutBase64UrlEncoded {
  /** Get value that is base64url encoded */
  get(
    options?: GetBase64UrlEncodedParameters
  ): Promise<
    GetBase64UrlEncoded200Response | GetBase64UrlEncodeddefaultResponse
  >;
  /** Put value that is base64url encoded */
  put(
    options: PutBase64UrlEncodedParameters
  ): Promise<
    PutBase64UrlEncoded200Response | PutBase64UrlEncodeddefaultResponse
  >;
}

export interface GetNullBase64UrlEncoded {
  /** Get null value that is expected to be base64url encoded */
  get(
    options?: GetNullBase64UrlEncodedParameters
  ): Promise<
    GetNullBase64UrlEncoded200Response | GetNullBase64UrlEncodeddefaultResponse
  >;
}

export interface PutNotExpandable {
  /** Get enum value 'red color' from enumeration of 'red color', 'green-color', 'blue_color'. */
  get(
    options?: GetNotExpandableParameters
  ): Promise<GetNotExpandable200Response | GetNotExpandabledefaultResponse>;
  /** Sends value 'red color' from enumeration of 'red color', 'green-color', 'blue_color' */
  put(
    options: PutNotExpandableParameters
  ): Promise<PutNotExpandable200Response | PutNotExpandabledefaultResponse>;
}

export interface PutReferenced {
  /** Get enum value 'red color' from enumeration of 'red color', 'green-color', 'blue_color'. */
  get(
    options?: GetReferencedParameters
  ): Promise<GetReferenced200Response | GetReferenceddefaultResponse>;
  /** Sends value 'red color' from enumeration of 'red color', 'green-color', 'blue_color' */
  put(
    options: PutReferencedParameters
  ): Promise<PutReferenced200Response | PutReferenceddefaultResponse>;
}

export interface PutReferencedConstant {
  /** Get value 'green-color' from the constant. */
  get(
    options?: GetReferencedConstantParameters
  ): Promise<
    GetReferencedConstant200Response | GetReferencedConstantdefaultResponse
  >;
  /** Sends value 'green-color' from a constant */
  put(
    options: PutReferencedConstantParameters
  ): Promise<
    PutReferencedConstant200Response | PutReferencedConstantdefaultResponse
  >;
}

export interface Routes {
  (path: "/string/null"): PutNull;
  (path: "/string/empty"): PutEmpty;
  (path: "/string/mbcs"): PutMbcs;
  (path: "/string/whitespace"): PutWhitespace;
  (path: "/string/notProvided"): GetNotProvided;
  (path: "/string/base64Encoding"): GetBase64Encoded;
  (path: "/string/base64UrlEncoding"): PutBase64UrlEncoded;
  (path: "/string/nullBase64UrlEncoding"): GetNullBase64UrlEncoded;
  (path: "/string/enum/notExpandable"): PutNotExpandable;
  (path: "/string/enum/Referenced"): PutReferenced;
  (path: "/string/enum/ReferencedConstant"): PutReferencedConstant;
}

export interface BodyStringLowLevelClientClient {
  path: Routes;
  pathUnchecked: PathUncheckedClient;
}

export interface BodyStringLowLevelClientFactory {
  (options?: ClientOptions): void;
}

export default function BodyStringLowLevelClient(
  options: ClientOptions = {}
): BodyStringLowLevelClientClient {
  const baseUrl = options.baseUrl || "http://localhost:3000";

  return (getClient(
    baseUrl,
    options
  ) as unknown) as BodyStringLowLevelClientClient;
}
