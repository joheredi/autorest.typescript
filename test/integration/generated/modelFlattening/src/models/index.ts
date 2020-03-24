/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export interface Resource {
  /**
   * Resource Id
   */
  readonly id?: string;
  /**
   * Resource Type
   */
  readonly type?: string;
  /**
   * Dictionary of <string>
   */
  tags?: { [propertyName: string]: string };
  /**
   * Resource Location
   */
  location?: string;
  /**
   * Resource Name
   */
  readonly name?: string;
}

export interface ErrorModel {
  status?: number;
  message?: string;
  parentError?: ErrorModel;
}

/**
 * Flattened product.
 */
export type FlattenedProduct = Resource & {
  pName?: string;
  typePropertiesType?: string;
  readonly provisioningStateValues?: FlattenedProductPropertiesProvisioningStateValues;
  provisioningState?: string;
};

/**
 * The wrapped produc.
 */
export interface WrappedProduct {
  /**
   * the product value
   */
  value?: string;
}

/**
 * The wrapped produc.
 */
export interface ProductWrapper {
  /**
   * the product value
   */
  value?: string;
}

export interface ResourceCollection {
  /**
   * Flattened product.
   */
  productresource?: FlattenedProduct;
  arrayofresources?: FlattenedProduct[];
  /**
   * Dictionary of <FlattenedProduct>
   */
  dictionaryofresources?: { [propertyName: string]: FlattenedProduct };
}

/**
 * The product documentation.
 */
export interface BaseProduct {
  /**
   * Unique identifier representing a specific product for a given latitude & longitude. For example, uberX in San Francisco will have a different product_id than uberX in Los Angeles.
   */
  productId: string;
  /**
   * Description of product.
   */
  description?: string;
}

/**
 * The product documentation.
 */
export type SimpleProduct = BaseProduct & {
  /**
   * Display name of product.
   */
  maxProductDisplayName?: string;
  /**
   * Capacity of product. For example, 4 people.
   */
  capacity?: "Large";
  /**
   * Generic URL value.
   */
  genericValue?: string;
  /**
   * URL value.
   */
  odataValue?: string;
};

/**
 * The Generic URL.
 */
export interface GenericUrl {
  /**
   * Generic URL value.
   */
  genericValue?: string;
}

/**
 * The product URL.
 */
export type ProductUrl = GenericUrl & {
  /**
   * URL value.
   */
  odataValue?: string;
};
/**
 * Defines values for FlattenedProductPropertiesProvisioningStateValues.
 */
export type FlattenedProductPropertiesProvisioningStateValues =
  | "Succeeded"
  | "Failed"
  | "canceled"
  | "Accepted"
  | "Creating"
  | "Created"
  | "Updating"
  | "Updated"
  | "Deleting"
  | "Deleted"
  | "OK";

/**
 * Optional parameters.
 */
export interface ModelFlatteningClientPutArrayOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * External Resource as an Array to put
   */
  resourceArray?: Resource[];
}

/**
 * Contains response data for the getArray operation.
 */
export type ModelFlatteningClientGetArrayResponse = FlattenedProduct[] & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: FlattenedProduct[];
  };
};

/**
 * Optional parameters.
 */
export interface ModelFlatteningClientPutWrappedArrayOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * External Resource as an Array to put
   */
  resourceArray?: WrappedProduct[];
}

/**
 * Contains response data for the getWrappedArray operation.
 */
export type ModelFlatteningClientGetWrappedArrayResponse = ProductWrapper[] & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ProductWrapper[];
  };
};

/**
 * Optional parameters.
 */
export interface ModelFlatteningClientPutDictionaryOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * External Resource as a Dictionary to put
   */
  resourceDictionary?: { [propertyName: string]: FlattenedProduct };
}

/**
 * Contains response data for the getDictionary operation.
 */
export type ModelFlatteningClientGetDictionaryResponse = {
  [propertyName: string]: FlattenedProduct;
} & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: { [propertyName: string]: FlattenedProduct };
  };
};

/**
 * Optional parameters.
 */
export interface ModelFlatteningClientPutResourceCollectionOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * External Resource as a ResourceCollection to put
   */
  resourceComplexObject?: ResourceCollection;
}

/**
 * Contains response data for the getResourceCollection operation.
 */
export type ModelFlatteningClientGetResourceCollectionResponse = ResourceCollection & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ResourceCollection;
  };
};

/**
 * Optional parameters.
 */
export interface ModelFlatteningClientPutSimpleProductOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Simple body product to put
   */
  simpleBodyProduct?: SimpleProduct;
}

/**
 * Contains response data for the putSimpleProduct operation.
 */
export type ModelFlatteningClientPutSimpleProductResponse = SimpleProduct & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: SimpleProduct;
  };
};

/**
 * Optional parameters.
 */
export interface ModelFlatteningClientPostFlattenedSimpleProductOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Simple body product to post
   */
  simpleBodyProduct?: SimpleProduct;
}

/**
 * Contains response data for the postFlattenedSimpleProduct operation.
 */
export type ModelFlatteningClientPostFlattenedSimpleProductResponse = SimpleProduct & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: SimpleProduct;
  };
};

/**
 * Optional parameters.
 */
export interface ModelFlatteningClientPutSimpleProductWithGroupingOptionalParams
  extends coreHttp.OperationOptions {
  /**
   * Simple body product to put
   */
  simpleBodyProduct?: SimpleProduct;
}

/**
 * Contains response data for the putSimpleProductWithGrouping operation.
 */
export type ModelFlatteningClientPutSimpleProductWithGroupingResponse = SimpleProduct & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: SimpleProduct;
  };
};

/**
 * Optional parameters.
 */
export interface ModelFlatteningClientOptionalParams
  extends coreHttp.ServiceClientOptions {
  /**
   * server parameter
   */
  $host?: string;
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}
