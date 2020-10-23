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
 * An interface representing Animal.
 */
export interface Animal {
  aniType?: string;
}

/**
 * An interface representing Pet.
 */
export interface Pet extends Animal {
  /**
   * Gets the Pet by id.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly name?: string;
}

/**
 * An interface representing BaseError.
 */
export interface BaseError {
  someBaseProp?: string;
}

/**
 * Contains the possible cases for NotFoundErrorBase.
 */
export type NotFoundErrorBaseUnion = NotFoundErrorBase | LinkNotFound | AnimalNotFound;

/**
 * An interface representing NotFoundErrorBase.
 */
export interface NotFoundErrorBase {
  /**
   * Polymorphic Discriminator
   */
  whatNotFound: "NotFoundErrorBase";
  someBaseProp?: string;
  reason?: string;
}

/**
 * An interface representing LinkNotFound.
 */
export interface LinkNotFound {
  /**
   * Polymorphic Discriminator
   */
  whatNotFound: "InvalidResourceLink";
  someBaseProp?: string;
  reason?: string;
  whatSubAddress?: string;
}

/**
 * An interface representing AnimalNotFound.
 */
export interface AnimalNotFound {
  /**
   * Polymorphic Discriminator
   */
  whatNotFound: "AnimalNotFound";
  someBaseProp?: string;
  reason?: string;
  name?: string;
}

/**
 * An interface representing PetAction.
 */
export interface PetAction {
  /**
   * action feedback
   */
  actionResponse?: string;
}

/**
 * Contains the possible cases for PetActionError.
 */
export type PetActionErrorUnion = PetActionError | PetSadErrorUnion;

/**
 * An interface representing PetActionError.
 */
export interface PetActionError {
  /**
   * Polymorphic Discriminator
   */
  errorType: "PetActionError";
  /**
   * the error message
   */
  errorMessage?: string;
}

/**
 * Contains the possible cases for PetSadError.
 */
export type PetSadErrorUnion = PetSadError | PetHungryOrThirstyError;

/**
 * An interface representing PetSadError.
 */
export interface PetSadError {
  /**
   * Polymorphic Discriminator
   */
  errorType: "PetSadError";
  /**
   * the error message
   */
  errorMessage?: string;
  /**
   * why is the pet sad
   */
  reason?: string;
}

/**
 * An interface representing PetHungryOrThirstyError.
 */
export interface PetHungryOrThirstyError {
  /**
   * Polymorphic Discriminator
   */
  errorType: "PetHungryOrThirstyError";
  /**
   * the error message
   */
  errorMessage?: string;
  /**
   * why is the pet sad
   */
  reason?: string;
  /**
   * is the pet hungry or thirsty or both
   */
  hungryOrThirsty?: string;
}

/**
 * An interface representing XMSErrorResponseExtensionsOptions.
 */
export interface XMSErrorResponseExtensionsOptions extends ServiceClientOptions {
  baseUri?: string;
}

/**
 * Contains response data for the getPetById operation.
 */
export type PetGetPetByIdResponse = Pet & {
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
 * Contains response data for the doSomething operation.
 */
export type PetDoSomethingResponse = PetAction & {
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
      parsedBody: PetAction;
    };
};
