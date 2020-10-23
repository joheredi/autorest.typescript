/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { ServiceClientOptions } from "@azure/ms-rest-js";
import * as msRest from "@azure/ms-rest-js";

/**
 * An interface representing ErrorModel.
 */
export interface ErrorModel {
  status?: number;
  message?: string;
  parentError?: ErrorModel;
}

/**
 * An interface representing Resource.
 */
export interface Resource {
  /**
   * Resource Id
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly id?: string;
  /**
   * Resource Type
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly type?: string;
  tags?: { [propertyName: string]: string };
  /**
   * Resource Location
   */
  location?: string;
  /**
   * Resource Name
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly name?: string;
}

/**
 * Flattened product.
 */
export interface FlattenedProduct extends Resource {
  pname?: string;
  flattenedProductType?: string;
  /**
   * Possible values include: 'Succeeded', 'Failed', 'canceled', 'Accepted', 'Creating', 'Created',
   * 'Updating', 'Updated', 'Deleting', 'Deleted', 'OK'
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly provisioningStateValues?: ProvisioningStateValues;
  provisioningState?: string;
}

/**
 * An interface representing ResourceCollection.
 */
export interface ResourceCollection {
  productresource?: FlattenedProduct;
  arrayofresources?: FlattenedProduct[];
  dictionaryofresources?: { [propertyName: string]: FlattenedProduct };
}

/**
 * The product documentation.
 */
export interface BaseProduct {
  /**
   * Unique identifier representing a specific product for a given latitude & longitude. For
   * example, uberX in San Francisco will have a different product_id than uberX in Los Angeles.
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
export interface SimpleProduct extends BaseProduct {
  /**
   * Display name of product.
   */
  maxProductDisplayName: string;
  /**
   * Generic URL value.
   */
  genericValue?: string;
  /**
   * URL value.
   */
  odatavalue?: string;
}

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

/**
 * Additional parameters for putSimpleProductWithGrouping operation.
 */
export interface FlattenParameterGroup {
  /**
   * Product name with value 'groupproduct'
   */
  name: string;
  /**
   * Unique identifier representing a specific product for a given latitude & longitude. For
   * example, uberX in San Francisco will have a different product_id than uberX in Los Angeles.
   */
  productId: string;
  /**
   * Description of product.
   */
  description?: string;
  /**
   * Display name of product.
   */
  maxProductDisplayName: string;
  /**
   * Generic URL value.
   */
  genericValue?: string;
  /**
   * URL value.
   */
  odatavalue?: string;
}

/**
 * An interface representing AutoRestResourceFlatteningTestServiceOptions.
 */
export interface AutoRestResourceFlatteningTestServiceOptions extends ServiceClientOptions {
  baseUri?: string;
}

/**
 * Optional Parameters.
 */
export interface AutoRestResourceFlatteningTestServicePutArrayOptionalParams extends msRest.RequestOptionsBase {
  /**
   * External Resource as an Array to put
   */
  resourceArray?: Resource[];
}

/**
 * Optional Parameters.
 */
export interface AutoRestResourceFlatteningTestServicePutWrappedArrayOptionalParams extends msRest.RequestOptionsBase {
  /**
   * External Resource as an Array to put
   */
  resourceArray?: WrappedProduct[];
}

/**
 * Optional Parameters.
 */
export interface AutoRestResourceFlatteningTestServicePutDictionaryOptionalParams extends msRest.RequestOptionsBase {
  /**
   * External Resource as a Dictionary to put
   */
  resourceDictionary?: { [propertyName: string]: FlattenedProduct };
}

/**
 * Optional Parameters.
 */
export interface AutoRestResourceFlatteningTestServicePutResourceCollectionOptionalParams extends msRest.RequestOptionsBase {
  /**
   * External Resource as a ResourceCollection to put
   */
  resourceComplexObject?: ResourceCollection;
}

/**
 * Optional Parameters.
 */
export interface AutoRestResourceFlatteningTestServicePutSimpleProductOptionalParams extends msRest.RequestOptionsBase {
  /**
   * Simple body product to put
   */
  simpleBodyProduct?: SimpleProduct;
}

/**
 * Optional Parameters.
 */
export interface AutoRestResourceFlatteningTestServicePostFlattenedSimpleProductOptionalParams extends msRest.RequestOptionsBase {
  /**
   * Description of product.
   */
  description?: string;
  /**
   * Generic URL value.
   */
  genericValue?: string;
  /**
   * URL value.
   */
  odatavalue?: string;
}

/**
 * Defines values for ProvisioningStateValues.
 * Possible values include: 'Succeeded', 'Failed', 'canceled', 'Accepted', 'Creating', 'Created',
 * 'Updating', 'Updated', 'Deleting', 'Deleted', 'OK'
 * @readonly
 * @enum {string}
 */
export type ProvisioningStateValues = 'Succeeded' | 'Failed' | 'canceled' | 'Accepted' | 'Creating' | 'Created' | 'Updating' | 'Updated' | 'Deleting' | 'Deleted' | 'OK';

/**
 * Contains response data for the getArray operation.
 */
export type GetArrayResponse = Array<FlattenedProduct> & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
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
 * Contains response data for the getWrappedArray operation.
 */
export type GetWrappedArrayResponse = Array<ProductWrapper> & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
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
 * Contains response data for the getDictionary operation.
 */
export type GetDictionaryResponse = {
  /**
   * The response body properties.
   */
  [propertyName: string]: FlattenedProduct;
} & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
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
 * Contains response data for the getResourceCollection operation.
 */
export type GetResourceCollectionResponse = ResourceCollection & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
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
 * Contains response data for the putSimpleProduct operation.
 */
export type PutSimpleProductResponse = SimpleProduct & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
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
 * Contains response data for the postFlattenedSimpleProduct operation.
 */
export type PostFlattenedSimpleProductResponse = SimpleProduct & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
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
 * Contains response data for the putSimpleProductWithGrouping operation.
 */
export type PutSimpleProductWithGroupingResponse = SimpleProduct & {
  /**
   * The underlying HTTP response.
   */
  _response: msRest.HttpResponse & {
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
