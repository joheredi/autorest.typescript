/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter
} from "@azure/core-client";
import {
  ApplicationCreateParameters as ApplicationCreateParametersMapper,
  ApplicationUpdateParameters as ApplicationUpdateParametersMapper,
  AddOwnerParameters as AddOwnerParametersMapper,
  KeyCredentialsUpdateParameters as KeyCredentialsUpdateParametersMapper,
  PasswordCredentialsUpdateParameters as PasswordCredentialsUpdateParametersMapper,
  CheckGroupMembershipParameters as CheckGroupMembershipParametersMapper,
  GroupAddMemberParameters as GroupAddMemberParametersMapper,
  GroupCreateParameters as GroupCreateParametersMapper,
  GroupGetMemberGroupsParameters as GroupGetMemberGroupsParametersMapper,
  ServicePrincipalCreateParameters as ServicePrincipalCreateParametersMapper,
  ServicePrincipalUpdateParameters as ServicePrincipalUpdateParametersMapper,
  UserCreateParameters as UserCreateParametersMapper,
  UserUpdateParameters as UserUpdateParametersMapper,
  UserGetMemberGroupsParameters as UserGetMemberGroupsParametersMapper,
  GetObjectsParameters as GetObjectsParametersMapper,
  OAuth2PermissionGrant as OAuth2PermissionGrantMapper
} from "../models/mappers";

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json, text/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const $host: OperationURLParameter = {
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

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "1.6",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String"
    }
  }
};

export const tenantID: OperationURLParameter = {
  parameterPath: "tenantID",
  mapper: {
    serializedName: "tenantID",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const nextLink: OperationURLParameter = {
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

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const parameters: OperationParameter = {
  parameterPath: "parameters",
  mapper: ApplicationCreateParametersMapper
};

export const filter: OperationQueryParameter = {
  parameterPath: ["options", "filter"],
  mapper: {
    serializedName: "$filter",
    type: {
      name: "String"
    }
  }
};

export const applicationObjectId: OperationURLParameter = {
  parameterPath: "applicationObjectId",
  mapper: {
    serializedName: "applicationObjectId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters1: OperationParameter = {
  parameterPath: "parameters",
  mapper: ApplicationUpdateParametersMapper
};

export const parameters2: OperationParameter = {
  parameterPath: "parameters",
  mapper: AddOwnerParametersMapper
};

export const ownerObjectId: OperationURLParameter = {
  parameterPath: "ownerObjectId",
  mapper: {
    serializedName: "ownerObjectId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters3: OperationParameter = {
  parameterPath: "parameters",
  mapper: KeyCredentialsUpdateParametersMapper
};

export const parameters4: OperationParameter = {
  parameterPath: "parameters",
  mapper: PasswordCredentialsUpdateParametersMapper
};

export const applicationID: OperationURLParameter = {
  parameterPath: "applicationID",
  mapper: {
    serializedName: "applicationID",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const objectId: OperationURLParameter = {
  parameterPath: "objectId",
  mapper: {
    serializedName: "objectId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters5: OperationParameter = {
  parameterPath: "parameters",
  mapper: CheckGroupMembershipParametersMapper
};

export const groupObjectId: OperationURLParameter = {
  parameterPath: "groupObjectId",
  mapper: {
    serializedName: "groupObjectId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const memberObjectId: OperationURLParameter = {
  parameterPath: "memberObjectId",
  mapper: {
    serializedName: "memberObjectId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters6: OperationParameter = {
  parameterPath: "parameters",
  mapper: GroupAddMemberParametersMapper
};

export const parameters7: OperationParameter = {
  parameterPath: "parameters",
  mapper: GroupCreateParametersMapper
};

export const parameters8: OperationParameter = {
  parameterPath: "parameters",
  mapper: GroupGetMemberGroupsParametersMapper
};

export const parameters9: OperationParameter = {
  parameterPath: "parameters",
  mapper: ServicePrincipalCreateParametersMapper
};

export const parameters10: OperationParameter = {
  parameterPath: "parameters",
  mapper: ServicePrincipalUpdateParametersMapper
};

export const parameters11: OperationParameter = {
  parameterPath: "parameters",
  mapper: UserCreateParametersMapper
};

export const expand: OperationQueryParameter = {
  parameterPath: ["options", "expand"],
  mapper: {
    serializedName: "$expand",
    type: {
      name: "String"
    }
  }
};

export const upnOrObjectId: OperationURLParameter = {
  parameterPath: "upnOrObjectId",
  mapper: {
    serializedName: "upnOrObjectId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const parameters12: OperationParameter = {
  parameterPath: "parameters",
  mapper: UserUpdateParametersMapper
};

export const parameters13: OperationParameter = {
  parameterPath: "parameters",
  mapper: UserGetMemberGroupsParametersMapper
};

export const parameters14: OperationParameter = {
  parameterPath: "parameters",
  mapper: GetObjectsParametersMapper
};

export const domainName: OperationURLParameter = {
  parameterPath: "domainName",
  mapper: {
    serializedName: "domainName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const accept1: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const body: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: OAuth2PermissionGrantMapper
};