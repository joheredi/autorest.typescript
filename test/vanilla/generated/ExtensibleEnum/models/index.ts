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
 * An interface representing Pet.
 */
export interface Pet {
  name?: string;
  /**
   * Type of Pet. Possible values include: 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
   * 'Saturday', 'Sunday'. Default value: 'Friday'.
   */
  daysOfWeek?: DaysOfWeekExtensibleEnum;
  /**
   * Possible values include: '1', '2', '3'
   */
  intEnum: IntEnum;
}

/**
 * An interface representing PetStoreIncOptions.
 */
export interface PetStoreIncOptions extends ServiceClientOptions {
  baseUri?: string;
}

/**
 * Optional Parameters.
 */
export interface PetAddPetOptionalParams extends msRest.RequestOptionsBase {
  petParam?: Pet;
}

/**
 * Defines values for DaysOfWeekExtensibleEnum.
 * Possible values include: 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
 * 'Sunday'
 * @readonly
 * @enum {string}
 */
export type DaysOfWeekExtensibleEnum = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

/**
 * Defines values for IntEnum.
 * Possible values include: '1', '2', '3'
 * @readonly
 * @enum {string}
 */
export type IntEnum = '1' | '2' | '3';

/**
 * Contains response data for the getByPetId operation.
 */
export type PetGetByPetIdResponse = Pet & {
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
      parsedBody: Pet;
    };
};

/**
 * Contains response data for the addPet operation.
 */
export type PetAddPetResponse = Pet & {
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
      parsedBody: Pet;
    };
};
