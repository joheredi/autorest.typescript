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

export const apiVersion: coreHttp.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2015-06-15",
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

export const filter: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "filter"],
  mapper: {
    serializedName: "$filter",
    type: {
      name: "String"
    }
  }
};

export const orderBy: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "orderBy"],
  mapper: {
    serializedName: "$orderBy",
    type: {
      name: "String"
    }
  }
};

export const top: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "top"],
  mapper: {
    serializedName: "$top",
    type: {
      name: "String"
    }
  }
};

export const skip: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "skip"],
  mapper: {
    serializedName: "$skip",
    type: {
      name: "String"
    }
  }
};

export const inlineCount: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "inlineCount"],
  mapper: {
    serializedName: "$inlineCount",
    type: {
      name: "String"
    }
  }
};

export const resourceName: coreHttp.OperationURLParameter = {
  parameterPath: "resourceName",
  mapper: {
    serializedName: "resourceName",
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

export const quota: coreHttp.OperationParameter = {
  parameterPath: "quota",
  mapper: Mappers.Quota
};
