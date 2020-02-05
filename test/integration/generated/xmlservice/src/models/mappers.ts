/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const RootWithRefAndNoMeta: coreHttp.CompositeMapper = {
  serializedName: "RootWithRefAndNoMeta",
  type: {
    name: "Composite",
    className: "RootWithRefAndNoMeta",
    modelProperties: {
      refToModel: {
        serializedName: "RefToModel",
        xmlName: "RefToModel",
        type: { name: "Composite", className: "ComplexTypeNoMeta" }
      },
      something: {
        type: { name: "String" },
        serializedName: "Something",
        xmlName: "Something"
      }
    }
  }
};

export const ComplexTypeNoMeta: coreHttp.CompositeMapper = {
  serializedName: "ComplexTypeNoMeta",
  type: {
    name: "Composite",
    className: "ComplexTypeNoMeta",
    modelProperties: {
      id: { type: { name: "String" }, serializedName: "ID", xmlName: "ID" }
    }
  }
};

export const RootWithRefAndMeta: coreHttp.CompositeMapper = {
  serializedName: "RootWithRefAndMeta",
  type: {
    name: "Composite",
    className: "RootWithRefAndMeta",
    modelProperties: {
      refToModel: {
        serializedName: "RefToModel",
        xmlName: "XMLComplexTypeWithMeta",
        type: { name: "Composite", className: "ComplexTypeWithMeta" }
      },
      something: {
        type: { name: "String" },
        serializedName: "Something",
        xmlName: "Something"
      }
    }
  }
};

export const ComplexTypeWithMeta: coreHttp.CompositeMapper = {
  serializedName: "ComplexTypeWithMeta",
  xmlName: "XMLComplexTypeWithMeta",
  type: {
    name: "Composite",
    className: "ComplexTypeWithMeta",
    modelProperties: {
      id: { type: { name: "String" }, serializedName: "ID", xmlName: "ID" }
    }
  }
};

export const Slideshow: coreHttp.CompositeMapper = {
  serializedName: "Slideshow",
  xmlName: "slideshow",
  type: {
    name: "Composite",
    className: "Slideshow",
    modelProperties: {
      title: {
        type: { name: "String" },
        serializedName: "title",
        xmlName: "title",
        xmlIsAttribute: true
      },
      date: {
        type: { name: "String" },
        serializedName: "date",
        xmlName: "date",
        xmlIsAttribute: true
      },
      author: {
        type: { name: "String" },
        serializedName: "author",
        xmlName: "author",
        xmlIsAttribute: true
      },
      slides: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Slide" } }
        },
        serializedName: "slides",
        xmlName: "slides",
        xmlElementName: "slide"
      }
    }
  }
};

export const Slide: coreHttp.CompositeMapper = {
  serializedName: "Slide",
  xmlName: "slide",
  type: {
    name: "Composite",
    className: "Slide",
    modelProperties: {
      type: {
        type: { name: "String" },
        serializedName: "type",
        xmlName: "type",
        xmlIsAttribute: true
      },
      title: {
        type: { name: "String" },
        serializedName: "title",
        xmlName: "title"
      },
      items: {
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "Slide-itemsItem"
          }
        },
        serializedName: "items",
        xmlName: "items",
        xmlElementName: "item"
      }
    }
  }
};

export const ErrorModel: coreHttp.CompositeMapper = {
  serializedName: "Error",
  type: {
    name: "Composite",
    className: "ErrorModel",
    modelProperties: {
      status: {
        type: { name: "Number" },
        serializedName: "status",
        xmlName: "status"
      },
      message: {
        type: { name: "String" },
        serializedName: "message",
        xmlName: "message"
      }
    }
  }
};

export const AppleBarrel: coreHttp.CompositeMapper = {
  serializedName: "AppleBarrel",
  type: {
    name: "Composite",
    className: "AppleBarrel",
    modelProperties: {
      goodApples: {
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "AppleBarrel-GoodApplesItem"
          }
        },
        serializedName: "GoodApples",
        xmlName: "GoodApples",
        xmlIsWrapped: true,
        xmlElementName: "Apple"
      },
      badApples: {
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "AppleBarrel-BadApplesItem"
          }
        },
        serializedName: "BadApples",
        xmlName: "BadApples",
        xmlIsWrapped: true,
        xmlElementName: "Apple"
      }
    }
  }
};

export const Banana: coreHttp.CompositeMapper = {
  serializedName: "Banana",
  xmlName: "banana",
  type: {
    name: "Composite",
    className: "Banana",
    modelProperties: {
      name: {
        type: { name: "String" },
        serializedName: "name",
        xmlName: "name"
      },
      flavor: {
        type: { name: "String" },
        serializedName: "flavor",
        xmlName: "flavor"
      },
      expiration: {
        type: { name: "DateTime" },
        serializedName: "expiration",
        xmlName: "expiration"
      }
    }
  }
};

export const ListContainersResponse: coreHttp.CompositeMapper = {
  serializedName: "ListContainersResponse",
  xmlName: "EnumerationResults",
  type: {
    name: "Composite",
    className: "ListContainersResponse",
    modelProperties: {
      serviceEndpoint: {
        type: { name: "String" },
        serializedName: "ServiceEndpoint",
        required: true,
        xmlName: "ServiceEndpoint",
        xmlIsAttribute: true
      },
      prefix: {
        type: { name: "String" },
        serializedName: "Prefix",
        required: true,
        xmlName: "Prefix"
      },
      marker: {
        type: { name: "String" },
        serializedName: "Marker",
        xmlName: "Marker"
      },
      maxResults: {
        type: { name: "Number" },
        serializedName: "MaxResults",
        required: true,
        xmlName: "MaxResults"
      },
      containers: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Container" } }
        },
        serializedName: "Containers",
        xmlName: "Containers",
        xmlIsWrapped: true,
        xmlElementName: "Container"
      },
      nextMarker: {
        type: { name: "String" },
        serializedName: "NextMarker",
        required: true,
        xmlName: "NextMarker"
      }
    }
  }
};

export const Container: coreHttp.CompositeMapper = {
  serializedName: "Container",
  type: {
    name: "Composite",
    className: "Container",
    modelProperties: {
      name: {
        type: { name: "String" },
        serializedName: "Name",
        required: true,
        xmlName: "Name"
      },
      properties: {
        serializedName: "Properties",
        xmlName: "Properties",
        type: { name: "Composite", className: "ContainerProperties" }
      },
      metadata: {
        type: {
          name: "Dictionary",
          value: { type: { name: "String" }, serializedName: "string" }
        },
        serializedName: "Metadata",
        xmlName: "Metadata",
        xmlElementName: "string"
      }
    }
  }
};

export const ContainerProperties: coreHttp.CompositeMapper = {
  serializedName: "ContainerProperties",
  type: {
    name: "Composite",
    className: "ContainerProperties",
    modelProperties: {
      lastModified: {
        type: { name: "DateTimeRfc1123" },
        serializedName: "Last-Modified",
        required: true,
        xmlName: "Last-Modified"
      },
      etag: {
        type: { name: "String" },
        serializedName: "Etag",
        required: true,
        xmlName: "Etag"
      },
      leaseStatus: {
        type: { name: "Enum", allowedValues: ["locked", "unlocked"] },
        serializedName: "LeaseStatus",
        xmlName: "LeaseStatus"
      },
      leaseState: {
        type: {
          name: "Enum",
          allowedValues: [
            "available",
            "leased",
            "expired",
            "breaking",
            "broken"
          ]
        },
        serializedName: "LeaseState",
        xmlName: "LeaseState"
      },
      leaseDuration: {
        type: { name: "Enum", allowedValues: ["infinite", "fixed"] },
        serializedName: "LeaseDuration",
        xmlName: "LeaseDuration"
      },
      publicAccess: {
        type: { name: "String" },
        serializedName: "PublicAccess",
        xmlName: "PublicAccess"
      }
    }
  }
};

export const StorageServiceProperties: coreHttp.CompositeMapper = {
  serializedName: "StorageServiceProperties",
  type: {
    name: "Composite",
    className: "StorageServiceProperties",
    modelProperties: {
      logging: {
        serializedName: "Logging",
        xmlName: "Logging",
        type: { name: "Composite", className: "Logging" }
      },
      hourMetrics: {
        serializedName: "HourMetrics",
        xmlName: "HourMetrics",
        type: { name: "Composite", className: "Metrics" }
      },
      minuteMetrics: {
        serializedName: "MinuteMetrics",
        xmlName: "MinuteMetrics",
        type: { name: "Composite", className: "Metrics" }
      },
      cors: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "CorsRule" } }
        },
        serializedName: "Cors",
        xmlName: "Cors",
        xmlIsWrapped: true,
        xmlElementName: "CorsRule"
      },
      defaultServiceVersion: {
        type: { name: "String" },
        serializedName: "DefaultServiceVersion",
        xmlName: "DefaultServiceVersion"
      },
      deleteRetentionPolicy: {
        serializedName: "DeleteRetentionPolicy",
        xmlName: "DeleteRetentionPolicy",
        type: { name: "Composite", className: "RetentionPolicy" }
      }
    }
  }
};

export const Logging: coreHttp.CompositeMapper = {
  serializedName: "Logging",
  type: {
    name: "Composite",
    className: "Logging",
    modelProperties: {
      version: {
        type: { name: "String" },
        serializedName: "Version",
        required: true,
        xmlName: "Version"
      },
      delete: {
        type: { name: "Boolean" },
        serializedName: "Delete",
        required: true,
        xmlName: "Delete"
      },
      read: {
        type: { name: "Boolean" },
        serializedName: "Read",
        required: true,
        xmlName: "Read"
      },
      write: {
        type: { name: "Boolean" },
        serializedName: "Write",
        required: true,
        xmlName: "Write"
      },
      retentionPolicy: {
        serializedName: "RetentionPolicy",
        xmlName: "RetentionPolicy",
        type: { name: "Composite", className: "RetentionPolicy" }
      }
    }
  }
};

export const RetentionPolicy: coreHttp.CompositeMapper = {
  serializedName: "RetentionPolicy",
  type: {
    name: "Composite",
    className: "RetentionPolicy",
    modelProperties: {
      enabled: {
        type: { name: "Boolean" },
        serializedName: "Enabled",
        required: true,
        xmlName: "Enabled"
      },
      days: {
        type: { name: "Number" },
        serializedName: "Days",
        constraints: { InclusiveMinimum: 1 },
        xmlName: "Days"
      }
    }
  }
};

export const Metrics: coreHttp.CompositeMapper = {
  serializedName: "Metrics",
  type: {
    name: "Composite",
    className: "Metrics",
    modelProperties: {
      version: {
        type: { name: "String" },
        serializedName: "Version",
        xmlName: "Version"
      },
      enabled: {
        type: { name: "Boolean" },
        serializedName: "Enabled",
        required: true,
        xmlName: "Enabled"
      },
      includeAPIs: {
        type: { name: "Boolean" },
        serializedName: "IncludeAPIs",
        xmlName: "IncludeAPIs"
      },
      retentionPolicy: {
        serializedName: "RetentionPolicy",
        xmlName: "RetentionPolicy",
        type: { name: "Composite", className: "RetentionPolicy" }
      }
    }
  }
};

export const CorsRule: coreHttp.CompositeMapper = {
  serializedName: "CorsRule",
  xmlName: "CorsRule",
  type: {
    name: "Composite",
    className: "CorsRule",
    modelProperties: {
      allowedOrigins: {
        type: { name: "String" },
        serializedName: "AllowedOrigins",
        required: true,
        xmlName: "AllowedOrigins"
      },
      allowedMethods: {
        type: { name: "String" },
        serializedName: "AllowedMethods",
        required: true,
        xmlName: "AllowedMethods"
      },
      allowedHeaders: {
        type: { name: "String" },
        serializedName: "AllowedHeaders",
        required: true,
        xmlName: "AllowedHeaders"
      },
      exposedHeaders: {
        type: { name: "String" },
        serializedName: "ExposedHeaders",
        required: true,
        xmlName: "ExposedHeaders"
      },
      maxAgeInSeconds: {
        type: { name: "Number" },
        serializedName: "MaxAgeInSeconds",
        required: true,
        constraints: {},
        xmlName: "MaxAgeInSeconds"
      }
    }
  }
};

export const SignedIdentifier: coreHttp.CompositeMapper = {
  serializedName: "SignedIdentifier",
  xmlName: "SignedIdentifier",
  type: {
    name: "Composite",
    className: "SignedIdentifier",
    modelProperties: {
      id: {
        type: { name: "String" },
        serializedName: "Id",
        required: true,
        xmlName: "Id"
      },
      accessPolicy: {
        serializedName: "AccessPolicy",
        xmlName: "AccessPolicy",
        type: { name: "Composite", className: "AccessPolicy" }
      }
    }
  }
};

export const AccessPolicy: coreHttp.CompositeMapper = {
  serializedName: "AccessPolicy",
  type: {
    name: "Composite",
    className: "AccessPolicy",
    modelProperties: {
      start: {
        type: { name: "DateTime" },
        serializedName: "Start",
        required: true,
        xmlName: "Start"
      },
      expiry: {
        type: { name: "DateTime" },
        serializedName: "Expiry",
        required: true,
        xmlName: "Expiry"
      },
      permission: {
        type: { name: "String" },
        serializedName: "Permission",
        required: true,
        xmlName: "Permission"
      }
    }
  }
};

export const ListBlobsResponse: coreHttp.CompositeMapper = {
  serializedName: "ListBlobsResponse",
  xmlName: "EnumerationResults",
  type: {
    name: "Composite",
    className: "ListBlobsResponse",
    modelProperties: {
      serviceEndpoint: {
        type: { name: "String" },
        serializedName: "ServiceEndpoint",
        required: true,
        xmlName: "ServiceEndpoint",
        xmlIsAttribute: true
      },
      containerName: {
        type: { name: "String" },
        serializedName: "ContainerName",
        required: true,
        xmlName: "ContainerName",
        xmlIsAttribute: true
      },
      prefix: {
        type: { name: "String" },
        serializedName: "Prefix",
        required: true,
        xmlName: "Prefix"
      },
      marker: {
        type: { name: "String" },
        serializedName: "Marker",
        required: true,
        xmlName: "Marker"
      },
      maxResults: {
        type: { name: "Number" },
        serializedName: "MaxResults",
        required: true,
        xmlName: "MaxResults"
      },
      delimiter: {
        type: { name: "String" },
        serializedName: "Delimiter",
        required: true,
        xmlName: "Delimiter"
      },
      blobs: {
        serializedName: "Blobs",
        xmlName: "Blobs",
        type: { name: "Composite", className: "Blobs" }
      },
      nextMarker: {
        type: { name: "String" },
        serializedName: "NextMarker",
        required: true,
        xmlName: "NextMarker"
      }
    }
  }
};

export const Blobs: coreHttp.CompositeMapper = {
  serializedName: "Blobs",
  type: {
    name: "Composite",
    className: "Blobs",
    modelProperties: {
      blobPrefix: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "BlobPrefix" } }
        },
        serializedName: "BlobPrefix",
        xmlName: "BlobPrefix",
        xmlElementName: "BlobPrefix"
      },
      blob: {
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Blob" } }
        },
        serializedName: "Blob",
        xmlName: "Blob",
        xmlElementName: "Blob"
      }
    }
  }
};

export const BlobPrefix: coreHttp.CompositeMapper = {
  serializedName: "BlobPrefix",
  type: {
    name: "Composite",
    className: "BlobPrefix",
    modelProperties: {
      name: {
        type: { name: "String" },
        serializedName: "Name",
        required: true,
        xmlName: "Name"
      }
    }
  }
};

export const Blob: coreHttp.CompositeMapper = {
  serializedName: "Blob",
  xmlName: "Blob",
  type: {
    name: "Composite",
    className: "Blob",
    modelProperties: {
      name: {
        type: { name: "String" },
        serializedName: "Name",
        required: true,
        xmlName: "Name"
      },
      deleted: {
        type: { name: "Boolean" },
        serializedName: "Deleted",
        required: true,
        xmlName: "Deleted"
      },
      snapshot: {
        type: { name: "String" },
        serializedName: "Snapshot",
        required: true,
        xmlName: "Snapshot"
      },
      properties: {
        serializedName: "Properties",
        xmlName: "Properties",
        type: { name: "Composite", className: "BlobProperties" }
      },
      metadata: {
        type: {
          name: "Dictionary",
          value: { type: { name: "String" }, serializedName: "string" }
        },
        serializedName: "Metadata",
        xmlName: "Metadata",
        xmlElementName: "string"
      }
    }
  }
};

export const BlobProperties: coreHttp.CompositeMapper = {
  serializedName: "BlobProperties",
  type: {
    name: "Composite",
    className: "BlobProperties",
    modelProperties: {
      lastModified: {
        type: { name: "DateTimeRfc1123" },
        serializedName: "Last-Modified",
        required: true,
        xmlName: "Last-Modified"
      },
      etag: {
        type: { name: "String" },
        serializedName: "Etag",
        required: true,
        xmlName: "Etag"
      },
      contentLength: {
        type: { name: "Number" },
        serializedName: "Content-Length",
        xmlName: "Content-Length"
      },
      contentType: {
        type: { name: "String" },
        serializedName: "Content-Type",
        xmlName: "Content-Type"
      },
      contentEncoding: {
        type: { name: "String" },
        serializedName: "Content-Encoding",
        xmlName: "Content-Encoding"
      },
      contentLanguage: {
        type: { name: "String" },
        serializedName: "Content-Language",
        xmlName: "Content-Language"
      },
      contentMd5: {
        type: { name: "String" },
        serializedName: "Content-MD5",
        xmlName: "Content-MD5"
      },
      contentDisposition: {
        type: { name: "String" },
        serializedName: "Content-Disposition",
        xmlName: "Content-Disposition"
      },
      cacheControl: {
        type: { name: "String" },
        serializedName: "Cache-Control",
        xmlName: "Cache-Control"
      },
      xMsBlobSequenceNumber: {
        type: { name: "Number" },
        serializedName: "x-ms-blob-sequence-number",
        xmlName: "x-ms-blob-sequence-number"
      },
      blobType: {
        type: {
          name: "Enum",
          allowedValues: ["BlockBlob", "PageBlob", "AppendBlob"]
        },
        serializedName: "BlobType",
        xmlName: "BlobType"
      },
      leaseStatus: {
        type: { name: "Enum", allowedValues: ["locked", "unlocked"] },
        serializedName: "LeaseStatus",
        xmlName: "LeaseStatus"
      },
      leaseState: {
        type: {
          name: "Enum",
          allowedValues: [
            "available",
            "leased",
            "expired",
            "breaking",
            "broken"
          ]
        },
        serializedName: "LeaseState",
        xmlName: "LeaseState"
      },
      leaseDuration: {
        type: { name: "Enum", allowedValues: ["infinite", "fixed"] },
        serializedName: "LeaseDuration",
        xmlName: "LeaseDuration"
      },
      copyId: {
        type: { name: "String" },
        serializedName: "CopyId",
        xmlName: "CopyId"
      },
      copyStatus: {
        type: {
          name: "Enum",
          allowedValues: ["pending", "success", "aborted", "failed"]
        },
        serializedName: "CopyStatus",
        xmlName: "CopyStatus"
      },
      copySource: {
        type: { name: "String" },
        serializedName: "CopySource",
        xmlName: "CopySource"
      },
      copyProgress: {
        type: { name: "String" },
        serializedName: "CopyProgress",
        xmlName: "CopyProgress"
      },
      copyCompletionTime: {
        type: { name: "DateTimeRfc1123" },
        serializedName: "CopyCompletionTime",
        xmlName: "CopyCompletionTime"
      },
      copyStatusDescription: {
        type: { name: "String" },
        serializedName: "CopyStatusDescription",
        xmlName: "CopyStatusDescription"
      },
      serverEncrypted: {
        type: { name: "Boolean" },
        serializedName: "ServerEncrypted",
        xmlName: "ServerEncrypted"
      },
      incrementalCopy: {
        type: { name: "Boolean" },
        serializedName: "IncrementalCopy",
        xmlName: "IncrementalCopy"
      },
      destinationSnapshot: {
        type: { name: "String" },
        serializedName: "DestinationSnapshot",
        xmlName: "DestinationSnapshot"
      },
      deletedTime: {
        type: { name: "DateTimeRfc1123" },
        serializedName: "DeletedTime",
        xmlName: "DeletedTime"
      },
      remainingRetentionDays: {
        type: { name: "Number" },
        serializedName: "RemainingRetentionDays",
        xmlName: "RemainingRetentionDays"
      },
      accessTier: {
        type: { name: "String" },
        serializedName: "AccessTier",
        xmlName: "AccessTier"
      },
      accessTierInferred: {
        type: { name: "Boolean" },
        serializedName: "AccessTierInferred",
        xmlName: "AccessTierInferred"
      },
      archiveStatus: {
        type: { name: "String" },
        serializedName: "ArchiveStatus",
        xmlName: "ArchiveStatus"
      }
    }
  }
};

export const JSONInput: coreHttp.CompositeMapper = {
  serializedName: "JSONInput",
  type: {
    name: "Composite",
    className: "JSONInput",
    modelProperties: {
      id: { type: { name: "Number" }, serializedName: "id", xmlName: "id" }
    }
  }
};

export const JSONOutput: coreHttp.CompositeMapper = {
  serializedName: "JSONOutput",
  type: {
    name: "Composite",
    className: "JSONOutput",
    modelProperties: {
      id: { type: { name: "Number" }, serializedName: "id", xmlName: "id" }
    }
  }
};
