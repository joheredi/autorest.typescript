/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import {
  SystemAssignedIdentities,
  Operations,
  UserAssignedIdentities
} from "./operations";
import { ManagedServiceIdentityClientContext } from "./managedServiceIdentityClientContext";
import { ManagedServiceIdentityClientOptionalParams } from "./models";

export class ManagedServiceIdentityClient extends ManagedServiceIdentityClientContext {
  /**
   * Initializes a new instance of the ManagedServiceIdentityClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId The Id of the Subscription to which the identity belongs.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    subscriptionId: string,
    options?: ManagedServiceIdentityClientOptionalParams
  ) {
    super(credentials, subscriptionId, options);
    this.systemAssignedIdentities = new SystemAssignedIdentities(this);
    this.operations = new Operations(this);
    this.userAssignedIdentities = new UserAssignedIdentities(this);
  }

  systemAssignedIdentities: SystemAssignedIdentities;
  operations: Operations;
  userAssignedIdentities: UserAssignedIdentities;
}
