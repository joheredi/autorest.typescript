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
import { BodyComplexClient } from "../bodyComplexClient";

/**
 * Class representing a Dictionary.
 */
export class Dictionary {
  private readonly client: BodyComplexClient;

  /**
   * Initialize a new instance of the class Dictionary class.
   * @param client Reference to the service client
   */
  constructor(client: BodyComplexClient) {
    this.client = client;
  }

  /**
   * Get complex types with dictionary property
   * @param options The options parameters.
   */
  getValid(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.DictionaryGetValidResponse> {
    return this.client.sendOperationRequest(
      { options },
      getValidOperationSpec
    ) as Promise<Models.DictionaryGetValidResponse>;
  }

  /**
   * Put complex types with dictionary property
   * @param complexBody Please put a dictionary with 5 key-value pairs: "txt":"notepad", "bmp":"mspaint",
   *                    "xls":"excel", "exe":"", "":null
   * @param options The options parameters.
   */
  putValid(
    complexBody: Models.DictionaryWrapper,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { complexBody, options },
      putValidOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get complex types with dictionary property which is empty
   * @param options The options parameters.
   */
  getEmpty(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.DictionaryGetEmptyResponse> {
    return this.client.sendOperationRequest(
      { options },
      getEmptyOperationSpec
    ) as Promise<Models.DictionaryGetEmptyResponse>;
  }

  /**
   * Put complex types with dictionary property which is empty
   * @param complexBody Please put a dictionary with 5 key-value pairs: "txt":"notepad", "bmp":"mspaint",
   *                    "xls":"excel", "exe":"", "":null
   * @param options The options parameters.
   */
  putEmpty(
    complexBody: Models.DictionaryWrapper,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { complexBody, options },
      putEmptyOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get complex types with dictionary property which is null
   * @param options The options parameters.
   */
  getNull(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.DictionaryGetNullResponse> {
    return this.client.sendOperationRequest(
      { options },
      getNullOperationSpec
    ) as Promise<Models.DictionaryGetNullResponse>;
  }

  /**
   * Get complex types with dictionary property while server doesn't provide a response payload
   * @param options The options parameters.
   */
  getNotProvided(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.DictionaryGetNotProvidedResponse> {
    return this.client.sendOperationRequest(
      { options },
      getNotProvidedOperationSpec
    ) as Promise<Models.DictionaryGetNotProvidedResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, false);

const getValidOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/dictionary/typed/valid",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DictionaryWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putValidOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/dictionary/typed/valid",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody13,
  urlParameters: [Parameters.$host],
  serializer
};
const getEmptyOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/dictionary/typed/empty",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DictionaryWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putEmptyOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/dictionary/typed/empty",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody13,
  urlParameters: [Parameters.$host],
  serializer
};
const getNullOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/dictionary/typed/null",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DictionaryWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const getNotProvidedOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/dictionary/typed/notprovided",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DictionaryWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
