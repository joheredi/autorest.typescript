/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";

export const $host: coreHttp.OperationParameter = {
  parameterPath: "$host",
  mapper: { type: { name: "String" }, serializedName: "string", required: true }
};
export const stringBody: coreHttp.OperationParameter = {
  parameterPath: ["options", "stringBody"],
  mapper: {
    type: { name: "String" },
    serializedName: "Constant0",
    defaultValue: null,
    isConstant: true
  }
};
export const enumStringBody: coreHttp.OperationParameter = {
  parameterPath: "enumStringBody",
  mapper: {
    type: {
      name: "Enum",
      allowedValues: ["red color", "green-color", "blue_color"]
    },
    serializedName: "Colors",
    required: true
  }
};
