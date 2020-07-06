/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { CompositeMapper } from "@azure/core-http";

export const HeaderResponseFloatHeaders: CompositeMapper = {
  type: {
    name: "Composite",
    className: "HeaderResponseFloatHeaders",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Number"
        }
      }
    }
  }
};
