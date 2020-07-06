/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Mappers from "../mappers";
import * as Parameters from "../models/parameters";
import { CustomUrlClient } from "../customUrlClient";

/**
 * Class representing a Paths.
 */
export class Paths {
  private readonly client: CustomUrlClient;

  /**
   * Initialize a new instance of the class Paths class.
   * @param client Reference to the service client
   */
  constructor(client: CustomUrlClient) {
    this.client = client;
  }

  /**
   * Get a 200 to test a valid base uri
   * @param accountName Account Name
   * @param options The options parameters.
   */
  getEmpty(
    accountName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { accountName, options: operationOptions },
      getEmptyOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getEmptyOperationSpec: coreHttp.OperationSpec = {
  path: "/customuri",
  httpMethod: "GET",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.accountName, Parameters.host],
  serializer
};
