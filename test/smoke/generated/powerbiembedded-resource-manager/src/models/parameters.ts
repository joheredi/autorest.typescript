/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";

export const $host: coreHttp.OperationURLParameter = {
  parameterPath: "$host",
  mapper: {
    serializedName: "$host",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const subscriptionId: coreHttp.OperationURLParameter = {
  parameterPath: "subscriptionId",
  mapper: {
    serializedName: "subscriptionId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const resourceGroupName: coreHttp.OperationURLParameter = {
  parameterPath: "resourceGroupName",
  mapper: {
    serializedName: "resourceGroupName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const workspaceCollectionName: coreHttp.OperationURLParameter = {
  parameterPath: "workspaceCollectionName",
  mapper: {
    serializedName: "workspaceCollectionName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const apiVersion: coreHttp.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2016-01-29",
    serializedName: "api-version",
    isConstant: true,
    type: {
      name: "String"
    }
  }
};

export const contentType: coreHttp.OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json",
    serializedName: "Content-Type",
    isConstant: true,
    type: {
      name: "String"
    }
  }
};

export const body: coreHttp.OperationParameter = {
  parameterPath: "body",
  mapper: Mappers.CreateWorkspaceCollectionRequest
};

export const body1: coreHttp.OperationParameter = {
  parameterPath: "body",
  mapper: Mappers.UpdateWorkspaceCollectionRequest
};

export const body2: coreHttp.OperationParameter = {
  parameterPath: "body",
  mapper: Mappers.CheckNameRequest
};

export const location: coreHttp.OperationURLParameter = {
  parameterPath: "location",
  mapper: {
    serializedName: "location",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const body3: coreHttp.OperationParameter = {
  parameterPath: "body",
  mapper: Mappers.WorkspaceCollectionAccessKey
};

export const body4: coreHttp.OperationParameter = {
  parameterPath: "body",
  mapper: Mappers.MigrateWorkspaceCollectionRequest
};
