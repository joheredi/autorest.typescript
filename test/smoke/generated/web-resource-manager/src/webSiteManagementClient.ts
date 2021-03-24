/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  AppServiceCertificateOrdersImpl,
  CertificateRegistrationProviderImpl,
  DomainsImpl,
  TopLevelDomainsImpl,
  DomainRegistrationProviderImpl,
  CertificatesImpl,
  DeletedWebAppsImpl,
  DiagnosticsImpl,
  ProviderImpl,
  RecommendationsImpl,
  WebAppsImpl,
  StaticSitesImpl,
  AppServiceEnvironmentsImpl,
  AppServicePlansImpl,
  ResourceHealthMetadataImpl
} from "./operations";
import {
  AppServiceCertificateOrders,
  CertificateRegistrationProvider,
  Domains,
  TopLevelDomains,
  DomainRegistrationProvider,
  Certificates,
  DeletedWebApps,
  Diagnostics,
  Provider,
  Recommendations,
  WebApps,
  StaticSites,
  AppServiceEnvironments,
  AppServicePlans,
  ResourceHealthMetadata
} from "./operationsInterfaces";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import { WebSiteManagementClientContext } from "./webSiteManagementClientContext";
import {
  WebSiteManagementClientOptionalParams,
  SourceControl,
  BillingMeter,
  WebSiteManagementClientListBillingMetersNextOptionalParams,
  WebSiteManagementClientListBillingMetersOptionalParams,
  GeoRegion,
  WebSiteManagementClientListGeoRegionsNextOptionalParams,
  WebSiteManagementClientListGeoRegionsOptionalParams,
  Identifier,
  NameIdentifier,
  PremierAddOnOffer,
  WebSiteManagementClientGetPublishingUserResponse,
  User,
  WebSiteManagementClientUpdatePublishingUserResponse,
  WebSiteManagementClientListSourceControlsResponse,
  WebSiteManagementClientGetSourceControlResponse,
  WebSiteManagementClientUpdateSourceControlResponse,
  WebSiteManagementClientListBillingMetersResponse,
  CheckNameResourceTypes,
  WebSiteManagementClientCheckNameAvailabilityOptionalParams,
  WebSiteManagementClientCheckNameAvailabilityResponse,
  WebSiteManagementClientGetSubscriptionDeploymentLocationsResponse,
  WebSiteManagementClientListGeoRegionsResponse,
  WebSiteManagementClientListSiteIdentifiersAssignedToHostNameResponse,
  WebSiteManagementClientListPremierAddOnOffersResponse,
  WebSiteManagementClientListSkusResponse,
  VnetParameters,
  WebSiteManagementClientVerifyHostingEnvironmentVnetResponse,
  CsmMoveResourceEnvelope,
  ValidateRequest,
  WebSiteManagementClientValidateResponse,
  WebSiteManagementClientListSourceControlsNextResponse,
  WebSiteManagementClientListBillingMetersNextResponse,
  WebSiteManagementClientListGeoRegionsNextResponse,
  WebSiteManagementClientListSiteIdentifiersAssignedToHostNameNextResponse,
  WebSiteManagementClientListPremierAddOnOffersNextResponse
} from "./models";

/// <reference lib="esnext.asynciterable" />
export class WebSiteManagementClient extends WebSiteManagementClientContext {
  /**
   * Initializes a new instance of the WebSiteManagementClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param subscriptionId Your Azure subscription ID. This is a GUID-formatted string (e.g.
   *                       00000000-0000-0000-0000-000000000000).
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    subscriptionId: string,
    options?: WebSiteManagementClientOptionalParams
  ) {
    super(credentials, subscriptionId, options);
    this.appServiceCertificateOrders = new AppServiceCertificateOrdersImpl(
      this
    );
    this.certificateRegistrationProvider = new CertificateRegistrationProviderImpl(
      this
    );
    this.domains = new DomainsImpl(this);
    this.topLevelDomains = new TopLevelDomainsImpl(this);
    this.domainRegistrationProvider = new DomainRegistrationProviderImpl(this);
    this.certificates = new CertificatesImpl(this);
    this.deletedWebApps = new DeletedWebAppsImpl(this);
    this.diagnostics = new DiagnosticsImpl(this);
    this.provider = new ProviderImpl(this);
    this.recommendations = new RecommendationsImpl(this);
    this.webApps = new WebAppsImpl(this);
    this.staticSites = new StaticSitesImpl(this);
    this.appServiceEnvironments = new AppServiceEnvironmentsImpl(this);
    this.appServicePlans = new AppServicePlansImpl(this);
    this.resourceHealthMetadata = new ResourceHealthMetadataImpl(this);
  }

  /**
   * Description for Gets the source controls available for Azure websites.
   * @param options The options parameters.
   */
  public listSourceControls(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<SourceControl> {
    const iter = this.listSourceControlsPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listSourceControlsPagingPage(options);
      }
    };
  }

  private async *listSourceControlsPagingPage(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<SourceControl[]> {
    let result = await this._listSourceControls(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listSourceControlsNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listSourceControlsPagingAll(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<SourceControl> {
    for await (const page of this.listSourceControlsPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Description for Gets a list of meters for a given location.
   * @param options The options parameters.
   */
  public listBillingMeters(
    options?: WebSiteManagementClientListBillingMetersOptionalParams
  ): PagedAsyncIterableIterator<BillingMeter> {
    const iter = this.listBillingMetersPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listBillingMetersPagingPage(options);
      }
    };
  }

  private async *listBillingMetersPagingPage(
    options?: WebSiteManagementClientListBillingMetersOptionalParams
  ): AsyncIterableIterator<BillingMeter[]> {
    let result = await this._listBillingMeters(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listBillingMetersNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listBillingMetersPagingAll(
    options?: WebSiteManagementClientListBillingMetersOptionalParams
  ): AsyncIterableIterator<BillingMeter> {
    for await (const page of this.listBillingMetersPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Description for Get a list of available geographical regions.
   * @param options The options parameters.
   */
  public listGeoRegions(
    options?: WebSiteManagementClientListGeoRegionsOptionalParams
  ): PagedAsyncIterableIterator<GeoRegion> {
    const iter = this.listGeoRegionsPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listGeoRegionsPagingPage(options);
      }
    };
  }

  private async *listGeoRegionsPagingPage(
    options?: WebSiteManagementClientListGeoRegionsOptionalParams
  ): AsyncIterableIterator<GeoRegion[]> {
    let result = await this._listGeoRegions(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listGeoRegionsNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listGeoRegionsPagingAll(
    options?: WebSiteManagementClientListGeoRegionsOptionalParams
  ): AsyncIterableIterator<GeoRegion> {
    for await (const page of this.listGeoRegionsPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Description for List all apps that are assigned to a hostname.
   * @param nameIdentifier Hostname information.
   * @param options The options parameters.
   */
  public listSiteIdentifiersAssignedToHostName(
    nameIdentifier: NameIdentifier,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<Identifier> {
    const iter = this.listSiteIdentifiersAssignedToHostNamePagingAll(
      nameIdentifier,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listSiteIdentifiersAssignedToHostNamePagingPage(
          nameIdentifier,
          options
        );
      }
    };
  }

  private async *listSiteIdentifiersAssignedToHostNamePagingPage(
    nameIdentifier: NameIdentifier,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<Identifier[]> {
    let result = await this._listSiteIdentifiersAssignedToHostName(
      nameIdentifier,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listSiteIdentifiersAssignedToHostNameNext(
        nameIdentifier,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listSiteIdentifiersAssignedToHostNamePagingAll(
    nameIdentifier: NameIdentifier,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<Identifier> {
    for await (const page of this.listSiteIdentifiersAssignedToHostNamePagingPage(
      nameIdentifier,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Description for List all premier add-on offers.
   * @param options The options parameters.
   */
  public listPremierAddOnOffers(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<PremierAddOnOffer> {
    const iter = this.listPremierAddOnOffersPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPremierAddOnOffersPagingPage(options);
      }
    };
  }

  private async *listPremierAddOnOffersPagingPage(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<PremierAddOnOffer[]> {
    let result = await this._listPremierAddOnOffers(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listPremierAddOnOffersNext(
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPremierAddOnOffersPagingAll(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<PremierAddOnOffer> {
    for await (const page of this.listPremierAddOnOffersPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Description for Gets publishing user
   * @param options The options parameters.
   */
  getPublishingUser(
    options?: coreHttp.OperationOptions
  ): Promise<WebSiteManagementClientGetPublishingUserResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      getPublishingUserOperationSpec
    ) as Promise<WebSiteManagementClientGetPublishingUserResponse>;
  }

  /**
   * Description for Updates publishing user
   * @param userDetails Details of publishing user
   * @param options The options parameters.
   */
  updatePublishingUser(
    userDetails: User,
    options?: coreHttp.OperationOptions
  ): Promise<WebSiteManagementClientUpdatePublishingUserResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      userDetails,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      updatePublishingUserOperationSpec
    ) as Promise<WebSiteManagementClientUpdatePublishingUserResponse>;
  }

  /**
   * Description for Gets the source controls available for Azure websites.
   * @param options The options parameters.
   */
  private _listSourceControls(
    options?: coreHttp.OperationOptions
  ): Promise<WebSiteManagementClientListSourceControlsResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      listSourceControlsOperationSpec
    ) as Promise<WebSiteManagementClientListSourceControlsResponse>;
  }

  /**
   * Description for Gets source control token
   * @param sourceControlType Type of source control
   * @param options The options parameters.
   */
  getSourceControl(
    sourceControlType: string,
    options?: coreHttp.OperationOptions
  ): Promise<WebSiteManagementClientGetSourceControlResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      sourceControlType,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      getSourceControlOperationSpec
    ) as Promise<WebSiteManagementClientGetSourceControlResponse>;
  }

  /**
   * Description for Updates source control token
   * @param sourceControlType Type of source control
   * @param requestMessage Source control token information
   * @param options The options parameters.
   */
  updateSourceControl(
    sourceControlType: string,
    requestMessage: SourceControl,
    options?: coreHttp.OperationOptions
  ): Promise<WebSiteManagementClientUpdateSourceControlResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      sourceControlType,
      requestMessage,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      updateSourceControlOperationSpec
    ) as Promise<WebSiteManagementClientUpdateSourceControlResponse>;
  }

  /**
   * Description for Gets a list of meters for a given location.
   * @param options The options parameters.
   */
  private _listBillingMeters(
    options?: WebSiteManagementClientListBillingMetersOptionalParams
  ): Promise<WebSiteManagementClientListBillingMetersResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      listBillingMetersOperationSpec
    ) as Promise<WebSiteManagementClientListBillingMetersResponse>;
  }

  /**
   * Description for Check if a resource name is available.
   * @param name Resource name to verify.
   * @param typeParam Resource type used for verification.
   * @param options The options parameters.
   */
  checkNameAvailability(
    name: string,
    typeParam: CheckNameResourceTypes,
    options?: WebSiteManagementClientCheckNameAvailabilityOptionalParams
  ): Promise<WebSiteManagementClientCheckNameAvailabilityResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      name,
      typeParam,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      checkNameAvailabilityOperationSpec
    ) as Promise<WebSiteManagementClientCheckNameAvailabilityResponse>;
  }

  /**
   * Description for Gets list of available geo regions plus ministamps
   * @param options The options parameters.
   */
  getSubscriptionDeploymentLocations(
    options?: coreHttp.OperationOptions
  ): Promise<
    WebSiteManagementClientGetSubscriptionDeploymentLocationsResponse
  > {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      getSubscriptionDeploymentLocationsOperationSpec
    ) as Promise<
      WebSiteManagementClientGetSubscriptionDeploymentLocationsResponse
    >;
  }

  /**
   * Description for Get a list of available geographical regions.
   * @param options The options parameters.
   */
  private _listGeoRegions(
    options?: WebSiteManagementClientListGeoRegionsOptionalParams
  ): Promise<WebSiteManagementClientListGeoRegionsResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      listGeoRegionsOperationSpec
    ) as Promise<WebSiteManagementClientListGeoRegionsResponse>;
  }

  /**
   * Description for List all apps that are assigned to a hostname.
   * @param nameIdentifier Hostname information.
   * @param options The options parameters.
   */
  private _listSiteIdentifiersAssignedToHostName(
    nameIdentifier: NameIdentifier,
    options?: coreHttp.OperationOptions
  ): Promise<
    WebSiteManagementClientListSiteIdentifiersAssignedToHostNameResponse
  > {
    const operationArguments: coreHttp.OperationArguments = {
      nameIdentifier,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      listSiteIdentifiersAssignedToHostNameOperationSpec
    ) as Promise<
      WebSiteManagementClientListSiteIdentifiersAssignedToHostNameResponse
    >;
  }

  /**
   * Description for List all premier add-on offers.
   * @param options The options parameters.
   */
  private _listPremierAddOnOffers(
    options?: coreHttp.OperationOptions
  ): Promise<WebSiteManagementClientListPremierAddOnOffersResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      listPremierAddOnOffersOperationSpec
    ) as Promise<WebSiteManagementClientListPremierAddOnOffersResponse>;
  }

  /**
   * Description for List all SKUs.
   * @param options The options parameters.
   */
  listSkus(
    options?: coreHttp.OperationOptions
  ): Promise<WebSiteManagementClientListSkusResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      listSkusOperationSpec
    ) as Promise<WebSiteManagementClientListSkusResponse>;
  }

  /**
   * Description for Verifies if this VNET is compatible with an App Service Environment by analyzing the
   * Network Security Group rules.
   * @param parameters VNET information
   * @param options The options parameters.
   */
  verifyHostingEnvironmentVnet(
    parameters: VnetParameters,
    options?: coreHttp.OperationOptions
  ): Promise<WebSiteManagementClientVerifyHostingEnvironmentVnetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      parameters,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      verifyHostingEnvironmentVnetOperationSpec
    ) as Promise<WebSiteManagementClientVerifyHostingEnvironmentVnetResponse>;
  }

  /**
   * Description for Move resources between resource groups.
   * @param resourceGroupName Name of the resource group to which the resource belongs.
   * @param moveResourceEnvelope Object that represents the resource to move.
   * @param options The options parameters.
   */
  move(
    resourceGroupName: string,
    moveResourceEnvelope: CsmMoveResourceEnvelope,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      moveResourceEnvelope,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      moveOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Description for Validate if a resource can be created.
   * @param resourceGroupName Name of the resource group to which the resource belongs.
   * @param validateRequest Request with the resources to validate.
   * @param options The options parameters.
   */
  validate(
    resourceGroupName: string,
    validateRequest: ValidateRequest,
    options?: coreHttp.OperationOptions
  ): Promise<WebSiteManagementClientValidateResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      validateRequest,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      validateOperationSpec
    ) as Promise<WebSiteManagementClientValidateResponse>;
  }

  /**
   * Description for Validate whether a resource can be moved.
   * @param resourceGroupName Name of the resource group to which the resource belongs.
   * @param moveResourceEnvelope Object that represents the resource to move.
   * @param options The options parameters.
   */
  validateMove(
    resourceGroupName: string,
    moveResourceEnvelope: CsmMoveResourceEnvelope,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      resourceGroupName,
      moveResourceEnvelope,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      validateMoveOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * ListSourceControlsNext
   * @param nextLink The nextLink from the previous successful call to the ListSourceControls method.
   * @param options The options parameters.
   */
  private _listSourceControlsNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<WebSiteManagementClientListSourceControlsNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      listSourceControlsNextOperationSpec
    ) as Promise<WebSiteManagementClientListSourceControlsNextResponse>;
  }

  /**
   * ListBillingMetersNext
   * @param nextLink The nextLink from the previous successful call to the ListBillingMeters method.
   * @param options The options parameters.
   */
  private _listBillingMetersNext(
    nextLink: string,
    options?: WebSiteManagementClientListBillingMetersNextOptionalParams
  ): Promise<WebSiteManagementClientListBillingMetersNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      listBillingMetersNextOperationSpec
    ) as Promise<WebSiteManagementClientListBillingMetersNextResponse>;
  }

  /**
   * ListGeoRegionsNext
   * @param nextLink The nextLink from the previous successful call to the ListGeoRegions method.
   * @param options The options parameters.
   */
  private _listGeoRegionsNext(
    nextLink: string,
    options?: WebSiteManagementClientListGeoRegionsNextOptionalParams
  ): Promise<WebSiteManagementClientListGeoRegionsNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      listGeoRegionsNextOperationSpec
    ) as Promise<WebSiteManagementClientListGeoRegionsNextResponse>;
  }

  /**
   * ListSiteIdentifiersAssignedToHostNameNext
   * @param nameIdentifier Hostname information.
   * @param nextLink The nextLink from the previous successful call to the
   *                 ListSiteIdentifiersAssignedToHostName method.
   * @param options The options parameters.
   */
  private _listSiteIdentifiersAssignedToHostNameNext(
    nameIdentifier: NameIdentifier,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<
    WebSiteManagementClientListSiteIdentifiersAssignedToHostNameNextResponse
  > {
    const operationArguments: coreHttp.OperationArguments = {
      nameIdentifier,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      listSiteIdentifiersAssignedToHostNameNextOperationSpec
    ) as Promise<
      WebSiteManagementClientListSiteIdentifiersAssignedToHostNameNextResponse
    >;
  }

  /**
   * ListPremierAddOnOffersNext
   * @param nextLink The nextLink from the previous successful call to the ListPremierAddOnOffers method.
   * @param options The options parameters.
   */
  private _listPremierAddOnOffersNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<WebSiteManagementClientListPremierAddOnOffersNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.sendOperationRequest(
      operationArguments,
      listPremierAddOnOffersNextOperationSpec
    ) as Promise<WebSiteManagementClientListPremierAddOnOffersNextResponse>;
  }

  appServiceCertificateOrders: AppServiceCertificateOrders;
  certificateRegistrationProvider: CertificateRegistrationProvider;
  domains: Domains;
  topLevelDomains: TopLevelDomains;
  domainRegistrationProvider: DomainRegistrationProvider;
  certificates: Certificates;
  deletedWebApps: DeletedWebApps;
  diagnostics: Diagnostics;
  provider: Provider;
  recommendations: Recommendations;
  webApps: WebApps;
  staticSites: StaticSites;
  appServiceEnvironments: AppServiceEnvironments;
  appServicePlans: AppServicePlans;
  resourceHealthMetadata: ResourceHealthMetadata;
}
// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getPublishingUserOperationSpec: coreHttp.OperationSpec = {
  path: "/providers/Microsoft.Web/publishingUsers/web",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.User
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const updatePublishingUserOperationSpec: coreHttp.OperationSpec = {
  path: "/providers/Microsoft.Web/publishingUsers/web",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.User
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  requestBody: Parameters.userDetails,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listSourceControlsOperationSpec: coreHttp.OperationSpec = {
  path: "/providers/Microsoft.Web/sourcecontrols",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SourceControlCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const getSourceControlOperationSpec: coreHttp.OperationSpec = {
  path: "/providers/Microsoft.Web/sourcecontrols/{sourceControlType}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SourceControl
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.sourceControlType],
  headerParameters: [Parameters.accept],
  serializer
};
const updateSourceControlOperationSpec: coreHttp.OperationSpec = {
  path: "/providers/Microsoft.Web/sourcecontrols/{sourceControlType}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.SourceControl
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  requestBody: Parameters.requestMessage,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.sourceControlType],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listBillingMetersOperationSpec: coreHttp.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.Web/billingMeters",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BillingMeterCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.billingLocation,
    Parameters.osType
  ],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const checkNameAvailabilityOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/checknameavailability",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ResourceNameAvailability
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  requestBody: {
    parameterPath: {
      name: ["name"],
      typeParam: ["typeParam"],
      isFqdn: ["options", "isFqdn"]
    },
    mapper: { ...Mappers.ResourceNameAvailabilityRequest, required: true }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getSubscriptionDeploymentLocationsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/deploymentLocations",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DeploymentLocations
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listGeoRegionsOperationSpec: coreHttp.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.Web/geoRegions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GeoRegionCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.sku,
    Parameters.linuxWorkersEnabled,
    Parameters.xenonWorkersEnabled,
    Parameters.linuxDynamicWorkersEnabled
  ],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listSiteIdentifiersAssignedToHostNameOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/listSitesAssignedToHostName",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.IdentifierCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  requestBody: Parameters.nameIdentifier,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listPremierAddOnOffersOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/premieraddonoffers",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PremierAddOnOfferCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listSkusOperationSpec: coreHttp.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.Web/skus",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SkuInfos
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const verifyHostingEnvironmentVnetOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/verifyHostingEnvironmentVnet",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.VnetValidationFailureDetails
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  requestBody: Parameters.parameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const moveOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/moveResources",
  httpMethod: "POST",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  requestBody: Parameters.moveResourceEnvelope,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const validateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/validate",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ValidateResponse
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  requestBody: Parameters.validateRequest,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const validateMoveOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/validateMoveResources",
  httpMethod: "POST",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  requestBody: Parameters.moveResourceEnvelope,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listSourceControlsNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SourceControlCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};
const listBillingMetersNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BillingMeterCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.billingLocation,
    Parameters.osType
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listGeoRegionsNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GeoRegionCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.sku,
    Parameters.linuxWorkersEnabled,
    Parameters.xenonWorkersEnabled,
    Parameters.linuxDynamicWorkersEnabled
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listSiteIdentifiersAssignedToHostNameNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IdentifierCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listPremierAddOnOffersNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.PremierAddOnOfferCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
