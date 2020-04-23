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

export const apiVersion: coreHttp.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2019-01-01",
    serializedName: "api-version",
    isConstant: true,
    type: {
      name: "String"
    }
  }
};

export const nextLink: coreHttp.OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextLink",
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

export const planId: coreHttp.OperationURLParameter = {
  parameterPath: "planId",
  mapper: {
    serializedName: "planId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const operationId: coreHttp.OperationURLParameter = {
  parameterPath: "operationId",
  mapper: {
    serializedName: "operationId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const fileContainerId: coreHttp.OperationURLParameter = {
  parameterPath: "fileContainerId",
  mapper: {
    serializedName: "fileContainerId",
    required: true,
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

export const fileContainerParameters: coreHttp.OperationParameter = {
  parameterPath: "fileContainerParameters",
  mapper: Mappers.FileContainerParameters
};

export const productId: coreHttp.OperationURLParameter = {
  parameterPath: "productId",
  mapper: {
    serializedName: "productId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const bootstrapActionParameter: coreHttp.OperationParameter = {
  parameterPath: "bootstrapActionParameter",
  mapper: Mappers.BootStrapActionParameters
};

export const deployActionParameter: coreHttp.OperationParameter = {
  parameterPath: "deployActionParameter",
  mapper: Mappers.DeployActionParameters
};

export const unlockActionParameter: coreHttp.OperationParameter = {
  parameterPath: "unlockActionParameter",
  mapper: Mappers.UnlockActionParameters
};

export const secretName: coreHttp.OperationURLParameter = {
  parameterPath: "secretName",
  mapper: {
    serializedName: "secretName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const secretParameters: coreHttp.OperationParameter = {
  parameterPath: "secretParameters",
  mapper: Mappers.SecretParameters
};
