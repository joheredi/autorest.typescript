/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";

export const $host: coreHttp.OperationURLParameter = {
  parameterPath: "$host",
  mapper: {
    serializedName: "$host",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const apiVersion: coreHttp.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2018-05-01",
    serializedName: "api-version",
    isConstant: true,
    type: {
      name: "String"
    }
  }
};

export const nextLink: coreHttp.OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextLink",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const subscriptionId: coreHttp.OperationURLParameter = {
  parameterPath: "subscriptionId",
  mapper: {
    serializedName: "subscriptionId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const location: coreHttp.OperationURLParameter = {
  parameterPath: "location",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[-w._]+$")
    },
    serializedName: "location",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const maxResults: coreHttp.OperationQueryParameter = {
  parameterPath: ["workspacesListOptions", "maxResults"],
  mapper: {
    defaultValue: 1000,
    constraints: {
      InclusiveMaximum: 1000,
      InclusiveMinimum: 1
    },
    serializedName: "maxresults",
    type: {
      name: "Number"
    }
  }
};

export const resourceGroupName: coreHttp.OperationURLParameter = {
  parameterPath: "resourceGroupName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[-w._]+$")
    },
    serializedName: "resourceGroupName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const maxResults1: coreHttp.OperationQueryParameter = {
  parameterPath: ["workspacesListByResourceGroupOptions", "maxResults"],
  mapper: {
    defaultValue: 1000,
    constraints: {
      InclusiveMaximum: 1000,
      InclusiveMinimum: 1
    },
    serializedName: "maxresults",
    type: {
      name: "Number"
    }
  }
};

export const contentType: coreHttp.OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json",
    serializedName: "Content-Type",
    isConstant: true,
    type: {
      name: "String"
    }
  }
};

export const parameters: coreHttp.OperationParameter = {
  parameterPath: "parameters",
  mapper: Mappers.WorkspaceCreateParameters
};

export const workspaceName: coreHttp.OperationURLParameter = {
  parameterPath: "workspaceName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[-w_]+$"),
      MaxLength: 64,
      MinLength: 1
    },
    serializedName: "workspaceName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters1: coreHttp.OperationParameter = {
  parameterPath: "parameters",
  mapper: Mappers.WorkspaceUpdateParameters
};

export const nextLink1: coreHttp.OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextLink",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const maxResults2: coreHttp.OperationQueryParameter = {
  parameterPath: ["experimentsListByWorkspaceOptions", "maxResults"],
  mapper: {
    defaultValue: 1000,
    constraints: {
      InclusiveMaximum: 1000,
      InclusiveMinimum: 1
    },
    serializedName: "maxresults",
    type: {
      name: "Number"
    }
  }
};

export const experimentName: coreHttp.OperationURLParameter = {
  parameterPath: "experimentName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[-w_]+$"),
      MaxLength: 64,
      MinLength: 1
    },
    serializedName: "experimentName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const nextLink2: coreHttp.OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextLink",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const maxResults3: coreHttp.OperationQueryParameter = {
  parameterPath: ["jobsListByExperimentOptions", "maxResults"],
  mapper: {
    defaultValue: 1000,
    constraints: {
      InclusiveMaximum: 1000,
      InclusiveMinimum: 1
    },
    serializedName: "maxresults",
    type: {
      name: "Number"
    }
  }
};

export const parameters2: coreHttp.OperationParameter = {
  parameterPath: "parameters",
  mapper: Mappers.JobCreateParameters
};

export const jobName: coreHttp.OperationURLParameter = {
  parameterPath: "jobName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[-w_]+$"),
      MaxLength: 64,
      MinLength: 1
    },
    serializedName: "jobName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const outputdirectoryid: coreHttp.OperationQueryParameter = {
  parameterPath: ["jobsListOutputFilesOptions", "outputdirectoryid"],
  mapper: {
    serializedName: "outputdirectoryid",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const directory: coreHttp.OperationQueryParameter = {
  parameterPath: ["jobsListOutputFilesOptions", "directory"],
  mapper: {
    defaultValue: ".",
    serializedName: "directory",
    type: {
      name: "String"
    }
  }
};

export const linkexpiryinminutes: coreHttp.OperationQueryParameter = {
  parameterPath: ["jobsListOutputFilesOptions", "linkexpiryinminutes"],
  mapper: {
    defaultValue: 60,
    constraints: {
      InclusiveMaximum: 600,
      InclusiveMinimum: 5
    },
    serializedName: "linkexpiryinminutes",
    type: {
      name: "Number"
    }
  }
};

export const maxResults4: coreHttp.OperationQueryParameter = {
  parameterPath: ["jobsListOutputFilesOptions", "maxResults"],
  mapper: {
    defaultValue: 1000,
    constraints: {
      InclusiveMaximum: 1000,
      InclusiveMinimum: 1
    },
    serializedName: "maxresults",
    type: {
      name: "Number"
    }
  }
};

export const nextLink3: coreHttp.OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextLink",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const nextLink4: coreHttp.OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextLink",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const nextLink5: coreHttp.OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextLink",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const parameters3: coreHttp.OperationParameter = {
  parameterPath: "parameters",
  mapper: Mappers.FileServerCreateParameters
};

export const fileServerName: coreHttp.OperationURLParameter = {
  parameterPath: "fileServerName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[-w_]+$"),
      MaxLength: 64,
      MinLength: 1
    },
    serializedName: "fileServerName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const maxResults5: coreHttp.OperationQueryParameter = {
  parameterPath: ["fileServersListByWorkspaceOptions", "maxResults"],
  mapper: {
    defaultValue: 1000,
    constraints: {
      InclusiveMaximum: 1000,
      InclusiveMinimum: 1
    },
    serializedName: "maxresults",
    type: {
      name: "Number"
    }
  }
};

export const parameters4: coreHttp.OperationParameter = {
  parameterPath: "parameters",
  mapper: Mappers.ClusterCreateParameters
};

export const clusterName: coreHttp.OperationURLParameter = {
  parameterPath: "clusterName",
  mapper: {
    constraints: {
      Pattern: new RegExp("^[-w_]+$"),
      MaxLength: 64,
      MinLength: 1
    },
    serializedName: "clusterName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters5: coreHttp.OperationParameter = {
  parameterPath: "parameters",
  mapper: Mappers.ClusterUpdateParameters
};

export const maxResults6: coreHttp.OperationQueryParameter = {
  parameterPath: ["clustersListByWorkspaceOptions", "maxResults"],
  mapper: {
    defaultValue: 1000,
    constraints: {
      InclusiveMaximum: 1000,
      InclusiveMinimum: 1
    },
    serializedName: "maxresults",
    type: {
      name: "Number"
    }
  }
};
