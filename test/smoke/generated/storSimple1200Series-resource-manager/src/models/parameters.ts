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

export const apiVersion: coreHttp.OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2016-10-01",
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

export const managerName: coreHttp.OperationURLParameter = {
  parameterPath: "managerName",
  mapper: {
    constraints: {
      MaxLength: 50,
      MinLength: 2
    },
    serializedName: "managerName",
    required: true,
    type: {
      name: "String"
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

export const manager: coreHttp.OperationParameter = {
  parameterPath: "manager",
  mapper: Mappers.Manager
};

export const parameters: coreHttp.OperationParameter = {
  parameterPath: "parameters",
  mapper: Mappers.ManagerPatch
};

export const uploadCertificateRequestrequest: coreHttp.OperationParameter = {
  parameterPath: "uploadCertificateRequestrequest",
  mapper: Mappers.UploadCertificateRequest
};

export const certificateName: coreHttp.OperationURLParameter = {
  parameterPath: "certificateName",
  mapper: {
    serializedName: "certificateName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const managerExtendedInfo: coreHttp.OperationParameter = {
  parameterPath: "managerExtendedInfo",
  mapper: Mappers.ManagerExtendedInfo
};

export const ifMatch: coreHttp.OperationParameter = {
  parameterPath: "ifMatch",
  mapper: {
    serializedName: "If-Match",
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

export const accessControlRecordName: coreHttp.OperationURLParameter = {
  parameterPath: "accessControlRecordName",
  mapper: {
    serializedName: "accessControlRecordName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const accessControlRecord: coreHttp.OperationParameter = {
  parameterPath: "accessControlRecord",
  mapper: Mappers.AccessControlRecord
};

export const accessControlRecordName1: coreHttp.OperationURLParameter = {
  parameterPath: "accessControlRecordName",
  mapper: {
    serializedName: "accessControlRecordName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const accessControlRecordName2: coreHttp.OperationURLParameter = {
  parameterPath: "accessControlRecordName",
  mapper: {
    serializedName: "accessControlRecordName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const request: coreHttp.OperationParameter = {
  parameterPath: "request",
  mapper: Mappers.ClearAlertRequest
};

export const request1: coreHttp.OperationParameter = {
  parameterPath: "request",
  mapper: Mappers.SendTestAlertEmailRequest
};

export const deviceName: coreHttp.OperationURLParameter = {
  parameterPath: "deviceName",
  mapper: {
    serializedName: "deviceName",
    required: true,
    type: {
      name: "String"
    }
  }
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

export const forFailover: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "forFailover"],
  mapper: {
    serializedName: "forFailover",
    type: {
      name: "Boolean"
    }
  }
};

export const backupName: coreHttp.OperationURLParameter = {
  parameterPath: "backupName",
  mapper: {
    serializedName: "backupName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const cloneRequest: coreHttp.OperationParameter = {
  parameterPath: "cloneRequest",
  mapper: Mappers.CloneRequest
};

export const elementName: coreHttp.OperationURLParameter = {
  parameterPath: "elementName",
  mapper: {
    serializedName: "elementName",
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

export const expand: coreHttp.OperationQueryParameter = {
  parameterPath: ["options", "expand"],
  mapper: {
    serializedName: "$expand",
    type: {
      name: "String"
    }
  }
};

export const devicePatch: coreHttp.OperationParameter = {
  parameterPath: "devicePatch",
  mapper: Mappers.DevicePatch
};

export const deviceName1: coreHttp.OperationURLParameter = {
  parameterPath: "deviceName",
  mapper: {
    serializedName: "deviceName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const alertSettings: coreHttp.OperationParameter = {
  parameterPath: "alertSettings",
  mapper: Mappers.AlertSettings
};

export const failoverRequest: coreHttp.OperationParameter = {
  parameterPath: "failoverRequest",
  mapper: Mappers.FailoverRequest
};

export const deviceName2: coreHttp.OperationURLParameter = {
  parameterPath: "deviceName",
  mapper: {
    serializedName: "deviceName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const securitySettings: coreHttp.OperationParameter = {
  parameterPath: "securitySettings",
  mapper: Mappers.SecuritySettings
};

export const deviceName3: coreHttp.OperationURLParameter = {
  parameterPath: "deviceName",
  mapper: {
    serializedName: "deviceName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const scheduleGroupName: coreHttp.OperationURLParameter = {
  parameterPath: "scheduleGroupName",
  mapper: {
    serializedName: "scheduleGroupName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const scheduleGroup: coreHttp.OperationParameter = {
  parameterPath: "scheduleGroup",
  mapper: Mappers.BackupScheduleGroup
};

export const chapUserName: coreHttp.OperationURLParameter = {
  parameterPath: "chapUserName",
  mapper: {
    serializedName: "chapUserName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const chapSetting: coreHttp.OperationParameter = {
  parameterPath: "chapSetting",
  mapper: Mappers.ChapSettings
};

export const chapUserName1: coreHttp.OperationURLParameter = {
  parameterPath: "chapUserName",
  mapper: {
    serializedName: "chapUserName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const iscsiServerName: coreHttp.OperationURLParameter = {
  parameterPath: "iscsiServerName",
  mapper: {
    serializedName: "iscsiServerName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const diskName: coreHttp.OperationURLParameter = {
  parameterPath: "diskName",
  mapper: {
    serializedName: "diskName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const iscsiDisk: coreHttp.OperationParameter = {
  parameterPath: "iscsiDisk",
  mapper: Mappers.IscsiDisk
};

export const diskName1: coreHttp.OperationURLParameter = {
  parameterPath: "diskName",
  mapper: {
    serializedName: "diskName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const fileServerName: coreHttp.OperationURLParameter = {
  parameterPath: "fileServerName",
  mapper: {
    serializedName: "fileServerName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const fileServer: coreHttp.OperationParameter = {
  parameterPath: "fileServer",
  mapper: Mappers.FileServer
};

export const fileServerName1: coreHttp.OperationURLParameter = {
  parameterPath: "fileServerName",
  mapper: {
    serializedName: "fileServerName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const fileServerName2: coreHttp.OperationURLParameter = {
  parameterPath: "fileServerName",
  mapper: {
    serializedName: "fileServerName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const shareName: coreHttp.OperationURLParameter = {
  parameterPath: "shareName",
  mapper: {
    serializedName: "shareName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const fileShare: coreHttp.OperationParameter = {
  parameterPath: "fileShare",
  mapper: Mappers.FileShare
};

export const shareName1: coreHttp.OperationURLParameter = {
  parameterPath: "shareName",
  mapper: {
    serializedName: "shareName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const iscsiServer: coreHttp.OperationParameter = {
  parameterPath: "iscsiServer",
  mapper: Mappers.IscsiServer
};

export const jobName: coreHttp.OperationURLParameter = {
  parameterPath: "jobName",
  mapper: {
    serializedName: "jobName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const credentialName: coreHttp.OperationURLParameter = {
  parameterPath: "credentialName",
  mapper: {
    serializedName: "credentialName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const storageAccount: coreHttp.OperationParameter = {
  parameterPath: "storageAccount",
  mapper: Mappers.StorageAccountCredential
};

export const credentialName1: coreHttp.OperationURLParameter = {
  parameterPath: "credentialName",
  mapper: {
    serializedName: "credentialName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const credentialName2: coreHttp.OperationURLParameter = {
  parameterPath: "credentialName",
  mapper: {
    serializedName: "credentialName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const storageDomainName: coreHttp.OperationURLParameter = {
  parameterPath: "storageDomainName",
  mapper: {
    serializedName: "storageDomainName",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const storageDomain: coreHttp.OperationParameter = {
  parameterPath: "storageDomain",
  mapper: Mappers.StorageDomain
};
