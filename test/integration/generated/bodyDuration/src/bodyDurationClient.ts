/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as operations from "./operations";
import * as Models from "./models";
import * as Mappers from "./mappers";
import { BodyDurationClientContext } from "./bodyDurationClientContext";
import { BodyDurationClientOptionalParams } from "./models";

class BodyDurationClient extends BodyDurationClientContext {
  /**
   * Initializes a new instance of the BodyDurationClient class.
   * @param options The parameter options
   */
  constructor(options?: BodyDurationClientOptionalParams) {
    super(options);
    this.duration = new operations.Duration(this);
  }

  duration: operations.Duration;
}

// Operation Specifications

export {
  BodyDurationClient,
  BodyDurationClientContext,
  Models as BodyDurationModels,
  Mappers as BodyDurationMappers
};
export * from "./operations";
