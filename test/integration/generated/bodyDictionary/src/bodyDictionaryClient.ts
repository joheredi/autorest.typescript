/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as operations from "./operations";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import { BodyDictionaryClientContext } from "./bodyDictionaryClientContext";
import { BodyDictionaryClientOptionalParams } from "./models";

class BodyDictionaryClient extends BodyDictionaryClientContext {
  /**
   * Initializes a new instance of the BodyDictionaryClient class.
   * @param options The parameter options
   */
  constructor(options?: BodyDictionaryClientOptionalParams) {
    super(options);
    this.dictionary = new operations.Dictionary(this);
  }

  dictionary: operations.Dictionary;
}

// Operation Specifications

export {
  BodyDictionaryClient,
  BodyDictionaryClientContext,
  Models as BodyDictionaryModels,
  Mappers as BodyDictionaryMappers
};
export * from "./operations";
