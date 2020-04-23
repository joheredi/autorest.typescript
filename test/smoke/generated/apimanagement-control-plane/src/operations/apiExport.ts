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
import { ApiManagementClient } from "../apiManagementClient";
import { ExportFormat, ApiExportGetResponse } from "../models";

/**
 * Class representing a ApiExport.
 */
export class ApiExport {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class ApiExport class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Gets the details of the API specified by its identifier in the format specified to the Storage Blob
   * with SAS Key valid for 5 minutes.
   * @param apimBaseUrl The management endpoint of the API Management service, for example
   *                    https://myapimservice.management.azure-api.net.
   * @param apiId API identifier. Must be unique in the current API Management service instance.
   * @param accept Format in which to export the Api Details to the Storage Blob with Sas Key valid for 5
   *               minutes.
   * @param options The options parameters.
   */
  get(
    apimBaseUrl: string,
    apiId: string,
    accept: ExportFormat,
    options?: coreHttp.OperationOptions
  ): Promise<ApiExportGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { apimBaseUrl, apiId, accept, options: operationOptions },
      getOperationSpec
    ) as Promise<ApiExportGetResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getOperationSpec: coreHttp.OperationSpec = {
  path: "/apis/{apiId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ApiExportResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.exportModel],
  urlParameters: [Parameters.apimBaseUrl, Parameters.apiId],
  headerParameters: [Parameters.accept],
  serializer
};
