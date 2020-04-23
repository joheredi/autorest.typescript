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
import { MicrosoftResourceHealthContext } from "./microsoftResourceHealthContext";

class MicrosoftResourceHealth extends MicrosoftResourceHealthContext {
  /**
   * Initializes a new instance of the MicrosoftResourceHealth class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId Subscription credentials which uniquely identify Microsoft Azure subscription.
   *                       The subscription ID forms part of the URI for every service call.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    subscriptionId: string,
    options?: Models.MicrosoftResourceHealthOptionalParams
  ) {
    super(credentials, subscriptionId, options);
    this.availabilityStatuses = new operations.AvailabilityStatuses(this);
    this.childAvailabilityStatuses = new operations.ChildAvailabilityStatuses(
      this
    );
    this.childResources = new operations.ChildResources(this);
    this.operations = new operations.Operations(this);
    this.emergingIssues = new operations.EmergingIssues(this);
  }

  availabilityStatuses: operations.AvailabilityStatuses;
  childAvailabilityStatuses: operations.ChildAvailabilityStatuses;
  childResources: operations.ChildResources;
  operations: operations.Operations;
  emergingIssues: operations.EmergingIssues;
}

// Operation Specifications

export {
  MicrosoftResourceHealth,
  MicrosoftResourceHealthContext,
  Models as MicrosoftResourceHealthModels,
  Mappers as MicrosoftResourceHealthMappers
};
export * from "./operations";
