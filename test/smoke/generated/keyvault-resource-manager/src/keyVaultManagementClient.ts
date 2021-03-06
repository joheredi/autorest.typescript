/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import {
  Vaults,
  PrivateEndpointConnections,
  PrivateLinkResources,
  Operations
} from "./operations";
import { KeyVaultManagementClientContext } from "./keyVaultManagementClientContext";
import { KeyVaultManagementClientOptionalParams } from "./models";

export class KeyVaultManagementClient extends KeyVaultManagementClientContext {
  /**
   * Initializes a new instance of the KeyVaultManagementClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId Subscription credentials which uniquely identify Microsoft Azure subscription.
   *                       The subscription ID forms part of the URI for every service call.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    subscriptionId: string,
    options?: KeyVaultManagementClientOptionalParams
  ) {
    super(credentials, subscriptionId, options);
    this.vaults = new Vaults(this);
    this.privateEndpointConnections = new PrivateEndpointConnections(this);
    this.privateLinkResources = new PrivateLinkResources(this);
    this.operations = new Operations(this);
  }

  vaults: Vaults;
  privateEndpointConnections: PrivateEndpointConnections;
  privateLinkResources: PrivateLinkResources;
  operations: Operations;
}
