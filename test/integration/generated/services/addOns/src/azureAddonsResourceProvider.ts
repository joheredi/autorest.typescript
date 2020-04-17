/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as operations from "./operations";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import { AzureAddonsResourceProviderContext } from "./azureAddonsResourceProviderContext";

class AzureAddonsResourceProvider extends AzureAddonsResourceProviderContext {
  /**
   * Initializes a new instance of the AzureAddonsResourceProvider class.
   * @param subscriptionId Subscription credentials that uniquely identify the Microsoft Azure
   *                       subscription. The subscription ID forms part of the URI for every service call.
   * @param options The parameter options
   */
  constructor(
    subscriptionId: string,
    options?: Models.AzureAddonsResourceProviderOptionalParams
  ) {
    super(subscriptionId, options);
    this.operations = new operations.Operations(this);
    this.supportPlanTypes = new operations.SupportPlanTypes(this);
  }

  operations: operations.Operations;
  supportPlanTypes: operations.SupportPlanTypes;
}

// Operation Specifications

export {
  AzureAddonsResourceProvider,
  AzureAddonsResourceProviderContext,
  Models as AzureAddonsResourceProviderModels,
  Mappers as AzureAddonsResourceProviderMappers
};
export * from "./operations";
