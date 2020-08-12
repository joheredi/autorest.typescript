/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import {
  PolicyAssignments,
  PolicyDefinitions,
  PolicySetDefinitions
} from "./operations";
import { PolicyClientContext } from "./policyClientContext";
import { PolicyClientOptionalParams } from "./models";

export class PolicyClient extends PolicyClientContext {
  /**
   * Initializes a new instance of the PolicyClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId The ID of the target subscription.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    subscriptionId: string,
    options?: PolicyClientOptionalParams
  ) {
    super(credentials, subscriptionId, options);
    this.policyAssignments = new PolicyAssignments(this);
    this.policyDefinitions = new PolicyDefinitions(this);
    this.policySetDefinitions = new PolicySetDefinitions(this);
  }

  policyAssignments: PolicyAssignments;
  policyDefinitions: PolicyDefinitions;
  policySetDefinitions: PolicySetDefinitions;
}
