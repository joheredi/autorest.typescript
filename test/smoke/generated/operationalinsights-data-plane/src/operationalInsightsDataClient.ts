/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as operations from "./operations";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import { OperationalInsightsDataClientContext } from "./operationalInsightsDataClientContext";

class OperationalInsightsDataClient extends OperationalInsightsDataClientContext {
  /**
   * Initializes a new instance of the OperationalInsightsDataClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    options?: Models.OperationalInsightsDataClientOptionalParams
  ) {
    super(credentials, options);
    this.query = new operations.Query(this);
    this.get = new operations.Get(this);
    this.post = new operations.Post(this);
  }

  query: operations.Query;
  get: operations.Get;
  post: operations.Post;
}

// Operation Specifications

export {
  OperationalInsightsDataClient,
  OperationalInsightsDataClientContext,
  Models as OperationalInsightsDataModels,
  Mappers as OperationalInsightsDataMappers
};
export * from "./operations";
