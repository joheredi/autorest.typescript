/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PetAPTrue } from "./petAPTrue";
import { CompositeMapper } from "@azure/core-http";

export const CatAPTrue: CompositeMapper = {
  type: {
    name: "Composite",
    className: "CatAPTrue",
    additionalProperties: { type: { name: "Object" } },
    modelProperties: {
      ...PetAPTrue.type.modelProperties,
      friendly: {
        serializedName: "friendly",
        type: {
          name: "Boolean"
        }
      }
    }
  }
};
