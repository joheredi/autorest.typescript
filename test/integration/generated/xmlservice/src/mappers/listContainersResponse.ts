/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { CompositeMapper } from "@azure/core-http";

export const ListContainersResponse: CompositeMapper = {
  serializedName: "ListContainersResponse",
  xmlName: "EnumerationResults",
  type: {
    name: "Composite",
    className: "ListContainersResponse",
    modelProperties: {
      serviceEndpoint: {
        serializedName: "ServiceEndpoint",
        required: true,
        xmlName: "ServiceEndpoint",
        xmlIsAttribute: true,
        type: {
          name: "String"
        }
      },
      prefix: {
        serializedName: "Prefix",
        required: true,
        xmlName: "Prefix",
        type: {
          name: "String"
        }
      },
      marker: {
        serializedName: "Marker",
        xmlName: "Marker",
        type: {
          name: "String"
        }
      },
      maxResults: {
        serializedName: "MaxResults",
        required: true,
        xmlName: "MaxResults",
        type: {
          name: "Number"
        }
      },
      containers: {
        serializedName: "Containers",
        xmlName: "Containers",
        xmlIsWrapped: true,
        xmlElementName: "Container",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Container" } }
        }
      },
      nextMarker: {
        serializedName: "NextMarker",
        required: true,
        xmlName: "NextMarker",
        type: {
          name: "String"
        }
      }
    }
  }
};
