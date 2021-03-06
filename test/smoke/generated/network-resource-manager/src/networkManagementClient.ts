/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import { LROPoller, shouldDeserializeLRO } from "./lro";
import {
  ApplicationGateways,
  ApplicationSecurityGroups,
  AvailableDelegations,
  AvailableResourceGroupDelegations,
  AvailableServiceAliases,
  AzureFirewalls,
  AzureFirewallFqdnTags,
  BastionHosts,
  DdosCustomPolicies,
  DdosProtectionPlans,
  AvailableEndpointServices,
  ExpressRouteCircuitAuthorizations,
  ExpressRouteCircuitPeerings,
  ExpressRouteCircuitConnections,
  PeerExpressRouteCircuitConnections,
  ExpressRouteCircuits,
  ExpressRouteServiceProviders,
  ExpressRouteCrossConnections,
  ExpressRouteCrossConnectionPeerings,
  ExpressRoutePortsLocations,
  ExpressRoutePorts,
  ExpressRouteLinks,
  FirewallPolicies,
  FirewallPolicyRuleGroups,
  IpAllocations,
  IpGroups,
  LoadBalancers,
  LoadBalancerBackendAddressPools,
  LoadBalancerFrontendIPConfigurations,
  InboundNatRules,
  LoadBalancerLoadBalancingRules,
  LoadBalancerOutboundRules,
  LoadBalancerNetworkInterfaces,
  LoadBalancerProbes,
  NatGateways,
  NetworkInterfaces,
  NetworkInterfaceIPConfigurations,
  NetworkInterfaceLoadBalancers,
  NetworkInterfaceTapConfigurations,
  NetworkProfiles,
  NetworkSecurityGroups,
  SecurityRules,
  DefaultSecurityRules,
  NetworkVirtualAppliances,
  NetworkWatchers,
  PacketCaptures,
  ConnectionMonitors,
  FlowLogs,
  Operations,
  PrivateEndpoints,
  AvailablePrivateEndpointTypes,
  PrivateDnsZoneGroups,
  PrivateLinkServices,
  PublicIPAddresses,
  PublicIPPrefixes,
  RouteFilters,
  RouteFilterRules,
  RouteTables,
  Routes,
  SecurityPartnerProviders,
  BgpServiceCommunities,
  ServiceEndpointPolicies,
  ServiceEndpointPolicyDefinitions,
  ServiceTags,
  Usages,
  VirtualNetworks,
  Subnets,
  ResourceNavigationLinks,
  ServiceAssociationLinks,
  VirtualNetworkPeerings,
  VirtualNetworkGateways,
  VirtualNetworkGatewayConnections,
  LocalNetworkGateways,
  VirtualNetworkTaps,
  VirtualRouters,
  VirtualRouterPeerings,
  VirtualWans,
  VpnSites,
  VpnSiteLinks,
  VpnSitesConfiguration,
  VpnServerConfigurations,
  VirtualHubs,
  HubVirtualNetworkConnections,
  VpnGateways,
  VpnConnections,
  VpnSiteLinkConnections,
  VpnLinkConnections,
  P2SVpnGateways,
  VpnServerConfigurationsAssociatedWithVirtualWan,
  VirtualHubRouteTableV2S,
  ExpressRouteGateways,
  ExpressRouteConnections,
  HubRouteTables,
  WebApplicationFirewallPolicies
} from "./operations";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import { NetworkManagementClientContext } from "./networkManagementClientContext";
import {
  NetworkManagementClientOptionalParams,
  BastionShareableLinkListRequest,
  NetworkManagementClientPutBastionShareableLinkResponse,
  NetworkManagementClientGetBastionShareableLinkResponse,
  NetworkManagementClientGetActiveSessionsResponse,
  SessionIds,
  NetworkManagementClientDisconnectActiveSessionsResponse,
  NetworkManagementClientCheckDnsNameAvailabilityResponse,
  NetworkManagementClientSupportedSecurityProvidersResponse,
  VirtualWanVpnProfileParameters,
  NetworkManagementClientGeneratevirtualwanvpnserverconfigurationvpnprofileResponse,
  NetworkManagementClientPutBastionShareableLinkNextResponse,
  NetworkManagementClientGetBastionShareableLinkNextResponse,
  NetworkManagementClientGetActiveSessionsNextResponse,
  NetworkManagementClientDisconnectActiveSessionsNextResponse
} from "./models";

export class NetworkManagementClient extends NetworkManagementClientContext {
  /**
   * Initializes a new instance of the NetworkManagementClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId The subscription credentials which uniquely identify the Microsoft Azure
   *                       subscription. The subscription ID forms part of the URI for every service call.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    subscriptionId: string,
    options?: NetworkManagementClientOptionalParams
  ) {
    super(credentials, subscriptionId, options);
    this.applicationGateways = new ApplicationGateways(this);
    this.applicationSecurityGroups = new ApplicationSecurityGroups(this);
    this.availableDelegations = new AvailableDelegations(this);
    this.availableResourceGroupDelegations = new AvailableResourceGroupDelegations(
      this
    );
    this.availableServiceAliases = new AvailableServiceAliases(this);
    this.azureFirewalls = new AzureFirewalls(this);
    this.azureFirewallFqdnTags = new AzureFirewallFqdnTags(this);
    this.bastionHosts = new BastionHosts(this);
    this.ddosCustomPolicies = new DdosCustomPolicies(this);
    this.ddosProtectionPlans = new DdosProtectionPlans(this);
    this.availableEndpointServices = new AvailableEndpointServices(this);
    this.expressRouteCircuitAuthorizations = new ExpressRouteCircuitAuthorizations(
      this
    );
    this.expressRouteCircuitPeerings = new ExpressRouteCircuitPeerings(this);
    this.expressRouteCircuitConnections = new ExpressRouteCircuitConnections(
      this
    );
    this.peerExpressRouteCircuitConnections = new PeerExpressRouteCircuitConnections(
      this
    );
    this.expressRouteCircuits = new ExpressRouteCircuits(this);
    this.expressRouteServiceProviders = new ExpressRouteServiceProviders(this);
    this.expressRouteCrossConnections = new ExpressRouteCrossConnections(this);
    this.expressRouteCrossConnectionPeerings = new ExpressRouteCrossConnectionPeerings(
      this
    );
    this.expressRoutePortsLocations = new ExpressRoutePortsLocations(this);
    this.expressRoutePorts = new ExpressRoutePorts(this);
    this.expressRouteLinks = new ExpressRouteLinks(this);
    this.firewallPolicies = new FirewallPolicies(this);
    this.firewallPolicyRuleGroups = new FirewallPolicyRuleGroups(this);
    this.ipAllocations = new IpAllocations(this);
    this.ipGroups = new IpGroups(this);
    this.loadBalancers = new LoadBalancers(this);
    this.loadBalancerBackendAddressPools = new LoadBalancerBackendAddressPools(
      this
    );
    this.loadBalancerFrontendIPConfigurations = new LoadBalancerFrontendIPConfigurations(
      this
    );
    this.inboundNatRules = new InboundNatRules(this);
    this.loadBalancerLoadBalancingRules = new LoadBalancerLoadBalancingRules(
      this
    );
    this.loadBalancerOutboundRules = new LoadBalancerOutboundRules(this);
    this.loadBalancerNetworkInterfaces = new LoadBalancerNetworkInterfaces(
      this
    );
    this.loadBalancerProbes = new LoadBalancerProbes(this);
    this.natGateways = new NatGateways(this);
    this.networkInterfaces = new NetworkInterfaces(this);
    this.networkInterfaceIPConfigurations = new NetworkInterfaceIPConfigurations(
      this
    );
    this.networkInterfaceLoadBalancers = new NetworkInterfaceLoadBalancers(
      this
    );
    this.networkInterfaceTapConfigurations = new NetworkInterfaceTapConfigurations(
      this
    );
    this.networkProfiles = new NetworkProfiles(this);
    this.networkSecurityGroups = new NetworkSecurityGroups(this);
    this.securityRules = new SecurityRules(this);
    this.defaultSecurityRules = new DefaultSecurityRules(this);
    this.networkVirtualAppliances = new NetworkVirtualAppliances(this);
    this.networkWatchers = new NetworkWatchers(this);
    this.packetCaptures = new PacketCaptures(this);
    this.connectionMonitors = new ConnectionMonitors(this);
    this.flowLogs = new FlowLogs(this);
    this.operations = new Operations(this);
    this.privateEndpoints = new PrivateEndpoints(this);
    this.availablePrivateEndpointTypes = new AvailablePrivateEndpointTypes(
      this
    );
    this.privateDnsZoneGroups = new PrivateDnsZoneGroups(this);
    this.privateLinkServices = new PrivateLinkServices(this);
    this.publicIPAddresses = new PublicIPAddresses(this);
    this.publicIPPrefixes = new PublicIPPrefixes(this);
    this.routeFilters = new RouteFilters(this);
    this.routeFilterRules = new RouteFilterRules(this);
    this.routeTables = new RouteTables(this);
    this.routes = new Routes(this);
    this.securityPartnerProviders = new SecurityPartnerProviders(this);
    this.bgpServiceCommunities = new BgpServiceCommunities(this);
    this.serviceEndpointPolicies = new ServiceEndpointPolicies(this);
    this.serviceEndpointPolicyDefinitions = new ServiceEndpointPolicyDefinitions(
      this
    );
    this.serviceTags = new ServiceTags(this);
    this.usages = new Usages(this);
    this.virtualNetworks = new VirtualNetworks(this);
    this.subnets = new Subnets(this);
    this.resourceNavigationLinks = new ResourceNavigationLinks(this);
    this.serviceAssociationLinks = new ServiceAssociationLinks(this);
    this.virtualNetworkPeerings = new VirtualNetworkPeerings(this);
    this.virtualNetworkGateways = new VirtualNetworkGateways(this);
    this.virtualNetworkGatewayConnections = new VirtualNetworkGatewayConnections(
      this
    );
    this.localNetworkGateways = new LocalNetworkGateways(this);
    this.virtualNetworkTaps = new VirtualNetworkTaps(this);
    this.virtualRouters = new VirtualRouters(this);
    this.virtualRouterPeerings = new VirtualRouterPeerings(this);
    this.virtualWans = new VirtualWans(this);
    this.vpnSites = new VpnSites(this);
    this.vpnSiteLinks = new VpnSiteLinks(this);
    this.vpnSitesConfiguration = new VpnSitesConfiguration(this);
    this.vpnServerConfigurations = new VpnServerConfigurations(this);
    this.virtualHubs = new VirtualHubs(this);
    this.hubVirtualNetworkConnections = new HubVirtualNetworkConnections(this);
    this.vpnGateways = new VpnGateways(this);
    this.vpnConnections = new VpnConnections(this);
    this.vpnSiteLinkConnections = new VpnSiteLinkConnections(this);
    this.vpnLinkConnections = new VpnLinkConnections(this);
    this.p2SVpnGateways = new P2SVpnGateways(this);
    this.vpnServerConfigurationsAssociatedWithVirtualWan = new VpnServerConfigurationsAssociatedWithVirtualWan(
      this
    );
    this.virtualHubRouteTableV2S = new VirtualHubRouteTableV2S(this);
    this.expressRouteGateways = new ExpressRouteGateways(this);
    this.expressRouteConnections = new ExpressRouteConnections(this);
    this.hubRouteTables = new HubRouteTables(this);
    this.webApplicationFirewallPolicies = new WebApplicationFirewallPolicies(
      this
    );
  }

  private getOperationOptions<TOptions extends coreHttp.OperationOptions>(
    options: TOptions | undefined,
    finalStateVia?: string
  ): coreHttp.RequestOptionsBase {
    const operationOptions: coreHttp.OperationOptions = options || {};
    operationOptions.requestOptions = {
      ...operationOptions.requestOptions,
      shouldDeserialize: shouldDeserializeLRO(finalStateVia)
    };
    return coreHttp.operationOptionsToRequestOptionsBase(operationOptions);
  }

  /**
   * Creates a Bastion Shareable Links for all the VMs specified in the request.
   * @param resourceGroupName The name of the resource group.
   * @param bastionHostName The name of the Bastion Host.
   * @param bslRequest Post request for all the Bastion Shareable Link endpoints.
   * @param options The options parameters.
   */
  async putBastionShareableLink(
    resourceGroupName: string,
    bastionHostName: string,
    bslRequest: BastionShareableLinkListRequest,
    options?: coreHttp.OperationOptions
  ): Promise<
    LROPoller<NetworkManagementClientPutBastionShareableLinkResponse>
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      bastionHostName,
      bslRequest,
      options: this.getOperationOptions(options, "location")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.sendOperationRequest(args, spec) as Promise<
        NetworkManagementClientPutBastionShareableLinkResponse
      >;
    const initialOperationResult = await sendOperation(
      operationArguments,
      putBastionShareableLinkOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: putBastionShareableLinkOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * Deletes the Bastion Shareable Links for all the VMs specified in the request.
   * @param resourceGroupName The name of the resource group.
   * @param bastionHostName The name of the Bastion Host.
   * @param bslRequest Post request for all the Bastion Shareable Link endpoints.
   * @param options The options parameters.
   */
  async deleteBastionShareableLink(
    resourceGroupName: string,
    bastionHostName: string,
    bslRequest: BastionShareableLinkListRequest,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<coreHttp.RestResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      bastionHostName,
      bslRequest,
      options: this.getOperationOptions(options, "location")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.sendOperationRequest(args, spec) as Promise<coreHttp.RestResponse>;
    const initialOperationResult = await sendOperation(
      operationArguments,
      deleteBastionShareableLinkOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: deleteBastionShareableLinkOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * Return the Bastion Shareable Links for all the VMs specified in the request.
   * @param resourceGroupName The name of the resource group.
   * @param bastionHostName The name of the Bastion Host.
   * @param bslRequest Post request for all the Bastion Shareable Link endpoints.
   * @param options The options parameters.
   */
  getBastionShareableLink(
    resourceGroupName: string,
    bastionHostName: string,
    bslRequest: BastionShareableLinkListRequest,
    options?: coreHttp.OperationOptions
  ): Promise<NetworkManagementClientGetBastionShareableLinkResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      bastionHostName,
      bslRequest,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      getBastionShareableLinkOperationSpec
    ) as Promise<NetworkManagementClientGetBastionShareableLinkResponse>;
  }

  /**
   * Returns the list of currently active sessions on the Bastion.
   * @param resourceGroupName The name of the resource group.
   * @param bastionHostName The name of the Bastion Host.
   * @param options The options parameters.
   */
  async getActiveSessions(
    resourceGroupName: string,
    bastionHostName: string,
    options?: coreHttp.OperationOptions
  ): Promise<LROPoller<NetworkManagementClientGetActiveSessionsResponse>> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      bastionHostName,
      options: this.getOperationOptions(options, "location")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.sendOperationRequest(args, spec) as Promise<
        NetworkManagementClientGetActiveSessionsResponse
      >;
    const initialOperationResult = await sendOperation(
      operationArguments,
      getActiveSessionsOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: getActiveSessionsOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * Returns the list of currently active sessions on the Bastion.
   * @param resourceGroupName The name of the resource group.
   * @param bastionHostName The name of the Bastion Host.
   * @param sessionIds The list of sessionids to disconnect.
   * @param options The options parameters.
   */
  disconnectActiveSessions(
    resourceGroupName: string,
    bastionHostName: string,
    sessionIds: SessionIds,
    options?: coreHttp.OperationOptions
  ): Promise<NetworkManagementClientDisconnectActiveSessionsResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      bastionHostName,
      sessionIds,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      disconnectActiveSessionsOperationSpec
    ) as Promise<NetworkManagementClientDisconnectActiveSessionsResponse>;
  }

  /**
   * Checks whether a domain name in the cloudapp.azure.com zone is available for use.
   * @param location The location of the domain name.
   * @param domainNameLabel The domain name to be verified. It must conform to the following regular
   *                        expression: ^[a-z][a-z0-9-]{1,61}[a-z0-9]$.
   * @param options The options parameters.
   */
  checkDnsNameAvailability(
    location: string,
    domainNameLabel: string,
    options?: coreHttp.OperationOptions
  ): Promise<NetworkManagementClientCheckDnsNameAvailabilityResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      location,
      domainNameLabel,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      checkDnsNameAvailabilityOperationSpec
    ) as Promise<NetworkManagementClientCheckDnsNameAvailabilityResponse>;
  }

  /**
   * Gives the supported security providers for the virtual wan.
   * @param resourceGroupName The resource group name.
   * @param virtualWANName The name of the VirtualWAN for which supported security providers are needed.
   * @param options The options parameters.
   */
  supportedSecurityProviders(
    resourceGroupName: string,
    virtualWANName: string,
    options?: coreHttp.OperationOptions
  ): Promise<NetworkManagementClientSupportedSecurityProvidersResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualWANName,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      supportedSecurityProvidersOperationSpec
    ) as Promise<NetworkManagementClientSupportedSecurityProvidersResponse>;
  }

  /**
   * Generates a unique VPN profile for P2S clients for VirtualWan and associated VpnServerConfiguration
   * combination in the specified resource group.
   * @param resourceGroupName The resource group name.
   * @param virtualWANName The name of the VirtualWAN whose associated VpnServerConfigurations is needed.
   * @param vpnClientParams Parameters supplied to the generate VirtualWan VPN profile generation
   *                        operation.
   * @param options The options parameters.
   */
  async generatevirtualwanvpnserverconfigurationvpnprofile(
    resourceGroupName: string,
    virtualWANName: string,
    vpnClientParams: VirtualWanVpnProfileParameters,
    options?: coreHttp.OperationOptions
  ): Promise<
    LROPoller<
      NetworkManagementClientGeneratevirtualwanvpnserverconfigurationvpnprofileResponse
    >
  > {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      virtualWANName,
      vpnClientParams,
      options: this.getOperationOptions(options, "location")
    };
    const sendOperation = (
      args: coreHttp.OperationArguments,
      spec: coreHttp.OperationSpec
    ) =>
      this.sendOperationRequest(args, spec) as Promise<
        NetworkManagementClientGeneratevirtualwanvpnserverconfigurationvpnprofileResponse
      >;
    const initialOperationResult = await sendOperation(
      operationArguments,
      generatevirtualwanvpnserverconfigurationvpnprofileOperationSpec
    );
    return new LROPoller({
      initialOperationArguments: operationArguments,
      initialOperationSpec: generatevirtualwanvpnserverconfigurationvpnprofileOperationSpec,
      initialOperationResult,
      sendOperation,
      finalStateVia: "location"
    });
  }

  /**
   * PutBastionShareableLinkNext
   * @param resourceGroupName The name of the resource group.
   * @param bastionHostName The name of the Bastion Host.
   * @param bslRequest Post request for all the Bastion Shareable Link endpoints.
   * @param nextLink The nextLink from the previous successful call to the PutBastionShareableLink
   *                 method.
   * @param options The options parameters.
   */
  putBastionShareableLinkNext(
    resourceGroupName: string,
    bastionHostName: string,
    bslRequest: BastionShareableLinkListRequest,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<NetworkManagementClientPutBastionShareableLinkNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      bastionHostName,
      bslRequest,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      putBastionShareableLinkNextOperationSpec
    ) as Promise<NetworkManagementClientPutBastionShareableLinkNextResponse>;
  }

  /**
   * GetBastionShareableLinkNext
   * @param resourceGroupName The name of the resource group.
   * @param bastionHostName The name of the Bastion Host.
   * @param bslRequest Post request for all the Bastion Shareable Link endpoints.
   * @param nextLink The nextLink from the previous successful call to the GetBastionShareableLink
   *                 method.
   * @param options The options parameters.
   */
  getBastionShareableLinkNext(
    resourceGroupName: string,
    bastionHostName: string,
    bslRequest: BastionShareableLinkListRequest,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<NetworkManagementClientGetBastionShareableLinkNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      bastionHostName,
      bslRequest,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      getBastionShareableLinkNextOperationSpec
    ) as Promise<NetworkManagementClientGetBastionShareableLinkNextResponse>;
  }

  /**
   * GetActiveSessionsNext
   * @param resourceGroupName The name of the resource group.
   * @param bastionHostName The name of the Bastion Host.
   * @param nextLink The nextLink from the previous successful call to the GetActiveSessions method.
   * @param options The options parameters.
   */
  getActiveSessionsNext(
    resourceGroupName: string,
    bastionHostName: string,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<NetworkManagementClientGetActiveSessionsNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      bastionHostName,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      getActiveSessionsNextOperationSpec
    ) as Promise<NetworkManagementClientGetActiveSessionsNextResponse>;
  }

  /**
   * DisconnectActiveSessionsNext
   * @param resourceGroupName The name of the resource group.
   * @param bastionHostName The name of the Bastion Host.
   * @param sessionIds The list of sessionids to disconnect.
   * @param nextLink The nextLink from the previous successful call to the DisconnectActiveSessions
   *                 method.
   * @param options The options parameters.
   */
  disconnectActiveSessionsNext(
    resourceGroupName: string,
    bastionHostName: string,
    sessionIds: SessionIds,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<NetworkManagementClientDisconnectActiveSessionsNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      bastionHostName,
      sessionIds,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      disconnectActiveSessionsNextOperationSpec
    ) as Promise<NetworkManagementClientDisconnectActiveSessionsNextResponse>;
  }

  applicationGateways: ApplicationGateways;
  applicationSecurityGroups: ApplicationSecurityGroups;
  availableDelegations: AvailableDelegations;
  availableResourceGroupDelegations: AvailableResourceGroupDelegations;
  availableServiceAliases: AvailableServiceAliases;
  azureFirewalls: AzureFirewalls;
  azureFirewallFqdnTags: AzureFirewallFqdnTags;
  bastionHosts: BastionHosts;
  ddosCustomPolicies: DdosCustomPolicies;
  ddosProtectionPlans: DdosProtectionPlans;
  availableEndpointServices: AvailableEndpointServices;
  expressRouteCircuitAuthorizations: ExpressRouteCircuitAuthorizations;
  expressRouteCircuitPeerings: ExpressRouteCircuitPeerings;
  expressRouteCircuitConnections: ExpressRouteCircuitConnections;
  peerExpressRouteCircuitConnections: PeerExpressRouteCircuitConnections;
  expressRouteCircuits: ExpressRouteCircuits;
  expressRouteServiceProviders: ExpressRouteServiceProviders;
  expressRouteCrossConnections: ExpressRouteCrossConnections;
  expressRouteCrossConnectionPeerings: ExpressRouteCrossConnectionPeerings;
  expressRoutePortsLocations: ExpressRoutePortsLocations;
  expressRoutePorts: ExpressRoutePorts;
  expressRouteLinks: ExpressRouteLinks;
  firewallPolicies: FirewallPolicies;
  firewallPolicyRuleGroups: FirewallPolicyRuleGroups;
  ipAllocations: IpAllocations;
  ipGroups: IpGroups;
  loadBalancers: LoadBalancers;
  loadBalancerBackendAddressPools: LoadBalancerBackendAddressPools;
  loadBalancerFrontendIPConfigurations: LoadBalancerFrontendIPConfigurations;
  inboundNatRules: InboundNatRules;
  loadBalancerLoadBalancingRules: LoadBalancerLoadBalancingRules;
  loadBalancerOutboundRules: LoadBalancerOutboundRules;
  loadBalancerNetworkInterfaces: LoadBalancerNetworkInterfaces;
  loadBalancerProbes: LoadBalancerProbes;
  natGateways: NatGateways;
  networkInterfaces: NetworkInterfaces;
  networkInterfaceIPConfigurations: NetworkInterfaceIPConfigurations;
  networkInterfaceLoadBalancers: NetworkInterfaceLoadBalancers;
  networkInterfaceTapConfigurations: NetworkInterfaceTapConfigurations;
  networkProfiles: NetworkProfiles;
  networkSecurityGroups: NetworkSecurityGroups;
  securityRules: SecurityRules;
  defaultSecurityRules: DefaultSecurityRules;
  networkVirtualAppliances: NetworkVirtualAppliances;
  networkWatchers: NetworkWatchers;
  packetCaptures: PacketCaptures;
  connectionMonitors: ConnectionMonitors;
  flowLogs: FlowLogs;
  operations: Operations;
  privateEndpoints: PrivateEndpoints;
  availablePrivateEndpointTypes: AvailablePrivateEndpointTypes;
  privateDnsZoneGroups: PrivateDnsZoneGroups;
  privateLinkServices: PrivateLinkServices;
  publicIPAddresses: PublicIPAddresses;
  publicIPPrefixes: PublicIPPrefixes;
  routeFilters: RouteFilters;
  routeFilterRules: RouteFilterRules;
  routeTables: RouteTables;
  routes: Routes;
  securityPartnerProviders: SecurityPartnerProviders;
  bgpServiceCommunities: BgpServiceCommunities;
  serviceEndpointPolicies: ServiceEndpointPolicies;
  serviceEndpointPolicyDefinitions: ServiceEndpointPolicyDefinitions;
  serviceTags: ServiceTags;
  usages: Usages;
  virtualNetworks: VirtualNetworks;
  subnets: Subnets;
  resourceNavigationLinks: ResourceNavigationLinks;
  serviceAssociationLinks: ServiceAssociationLinks;
  virtualNetworkPeerings: VirtualNetworkPeerings;
  virtualNetworkGateways: VirtualNetworkGateways;
  virtualNetworkGatewayConnections: VirtualNetworkGatewayConnections;
  localNetworkGateways: LocalNetworkGateways;
  virtualNetworkTaps: VirtualNetworkTaps;
  virtualRouters: VirtualRouters;
  virtualRouterPeerings: VirtualRouterPeerings;
  virtualWans: VirtualWans;
  vpnSites: VpnSites;
  vpnSiteLinks: VpnSiteLinks;
  vpnSitesConfiguration: VpnSitesConfiguration;
  vpnServerConfigurations: VpnServerConfigurations;
  virtualHubs: VirtualHubs;
  hubVirtualNetworkConnections: HubVirtualNetworkConnections;
  vpnGateways: VpnGateways;
  vpnConnections: VpnConnections;
  vpnSiteLinkConnections: VpnSiteLinkConnections;
  vpnLinkConnections: VpnLinkConnections;
  p2SVpnGateways: P2SVpnGateways;
  vpnServerConfigurationsAssociatedWithVirtualWan: VpnServerConfigurationsAssociatedWithVirtualWan;
  virtualHubRouteTableV2S: VirtualHubRouteTableV2S;
  expressRouteGateways: ExpressRouteGateways;
  expressRouteConnections: ExpressRouteConnections;
  hubRouteTables: HubRouteTables;
  webApplicationFirewallPolicies: WebApplicationFirewallPolicies;
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const putBastionShareableLinkOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/bastionHosts/{bastionHostName}/createShareableLinks",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.BastionShareableLinkListResult
    },
    201: {
      bodyMapper: Mappers.BastionShareableLinkListResult
    },
    202: {
      bodyMapper: Mappers.BastionShareableLinkListResult
    },
    204: {
      bodyMapper: Mappers.BastionShareableLinkListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.bslRequest,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.bastionHostName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteBastionShareableLinkOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/bastionHosts/{bastionHostName}/deleteShareableLinks",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.bslRequest,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.bastionHostName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getBastionShareableLinkOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/bastionHosts/{bastionHostName}/getShareableLinks",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.BastionShareableLinkListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.bslRequest,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.bastionHostName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getActiveSessionsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/bastionHosts/{bastionHostName}/getActiveSessions",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.BastionActiveSessionListResult
    },
    201: {
      bodyMapper: Mappers.BastionActiveSessionListResult
    },
    202: {
      bodyMapper: Mappers.BastionActiveSessionListResult
    },
    204: {
      bodyMapper: Mappers.BastionActiveSessionListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.bastionHostName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const disconnectActiveSessionsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/bastionHosts/{bastionHostName}/disconnectActiveSessions",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.BastionSessionDeleteResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.sessionIds,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.bastionHostName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const checkDnsNameAvailabilityOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/locations/{location}/CheckDnsNameAvailability",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DnsNameAvailabilityResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.domainNameLabel],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const supportedSecurityProvidersOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualWans/{virtualWANName}/supportedSecurityProviders",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.VirtualWanSecurityProviders
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.virtualWANName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const generatevirtualwanvpnserverconfigurationvpnprofileOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualWans/{virtualWANName}/GenerateVpnProfile",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.VpnProfileResponse
    },
    201: {
      bodyMapper: Mappers.VpnProfileResponse
    },
    202: {
      bodyMapper: Mappers.VpnProfileResponse
    },
    204: {
      bodyMapper: Mappers.VpnProfileResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.vpnClientParams,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.virtualWANName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const putBastionShareableLinkNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BastionShareableLinkListResult
    },
    202: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.bastionHostName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getBastionShareableLinkNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BastionShareableLinkListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.bastionHostName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getActiveSessionsNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BastionActiveSessionListResult
    },
    202: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.bastionHostName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const disconnectActiveSessionsNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BastionSessionDeleteResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.bastionHostName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
