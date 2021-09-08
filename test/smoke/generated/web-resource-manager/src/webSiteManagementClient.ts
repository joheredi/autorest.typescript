/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";
import * as coreAuth from "@azure/core-auth";
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
  ResourceHealthMetadataOperationsImpl
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
  ResourceHealthMetadataOperations
} from "./operationsInterfaces";
import * as Parameters from "./models/parameters";
import * as Mappers from "./models/mappers";
import { WebSiteManagementClientContext } from "./webSiteManagementClientContext";
import {
  WebSiteManagementClientOptionalParams,
  SourceControl,
  WebSiteManagementClientListSourceControlsNextOptionalParams,
  WebSiteManagementClientListSourceControlsOptionalParams,
  BillingMeter,
  WebSiteManagementClientListBillingMetersNextOptionalParams,
  WebSiteManagementClientListBillingMetersOptionalParams,
  GeoRegion,
  WebSiteManagementClientListGeoRegionsNextOptionalParams,
  WebSiteManagementClientListGeoRegionsOptionalParams,
  Identifier,
  NameIdentifier,
  WebSiteManagementClientListSiteIdentifiersAssignedToHostNameNextOptionalParams,
  WebSiteManagementClientListSiteIdentifiersAssignedToHostNameOptionalParams,
  PremierAddOnOffer,
  WebSiteManagementClientListPremierAddOnOffersNextOptionalParams,
  WebSiteManagementClientListPremierAddOnOffersOptionalParams,
  WebSiteManagementClientGetPublishingUserOptionalParams,
  WebSiteManagementClientGetPublishingUserResponse,
  User,
  WebSiteManagementClientUpdatePublishingUserOptionalParams,
  WebSiteManagementClientUpdatePublishingUserResponse,
  WebSiteManagementClientListSourceControlsResponse,
  WebSiteManagementClientGetSourceControlOptionalParams,
  WebSiteManagementClientGetSourceControlResponse,
  WebSiteManagementClientUpdateSourceControlOptionalParams,
  WebSiteManagementClientUpdateSourceControlResponse,
  WebSiteManagementClientListBillingMetersResponse,
  CheckNameResourceTypes,
  WebSiteManagementClientCheckNameAvailabilityOptionalParams,
  WebSiteManagementClientCheckNameAvailabilityResponse,
  WebSiteManagementClientGetSubscriptionDeploymentLocationsOptionalParams,
  WebSiteManagementClientGetSubscriptionDeploymentLocationsResponse,
  WebSiteManagementClientListGeoRegionsResponse,
  WebSiteManagementClientListSiteIdentifiersAssignedToHostNameResponse,
  WebSiteManagementClientListPremierAddOnOffersResponse,
  WebSiteManagementClientListSkusOptionalParams,
  WebSiteManagementClientListSkusResponse,
  VnetParameters,
  WebSiteManagementClientVerifyHostingEnvironmentVnetOptionalParams,
  WebSiteManagementClientVerifyHostingEnvironmentVnetResponse,
  CsmMoveResourceEnvelope,
  WebSiteManagementClientMoveOptionalParams,
  ValidateRequest,
  WebSiteManagementClientValidateOptionalParams,
  WebSiteManagementClientValidateResponse,
  WebSiteManagementClientValidateMoveOptionalParams,
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
    credentials: coreAuth.TokenCredential,
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
    this.resourceHealthMetadataOperations = new ResourceHealthMetadataOperationsImpl(
      this
    );
  }

  /**
   * Description for Gets the source controls available for Azure websites.
   * @param options The options parameters.
   */
  public listSourceControls(
    options?: WebSiteManagementClientListSourceControlsOptionalParams
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
    options?: WebSiteManagementClientListSourceControlsOptionalParams
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
    options?: WebSiteManagementClientListSourceControlsOptionalParams
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
    options?: WebSiteManagementClientListSiteIdentifiersAssignedToHostNameOptionalParams
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
    options?: WebSiteManagementClientListSiteIdentifiersAssignedToHostNameOptionalParams
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
    options?: WebSiteManagementClientListSiteIdentifiersAssignedToHostNameOptionalParams
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
    options?: WebSiteManagementClientListPremierAddOnOffersOptionalParams
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
    options?: WebSiteManagementClientListPremierAddOnOffersOptionalParams
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
    options?: WebSiteManagementClientListPremierAddOnOffersOptionalParams
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
    options?: WebSiteManagementClientGetPublishingUserOptionalParams
  ): Promise<WebSiteManagementClientGetPublishingUserResponse> {
    return this.sendOperationRequest(
      { options },
      getPublishingUserOperationSpec
    );
  }

  /**
   * Description for Updates publishing user
   * @param userDetails Details of publishing user
   * @param options The options parameters.
   */
  updatePublishingUser(
    userDetails: User,
    options?: WebSiteManagementClientUpdatePublishingUserOptionalParams
  ): Promise<WebSiteManagementClientUpdatePublishingUserResponse> {
    return this.sendOperationRequest(
      { userDetails, options },
      updatePublishingUserOperationSpec
    );
  }

  /**
   * Description for Gets the source controls available for Azure websites.
   * @param options The options parameters.
   */
  private _listSourceControls(
    options?: WebSiteManagementClientListSourceControlsOptionalParams
  ): Promise<WebSiteManagementClientListSourceControlsResponse> {
    return this.sendOperationRequest(
      { options },
      listSourceControlsOperationSpec
    );
  }

  /**
   * Description for Gets source control token
   * @param sourceControlType Type of source control
   * @param options The options parameters.
   */
  getSourceControl(
    sourceControlType: string,
    options?: WebSiteManagementClientGetSourceControlOptionalParams
  ): Promise<WebSiteManagementClientGetSourceControlResponse> {
    return this.sendOperationRequest(
      { sourceControlType, options },
      getSourceControlOperationSpec
    );
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
    options?: WebSiteManagementClientUpdateSourceControlOptionalParams
  ): Promise<WebSiteManagementClientUpdateSourceControlResponse> {
    return this.sendOperationRequest(
      { sourceControlType, requestMessage, options },
      updateSourceControlOperationSpec
    );
  }

  /**
   * Description for Gets a list of meters for a given location.
   * @param options The options parameters.
   */
  private _listBillingMeters(
    options?: WebSiteManagementClientListBillingMetersOptionalParams
  ): Promise<WebSiteManagementClientListBillingMetersResponse> {
    return this.sendOperationRequest(
      { options },
      listBillingMetersOperationSpec
    );
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
    return this.sendOperationRequest(
      { name, typeParam, options },
      checkNameAvailabilityOperationSpec
    );
  }

  /**
   * Description for Gets list of available geo regions plus ministamps
   * @param options The options parameters.
   */
  getSubscriptionDeploymentLocations(
    options?: WebSiteManagementClientGetSubscriptionDeploymentLocationsOptionalParams
  ): Promise<
    WebSiteManagementClientGetSubscriptionDeploymentLocationsResponse
  > {
    return this.sendOperationRequest(
      { options },
      getSubscriptionDeploymentLocationsOperationSpec
    );
  }

  /**
   * Description for Get a list of available geographical regions.
   * @param options The options parameters.
   */
  private _listGeoRegions(
    options?: WebSiteManagementClientListGeoRegionsOptionalParams
  ): Promise<WebSiteManagementClientListGeoRegionsResponse> {
    return this.sendOperationRequest({ options }, listGeoRegionsOperationSpec);
  }

  /**
   * Description for List all apps that are assigned to a hostname.
   * @param nameIdentifier Hostname information.
   * @param options The options parameters.
   */
  private _listSiteIdentifiersAssignedToHostName(
    nameIdentifier: NameIdentifier,
    options?: WebSiteManagementClientListSiteIdentifiersAssignedToHostNameOptionalParams
  ): Promise<
    WebSiteManagementClientListSiteIdentifiersAssignedToHostNameResponse
  > {
    return this.sendOperationRequest(
      { nameIdentifier, options },
      listSiteIdentifiersAssignedToHostNameOperationSpec
    );
  }

  /**
   * Description for List all premier add-on offers.
   * @param options The options parameters.
   */
  private _listPremierAddOnOffers(
    options?: WebSiteManagementClientListPremierAddOnOffersOptionalParams
  ): Promise<WebSiteManagementClientListPremierAddOnOffersResponse> {
    return this.sendOperationRequest(
      { options },
      listPremierAddOnOffersOperationSpec
    );
  }

  /**
   * Description for List all SKUs.
   * @param options The options parameters.
   */
  listSkus(
    options?: WebSiteManagementClientListSkusOptionalParams
  ): Promise<WebSiteManagementClientListSkusResponse> {
    return this.sendOperationRequest({ options }, listSkusOperationSpec);
  }

  /**
   * Description for Verifies if this VNET is compatible with an App Service Environment by analyzing the
   * Network Security Group rules.
   * @param parameters VNET information
   * @param options The options parameters.
   */
  verifyHostingEnvironmentVnet(
    parameters: VnetParameters,
    options?: WebSiteManagementClientVerifyHostingEnvironmentVnetOptionalParams
  ): Promise<WebSiteManagementClientVerifyHostingEnvironmentVnetResponse> {
    return this.sendOperationRequest(
      { parameters, options },
      verifyHostingEnvironmentVnetOperationSpec
    );
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
    options?: WebSiteManagementClientMoveOptionalParams
  ): Promise<void> {
    return this.sendOperationRequest(
      { resourceGroupName, moveResourceEnvelope, options },
      moveOperationSpec
    );
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
    options?: WebSiteManagementClientValidateOptionalParams
  ): Promise<WebSiteManagementClientValidateResponse> {
    return this.sendOperationRequest(
      { resourceGroupName, validateRequest, options },
      validateOperationSpec
    );
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
    options?: WebSiteManagementClientValidateMoveOptionalParams
  ): Promise<void> {
    return this.sendOperationRequest(
      { resourceGroupName, moveResourceEnvelope, options },
      validateMoveOperationSpec
    );
  }

  /**
   * ListSourceControlsNext
   * @param nextLink The nextLink from the previous successful call to the ListSourceControls method.
   * @param options The options parameters.
   */
  private _listSourceControlsNext(
    nextLink: string,
    options?: WebSiteManagementClientListSourceControlsNextOptionalParams
  ): Promise<WebSiteManagementClientListSourceControlsNextResponse> {
    return this.sendOperationRequest(
      { nextLink, options },
      listSourceControlsNextOperationSpec
    );
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
    return this.sendOperationRequest(
      { nextLink, options },
      listBillingMetersNextOperationSpec
    );
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
    return this.sendOperationRequest(
      { nextLink, options },
      listGeoRegionsNextOperationSpec
    );
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
    options?: WebSiteManagementClientListSiteIdentifiersAssignedToHostNameNextOptionalParams
  ): Promise<
    WebSiteManagementClientListSiteIdentifiersAssignedToHostNameNextResponse
  > {
    return this.sendOperationRequest(
      { nameIdentifier, nextLink, options },
      listSiteIdentifiersAssignedToHostNameNextOperationSpec
    );
  }

  /**
   * ListPremierAddOnOffersNext
   * @param nextLink The nextLink from the previous successful call to the ListPremierAddOnOffers method.
   * @param options The options parameters.
   */
  private _listPremierAddOnOffersNext(
    nextLink: string,
    options?: WebSiteManagementClientListPremierAddOnOffersNextOptionalParams
  ): Promise<WebSiteManagementClientListPremierAddOnOffersNextResponse> {
    return this.sendOperationRequest(
      { nextLink, options },
      listPremierAddOnOffersNextOperationSpec
    );
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
  resourceHealthMetadataOperations: ResourceHealthMetadataOperations;
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getPublishingUserOperationSpec: coreClient.OperationSpec = {
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
const updatePublishingUserOperationSpec: coreClient.OperationSpec = {
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
const listSourceControlsOperationSpec: coreClient.OperationSpec = {
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
const getSourceControlOperationSpec: coreClient.OperationSpec = {
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
const updateSourceControlOperationSpec: coreClient.OperationSpec = {
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
const listBillingMetersOperationSpec: coreClient.OperationSpec = {
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
const checkNameAvailabilityOperationSpec: coreClient.OperationSpec = {
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
const getSubscriptionDeploymentLocationsOperationSpec: coreClient.OperationSpec = {
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
const listGeoRegionsOperationSpec: coreClient.OperationSpec = {
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
const listSiteIdentifiersAssignedToHostNameOperationSpec: coreClient.OperationSpec = {
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
const listPremierAddOnOffersOperationSpec: coreClient.OperationSpec = {
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
const listSkusOperationSpec: coreClient.OperationSpec = {
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
const verifyHostingEnvironmentVnetOperationSpec: coreClient.OperationSpec = {
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
const moveOperationSpec: coreClient.OperationSpec = {
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
const validateOperationSpec: coreClient.OperationSpec = {
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
const validateMoveOperationSpec: coreClient.OperationSpec = {
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
const listSourceControlsNextOperationSpec: coreClient.OperationSpec = {
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
const listBillingMetersNextOperationSpec: coreClient.OperationSpec = {
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
const listGeoRegionsNextOperationSpec: coreClient.OperationSpec = {
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
const listSiteIdentifiersAssignedToHostNameNextOperationSpec: coreClient.OperationSpec = {
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
const listPremierAddOnOffersNextOperationSpec: coreClient.OperationSpec = {
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
