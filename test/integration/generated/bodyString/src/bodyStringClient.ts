/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { StringOperations, Enum } from "./operations";
import { BodyStringClientContext } from "./bodyStringClientContext";
import { BodyStringClientOptionalParams } from "./models";

export class BodyStringClient extends BodyStringClientContext {
  /**
   * Initializes a new instance of the BodyStringClient class.
   * @param options The parameter options
   */
  constructor(options?: BodyStringClientOptionalParams) {
    super(options);
    this.string = new StringOperations(this);
    this.enum = new Enum(this);
  }

  string: StringOperations;
  enum: Enum;
}
