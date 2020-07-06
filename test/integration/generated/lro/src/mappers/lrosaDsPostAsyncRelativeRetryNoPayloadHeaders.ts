/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { CompositeMapper } from "@azure/core-http";

export const LrosaDsPostAsyncRelativeRetryNoPayloadHeaders: CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsPostAsyncRelativeRetryNoPayloadHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
        type: {
          name: "String"
        }
      },
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};
