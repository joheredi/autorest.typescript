/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { CompositeMapper } from "@azure/core-http";

export const OdataProductResult: CompositeMapper = {
  type: {
    name: "Composite",
    className: "OdataProductResult",
    modelProperties: {
      values: {
        serializedName: "values",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Product" } }
        }
      },
      odataNextLink: {
        serializedName: "odata\\.nextLink",
        type: {
          name: "String"
        }
      }
    }
  }
};
