/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { Shark } from "./shark";
import { Fish } from "./fish";
import { CompositeMapper } from "@azure/core-http";

export const Cookiecuttershark: CompositeMapper = {
  serializedName: "cookiecuttershark",
  type: {
    name: "Composite",
    className: "Cookiecuttershark",
    uberParent: "Fish",
    polymorphicDiscriminator: Fish.type.polymorphicDiscriminator,
    modelProperties: {
      ...Shark.type.modelProperties
    }
  }
};
