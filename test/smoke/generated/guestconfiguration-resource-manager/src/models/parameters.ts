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
  mapper: Mappers.GuestConfigurationAssignment
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

export const guestConfigurationAssignmentName: coreHttp.OperationURLParameter = {
  parameterPath: "guestConfigurationAssignmentName",
  mapper: {
    serializedName: "guestConfigurationAssignmentName",
    required: true,
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
    constraints: {
      Pattern: new RegExp("^[-w._]+$")
    },
    serializedName: "resourceGroupName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const vmName: coreHttp.OperationURLParameter = {
  parameterPath: "vmName",
  mapper: {
    serializedName: "vmName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const apiVersion: coreHttp.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2018-11-20",
    serializedName: "api-version",
    isConstant: true,
    type: {
      name: "String"
    }
  }
};

export const guestConfigurationAssignmentName1: coreHttp.OperationURLParameter = {
  parameterPath: "guestConfigurationAssignmentName",
  mapper: {
    serializedName: "guestConfigurationAssignmentName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const guestConfigurationAssignmentName2: coreHttp.OperationURLParameter = {
  parameterPath: "guestConfigurationAssignmentName",
  mapper: {
    serializedName: "guestConfigurationAssignmentName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const reportId: coreHttp.OperationURLParameter = {
  parameterPath: "reportId",
  mapper: {
    serializedName: "reportId",
    required: true,
    type: {
      name: "String"
    }
  }
};
