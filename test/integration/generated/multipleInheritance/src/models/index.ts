/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export interface Pet {
  name: string;
}

export type Horse = Pet & {
  isAShowHorse?: boolean;
};

export interface ErrorModel {
  status?: number;
  message?: string;
}

export interface Feline {
  meows?: boolean;
  hisses?: boolean;
}

export type Cat = Pet &
  Feline & {
    likesMilk?: boolean;
  };

export type Kitten = Cat & {
  eatsMiceYet?: boolean;
};

/**
 * Contains response data for the getHorse operation.
 */
export type MultipleInheritanceClientGetHorseResponse = Horse & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Horse;
  };
};

/**
 * Contains response data for the putHorse operation.
 */
export type MultipleInheritanceClientPutHorseResponse = {
  /**
   * The parsed response body.
   */
  body: string;

  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: string;
  };
};

/**
 * Contains response data for the getPet operation.
 */
export type MultipleInheritanceClientGetPetResponse = Pet & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
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
 * Contains response data for the putPet operation.
 */
export type MultipleInheritanceClientPutPetResponse = {
  /**
   * The parsed response body.
   */
  body: string;

  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: string;
  };
};

/**
 * Contains response data for the getFeline operation.
 */
export type MultipleInheritanceClientGetFelineResponse = Feline & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Feline;
  };
};

/**
 * Contains response data for the putFeline operation.
 */
export type MultipleInheritanceClientPutFelineResponse = {
  /**
   * The parsed response body.
   */
  body: string;

  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: string;
  };
};

/**
 * Contains response data for the getCat operation.
 */
export type MultipleInheritanceClientGetCatResponse = Cat & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Cat;
  };
};

/**
 * Contains response data for the putCat operation.
 */
export type MultipleInheritanceClientPutCatResponse = {
  /**
   * The parsed response body.
   */
  body: string;

  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: string;
  };
};

/**
 * Contains response data for the getKitten operation.
 */
export type MultipleInheritanceClientGetKittenResponse = Kitten & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Kitten;
  };
};

/**
 * Contains response data for the putKitten operation.
 */
export type MultipleInheritanceClientPutKittenResponse = {
  /**
   * The parsed response body.
   */
  body: string;

  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: string;
  };
};

/**
 * Optional parameters.
 */
export interface MultipleInheritanceClientOptionalParams
  extends coreHttp.ServiceClientOptions {
  /**
   * server parameter
   */
  $host?: string;
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}
