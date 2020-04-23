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
import { QnAMakerClientContext } from "./qnAMakerClientContext";

class QnAMakerClient extends QnAMakerClientContext {
  /**
   * Initializes a new instance of the QnAMakerClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param endpoint Supported Cognitive Services endpoints (protocol and hostname, for example:
   *                 https://westus.api.cognitive.microsoft.com).
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    endpoint: string,
    options?: Models.QnAMakerClientOptionalParams
  ) {
    super(credentials, endpoint, options);
    this.endpointSettings = new operations.EndpointSettings(this);
    this.endpointKeys = new operations.EndpointKeys(this);
    this.alterations = new operations.Alterations(this);
    this.knowledgebase = new operations.Knowledgebase(this);
    this.operations = new operations.Operations(this);
  }

  endpointSettings: operations.EndpointSettings;
  endpointKeys: operations.EndpointKeys;
  alterations: operations.Alterations;
  knowledgebase: operations.Knowledgebase;
  operations: operations.Operations;
}

// Operation Specifications

export {
  QnAMakerClient,
  QnAMakerClientContext,
  Models as QnAMakerModels,
  Mappers as QnAMakerMappers
};
export * from "./operations";
