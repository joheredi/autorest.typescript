/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { PagingClient } from "../pagingClient";
import {
  PagingGetNoItemNamePagesResponse,
  PagingGetNullNextLinkNamePagesResponse,
  PagingGetSinglePagesResponse,
  PagingGetMultiplePagesOptions,
  PagingGetMultiplePagesResponse,
  PagingGetOdataMultiplePagesOptions,
  PagingGetOdataMultiplePagesResponse,
  PagingGetMultiplePagesWithOffsetOptions,
  PagingGetMultiplePagesWithOffsetResponse,
  PagingGetMultiplePagesRetryFirstResponse,
  PagingGetMultiplePagesRetrySecondResponse,
  PagingGetSinglePagesFailureResponse,
  PagingGetMultiplePagesFailureResponse,
  PagingGetMultiplePagesFailureUriResponse,
  PagingGetMultiplePagesFragmentNextLinkResponse,
  CustomParameterGroup,
  PagingGetMultiplePagesFragmentWithGroupingNextLinkResponse,
  PagingGetMultiplePagesLroOptions,
  PagingGetMultiplePagesLROResponse,
  PagingNextFragmentResponse,
  PagingNextFragmentWithGroupingResponse,
  PagingGetNoItemNamePagesNextResponse,
  PagingGetSinglePagesNextResponse,
  PagingGetMultiplePagesNextResponse,
  PagingGetOdataMultiplePagesNextResponse,
  PagingGetMultiplePagesWithOffsetNextResponse,
  PagingGetMultiplePagesRetryFirstNextResponse,
  PagingGetMultiplePagesRetrySecondNextResponse,
  PagingGetSinglePagesFailureNextResponse,
  PagingGetMultiplePagesFailureNextResponse,
  PagingGetMultiplePagesFailureUriNextResponse,
  PagingGetMultiplePagesLRONextResponse
} from "../models";

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
  getNoItemNamePages(
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetNoItemNamePagesResponse> {
    return this.client.sendOperationRequest(
      { options },
      getNoItemNamePagesOperationSpec
    ) as Promise<PagingGetNoItemNamePagesResponse>;
  }

  /**
   * A paging operation that must ignore any kind of nextLink, and stop after page 1.
   * @param options The options parameters.
   */
  getNullNextLinkNamePages(
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetNullNextLinkNamePagesResponse> {
    return this.client.sendOperationRequest(
      { options },
      getNullNextLinkNamePagesOperationSpec
    ) as Promise<PagingGetNullNextLinkNamePagesResponse>;
  }

  /**
   * A paging operation that finishes on the first call without a nextlink
   * @param options The options parameters.
   */
  getSinglePages(
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetSinglePagesResponse> {
    return this.client.sendOperationRequest(
      { options },
      getSinglePagesOperationSpec
    ) as Promise<PagingGetSinglePagesResponse>;
  }

  /**
   * A paging operation that includes a nextLink that has 10 pages
   * @param pagingGetMultiplePagesOptions Parameter group
   * @param clientRequestId
   * @param options The options parameters.
   */
  getMultiplePages(
    pagingGetMultiplePagesOptions?: PagingGetMultiplePagesOptions,
    clientRequestId?: string,
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetMultiplePagesResponse> {
    return this.client.sendOperationRequest(
      { pagingGetMultiplePagesOptions, clientRequestId, options },
      getMultiplePagesOperationSpec
    ) as Promise<PagingGetMultiplePagesResponse>;
  }

  /**
   * A paging operation that includes a nextLink in odata format that has 10 pages
   * @param pagingGetOdataMultiplePagesOptions Parameter group
   * @param clientRequestId
   * @param options The options parameters.
   */
  getOdataMultiplePages(
    pagingGetOdataMultiplePagesOptions?: PagingGetOdataMultiplePagesOptions,
    clientRequestId?: string,
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetOdataMultiplePagesResponse> {
    return this.client.sendOperationRequest(
      { pagingGetOdataMultiplePagesOptions, clientRequestId, options },
      getOdataMultiplePagesOperationSpec
    ) as Promise<PagingGetOdataMultiplePagesResponse>;
  }

  /**
   * A paging operation that includes a nextLink that has 10 pages
   * @param pagingGetMultiplePagesWithOffsetOptions Parameter group
   * @param clientRequestId
   * @param options The options parameters.
   */
  getMultiplePagesWithOffset(
    pagingGetMultiplePagesWithOffsetOptions: PagingGetMultiplePagesWithOffsetOptions,
    clientRequestId?: string,
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetMultiplePagesWithOffsetResponse> {
    return this.client.sendOperationRequest(
      { pagingGetMultiplePagesWithOffsetOptions, clientRequestId, options },
      getMultiplePagesWithOffsetOperationSpec
    ) as Promise<PagingGetMultiplePagesWithOffsetResponse>;
  }

  /**
   * A paging operation that fails on the first call with 500 and then retries and then get a response
   * including a nextLink that has 10 pages
   * @param options The options parameters.
   */
  getMultiplePagesRetryFirst(
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetMultiplePagesRetryFirstResponse> {
    return this.client.sendOperationRequest(
      { options },
      getMultiplePagesRetryFirstOperationSpec
    ) as Promise<PagingGetMultiplePagesRetryFirstResponse>;
  }

  /**
   * A paging operation that includes a nextLink that has 10 pages, of which the 2nd call fails first
   * with 500. The client should retry and finish all 10 pages eventually.
   * @param options The options parameters.
   */
  getMultiplePagesRetrySecond(
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetMultiplePagesRetrySecondResponse> {
    return this.client.sendOperationRequest(
      { options },
      getMultiplePagesRetrySecondOperationSpec
    ) as Promise<PagingGetMultiplePagesRetrySecondResponse>;
  }

  /**
   * A paging operation that receives a 400 on the first call
   * @param options The options parameters.
   */
  getSinglePagesFailure(
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetSinglePagesFailureResponse> {
    return this.client.sendOperationRequest(
      { options },
      getSinglePagesFailureOperationSpec
    ) as Promise<PagingGetSinglePagesFailureResponse>;
  }

  /**
   * A paging operation that receives a 400 on the second call
   * @param options The options parameters.
   */
  getMultiplePagesFailure(
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetMultiplePagesFailureResponse> {
    return this.client.sendOperationRequest(
      { options },
      getMultiplePagesFailureOperationSpec
    ) as Promise<PagingGetMultiplePagesFailureResponse>;
  }

  /**
   * A paging operation that receives an invalid nextLink
   * @param options The options parameters.
   */
  getMultiplePagesFailureUri(
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetMultiplePagesFailureUriResponse> {
    return this.client.sendOperationRequest(
      { options },
      getMultiplePagesFailureUriOperationSpec
    ) as Promise<PagingGetMultiplePagesFailureUriResponse>;
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
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetMultiplePagesFragmentNextLinkResponse> {
    return this.client.sendOperationRequest(
      { apiVersion, tenant, options },
      getMultiplePagesFragmentNextLinkOperationSpec
    ) as Promise<PagingGetMultiplePagesFragmentNextLinkResponse>;
  }

  /**
   * A paging operation that doesn't return a full URL, just a fragment with parameters grouped
   * @param customParameterGroup Parameter group
   * @param options The options parameters.
   */
  getMultiplePagesFragmentWithGroupingNextLink(
    customParameterGroup: CustomParameterGroup,
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetMultiplePagesFragmentWithGroupingNextLinkResponse> {
    return this.client.sendOperationRequest(
      { customParameterGroup, options },
      getMultiplePagesFragmentWithGroupingNextLinkOperationSpec
    ) as Promise<PagingGetMultiplePagesFragmentWithGroupingNextLinkResponse>;
  }

  /**
   * A long-running paging operation that includes a nextLink that has 10 pages
   * @param pagingGetMultiplePagesLroOptions Parameter group
   * @param clientRequestId
   * @param options The options parameters.
   */
  getMultiplePagesLRO(
    pagingGetMultiplePagesLroOptions?: PagingGetMultiplePagesLroOptions,
    clientRequestId?: string,
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetMultiplePagesLROResponse> {
    return this.client.sendOperationRequest(
      { pagingGetMultiplePagesLroOptions, clientRequestId, options },
      getMultiplePagesLROOperationSpec
    ) as Promise<PagingGetMultiplePagesLROResponse>;
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
    options?: coreHttp.OperationOptions
  ): Promise<PagingNextFragmentResponse> {
    return this.client.sendOperationRequest(
      { apiVersion, tenant, nextLink, options },
      nextFragmentOperationSpec
    ) as Promise<PagingNextFragmentResponse>;
  }

  /**
   * A paging operation that doesn't return a full URL, just a fragment
   * @param nextLink Next link for list operation.
   * @param customParameterGroup Parameter group
   * @param options The options parameters.
   */
  nextFragmentWithGrouping(
    nextLink: string,
    customParameterGroup: CustomParameterGroup,
    options?: coreHttp.OperationOptions
  ): Promise<PagingNextFragmentWithGroupingResponse> {
    return this.client.sendOperationRequest(
      { nextLink, customParameterGroup, options },
      nextFragmentWithGroupingOperationSpec
    ) as Promise<PagingNextFragmentWithGroupingResponse>;
  }

  /**
   * GetNoItemNamePagesNext
   * @param nextLink The nextLink from the previous successful call to the GetNoItemNamePages method.
   * @param options The options parameters.
   */
  getNoItemNamePagesNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetNoItemNamePagesNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      getNoItemNamePagesNextOperationSpec
    ) as Promise<PagingGetNoItemNamePagesNextResponse>;
  }

  /**
   * GetSinglePagesNext
   * @param nextLink The nextLink from the previous successful call to the GetSinglePages method.
   * @param options The options parameters.
   */
  getSinglePagesNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetSinglePagesNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      getSinglePagesNextOperationSpec
    ) as Promise<PagingGetSinglePagesNextResponse>;
  }

  /**
   * GetMultiplePagesNext
   * @param nextLink The nextLink from the previous successful call to the GetMultiplePages method.
   * @param pagingGetMultiplePagesOptions Parameter group
   * @param clientRequestId
   * @param options The options parameters.
   */
  getMultiplePagesNext(
    nextLink: string,
    pagingGetMultiplePagesOptions?: PagingGetMultiplePagesOptions,
    clientRequestId?: string,
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetMultiplePagesNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, pagingGetMultiplePagesOptions, clientRequestId, options },
      getMultiplePagesNextOperationSpec
    ) as Promise<PagingGetMultiplePagesNextResponse>;
  }

  /**
   * GetOdataMultiplePagesNext
   * @param nextLink The nextLink from the previous successful call to the GetOdataMultiplePages method.
   * @param pagingGetOdataMultiplePagesOptions Parameter group
   * @param clientRequestId
   * @param options The options parameters.
   */
  getOdataMultiplePagesNext(
    nextLink: string,
    pagingGetOdataMultiplePagesOptions?: PagingGetOdataMultiplePagesOptions,
    clientRequestId?: string,
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetOdataMultiplePagesNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextLink,
        pagingGetOdataMultiplePagesOptions,
        clientRequestId,
        options
      },
      getOdataMultiplePagesNextOperationSpec
    ) as Promise<PagingGetOdataMultiplePagesNextResponse>;
  }

  /**
   * GetMultiplePagesWithOffsetNext
   * @param nextLink The nextLink from the previous successful call to the GetMultiplePagesWithOffset
   *                 method.
   * @param pagingGetMultiplePagesWithOffsetOptions Parameter group
   * @param clientRequestId
   * @param options The options parameters.
   */
  getMultiplePagesWithOffsetNext(
    nextLink: string,
    pagingGetMultiplePagesWithOffsetOptions: PagingGetMultiplePagesWithOffsetOptions,
    clientRequestId?: string,
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetMultiplePagesWithOffsetNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextLink,
        pagingGetMultiplePagesWithOffsetOptions,
        clientRequestId,
        options
      },
      getMultiplePagesWithOffsetNextOperationSpec
    ) as Promise<PagingGetMultiplePagesWithOffsetNextResponse>;
  }

  /**
   * GetMultiplePagesRetryFirstNext
   * @param nextLink The nextLink from the previous successful call to the GetMultiplePagesRetryFirst
   *                 method.
   * @param options The options parameters.
   */
  getMultiplePagesRetryFirstNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetMultiplePagesRetryFirstNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      getMultiplePagesRetryFirstNextOperationSpec
    ) as Promise<PagingGetMultiplePagesRetryFirstNextResponse>;
  }

  /**
   * GetMultiplePagesRetrySecondNext
   * @param nextLink The nextLink from the previous successful call to the GetMultiplePagesRetrySecond
   *                 method.
   * @param options The options parameters.
   */
  getMultiplePagesRetrySecondNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetMultiplePagesRetrySecondNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      getMultiplePagesRetrySecondNextOperationSpec
    ) as Promise<PagingGetMultiplePagesRetrySecondNextResponse>;
  }

  /**
   * GetSinglePagesFailureNext
   * @param nextLink The nextLink from the previous successful call to the GetSinglePagesFailure method.
   * @param options The options parameters.
   */
  getSinglePagesFailureNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetSinglePagesFailureNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      getSinglePagesFailureNextOperationSpec
    ) as Promise<PagingGetSinglePagesFailureNextResponse>;
  }

  /**
   * GetMultiplePagesFailureNext
   * @param nextLink The nextLink from the previous successful call to the GetMultiplePagesFailure
   *                 method.
   * @param options The options parameters.
   */
  getMultiplePagesFailureNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetMultiplePagesFailureNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      getMultiplePagesFailureNextOperationSpec
    ) as Promise<PagingGetMultiplePagesFailureNextResponse>;
  }

  /**
   * GetMultiplePagesFailureUriNext
   * @param nextLink The nextLink from the previous successful call to the GetMultiplePagesFailureUri
   *                 method.
   * @param options The options parameters.
   */
  getMultiplePagesFailureUriNext(
    nextLink: string,
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetMultiplePagesFailureUriNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      getMultiplePagesFailureUriNextOperationSpec
    ) as Promise<PagingGetMultiplePagesFailureUriNextResponse>;
  }

  /**
   * GetMultiplePagesLRONext
   * @param nextLink The nextLink from the previous successful call to the GetMultiplePagesLRO method.
   * @param pagingGetMultiplePagesLroOptions Parameter group
   * @param clientRequestId
   * @param options The options parameters.
   */
  getMultiplePagesLRONext(
    nextLink: string,
    pagingGetMultiplePagesLroOptions?: PagingGetMultiplePagesLroOptions,
    clientRequestId?: string,
    options?: coreHttp.OperationOptions
  ): Promise<PagingGetMultiplePagesLRONextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, pagingGetMultiplePagesLroOptions, clientRequestId, options },
      getMultiplePagesLRONextOperationSpec
    ) as Promise<PagingGetMultiplePagesLRONextResponse>;
  }
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
    Parameters.maxresults1,
    Parameters.timeout1
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
    Parameters.maxresults2,
    Parameters.timeout2
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
    Parameters.maxresults3,
    Parameters.timeout3
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
const getNoItemNamePagesNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResultValue
    },
    default: {}
  },
  urlParameters: [Parameters.$host, Parameters.nextLink1],
  serializer
};
const getSinglePagesNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host, Parameters.nextLink2],
  serializer
};
const getMultiplePagesNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host, Parameters.nextLink3],
  headerParameters: [
    Parameters.clientRequestId,
    Parameters.maxresults,
    Parameters.timeout
  ],
  serializer
};
const getOdataMultiplePagesNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OdataProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host, Parameters.nextLink4],
  headerParameters: [
    Parameters.clientRequestId,
    Parameters.maxresults1,
    Parameters.timeout1
  ],
  serializer
};
const getMultiplePagesWithOffsetNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host, Parameters.offset, Parameters.nextLink5],
  headerParameters: [
    Parameters.clientRequestId,
    Parameters.maxresults2,
    Parameters.timeout2
  ],
  serializer
};
const getMultiplePagesRetryFirstNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host, Parameters.nextLink6],
  serializer
};
const getMultiplePagesRetrySecondNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host, Parameters.nextLink7],
  serializer
};
const getSinglePagesFailureNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host, Parameters.nextLink8],
  serializer
};
const getMultiplePagesFailureNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host, Parameters.nextLink9],
  serializer
};
const getMultiplePagesFailureUriNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host, Parameters.nextLink10],
  serializer
};
const getMultiplePagesLRONextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "POST",
  responses: {
    202: {
      bodyMapper: Mappers.ProductResult
    },
    default: {}
  },
  urlParameters: [Parameters.$host, Parameters.nextLink11],
  headerParameters: [
    Parameters.clientRequestId,
    Parameters.maxresults3,
    Parameters.timeout3
  ],
  serializer
};
