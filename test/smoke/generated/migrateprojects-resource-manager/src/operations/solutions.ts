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
import { AzureMigrateHub } from "../azureMigrateHub";
import {
  SolutionsGetSolutionResponse,
  Solution,
  SolutionsPutSolutionResponse,
  SolutionsPatchSolutionResponse,
  SolutionsEnumerateSolutionsResponse,
  SolutionsGetConfigResponse
} from "../models";

/**
 * Class representing a Solutions.
 */
export class Solutions {
  private readonly client: AzureMigrateHub;

  /**
   * Initialize a new instance of the class Solutions class.
   * @param client Reference to the service client
   */
  constructor(client: AzureMigrateHub) {
    this.client = client;
  }

  /**
   * Gets a solution in the migrate project.
   * @param resourceGroupName Name of the Azure Resource Group that migrate project is part of.
   * @param migrateProjectName Name of the Azure Migrate project.
   * @param solutionName Unique name of a migration solution within a migrate project.
   * @param options The options parameters.
   */
  getSolution(
    resourceGroupName: string,
    migrateProjectName: string,
    solutionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<SolutionsGetSolutionResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        migrateProjectName,
        solutionName,
        options: operationOptions
      },
      getSolutionOperationSpec
    ) as Promise<SolutionsGetSolutionResponse>;
  }

  /**
   * Creates a solution in the migrate project.
   * @param resourceGroupName Name of the Azure Resource Group that migrate project is part of.
   * @param migrateProjectName Name of the Azure Migrate project.
   * @param solutionName Unique name of a migration solution within a migrate project.
   * @param solutionInput The input for the solution.
   * @param options The options parameters.
   */
  putSolution(
    resourceGroupName: string,
    migrateProjectName: string,
    solutionName: string,
    solutionInput: Solution,
    options?: coreHttp.OperationOptions
  ): Promise<SolutionsPutSolutionResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        migrateProjectName,
        solutionName,
        solutionInput,
        options: operationOptions
      },
      putSolutionOperationSpec
    ) as Promise<SolutionsPutSolutionResponse>;
  }

  /**
   * Update a solution with specified name. Supports partial updates, for example only tags can be
   * provided.
   * @param resourceGroupName Name of the Azure Resource Group that migrate project is part of.
   * @param migrateProjectName Name of the Azure Migrate project.
   * @param solutionName Unique name of a migration solution within a migrate project.
   * @param solutionInput The input for the solution.
   * @param options The options parameters.
   */
  patchSolution(
    resourceGroupName: string,
    migrateProjectName: string,
    solutionName: string,
    solutionInput: Solution,
    options?: coreHttp.OperationOptions
  ): Promise<SolutionsPatchSolutionResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        migrateProjectName,
        solutionName,
        solutionInput,
        options: operationOptions
      },
      patchSolutionOperationSpec
    ) as Promise<SolutionsPatchSolutionResponse>;
  }

  /**
   * Delete the solution. Deleting non-existent project is a no-operation.
   * @param resourceGroupName Name of the Azure Resource Group that migrate project is part of.
   * @param migrateProjectName Name of the Azure Migrate project.
   * @param solutionName Unique name of a migration solution within a migrate project.
   * @param options The options parameters.
   */
  deleteSolution(
    resourceGroupName: string,
    migrateProjectName: string,
    solutionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        migrateProjectName,
        solutionName,
        options: operationOptions
      },
      deleteSolutionOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Gets the list of solutions in the migrate project.
   * @param resourceGroupName Name of the Azure Resource Group that migrate project is part of.
   * @param migrateProjectName Name of the Azure Migrate project.
   * @param options The options parameters.
   */
  enumerateSolutions(
    resourceGroupName: string,
    migrateProjectName: string,
    options?: coreHttp.OperationOptions
  ): Promise<SolutionsEnumerateSolutionsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { resourceGroupName, migrateProjectName, options: operationOptions },
      enumerateSolutionsOperationSpec
    ) as Promise<SolutionsEnumerateSolutionsResponse>;
  }

  /**
   * Gets the config for the solution in the migrate project.
   * @param resourceGroupName Name of the Azure Resource Group that migrate project is part of.
   * @param migrateProjectName Name of the Azure Migrate project.
   * @param solutionName Unique name of a migration solution within a migrate project.
   * @param options The options parameters.
   */
  getConfig(
    resourceGroupName: string,
    migrateProjectName: string,
    solutionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<SolutionsGetConfigResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        migrateProjectName,
        solutionName,
        options: operationOptions
      },
      getConfigOperationSpec
    ) as Promise<SolutionsGetConfigResponse>;
  }

  /**
   * Cleanup the solution data in the migrate project.
   * @param resourceGroupName Name of the Azure Resource Group that migrate project is part of.
   * @param migrateProjectName Name of the Azure Migrate project.
   * @param solutionName Unique name of a migration solution within a migrate project.
   * @param options The options parameters.
   */
  cleanupSolutionData(
    resourceGroupName: string,
    migrateProjectName: string,
    solutionName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        migrateProjectName,
        solutionName,
        options: operationOptions
      },
      cleanupSolutionDataOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getSolutionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/solutions/{solutionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Solution
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.migrateProjectName,
    Parameters.solutionName
  ],
  serializer
};
const putSolutionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/solutions/{solutionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Solution
    }
  },
  requestBody: Parameters.solutionInput,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.migrateProjectName,
    Parameters.solutionName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const patchSolutionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/solutions/{solutionName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.Solution
    }
  },
  requestBody: Parameters.solutionInput,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.migrateProjectName,
    Parameters.solutionName
  ],
  headerParameters: [Parameters.contentType],
  serializer
};
const deleteSolutionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/solutions/{solutionName}",
  httpMethod: "DELETE",
  responses: { 200: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.migrateProjectName,
    Parameters.solutionName
  ],
  headerParameters: [Parameters.acceptLanguage],
  serializer
};
const enumerateSolutionsOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/solutions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SolutionsCollection
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.migrateProjectName
  ],
  serializer
};
const getConfigOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/solutions/{solutionName}/getConfig",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SolutionConfig
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.migrateProjectName,
    Parameters.solutionName
  ],
  serializer
};
const cleanupSolutionDataOperationSpec: coreHttp.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/migrateProjects/{migrateProjectName}/solutions/{solutionName}/cleanupData",
  httpMethod: "POST",
  responses: { 200: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.migrateProjectName,
    Parameters.solutionName
  ],
  serializer
};
