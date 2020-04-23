/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const OperationListResult: coreHttp.CompositeMapper = {
  serializedName: "OperationListResult",
  type: {
    name: "Composite",
    className: "OperationListResult",
    modelProperties: {
      value: {
        serializedName: "value",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Operation" } }
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

export const Operation: coreHttp.CompositeMapper = {
  serializedName: "Operation",
  type: {
    name: "Composite",
    className: "Operation",
    modelProperties: {
      name: {
        serializedName: "name",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      isDataAction: {
        serializedName: "isDataAction",
        type: {
          name: "String"
        }
      },
      operation: {
        serializedName: "display.operation",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      resource: {
        serializedName: "display.resource",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "display.description",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      provider: {
        serializedName: "display.provider",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const CloudError: coreHttp.CompositeMapper = {
  serializedName: "CloudError",
  type: {
    name: "Composite",
    className: "CloudError",
    modelProperties: {
      error: {
        serializedName: "error",
        type: {
          name: "Composite",
          className: "CloudErrorBody"
        }
      }
    }
  }
};

export const CloudErrorBody: coreHttp.CompositeMapper = {
  serializedName: "CloudErrorBody",
  type: {
    name: "Composite",
    className: "CloudErrorBody",
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
      target: {
        serializedName: "target",
        type: {
          name: "String"
        }
      },
      details: {
        serializedName: "details",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "CloudErrorBody" } }
        }
      }
    }
  }
};

export const PipelineTemplateDefinitionListResult: coreHttp.CompositeMapper = {
  serializedName: "PipelineTemplateDefinitionListResult",
  type: {
    name: "Composite",
    className: "PipelineTemplateDefinitionListResult",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "PipelineTemplateDefinition" }
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

export const PipelineTemplateDefinition: coreHttp.CompositeMapper = {
  serializedName: "PipelineTemplateDefinition",
  type: {
    name: "Composite",
    className: "PipelineTemplateDefinition",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
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
      inputs: {
        serializedName: "inputs",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "InputDescriptor" } }
        }
      }
    }
  }
};

export const InputDescriptor: coreHttp.CompositeMapper = {
  serializedName: "InputDescriptor",
  type: {
    name: "Composite",
    className: "InputDescriptor",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
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
      type: {
        serializedName: "type",
        required: true,
        type: {
          name: "String"
        }
      },
      possibleValues: {
        serializedName: "possibleValues",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "InputValue" } }
        }
      }
    }
  }
};

export const InputValue: coreHttp.CompositeMapper = {
  serializedName: "InputValue",
  type: {
    name: "Composite",
    className: "InputValue",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "String"
        }
      },
      displayValue: {
        serializedName: "displayValue",
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
      type: {
        serializedName: "type",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" }, serializedName: "String" }
        }
      },
      location: {
        serializedName: "location",
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
      }
    }
  }
};

export const Pipeline: coreHttp.CompositeMapper = {
  serializedName: "Pipeline",
  type: {
    name: "Composite",
    className: "Pipeline",
    modelProperties: {
      ...Resource.type.modelProperties,
      pipelineId: {
        serializedName: "properties.pipelineId",
        readOnly: true,
        type: {
          name: "Number"
        }
      },
      organization: {
        serializedName: "organization",
        type: {
          name: "Composite",
          className: "OrganizationReference"
        }
      },
      project: {
        serializedName: "project",
        type: {
          name: "Composite",
          className: "ProjectReference"
        }
      },
      bootstrapConfiguration: {
        serializedName: "bootstrapConfiguration",
        type: {
          name: "Composite",
          className: "BootstrapConfiguration"
        }
      }
    }
  }
};

export const OrganizationReference: coreHttp.CompositeMapper = {
  serializedName: "OrganizationReference",
  type: {
    name: "Composite",
    className: "OrganizationReference",
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
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ProjectReference: coreHttp.CompositeMapper = {
  serializedName: "ProjectReference",
  type: {
    name: "Composite",
    className: "ProjectReference",
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
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const BootstrapConfiguration: coreHttp.CompositeMapper = {
  serializedName: "BootstrapConfiguration",
  type: {
    name: "Composite",
    className: "BootstrapConfiguration",
    modelProperties: {
      repository: {
        serializedName: "repository",
        type: {
          name: "Composite",
          className: "CodeRepository"
        }
      },
      template: {
        serializedName: "template",
        type: {
          name: "Composite",
          className: "PipelineTemplate"
        }
      }
    }
  }
};

export const CodeRepository: coreHttp.CompositeMapper = {
  serializedName: "CodeRepository",
  type: {
    name: "Composite",
    className: "CodeRepository",
    modelProperties: {
      repositoryType: {
        serializedName: "repositoryType",
        required: true,
        type: {
          name: "String"
        }
      },
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      defaultBranch: {
        serializedName: "defaultBranch",
        required: true,
        type: {
          name: "String"
        }
      },
      authorization: {
        serializedName: "authorization",
        type: {
          name: "Composite",
          className: "Authorization"
        }
      },
      properties: {
        serializedName: "properties",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" }, serializedName: "String" }
        }
      }
    }
  }
};

export const Authorization: coreHttp.CompositeMapper = {
  serializedName: "Authorization",
  type: {
    name: "Composite",
    className: "Authorization",
    modelProperties: {
      authorizationType: {
        defaultValue: "personalAccessToken",
        serializedName: "authorizationType",
        isConstant: true,
        type: {
          name: "String"
        }
      },
      parameters: {
        serializedName: "parameters",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" }, serializedName: "String" }
        }
      }
    }
  }
};

export const PipelineTemplate: coreHttp.CompositeMapper = {
  serializedName: "PipelineTemplate",
  type: {
    name: "Composite",
    className: "PipelineTemplate",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      parameters: {
        serializedName: "parameters",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" }, serializedName: "String" }
        }
      }
    }
  }
};

export const PipelineUpdateParameters: coreHttp.CompositeMapper = {
  serializedName: "PipelineUpdateParameters",
  type: {
    name: "Composite",
    className: "PipelineUpdateParameters",
    modelProperties: {
      tags: {
        serializedName: "tags",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" }, serializedName: "String" }
        }
      }
    }
  }
};

export const PipelineListResult: coreHttp.CompositeMapper = {
  serializedName: "PipelineListResult",
  type: {
    name: "Composite",
    className: "PipelineListResult",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Pipeline" } }
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
