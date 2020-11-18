/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { WebSiteManagementClient } from "../webSiteManagementClient";
import {
  TopLevelDomain,
  TldLegalAgreement,
  TopLevelDomainAgreementOption,
  TopLevelDomainsListResponse,
  TopLevelDomainsGetResponse,
  TopLevelDomainsListAgreementsResponse,
  TopLevelDomainsListNextResponse,
  TopLevelDomainsListAgreementsNextResponse
} from "../models";

/**
 * Class representing a TopLevelDomains.
 */
export class TopLevelDomains {
  private readonly client: WebSiteManagementClient;

  /**
   * Initialize a new instance of the class TopLevelDomains class.
   * @param client Reference to the service client
   */
  constructor(client: WebSiteManagementClient) {
    this.client = client;
  }

  /**
   * Description for Get all top-level domains supported for registration.
   * @param options The options parameters.
   */
  public list(
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<TopLevelDomain, TopLevelDomain[]> {
    const iter = this.listPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(options);
      }
    };
  }

  private async *listPagingPage(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<TopLevelDomain[]> {
    let result = await this._list(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<TopLevelDomain> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Description for Gets all legal agreements that user needs to accept before purchasing a domain.
   * @param name Name of the top-level domain.
   * @param agreementOption Domain agreement options.
   * @param options The options parameters.
   */
  public listAgreements(
    name: string,
    agreementOption: TopLevelDomainAgreementOption,
    options?: coreHttp.OperationOptions
  ): PagedAsyncIterableIterator<TldLegalAgreement, TldLegalAgreement[]> {
    const iter = this.listAgreementsPagingAll(name, agreementOption, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listAgreementsPagingPage(name, agreementOption, options);
      }
    };
  }

  private async *listAgreementsPagingPage(
    name: string,
    agreementOption: TopLevelDomainAgreementOption,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<TldLegalAgreement[]> {
    let result = await this._listAgreements(name, agreementOption, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listAgreementsNext(
        name,
        agreementOption,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listAgreementsPagingAll(
    name: string,
    agreementOption: TopLevelDomainAgreementOption,
    options?: coreHttp.OperationOptions
  ): AsyncIterableIterator<TldLegalAgreement> {
    for await (const page of this.listAgreementsPagingPage(
      name,
      agreementOption,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Description for Get all top-level domains supported for registration.
   * @param options The options parameters.
   */
  private _list(
    options?: coreHttp.OperationOptions
  ): Promise<TopLevelDomainsListResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listOperationSpec
    ) as Promise<TopLevelDomainsListResponse>;
  }

  /**
   * Description for Get details of a top-level domain.
   * @param name Name of the top-level domain.
   * @param options The options parameters.
   */
  get(
    name: string,
    options?: coreHttp.OperationOptions
  ): Promise<TopLevelDomainsGetResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      name,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      getOperationSpec
    ) as Promise<TopLevelDomainsGetResponse>;
  }

  /**
   * Description for Gets all legal agreements that user needs to accept before purchasing a domain.
   * @param name Name of the top-level domain.
   * @param agreementOption Domain agreement options.
   * @param options The options parameters.
   */
  private _listAgreements(
    name: string,
    agreementOption: TopLevelDomainAgreementOption,
    options?: coreHttp.OperationOptions
  ): Promise<TopLevelDomainsListAgreementsResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      name,
      agreementOption,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listAgreementsOperationSpec
    ) as Promise<TopLevelDomainsListAgreementsResponse>;
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<TopLevelDomainsListNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listNextOperationSpec
    ) as Promise<TopLevelDomainsListNextResponse>;
  }

  /**
   * ListAgreementsNext
   * @param name Name of the top-level domain.
   * @param agreementOption Domain agreement options.
   * @param nextLink The nextLink from the previous successful call to the ListAgreements method.
   * @param options The options parameters.
   */
  private _listAgreementsNext(
    name: string,
    agreementOption: TopLevelDomainAgreementOption,
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<TopLevelDomainsListAgreementsNextResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      name,
      agreementOption,
      nextLink,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      listAgreementsNextOperationSpec
    ) as Promise<TopLevelDomainsListAgreementsNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/topLevelDomains",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TopLevelDomainCollection
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
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/topLevelDomains/{name}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TopLevelDomain
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId, Parameters.name],
  headerParameters: [Parameters.accept],
  serializer
};
const listAgreementsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.DomainRegistration/topLevelDomains/{name}/listAgreements",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.TldLegalAgreementCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  requestBody: Parameters.agreementOption,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId, Parameters.name],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TopLevelDomainCollection
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
const listAgreementsNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TldLegalAgreementCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.name,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
