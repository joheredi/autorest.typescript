// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetLanguages200Response,
  GetLanguagesDefaultResponse,
  Translate200Response,
  TranslateDefaultResponse,
  Transliterate200Response,
  TransliterateDefaultResponse,
  Detect200Response,
  DetectDefaultResponse,
  BreakSentence200Response,
  BreakSentenceDefaultResponse,
  DictionaryLookup200Response,
  DictionaryLookupDefaultResponse,
  DictionaryExamples200Response,
  DictionaryExamplesDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /languages": ["200"],
  "POST /translate": ["200"],
  "POST /transliterate": ["200"],
  "POST /detect": ["200"],
  "POST /breaksentence": ["200"],
  "POST /dictionary/lookup": ["200"],
  "POST /dictionary/examples": ["200"],
};

export function isUnexpected(
  response: GetLanguages200Response | GetLanguagesDefaultResponse
): response is GetLanguagesDefaultResponse;
export function isUnexpected(
  response: Translate200Response | TranslateDefaultResponse
): response is TranslateDefaultResponse;
export function isUnexpected(
  response: Transliterate200Response | TransliterateDefaultResponse
): response is TransliterateDefaultResponse;
export function isUnexpected(
  response: Detect200Response | DetectDefaultResponse
): response is DetectDefaultResponse;
export function isUnexpected(
  response: BreakSentence200Response | BreakSentenceDefaultResponse
): response is BreakSentenceDefaultResponse;
export function isUnexpected(
  response: DictionaryLookup200Response | DictionaryLookupDefaultResponse
): response is DictionaryLookupDefaultResponse;
export function isUnexpected(
  response: DictionaryExamples200Response | DictionaryExamplesDefaultResponse
): response is DictionaryExamplesDefaultResponse;
export function isUnexpected(
  response:
    | GetLanguages200Response
    | GetLanguagesDefaultResponse
    | Translate200Response
    | TranslateDefaultResponse
    | Transliterate200Response
    | TransliterateDefaultResponse
    | Detect200Response
    | DetectDefaultResponse
    | BreakSentence200Response
    | BreakSentenceDefaultResponse
    | DictionaryLookup200Response
    | DictionaryLookupDefaultResponse
    | DictionaryExamples200Response
    | DictionaryExamplesDefaultResponse
): response is
  | GetLanguagesDefaultResponse
  | TranslateDefaultResponse
  | TransliterateDefaultResponse
  | DetectDefaultResponse
  | BreakSentenceDefaultResponse
  | DictionaryLookupDefaultResponse
  | DictionaryExamplesDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  const pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    return true;
  }
  return !pathDetails.includes(response.status);
}