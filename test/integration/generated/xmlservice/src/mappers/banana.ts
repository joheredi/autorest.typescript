/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { CompositeMapper } from "@azure/core-http";

export const Banana: CompositeMapper = {
  serializedName: "Banana",
  xmlName: "banana",
  type: {
    name: "Composite",
    className: "Banana",
    modelProperties: {
      name: {
        serializedName: "name",
        xmlName: "name",
        type: {
          name: "String"
        }
      },
      flavor: {
        serializedName: "flavor",
        xmlName: "flavor",
        type: {
          name: "String"
        }
      },
      expiration: {
        serializedName: "expiration",
        xmlName: "expiration",
        type: {
          name: "DateTime"
        }
      }
    }
  }
};
