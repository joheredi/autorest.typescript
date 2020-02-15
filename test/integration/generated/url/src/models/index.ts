/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

/**
 * An interface representing Error.
 */
export interface ErrorModel {
  status?: number;
  message?: string;
}

/**
 * Defines values for UriColor.
 */
export type UriColor = "red color" | "green color" | "blue color";

/**
 * Optional parameters.
 */
export interface QueriesGetBooleanNullOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * null boolean value
   */
  boolQuery?: boolean;
}

/**
 * Optional parameters.
 */
export interface QueriesGetIntNullOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * null integer value
   */
  intQuery?: number;
}

/**
 * Optional parameters.
 */
export interface QueriesGetLongNullOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * null 64 bit integer value
   */
  longQuery?: number;
}

/**
 * Optional parameters.
 */
export interface QueriesFloatNullOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * null numeric value
   */
  floatQuery?: number;
}

/**
 * Optional parameters.
 */
export interface QueriesDoubleNullOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * null numeric value
   */
  doubleQuery?: number;
}

/**
 * Optional parameters.
 */
export interface QueriesStringNullOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * null string value
   */
  stringQuery?: string;
}

/**
 * Optional parameters.
 */
export interface QueriesEnumValidOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * 'green color' enum value
   */
  enumQuery?: UriColor;
}

/**
 * Optional parameters.
 */
export interface QueriesEnumNullOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * 'green color' enum value
   */
  enumQuery?: UriColor;
}

/**
 * Optional parameters.
 */
export interface QueriesByteMultiByteOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * '啊齄丂狛狜隣郎隣兀﨩' multibyte value as utf-8 encoded byte array
   */
  byteQuery?: Uint8Array;
}

/**
 * Optional parameters.
 */
export interface QueriesByteNullOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * '啊齄丂狛狜隣郎隣兀﨩' multibyte value as utf-8 encoded byte array
   */
  byteQuery?: Uint8Array;
}

/**
 * Optional parameters.
 */
export interface QueriesDateNullOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * null as date (no query parameters in uri)
   */
  dateQuery?: Date;
}

/**
 * Optional parameters.
 */
export interface QueriesDateTimeNullOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * null as date-time (no query parameters)
   */
  dateTimeQuery?: Date;
}

/**
 * Optional parameters.
 */
export interface QueriesArrayStringCsvValidOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * an array of string ['ArrayQuery1', 'begin!*'();:@ &=+$,/?#[]end' , null, ''] using the csv-array format
   */
  arrayQuery?: string[];
}

/**
 * Optional parameters.
 */
export interface QueriesArrayStringCsvNullOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * an array of string ['ArrayQuery1', 'begin!*'();:@ &=+$,/?#[]end' , null, ''] using the csv-array format
   */
  arrayQuery?: string[];
}

/**
 * Optional parameters.
 */
export interface QueriesArrayStringCsvEmptyOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * an array of string ['ArrayQuery1', 'begin!*'();:@ &=+$,/?#[]end' , null, ''] using the csv-array format
   */
  arrayQuery?: string[];
}

/**
 * Optional parameters.
 */
export interface QueriesArrayStringSsvValidOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * an array of string ['ArrayQuery1', 'begin!*'();:@ &=+$,/?#[]end' , null, ''] using the ssv-array format
   */
  arrayQuery?: string[];
}

/**
 * Optional parameters.
 */
export interface QueriesArrayStringTsvValidOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * an array of string ['ArrayQuery1', 'begin!*'();:@ &=+$,/?#[]end' , null, ''] using the tsv-array format
   */
  arrayQuery?: string[];
}

/**
 * Optional parameters.
 */
export interface QueriesArrayStringPipesValidOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * an array of string ['ArrayQuery1', 'begin!*'();:@ &=+$,/?#[]end' , null, ''] using the pipes-array format
   */
  arrayQuery?: string[];
}

/**
 * Optional parameters.
 */
export interface PathItemsGetAllWithValuesOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * A string value 'pathItemStringQuery' that appears as a query parameter
   */
  pathItemStringQuery?: string;
  /**
   * should contain value 'localStringQuery'
   */
  localStringQuery?: string;
}

/**
 * Optional parameters.
 */
export interface PathItemsGetGlobalQueryNullOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * A string value 'pathItemStringQuery' that appears as a query parameter
   */
  pathItemStringQuery?: string;
  /**
   * should contain value 'localStringQuery'
   */
  localStringQuery?: string;
}

/**
 * Optional parameters.
 */
export interface PathItemsGetGlobalAndLocalQueryNullOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * A string value 'pathItemStringQuery' that appears as a query parameter
   */
  pathItemStringQuery?: string;
  /**
   * should contain value 'localStringQuery'
   */
  localStringQuery?: string;
}

/**
 * Optional parameters.
 */
export interface PathItemsGetLocalPathItemQueryNullOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * A string value 'pathItemStringQuery' that appears as a query parameter
   */
  pathItemStringQuery?: string;
  /**
   * should contain value 'localStringQuery'
   */
  localStringQuery?: string;
}

/**
 * Optional parameters.
 */
export interface UrlClientOptionalParams extends coreHttp.ServiceClientOptions {
  /**
   * server parameter
   */
  $host?: string;
  /**
   * should contain value null
   */
  globalStringQuery?: string;
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}
