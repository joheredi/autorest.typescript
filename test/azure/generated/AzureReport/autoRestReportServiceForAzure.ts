/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as Parameters from "./models/parameters";
import { AutoRestReportServiceForAzureContext } from "./autoRestReportServiceForAzureContext";


class AutoRestReportServiceForAzure extends AutoRestReportServiceForAzureContext {
  /**
   * Initializes a new instance of the AutoRestReportServiceForAzure class.
   * @param credentials Credentials needed for the client to connect to Azure.
   * @param [options] The parameter options
   */
  constructor(credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials, options?: Models.AutoRestReportServiceForAzureOptions) {
    super(credentials, options);
  }

  /**
   * Get test coverage report
   * @param [options] The optional parameters
   * @returns Promise<Models.GetReportResponse>
   */
  getReport(options?: Models.AutoRestReportServiceForAzureGetReportOptionalParams): Promise<Models.GetReportResponse>;
  /**
   * @param callback The callback
   */
  getReport(callback: coreHttp.ServiceCallback<{ [propertyName: string]: number }>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getReport(options: Models.AutoRestReportServiceForAzureGetReportOptionalParams, callback: coreHttp.ServiceCallback<{ [propertyName: string]: number }>): void;
  getReport(options?: Models.AutoRestReportServiceForAzureGetReportOptionalParams | coreHttp.ServiceCallback<{ [propertyName: string]: number }>, callback?: coreHttp.ServiceCallback<{ [propertyName: string]: number }>): Promise<Models.GetReportResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      getReportOperationSpec,
      callback) as Promise<Models.GetReportResponse>;
  }
}

// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers);
const getReportOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "report/azure",
  queryParameters: [
    Parameters.qualifier
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Dictionary",
          value: {
            type: {
              name: "Number"
            }
          }
        }
      }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

export {
  AutoRestReportServiceForAzure,
  AutoRestReportServiceForAzureContext,
  Models as AutoRestReportServiceForAzureModels,
  Mappers as AutoRestReportServiceForAzureMappers
};