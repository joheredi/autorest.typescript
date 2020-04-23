/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const AcrErrors: coreHttp.CompositeMapper = {
  serializedName: "AcrErrors",
  type: {
    name: "Composite",
    className: "AcrErrors",
    modelProperties: {
      errors: {
        serializedName: "errors",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "AcrErrorInfo" } }
        }
      }
    }
  }
};

export const AcrErrorInfo: coreHttp.CompositeMapper = {
  serializedName: "AcrErrorInfo",
  type: {
    name: "Composite",
    className: "AcrErrorInfo",
    modelProperties: {
      code: {
        serializedName: "code",
        type: {
          name: "String"
        }
      },
      message: {
        serializedName: "message",
        type: {
          name: "String"
        }
      },
      detail: {
        serializedName: "detail",
        type: {
          name: "any"
        }
      }
    }
  }
};

export const Manifest: coreHttp.CompositeMapper = {
  serializedName: "Manifest",
  type: {
    name: "Composite",
    className: "Manifest",
    modelProperties: {
      schemaVersion: {
        serializedName: "schemaVersion",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const ManifestWrapper: coreHttp.CompositeMapper = {
  serializedName: "ManifestWrapper",
  type: {
    name: "Composite",
    className: "ManifestWrapper",
    modelProperties: {
      ...Manifest.type.modelProperties,
      mediaType: {
        serializedName: "mediaType",
        type: {
          name: "String"
        }
      },
      manifests: {
        serializedName: "manifests",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "ManifestListAttributes" }
          }
        }
      },
      config: {
        serializedName: "config",
        type: {
          name: "Composite",
          className: "Descriptor"
        }
      },
      layers: {
        serializedName: "layers",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Descriptor" } }
        }
      },
      annotations: {
        serializedName: "annotations",
        type: {
          name: "Composite",
          className: "Annotations"
        }
      },
      architecture: {
        serializedName: "architecture",
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      tag: {
        serializedName: "tag",
        type: {
          name: "String"
        }
      },
      fsLayers: {
        serializedName: "fsLayers",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "FsLayer" } }
        }
      },
      history: {
        serializedName: "history",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "History" } }
        }
      },
      signatures: {
        serializedName: "signatures",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "ImageSignature" } }
        }
      }
    }
  }
};

export const ManifestListAttributes: coreHttp.CompositeMapper = {
  serializedName: "ManifestListAttributes",
  type: {
    name: "Composite",
    className: "ManifestListAttributes",
    modelProperties: {
      mediaType: {
        serializedName: "mediaType",
        type: {
          name: "String"
        }
      },
      size: {
        serializedName: "size",
        type: {
          name: "Number"
        }
      },
      digest: {
        serializedName: "digest",
        type: {
          name: "String"
        }
      },
      platform: {
        serializedName: "platform",
        type: {
          name: "Composite",
          className: "Platform"
        }
      }
    }
  }
};

export const Platform: coreHttp.CompositeMapper = {
  serializedName: "Platform",
  type: {
    name: "Composite",
    className: "Platform",
    modelProperties: {
      architecture: {
        serializedName: "architecture",
        type: {
          name: "String"
        }
      },
      os: {
        serializedName: "os",
        type: {
          name: "String"
        }
      },
      osVersion: {
        serializedName: "os\\.version",
        type: {
          name: "String"
        }
      },
      osFeatures: {
        serializedName: "os\\.features",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "PlatformOsFeaturesItem"
          }
        }
      },
      variant: {
        serializedName: "variant",
        type: {
          name: "String"
        }
      },
      features: {
        serializedName: "features",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "PlatformFeaturesItem"
          }
        }
      }
    }
  }
};

export const Descriptor: coreHttp.CompositeMapper = {
  serializedName: "Descriptor",
  type: {
    name: "Composite",
    className: "Descriptor",
    modelProperties: {
      mediaType: {
        serializedName: "mediaType",
        type: {
          name: "String"
        }
      },
      size: {
        serializedName: "size",
        type: {
          name: "Number"
        }
      },
      digest: {
        serializedName: "digest",
        type: {
          name: "String"
        }
      },
      urls: {
        serializedName: "urls",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "DescriptorUrlsItem"
          }
        }
      },
      annotations: {
        serializedName: "annotations",
        type: {
          name: "Composite",
          className: "Annotations"
        }
      }
    }
  }
};

export const Annotations: coreHttp.CompositeMapper = {
  serializedName: "Annotations",
  type: {
    name: "Composite",
    className: "Annotations",
    additionalProperties: { type: { name: "Object" } },
    modelProperties: {
      created: {
        serializedName: "org\\.opencontainers.image.created",
        type: {
          name: "DateTime"
        }
      },
      authors: {
        serializedName: "org\\.opencontainers.image.authors",
        type: {
          name: "String"
        }
      },
      url: {
        serializedName: "org\\.opencontainers.image.url",
        type: {
          name: "String"
        }
      },
      documentation: {
        serializedName: "org\\.opencontainers.image.documentation",
        type: {
          name: "String"
        }
      },
      source: {
        serializedName: "org\\.opencontainers.image.source",
        type: {
          name: "String"
        }
      },
      version: {
        serializedName: "org\\.opencontainers.image.version",
        type: {
          name: "String"
        }
      },
      revision: {
        serializedName: "org\\.opencontainers.image.revision",
        type: {
          name: "String"
        }
      },
      vendor: {
        serializedName: "org\\.opencontainers.image.vendor",
        type: {
          name: "String"
        }
      },
      licenses: {
        serializedName: "org\\.opencontainers.image.licenses",
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "org\\.opencontainers.image.ref.name",
        type: {
          name: "String"
        }
      },
      title: {
        serializedName: "org\\.opencontainers.image.title",
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "org\\.opencontainers.image.description",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const FsLayer: coreHttp.CompositeMapper = {
  serializedName: "FsLayer",
  type: {
    name: "Composite",
    className: "FsLayer",
    modelProperties: {
      blobSum: {
        serializedName: "blobSum",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const History: coreHttp.CompositeMapper = {
  serializedName: "History",
  type: {
    name: "Composite",
    className: "History",
    modelProperties: {
      v1Compatibility: {
        serializedName: "v1Compatibility",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ImageSignature: coreHttp.CompositeMapper = {
  serializedName: "ImageSignature",
  type: {
    name: "Composite",
    className: "ImageSignature",
    modelProperties: {
      header: {
        serializedName: "header",
        type: {
          name: "Composite",
          className: "Jwk"
        }
      },
      signature: {
        serializedName: "signature",
        type: {
          name: "String"
        }
      },
      protected: {
        serializedName: "protected",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Jwk: coreHttp.CompositeMapper = {
  serializedName: "JWK",
  type: {
    name: "Composite",
    className: "Jwk",
    modelProperties: {
      jwk: {
        serializedName: "jwk",
        type: {
          name: "Composite",
          className: "JWKHeader"
        }
      },
      alg: {
        serializedName: "alg",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const JWKHeader: coreHttp.CompositeMapper = {
  serializedName: "JWKHeader",
  type: {
    name: "Composite",
    className: "JWKHeader",
    modelProperties: {
      crv: {
        serializedName: "crv",
        type: {
          name: "String"
        }
      },
      kid: {
        serializedName: "kid",
        type: {
          name: "String"
        }
      },
      kty: {
        serializedName: "kty",
        type: {
          name: "String"
        }
      },
      x: {
        serializedName: "x",
        type: {
          name: "String"
        }
      },
      y: {
        serializedName: "y",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Repositories: coreHttp.CompositeMapper = {
  serializedName: "Repositories",
  type: {
    name: "Composite",
    className: "Repositories",
    modelProperties: {
      names: {
        serializedName: "repositories",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "RepositoriesItem"
          }
        }
      }
    }
  }
};

export const RepositoryAttributes: coreHttp.CompositeMapper = {
  serializedName: "RepositoryAttributes",
  type: {
    name: "Composite",
    className: "RepositoryAttributes",
    modelProperties: {
      registry: {
        serializedName: "registry",
        type: {
          name: "String"
        }
      },
      imageName: {
        serializedName: "imageName",
        type: {
          name: "String"
        }
      },
      createdTime: {
        serializedName: "createdTime",
        type: {
          name: "String"
        }
      },
      lastUpdateTime: {
        serializedName: "lastUpdateTime",
        type: {
          name: "String"
        }
      },
      manifestCount: {
        serializedName: "manifestCount",
        type: {
          name: "Number"
        }
      },
      tagCount: {
        serializedName: "tagCount",
        type: {
          name: "Number"
        }
      },
      changeableAttributes: {
        serializedName: "changeableAttributes",
        type: {
          name: "Composite",
          className: "ChangeableAttributes"
        }
      }
    }
  }
};

export const ChangeableAttributes: coreHttp.CompositeMapper = {
  serializedName: "ChangeableAttributes",
  type: {
    name: "Composite",
    className: "ChangeableAttributes",
    modelProperties: {
      deleteEnabled: {
        serializedName: "deleteEnabled",
        type: {
          name: "Boolean"
        }
      },
      writeEnabled: {
        serializedName: "writeEnabled",
        type: {
          name: "Boolean"
        }
      },
      listEnabled: {
        serializedName: "listEnabled",
        type: {
          name: "Boolean"
        }
      },
      readEnabled: {
        serializedName: "readEnabled",
        type: {
          name: "Boolean"
        }
      }
    }
  }
};

export const DeletedRepository: coreHttp.CompositeMapper = {
  serializedName: "DeletedRepository",
  type: {
    name: "Composite",
    className: "DeletedRepository",
    modelProperties: {
      manifestsDeleted: {
        serializedName: "manifestsDeleted",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "DeletedRepositoryManifestsDeletedItem"
          }
        }
      },
      tagsDeleted: {
        serializedName: "tagsDeleted",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "DeletedRepositoryTagsDeletedItem"
          }
        }
      }
    }
  }
};

export const TagList: coreHttp.CompositeMapper = {
  serializedName: "TagList",
  type: {
    name: "Composite",
    className: "TagList",
    modelProperties: {
      registry: {
        serializedName: "registry",
        type: {
          name: "String"
        }
      },
      imageName: {
        serializedName: "imageName",
        type: {
          name: "String"
        }
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "TagAttributesBase" }
          }
        }
      }
    }
  }
};

export const TagAttributesBase: coreHttp.CompositeMapper = {
  serializedName: "TagAttributesBase",
  type: {
    name: "Composite",
    className: "TagAttributesBase",
    modelProperties: {
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      digest: {
        serializedName: "digest",
        type: {
          name: "String"
        }
      },
      createdTime: {
        serializedName: "createdTime",
        type: {
          name: "String"
        }
      },
      lastUpdateTime: {
        serializedName: "lastUpdateTime",
        type: {
          name: "String"
        }
      },
      signed: {
        serializedName: "signed",
        type: {
          name: "Boolean"
        }
      },
      changeableAttributes: {
        serializedName: "changeableAttributes",
        type: {
          name: "Composite",
          className: "ChangeableAttributes"
        }
      }
    }
  }
};

export const TagAttributes: coreHttp.CompositeMapper = {
  serializedName: "TagAttributes",
  type: {
    name: "Composite",
    className: "TagAttributes",
    modelProperties: {
      registry: {
        serializedName: "registry",
        type: {
          name: "String"
        }
      },
      imageName: {
        serializedName: "imageName",
        type: {
          name: "String"
        }
      },
      attributes: {
        serializedName: "tag",
        type: {
          name: "Composite",
          className: "TagAttributesBase"
        }
      }
    }
  }
};

export const AcrManifests: coreHttp.CompositeMapper = {
  serializedName: "AcrManifests",
  type: {
    name: "Composite",
    className: "AcrManifests",
    modelProperties: {
      registry: {
        serializedName: "registry",
        type: {
          name: "String"
        }
      },
      imageName: {
        serializedName: "imageName",
        type: {
          name: "String"
        }
      },
      manifestsAttributes: {
        serializedName: "manifests",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "ManifestAttributesBase" }
          }
        }
      }
    }
  }
};

export const ManifestAttributesBase: coreHttp.CompositeMapper = {
  serializedName: "ManifestAttributesBase",
  type: {
    name: "Composite",
    className: "ManifestAttributesBase",
    modelProperties: {
      digest: {
        serializedName: "digest",
        type: {
          name: "String"
        }
      },
      imageSize: {
        serializedName: "imageSize",
        type: {
          name: "Number"
        }
      },
      createdTime: {
        serializedName: "createdTime",
        type: {
          name: "String"
        }
      },
      lastUpdateTime: {
        serializedName: "lastUpdateTime",
        type: {
          name: "String"
        }
      },
      architecture: {
        serializedName: "architecture",
        type: {
          name: "String"
        }
      },
      os: {
        serializedName: "os",
        type: {
          name: "String"
        }
      },
      mediaType: {
        serializedName: "mediaType",
        type: {
          name: "String"
        }
      },
      configMediaType: {
        serializedName: "configMediaType",
        type: {
          name: "String"
        }
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "ManifestAttributesBaseTagsItem"
          }
        }
      },
      changeableAttributes: {
        serializedName: "changeableAttributes",
        type: {
          name: "Composite",
          className: "ChangeableAttributes"
        }
      }
    }
  }
};

export const ManifestAttributes: coreHttp.CompositeMapper = {
  serializedName: "ManifestAttributes",
  type: {
    name: "Composite",
    className: "ManifestAttributes",
    modelProperties: {
      registry: {
        serializedName: "registry",
        type: {
          name: "String"
        }
      },
      imageName: {
        serializedName: "imageName",
        type: {
          name: "String"
        }
      },
      attributes: {
        serializedName: "manifest",
        type: {
          name: "Composite",
          className: "ManifestAttributesBase"
        }
      }
    }
  }
};

export const Paths108HwamOauth2ExchangePostRequestbodyContentApplicationXWwwFormUrlencodedSchema: coreHttp.CompositeMapper = {
  serializedName:
    "Paths108HwamOauth2ExchangePostRequestbodyContentApplicationXWwwFormUrlencodedSchema",
  type: {
    name: "Composite",
    className:
      "Paths108HwamOauth2ExchangePostRequestbodyContentApplicationXWwwFormUrlencodedSchema",
    modelProperties: {
      grantType: {
        serializedName: "grant_type",
        required: true,
        type: {
          name: "String"
        }
      },
      service: {
        serializedName: "service",
        required: true,
        type: {
          name: "String"
        }
      },
      tenant: {
        serializedName: "tenant",
        type: {
          name: "String"
        }
      },
      refreshToken: {
        serializedName: "refresh_token",
        type: {
          name: "String"
        }
      },
      accessToken: {
        serializedName: "access_token",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const RefreshToken: coreHttp.CompositeMapper = {
  serializedName: "RefreshToken",
  type: {
    name: "Composite",
    className: "RefreshToken",
    modelProperties: {
      refreshToken: {
        serializedName: "refresh_token",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const PathsV3R3RxOauth2TokenPostRequestbodyContentApplicationXWwwFormUrlencodedSchema: coreHttp.CompositeMapper = {
  serializedName:
    "PathsV3R3RxOauth2TokenPostRequestbodyContentApplicationXWwwFormUrlencodedSchema",
  type: {
    name: "Composite",
    className:
      "PathsV3R3RxOauth2TokenPostRequestbodyContentApplicationXWwwFormUrlencodedSchema",
    modelProperties: {
      grantType: {
        defaultValue: "refresh_token",
        serializedName: "grant_type",
        isConstant: true,
        type: {
          name: "String"
        }
      },
      service: {
        serializedName: "service",
        required: true,
        type: {
          name: "String"
        }
      },
      scope: {
        serializedName: "scope",
        required: true,
        type: {
          name: "String"
        }
      },
      refreshToken: {
        serializedName: "refresh_token",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const AccessToken: coreHttp.CompositeMapper = {
  serializedName: "AccessToken",
  type: {
    name: "Composite",
    className: "AccessToken",
    modelProperties: {
      accessToken: {
        serializedName: "access_token",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const RepositoryTags: coreHttp.CompositeMapper = {
  serializedName: "RepositoryTags",
  type: {
    name: "Composite",
    className: "RepositoryTags",
    modelProperties: {
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "RepositoryTagsItem"
          }
        }
      }
    }
  }
};

export const TagAttributesTag: coreHttp.CompositeMapper = {
  serializedName: "TagAttributesTag",
  type: {
    name: "Composite",
    className: "TagAttributesTag",
    modelProperties: {
      signatureRecord: {
        serializedName: "signatureRecord",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ManifestAttributesManifestReferences: coreHttp.CompositeMapper = {
  serializedName: "ManifestAttributesManifestReferences",
  type: {
    name: "Composite",
    className: "ManifestAttributesManifestReferences",
    modelProperties: {
      digest: {
        serializedName: "digest",
        type: {
          name: "String"
        }
      },
      architecture: {
        serializedName: "architecture",
        type: {
          name: "String"
        }
      },
      os: {
        serializedName: "os",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ManifestAttributesManifest: coreHttp.CompositeMapper = {
  serializedName: "ManifestAttributesManifest",
  type: {
    name: "Composite",
    className: "ManifestAttributesManifest",
    modelProperties: {
      references: {
        serializedName: "references",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "ManifestAttributesManifestReferences"
            }
          }
        }
      },
      quarantineTag: {
        serializedName: "quarantineTag",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ManifestChangeableAttributes: coreHttp.CompositeMapper = {
  serializedName: "ManifestChangeableAttributes",
  type: {
    name: "Composite",
    className: "ManifestChangeableAttributes",
    modelProperties: {
      deleteEnabled: {
        serializedName: "deleteEnabled",
        type: {
          name: "Boolean"
        }
      },
      writeEnabled: {
        serializedName: "writeEnabled",
        type: {
          name: "Boolean"
        }
      },
      listEnabled: {
        serializedName: "listEnabled",
        type: {
          name: "Boolean"
        }
      },
      readEnabled: {
        serializedName: "readEnabled",
        type: {
          name: "Boolean"
        }
      },
      quarantineState: {
        serializedName: "quarantineState",
        type: {
          name: "String"
        }
      },
      quarantineDetails: {
        serializedName: "quarantineDetails",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ManifestList: coreHttp.CompositeMapper = {
  serializedName: "application/vnd.docker.distribution.manifest.list.v2+json",
  type: {
    name: "Composite",
    className: "ManifestList",
    modelProperties: {
      ...Manifest.type.modelProperties,
      mediaType: {
        serializedName: "mediaType",
        type: {
          name: "String"
        }
      },
      manifests: {
        serializedName: "manifests",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "ManifestListAttributes" }
          }
        }
      }
    }
  }
};

export const V2Manifest: coreHttp.CompositeMapper = {
  serializedName: "application/vnd.docker.distribution.manifest.v2+json",
  type: {
    name: "Composite",
    className: "V2Manifest",
    modelProperties: {
      ...Manifest.type.modelProperties,
      mediaType: {
        serializedName: "mediaType",
        type: {
          name: "String"
        }
      },
      config: {
        serializedName: "config",
        type: {
          name: "Composite",
          className: "Descriptor"
        }
      },
      layers: {
        serializedName: "layers",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Descriptor" } }
        }
      }
    }
  }
};

export const OCIManifest: coreHttp.CompositeMapper = {
  serializedName: "application/vnd.oci.image.manifest.v1+json",
  type: {
    name: "Composite",
    className: "OCIManifest",
    modelProperties: {
      ...Manifest.type.modelProperties,
      config: {
        serializedName: "config",
        type: {
          name: "Composite",
          className: "Descriptor"
        }
      },
      layers: {
        serializedName: "layers",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Descriptor" } }
        }
      },
      annotations: {
        serializedName: "annotations",
        type: {
          name: "Composite",
          className: "Annotations"
        }
      }
    }
  }
};

export const OCIIndex: coreHttp.CompositeMapper = {
  serializedName: "application/vnd.oci.image.index.v1+json",
  type: {
    name: "Composite",
    className: "OCIIndex",
    modelProperties: {
      ...Manifest.type.modelProperties,
      manifests: {
        serializedName: "manifests",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "ManifestListAttributes" }
          }
        }
      },
      annotations: {
        serializedName: "annotations",
        type: {
          name: "Composite",
          className: "Annotations"
        }
      }
    }
  }
};

export const V1Manifest: coreHttp.CompositeMapper = {
  serializedName: "application/vnd.oci.image.manifest.v1+json",
  type: {
    name: "Composite",
    className: "V1Manifest",
    modelProperties: {
      ...Manifest.type.modelProperties,
      architecture: {
        serializedName: "architecture",
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      tag: {
        serializedName: "tag",
        type: {
          name: "String"
        }
      },
      fsLayers: {
        serializedName: "fsLayers",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "FsLayer" } }
        }
      },
      history: {
        serializedName: "history",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "History" } }
        }
      },
      signatures: {
        serializedName: "signatures",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "ImageSignature" } }
        }
      }
    }
  }
};

export const ManifestsCreateHeaders: coreHttp.CompositeMapper = {
  serializedName: "manifests_createHeaders",
  type: {
    name: "Composite",
    className: "ManifestsCreateHeaders",
    modelProperties: {
      dockerContentDigest: {
        serializedName: "docker-content-digest",
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
      contentLength: {
        serializedName: "content-length",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const BlobGetHeaders: coreHttp.CompositeMapper = {
  serializedName: "blob_getHeaders",
  type: {
    name: "Composite",
    className: "BlobGetHeaders",
    modelProperties: {
      contentLength: {
        serializedName: "content-length",
        type: {
          name: "Number"
        }
      },
      dockerContentDigest: {
        serializedName: "docker-content-digest",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const BlobCheckHeaders: coreHttp.CompositeMapper = {
  serializedName: "blob_checkHeaders",
  type: {
    name: "Composite",
    className: "BlobCheckHeaders",
    modelProperties: {
      contentLength: {
        serializedName: "content-length",
        type: {
          name: "Number"
        }
      },
      dockerContentDigest: {
        serializedName: "docker-content-digest",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const BlobDeleteHeaders: coreHttp.CompositeMapper = {
  serializedName: "blob_deleteHeaders",
  type: {
    name: "Composite",
    className: "BlobDeleteHeaders",
    modelProperties: {
      dockerContentDigest: {
        serializedName: "docker-content-digest",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const BlobMountHeaders: coreHttp.CompositeMapper = {
  serializedName: "blob_mountHeaders",
  type: {
    name: "Composite",
    className: "BlobMountHeaders",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      dockerUploadUuid: {
        serializedName: "docker-upload-uuid",
        type: {
          name: "String"
        }
      },
      dockerContentDigest: {
        serializedName: "docker-content-digest",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const BlobGetStatusHeaders: coreHttp.CompositeMapper = {
  serializedName: "blob_getStatusHeaders",
  type: {
    name: "Composite",
    className: "BlobGetStatusHeaders",
    modelProperties: {
      range: {
        serializedName: "range",
        type: {
          name: "String"
        }
      },
      dockerUploadUuid: {
        serializedName: "docker-upload-uuid",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const BlobUploadHeaders: coreHttp.CompositeMapper = {
  serializedName: "blob_uploadHeaders",
  type: {
    name: "Composite",
    className: "BlobUploadHeaders",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      range: {
        serializedName: "range",
        type: {
          name: "String"
        }
      },
      dockerUploadUuid: {
        serializedName: "docker-upload-uuid",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const BlobEndUploadHeaders: coreHttp.CompositeMapper = {
  serializedName: "blob_endUploadHeaders",
  type: {
    name: "Composite",
    className: "BlobEndUploadHeaders",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      range: {
        serializedName: "range",
        type: {
          name: "String"
        }
      },
      dockerContentDigest: {
        serializedName: "docker-content-digest",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const BlobStartUploadHeaders: coreHttp.CompositeMapper = {
  serializedName: "blob_startUploadHeaders",
  type: {
    name: "Composite",
    className: "BlobStartUploadHeaders",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      range: {
        serializedName: "range",
        type: {
          name: "String"
        }
      },
      dockerUploadUuid: {
        serializedName: "docker-upload-uuid",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const BlobGetChunkHeaders: coreHttp.CompositeMapper = {
  serializedName: "blob_getChunkHeaders",
  type: {
    name: "Composite",
    className: "BlobGetChunkHeaders",
    modelProperties: {
      contentLength: {
        serializedName: "content-length",
        type: {
          name: "Number"
        }
      },
      contentRange: {
        serializedName: "content-range",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const BlobCheckChunkHeaders: coreHttp.CompositeMapper = {
  serializedName: "blob_checkChunkHeaders",
  type: {
    name: "Composite",
    className: "BlobCheckChunkHeaders",
    modelProperties: {
      contentLength: {
        serializedName: "content-length",
        type: {
          name: "Number"
        }
      },
      contentRange: {
        serializedName: "content-range",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const RepositoryGetListHeaders: coreHttp.CompositeMapper = {
  serializedName: "repository_getListHeaders",
  type: {
    name: "Composite",
    className: "RepositoryGetListHeaders",
    modelProperties: {
      link: {
        serializedName: "link",
        type: {
          name: "String"
        }
      }
    }
  }
};
