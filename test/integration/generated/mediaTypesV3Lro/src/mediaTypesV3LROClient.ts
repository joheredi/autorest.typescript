/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as operations from "./operations";
import * as Models from "./models";
import { MediaTypesV3LROClientContext } from "./mediaTypesV3LROClientContext";

class MediaTypesV3LROClient extends MediaTypesV3LROClientContext {
  /**
   * Initializes a new instance of the MediaTypesV3LROClient class.
   * @param $host server parameter
   * @param options The parameter options
   */
  constructor(
    $host: string,
    options?: Models.MediaTypesV3LROClientOptionalParams
  ) {
    super($host, options);
    this.fooApi = new operations.FooApi(this);
  }

  fooApi: operations.FooApi;
}

// Operation Specifications

export {
  MediaTypesV3LROClient,
  MediaTypesV3LROClientContext,
  Models as MediaTypesV3LROModels
};
export * from "./operations";
