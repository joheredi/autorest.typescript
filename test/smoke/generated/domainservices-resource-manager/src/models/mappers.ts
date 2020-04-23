/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const OperationEntityListResult: coreHttp.CompositeMapper = {
  serializedName: "OperationEntityListResult",
  type: {
    name: "Composite",
    className: "OperationEntityListResult",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "OperationEntity" } }
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
      },
      origin: {
        serializedName: "origin",
        type: {
          name: "String"
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

export const DomainServiceListResult: coreHttp.CompositeMapper = {
  serializedName: "DomainServiceListResult",
  type: {
    name: "Composite",
    className: "DomainServiceListResult",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "DomainService" } }
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
      },
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
      },
      etag: {
        serializedName: "etag",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DomainService: coreHttp.CompositeMapper = {
  serializedName: "DomainService",
  type: {
    name: "Composite",
    className: "DomainService",
    modelProperties: {
      ...Resource.type.modelProperties,
      tenantId: {
        serializedName: "properties.tenantId",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      domainName: {
        serializedName: "properties.domainName",
        type: {
          name: "String"
        }
      },
      vnetSiteId: {
        serializedName: "properties.vnetSiteId",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      subnetId: {
        serializedName: "properties.subnetId",
        type: {
          name: "String"
        }
      },
      ldapsSettings: {
        serializedName: "ldapsSettings",
        type: {
          name: "Composite",
          className: "LdapsSettings"
        }
      },
      healthLastEvaluated: {
        serializedName: "properties.healthLastEvaluated",
        readOnly: true,
        type: {
          name: "DateTime"
        }
      },
      healthMonitors: {
        serializedName: "properties.healthMonitors",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "HealthMonitor" } }
        }
      },
      healthAlerts: {
        serializedName: "properties.healthAlerts",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "HealthAlert" } }
        }
      },
      notificationSettings: {
        serializedName: "notificationSettings",
        type: {
          name: "Composite",
          className: "NotificationSettings"
        }
      },
      domainSecuritySettings: {
        serializedName: "domainSecuritySettings",
        type: {
          name: "Composite",
          className: "DomainSecuritySettings"
        }
      },
      filteredSync: {
        serializedName: "properties.filteredSync",
        type: {
          name: "String"
        }
      },
      domainControllerIpAddress: {
        serializedName: "properties.domainControllerIpAddress",
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName:
              "DomainServicePropertiesDomainControllerIpAddressItem"
          }
        }
      },
      serviceStatus: {
        serializedName: "properties.serviceStatus",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      provisioningState: {
        serializedName: "properties.provisioningState",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const LdapsSettings: coreHttp.CompositeMapper = {
  serializedName: "LdapsSettings",
  type: {
    name: "Composite",
    className: "LdapsSettings",
    modelProperties: {
      ldaps: {
        serializedName: "ldaps",
        type: {
          name: "String"
        }
      },
      pfxCertificate: {
        serializedName: "pfxCertificate",
        type: {
          name: "String"
        }
      },
      pfxCertificatePassword: {
        serializedName: "pfxCertificatePassword",
        type: {
          name: "String"
        }
      },
      publicCertificate: {
        serializedName: "publicCertificate",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      certificateThumbprint: {
        serializedName: "certificateThumbprint",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      certificateNotAfter: {
        serializedName: "certificateNotAfter",
        readOnly: true,
        type: {
          name: "DateTime"
        }
      },
      externalAccess: {
        serializedName: "externalAccess",
        type: {
          name: "String"
        }
      },
      externalAccessIpAddress: {
        serializedName: "externalAccessIpAddress",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const HealthMonitor: coreHttp.CompositeMapper = {
  serializedName: "HealthMonitor",
  type: {
    name: "Composite",
    className: "HealthMonitor",
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
      details: {
        serializedName: "details",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const HealthAlert: coreHttp.CompositeMapper = {
  serializedName: "HealthAlert",
  type: {
    name: "Composite",
    className: "HealthAlert",
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
      issue: {
        serializedName: "issue",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      severity: {
        serializedName: "severity",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      raised: {
        serializedName: "raised",
        readOnly: true,
        type: {
          name: "DateTime"
        }
      },
      lastDetected: {
        serializedName: "lastDetected",
        readOnly: true,
        type: {
          name: "DateTime"
        }
      },
      resolutionUri: {
        serializedName: "resolutionUri",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const NotificationSettings: coreHttp.CompositeMapper = {
  serializedName: "NotificationSettings",
  type: {
    name: "Composite",
    className: "NotificationSettings",
    modelProperties: {
      notifyGlobalAdmins: {
        serializedName: "notifyGlobalAdmins",
        type: {
          name: "String"
        }
      },
      notifyDcAdmins: {
        serializedName: "notifyDcAdmins",
        type: {
          name: "String"
        }
      },
      additionalRecipients: {
        serializedName: "additionalRecipients",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "NotificationSettingsAdditionalRecipientsItem"
          }
        }
      }
    }
  }
};

export const DomainSecuritySettings: coreHttp.CompositeMapper = {
  serializedName: "DomainSecuritySettings",
  type: {
    name: "Composite",
    className: "DomainSecuritySettings",
    modelProperties: {
      ntlmV1: {
        serializedName: "ntlmV1",
        type: {
          name: "String"
        }
      },
      tlsV1: {
        serializedName: "tlsV1",
        type: {
          name: "String"
        }
      },
      syncNtlmPasswords: {
        serializedName: "syncNtlmPasswords",
        type: {
          name: "String"
        }
      }
    }
  }
};
