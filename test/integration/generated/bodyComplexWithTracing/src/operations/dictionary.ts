/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { CanonicalCode } from "@opentelemetry/api";
import { createSpan } from "../tracing";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { BodyComplexWithTracing } from "../bodyComplexWithTracing";
import {
  DictionaryGetValidResponse,
  DictionaryWrapper,
  DictionaryGetEmptyResponse,
  DictionaryGetNullResponse,
  DictionaryGetNotProvidedResponse
} from "../models";

/**
 * Class representing a Dictionary.
 */
export class Dictionary {
  private readonly client: BodyComplexWithTracing;

  /**
   * Initialize a new instance of the class Dictionary class.
   * @param client Reference to the service client
   */
  constructor(client: BodyComplexWithTracing) {
    this.client = client;
  }

  /**
   * Get complex types with dictionary property
   * @param options The options parameters.
   */
  async getValid(
    options?: coreHttp.OperationOptions
  ): Promise<DictionaryGetValidResponse> {
    const { span, updatedOptions } = createSpan(
      "BodyComplexWithTracing-getValid",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getValidOperationSpec
      );
      return result as DictionaryGetValidResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Put complex types with dictionary property
   * @param complexBody Please put a dictionary with 5 key-value pairs: "txt":"notepad", "bmp":"mspaint",
   *                    "xls":"excel", "exe":"", "":null
   * @param options The options parameters.
   */
  async putValid(
    complexBody: DictionaryWrapper,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan(
      "BodyComplexWithTracing-putValid",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      complexBody,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        putValidOperationSpec
      );
      return result as coreHttp.RestResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Get complex types with dictionary property which is empty
   * @param options The options parameters.
   */
  async getEmpty(
    options?: coreHttp.OperationOptions
  ): Promise<DictionaryGetEmptyResponse> {
    const { span, updatedOptions } = createSpan(
      "BodyComplexWithTracing-getEmpty",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getEmptyOperationSpec
      );
      return result as DictionaryGetEmptyResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Put complex types with dictionary property which is empty
   * @param complexBody Please put an empty dictionary
   * @param options The options parameters.
   */
  async putEmpty(
    complexBody: DictionaryWrapper,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan(
      "BodyComplexWithTracing-putEmpty",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      complexBody,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        putEmptyOperationSpec
      );
      return result as coreHttp.RestResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Get complex types with dictionary property which is null
   * @param options The options parameters.
   */
  async getNull(
    options?: coreHttp.OperationOptions
  ): Promise<DictionaryGetNullResponse> {
    const { span, updatedOptions } = createSpan(
      "BodyComplexWithTracing-getNull",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getNullOperationSpec
      );
      return result as DictionaryGetNullResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Get complex types with dictionary property while server doesn't provide a response payload
   * @param options The options parameters.
   */
  async getNotProvided(
    options?: coreHttp.OperationOptions
  ): Promise<DictionaryGetNotProvidedResponse> {
    const { span, updatedOptions } = createSpan(
      "BodyComplexWithTracing-getNotProvided",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getNotProvidedOperationSpec
      );
      return result as DictionaryGetNotProvidedResponse;
    } catch (error) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

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
  headerParameters: [Parameters.accept],
  serializer
};
const putValidOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/dictionary/typed/valid",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody13,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
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
  headerParameters: [Parameters.accept],
  serializer
};
const putEmptyOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/dictionary/typed/empty",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody13,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
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
  headerParameters: [Parameters.accept],
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
  headerParameters: [Parameters.accept],
  serializer
};
