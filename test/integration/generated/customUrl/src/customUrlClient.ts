/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as operations from "./operations";
import { CustomUrlClientContext } from "./customUrlClientContext";
import { CustomUrlClientOptionalParams } from "./models";

export class CustomUrlClient extends CustomUrlClientContext {
  /**
   * Initializes a new instance of the CustomUrlClient class.
   * @param options The parameter options
   */
  constructor(options?: CustomUrlClientOptionalParams) {
    super(options);
    this.paths = new operations.Paths(this);
  }

  paths: operations.Paths;
}
