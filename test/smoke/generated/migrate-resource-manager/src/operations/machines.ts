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
import { AzureMigrate } from "../azureMigrate";
import { MachinesListByProjectResponse, MachinesGetResponse } from "../models";

/**
 * Class representing a Machines.
 */
export class Machines {
  private readonly client: AzureMigrate;

  /**
   * Initialize a new instance of the class Machines class.
   * @param client Reference to the service client
   */
  constructor(client: AzureMigrate) {
    this.client = client;
  }

  /**
   * Get data of all the machines available in the project. Returns a json array of objects of type
   * 'machine' defined in Models section.
   * @param resourceGroupName Name of the Azure Resource Group that project is part of.
   * @param projectName Name of the Azure Migrate project.
   * @param options The options parameters.
   */
  listByProject(
    resourceGroupName: string,
    projectName: string,
    options?: coreHttp.OperationOptions
  ): Promise<MachinesListByProjectResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, projectName, options: operationOptions },
      listByProjectOperationSpec
    ) as Promise<MachinesListByProjectResponse>;
  }

  /**
   * Get the machine with the specified name. Returns a json object of type 'machine' defined in Models
   * section.
   * @param resourceGroupName Name of the Azure Resource Group that project is part of.
   * @param projectName Name of the Azure Migrate project.
   * @param machineName Unique name of a machine in private datacenter.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    projectName: string,
    machineName: string,
    options?: coreHttp.OperationOptions
  ): Promise<MachinesGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        projectName,
        machineName,
        options: operationOptions
      },
      getOperationSpec
    ) as Promise<MachinesGetResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const listByProjectOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/projects/{projectName}/machines",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.MachineResultList,
      headersMapper: Mappers.MachinesListByProjectHeaders
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.projectName
  ],
  headerParameters: [Parameters.acceptLanguage],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/projects/{projectName}/machines/{machineName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Machine,
      headersMapper: Mappers.MachinesGetHeaders
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.projectName,
    Parameters.machineName
  ],
  headerParameters: [Parameters.acceptLanguage],
  serializer
};
