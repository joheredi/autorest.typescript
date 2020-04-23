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

export const filter: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "filter"],
  mapper: {
    serializedName: "$filter",
    type: {
      name: "String"
    }
  }
};

export const top: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "top"],
  mapper: {
    constraints: {
      InclusiveMinimum: 1
    },
    serializedName: "$top",
    type: {
      name: "Number"
    }
  }
};

export const skip: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "skip"],
  mapper: {
    constraints: {
      InclusiveMinimum: 1
    },
    serializedName: "$skip",
    type: {
      name: "Number"
    }
  }
};

export const select: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "select"],
  mapper: {
    serializedName: "$select",
    type: {
      name: "String"
    }
  }
};

export const orderby: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "orderby"],
  mapper: {
    serializedName: "$orderby",
    type: {
      name: "String"
    }
  }
};

export const count: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "count"],
  mapper: {
    serializedName: "$count",
    type: {
      name: "Boolean"
    }
  }
};

export const apiVersion: coreHttp.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2016-11-01",
    serializedName: "api-version",
    isConstant: true,
    type: {
      name: "String"
    }
  }
};

export const resourceGroupName: coreHttp.OperationURLParameter = {
  parameterPath: "resourceGroupName",
  mapper: {
    serializedName: "resourceGroupName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const count1: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "count"],
  mapper: {
    serializedName: "$count",
    type: {
      name: "Boolean"
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
  mapper: Mappers.CreateDataLakeStoreAccountParameters
};

export const accountName: coreHttp.OperationURLParameter = {
  parameterPath: "accountName",
  mapper: {
    serializedName: "accountName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters1: coreHttp.OperationParameter = {
  parameterPath: "parameters",
  mapper: Mappers.UpdateDataLakeStoreAccountParameters
};

export const parameters2: coreHttp.OperationParameter = {
  parameterPath: "parameters",
  mapper: Mappers.CheckNameAvailabilityParameters
};

export const location: coreHttp.OperationURLParameter = {
  parameterPath: "location",
  mapper: {
    serializedName: "location",
    required: true,
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

export const parameters3: coreHttp.OperationParameter = {
  parameterPath: "parameters",
  mapper: Mappers.CreateOrUpdateFirewallRuleParameters
};

export const firewallRuleName: coreHttp.OperationURLParameter = {
  parameterPath: "firewallRuleName",
  mapper: {
    serializedName: "firewallRuleName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const firewallRuleName1: coreHttp.OperationURLParameter = {
  parameterPath: "firewallRuleName",
  mapper: {
    serializedName: "firewallRuleName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters4: coreHttp.OperationParameter = {
  parameterPath: ["options", "parameters"],
  mapper: Mappers.UpdateFirewallRuleParameters
};

export const firewallRuleName2: coreHttp.OperationURLParameter = {
  parameterPath: "firewallRuleName",
  mapper: {
    serializedName: "firewallRuleName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const firewallRuleName3: coreHttp.OperationURLParameter = {
  parameterPath: "firewallRuleName",
  mapper: {
    serializedName: "firewallRuleName",
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

export const parameters5: coreHttp.OperationParameter = {
  parameterPath: "parameters",
  mapper: Mappers.CreateOrUpdateVirtualNetworkRuleParameters
};

export const virtualNetworkRuleName: coreHttp.OperationURLParameter = {
  parameterPath: "virtualNetworkRuleName",
  mapper: {
    serializedName: "virtualNetworkRuleName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const virtualNetworkRuleName1: coreHttp.OperationURLParameter = {
  parameterPath: "virtualNetworkRuleName",
  mapper: {
    serializedName: "virtualNetworkRuleName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters6: coreHttp.OperationParameter = {
  parameterPath: ["options", "parameters"],
  mapper: Mappers.UpdateVirtualNetworkRuleParameters
};

export const virtualNetworkRuleName2: coreHttp.OperationURLParameter = {
  parameterPath: "virtualNetworkRuleName",
  mapper: {
    serializedName: "virtualNetworkRuleName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const virtualNetworkRuleName3: coreHttp.OperationURLParameter = {
  parameterPath: "virtualNetworkRuleName",
  mapper: {
    serializedName: "virtualNetworkRuleName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters7: coreHttp.OperationParameter = {
  parameterPath: "parameters",
  mapper: Mappers.CreateOrUpdateTrustedIdProviderParameters
};

export const trustedIdProviderName: coreHttp.OperationURLParameter = {
  parameterPath: "trustedIdProviderName",
  mapper: {
    serializedName: "trustedIdProviderName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const trustedIdProviderName1: coreHttp.OperationURLParameter = {
  parameterPath: "trustedIdProviderName",
  mapper: {
    serializedName: "trustedIdProviderName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters8: coreHttp.OperationParameter = {
  parameterPath: ["options", "parameters"],
  mapper: Mappers.UpdateTrustedIdProviderParameters
};

export const trustedIdProviderName2: coreHttp.OperationURLParameter = {
  parameterPath: "trustedIdProviderName",
  mapper: {
    serializedName: "trustedIdProviderName",
    required: true,
    type: {
      name: "String"
    }
  }
};
