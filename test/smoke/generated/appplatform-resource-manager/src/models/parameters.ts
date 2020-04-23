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
    defaultValue: "2019-05-01-preview",
    serializedName: "api-version",
    isConstant: true,
    type: {
      name: "String"
    }
  }
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

export const serviceName: coreHttp.OperationURLParameter = {
  parameterPath: "serviceName",
  mapper: {
    serializedName: "serviceName",
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

export const resource: coreHttp.OperationParameter = {
  parameterPath: "resource",
  mapper: Mappers.ServiceResource
};

export const resource1: coreHttp.OperationParameter = {
  parameterPath: "resource",
  mapper: Mappers.ServiceResource
};

export const regenerateTestKeyRequest: coreHttp.OperationParameter = {
  parameterPath: "regenerateTestKeyRequest",
  mapper: Mappers.RegenerateTestKeyRequestPayload
};

export const availabilityParameters: coreHttp.OperationParameter = {
  parameterPath: "availabilityParameters",
  mapper: Mappers.NameAvailabilityParameters
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

export const nextLink1: coreHttp.OperationURLParameter = {
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

export const appName: coreHttp.OperationURLParameter = {
  parameterPath: "appName",
  mapper: {
    serializedName: "appName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const syncStatus: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "syncStatus"],
  mapper: {
    serializedName: "syncStatus",
    type: {
      name: "String"
    }
  }
};

export const appResource: coreHttp.OperationParameter = {
  parameterPath: "appResource",
  mapper: Mappers.AppResource
};

export const appResource1: coreHttp.OperationParameter = {
  parameterPath: "appResource",
  mapper: Mappers.AppResource
};

export const bindingName: coreHttp.OperationURLParameter = {
  parameterPath: "bindingName",
  mapper: {
    serializedName: "bindingName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const bindingResource: coreHttp.OperationParameter = {
  parameterPath: "bindingResource",
  mapper: Mappers.BindingResource
};

export const bindingResource1: coreHttp.OperationParameter = {
  parameterPath: "bindingResource",
  mapper: Mappers.BindingResource
};

export const deploymentName: coreHttp.OperationURLParameter = {
  parameterPath: "deploymentName",
  mapper: {
    serializedName: "deploymentName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const deploymentResource: coreHttp.OperationParameter = {
  parameterPath: "deploymentResource",
  mapper: Mappers.DeploymentResource
};

export const deploymentResource1: coreHttp.OperationParameter = {
  parameterPath: "deploymentResource",
  mapper: Mappers.DeploymentResource
};

export const version: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "version"],
  mapper: {
    serializedName: "version",
    type: {
      name: "Sequence",
      element: { type: { name: "String" }, serializedName: "Get5ItemsItem" }
    }
  },
  collectionFormat: coreHttp.QueryCollectionFormat.Csv
};

export const version1: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "version"],
  mapper: {
    serializedName: "version",
    type: {
      name: "Sequence",
      element: { type: { name: "String" }, serializedName: "Get4ItemsItem" }
    }
  },
  collectionFormat: coreHttp.QueryCollectionFormat.Csv
};

export const nextLink2: coreHttp.OperationURLParameter = {
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
