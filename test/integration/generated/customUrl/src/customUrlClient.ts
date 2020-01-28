/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Parameters from "./models/parameters";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import { CustomUrlClientContext } from "./customUrlClientContext";

class CustomUrlClient extends CustomUrlClientContext {
  /**
   * Get a 200 to test a valid base uri
   * @param accountName Account Name
   * @param options The options parameters.
   */
  getEmpty(
    accountName: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.sendOperationRequest(
      { accountName, options },
      getEmptyOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Initializes a new instance of the CustomUrlClient class.
   * @param options The parameter options
   */
  constructor(options?: any) {
    super(options);
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers);

const getEmptyOperationSpec: coreHttp.OperationSpec = {
  path: "/customuri",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.accountName, Parameters.host],
  serializer
};

// Operation Specifications

export {
  CustomUrlClient,
  CustomUrlClientContext,
  Models as CustomUrlModels,
  Mappers as CustomUrlMappers
};
