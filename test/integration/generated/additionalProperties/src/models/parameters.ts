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
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const createParameters: coreHttp.OperationParameter = {
  parameterPath: "createParameters",
  mapper: Mappers.PetAPTrue
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

export const createParameters1: coreHttp.OperationParameter = {
  parameterPath: "createParameters",
  mapper: Mappers.CatAPTrue
};

export const createParameters2: coreHttp.OperationParameter = {
  parameterPath: "createParameters",
  mapper: Mappers.PetAPObject
};

export const createParameters3: coreHttp.OperationParameter = {
  parameterPath: "createParameters",
  mapper: Mappers.PetAPString
};

export const createParameters4: coreHttp.OperationParameter = {
  parameterPath: "createParameters",
  mapper: Mappers.PetAPInProperties
};

export const createParameters5: coreHttp.OperationParameter = {
  parameterPath: "createParameters",
  mapper: Mappers.PetAPInPropertiesWithAPString
};
