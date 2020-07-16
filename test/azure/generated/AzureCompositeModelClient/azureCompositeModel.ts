/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as Parameters from "./models/parameters";
import * as operations from "./operations";
import { AzureCompositeModelContext } from "./azureCompositeModelContext";


class AzureCompositeModel extends AzureCompositeModelContext {
  // Operation groups
  basic: operations.BasicOperations;
  primitive: operations.Primitive;
  arrayModel: operations.ArrayModel;
  dictionary: operations.Dictionary;
  inheritance: operations.Inheritance;
  polymorphism: operations.Polymorphism;
  polymorphicrecursive: operations.Polymorphicrecursive;
  readonlyproperty: operations.Readonlyproperty;
  flattencomplex: operations.Flattencomplex;

  /**
   * Initializes a new instance of the AzureCompositeModel class.
   * @param credentials Credentials needed for the client to connect to Azure.
   * @param [options] The parameter options
   */
  constructor(credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials, options?: Models.AzureCompositeModelOptions) {
    super(credentials, options);
    this.basic = new operations.BasicOperations(this);
    this.primitive = new operations.Primitive(this);
    this.arrayModel = new operations.ArrayModel(this);
    this.dictionary = new operations.Dictionary(this);
    this.inheritance = new operations.Inheritance(this);
    this.polymorphism = new operations.Polymorphism(this);
    this.polymorphicrecursive = new operations.Polymorphicrecursive(this);
    this.readonlyproperty = new operations.Readonlyproperty(this);
    this.flattencomplex = new operations.Flattencomplex(this);
  }

  /**
   * The Products endpoint returns information about the Uber products offered at a given location.
   * The response includes the display name and other details about each product, and lists the
   * products in the proper display order.
   * @summary Product Types
   * @param resourceGroupName Resource Group ID.
   * @param [options] The optional parameters
   * @returns Promise<Models.ListResponse>
   */
  list(resourceGroupName: string, options?: coreHttp.RequestOptionsBase): Promise<Models.ListResponse>;
  /**
   * @param resourceGroupName Resource Group ID.
   * @param callback The callback
   */
  list(resourceGroupName: string, callback: coreHttp.ServiceCallback<Models.CatalogArray>): void;
  /**
   * @param resourceGroupName Resource Group ID.
   * @param options The optional parameters
   * @param callback The callback
   */
  list(resourceGroupName: string, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.CatalogArray>): void;
  list(resourceGroupName: string, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.CatalogArray>, callback?: coreHttp.ServiceCallback<Models.CatalogArray>): Promise<Models.ListResponse> {
    return this.sendOperationRequest(
      {
        resourceGroupName,
        options
      },
      listOperationSpec,
      callback) as Promise<Models.ListResponse>;
  }

  /**
   * Resets products.
   * @summary Create products
   * @param subscriptionId Subscription ID.
   * @param resourceGroupName Resource Group ID.
   * @param [options] The optional parameters
   * @returns Promise<Models.CreateResponse>
   */
  create(subscriptionId: string, resourceGroupName: string, options?: Models.AzureCompositeModelCreateOptionalParams): Promise<Models.CreateResponse>;
  /**
   * @param subscriptionId Subscription ID.
   * @param resourceGroupName Resource Group ID.
   * @param callback The callback
   */
  create(subscriptionId: string, resourceGroupName: string, callback: coreHttp.ServiceCallback<Models.CatalogDictionary>): void;
  /**
   * @param subscriptionId Subscription ID.
   * @param resourceGroupName Resource Group ID.
   * @param options The optional parameters
   * @param callback The callback
   */
  create(subscriptionId: string, resourceGroupName: string, options: Models.AzureCompositeModelCreateOptionalParams, callback: coreHttp.ServiceCallback<Models.CatalogDictionary>): void;
  create(subscriptionId: string, resourceGroupName: string, options?: Models.AzureCompositeModelCreateOptionalParams | coreHttp.ServiceCallback<Models.CatalogDictionary>, callback?: coreHttp.ServiceCallback<Models.CatalogDictionary>): Promise<Models.CreateResponse> {
    return this.sendOperationRequest(
      {
        subscriptionId,
        resourceGroupName,
        options
      },
      createOperationSpec,
      callback) as Promise<Models.CreateResponse>;
  }

  /**
   * Resets products.
   * @summary Update products
   * @param subscriptionId Subscription ID.
   * @param resourceGroupName Resource Group ID.
   * @param [options] The optional parameters
   * @returns Promise<Models.UpdateResponse>
   */
  update(subscriptionId: string, resourceGroupName: string, options?: Models.AzureCompositeModelUpdateOptionalParams): Promise<Models.UpdateResponse>;
  /**
   * @param subscriptionId Subscription ID.
   * @param resourceGroupName Resource Group ID.
   * @param callback The callback
   */
  update(subscriptionId: string, resourceGroupName: string, callback: coreHttp.ServiceCallback<Models.CatalogArray>): void;
  /**
   * @param subscriptionId Subscription ID.
   * @param resourceGroupName Resource Group ID.
   * @param options The optional parameters
   * @param callback The callback
   */
  update(subscriptionId: string, resourceGroupName: string, options: Models.AzureCompositeModelUpdateOptionalParams, callback: coreHttp.ServiceCallback<Models.CatalogArray>): void;
  update(subscriptionId: string, resourceGroupName: string, options?: Models.AzureCompositeModelUpdateOptionalParams | coreHttp.ServiceCallback<Models.CatalogArray>, callback?: coreHttp.ServiceCallback<Models.CatalogArray>): Promise<Models.UpdateResponse> {
    return this.sendOperationRequest(
      {
        subscriptionId,
        resourceGroupName,
        options
      },
      updateOperationSpec,
      callback) as Promise<Models.UpdateResponse>;
  }
}

// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers);
const listOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/Microsoft.Cache/Redis",
  urlParameters: [
    Parameters.subscriptionId0,
    Parameters.resourceGroupName
  ],
  queryParameters: [
    Parameters.apiVersion0
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.CatalogArray
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const createOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "POST",
  path: "subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/Microsoft.Cache/Redis",
  urlParameters: [
    Parameters.subscriptionId1,
    Parameters.resourceGroupName
  ],
  queryParameters: [
    Parameters.apiVersion0
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: {
      productDictionaryOfArray: [
        "options",
        "productDictionaryOfArray"
      ]
    },
    mapper: {
      ...Mappers.CatalogDictionaryOfArray,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.CatalogDictionary
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const updateOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "PUT",
  path: "subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/Microsoft.Cache/Redis",
  urlParameters: [
    Parameters.subscriptionId1,
    Parameters.resourceGroupName
  ],
  queryParameters: [
    Parameters.apiVersion0
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  requestBody: {
    parameterPath: {
      productArrayOfDictionary: [
        "options",
        "productArrayOfDictionary"
      ]
    },
    mapper: {
      ...Mappers.CatalogArrayOfDictionary,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: Mappers.CatalogArray
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

export {
  AzureCompositeModel,
  AzureCompositeModelContext,
  Models as AzureCompositeModelModels,
  Mappers as AzureCompositeModelMappers
};
export * from "./operations";