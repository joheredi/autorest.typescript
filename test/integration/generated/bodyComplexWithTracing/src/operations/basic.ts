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
  BasicGetValidResponse,
  Basic as BasicModel,
  BasicGetInvalidResponse,
  BasicGetEmptyResponse,
  BasicGetNullResponse,
  BasicGetNotProvidedResponse
} from "../models";

/**
 * Class representing a Basic.
 */
export class Basic {
  private readonly client: BodyComplexWithTracing;

  /**
   * Initialize a new instance of the class Basic class.
   * @param client Reference to the service client
   */
  constructor(client: BodyComplexWithTracing) {
    this.client = client;
  }

  /**
   * Get complex type {id: 2, name: 'abc', color: 'YELLOW'}
   * @param options The options parameters.
   */
  async getValid(
    options?: coreHttp.OperationOptions
  ): Promise<BasicGetValidResponse> {
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
      return result as BasicGetValidResponse;
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
   * Please put {id: 2, name: 'abc', color: 'Magenta'}
   * @param complexBody Please put {id: 2, name: 'abc', color: 'Magenta'}
   * @param options The options parameters.
   */
  async putValid(
    complexBody: BasicModel,
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
   * Get a basic complex type that is invalid for the local strong type
   * @param options The options parameters.
   */
  async getInvalid(
    options?: coreHttp.OperationOptions
  ): Promise<BasicGetInvalidResponse> {
    const { span, updatedOptions } = createSpan(
      "BodyComplexWithTracing-getInvalid",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getInvalidOperationSpec
      );
      return result as BasicGetInvalidResponse;
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
   * Get a basic complex type that is empty
   * @param options The options parameters.
   */
  async getEmpty(
    options?: coreHttp.OperationOptions
  ): Promise<BasicGetEmptyResponse> {
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
      return result as BasicGetEmptyResponse;
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
   * Get a basic complex type whose properties are null
   * @param options The options parameters.
   */
  async getNull(
    options?: coreHttp.OperationOptions
  ): Promise<BasicGetNullResponse> {
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
      return result as BasicGetNullResponse;
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
   * Get a basic complex type while the server doesn't provide a response payload
   * @param options The options parameters.
   */
  async getNotProvided(
    options?: coreHttp.OperationOptions
  ): Promise<BasicGetNotProvidedResponse> {
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
      return result as BasicGetNotProvidedResponse;
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
  path: "/complex/basic/valid",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Basic
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
  path: "/complex/basic/valid",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getInvalidOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/basic/invalid",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Basic
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const getEmptyOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/basic/empty",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Basic
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const getNullOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/basic/null",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Basic
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
  path: "/complex/basic/notprovided",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Basic
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
