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
import { CustomUrlMoreOptionsClient } from "../customUrlMoreOptionsClient";
import { PathsGetEmptyOptionalParams } from "../models";

/**
 * Class representing a Paths.
 */
export class Paths {
  private readonly client: CustomUrlMoreOptionsClient;

  /**
   * Initialize a new instance of the class Paths class.
   * @param client Reference to the service client
   */
  constructor(client: CustomUrlMoreOptionsClient) {
    this.client = client;
  }

  /**
   * Get a 200 to test a valid base uri
   * @param vault The vault name, e.g. https://myvault
   * @param secret Secret value.
   * @param keyName The key name with value 'key1'.
   * @param options The options parameters.
   */
  getEmpty(
    vault: string,
    secret: string,
    keyName: string,
    options?: PathsGetEmptyOptionalParams
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { vault, secret, keyName, options: operationOptions },
      getEmptyOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getEmptyOperationSpec: coreHttp.OperationSpec = {
  path: "/customuri/{subscriptionId}/{keyName}",
  httpMethod: "GET",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  queryParameters: [Parameters.keyVersion],
  urlParameters: [
    Parameters.vault,
    Parameters.secret,
    Parameters.dnsSuffix,
    Parameters.keyName,
    Parameters.subscriptionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
