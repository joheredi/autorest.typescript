/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";

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

export const parameters: coreHttp.OperationParameter = {
  parameterPath: "parameters",
  mapper: Mappers.CheckNameAvailabilityParameters
};

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

export const locationName: coreHttp.OperationURLParameter = {
  parameterPath: "locationName",
  mapper: {
    serializedName: "locationName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const apiVersion: coreHttp.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2018-02-02",
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

export const locationName1: coreHttp.OperationURLParameter = {
  parameterPath: "locationName",
  mapper: {
    serializedName: "locationName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const acceptLanguage: coreHttp.OperationParameter = {
  parameterPath: "acceptLanguage",
  mapper: {
    serializedName: "Accept-Language",
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

export const projectName: coreHttp.OperationURLParameter = {
  parameterPath: "projectName",
  mapper: {
    serializedName: "projectName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const project: coreHttp.OperationParameter = {
  parameterPath: ["options", "project"],
  mapper: Mappers.Project
};

export const project1: coreHttp.OperationParameter = {
  parameterPath: ["options", "project"],
  mapper: Mappers.Project
};

export const machineName: coreHttp.OperationURLParameter = {
  parameterPath: "machineName",
  mapper: {
    serializedName: "machineName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const groupName: coreHttp.OperationURLParameter = {
  parameterPath: "groupName",
  mapper: {
    serializedName: "groupName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const group: coreHttp.OperationParameter = {
  parameterPath: ["options", "group"],
  mapper: Mappers.Group
};

export const assessmentName: coreHttp.OperationURLParameter = {
  parameterPath: "assessmentName",
  mapper: {
    serializedName: "assessmentName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const assessment: coreHttp.OperationParameter = {
  parameterPath: ["options", "assessment"],
  mapper: Mappers.Assessment
};

export const assessedMachineName: coreHttp.OperationURLParameter = {
  parameterPath: "assessedMachineName",
  mapper: {
    serializedName: "assessedMachineName",
    required: true,
    type: {
      name: "String"
    }
  }
};
