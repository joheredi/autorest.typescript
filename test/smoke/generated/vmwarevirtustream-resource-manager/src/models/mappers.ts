/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const OperationList: coreHttp.CompositeMapper = {
  serializedName: "OperationList",
  type: {
    name: "Composite",
    className: "OperationList",
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
        readOnly: true,
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
      display: {
        serializedName: "display",
        type: {
          name: "Composite",
          className: "OperationDisplay"
        }
      }
    }
  }
};

export const OperationDisplay: coreHttp.CompositeMapper = {
  serializedName: "OperationDisplay",
  type: {
    name: "Composite",
    className: "OperationDisplay",
    modelProperties: {
      provider: {
        serializedName: "provider",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      resource: {
        serializedName: "resource",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      operation: {
        serializedName: "operation",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "description",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ApiError: coreHttp.CompositeMapper = {
  serializedName: "ApiError",
  type: {
    name: "Composite",
    className: "ApiError",
    modelProperties: {
      error: {
        serializedName: "error",
        type: {
          name: "Composite",
          className: "ApiErrorBase"
        }
      }
    }
  }
};

export const ApiErrorBase: coreHttp.CompositeMapper = {
  serializedName: "ApiErrorBase",
  type: {
    name: "Composite",
    className: "ApiErrorBase",
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
      }
    }
  }
};

export const PrivateCloudList: coreHttp.CompositeMapper = {
  serializedName: "PrivateCloudList",
  type: {
    name: "Composite",
    className: "PrivateCloudList",
    modelProperties: {
      value: {
        serializedName: "value",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "PrivateCloud" } }
        }
      },
      nextLink: {
        serializedName: "nextLink",
        readOnly: true,
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

export const TrackedResource: coreHttp.CompositeMapper = {
  serializedName: "TrackedResource",
  type: {
    name: "Composite",
    className: "TrackedResource",
    modelProperties: {
      ...Resource.type.modelProperties,
      location: {
        serializedName: "location",
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
      }
    }
  }
};

export const PrivateCloud: coreHttp.CompositeMapper = {
  serializedName: "PrivateCloud",
  type: {
    name: "Composite",
    className: "PrivateCloud",
    modelProperties: {
      ...TrackedResource.type.modelProperties,
      properties: {
        serializedName: "properties",
        type: {
          name: "Composite",
          className: "PrivateCloudProperties"
        }
      }
    }
  }
};

export const PrivateCloudProperties: coreHttp.CompositeMapper = {
  serializedName: "PrivateCloudProperties",
  type: {
    name: "Composite",
    className: "PrivateCloudProperties",
    modelProperties: {
      provisioningState: {
        serializedName: "provisioningState",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      circuit: {
        serializedName: "circuit",
        type: {
          name: "Composite",
          className: "Circuit"
        }
      },
      cluster: {
        serializedName: "cluster",
        type: {
          name: "Composite",
          className: "DefaultClusterProperties"
        }
      },
      clusters: {
        serializedName: "clusters",
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "PrivateCloudPropertiesClustersItem"
          }
        }
      },
      endpoints: {
        serializedName: "endpoints",
        type: {
          name: "Composite",
          className: "Endpoints"
        }
      },
      internet: {
        serializedName: "internet",
        type: {
          name: "String"
        }
      },
      identitySources: {
        serializedName: "identitySources",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "IdentitySource" } }
        }
      },
      networkBlock: {
        serializedName: "networkBlock",
        type: {
          name: "String"
        }
      },
      managementNetwork: {
        serializedName: "managementNetwork",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      provisioningNetwork: {
        serializedName: "provisioningNetwork",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      vmotionNetwork: {
        serializedName: "vmotionNetwork",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      vcenterPassword: {
        serializedName: "vcenterPassword",
        type: {
          name: "String"
        }
      },
      nsxtPassword: {
        serializedName: "nsxtPassword",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Circuit: coreHttp.CompositeMapper = {
  serializedName: "Circuit",
  type: {
    name: "Composite",
    className: "Circuit",
    modelProperties: {
      primarySubnet: {
        serializedName: "primarySubnet",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      secondarySubnet: {
        serializedName: "secondarySubnet",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      expressRouteID: {
        serializedName: "expressRouteID",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      authorizations: {
        serializedName: "authorizations",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "ExpressRouteAuthorization" }
          }
        }
      },
      expressRoutePrivatePeeringID: {
        serializedName: "expressRoutePrivatePeeringID",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ExpressRouteAuthorization: coreHttp.CompositeMapper = {
  serializedName: "ExpressRouteAuthorization",
  type: {
    name: "Composite",
    className: "ExpressRouteAuthorization",
    modelProperties: {
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      id: {
        serializedName: "id",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      key: {
        serializedName: "key",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DefaultClusterProperties: coreHttp.CompositeMapper = {
  serializedName: "DefaultClusterProperties",
  type: {
    name: "Composite",
    className: "DefaultClusterProperties",
    modelProperties: {
      clusterId: {
        serializedName: "clusterId",
        readOnly: true,
        type: {
          name: "Number"
        }
      },
      clusterSize: {
        serializedName: "clusterSize",
        type: {
          name: "Number"
        }
      },
      hosts: {
        serializedName: "hosts",
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "DefaultClusterPropertiesHostsItem"
          }
        }
      }
    }
  }
};

export const Endpoints: coreHttp.CompositeMapper = {
  serializedName: "Endpoints",
  type: {
    name: "Composite",
    className: "Endpoints",
    modelProperties: {
      nsxtManager: {
        serializedName: "nsxtManager",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      vcsa: {
        serializedName: "vcsa",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const IdentitySource: coreHttp.CompositeMapper = {
  serializedName: "IdentitySource",
  type: {
    name: "Composite",
    className: "IdentitySource",
    modelProperties: {
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      alias: {
        serializedName: "alias",
        type: {
          name: "String"
        }
      },
      domain: {
        serializedName: "domain",
        type: {
          name: "String"
        }
      },
      baseUserDN: {
        serializedName: "baseUserDN",
        type: {
          name: "String"
        }
      },
      baseGroupDN: {
        serializedName: "baseGroupDN",
        type: {
          name: "String"
        }
      },
      primaryServer: {
        serializedName: "primaryServer",
        type: {
          name: "String"
        }
      },
      secondaryServer: {
        serializedName: "secondaryServer",
        type: {
          name: "String"
        }
      },
      ssl: {
        serializedName: "ssl",
        type: {
          name: "String"
        }
      },
      username: {
        serializedName: "username",
        type: {
          name: "String"
        }
      },
      password: {
        serializedName: "password",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ClusterList: coreHttp.CompositeMapper = {
  serializedName: "ClusterList",
  type: {
    name: "Composite",
    className: "ClusterList",
    modelProperties: {
      value: {
        serializedName: "value",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Cluster" } }
        }
      },
      nextLink: {
        serializedName: "nextLink",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Cluster: coreHttp.CompositeMapper = {
  serializedName: "Cluster",
  type: {
    name: "Composite",
    className: "Cluster",
    modelProperties: {
      ...Resource.type.modelProperties,
      properties: {
        serializedName: "properties",
        type: {
          name: "Composite",
          className: "ClusterProperties"
        }
      }
    }
  }
};

export const ClusterProperties: coreHttp.CompositeMapper = {
  serializedName: "ClusterProperties",
  type: {
    name: "Composite",
    className: "ClusterProperties",
    modelProperties: {
      ...DefaultClusterProperties.type.modelProperties,
      provisioningState: {
        serializedName: "provisioningState",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const AdminCredentials: coreHttp.CompositeMapper = {
  serializedName: "AdminCredentials",
  type: {
    name: "Composite",
    className: "AdminCredentials",
    modelProperties: {
      nsxtUsername: {
        serializedName: "nsxtUsername",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      nsxtPassword: {
        serializedName: "nsxtPassword",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      vcenterUsername: {
        serializedName: "vcenterUsername",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      vcenterPassword: {
        serializedName: "vcenterPassword",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};
