/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const MetadataEntity: coreHttp.CompositeMapper = {
  serializedName: "MetadataEntity",
  type: {
    name: "Composite",
    className: "MetadataEntity",
    modelProperties: {
      id: {
        serializedName: "id",
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
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
      displayName: {
        serializedName: "properties.displayName",
        type: {
          name: "String"
        }
      },
      dependsOn: {
        serializedName: "properties.dependsOn",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataEntityPropertiesDependsOnItem"
          }
        }
      },
      applicableScenarios: {
        serializedName: "properties.applicableScenarios",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "Scenario",
            defaultValue: "Alerts",
            isConstant: true
          }
        }
      },
      supportedValues: {
        serializedName: "properties.supportedValues",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "MetadataSupportedValueDetail"
            }
          }
        }
      }
    }
  }
};

export const MetadataSupportedValueDetail: coreHttp.CompositeMapper = {
  serializedName: "MetadataSupportedValueDetail",
  type: {
    name: "Composite",
    className: "MetadataSupportedValueDetail",
    modelProperties: {
      id: {
        serializedName: "id",
        type: {
          name: "String"
        }
      },
      displayName: {
        serializedName: "displayName",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ARMErrorResponseBody: coreHttp.CompositeMapper = {
  serializedName: "ARMErrorResponseBody",
  type: {
    name: "Composite",
    className: "ARMErrorResponseBody",
    modelProperties: {
      message: {
        serializedName: "message",
        type: {
          name: "String"
        }
      },
      code: {
        serializedName: "code",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const MetadataEntityListResult: coreHttp.CompositeMapper = {
  serializedName: "MetadataEntityListResult",
  type: {
    name: "Composite",
    className: "MetadataEntityListResult",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "MetadataEntity" } }
        }
      },
      nextLink: {
        serializedName: "nextLink",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ConfigurationListResult: coreHttp.CompositeMapper = {
  serializedName: "ConfigurationListResult",
  type: {
    name: "Composite",
    className: "ConfigurationListResult",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "ConfigData" } }
        }
      },
      nextLink: {
        serializedName: "nextLink",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Resource: coreHttp.CompositeMapper = {
  serializedName: "Resource",
  type: {
    name: "Composite",
    className: "Resource",
    modelProperties: {
      id: {
        serializedName: "id",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ConfigData: coreHttp.CompositeMapper = {
  serializedName: "ConfigData",
  type: {
    name: "Composite",
    className: "ConfigData",
    modelProperties: {
      ...Resource.type.modelProperties,
      exclude: {
        serializedName: "properties.exclude",
        type: {
          name: "Boolean"
        }
      },
      lowCpuThreshold: {
        serializedName: "properties.lowCpuThreshold",
        type: {
          name: "String"
        }
      },
      digests: {
        serializedName: "properties.digests",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "DigestConfig" } }
        }
      }
    }
  }
};

export const DigestConfig: coreHttp.CompositeMapper = {
  serializedName: "DigestConfig",
  type: {
    name: "Composite",
    className: "DigestConfig",
    modelProperties: {
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      actionGroupResourceId: {
        serializedName: "actionGroupResourceId",
        type: {
          name: "String"
        }
      },
      frequency: {
        serializedName: "frequency",
        type: {
          name: "Number"
        }
      },
      categories: {
        serializedName: "categories",
        type: {
          name: "Sequence",
          element: { type: { name: "String" }, serializedName: "Category" }
        }
      },
      language: {
        serializedName: "language",
        type: {
          name: "String"
        }
      },
      state: {
        serializedName: "state",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ArmErrorResponse: coreHttp.CompositeMapper = {
  serializedName: "ArmErrorResponse",
  type: {
    name: "Composite",
    className: "ArmErrorResponse",
    modelProperties: {
      error: {
        serializedName: "error",
        type: {
          name: "Composite",
          className: "ARMErrorResponseBody"
        }
      }
    }
  }
};

export const ResourceRecommendationBaseListResult: coreHttp.CompositeMapper = {
  serializedName: "ResourceRecommendationBaseListResult",
  type: {
    name: "Composite",
    className: "ResourceRecommendationBaseListResult",
    modelProperties: {
      nextLink: {
        serializedName: "nextLink",
        type: {
          name: "String"
        }
      },
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "ResourceRecommendationBase" }
          }
        }
      }
    }
  }
};

export const ResourceRecommendationBase: coreHttp.CompositeMapper = {
  serializedName: "ResourceRecommendationBase",
  type: {
    name: "Composite",
    className: "ResourceRecommendationBase",
    modelProperties: {
      ...Resource.type.modelProperties,
      category: {
        serializedName: "properties.category",
        type: {
          name: "String"
        }
      },
      impact: {
        serializedName: "properties.impact",
        type: {
          name: "String"
        }
      },
      impactedField: {
        serializedName: "properties.impactedField",
        type: {
          name: "String"
        }
      },
      impactedValue: {
        serializedName: "properties.impactedValue",
        type: {
          name: "String"
        }
      },
      lastUpdated: {
        serializedName: "properties.lastUpdated",
        type: {
          name: "DateTime"
        }
      },
      metadata: {
        serializedName: "properties.metadata",
        type: {
          name: "Dictionary",
          value: { type: { name: "any" }, serializedName: "any" }
        }
      },
      recommendationTypeId: {
        serializedName: "properties.recommendationTypeId",
        type: {
          name: "String"
        }
      },
      risk: {
        serializedName: "properties.risk",
        type: {
          name: "String"
        }
      },
      shortDescription: {
        serializedName: "shortDescription",
        type: {
          name: "Composite",
          className: "ShortDescription"
        }
      },
      suppressionIds: {
        serializedName: "properties.suppressionIds",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Uuid" },
            serializedName: "RecommendationPropertiesSuppressionIdsItem"
          }
        }
      },
      extendedProperties: {
        serializedName: "properties.extendedProperties",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" }, serializedName: "String" }
        }
      },
      resourceMetadata: {
        serializedName: "resourceMetadata",
        type: {
          name: "Composite",
          className: "ResourceMetadata"
        }
      }
    }
  }
};

export const ShortDescription: coreHttp.CompositeMapper = {
  serializedName: "ShortDescription",
  type: {
    name: "Composite",
    className: "ShortDescription",
    modelProperties: {
      problem: {
        serializedName: "problem",
        type: {
          name: "String"
        }
      },
      solution: {
        serializedName: "solution",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ResourceMetadata: coreHttp.CompositeMapper = {
  serializedName: "ResourceMetadata",
  type: {
    name: "Composite",
    className: "ResourceMetadata",
    modelProperties: {
      resourceId: {
        serializedName: "resourceId",
        type: {
          name: "String"
        }
      },
      source: {
        serializedName: "source",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const OperationEntityListResult: coreHttp.CompositeMapper = {
  serializedName: "OperationEntityListResult",
  type: {
    name: "Composite",
    className: "OperationEntityListResult",
    modelProperties: {
      nextLink: {
        serializedName: "nextLink",
        type: {
          name: "String"
        }
      },
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "OperationEntity" } }
        }
      }
    }
  }
};

export const OperationEntity: coreHttp.CompositeMapper = {
  serializedName: "OperationEntity",
  type: {
    name: "Composite",
    className: "OperationEntity",
    modelProperties: {
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      display: {
        serializedName: "display",
        type: {
          name: "Composite",
          className: "OperationDisplayInfo"
        }
      }
    }
  }
};

export const OperationDisplayInfo: coreHttp.CompositeMapper = {
  serializedName: "OperationDisplayInfo",
  type: {
    name: "Composite",
    className: "OperationDisplayInfo",
    modelProperties: {
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      operation: {
        serializedName: "operation",
        type: {
          name: "String"
        }
      },
      provider: {
        serializedName: "provider",
        type: {
          name: "String"
        }
      },
      resource: {
        serializedName: "resource",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SuppressionContract: coreHttp.CompositeMapper = {
  serializedName: "SuppressionContract",
  type: {
    name: "Composite",
    className: "SuppressionContract",
    modelProperties: {
      ...Resource.type.modelProperties,
      suppressionId: {
        serializedName: "properties.suppressionId",
        type: {
          name: "String"
        }
      },
      ttl: {
        serializedName: "properties.ttl",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SuppressionContractListResult: coreHttp.CompositeMapper = {
  serializedName: "SuppressionContractListResult",
  type: {
    name: "Composite",
    className: "SuppressionContractListResult",
    modelProperties: {
      nextLink: {
        serializedName: "nextLink",
        type: {
          name: "String"
        }
      },
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "SuppressionContract" }
          }
        }
      }
    }
  }
};

export const RecommendationsGenerateHeaders: coreHttp.CompositeMapper = {
  serializedName: "recommendations_generateHeaders",
  type: {
    name: "Composite",
    className: "RecommendationsGenerateHeaders",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "String"
        }
      }
    }
  }
};
