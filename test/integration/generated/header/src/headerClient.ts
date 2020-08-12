/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { Header } from "./operations";
import { HeaderClientContext } from "./headerClientContext";
import { HeaderClientOptionalParams } from "./models";

export class HeaderClient extends HeaderClientContext {
  /**
   * Initializes a new instance of the HeaderClient class.
   * @param options The parameter options
   */
  constructor(options?: HeaderClientOptionalParams) {
    super(options);
    this.header = new Header(this);
  }

  header: Header;
}
