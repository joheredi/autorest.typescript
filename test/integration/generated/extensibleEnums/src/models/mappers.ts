/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const Pet: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Pet",
    modelProperties: {
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      daysOfWeek: {
        defaultValue: "Friday",
        serializedName: "DaysOfWeek",
        type: {
          name: "String"
        }
      },
      intEnum: {
        serializedName: "IntEnum",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};
