/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { ServiceClientOptions } from "@azure/ms-rest-js";
import * as msRest from "@azure/ms-rest-js";

/**
 * The product documentation.
 */
export interface ChildProduct {
  /**
   * Count
   */
  count?: number;
}

/**
 * The product documentation.
 */
export interface ConstantProduct {
}

/**
 * The product documentation.
 */
export interface Product {
  /**
   * Non required array of unique items from 0 to 6 elements.
   */
  displayNames?: string[];
  /**
   * Non required int betwen 0 and 100 exclusive.
   */
  capacity?: number;
  /**
   * Image URL representing the product.
   */
  image?: string;
  child: ChildProduct;
  /**
   * Constant string as Enum. Possible values include: 'constant_string_as_enum'
   */
  constStringAsEnum?: EnumConst;
}

/**
 * An interface representing ErrorModel.
 */
export interface ErrorModel {
  code?: number;
  message?: string;
  fields?: string;
}

/**
 * An interface representing AutoRestValidationTestOptions.
 */
export interface AutoRestValidationTestOptions extends ServiceClientOptions {
  baseUri?: string;
}

/**
 * Optional Parameters.
 */
export interface AutoRestValidationTestValidationOfBodyOptionalParams extends msRest.RequestOptionsBase {
  body?: Product;
}

/**
 * Optional Parameters.
 */
export interface AutoRestValidationTestPostWithConstantInBodyOptionalParams extends msRest.RequestOptionsBase {
  body?: Product;
}

/**
 * Defines values for EnumConst.
 * Possible values include: 'constant_string_as_enum'
 * @readonly
 * @enum {string}
 */
export type EnumConst = 'constant_string_as_enum';

/**
 * Contains response data for the validationOfMethodParameters operation.
 */
export type ValidationOfMethodParametersResponse = Product & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Product;
    };
};

/**
 * Contains response data for the validationOfBody operation.
 */
export type ValidationOfBodyResponse = Product & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Product;
    };
};

/**
 * Contains response data for the postWithConstantInBody operation.
 */
export type PostWithConstantInBodyResponse = Product & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Product;
    };
};
