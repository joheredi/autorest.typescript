/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const QueryBody: coreHttp.CompositeMapper = {
  serializedName: "QueryBody",
  type: {
    name: "Composite",
    className: "QueryBody",
    modelProperties: {
      query: {
        serializedName: "query",
        required: true,
        type: {
          name: "String"
        }
      },
      timespan: {
        serializedName: "timespan",
        type: {
          name: "String"
        }
      },
      workspaces: {
        serializedName: "workspaces",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "WorkspacesParamItem"
          }
        }
      }
    }
  }
};

export const QueryResults: coreHttp.CompositeMapper = {
  serializedName: "QueryResults",
  type: {
    name: "Composite",
    className: "QueryResults",
    modelProperties: {
      tables: {
        serializedName: "tables",
        required: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Table" } }
        }
      }
    }
  }
};

export const Table: coreHttp.CompositeMapper = {
  serializedName: "Table",
  type: {
    name: "Composite",
    className: "Table",
    modelProperties: {
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      columns: {
        serializedName: "columns",
        required: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Column" } }
        }
      },
      rows: {
        serializedName: "rows",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Sequence",
              element: {
                type: { name: "String" },
                serializedName: "TableRowsItemsItem"
              }
            },
            serializedName: "TableRowsItem"
          }
        }
      }
    }
  }
};

export const Column: coreHttp.CompositeMapper = {
  serializedName: "Column",
  type: {
    name: "Composite",
    className: "Column",
    modelProperties: {
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ErrorResponse: coreHttp.CompositeMapper = {
  serializedName: "ErrorResponse",
  type: {
    name: "Composite",
    className: "ErrorResponse",
    modelProperties: {
      error: {
        serializedName: "error",
        type: {
          name: "Composite",
          className: "ErrorInfo"
        }
      }
    }
  }
};

export const ErrorInfo: coreHttp.CompositeMapper = {
  serializedName: "ErrorInfo",
  type: {
    name: "Composite",
    className: "ErrorInfo",
    modelProperties: {
      code: {
        serializedName: "code",
        required: true,
        type: {
          name: "String"
        }
      },
      message: {
        serializedName: "message",
        required: true,
        type: {
          name: "String"
        }
      },
      details: {
        serializedName: "details",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "ErrorDetail" } }
        }
      },
      innererror: {
        serializedName: "innererror",
        type: {
          name: "Composite",
          className: "ErrorInfo"
        }
      },
      additionalProperties: {
        serializedName: "additionalProperties",
        type: {
          name: "any"
        }
      }
    }
  }
};

export const ErrorDetail: coreHttp.CompositeMapper = {
  serializedName: "ErrorDetail",
  type: {
    name: "Composite",
    className: "ErrorDetail",
    modelProperties: {
      code: {
        serializedName: "code",
        required: true,
        type: {
          name: "String"
        }
      },
      message: {
        serializedName: "message",
        required: true,
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
      value: {
        serializedName: "value",
        type: {
          name: "String"
        }
      },
      resources: {
        serializedName: "resources",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "ErrorDetailResourcesItem"
          }
        }
      },
      additionalProperties: {
        serializedName: "additionalProperties",
        type: {
          name: "any"
        }
      }
    }
  }
};

export const MetadataResults: coreHttp.CompositeMapper = {
  serializedName: "MetadataResults",
  type: {
    name: "Composite",
    className: "MetadataResults",
    modelProperties: {
      categories: {
        constraints: {
          UniqueItems: true
        },
        serializedName: "categories",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "MetadataCategory" }
          }
        }
      },
      resourceTypes: {
        constraints: {
          UniqueItems: true
        },
        serializedName: "resourceTypes",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "MetadataResourceType" }
          }
        }
      },
      solutions: {
        constraints: {
          UniqueItems: true
        },
        serializedName: "solutions",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "MetadataSolution" }
          }
        }
      },
      tables: {
        constraints: {
          UniqueItems: true
        },
        serializedName: "tables",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "MetadataTable" } }
        }
      },
      functions: {
        constraints: {
          UniqueItems: true
        },
        serializedName: "functions",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "MetadataFunction" }
          }
        }
      },
      queries: {
        constraints: {
          UniqueItems: true
        },
        serializedName: "queries",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "MetadataQuery" } }
        }
      },
      applications: {
        constraints: {
          UniqueItems: true
        },
        serializedName: "applications",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "MetadataApplication" }
          }
        }
      },
      workspaces: {
        constraints: {
          UniqueItems: true
        },
        serializedName: "workspaces",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "MetadataWorkspace" }
          }
        }
      },
      resources: {
        constraints: {
          UniqueItems: true
        },
        serializedName: "resources",
        type: {
          name: "Sequence",
          element: { type: { name: "any" }, serializedName: "any" }
        }
      },
      permissions: {
        constraints: {
          UniqueItems: true
        },
        serializedName: "permissions",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "MetadataPermissions" }
          }
        }
      }
    }
  }
};

export const MetadataCategory: coreHttp.CompositeMapper = {
  serializedName: "MetadataCategory",
  type: {
    name: "Composite",
    className: "MetadataCategory",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      displayName: {
        serializedName: "displayName",
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
      related: {
        serializedName: "related",
        type: {
          name: "Composite",
          className: "MetadataCategoryRelated"
        }
      }
    }
  }
};

export const MetadataCategoryRelated: coreHttp.CompositeMapper = {
  serializedName: "MetadataCategoryRelated",
  type: {
    name: "Composite",
    className: "MetadataCategoryRelated",
    modelProperties: {
      tables: {
        serializedName: "tables",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataCategoryRelatedTablesItem"
          }
        }
      },
      functions: {
        serializedName: "functions",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataCategoryRelatedFunctionsItem"
          }
        }
      },
      resourceTypes: {
        serializedName: "resourceTypes",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataCategoryRelatedResourceTypesItem"
          }
        }
      },
      queries: {
        serializedName: "queries",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataCategoryRelatedQueriesItem"
          }
        }
      },
      solutions: {
        serializedName: "solutions",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataCategoryRelatedSolutionsItem"
          }
        }
      }
    }
  }
};

export const MetadataResourceType: coreHttp.CompositeMapper = {
  serializedName: "MetadataResourceType",
  type: {
    name: "Composite",
    className: "MetadataResourceType",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
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
      },
      labels: {
        serializedName: "labels",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataResourceTypeLabelsItem"
          }
        }
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "any"
        }
      },
      properties: {
        serializedName: "properties",
        type: {
          name: "any"
        }
      },
      related: {
        serializedName: "related",
        type: {
          name: "Composite",
          className: "MetadataResourceTypeRelated"
        }
      }
    }
  }
};

export const MetadataResourceTypeRelated: coreHttp.CompositeMapper = {
  serializedName: "MetadataResourceTypeRelated",
  type: {
    name: "Composite",
    className: "MetadataResourceTypeRelated",
    modelProperties: {
      tables: {
        serializedName: "tables",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataResourceTypeRelatedTablesItem"
          }
        }
      },
      functions: {
        serializedName: "functions",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataResourceTypeRelatedFunctionsItem"
          }
        }
      },
      categories: {
        serializedName: "categories",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataResourceTypeRelatedCategoriesItem"
          }
        }
      },
      queries: {
        serializedName: "queries",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataResourceTypeRelatedQueriesItem"
          }
        }
      },
      workspaces: {
        serializedName: "workspaces",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataResourceTypeRelatedWorkspacesItem"
          }
        }
      },
      resources: {
        serializedName: "resources",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataResourceTypeRelatedResourcesItem"
          }
        }
      }
    }
  }
};

export const MetadataSolution: coreHttp.CompositeMapper = {
  serializedName: "MetadataSolution",
  type: {
    name: "Composite",
    className: "MetadataSolution",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
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
      },
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
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "any"
        }
      },
      properties: {
        serializedName: "properties",
        type: {
          name: "any"
        }
      },
      related: {
        serializedName: "related",
        type: {
          name: "Composite",
          className: "MetadataSolutionRelated"
        }
      }
    }
  }
};

export const MetadataSolutionRelated: coreHttp.CompositeMapper = {
  serializedName: "MetadataSolutionRelated",
  type: {
    name: "Composite",
    className: "MetadataSolutionRelated",
    modelProperties: {
      tables: {
        serializedName: "tables",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataSolutionRelatedTablesItem"
          }
        }
      },
      functions: {
        serializedName: "functions",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataSolutionRelatedFunctionsItem"
          }
        }
      },
      categories: {
        serializedName: "categories",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataSolutionRelatedCategoriesItem"
          }
        }
      },
      queries: {
        serializedName: "queries",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataSolutionRelatedQueriesItem"
          }
        }
      },
      workspaces: {
        serializedName: "workspaces",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataSolutionRelatedWorkspacesItem"
          }
        }
      }
    }
  }
};

export const MetadataTable: coreHttp.CompositeMapper = {
  serializedName: "MetadataTable",
  type: {
    name: "Composite",
    className: "MetadataTable",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
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
      },
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      timespanColumn: {
        serializedName: "timespanColumn",
        type: {
          name: "String"
        }
      },
      labels: {
        serializedName: "labels",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataTableLabelsItem"
          }
        }
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "any"
        }
      },
      properties: {
        serializedName: "properties",
        type: {
          name: "any"
        }
      },
      columns: {
        serializedName: "columns",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "MetadataTableColumnsItem" }
          }
        }
      },
      related: {
        serializedName: "related",
        type: {
          name: "Composite",
          className: "MetadataTableRelated"
        }
      }
    }
  }
};

export const MetadataTableColumnsItem: coreHttp.CompositeMapper = {
  serializedName: "MetadataTableColumnsItem",
  type: {
    name: "Composite",
    className: "MetadataTableColumnsItem",
    modelProperties: {
      name: {
        serializedName: "name",
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
      isPreferredFacet: {
        serializedName: "isPreferredFacet",
        type: {
          name: "Boolean"
        }
      },
      source: {
        serializedName: "source",
        type: {
          name: "any"
        }
      }
    }
  }
};

export const MetadataTableRelated: coreHttp.CompositeMapper = {
  serializedName: "MetadataTableRelated",
  type: {
    name: "Composite",
    className: "MetadataTableRelated",
    modelProperties: {
      categories: {
        serializedName: "categories",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataTableRelatedCategoriesItem"
          }
        }
      },
      solutions: {
        serializedName: "solutions",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataTableRelatedSolutionsItem"
          }
        }
      },
      resourceTypes: {
        serializedName: "resourceTypes",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataTableRelatedResourceTypesItem"
          }
        }
      },
      workspaces: {
        serializedName: "workspaces",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataTableRelatedWorkspacesItem"
          }
        }
      },
      functions: {
        serializedName: "functions",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataTableRelatedFunctionsItem"
          }
        }
      },
      queries: {
        serializedName: "queries",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataTableRelatedQueriesItem"
          }
        }
      }
    }
  }
};

export const MetadataFunction: coreHttp.CompositeMapper = {
  serializedName: "MetadataFunction",
  type: {
    name: "Composite",
    className: "MetadataFunction",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
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
      },
      parameters: {
        serializedName: "parameters",
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
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      body: {
        serializedName: "body",
        required: true,
        type: {
          name: "String"
        }
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "any"
        }
      },
      properties: {
        serializedName: "properties",
        type: {
          name: "any"
        }
      },
      related: {
        serializedName: "related",
        type: {
          name: "Composite",
          className: "MetadataFunctionRelated"
        }
      }
    }
  }
};

export const MetadataFunctionRelated: coreHttp.CompositeMapper = {
  serializedName: "MetadataFunctionRelated",
  type: {
    name: "Composite",
    className: "MetadataFunctionRelated",
    modelProperties: {
      tables: {
        serializedName: "tables",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataFunctionRelatedTablesItem"
          }
        }
      },
      solutions: {
        serializedName: "solutions",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataFunctionRelatedSolutionsItem"
          }
        }
      },
      resourceTypes: {
        serializedName: "resourceTypes",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataFunctionRelatedResourceTypesItem"
          }
        }
      },
      categories: {
        serializedName: "categories",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataFunctionRelatedCategoriesItem"
          }
        }
      },
      workspaces: {
        serializedName: "workspaces",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataFunctionRelatedWorkspacesItem"
          }
        }
      }
    }
  }
};

export const MetadataQuery: coreHttp.CompositeMapper = {
  serializedName: "MetadataQuery",
  type: {
    name: "Composite",
    className: "MetadataQuery",
    modelProperties: {
      id: {
        serializedName: "id",
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
      description: {
        serializedName: "description",
        type: {
          name: "String"
        }
      },
      body: {
        serializedName: "body",
        required: true,
        type: {
          name: "String"
        }
      },
      labels: {
        serializedName: "labels",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataQueryLabelsItem"
          }
        }
      },
      tags: {
        serializedName: "tags",
        type: {
          name: "any"
        }
      },
      properties: {
        serializedName: "properties",
        type: {
          name: "any"
        }
      },
      related: {
        serializedName: "related",
        type: {
          name: "Composite",
          className: "MetadataQueryRelated"
        }
      }
    }
  }
};

export const MetadataQueryRelated: coreHttp.CompositeMapper = {
  serializedName: "MetadataQueryRelated",
  type: {
    name: "Composite",
    className: "MetadataQueryRelated",
    modelProperties: {
      categories: {
        serializedName: "categories",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataQueryRelatedCategoriesItem"
          }
        }
      },
      solutions: {
        serializedName: "solutions",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataQueryRelatedSolutionsItem"
          }
        }
      },
      resourceTypes: {
        serializedName: "resourceTypes",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataQueryRelatedResourceTypesItem"
          }
        }
      },
      tables: {
        serializedName: "tables",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataQueryRelatedTablesItem"
          }
        }
      }
    }
  }
};

export const MetadataApplication: coreHttp.CompositeMapper = {
  serializedName: "MetadataApplication",
  type: {
    name: "Composite",
    className: "MetadataApplication",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      resourceId: {
        serializedName: "resourceId",
        required: true,
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
      },
      region: {
        serializedName: "region",
        required: true,
        type: {
          name: "String"
        }
      },
      related: {
        serializedName: "related",
        type: {
          name: "Composite",
          className: "MetadataApplicationRelated"
        }
      }
    }
  }
};

export const MetadataApplicationRelated: coreHttp.CompositeMapper = {
  serializedName: "MetadataApplicationRelated",
  type: {
    name: "Composite",
    className: "MetadataApplicationRelated",
    modelProperties: {
      tables: {
        serializedName: "tables",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataApplicationRelatedTablesItem"
          }
        }
      },
      functions: {
        serializedName: "functions",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataApplicationRelatedFunctionsItem"
          }
        }
      }
    }
  }
};

export const MetadataWorkspace: coreHttp.CompositeMapper = {
  serializedName: "MetadataWorkspace",
  type: {
    name: "Composite",
    className: "MetadataWorkspace",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String"
        }
      },
      resourceId: {
        serializedName: "resourceId",
        required: true,
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
      },
      region: {
        serializedName: "region",
        required: true,
        type: {
          name: "String"
        }
      },
      related: {
        serializedName: "related",
        type: {
          name: "Composite",
          className: "MetadataWorkspaceRelated"
        }
      }
    }
  }
};

export const MetadataWorkspaceRelated: coreHttp.CompositeMapper = {
  serializedName: "MetadataWorkspaceRelated",
  type: {
    name: "Composite",
    className: "MetadataWorkspaceRelated",
    modelProperties: {
      tables: {
        serializedName: "tables",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataWorkspaceRelatedTablesItem"
          }
        }
      },
      solutions: {
        serializedName: "solutions",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataWorkspaceRelatedSolutionsItem"
          }
        }
      },
      resourceTypes: {
        serializedName: "resourceTypes",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataWorkspaceRelatedResourceTypesItem"
          }
        }
      },
      functions: {
        serializedName: "functions",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataWorkspaceRelatedFunctionsItem"
          }
        }
      },
      resources: {
        serializedName: "resources",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataWorkspaceRelatedResourcesItem"
          }
        }
      }
    }
  }
};

export const MetadataPermissions: coreHttp.CompositeMapper = {
  serializedName: "MetadataPermissions",
  type: {
    name: "Composite",
    className: "MetadataPermissions",
    modelProperties: {
      workspaces: {
        serializedName: "workspaces",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "MetadataPermissionsWorkspacesItem"
            }
          }
        }
      },
      resources: {
        serializedName: "resources",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "MetadataPermissionsResourcesItem"
            }
          }
        }
      },
      applications: {
        serializedName: "applications",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "MetadataPermissionsApplicationsItem"
            }
          }
        }
      }
    }
  }
};

export const MetadataPermissionsWorkspacesItem: coreHttp.CompositeMapper = {
  serializedName: "MetadataPermissionsWorkspacesItem",
  type: {
    name: "Composite",
    className: "MetadataPermissionsWorkspacesItem",
    modelProperties: {
      resourceId: {
        serializedName: "resourceId",
        required: true,
        type: {
          name: "String"
        }
      },
      denyTables: {
        serializedName: "denyTables",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataPermissionsWorkspacesPropertiesItemsItem"
          }
        }
      }
    }
  }
};

export const MetadataPermissionsResourcesItem: coreHttp.CompositeMapper = {
  serializedName: "MetadataPermissionsResourcesItem",
  type: {
    name: "Composite",
    className: "MetadataPermissionsResourcesItem",
    modelProperties: {
      resourceId: {
        serializedName: "resourceId",
        required: true,
        type: {
          name: "String"
        }
      },
      denyTables: {
        serializedName: "denyTables",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "MetadataPermissionsResourcesPropertiesItemsItem"
          }
        }
      }
    }
  }
};

export const MetadataPermissionsApplicationsItem: coreHttp.CompositeMapper = {
  serializedName: "MetadataPermissionsApplicationsItem",
  type: {
    name: "Composite",
    className: "MetadataPermissionsApplicationsItem",
    modelProperties: {
      resourceId: {
        serializedName: "resourceId",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};
