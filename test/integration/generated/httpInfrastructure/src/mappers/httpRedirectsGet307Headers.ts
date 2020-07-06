/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { CompositeMapper } from "@azure/core-http";

export const HttpRedirectsGet307Headers: CompositeMapper = {
  type: {
    name: "Composite",
    className: "HttpRedirectsGet307Headers",
    modelProperties: {
      location: {
        defaultValue: "/http/success/get/200",
        isConstant: true,
        serializedName: "location",
        type: {
          name: "String"
        }
      }
    }
  }
};
