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
import {
  EmailTemplateListByServiceOptionalParams,
  EmailTemplateListByServiceResponse,
  TemplateName,
  EmailTemplateGetEntityTagResponse,
  EmailTemplateGetResponse,
  EmailTemplateUpdateParameters,
  EmailTemplateCreateOrUpdateOptionalParams,
  EmailTemplateCreateOrUpdateResponse,
  EmailTemplateListByServiceNextOptionalParams,
  EmailTemplateListByServiceNextResponse
} from "../models";

/**
 * Class representing a EmailTemplate.
 */
export class EmailTemplate {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class EmailTemplate class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Lists a collection of properties defined within a service instance.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param options The options parameters.
   */
  listByService(
    resourceGroupName: string,
    serviceName: string,
    options?: EmailTemplateListByServiceOptionalParams
  ): Promise<EmailTemplateListByServiceResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, options: operationOptions },
      listByServiceOperationSpec
    ) as Promise<EmailTemplateListByServiceResponse>;
  }

  /**
   * Gets the entity state (Etag) version of the email template specified by its identifier.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param templateName Email Template Name Identifier.
   * @param options The options parameters.
   */
  getEntityTag(
    resourceGroupName: string,
    serviceName: string,
    templateName: TemplateName,
    options?: coreHttp.OperationOptions
  ): Promise<EmailTemplateGetEntityTagResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        templateName,
        options: operationOptions
      },
      getEntityTagOperationSpec
    ) as Promise<EmailTemplateGetEntityTagResponse>;
  }

  /**
   * Gets the details of the email template specified by its identifier.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param templateName Email Template Name Identifier.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    templateName: TemplateName,
    options?: coreHttp.OperationOptions
  ): Promise<EmailTemplateGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        templateName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<EmailTemplateGetResponse>;
  }

  /**
   * Updates an Email Template.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param templateName Email Template Name Identifier.
   * @param parameters Email Template update parameters.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    templateName: TemplateName,
    parameters: EmailTemplateUpdateParameters,
    options?: EmailTemplateCreateOrUpdateOptionalParams
  ): Promise<EmailTemplateCreateOrUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        templateName,
        parameters,
        options: operationOptions
      },
      createOrUpdateOperationSpec
    ) as Promise<EmailTemplateCreateOrUpdateResponse>;
  }

  /**
   * Updates the specific Email Template.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param templateName Email Template Name Identifier.
   * @param parameters Update parameters.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    serviceName: string,
    ifMatch: string,
    templateName: TemplateName,
    parameters: EmailTemplateUpdateParameters,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        ifMatch,
        templateName,
        parameters,
        options: operationOptions
      },
      updateOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Reset the Email Template to default template provided by the API Management service instance.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param templateName Email Template Name Identifier.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serviceName: string,
    ifMatch: string,
    templateName: TemplateName,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        ifMatch,
        templateName,
        options: operationOptions
      },
      deleteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * ListByServiceNext
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param nextLink The nextLink from the previous successful call to the ListByService method.
   * @param options The options parameters.
   */
  listByServiceNext(
    resourceGroupName: string,
    serviceName: string,
    nextLink: string,
    options?: EmailTemplateListByServiceNextOptionalParams
  ): Promise<EmailTemplateListByServiceNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, nextLink, options: operationOptions },
      listByServiceNextOperationSpec
    ) as Promise<EmailTemplateListByServiceNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listByServiceOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/templates",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EmailTemplateCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.top,
    Parameters.skip,
    Parameters.apiVersion,
    Parameters.filter9
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId
  ],
  serializer
};
const getEntityTagOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/templates/{templateName}",
  httpMethod: "HEAD",
  responses: {
    200: {
      headersMapper: Mappers.EmailTemplateGetEntityTagHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.templateName
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/templates/{templateName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EmailTemplateContract,
      headersMapper: Mappers.EmailTemplateGetHeaders
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.templateName
  ],
  serializer
};
const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/templates/{templateName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.EmailTemplateContract
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters33,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.templateName
  ],
  headerParameters: [Parameters.contentType, Parameters.ifMatch],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/templates/{templateName}",
  httpMethod: "PATCH",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  requestBody: Parameters.parameters34,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.templateName
  ],
  headerParameters: [Parameters.contentType, Parameters.ifMatch1],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/templates/{templateName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.templateName
  ],
  headerParameters: [Parameters.ifMatch1],
  serializer
};
const listByServiceNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.EmailTemplateCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [
    Parameters.top,
    Parameters.skip,
    Parameters.apiVersion,
    Parameters.filter9
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  serializer
};
