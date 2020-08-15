/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Parameters from "./models/parameters";
import { NoMappersClientContext } from "./noMappersClientContext";
import {
  NoMappersClientOptionalParams,
  Enum0,
  NoMappersClientApiV1ValueGetResponse
} from "./models";

export class NoMappersClient extends NoMappersClientContext {
  /**
   * Initializes a new instance of the NoMappersClient class.
   * @param $host server parameter
   * @param apiVersion
   * @param options The parameter options
   */
  constructor(
    $host: string,
    apiVersion: Enum0,
    options?: NoMappersClientOptionalParams
  ) {
    super($host, apiVersion, options);
  }

  /**
   * @param options The options parameters.
   */
  apiV1ValueGet(
    options?: coreHttp.OperationOptions
  ): Promise<NoMappersClientApiV1ValueGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { options: operationOptions },
      apiV1ValueGetOperationSpec
    ) as Promise<NoMappersClientApiV1ValueGetResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer({}, /* isXml */ false);

const apiV1ValueGetOperationSpec: coreHttp.OperationSpec = {
  path: "/api/v1/value",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" } }
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept, Parameters.apiVersion],
  serializer
};
