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
  NetworkWatcher,
  NetworkWatchersCreateOrUpdateResponse,
  NetworkWatchersGetResponse,
  TagsObject,
  NetworkWatchersUpdateTagsResponse,
  TopologyParameters,
  NetworkWatchersGetTopologyResponse,
  VerificationIPFlowParameters,
  NetworkWatchersVerifyIPFlowResponse,
  NextHopParameters,
  NetworkWatchersGetNextHopResponse,
  SecurityGroupViewParameters,
  NetworkWatchersGetVMSecurityRulesResponse,
  TroubleshootingParameters,
  NetworkWatchersGetTroubleshootingResponse,
  QueryTroubleshootingParameters,
  NetworkWatchersGetTroubleshootingResultResponse,
  FlowLogInformation,
  NetworkWatchersSetFlowLogConfigurationResponse,
  FlowLogStatusParameters,
  NetworkWatchersGetFlowLogStatusResponse,
  ConnectivityParameters,
  NetworkWatchersCheckConnectivityResponse,
  AzureReachabilityReportParameters,
  NetworkWatchersGetAzureReachabilityReportResponse,
  AvailableProvidersListParameters,
  NetworkWatchersListAvailableProvidersResponse,
  NetworkConfigurationDiagnosticParameters,
  NetworkWatchersGetNetworkConfigurationDiagnosticResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a NetworkWatchers. */
export interface NetworkWatchers {
  /**
   * Gets all network watchers by resource group.
   * @param resourceGroupName The name of the resource group.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<NetworkWatcher>;
  /**
   * Gets all network watchers by subscription.
   * @param options The options parameters.
   */
  listAll(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<NetworkWatcher>;
  /**
   * Creates or updates a network watcher in the specified resource group.
   * @param resourceGroupName The name of the resource group.
   * @param networkWatcherName The name of the network watcher.
   * @param parameters Parameters that define the network watcher resource.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: NetworkWatcher,
    options?: coreHttp.OperationOptions
  ): Promise<NetworkWatchersCreateOrUpdateResponse>;
  /**
   * Gets the specified network watcher by resource group.
   * @param resourceGroupName The name of the resource group.
   * @param networkWatcherName The name of the network watcher.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    networkWatcherName: string,
    options?: coreHttp.OperationOptions
  ): Promise<NetworkWatchersGetResponse>;
  /**
   * Deletes the specified network watcher resource.
   * @param resourceGroupName The name of the resource group.
   * @param networkWatcherName The name of the network watcher.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    networkWatcherName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>>;
  /**
   * Updates a network watcher tags.
   * @param resourceGroupName The name of the resource group.
   * @param networkWatcherName The name of the network watcher.
   * @param parameters Parameters supplied to update network watcher tags.
   * @param options The options parameters.
   */
  updateTags(
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: TagsObject,
    options?: coreHttp.OperationOptions
  ): Promise<NetworkWatchersUpdateTagsResponse>;
  /**
   * Gets the current network topology by resource group.
   * @param resourceGroupName The name of the resource group.
   * @param networkWatcherName The name of the network watcher.
   * @param parameters Parameters that define the representation of topology.
   * @param options The options parameters.
   */
  getTopology(
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: TopologyParameters,
    options?: coreHttp.OperationOptions
  ): Promise<NetworkWatchersGetTopologyResponse>;
  /**
   * Verify IP flow from the specified VM to a location given the currently configured NSG rules.
   * @param resourceGroupName The name of the resource group.
   * @param networkWatcherName The name of the network watcher.
   * @param parameters Parameters that define the IP flow to be verified.
   * @param options The options parameters.
   */
  verifyIPFlow(
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: VerificationIPFlowParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<NetworkWatchersVerifyIPFlowResponse>>;
  /**
   * Gets the next hop from the specified VM.
   * @param resourceGroupName The name of the resource group.
   * @param networkWatcherName The name of the network watcher.
   * @param parameters Parameters that define the source and destination endpoint.
   * @param options The options parameters.
   */
  getNextHop(
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: NextHopParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<NetworkWatchersGetNextHopResponse>>;
  /**
   * Gets the configured and effective security group rules on the specified VM.
   * @param resourceGroupName The name of the resource group.
   * @param networkWatcherName The name of the network watcher.
   * @param parameters Parameters that define the VM to check security groups for.
   * @param options The options parameters.
   */
  getVMSecurityRules(
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: SecurityGroupViewParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<NetworkWatchersGetVMSecurityRulesResponse>>;
  /**
   * Initiate troubleshooting on a specified resource.
   * @param resourceGroupName The name of the resource group.
   * @param networkWatcherName The name of the network watcher resource.
   * @param parameters Parameters that define the resource to troubleshoot.
   * @param options The options parameters.
   */
  getTroubleshooting(
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: TroubleshootingParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<NetworkWatchersGetTroubleshootingResponse>>;
  /**
   * Get the last completed troubleshooting result on a specified resource.
   * @param resourceGroupName The name of the resource group.
   * @param networkWatcherName The name of the network watcher resource.
   * @param parameters Parameters that define the resource to query the troubleshooting result.
   * @param options The options parameters.
   */
  getTroubleshootingResult(
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: QueryTroubleshootingParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<NetworkWatchersGetTroubleshootingResultResponse>>;
  /**
   * Configures flow log and traffic analytics (optional) on a specified resource.
   * @param resourceGroupName The name of the network watcher resource group.
   * @param networkWatcherName The name of the network watcher resource.
   * @param parameters Parameters that define the configuration of flow log.
   * @param options The options parameters.
   */
  setFlowLogConfiguration(
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: FlowLogInformation,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<NetworkWatchersSetFlowLogConfigurationResponse>>;
  /**
   * Queries status of flow log and traffic analytics (optional) on a specified resource.
   * @param resourceGroupName The name of the network watcher resource group.
   * @param networkWatcherName The name of the network watcher resource.
   * @param parameters Parameters that define a resource to query flow log and traffic analytics
   *                   (optional) status.
   * @param options The options parameters.
   */
  getFlowLogStatus(
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: FlowLogStatusParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<NetworkWatchersGetFlowLogStatusResponse>>;
  /**
   * Verifies the possibility of establishing a direct TCP connection from a virtual machine to a given
   * endpoint including another VM or an arbitrary remote server.
   * @param resourceGroupName The name of the network watcher resource group.
   * @param networkWatcherName The name of the network watcher resource.
   * @param parameters Parameters that determine how the connectivity check will be performed.
   * @param options The options parameters.
   */
  checkConnectivity(
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: ConnectivityParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<NetworkWatchersCheckConnectivityResponse>>;
  /**
   * NOTE: This feature is currently in preview and still being tested for stability. Gets the relative
   * latency score for internet service providers from a specified location to Azure regions.
   * @param resourceGroupName The name of the network watcher resource group.
   * @param networkWatcherName The name of the network watcher resource.
   * @param parameters Parameters that determine Azure reachability report configuration.
   * @param options The options parameters.
   */
  getAzureReachabilityReport(
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: AzureReachabilityReportParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<NetworkWatchersGetAzureReachabilityReportResponse>>;
  /**
   * NOTE: This feature is currently in preview and still being tested for stability. Lists all available
   * internet service providers for a specified Azure region.
   * @param resourceGroupName The name of the network watcher resource group.
   * @param networkWatcherName The name of the network watcher resource.
   * @param parameters Parameters that scope the list of available providers.
   * @param options The options parameters.
   */
  listAvailableProviders(
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: AvailableProvidersListParameters,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<NetworkWatchersListAvailableProvidersResponse>>;
  /**
   * Gets Network Configuration Diagnostic data to help customers understand and debug network behavior.
   * It provides detailed information on what security rules were applied to a specified traffic flow and
   * the result of evaluating these rules. Customers must provide details of a flow like source,
   * destination, protocol, etc. The API returns whether traffic was allowed or denied, the rules
   * evaluated for the specified flow and the evaluation results.
   * @param resourceGroupName The name of the resource group.
   * @param networkWatcherName The name of the network watcher.
   * @param parameters Parameters to get network configuration diagnostic.
   * @param options The options parameters.
   */
  getNetworkConfigurationDiagnostic(
    resourceGroupName: string,
    networkWatcherName: string,
    parameters: NetworkConfigurationDiagnosticParameters,
    options?: coreHttp.OperationOptions
  ): Promise<
    LROPoller<NetworkWatchersGetNetworkConfigurationDiagnosticResponse>
  >;
}
