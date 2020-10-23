/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as operations from "./operations";
import { AutoRestParameterizedCustomHostTestClientContext } from "./autoRestParameterizedCustomHostTestClientContext";

class AutoRestParameterizedCustomHostTestClient extends AutoRestParameterizedCustomHostTestClientContext {
  // Operation groups
  paths: operations.Paths;

  /**
   * Initializes a new instance of the AutoRestParameterizedCustomHostTestClient class.
   * @param subscriptionId The subscription id with value 'test12'.
   * @param [options] The parameter options
   */
  constructor(subscriptionId: string, options?: Models.AutoRestParameterizedCustomHostTestClientOptions) {
    super(subscriptionId, options);
    this.paths = new operations.Paths(this);
  }
}

// Operation Specifications

export {
  AutoRestParameterizedCustomHostTestClient,
  AutoRestParameterizedCustomHostTestClientContext,
  Models as AutoRestParameterizedCustomHostTestModels,
  Mappers as AutoRestParameterizedCustomHostTestMappers
};
export * from "./operations";
