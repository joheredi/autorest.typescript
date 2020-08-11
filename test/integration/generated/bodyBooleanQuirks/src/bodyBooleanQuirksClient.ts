/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as operations from "./operations";
import { BodyBooleanQuirksClientContext } from "./bodyBooleanQuirksClientContext";
import { BodyBooleanQuirksClientOptionalParams } from "./models";

export class BodyBooleanQuirksClient extends BodyBooleanQuirksClientContext {
  /**
   * Initializes a new instance of the BodyBooleanQuirksClient class.
   * @param options The parameter options
   */
  constructor(options?: BodyBooleanQuirksClientOptionalParams) {
    super(options);
    this.bool = new operations.Bool(this);
  }

  bool: operations.Bool;
}
