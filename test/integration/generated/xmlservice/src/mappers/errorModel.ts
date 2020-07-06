/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { CompositeMapper } from "@azure/core-http";

export const ErrorModel: CompositeMapper = {
  serializedName: "Error",
  type: {
    name: "Composite",
    className: "ErrorModel",
    modelProperties: {
      status: {
        serializedName: "status",
        xmlName: "status",
        type: {
          name: "Number"
        }
      },
      message: {
        serializedName: "message",
        xmlName: "message",
        type: {
          name: "String"
        }
      }
    }
  }
};
