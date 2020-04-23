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
import { AzureContainerRegistry } from "../azureContainerRegistry";
import {
  TagGetListOptionalParams,
  TagGetListResponse,
  TagGetAttributesResponse,
  TagUpdateAttributesOptionalParams
} from "../models";

/**
 * Class representing a Tag.
 */
export class Tag {
  private readonly client: AzureContainerRegistry;

  /**
   * Initialize a new instance of the class Tag class.
   * @param client Reference to the service client
   */
  constructor(client: AzureContainerRegistry) {
    this.client = client;
  }

  /**
   * List tags of a repository
   * @param name Name of the image (including the namespace)
   * @param options The options parameters.
   */
  getList(
    name: string,
    options?: TagGetListOptionalParams
  ): Promise<TagGetListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { name, options: operationOptions },
      getListOperationSpec
    ) as Promise<TagGetListResponse>;
  }

  /**
   * Get tag attributes by tag
   * @param name Name of the image (including the namespace)
   * @param reference Tag name
   * @param options The options parameters.
   */
  getAttributes(
    name: string,
    reference: string,
    options?: coreHttp.OperationOptions
  ): Promise<TagGetAttributesResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { name, reference, options: operationOptions },
      getAttributesOperationSpec
    ) as Promise<TagGetAttributesResponse>;
  }

  /**
   * Update tag attributes
   * @param name Name of the image (including the namespace)
   * @param reference Tag name
   * @param options The options parameters.
   */
  updateAttributes(
    name: string,
    reference: string,
    options?: TagUpdateAttributesOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { name, reference, options: operationOptions },
      updateAttributesOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Delete tag
   * @param name Name of the image (including the namespace)
   * @param reference Tag name
   * @param options The options parameters.
   */
  delete(
    name: string,
    reference: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { name, reference, options: operationOptions },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getListOperationSpec: coreHttp.OperationSpec = {
  path: "/acr/v1/{name}/_tags",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TagList
    },
    default: {
      bodyMapper: Mappers.AcrErrors
    }
  },
  queryParameters: [
    Parameters.last,
    Parameters.n,
    Parameters.orderby,
    Parameters.digest2
  ],
  urlParameters: [Parameters.url, Parameters.name],
  serializer
};
const getAttributesOperationSpec: coreHttp.OperationSpec = {
  path: "/acr/v1/{name}/_tags/{reference}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.TagAttributes
    },
    default: {
      bodyMapper: Mappers.AcrErrors
    }
  },
  urlParameters: [Parameters.url, Parameters.name, Parameters.reference1],
  serializer
};
const updateAttributesOperationSpec: coreHttp.OperationSpec = {
  path: "/acr/v1/{name}/_tags/{reference}",
  httpMethod: "PATCH",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.AcrErrors
    }
  },
  requestBody: Parameters.value,
  urlParameters: [Parameters.url, Parameters.name, Parameters.reference1],
  headerParameters: [Parameters.contentType1],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path: "/acr/v1/{name}/_tags/{reference}",
  httpMethod: "DELETE",
  responses: {
    202: {},
    default: {
      bodyMapper: Mappers.AcrErrors
    }
  },
  urlParameters: [Parameters.url, Parameters.name, Parameters.reference1],
  serializer
};
