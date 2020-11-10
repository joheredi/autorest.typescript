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
import { BodyStringClient } from "../bodyStringClient";
import {
  StringGetNullResponse,
  StringPutNullOptionalParams,
  StringGetEmptyResponse,
  StringGetMbcsResponse,
  StringGetWhitespaceResponse,
  StringGetNotProvidedResponse,
  StringGetBase64EncodedResponse,
  StringGetBase64UrlEncodedResponse,
  StringGetNullBase64UrlEncodedResponse
} from "../models";

/**
 * Class representing a StringOperations.
 */
export class StringOperations {
  private readonly client: BodyStringClient;

  /**
   * Initialize a new instance of the class StringOperations class.
   * @param client Reference to the service client
   */
  constructor(client: BodyStringClient) {
    this.client = client;
  }

  /**
   * Get null string value value
   * @param options The options parameters.
   */
  getNull(options?: coreHttp.OperationOptions): Promise<StringGetNullResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getNullOperationSpec
    ) as Promise<StringGetNullResponse>;
  }

  /**
   * Set string value null
   * @param options The options parameters.
   */
  putNull(
    options?: StringPutNullOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      putNullOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get empty string value value ''
   * @param options The options parameters.
   */
  getEmpty(
    options?: coreHttp.OperationOptions
  ): Promise<StringGetEmptyResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getEmptyOperationSpec
    ) as Promise<StringGetEmptyResponse>;
  }

  /**
   * Set string value empty ''
   * @param options The options parameters.
   */
  putEmpty(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      putEmptyOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get mbcs string value '啊齄丂狛狜隣郎隣兀﨩ˊ〞〡￤℡㈱‐ー﹡﹢﹫、〓ⅰⅹ⒈€㈠㈩ⅠⅫ！￣ぁんァヶΑ︴АЯаяāɡㄅㄩ─╋︵﹄︻︱︳︴ⅰⅹɑɡ〇〾⿻⺁䜣€'
   * @param options The options parameters.
   */
  getMbcs(options?: coreHttp.OperationOptions): Promise<StringGetMbcsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getMbcsOperationSpec
    ) as Promise<StringGetMbcsResponse>;
  }

  /**
   * Set string value mbcs '啊齄丂狛狜隣郎隣兀﨩ˊ〞〡￤℡㈱‐ー﹡﹢﹫、〓ⅰⅹ⒈€㈠㈩ⅠⅫ！￣ぁんァヶΑ︴АЯаяāɡㄅㄩ─╋︵﹄︻︱︳︴ⅰⅹɑɡ〇〾⿻⺁䜣€'
   * @param options The options parameters.
   */
  putMbcs(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      putMbcsOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get string value with leading and trailing whitespace '<tab><space><space>Now is the time for all
   * good men to come to the aid of their country<tab><space><space>'
   * @param options The options parameters.
   */
  getWhitespace(
    options?: coreHttp.OperationOptions
  ): Promise<StringGetWhitespaceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getWhitespaceOperationSpec
    ) as Promise<StringGetWhitespaceResponse>;
  }

  /**
   * Set String value with leading and trailing whitespace '<tab><space><space>Now is the time for all
   * good men to come to the aid of their country<tab><space><space>'
   * @param options The options parameters.
   */
  putWhitespace(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      putWhitespaceOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get String value when no string value is sent in response payload
   * @param options The options parameters.
   */
  getNotProvided(
    options?: coreHttp.OperationOptions
  ): Promise<StringGetNotProvidedResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getNotProvidedOperationSpec
    ) as Promise<StringGetNotProvidedResponse>;
  }

  /**
   * Get value that is base64 encoded
   * @param options The options parameters.
   */
  getBase64Encoded(
    options?: coreHttp.OperationOptions
  ): Promise<StringGetBase64EncodedResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getBase64EncodedOperationSpec
    ) as Promise<StringGetBase64EncodedResponse>;
  }

  /**
   * Get value that is base64url encoded
   * @param options The options parameters.
   */
  getBase64UrlEncoded(
    options?: coreHttp.OperationOptions
  ): Promise<StringGetBase64UrlEncodedResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getBase64UrlEncodedOperationSpec
    ) as Promise<StringGetBase64UrlEncodedResponse>;
  }

  /**
   * Put value that is base64url encoded
   * @param stringBody string body
   * @param options The options parameters.
   */
  putBase64UrlEncoded(
    stringBody: Uint8Array,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { stringBody, options: operationOptions },
      putBase64UrlEncodedOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get null value that is expected to be base64url encoded
   * @param options The options parameters.
   */
  getNullBase64UrlEncoded(
    options?: coreHttp.OperationOptions
  ): Promise<StringGetNullBase64UrlEncodedResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      getNullBase64UrlEncodedOperationSpec
    ) as Promise<StringGetNullBase64UrlEncodedResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getNullOperationSpec: coreHttp.OperationSpec = {
  path: "/string/null",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" } }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const putNullOperationSpec: coreHttp.OperationSpec = {
  path: "/string/null",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.stringBody,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getEmptyOperationSpec: coreHttp.OperationSpec = {
  path: "/string/empty",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" } }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const putEmptyOperationSpec: coreHttp.OperationSpec = {
  path: "/string/empty",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.stringBody1,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getMbcsOperationSpec: coreHttp.OperationSpec = {
  path: "/string/mbcs",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" } }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const putMbcsOperationSpec: coreHttp.OperationSpec = {
  path: "/string/mbcs",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.stringBody2,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getWhitespaceOperationSpec: coreHttp.OperationSpec = {
  path: "/string/whitespace",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" } }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const putWhitespaceOperationSpec: coreHttp.OperationSpec = {
  path: "/string/whitespace",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.stringBody3,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getNotProvidedOperationSpec: coreHttp.OperationSpec = {
  path: "/string/notProvided",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" } }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const getBase64EncodedOperationSpec: coreHttp.OperationSpec = {
  path: "/string/base64Encoding",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "ByteArray" } }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const getBase64UrlEncodedOperationSpec: coreHttp.OperationSpec = {
  path: "/string/base64UrlEncoding",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "Base64Url" } }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const putBase64UrlEncodedOperationSpec: coreHttp.OperationSpec = {
  path: "/string/base64UrlEncoding",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.stringBody4,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getNullBase64UrlEncodedOperationSpec: coreHttp.OperationSpec = {
  path: "/string/nullBase64UrlEncoding",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "Base64Url" } }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
