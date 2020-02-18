/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Models from "../models";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { PagingClient } from "../pagingClient";
import { PagedAsyncIterableIterator } from "@azure/core-paging";

/**
 * Class representing a Paging.
 */
export class Paging {
  private readonly client: PagingClient;

  /**
   * Initialize a new instance of the class Paging class.
   * @param client Reference to the service client
   */
  constructor(client: PagingClient) {
    this.client = client;
  }

  /**
   * A paging operation that must return result of the default 'value' node.
   * @param options The options parameters.
   */
  private fetchGetNoItemNamePages(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PagingGetNoItemNamePagesResponse> {
    return this.client.sendOperationRequest(
      { options },
      getNoItemNamePagesOperationSpec
    ) as Promise<Models.PagingGetNoItemNamePagesResponse>;
  }

  /**
   * A paging operation that must return result of the default 'value' node.
   * @param options The options parameters.
   */
  getNoItemNamePages(
    options?: coreHttp.RequestOptionsBase
  ): PagedAsyncIterableIterator<Models.Product[]> {}

  /**
   * A paging operation that must ignore any kind of nextLink, and stop after page 1.
   * @param options The options parameters.
   */
  private fetchGetNullNextLinkNamePages(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PagingGetNullNextLinkNamePagesResponse> {
    return this.client.sendOperationRequest(
      { options },
      getNullNextLinkNamePagesOperationSpec
    ) as Promise<Models.PagingGetNullNextLinkNamePagesResponse>;
  }

  /**
   * A paging operation that must ignore any kind of nextLink, and stop after page 1.
   * @param options The options parameters.
   */
  getNullNextLinkNamePages(
    options?: coreHttp.RequestOptionsBase
  ): PagedAsyncIterableIterator<Models.Product[]> {}

  /**
   * A paging operation that finishes on the first call without a nextlink
   * @param options The options parameters.
   */
  private fetchGetSinglePages(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PagingGetSinglePagesResponse> {
    return this.client.sendOperationRequest(
      { options },
      getSinglePagesOperationSpec
    ) as Promise<Models.PagingGetSinglePagesResponse>;
  }

  /**
   * A paging operation that finishes on the first call without a nextlink
   * @param options The options parameters.
   */
  getSinglePages(
    options?: coreHttp.RequestOptionsBase
  ): PagedAsyncIterableIterator<Models.Product[]> {}

  /**
   * A paging operation that includes a nextLink that has 10 pages
   * @param options The options parameters.
   */
  private fetchGetMultiplePages(
    options?: Models.PagingGetMultiplePagesOptionalParams
  ): Promise<Models.PagingGetMultiplePagesResponse> {
    return this.client.sendOperationRequest(
      { options },
      getMultiplePagesOperationSpec
    ) as Promise<Models.PagingGetMultiplePagesResponse>;
  }

  /**
   * A paging operation that includes a nextLink that has 10 pages
   * @param options The options parameters.
   */
  getMultiplePages(
    options?: Models.PagingGetMultiplePagesOptionalParams
  ): PagedAsyncIterableIterator<Models.Product[]> {}

  /**
   * A paging operation that includes a nextLink in odata format that has 10 pages
   * @param options The options parameters.
   */
  private fetchGetOdataMultiplePages(
    options?: Models.PagingGetOdataMultiplePagesOptionalParams
  ): Promise<Models.PagingGetOdataMultiplePagesResponse> {
    return this.client.sendOperationRequest(
      { options },
      getOdataMultiplePagesOperationSpec
    ) as Promise<Models.PagingGetOdataMultiplePagesResponse>;
  }

  /**
   * A paging operation that includes a nextLink in odata format that has 10 pages
   * @param options The options parameters.
   */
  getOdataMultiplePages(
    options?: Models.PagingGetOdataMultiplePagesOptionalParams
  ): PagedAsyncIterableIterator<Models.Product[]> {}

  /**
   * A paging operation that includes a nextLink that has 10 pages
   * @param offset Offset of return value
   * @param options The options parameters.
   */
  private fetchGetMultiplePagesWithOffset(
    offset: number,
    options?: Models.PagingGetMultiplePagesWithOffsetOptionalParams
  ): Promise<Models.PagingGetMultiplePagesWithOffsetResponse> {
    return this.client.sendOperationRequest(
      { offset, options },
      getMultiplePagesWithOffsetOperationSpec
    ) as Promise<Models.PagingGetMultiplePagesWithOffsetResponse>;
  }

  /**
   * A paging operation that includes a nextLink that has 10 pages
   * @param offset Offset of return value
   * @param options The options parameters.
   */
  getMultiplePagesWithOffset(
    offset: number,
    options?: Models.PagingGetMultiplePagesWithOffsetOptionalParams
  ): PagedAsyncIterableIterator<Models.Product[]> {}

  /**
   * A paging operation that fails on the first call with 500 and then retries and then get a response
   * including a nextLink that has 10 pages
   * @param options The options parameters.
   */
  private fetchGetMultiplePagesRetryFirst(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PagingGetMultiplePagesRetryFirstResponse> {
    return this.client.sendOperationRequest(
      { options },
      getMultiplePagesRetryFirstOperationSpec
    ) as Promise<Models.PagingGetMultiplePagesRetryFirstResponse>;
  }

  /**
   * A paging operation that fails on the first call with 500 and then retries and then get a response
   * including a nextLink that has 10 pages
   * @param options The options parameters.
   */
  getMultiplePagesRetryFirst(
    options?: coreHttp.RequestOptionsBase
  ): PagedAsyncIterableIterator<Models.Product[]> {}

  /**
   * A paging operation that includes a nextLink that has 10 pages, of which the 2nd call fails first
   * with 500. The client should retry and finish all 10 pages eventually.
   * @param options The options parameters.
   */
  private fetchGetMultiplePagesRetrySecond(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PagingGetMultiplePagesRetrySecondResponse> {
    return this.client.sendOperationRequest(
      { options },
      getMultiplePagesRetrySecondOperationSpec
    ) as Promise<Models.PagingGetMultiplePagesRetrySecondResponse>;
  }

  /**
   * A paging operation that includes a nextLink that has 10 pages, of which the 2nd call fails first
   * with 500. The client should retry and finish all 10 pages eventually.
   * @param options The options parameters.
   */
  getMultiplePagesRetrySecond(
    options?: coreHttp.RequestOptionsBase
  ): PagedAsyncIterableIterator<Models.Product[]> {}

  /**
   * A paging operation that receives a 400 on the first call
   * @param options The options parameters.
   */
  private fetchGetSinglePagesFailure(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PagingGetSinglePagesFailureResponse> {
    return this.client.sendOperationRequest(
      { options },
      getSinglePagesFailureOperationSpec
    ) as Promise<Models.PagingGetSinglePagesFailureResponse>;
  }

  /**
   * A paging operation that receives a 400 on the first call
   * @param options The options parameters.
   */
  getSinglePagesFailure(
    options?: coreHttp.RequestOptionsBase
  ): PagedAsyncIterableIterator<Models.Product[]> {}

  /**
   * A paging operation that receives a 400 on the second call
   * @param options The options parameters.
   */
  private fetchGetMultiplePagesFailure(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PagingGetMultiplePagesFailureResponse> {
    return this.client.sendOperationRequest(
      { options },
      getMultiplePagesFailureOperationSpec
    ) as Promise<Models.PagingGetMultiplePagesFailureResponse>;
  }

  /**
   * A paging operation that receives a 400 on the second call
   * @param options The options parameters.
   */
  getMultiplePagesFailure(
    options?: coreHttp.RequestOptionsBase
  ): PagedAsyncIterableIterator<Models.Product[]> {}

  /**
   * A paging operation that receives an invalid nextLink
   * @param options The options parameters.
   */
  private fetchGetMultiplePagesFailureUri(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PagingGetMultiplePagesFailureUriResponse> {
    return this.client.sendOperationRequest(
      { options },
      getMultiplePagesFailureUriOperationSpec
    ) as Promise<Models.PagingGetMultiplePagesFailureUriResponse>;
  }

  /**
   * A paging operation that receives an invalid nextLink
   * @param options The options parameters.
   */
  getMultiplePagesFailureUri(
    options?: coreHttp.RequestOptionsBase
  ): PagedAsyncIterableIterator<Models.Product[]> {}

  /**
   * A paging operation that doesn't return a full URL, just a fragment
   * @param apiVersion Sets the api version to use.
   * @param tenant Sets the tenant to use.
   * @param options The options parameters.
   */
  private fetchGetMultiplePagesFragmentNextLink(
    apiVersion: string,
    tenant: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PagingGetMultiplePagesFragmentNextLinkResponse> {
    return this.client.sendOperationRequest(
      { apiVersion, tenant, options },
      getMultiplePagesFragmentNextLinkOperationSpec
    ) as Promise<Models.PagingGetMultiplePagesFragmentNextLinkResponse>;
  }

  /**
   * A paging operation that doesn't return a full URL, just a fragment
   * @param apiVersion Sets the api version to use.
   * @param tenant Sets the tenant to use.
   * @param options The options parameters.
   */
  getMultiplePagesFragmentNextLink(
    apiVersion: string,
    tenant: string,
    options?: coreHttp.RequestOptionsBase
  ): PagedAsyncIterableIterator<Models.Product[]> {}

  /**
   * A paging operation that doesn't return a full URL, just a fragment with parameters grouped
   * @param apiVersion Sets the api version to use.
   * @param tenant Sets the tenant to use.
   * @param options The options parameters.
   */
  private fetchGetMultiplePagesFragmentWithGroupingNextLink(
    apiVersion: string,
    tenant: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<
    Models.PagingGetMultiplePagesFragmentWithGroupingNextLinkResponse
  > {
    return this.client.sendOperationRequest(
      { apiVersion, tenant, options },
      getMultiplePagesFragmentWithGroupingNextLinkOperationSpec
    ) as Promise<
      Models.PagingGetMultiplePagesFragmentWithGroupingNextLinkResponse
    >;
  }

  /**
   * A paging operation that doesn't return a full URL, just a fragment with parameters grouped
   * @param apiVersion Sets the api version to use.
   * @param tenant Sets the tenant to use.
   * @param options The options parameters.
   */
  getMultiplePagesFragmentWithGroupingNextLink(
    apiVersion: string,
    tenant: string,
    options?: coreHttp.RequestOptionsBase
  ): PagedAsyncIterableIterator<Models.Product[]> {}

  /**
   * A long-running paging operation that includes a nextLink that has 10 pages
   * @param options The options parameters.
   */
  private fetchGetMultiplePagesLRO(
    options?: Models.PagingGetMultiplePagesLROOptionalParams
  ): Promise<Models.PagingGetMultiplePagesLROResponse> {
    return this.client.sendOperationRequest(
      { options },
      getMultiplePagesLROOperationSpec
    ) as Promise<Models.PagingGetMultiplePagesLROResponse>;
  }

  /**
   * A long-running paging operation that includes a nextLink that has 10 pages
   * @param options The options parameters.
   */
  getMultiplePagesLRO(
    options?: Models.PagingGetMultiplePagesLROOptionalParams
  ): PagedAsyncIterableIterator<Models.Product[]> {}

  /**
   * A paging operation that doesn't return a full URL, just a fragment
   * @param apiVersion Sets the api version to use.
   * @param tenant Sets the tenant to use.
   * @param nextLink Next link for list operation.
   * @param options The options parameters.
   */
  private fetchNextFragment(
    apiVersion: string,
    tenant: string,
    nextLink: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PagingNextFragmentResponse> {
    return this.client.sendOperationRequest(
      { apiVersion, tenant, nextLink, options },
      nextFragmentOperationSpec
    ) as Promise<Models.PagingNextFragmentResponse>;
  }

  /**
   * A paging operation that doesn't return a full URL, just a fragment
   * @param apiVersion Sets the api version to use.
   * @param tenant Sets the tenant to use.
   * @param nextLink Next link for list operation.
   * @param options The options parameters.
   */
  nextFragment(
    apiVersion: string,
    tenant: string,
    nextLink: string,
    options?: coreHttp.RequestOptionsBase
  ): PagedAsyncIterableIterator<Models.Product[]> {}

  /**
   * A paging operation that doesn't return a full URL, just a fragment
   * @param apiVersion Sets the api version to use.
   * @param tenant Sets the tenant to use.
   * @param nextLink Next link for list operation.
   * @param options The options parameters.
   */
  private fetchNextFragmentWithGrouping(
    apiVersion: string,
    tenant: string,
    nextLink: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PagingNextFragmentWithGroupingResponse> {
    return this.client.sendOperationRequest(
      { apiVersion, tenant, nextLink, options },
      nextFragmentWithGroupingOperationSpec
    ) as Promise<Models.PagingNextFragmentWithGroupingResponse>;
  }

  /**
   * A paging operation that doesn't return a full URL, just a fragment
   * @param apiVersion Sets the api version to use.
   * @param tenant Sets the tenant to use.
   * @param nextLink Next link for list operation.
   * @param options The options parameters.
   */
  nextFragmentWithGrouping(
    apiVersion: string,
    tenant: string,
    nextLink: string,
    options?: coreHttp.RequestOptionsBase
  ): PagedAsyncIterableIterator<Models.Product[]> {}
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getNoItemNamePagesOperationSpec: coreHttp.OperationSpec = {
  path: "/paging/noitemname",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResultValue
    },
    default: {}
  },
  urlParameters: [Parameters.$host],
  serializer
};
const getNullNextLinkNamePagesOperationSpec: coreHttp.OperationSpec = {
  path: "/paging/nullnextlink",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host],
  serializer
};
const getSinglePagesOperationSpec: coreHttp.OperationSpec = {
  path: "/paging/single",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host],
  serializer
};
const getMultiplePagesOperationSpec: coreHttp.OperationSpec = {
  path: "/paging/multiple",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host],
  headerParameters: [
    Parameters.clientRequestId,
    Parameters.maxresults,
    Parameters.timeout
  ],
  serializer
};
const getOdataMultiplePagesOperationSpec: coreHttp.OperationSpec = {
  path: "/paging/multiple/odata",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OdataProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host],
  headerParameters: [
    Parameters.clientRequestId,
    Parameters.maxresults,
    Parameters.timeout
  ],
  serializer
};
const getMultiplePagesWithOffsetOperationSpec: coreHttp.OperationSpec = {
  path: "/paging/multiple/withpath/{offset}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host, Parameters.offset],
  headerParameters: [
    Parameters.clientRequestId,
    Parameters.maxresults,
    Parameters.timeout
  ],
  serializer
};
const getMultiplePagesRetryFirstOperationSpec: coreHttp.OperationSpec = {
  path: "/paging/multiple/retryfirst",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host],
  serializer
};
const getMultiplePagesRetrySecondOperationSpec: coreHttp.OperationSpec = {
  path: "/paging/multiple/retrysecond",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host],
  serializer
};
const getSinglePagesFailureOperationSpec: coreHttp.OperationSpec = {
  path: "/paging/single/failure",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host],
  serializer
};
const getMultiplePagesFailureOperationSpec: coreHttp.OperationSpec = {
  path: "/paging/multiple/failure",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host],
  serializer
};
const getMultiplePagesFailureUriOperationSpec: coreHttp.OperationSpec = {
  path: "/paging/multiple/failureuri",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host],
  serializer
};
const getMultiplePagesFragmentNextLinkOperationSpec: coreHttp.OperationSpec = {
  path: "/paging/multiple/fragment/{tenant}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OdataProductResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.tenant],
  serializer
};
const getMultiplePagesFragmentWithGroupingNextLinkOperationSpec: coreHttp.OperationSpec = {
  path: "/paging/multiple/fragmentwithgrouping/{tenant}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OdataProductResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.$host, Parameters.tenant1],
  serializer
};
const getMultiplePagesLROOperationSpec: coreHttp.OperationSpec = {
  path: "/paging/multiple/lro",
  httpMethod: "POST",
  responses: {
    202: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host],
  headerParameters: [
    Parameters.clientRequestId,
    Parameters.maxresults,
    Parameters.timeout
  ],
  serializer
};
const nextFragmentOperationSpec: coreHttp.OperationSpec = {
  path: "/paging/multiple/fragment/{tenant}/{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OdataProductResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.tenant, Parameters.nextLink],
  serializer
};
const nextFragmentWithGroupingOperationSpec: coreHttp.OperationSpec = {
  path: "/paging/multiple/fragmentwithgrouping/{tenant}/{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OdataProductResult
    },
    default: {}
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.$host, Parameters.tenant1, Parameters.nextLink],
  serializer
};
