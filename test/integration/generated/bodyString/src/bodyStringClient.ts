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
import { BodyStringClientContext } from "./bodyStringClientContext";

class BodyStringClient extends BodyStringClientContext {
  string: operations.String;
  enum: operations.Enum;

  /**
   * Initializes a new instance of the BodyStringClient class.
   * @param options The parameter options
   */
  constructor(options?: any) {
    super(options);
    this.string = new operations.String(this);
    this.enum = new operations.Enum(this);
  }
}

// Operation Specifications

export {
  BodyStringClient,
  BodyStringClientContext,
  Models as BodyStringModels,
  Mappers as BodyStringMappers
};
export * from "./operations";
