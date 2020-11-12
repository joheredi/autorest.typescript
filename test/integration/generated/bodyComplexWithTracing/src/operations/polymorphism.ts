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
  PolymorphismGetValidResponse,
  FishUnion,
  PolymorphismGetDotSyntaxResponse,
  PolymorphismGetComposedWithDiscriminatorResponse,
  PolymorphismGetComposedWithoutDiscriminatorResponse,
  PolymorphismGetComplicatedResponse,
  SalmonUnion,
  PolymorphismPutMissingDiscriminatorResponse
} from "../models";

/**
 * Class representing a Polymorphism.
 */
export class Polymorphism {
  private readonly client: BodyComplexWithTracing;

  /**
   * Initialize a new instance of the class Polymorphism class.
   * @param client Reference to the service client
   */
  constructor(client: BodyComplexWithTracing) {
    this.client = client;
  }

  /**
   * Get complex types that are polymorphic
   * @param options The options parameters.
   */
  async getValid(
    options?: coreHttp.OperationOptions
  ): Promise<PolymorphismGetValidResponse> {
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
      return result as PolymorphismGetValidResponse;
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
   * Put complex types that are polymorphic
   * @param complexBody Please put a salmon that looks like this:
   *                    {
   *                            'fishtype':'Salmon',
   *                            'location':'alaska',
   *                            'iswild':true,
   *                            'species':'king',
   *                            'length':1.0,
   *                            'siblings':[
   *                              {
   *                                'fishtype':'Shark',
   *                                'age':6,
   *                                'birthday': '2012-01-05T01:00:00Z',
   *                                'length':20.0,
   *                                'species':'predator',
   *                              },
   *                              {
   *                                'fishtype':'Sawshark',
   *                                'age':105,
   *                                'birthday': '1900-01-05T01:00:00Z',
   *                                'length':10.0,
   *                                'picture': new Buffer([255, 255, 255, 255, 254]).toString('base64'),
   *                                'species':'dangerous',
   *                              },
   *                              {
   *                                'fishtype': 'goblin',
   *                                'age': 1,
   *                                'birthday': '2015-08-08T00:00:00Z',
   *                                'length': 30.0,
   *                                'species': 'scary',
   *                                'jawsize': 5
   *                              }
   *                            ]
   *                          };
   * @param options The options parameters.
   */
  async putValid(
    complexBody: FishUnion,
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
   * Get complex types that are polymorphic, JSON key contains a dot
   * @param options The options parameters.
   */
  async getDotSyntax(
    options?: coreHttp.OperationOptions
  ): Promise<PolymorphismGetDotSyntaxResponse> {
    const { span, updatedOptions } = createSpan(
      "BodyComplexWithTracing-getDotSyntax",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getDotSyntaxOperationSpec
      );
      return result as PolymorphismGetDotSyntaxResponse;
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
   * Get complex object composing a polymorphic scalar property and array property with polymorphic
   * element type, with discriminator specified. Deserialization must NOT fail and use the discriminator
   * type specified on the wire.
   * @param options The options parameters.
   */
  async getComposedWithDiscriminator(
    options?: coreHttp.OperationOptions
  ): Promise<PolymorphismGetComposedWithDiscriminatorResponse> {
    const { span, updatedOptions } = createSpan(
      "BodyComplexWithTracing-getComposedWithDiscriminator",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getComposedWithDiscriminatorOperationSpec
      );
      return result as PolymorphismGetComposedWithDiscriminatorResponse;
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
   * Get complex object composing a polymorphic scalar property and array property with polymorphic
   * element type, without discriminator specified on wire. Deserialization must NOT fail and use the
   * explicit type of the property.
   * @param options The options parameters.
   */
  async getComposedWithoutDiscriminator(
    options?: coreHttp.OperationOptions
  ): Promise<PolymorphismGetComposedWithoutDiscriminatorResponse> {
    const { span, updatedOptions } = createSpan(
      "BodyComplexWithTracing-getComposedWithoutDiscriminator",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getComposedWithoutDiscriminatorOperationSpec
      );
      return result as PolymorphismGetComposedWithoutDiscriminatorResponse;
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
   * Get complex types that are polymorphic, but not at the root of the hierarchy; also have additional
   * properties
   * @param options The options parameters.
   */
  async getComplicated(
    options?: coreHttp.OperationOptions
  ): Promise<PolymorphismGetComplicatedResponse> {
    const { span, updatedOptions } = createSpan(
      "BodyComplexWithTracing-getComplicated",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getComplicatedOperationSpec
      );
      return result as PolymorphismGetComplicatedResponse;
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
   * Put complex types that are polymorphic, but not at the root of the hierarchy; also have additional
   * properties
   * @param complexBody
   * @param options The options parameters.
   */
  async putComplicated(
    complexBody: SalmonUnion,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan(
      "BodyComplexWithTracing-putComplicated",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      complexBody,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        putComplicatedOperationSpec
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
   * Put complex types that are polymorphic, omitting the discriminator
   * @param complexBody
   * @param options The options parameters.
   */
  async putMissingDiscriminator(
    complexBody: SalmonUnion,
    options?: coreHttp.OperationOptions
  ): Promise<PolymorphismPutMissingDiscriminatorResponse> {
    const { span, updatedOptions } = createSpan(
      "BodyComplexWithTracing-putMissingDiscriminator",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      complexBody,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        putMissingDiscriminatorOperationSpec
      );
      return result as PolymorphismPutMissingDiscriminatorResponse;
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
   * Put complex types that are polymorphic, attempting to omit required 'birthday' field - the request
   * should not be allowed from the client
   * @param complexBody Please attempt put a sawshark that looks like this, the client should not allow
   *                    this data to be sent:
   *                    {
   *                        "fishtype": "sawshark",
   *                        "species": "snaggle toothed",
   *                        "length": 18.5,
   *                        "age": 2,
   *                        "birthday": "2013-06-01T01:00:00Z",
   *                        "location": "alaska",
   *                        "picture": base64(FF FF FF FF FE),
   *                        "siblings": [
   *                            {
   *                                "fishtype": "shark",
   *                                "species": "predator",
   *                                "birthday": "2012-01-05T01:00:00Z",
   *                                "length": 20,
   *                                "age": 6
   *                            },
   *                            {
   *                                "fishtype": "sawshark",
   *                                "species": "dangerous",
   *                                "picture": base64(FF FF FF FF FE),
   *                                "length": 10,
   *                                "age": 105
   *                            }
   *                        ]
   *                    }
   * @param options The options parameters.
   */
  async putValidMissingRequired(
    complexBody: FishUnion,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const { span, updatedOptions } = createSpan(
      "BodyComplexWithTracing-putValidMissingRequired",
      coreHttp.operationOptionsToRequestOptionsBase(options || {})
    );
    const operationArguments: coreHttp.OperationArguments = {
      complexBody,
      options: updatedOptions
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        putValidMissingRequiredOperationSpec
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
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getValidOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/polymorphism/valid",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Fish
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
  path: "/complex/polymorphism/valid",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody15,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const getDotSyntaxOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/polymorphism/dotsyntax",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DotFish
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const getComposedWithDiscriminatorOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/polymorphism/composedWithDiscriminator",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DotFishMarket
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const getComposedWithoutDiscriminatorOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/polymorphism/composedWithoutDiscriminator",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DotFishMarket
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const getComplicatedOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/polymorphism/complicated",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Salmon
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const putComplicatedOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/polymorphism/complicated",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody16,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const putMissingDiscriminatorOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/polymorphism/missingdiscriminator",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Salmon
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody16,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const putValidMissingRequiredOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/polymorphism/missingrequired/invalid",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody15,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
