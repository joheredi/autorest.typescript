/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";

export const PolicyAssignment: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "PolicyAssignment",
    modelProperties: {
      id: {
        serializedName: "id",
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
      },
      name: {
        serializedName: "name",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      sku: {
        serializedName: "sku",
        type: {
          name: "Composite",
          className: "PolicySku"
        }
      },
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      identity: {
        serializedName: "identity",
        type: {
          name: "Composite",
          className: "Identity"
        }
      },
      displayName: {
        serializedName: "properties.displayName",
        type: {
          name: "String"
        }
      },
      policyDefinitionId: {
        serializedName: "properties.policyDefinitionId",
        type: {
          name: "String"
        }
      },
      scope: {
        serializedName: "properties.scope",
        type: {
          name: "String"
        }
      },
      notScopes: {
        serializedName: "properties.notScopes",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      },
      parameters: {
        serializedName: "properties.parameters",
        type: {
          name: "Dictionary",
          value: {
            type: { name: "Composite", className: "ParameterValuesValue" }
          }
        }
      },
      description: {
        serializedName: "properties.description",
        type: {
          name: "String"
        }
      },
      metadata: {
        serializedName: "properties.metadata",
        type: {
          name: "Dictionary",
          value: { type: { name: "any" } }
        }
      },
      enforcementMode: {
        serializedName: "properties.enforcementMode",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ParameterValuesValue: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ParameterValuesValue",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Dictionary",
          value: { type: { name: "any" } }
        }
      }
    }
  }
};

export const PolicySku: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "PolicySku",
    modelProperties: {
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      tier: {
        serializedName: "tier",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Identity: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Identity",
    modelProperties: {
      principalId: {
        serializedName: "principalId",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      tenantId: {
        serializedName: "tenantId",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        type: {
          name: "Enum",
          allowedValues: ["SystemAssigned", "None"]
        }
      }
    }
  }
};

export const CloudError: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CloudError",
    modelProperties: {
      error: {
        serializedName: "error",
        type: {
          name: "Composite",
          className: "ErrorResponse"
        }
      }
    }
  }
};

export const ErrorResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorResponse",
    modelProperties: {
      code: {
        serializedName: "code",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      message: {
        serializedName: "message",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      target: {
        serializedName: "target",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      details: {
        serializedName: "details",
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "ErrorResponse"
            }
          }
        }
      },
      additionalInfo: {
        serializedName: "additionalInfo",
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "ErrorAdditionalInfo"
            }
          }
        }
      }
    }
  }
};

export const ErrorAdditionalInfo: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorAdditionalInfo",
    modelProperties: {
      type: {
        serializedName: "type",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      info: {
        serializedName: "info",
        readOnly: true,
        type: {
          name: "Dictionary",
          value: { type: { name: "any" } }
        }
      }
    }
  }
};

export const PolicyAssignmentListResult: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "PolicyAssignmentListResult",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "PolicyAssignment"
            }
          }
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

export const PolicyDefinition: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "PolicyDefinition",
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
      },
      policyType: {
        serializedName: "properties.policyType",
        type: {
          name: "String"
        }
      },
      mode: {
        serializedName: "properties.mode",
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
      description: {
        serializedName: "properties.description",
        type: {
          name: "String"
        }
      },
      policyRule: {
        serializedName: "properties.policyRule",
        type: {
          name: "Dictionary",
          value: { type: { name: "any" } }
        }
      },
      metadata: {
        serializedName: "properties.metadata",
        type: {
          name: "Dictionary",
          value: { type: { name: "any" } }
        }
      },
      parameters: {
        serializedName: "properties.parameters",
        type: {
          name: "Dictionary",
          value: {
            type: { name: "Composite", className: "ParameterDefinitionsValue" }
          }
        }
      }
    }
  }
};

export const ParameterDefinitionsValue: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ParameterDefinitionsValue",
    modelProperties: {
      type: {
        serializedName: "type",
        type: {
          name: "String"
        }
      },
      allowedValues: {
        serializedName: "allowedValues",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Dictionary",
              value: { type: { name: "any" } }
            }
          }
        }
      },
      defaultValue: {
        serializedName: "defaultValue",
        type: {
          name: "Dictionary",
          value: { type: { name: "any" } }
        }
      },
      metadata: {
        serializedName: "metadata",
        type: {
          name: "Composite",
          className: "ParameterDefinitionsValueMetadata"
        }
      }
    }
  }
};

export const ParameterDefinitionsValueMetadata: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ParameterDefinitionsValueMetadata",
    additionalProperties: { type: { name: "Object" } },
    modelProperties: {
      displayName: {
        serializedName: "displayName",
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const PolicyDefinitionListResult: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "PolicyDefinitionListResult",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "PolicyDefinition"
            }
          }
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

export const PolicySetDefinition: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "PolicySetDefinition",
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
      },
      policyType: {
        serializedName: "properties.policyType",
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
      description: {
        serializedName: "properties.description",
        type: {
          name: "String"
        }
      },
      metadata: {
        serializedName: "properties.metadata",
        type: {
          name: "Dictionary",
          value: { type: { name: "any" } }
        }
      },
      parameters: {
        serializedName: "properties.parameters",
        type: {
          name: "Dictionary",
          value: {
            type: { name: "Composite", className: "ParameterDefinitionsValue" }
          }
        }
      },
      policyDefinitions: {
        serializedName: "properties.policyDefinitions",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "PolicyDefinitionReference"
            }
          }
        }
      },
      policyDefinitionGroups: {
        serializedName: "properties.policyDefinitionGroups",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "PolicyDefinitionGroup"
            }
          }
        }
      }
    }
  }
};

export const PolicyDefinitionReference: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "PolicyDefinitionReference",
    modelProperties: {
      policyDefinitionId: {
        serializedName: "policyDefinitionId",
        required: true,
        type: {
          name: "String"
        }
      },
      parameters: {
        serializedName: "parameters",
        type: {
          name: "Dictionary",
          value: {
            type: { name: "Composite", className: "ParameterValuesValue" }
          }
        }
      },
      policyDefinitionReferenceId: {
        serializedName: "policyDefinitionReferenceId",
        type: {
          name: "String"
        }
      },
      groupNames: {
        serializedName: "groupNames",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      }
    }
  }
};

export const PolicyDefinitionGroup: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "PolicyDefinitionGroup",
    modelProperties: {
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      displayName: {
        serializedName: "displayName",
        type: {
          name: "String"
        }
      },
      category: {
        serializedName: "category",
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      additionalMetadataId: {
        serializedName: "additionalMetadataId",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const PolicySetDefinitionListResult: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "PolicySetDefinitionListResult",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "PolicySetDefinition"
            }
          }
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