/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import {
  XmlGetComplexTypeRefNoMetaResponse,
  RootWithRefAndNoMeta,
  XmlGetComplexTypeRefWithMetaResponse,
  RootWithRefAndMeta,
  XmlGetSimpleResponse,
  Slideshow,
  XmlGetWrappedListsResponse,
  AppleBarrel,
  XmlGetHeadersResponse,
  XmlGetEmptyListResponse,
  XmlGetEmptyWrappedListsResponse,
  XmlGetRootListResponse,
  Banana,
  XmlGetRootListSingleItemResponse,
  XmlGetEmptyRootListResponse,
  XmlGetEmptyChildElementResponse,
  XmlListContainersResponse,
  XmlGetServicePropertiesResponse,
  StorageServiceProperties,
  XmlGetAclsResponse,
  SignedIdentifier,
  XmlListBlobsResponse,
  JsonInput,
  XmlJsonOutputResponse,
  XmlGetXMsTextResponse
} from "../models";

/** Interface representing a Xml. */
export interface Xml {
  /**
   * Get a complex type that has a ref to a complex type with no XML node
   * @param options The options parameters.
   */
  getComplexTypeRefNoMeta(
    options?: coreHttp.OperationOptions
  ): Promise<XmlGetComplexTypeRefNoMetaResponse>;
  /**
   * Puts a complex type that has a ref to a complex type with no XML node
   * @param model I am root, and I ref a model with no meta
   * @param options The options parameters.
   */
  putComplexTypeRefNoMeta(
    model: RootWithRefAndNoMeta,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Get a complex type that has a ref to a complex type with XML node
   * @param options The options parameters.
   */
  getComplexTypeRefWithMeta(
    options?: coreHttp.OperationOptions
  ): Promise<XmlGetComplexTypeRefWithMetaResponse>;
  /**
   * Puts a complex type that has a ref to a complex type with XML node
   * @param model I am root, and I ref a model WITH meta
   * @param options The options parameters.
   */
  putComplexTypeRefWithMeta(
    model: RootWithRefAndMeta,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Get a simple XML document
   * @param options The options parameters.
   */
  getSimple(options?: coreHttp.OperationOptions): Promise<XmlGetSimpleResponse>;
  /**
   * Put a simple XML document
   * @param slideshow Data about a slideshow
   * @param options The options parameters.
   */
  putSimple(
    slideshow: Slideshow,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Get an XML document with multiple wrapped lists
   * @param options The options parameters.
   */
  getWrappedLists(
    options?: coreHttp.OperationOptions
  ): Promise<XmlGetWrappedListsResponse>;
  /**
   * Put an XML document with multiple wrapped lists
   * @param wrappedLists A barrel of apples.
   * @param options The options parameters.
   */
  putWrappedLists(
    wrappedLists: AppleBarrel,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Get strongly-typed response headers.
   * @param options The options parameters.
   */
  getHeaders(
    options?: coreHttp.OperationOptions
  ): Promise<XmlGetHeadersResponse>;
  /**
   * Get an empty list.
   * @param options The options parameters.
   */
  getEmptyList(
    options?: coreHttp.OperationOptions
  ): Promise<XmlGetEmptyListResponse>;
  /**
   * Puts an empty list.
   * @param slideshow Data about a slideshow
   * @param options The options parameters.
   */
  putEmptyList(
    slideshow: Slideshow,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Gets some empty wrapped lists.
   * @param options The options parameters.
   */
  getEmptyWrappedLists(
    options?: coreHttp.OperationOptions
  ): Promise<XmlGetEmptyWrappedListsResponse>;
  /**
   * Puts some empty wrapped lists.
   * @param appleBarrel A barrel of apples.
   * @param options The options parameters.
   */
  putEmptyWrappedLists(
    appleBarrel: AppleBarrel,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Gets a list as the root element.
   * @param options The options parameters.
   */
  getRootList(
    options?: coreHttp.OperationOptions
  ): Promise<XmlGetRootListResponse>;
  /**
   * Puts a list as the root element.
   * @param bananas Array of Banana
   * @param options The options parameters.
   */
  putRootList(
    bananas: Banana[],
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Gets a list with a single item.
   * @param options The options parameters.
   */
  getRootListSingleItem(
    options?: coreHttp.OperationOptions
  ): Promise<XmlGetRootListSingleItemResponse>;
  /**
   * Puts a list with a single item.
   * @param bananas Array of Banana
   * @param options The options parameters.
   */
  putRootListSingleItem(
    bananas: Banana[],
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Gets an empty list as the root element.
   * @param options The options parameters.
   */
  getEmptyRootList(
    options?: coreHttp.OperationOptions
  ): Promise<XmlGetEmptyRootListResponse>;
  /**
   * Puts an empty list as the root element.
   * @param bananas Array of Banana
   * @param options The options parameters.
   */
  putEmptyRootList(
    bananas: Banana[],
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Gets an XML document with an empty child element.
   * @param options The options parameters.
   */
  getEmptyChildElement(
    options?: coreHttp.OperationOptions
  ): Promise<XmlGetEmptyChildElementResponse>;
  /**
   * Puts a value with an empty child element.
   * @param banana A banana.
   * @param options The options parameters.
   */
  putEmptyChildElement(
    banana: Banana,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Lists containers in a storage account.
   * @param options The options parameters.
   */
  listContainers(
    options?: coreHttp.OperationOptions
  ): Promise<XmlListContainersResponse>;
  /**
   * Gets storage service properties.
   * @param options The options parameters.
   */
  getServiceProperties(
    options?: coreHttp.OperationOptions
  ): Promise<XmlGetServicePropertiesResponse>;
  /**
   * Puts storage service properties.
   * @param properties Storage Service Properties.
   * @param options The options parameters.
   */
  putServiceProperties(
    properties: StorageServiceProperties,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Gets storage ACLs for a container.
   * @param options The options parameters.
   */
  getAcls(options?: coreHttp.OperationOptions): Promise<XmlGetAclsResponse>;
  /**
   * Puts storage ACLs for a container.
   * @param properties a collection of signed identifiers
   * @param options The options parameters.
   */
  putAcls(
    properties: SignedIdentifier[],
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * Lists blobs in a storage container.
   * @param options The options parameters.
   */
  listBlobs(options?: coreHttp.OperationOptions): Promise<XmlListBlobsResponse>;
  /**
   * A Swagger with XML that has one operation that takes JSON as input. You need to send the ID number
   * 42
   * @param properties
   * @param options The options parameters.
   */
  jsonInput(
    properties: JsonInput,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse>;
  /**
   * A Swagger with XML that has one operation that returns JSON. ID number 42
   * @param options The options parameters.
   */
  jsonOutput(
    options?: coreHttp.OperationOptions
  ): Promise<XmlJsonOutputResponse>;
  /**
   * Get back an XML object with an x-ms-text property, which should translate to the returned object's
   * 'language' property being 'english' and its 'content' property being 'I am text'
   * @param options The options parameters.
   */
  getXMsText(
    options?: coreHttp.OperationOptions
  ): Promise<XmlGetXMsTextResponse>;
}
