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
import { AzureDevOpsContext } from "./azureDevOpsContext";

class AzureDevOps extends AzureDevOpsContext {
  /**
   * Initializes a new instance of the AzureDevOps class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId Unique identifier of the Azure subscription. This is a GUID-formatted string
   *                       (e.g. 00000000-0000-0000-0000-000000000000).
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    subscriptionId: string,
    options?: Models.AzureDevOpsOptionalParams
  ) {
    super(credentials, subscriptionId, options);
    this.operations = new operations.Operations(this);
    this.pipelineTemplateDefinitions = new operations.PipelineTemplateDefinitions(
      this
    );
    this.pipelines = new operations.Pipelines(this);
  }

  operations: operations.Operations;
  pipelineTemplateDefinitions: operations.PipelineTemplateDefinitions;
  pipelines: operations.Pipelines;
}

// Operation Specifications

export {
  AzureDevOps,
  AzureDevOpsContext,
  Models as AzureDevOpsModels,
  Mappers as AzureDevOpsMappers
};
export * from "./operations";
