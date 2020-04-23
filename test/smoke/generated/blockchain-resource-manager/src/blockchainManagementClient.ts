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
import { BlockchainManagementClientContext } from "./blockchainManagementClientContext";

class BlockchainManagementClient extends BlockchainManagementClientContext {
  /**
   * Initializes a new instance of the BlockchainManagementClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId Gets the subscription Id which uniquely identifies the Microsoft Azure
   *                       subscription. The subscription ID is part of the URI for every service call.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    subscriptionId: string,
    options?: Models.BlockchainManagementClientOptionalParams
  ) {
    super(credentials, subscriptionId, options);
    this.blockchainMembers = new operations.BlockchainMembers(this);
    this.blockchainMemberOperationResults = new operations.BlockchainMemberOperationResults(
      this
    );
    this.locations = new operations.Locations(this);
    this.operations = new operations.Operations(this);
    this.skus = new operations.Skus(this);
    this.transactionNodes = new operations.TransactionNodes(this);
  }

  blockchainMembers: operations.BlockchainMembers;
  blockchainMemberOperationResults: operations.BlockchainMemberOperationResults;
  locations: operations.Locations;
  operations: operations.Operations;
  skus: operations.Skus;
  transactionNodes: operations.TransactionNodes;
}

// Operation Specifications

export {
  BlockchainManagementClient,
  BlockchainManagementClientContext,
  Models as BlockchainManagementModels,
  Mappers as BlockchainManagementMappers
};
export * from "./operations";
