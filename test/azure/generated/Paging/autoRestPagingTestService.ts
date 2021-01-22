/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import TokenCredential from "@azure/core-auth";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as operations from "./operations";
import { AutoRestPagingTestServiceContext } from "./autoRestPagingTestServiceContext";


class AutoRestPagingTestService extends AutoRestPagingTestServiceContext {
  // Operation groups
  paging: operations.Paging;

  /**
   * Initializes a new instance of the AutoRestPagingTestService class.
   * @param credentials Credentials needed for the client to connect to Azure. The simplest
   * TokenCredential credential can be obtained as follows:
   * ```js
   * const { DefaultAzureCredential } = require("@azure/identity");
   * const credential = new DefaultAzureCredential();
   * For more information about these credentials, see {@link
   * https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#authenticating-with-the-defaultazurecredential}
   * ```
   * @param [options] The parameter options
   */
  constructor(credentials: msRest.ServiceClientCredentials | TokenCredential, options?: Models.AutoRestPagingTestServiceOptions) {
    super(credentials, options);
    this.paging = new operations.Paging(this);
  }
}

// Operation Specifications

export {
  AutoRestPagingTestService,
  AutoRestPagingTestServiceContext,
  Models as AutoRestPagingTestServiceModels,
  Mappers as AutoRestPagingTestServiceMappers
};
export * from "./operations";
