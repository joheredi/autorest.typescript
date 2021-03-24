/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { CanonicalCode } from "@opentelemetry/api";
import { createSpan } from "../tracing";
import { Flattencomplex } from "../operationsInterfaces";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { BodyComplexWithTracingContext } from "../bodyComplexWithTracingContext";
import { FlattencomplexGetValidResponse } from "../models";

/** Class representing a Flattencomplex. */
export class FlattencomplexImpl implements Flattencomplex {
  private readonly client: BodyComplexWithTracingContext;

  /**
   * Initialize a new instance of the class Flattencomplex class.
   * @param client Reference to the service client
   */
  constructor(client: BodyComplexWithTracingContext) {
    this.client = client;
  }

  /** @param options The options parameters. */
  async getValid(
    options?: coreHttp.OperationOptions
  ): Promise<FlattencomplexGetValidResponse> {
    const { span, updatedOptions } = createSpan(
      "BodyComplexWithTracing-getValid",
      options || {}
    );
    const operationArguments: coreHttp.OperationArguments = {
      options: coreHttp.operationOptionsToRequestOptionsBase(
        updatedOptions || {}
      )
    };
    try {
      const result = await this.client.sendOperationRequest(
        operationArguments,
        getValidOperationSpec
      );
      return result as FlattencomplexGetValidResponse;
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
  path: "/complex/flatten/valid",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MyBaseType
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
