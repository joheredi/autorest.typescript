// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  StringGetNullParameters,
  StringPutNullParameters,
  StringGetEmptyParameters,
  StringPutEmptyParameters,
  StringGetMbcsParameters,
  StringPutMbcsParameters,
  StringGetWhitespaceParameters,
  StringPutWhitespaceParameters,
  StringGetNotProvidedParameters,
  StringGetBase64EncodedParameters,
  StringGetBase64UrlEncodedParameters,
  StringPutBase64UrlEncodedParameters,
  StringGetNullBase64UrlEncodedParameters,
  EnumGetNotExpandableParameters,
  EnumPutNotExpandableParameters,
  EnumGetReferencedParameters,
  EnumPutReferencedParameters,
  EnumGetReferencedConstantParameters,
  EnumPutReferencedConstantParameters
} from "./parameters";
import {
  StringGetNull200Response,
  StringGetNulldefaultResponse,
  StringPutNull200Response,
  StringPutNulldefaultResponse,
  StringGetEmpty200Response,
  StringGetEmptydefaultResponse,
  StringPutEmpty200Response,
  StringPutEmptydefaultResponse,
  StringGetMbcs200Response,
  StringGetMbcsdefaultResponse,
  StringPutMbcs200Response,
  StringPutMbcsdefaultResponse,
  StringGetWhitespace200Response,
  StringGetWhitespacedefaultResponse,
  StringPutWhitespace200Response,
  StringPutWhitespacedefaultResponse,
  StringGetNotProvided200Response,
  StringGetNotProvideddefaultResponse,
  StringGetBase64Encoded200Response,
  StringGetBase64EncodeddefaultResponse,
  StringGetBase64UrlEncoded200Response,
  StringGetBase64UrlEncodeddefaultResponse,
  StringPutBase64UrlEncoded200Response,
  StringPutBase64UrlEncodeddefaultResponse,
  StringGetNullBase64UrlEncoded200Response,
  StringGetNullBase64UrlEncodeddefaultResponse,
  EnumGetNotExpandable200Response,
  EnumGetNotExpandabledefaultResponse,
  EnumPutNotExpandable200Response,
  EnumPutNotExpandabledefaultResponse,
  EnumGetReferenced200Response,
  EnumGetReferenceddefaultResponse,
  EnumPutReferenced200Response,
  EnumPutReferenceddefaultResponse,
  EnumGetReferencedConstant200Response,
  EnumGetReferencedConstantdefaultResponse,
  EnumPutReferencedConstant200Response,
  EnumPutReferencedConstantdefaultResponse
} from "./responses";
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import "@azure/core-auth";

export interface StringOperations {
  /** Get null string value value */
  getNull(
    options?: StringGetNullParameters
  ): Promise<StringGetNull200Response | StringGetNulldefaultResponse>;
  /** Set string value null */
  putNull(
    options?: StringPutNullParameters
  ): Promise<StringPutNull200Response | StringPutNulldefaultResponse>;
  /** Get empty string value value '' */
  getEmpty(
    options?: StringGetEmptyParameters
  ): Promise<StringGetEmpty200Response | StringGetEmptydefaultResponse>;
  /** Set string value empty '' */
  putEmpty(
    options: StringPutEmptyParameters
  ): Promise<StringPutEmpty200Response | StringPutEmptydefaultResponse>;
  /** Get mbcs string value '啊齄丂狛狜隣郎隣兀﨩ˊ〞〡￤℡㈱‐ー﹡﹢﹫、〓ⅰⅹ⒈€㈠㈩ⅠⅫ！￣ぁんァヶΑ︴АЯаяāɡㄅㄩ─╋︵﹄︻︱︳︴ⅰⅹɑɡ〇〾⿻⺁䜣€' */
  getMbcs(
    options?: StringGetMbcsParameters
  ): Promise<StringGetMbcs200Response | StringGetMbcsdefaultResponse>;
  /** Set string value mbcs '啊齄丂狛狜隣郎隣兀﨩ˊ〞〡￤℡㈱‐ー﹡﹢﹫、〓ⅰⅹ⒈€㈠㈩ⅠⅫ！￣ぁんァヶΑ︴АЯаяāɡㄅㄩ─╋︵﹄︻︱︳︴ⅰⅹɑɡ〇〾⿻⺁䜣€' */
  putMbcs(
    options: StringPutMbcsParameters
  ): Promise<StringPutMbcs200Response | StringPutMbcsdefaultResponse>;
  /** Get string value with leading and trailing whitespace '<tab><space><space>Now is the time for all good men to come to the aid of their country<tab><space><space>' */
  getWhitespace(
    options?: StringGetWhitespaceParameters
  ): Promise<
    StringGetWhitespace200Response | StringGetWhitespacedefaultResponse
  >;
  /** Set String value with leading and trailing whitespace '<tab><space><space>Now is the time for all good men to come to the aid of their country<tab><space><space>' */
  putWhitespace(
    options: StringPutWhitespaceParameters
  ): Promise<
    StringPutWhitespace200Response | StringPutWhitespacedefaultResponse
  >;
  /** Get String value when no string value is sent in response payload */
  getNotProvided(
    options?: StringGetNotProvidedParameters
  ): Promise<
    StringGetNotProvided200Response | StringGetNotProvideddefaultResponse
  >;
  /** Get value that is base64 encoded */
  getBase64Encoded(
    options?: StringGetBase64EncodedParameters
  ): Promise<
    StringGetBase64Encoded200Response | StringGetBase64EncodeddefaultResponse
  >;
  /** Get value that is base64url encoded */
  getBase64UrlEncoded(
    options?: StringGetBase64UrlEncodedParameters
  ): Promise<
    | StringGetBase64UrlEncoded200Response
    | StringGetBase64UrlEncodeddefaultResponse
  >;
  /** Put value that is base64url encoded */
  putBase64UrlEncoded(
    options: StringPutBase64UrlEncodedParameters
  ): Promise<
    | StringPutBase64UrlEncoded200Response
    | StringPutBase64UrlEncodeddefaultResponse
  >;
  /** Get null value that is expected to be base64url encoded */
  getNullBase64UrlEncoded(
    options?: StringGetNullBase64UrlEncodedParameters
  ): Promise<
    | StringGetNullBase64UrlEncoded200Response
    | StringGetNullBase64UrlEncodeddefaultResponse
  >;
}

export interface EnumOperations {
  /** Get enum value 'red color' from enumeration of 'red color', 'green-color', 'blue_color'. */
  getNotExpandable(
    options?: EnumGetNotExpandableParameters
  ): Promise<
    EnumGetNotExpandable200Response | EnumGetNotExpandabledefaultResponse
  >;
  /** Sends value 'red color' from enumeration of 'red color', 'green-color', 'blue_color' */
  putNotExpandable(
    options: EnumPutNotExpandableParameters
  ): Promise<
    EnumPutNotExpandable200Response | EnumPutNotExpandabledefaultResponse
  >;
  /** Get enum value 'red color' from enumeration of 'red color', 'green-color', 'blue_color'. */
  getReferenced(
    options?: EnumGetReferencedParameters
  ): Promise<EnumGetReferenced200Response | EnumGetReferenceddefaultResponse>;
  /** Sends value 'red color' from enumeration of 'red color', 'green-color', 'blue_color' */
  putReferenced(
    options: EnumPutReferencedParameters
  ): Promise<EnumPutReferenced200Response | EnumPutReferenceddefaultResponse>;
  /** Get value 'green-color' from the constant. */
  getReferencedConstant(
    options?: EnumGetReferencedConstantParameters
  ): Promise<
    | EnumGetReferencedConstant200Response
    | EnumGetReferencedConstantdefaultResponse
  >;
  /** Sends value 'green-color' from a constant */
  putReferencedConstant(
    options: EnumPutReferencedConstantParameters
  ): Promise<
    | EnumPutReferencedConstant200Response
    | EnumPutReferencedConstantdefaultResponse
  >;
}

export interface StringGetNull {
  /** Get null string value value */
  get(
    options?: StringGetNullParameters
  ): Promise<StringGetNull200Response | StringGetNulldefaultResponse>;
  /** Set string value null */
  put(
    options?: StringPutNullParameters
  ): Promise<StringPutNull200Response | StringPutNulldefaultResponse>;
}

export interface StringGetEmpty {
  /** Get empty string value value '' */
  get(
    options?: StringGetEmptyParameters
  ): Promise<StringGetEmpty200Response | StringGetEmptydefaultResponse>;
  /** Set string value empty '' */
  put(
    options: StringPutEmptyParameters
  ): Promise<StringPutEmpty200Response | StringPutEmptydefaultResponse>;
}

export interface StringGetMbcs {
  /** Get mbcs string value '啊齄丂狛狜隣郎隣兀﨩ˊ〞〡￤℡㈱‐ー﹡﹢﹫、〓ⅰⅹ⒈€㈠㈩ⅠⅫ！￣ぁんァヶΑ︴АЯаяāɡㄅㄩ─╋︵﹄︻︱︳︴ⅰⅹɑɡ〇〾⿻⺁䜣€' */
  get(
    options?: StringGetMbcsParameters
  ): Promise<StringGetMbcs200Response | StringGetMbcsdefaultResponse>;
  /** Set string value mbcs '啊齄丂狛狜隣郎隣兀﨩ˊ〞〡￤℡㈱‐ー﹡﹢﹫、〓ⅰⅹ⒈€㈠㈩ⅠⅫ！￣ぁんァヶΑ︴АЯаяāɡㄅㄩ─╋︵﹄︻︱︳︴ⅰⅹɑɡ〇〾⿻⺁䜣€' */
  put(
    options: StringPutMbcsParameters
  ): Promise<StringPutMbcs200Response | StringPutMbcsdefaultResponse>;
}

export interface StringGetWhitespace {
  /** Get string value with leading and trailing whitespace '<tab><space><space>Now is the time for all good men to come to the aid of their country<tab><space><space>' */
  get(
    options?: StringGetWhitespaceParameters
  ): Promise<
    StringGetWhitespace200Response | StringGetWhitespacedefaultResponse
  >;
  /** Set String value with leading and trailing whitespace '<tab><space><space>Now is the time for all good men to come to the aid of their country<tab><space><space>' */
  put(
    options: StringPutWhitespaceParameters
  ): Promise<
    StringPutWhitespace200Response | StringPutWhitespacedefaultResponse
  >;
}

export interface StringGetNotProvided {
  /** Get String value when no string value is sent in response payload */
  get(
    options?: StringGetNotProvidedParameters
  ): Promise<
    StringGetNotProvided200Response | StringGetNotProvideddefaultResponse
  >;
}

export interface StringGetBase64Encoded {
  /** Get value that is base64 encoded */
  get(
    options?: StringGetBase64EncodedParameters
  ): Promise<
    StringGetBase64Encoded200Response | StringGetBase64EncodeddefaultResponse
  >;
}

export interface StringGetBase64UrlEncoded {
  /** Get value that is base64url encoded */
  get(
    options?: StringGetBase64UrlEncodedParameters
  ): Promise<
    | StringGetBase64UrlEncoded200Response
    | StringGetBase64UrlEncodeddefaultResponse
  >;
  /** Put value that is base64url encoded */
  put(
    options: StringPutBase64UrlEncodedParameters
  ): Promise<
    | StringPutBase64UrlEncoded200Response
    | StringPutBase64UrlEncodeddefaultResponse
  >;
}

export interface StringGetNullBase64UrlEncoded {
  /** Get null value that is expected to be base64url encoded */
  get(
    options?: StringGetNullBase64UrlEncodedParameters
  ): Promise<
    | StringGetNullBase64UrlEncoded200Response
    | StringGetNullBase64UrlEncodeddefaultResponse
  >;
}

export interface EnumGetNotExpandable {
  /** Get enum value 'red color' from enumeration of 'red color', 'green-color', 'blue_color'. */
  get(
    options?: EnumGetNotExpandableParameters
  ): Promise<
    EnumGetNotExpandable200Response | EnumGetNotExpandabledefaultResponse
  >;
  /** Sends value 'red color' from enumeration of 'red color', 'green-color', 'blue_color' */
  put(
    options: EnumPutNotExpandableParameters
  ): Promise<
    EnumPutNotExpandable200Response | EnumPutNotExpandabledefaultResponse
  >;
}

export interface EnumGetReferenced {
  /** Get enum value 'red color' from enumeration of 'red color', 'green-color', 'blue_color'. */
  get(
    options?: EnumGetReferencedParameters
  ): Promise<EnumGetReferenced200Response | EnumGetReferenceddefaultResponse>;
  /** Sends value 'red color' from enumeration of 'red color', 'green-color', 'blue_color' */
  put(
    options: EnumPutReferencedParameters
  ): Promise<EnumPutReferenced200Response | EnumPutReferenceddefaultResponse>;
}

export interface EnumGetReferencedConstant {
  /** Get value 'green-color' from the constant. */
  get(
    options?: EnumGetReferencedConstantParameters
  ): Promise<
    | EnumGetReferencedConstant200Response
    | EnumGetReferencedConstantdefaultResponse
  >;
  /** Sends value 'green-color' from a constant */
  put(
    options: EnumPutReferencedConstantParameters
  ): Promise<
    | EnumPutReferencedConstant200Response
    | EnumPutReferencedConstantdefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/string/null' has methods for the following verbs: get, put */
  (path: "/string/null"): StringGetNull;
  /** Resource for '/string/empty' has methods for the following verbs: get, put */
  (path: "/string/empty"): StringGetEmpty;
  /** Resource for '/string/mbcs' has methods for the following verbs: get, put */
  (path: "/string/mbcs"): StringGetMbcs;
  /** Resource for '/string/whitespace' has methods for the following verbs: get, put */
  (path: "/string/whitespace"): StringGetWhitespace;
  /** Resource for '/string/notProvided' has methods for the following verbs: get */
  (path: "/string/notProvided"): StringGetNotProvided;
  /** Resource for '/string/base64Encoding' has methods for the following verbs: get */
  (path: "/string/base64Encoding"): StringGetBase64Encoded;
  /** Resource for '/string/base64UrlEncoding' has methods for the following verbs: get, put */
  (path: "/string/base64UrlEncoding"): StringGetBase64UrlEncoded;
  /** Resource for '/string/nullBase64UrlEncoding' has methods for the following verbs: get */
  (path: "/string/nullBase64UrlEncoding"): StringGetNullBase64UrlEncoded;
  /** Resource for '/string/enum/notExpandable' has methods for the following verbs: get, put */
  (path: "/string/enum/notExpandable"): EnumGetNotExpandable;
  /** Resource for '/string/enum/Referenced' has methods for the following verbs: get, put */
  (path: "/string/enum/Referenced"): EnumGetReferenced;
  /** Resource for '/string/enum/ReferencedConstant' has methods for the following verbs: get, put */
  (path: "/string/enum/ReferencedConstant"): EnumGetReferencedConstant;
}

export type BodyStringRestRestClient = Client & {
  path: Routes;
  string: StringOperations;
  enum: EnumOperations;
};

export default function BodyStringRest(
  options: ClientOptions = {}
): BodyStringRestRestClient {
  const baseUrl = options.baseUrl ?? "http://localhost:3000";

  const client = getClient(
    baseUrl,

    options
  ) as BodyStringRestRestClient;
  return {
    ...client,
    string: {
      getNull: (options) => {
        return client.path("/string/null").get(options);
      },
      putNull: (options) => {
        return client.path("/string/null").put(options);
      },
      getEmpty: (options) => {
        return client.path("/string/empty").get(options);
      },
      putEmpty: (options) => {
        return client.path("/string/empty").put(options);
      },
      getMbcs: (options) => {
        return client.path("/string/mbcs").get(options);
      },
      putMbcs: (options) => {
        return client.path("/string/mbcs").put(options);
      },
      getWhitespace: (options) => {
        return client.path("/string/whitespace").get(options);
      },
      putWhitespace: (options) => {
        return client.path("/string/whitespace").put(options);
      },
      getNotProvided: (options) => {
        return client.path("/string/notProvided").get(options);
      },
      getBase64Encoded: (options) => {
        return client.path("/string/base64Encoding").get(options);
      },
      getBase64UrlEncoded: (options) => {
        return client.path("/string/base64UrlEncoding").get(options);
      },
      putBase64UrlEncoded: (options) => {
        return client.path("/string/base64UrlEncoding").put(options);
      },
      getNullBase64UrlEncoded: (options) => {
        return client.path("/string/nullBase64UrlEncoding").get(options);
      }
    },
    enum: {
      getNotExpandable: (options) => {
        return client.path("/string/enum/notExpandable").get(options);
      },
      putNotExpandable: (options) => {
        return client.path("/string/enum/notExpandable").put(options);
      },
      getReferenced: (options) => {
        return client.path("/string/enum/Referenced").get(options);
      },
      putReferenced: (options) => {
        return client.path("/string/enum/Referenced").put(options);
      },
      getReferencedConstant: (options) => {
        return client.path("/string/enum/ReferencedConstant").get(options);
      },
      putReferencedConstant: (options) => {
        return client.path("/string/enum/ReferencedConstant").put(options);
      }
    }
  };
}
