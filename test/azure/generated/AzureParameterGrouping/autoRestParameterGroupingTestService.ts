/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as operations from "./operations";
import { AutoRestParameterGroupingTestServiceContext } from "./autoRestParameterGroupingTestServiceContext";


class AutoRestParameterGroupingTestService extends AutoRestParameterGroupingTestServiceContext {
  // Operation groups
  parameterGrouping: operations.ParameterGrouping;

  /**
   * Initializes a new instance of the AutoRestParameterGroupingTestService class.
   * @param credentials Credentials needed for the client to connect to Azure.
   * @param [options] The parameter options
   */
  constructor(credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials, options?: Models.AutoRestParameterGroupingTestServiceOptions) {
    super(credentials, options);
    this.parameterGrouping = new operations.ParameterGrouping(this);
  }
}

// Operation Specifications

export {
  AutoRestParameterGroupingTestService,
  AutoRestParameterGroupingTestServiceContext,
  Models as AutoRestParameterGroupingTestServiceModels,
  Mappers as AutoRestParameterGroupingTestServiceMappers
};
export * from "./operations";