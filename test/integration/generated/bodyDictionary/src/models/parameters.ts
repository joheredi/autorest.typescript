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

export const arrayBody: coreHttp.OperationParameter = {
  parameterPath: "arrayBody",
  mapper: {
    serializedName: "arrayBody",
    required: true,
    type: {
      name: "Dictionary",
      value: { type: { name: "String" }, serializedName: "String" }
    }
  }
};

export const arrayBody1: coreHttp.OperationParameter = {
  parameterPath: "arrayBody",
  mapper: {
    serializedName: "arrayBody",
    required: true,
    type: {
      name: "Dictionary",
      value: { type: { name: "Boolean" }, serializedName: "Boolean" }
    }
  }
};

export const arrayBody2: coreHttp.OperationParameter = {
  parameterPath: "arrayBody",
  mapper: {
    serializedName: "arrayBody",
    required: true,
    type: {
      name: "Dictionary",
      value: { type: { name: "Number" }, serializedName: "Integer" }
    }
  }
};

export const arrayBody3: coreHttp.OperationParameter = {
  parameterPath: "arrayBody",
  mapper: {
    serializedName: "arrayBody",
    required: true,
    type: {
      name: "Dictionary",
      value: { type: { name: "Number" }, serializedName: "Integer" }
    }
  }
};

export const arrayBody4: coreHttp.OperationParameter = {
  parameterPath: "arrayBody",
  mapper: {
    serializedName: "arrayBody",
    required: true,
    type: {
      name: "Dictionary",
      value: { type: { name: "Number" }, serializedName: "Number" }
    }
  }
};

export const arrayBody5: coreHttp.OperationParameter = {
  parameterPath: "arrayBody",
  mapper: {
    serializedName: "arrayBody",
    required: true,
    type: {
      name: "Dictionary",
      value: { type: { name: "Number" }, serializedName: "Number" }
    }
  }
};

export const arrayBody6: coreHttp.OperationParameter = {
  parameterPath: "arrayBody",
  mapper: {
    serializedName: "arrayBody",
    required: true,
    type: {
      name: "Dictionary",
      value: { type: { name: "String" }, serializedName: "String" }
    }
  }
};

export const arrayBody7: coreHttp.OperationParameter = {
  parameterPath: "arrayBody",
  mapper: {
    serializedName: "arrayBody",
    required: true,
    type: {
      name: "Dictionary",
      value: { type: { name: "Date" }, serializedName: "Date" }
    }
  }
};

export const arrayBody8: coreHttp.OperationParameter = {
  parameterPath: "arrayBody",
  mapper: {
    serializedName: "arrayBody",
    required: true,
    type: {
      name: "Dictionary",
      value: { type: { name: "DateTime" }, serializedName: "DateTime" }
    }
  }
};

export const arrayBody9: coreHttp.OperationParameter = {
  parameterPath: "arrayBody",
  mapper: {
    serializedName: "arrayBody",
    required: true,
    type: {
      name: "Dictionary",
      value: { type: { name: "DateTimeRfc1123" }, serializedName: "DateTime" }
    }
  }
};

export const arrayBody10: coreHttp.OperationParameter = {
  parameterPath: "arrayBody",
  mapper: {
    serializedName: "arrayBody",
    required: true,
    type: {
      name: "Dictionary",
      value: { type: { name: "TimeSpan" }, serializedName: "Duration" }
    }
  }
};

export const arrayBody11: coreHttp.OperationParameter = {
  parameterPath: "arrayBody",
  mapper: {
    serializedName: "arrayBody",
    required: true,
    type: {
      name: "Dictionary",
      value: { type: { name: "ByteArray" }, serializedName: "ByteArray" }
    }
  }
};

export const arrayBody12: coreHttp.OperationParameter = {
  parameterPath: "arrayBody",
  mapper: {
    serializedName: "arrayBody",
    required: true,
    type: {
      name: "Dictionary",
      value: { type: { name: "Composite", className: "Widget" } }
    }
  }
};

export const arrayBody13: coreHttp.OperationParameter = {
  parameterPath: "arrayBody",
  mapper: {
    serializedName: "arrayBody",
    required: true,
    type: {
      name: "Dictionary",
      value: {
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "PutContentSchemaItemsItem"
          }
        },
        serializedName: "ArrayOfPutContentSchemaItemsItem"
      }
    }
  }
};

export const arrayBody14: coreHttp.OperationParameter = {
  parameterPath: "arrayBody",
  mapper: {
    serializedName: "arrayBody",
    required: true,
    type: {
      name: "Dictionary",
      value: { type: { name: "any" }, serializedName: "any" }
    }
  }
};
