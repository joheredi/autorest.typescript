/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export interface ErrorModel {
  status?: number;
  message?: string;
}

export interface Widget {
  integer?: number;
  string?: string;
}

/** Contains response data for the getNull operation. */
export type DictionaryGetNullResponse = { [propertyName: string]: number } & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: number };
  };
};

/** Contains response data for the getEmpty operation. */
export type DictionaryGetEmptyResponse = { [propertyName: string]: number } & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: number };
  };
};

/** Contains response data for the getNullValue operation. */
export type DictionaryGetNullValueResponse = {
  [propertyName: string]: string;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: string };
  };
};

/** Contains response data for the getNullKey operation. */
export type DictionaryGetNullKeyResponse = {
  [propertyName: string]: string;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: string };
  };
};

/** Contains response data for the getEmptyStringKey operation. */
export type DictionaryGetEmptyStringKeyResponse = {
  [propertyName: string]: string;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: string };
  };
};

/** Contains response data for the getInvalid operation. */
export type DictionaryGetInvalidResponse = {
  [propertyName: string]: string;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: string };
  };
};

/** Contains response data for the getBooleanTfft operation. */
export type DictionaryGetBooleanTfftResponse = {
  [propertyName: string]: boolean;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: boolean };
  };
};

/** Contains response data for the getBooleanInvalidNull operation. */
export type DictionaryGetBooleanInvalidNullResponse = {
  [propertyName: string]: boolean;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: boolean };
  };
};

/** Contains response data for the getBooleanInvalidString operation. */
export type DictionaryGetBooleanInvalidStringResponse = {
  [propertyName: string]: boolean;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: boolean };
  };
};

/** Contains response data for the getIntegerValid operation. */
export type DictionaryGetIntegerValidResponse = {
  [propertyName: string]: number;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: number };
  };
};

/** Contains response data for the getIntInvalidNull operation. */
export type DictionaryGetIntInvalidNullResponse = {
  [propertyName: string]: number;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: number };
  };
};

/** Contains response data for the getIntInvalidString operation. */
export type DictionaryGetIntInvalidStringResponse = {
  [propertyName: string]: number;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: number };
  };
};

/** Contains response data for the getLongValid operation. */
export type DictionaryGetLongValidResponse = {
  [propertyName: string]: number;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: number };
  };
};

/** Contains response data for the getLongInvalidNull operation. */
export type DictionaryGetLongInvalidNullResponse = {
  [propertyName: string]: number;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: number };
  };
};

/** Contains response data for the getLongInvalidString operation. */
export type DictionaryGetLongInvalidStringResponse = {
  [propertyName: string]: number;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: number };
  };
};

/** Contains response data for the getFloatValid operation. */
export type DictionaryGetFloatValidResponse = {
  [propertyName: string]: number;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: number };
  };
};

/** Contains response data for the getFloatInvalidNull operation. */
export type DictionaryGetFloatInvalidNullResponse = {
  [propertyName: string]: number;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: number };
  };
};

/** Contains response data for the getFloatInvalidString operation. */
export type DictionaryGetFloatInvalidStringResponse = {
  [propertyName: string]: number;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: number };
  };
};

/** Contains response data for the getDoubleValid operation. */
export type DictionaryGetDoubleValidResponse = {
  [propertyName: string]: number;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: number };
  };
};

/** Contains response data for the getDoubleInvalidNull operation. */
export type DictionaryGetDoubleInvalidNullResponse = {
  [propertyName: string]: number;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: number };
  };
};

/** Contains response data for the getDoubleInvalidString operation. */
export type DictionaryGetDoubleInvalidStringResponse = {
  [propertyName: string]: number;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: number };
  };
};

/** Contains response data for the getStringValid operation. */
export type DictionaryGetStringValidResponse = {
  [propertyName: string]: string;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: string };
  };
};

/** Contains response data for the getStringWithNull operation. */
export type DictionaryGetStringWithNullResponse = {
  [propertyName: string]: string;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: string };
  };
};

/** Contains response data for the getStringWithInvalid operation. */
export type DictionaryGetStringWithInvalidResponse = {
  [propertyName: string]: string;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: string };
  };
};

/** Contains response data for the getDateValid operation. */
export type DictionaryGetDateValidResponse = {
  [propertyName: string]: Date;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: Date };
  };
};

/** Contains response data for the getDateInvalidNull operation. */
export type DictionaryGetDateInvalidNullResponse = {
  [propertyName: string]: Date;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: Date };
  };
};

/** Contains response data for the getDateInvalidChars operation. */
export type DictionaryGetDateInvalidCharsResponse = {
  [propertyName: string]: Date;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: Date };
  };
};

/** Contains response data for the getDateTimeValid operation. */
export type DictionaryGetDateTimeValidResponse = {
  [propertyName: string]: Date;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: Date };
  };
};

/** Contains response data for the getDateTimeInvalidNull operation. */
export type DictionaryGetDateTimeInvalidNullResponse = {
  [propertyName: string]: Date;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: Date };
  };
};

/** Contains response data for the getDateTimeInvalidChars operation. */
export type DictionaryGetDateTimeInvalidCharsResponse = {
  [propertyName: string]: Date;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: Date };
  };
};

/** Contains response data for the getDateTimeRfc1123Valid operation. */
export type DictionaryGetDateTimeRfc1123ValidResponse = {
  [propertyName: string]: Date;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: Date };
  };
};

/** Contains response data for the getDurationValid operation. */
export type DictionaryGetDurationValidResponse = {
  [propertyName: string]: string;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: string };
  };
};

/** Contains response data for the getByteValid operation. */
export type DictionaryGetByteValidResponse = {
  [propertyName: string]: Uint8Array;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: Uint8Array };
  };
};

/** Contains response data for the getByteInvalidNull operation. */
export type DictionaryGetByteInvalidNullResponse = {
  [propertyName: string]: Uint8Array;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: Uint8Array };
  };
};

/** Contains response data for the getBase64Url operation. */
export type DictionaryGetBase64UrlResponse = {
  [propertyName: string]: Uint8Array;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: Uint8Array };
  };
};

/** Contains response data for the getComplexNull operation. */
export type DictionaryGetComplexNullResponse = {
  [propertyName: string]: Widget;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: Widget };
  };
};

/** Contains response data for the getComplexEmpty operation. */
export type DictionaryGetComplexEmptyResponse = {
  [propertyName: string]: Widget;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: Widget };
  };
};

/** Contains response data for the getComplexItemNull operation. */
export type DictionaryGetComplexItemNullResponse = {
  [propertyName: string]: Widget | null;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: Widget | null };
  };
};

/** Contains response data for the getComplexItemEmpty operation. */
export type DictionaryGetComplexItemEmptyResponse = {
  [propertyName: string]: Widget;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: Widget };
  };
};

/** Contains response data for the getComplexValid operation. */
export type DictionaryGetComplexValidResponse = {
  [propertyName: string]: Widget;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: Widget };
  };
};

/** Contains response data for the getArrayNull operation. */
export type DictionaryGetArrayNullResponse = {
  [propertyName: string]: string[];
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: string[] };
  };
};

/** Contains response data for the getArrayEmpty operation. */
export type DictionaryGetArrayEmptyResponse = {
  [propertyName: string]: string[];
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: string[] };
  };
};

/** Contains response data for the getArrayItemNull operation. */
export type DictionaryGetArrayItemNullResponse = {
  [propertyName: string]: string[] | null;
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: string[] | null };
  };
};

/** Contains response data for the getArrayItemEmpty operation. */
export type DictionaryGetArrayItemEmptyResponse = {
  [propertyName: string]: string[];
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: string[] };
  };
};

/** Contains response data for the getArrayValid operation. */
export type DictionaryGetArrayValidResponse = {
  [propertyName: string]: string[];
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: string[] };
  };
};

/** Contains response data for the getDictionaryNull operation. */
export type DictionaryGetDictionaryNullResponse = {
  [propertyName: string]: { [propertyName: string]: string };
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: { [propertyName: string]: string } };
  };
};

/** Contains response data for the getDictionaryEmpty operation. */
export type DictionaryGetDictionaryEmptyResponse = {
  [propertyName: string]: { [propertyName: string]: string };
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: { [propertyName: string]: string } };
  };
};

/** Contains response data for the getDictionaryItemNull operation. */
export type DictionaryGetDictionaryItemNullResponse = {
  [propertyName: string]: { [propertyName: string]: string };
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: { [propertyName: string]: string } };
  };
};

/** Contains response data for the getDictionaryItemEmpty operation. */
export type DictionaryGetDictionaryItemEmptyResponse = {
  [propertyName: string]: { [propertyName: string]: string };
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: { [propertyName: string]: string } };
  };
};

/** Contains response data for the getDictionaryValid operation. */
export type DictionaryGetDictionaryValidResponse = {
  [propertyName: string]: { [propertyName: string]: string };
} & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: { [propertyName: string]: { [propertyName: string]: string } };
  };
};

/** Optional parameters. */
export interface BodyDictionaryClientOptionalParams
  extends coreHttp.ServiceClientOptions {
  /** server parameter */
  $host?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}
