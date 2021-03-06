/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Parameters from "../models/parameters";
import { UuidClient } from "../uuidClient";
import { GetUuidResponse } from "../models";

/**
 * Class representing a Get.
 */
export class Get {
  private readonly client: UuidClient;

  /**
   * Initialize a new instance of the class Get class.
   * @param client Reference to the service client
   */
  constructor(client: UuidClient) {
    this.client = client;
  }

  /**
   * @param testUuid
   * @param options The options parameters.
   */
  uuid(
    testUuid: string,
    options?: coreHttp.OperationOptions
  ): Promise<GetUuidResponse> {
    const operationArguments: coreHttp.OperationArguments = {
      testUuid,
      options: coreHttp.operationOptionsToRequestOptionsBase(options || {})
    };
    return this.client.sendOperationRequest(
      operationArguments,
      uuidOperationSpec
    ) as Promise<GetUuidResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer({}, /* isXml */ false);

const uuidOperationSpec: coreHttp.OperationSpec = {
  path: "/Uuid",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" } }
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept, Parameters.testUuid],
  serializer
};
