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
import { HanaManagementClientContext } from "./hanaManagementClientContext";

class HanaManagementClient extends HanaManagementClientContext {
  /**
   * Initializes a new instance of the HanaManagementClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId Subscription ID which uniquely identify Microsoft Azure subscription. The
   *                       subscription ID forms part of the URI for every service call.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    subscriptionId: string,
    options?: Models.HanaManagementClientOptionalParams
  ) {
    super(credentials, subscriptionId, options);
    this.operations = new operations.Operations(this);
    this.hanaInstances = new operations.HanaInstances(this);
    this.sapMonitors = new operations.SapMonitors(this);
  }

  operations: operations.Operations;
  hanaInstances: operations.HanaInstances;
  sapMonitors: operations.SapMonitors;
}

// Operation Specifications

export {
  HanaManagementClient,
  HanaManagementClientContext,
  Models as HanaManagementModels,
  Mappers as HanaManagementMappers
};
export * from "./operations";
