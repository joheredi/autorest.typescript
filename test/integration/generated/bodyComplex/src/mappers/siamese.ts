/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { Cat } from "./cat";
import { CompositeMapper } from "@azure/core-http";

export const Siamese: CompositeMapper = {
  type: {
    name: "Composite",
    className: "Siamese",
    modelProperties: {
      ...Cat.type.modelProperties,
      breed: {
        serializedName: "breed",
        type: {
          name: "String"
        }
      }
    }
  }
};
