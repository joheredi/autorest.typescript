/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { Queries } from "./operations";
import { UrlMultiClientContext } from "./urlMultiClientContext";
import { UrlMultiClientOptionalParams } from "./models";

export class UrlMultiClient extends UrlMultiClientContext {
  /**
   * Initializes a new instance of the UrlMultiClient class.
   * @param options The parameter options
   */
  constructor(options?: UrlMultiClientOptionalParams) {
    super(options);
    this.queries = new Queries(this);
  }

  queries: Queries;
}
