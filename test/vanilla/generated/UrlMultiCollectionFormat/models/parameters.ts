/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const arrayQuery: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "arrayQuery"
  ],
  mapper: {
    serializedName: "arrayQuery",
    type: {
      name: "Sequence",
      element: {
        type: {
          name: "String"
        }
      }
    }
  },
  collectionFormat: coreHttp.QueryCollectionFormat.Multi
};
