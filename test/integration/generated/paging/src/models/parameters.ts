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

export const clientRequestId: coreHttp.OperationParameter = {
  parameterPath: ["options", "clientRequestId"],
  mapper: {
    serializedName: "client-request-id",
    type: {
      name: "String"
    }
  }
};

export const maxresults: coreHttp.OperationParameter = {
  parameterPath: ["options", "maxresults"],
  mapper: {
    serializedName: "maxresults",
    type: {
      name: "Number"
    }
  }
};

export const timeout: coreHttp.OperationParameter = {
  parameterPath: ["options", "timeout"],
  mapper: {
    defaultValue: 30,
    serializedName: "timeout",
    type: {
      name: "Number"
    }
  }
};

export const offset: coreHttp.OperationURLParameter = {
  parameterPath: "offset",
  mapper: {
    serializedName: "offset",
    required: true,
    type: {
      name: "Number"
    }
  }
};

export const apiVersion: coreHttp.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    serializedName: "api_version",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const tenant: coreHttp.OperationURLParameter = {
  parameterPath: "tenant",
  mapper: {
    serializedName: "tenant",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const apiVersion1: coreHttp.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    serializedName: "api_version",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const tenant1: coreHttp.OperationURLParameter = {
  parameterPath: "tenant",
  mapper: {
    serializedName: "tenant",
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
