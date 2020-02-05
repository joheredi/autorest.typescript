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
import { XmlServiceClient } from "../xmlServiceClient";

/**
 * Class representing a Xml.
 */
export class Xml {
  private readonly client: XmlServiceClient;

  /**
   * Initialize a new instance of the class Xml class.
   * @param client Reference to the service client
   */
  constructor(client: XmlServiceClient) {
    this.client = client;
  }

  /**
   * Get a complex type that has a ref to a complex type with no XML node
   * @param options The options parameters.
   */
  getComplexTypeRefNoMeta(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.XmlGetComplexTypeRefNoMetaResponse> {
    return this.client.sendOperationRequest(
      { options },
      getComplexTypeRefNoMetaOperationSpec
    ) as Promise<Models.XmlGetComplexTypeRefNoMetaResponse>;
  }

  /**
   * Puts a complex type that has a ref to a complex type with no XML node
   * @param model
   * @param options The options parameters.
   */
  putComplexTypeRefNoMeta(
    model: Models.RootWithRefAndNoMeta,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { model, options },
      putComplexTypeRefNoMetaOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get a complex type that has a ref to a complex type with XML node
   * @param options The options parameters.
   */
  getComplexTypeRefWithMeta(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.XmlGetComplexTypeRefWithMetaResponse> {
    return this.client.sendOperationRequest(
      { options },
      getComplexTypeRefWithMetaOperationSpec
    ) as Promise<Models.XmlGetComplexTypeRefWithMetaResponse>;
  }

  /**
   * Puts a complex type that has a ref to a complex type with XML node
   * @param model
   * @param options The options parameters.
   */
  putComplexTypeRefWithMeta(
    model: Models.RootWithRefAndMeta,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { model, options },
      putComplexTypeRefWithMetaOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get a simple XML document
   * @param options The options parameters.
   */
  getSimple(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.XmlGetSimpleResponse> {
    return this.client.sendOperationRequest(
      { options },
      getSimpleOperationSpec
    ) as Promise<Models.XmlGetSimpleResponse>;
  }

  /**
   * Put a simple XML document
   * @param slideshow
   * @param options The options parameters.
   */
  putSimple(
    slideshow: Models.Slideshow,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { slideshow, options },
      putSimpleOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get an XML document with multiple wrapped lists
   * @param options The options parameters.
   */
  getWrappedLists(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.XmlGetWrappedListsResponse> {
    return this.client.sendOperationRequest(
      { options },
      getWrappedListsOperationSpec
    ) as Promise<Models.XmlGetWrappedListsResponse>;
  }

  /**
   * Put an XML document with multiple wrapped lists
   * @param wrappedLists
   * @param options The options parameters.
   */
  putWrappedLists(
    wrappedLists: Models.AppleBarrel,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { wrappedLists, options },
      putWrappedListsOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get strongly-typed response headers.
   * @param options The options parameters.
   */
  getHeaders(
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { options },
      getHeadersOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get an empty list.
   * @param options The options parameters.
   */
  getEmptyList(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.XmlGetEmptyListResponse> {
    return this.client.sendOperationRequest(
      { options },
      getEmptyListOperationSpec
    ) as Promise<Models.XmlGetEmptyListResponse>;
  }

  /**
   * Puts an empty list.
   * @param slideshow
   * @param options The options parameters.
   */
  putEmptyList(
    slideshow: Models.Slideshow,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { slideshow, options },
      putEmptyListOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Gets some empty wrapped lists.
   * @param options The options parameters.
   */
  getEmptyWrappedLists(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.XmlGetEmptyWrappedListsResponse> {
    return this.client.sendOperationRequest(
      { options },
      getEmptyWrappedListsOperationSpec
    ) as Promise<Models.XmlGetEmptyWrappedListsResponse>;
  }

  /**
   * Puts some empty wrapped lists.
   * @param appleBarrel
   * @param options The options parameters.
   */
  putEmptyWrappedLists(
    appleBarrel: Models.AppleBarrel,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { appleBarrel, options },
      putEmptyWrappedListsOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Gets a list as the root element.
   * @param options The options parameters.
   */
  getRootList(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.XmlGetRootListResponse> {
    return this.client.sendOperationRequest(
      { options },
      getRootListOperationSpec
    ) as Promise<Models.XmlGetRootListResponse>;
  }

  /**
   * Puts a list as the root element.
   * @param bananas
   * @param options The options parameters.
   */
  putRootList(
    bananas: Models.Banana[],
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { bananas, options },
      putRootListOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Gets a list with a single item.
   * @param options The options parameters.
   */
  getRootListSingleItem(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.XmlGetRootListSingleItemResponse> {
    return this.client.sendOperationRequest(
      { options },
      getRootListSingleItemOperationSpec
    ) as Promise<Models.XmlGetRootListSingleItemResponse>;
  }

  /**
   * Puts a list with a single item.
   * @param bananas
   * @param options The options parameters.
   */
  putRootListSingleItem(
    bananas: Models.Banana[],
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { bananas, options },
      putRootListSingleItemOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Gets an empty list as the root element.
   * @param options The options parameters.
   */
  getEmptyRootList(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.XmlGetEmptyRootListResponse> {
    return this.client.sendOperationRequest(
      { options },
      getEmptyRootListOperationSpec
    ) as Promise<Models.XmlGetEmptyRootListResponse>;
  }

  /**
   * Puts an empty list as the root element.
   * @param bananas
   * @param options The options parameters.
   */
  putEmptyRootList(
    bananas: Models.Banana[],
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { bananas, options },
      putEmptyRootListOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Gets an XML document with an empty child element.
   * @param options The options parameters.
   */
  getEmptyChildElement(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.XmlGetEmptyChildElementResponse> {
    return this.client.sendOperationRequest(
      { options },
      getEmptyChildElementOperationSpec
    ) as Promise<Models.XmlGetEmptyChildElementResponse>;
  }

  /**
   * Puts a value with an empty child element.
   * @param banana
   * @param options The options parameters.
   */
  putEmptyChildElement(
    banana: Models.Banana,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { banana, options },
      putEmptyChildElementOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Lists containers in a storage account.
   * @param options The options parameters.
   */
  listContainers(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.XmlListContainersResponse> {
    return this.client.sendOperationRequest(
      { options },
      listContainersOperationSpec
    ) as Promise<Models.XmlListContainersResponse>;
  }

  /**
   * Gets storage service properties.
   * @param options The options parameters.
   */
  getServiceProperties(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.XmlGetServicePropertiesResponse> {
    return this.client.sendOperationRequest(
      { options },
      getServicePropertiesOperationSpec
    ) as Promise<Models.XmlGetServicePropertiesResponse>;
  }

  /**
   * Puts storage service properties.
   * @param properties
   * @param options The options parameters.
   */
  putServiceProperties(
    properties: Models.StorageServiceProperties,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { properties, options },
      putServicePropertiesOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Gets storage ACLs for a container.
   * @param options The options parameters.
   */
  getAcls(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.XmlGetAclsResponse> {
    return this.client.sendOperationRequest(
      { options },
      getAclsOperationSpec
    ) as Promise<Models.XmlGetAclsResponse>;
  }

  /**
   * Puts storage ACLs for a container.
   * @param properties
   * @param options The options parameters.
   */
  putAcls(
    properties: Models.SignedIdentifier[],
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { properties, options },
      putAclsOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Lists blobs in a storage container.
   * @param options The options parameters.
   */
  listBlobs(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.XmlListBlobsResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBlobsOperationSpec
    ) as Promise<Models.XmlListBlobsResponse>;
  }

  /**
   * A Swagger with XML that has one operation that takes JSON as input. You need to send the ID number
   * 42
   * @param properties
   * @param options The options parameters.
   */
  jsonInput(
    properties: Models.JSONInput,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { properties, options },
      jsonInputOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * A Swagger with XML that has one operation that returns JSON. ID number 42
   * @param options The options parameters.
   */
  jsonOutput(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.XmlJsonOutputResponse> {
    return this.client.sendOperationRequest(
      { options },
      jsonOutputOperationSpec
    ) as Promise<Models.XmlJsonOutputResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, true);

const getComplexTypeRefNoMetaOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/complex-type-ref-no-meta",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RootWithRefAndNoMeta
    }
  },
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const putComplexTypeRefNoMetaOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/complex-type-ref-no-meta",
  httpMethod: "PUT",
  responses: {},
  requestBody: Parameters.model,
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const getComplexTypeRefWithMetaOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/complex-type-ref-with-meta",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RootWithRefAndMeta
    }
  },
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const putComplexTypeRefWithMetaOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/complex-type-ref-with-meta",
  httpMethod: "PUT",
  responses: {},
  requestBody: Parameters.model1,
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const getSimpleOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/simple",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Slideshow
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const putSimpleOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/simple",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.slideshow,
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const getWrappedListsOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/wrapped-lists",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AppleBarrel
    }
  },
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const putWrappedListsOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/wrapped-lists",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.wrappedLists,
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const getHeadersOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/headers",
  httpMethod: "GET",
  responses: {},
  urlParameters: [Parameters.$host],
  serializer
};
const getEmptyListOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/empty-list",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Slideshow
    }
  },
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const putEmptyListOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/empty-list",
  httpMethod: "PUT",
  responses: {},
  requestBody: Parameters.slideshow,
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const getEmptyWrappedListsOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/empty-wrapped-lists",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AppleBarrel
    }
  },
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const putEmptyWrappedListsOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/empty-wrapped-lists",
  httpMethod: "PUT",
  responses: {},
  requestBody: Parameters.appleBarrel,
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const getRootListOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/root-list",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Banana" } }
        },
        serializedName: "Array of Banana",
        xmlName: "bananas",
        xmlElementName: "banana"
      }
    }
  },
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const putRootListOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/root-list",
  httpMethod: "PUT",
  responses: {},
  requestBody: Parameters.bananas,
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const getRootListSingleItemOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/root-list-single-item",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Banana" } }
        },
        serializedName: "Array of Banana",
        xmlName: "bananas",
        xmlElementName: "banana"
      }
    }
  },
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const putRootListSingleItemOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/root-list-single-item",
  httpMethod: "PUT",
  responses: {},
  requestBody: Parameters.bananas,
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const getEmptyRootListOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/empty-root-list",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Banana" } }
        },
        serializedName: "Array of Banana",
        xmlName: "bananas",
        xmlElementName: "banana"
      }
    }
  },
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const putEmptyRootListOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/empty-root-list",
  httpMethod: "PUT",
  responses: {},
  requestBody: Parameters.bananas,
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const getEmptyChildElementOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/empty-child-element",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Banana
    }
  },
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const putEmptyChildElementOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/empty-child-element",
  httpMethod: "PUT",
  responses: {},
  requestBody: Parameters.banana,
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const listContainersOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ListContainersResponse
    }
  },
  queryParameters: [Parameters.comp],
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const getServicePropertiesOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StorageServiceProperties
    }
  },
  queryParameters: [Parameters.comp1, Parameters.restype],
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const putServicePropertiesOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/",
  httpMethod: "PUT",
  responses: {},
  requestBody: Parameters.properties,
  queryParameters: [Parameters.comp1, Parameters.restype],
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const getAclsOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/mycontainer",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "SignedIdentifier" }
          }
        },
        serializedName: "SignedIdentifiers",
        xmlName: "SignedIdentifiers",
        xmlIsWrapped: true,
        xmlElementName: "SignedIdentifier"
      }
    }
  },
  queryParameters: [Parameters.comp2, Parameters.restype1],
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const putAclsOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/mycontainer",
  httpMethod: "PUT",
  responses: {},
  requestBody: Parameters.properties1,
  queryParameters: [Parameters.comp2, Parameters.restype1],
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const listBlobsOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/mycontainer",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ListBlobsResponse
    }
  },
  queryParameters: [Parameters.comp, Parameters.restype1],
  urlParameters: [Parameters.$host],
  isXML: true,
  serializer
};
const jsonInputOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/jsoninput",
  httpMethod: "PUT",
  responses: {},
  requestBody: Parameters.properties2,
  urlParameters: [Parameters.$host],
  serializer
};
const jsonOutputOperationSpec: coreHttp.OperationSpec = {
  path: "/xml/jsonoutput",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.JSONOutput
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
