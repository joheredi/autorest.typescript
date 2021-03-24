/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import { LROPoller } from "../lro";
import {
  Vault,
  VaultsListByResourceGroupNextOptionalParams,
  VaultsListByResourceGroupOptionalParams,
  VaultsListBySubscriptionNextOptionalParams,
  VaultsListBySubscriptionOptionalParams,
  DeletedVault,
  Resource,
  VaultsListNextOptionalParams,
  VaultsListOptionalParams,
  VaultCreateOrUpdateParameters,
  VaultsCreateOrUpdateResponse,
  VaultPatchParameters,
  VaultsUpdateResponse,
  VaultsGetResponse,
  VaultAccessPolicyParameters,
  AccessPolicyUpdateKind,
  VaultsUpdateAccessPolicyResponse,
  VaultsGetDeletedResponse,
  VaultCheckNameAvailabilityParameters,
  VaultsCheckNameAvailabilityResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Vaults. */
export interface Vaults {
  /**
   * The List operation gets information about the vaults associated with the subscription and within the
   * specified resource group.
   * @param resourceGroupName The name of the Resource Group to which the vault belongs.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: VaultsListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<Vault>;
  /**
   * The List operation gets information about the vaults associated with the subscription.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: VaultsListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<Vault>;
  /**
   * Gets information about the deleted vaults in a subscription.
   * @param options The options parameters.
   */
  listDeleted(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<DeletedVault>;
  /**
   * The List operation gets information about the vaults associated with the subscription.
   * @param options The options parameters.
   */
  list(
    options?: VaultsListOptionalParams
  ): PagedAsyncIterableIterator<Resource>;
  /**
   * Create or update a key vault in the specified subscription.
   * @param resourceGroupName The name of the Resource Group to which the server belongs.
   * @param vaultName Name of the vault
   * @param parameters Parameters to create or update the vault
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    vaultName: string,
    parameters: VaultCreateOrUpdateParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<VaultsCreateOrUpdateResponse>>;
  /**
   * Update a key vault in the specified subscription.
   * @param resourceGroupName The name of the Resource Group to which the server belongs.
   * @param vaultName Name of the vault
   * @param parameters Parameters to patch the vault
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    vaultName: string,
    parameters: VaultPatchParameters,
    options?: coreHttp.OperationOptions
  ): Promise<VaultsUpdateResponse>;
  /**
   * Deletes the specified Azure key vault.
   * @param resourceGroupName The name of the Resource Group to which the vault belongs.
   * @param vaultName The name of the vault to delete
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    vaultName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Gets the specified Azure key vault.
   * @param resourceGroupName The name of the Resource Group to which the vault belongs.
   * @param vaultName The name of the vault.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    vaultName: string,
    options?: coreHttp.OperationOptions
  ): Promise<VaultsGetResponse>;
  /**
   * Update access policies in a key vault in the specified subscription.
   * @param resourceGroupName The name of the Resource Group to which the vault belongs.
   * @param vaultName Name of the vault
   * @param operationKind Name of the operation
   * @param parameters Access policy to merge into the vault
   * @param options The options parameters.
   */
  updateAccessPolicy(
    resourceGroupName: string,
    vaultName: string,
    operationKind: AccessPolicyUpdateKind,
    parameters: VaultAccessPolicyParameters,
    options?: coreHttp.OperationOptions
  ): Promise<VaultsUpdateAccessPolicyResponse>;
  /**
   * Gets the deleted Azure key vault.
   * @param vaultName The name of the vault.
   * @param location The location of the deleted vault.
   * @param options The options parameters.
   */
  getDeleted(
    vaultName: string,
    location: string,
    options?: coreHttp.OperationOptions
  ): Promise<VaultsGetDeletedResponse>;
  /**
   * Permanently deletes the specified vault. aka Purges the deleted Azure key vault.
   * @param vaultName The name of the soft-deleted vault.
   * @param location The location of the soft-deleted vault.
   * @param options The options parameters.
   */
  purgeDeleted(
    vaultName: string,
    location: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>>;
  /**
   * Checks that the vault name is valid and is not already in use.
   * @param vaultName The name of the vault.
   * @param options The options parameters.
   */
  checkNameAvailability(
    vaultName: VaultCheckNameAvailabilityParameters,
    options?: coreHttp.OperationOptions
  ): Promise<VaultsCheckNameAvailabilityResponse>;
}
