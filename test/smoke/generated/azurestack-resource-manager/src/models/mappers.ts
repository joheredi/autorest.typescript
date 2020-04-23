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
        type: {
          name: "String"
        }
      },
      display: {
        serializedName: "display",
        type: {
          name: "Composite",
          className: "Display"
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

export const Display: coreHttp.CompositeMapper = {
  serializedName: "Display",
  type: {
    name: "Composite",
    className: "Display",
    modelProperties: {
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
      },
      operation: {
        serializedName: "operation",
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
      etag: {
        serializedName: "etag",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const CloudManifestFileResponse: coreHttp.CompositeMapper = {
  serializedName: "CloudManifestFileResponse",
  type: {
    name: "Composite",
    className: "CloudManifestFileResponse",
    modelProperties: {
      ...Resource.type.modelProperties,
      properties: {
        serializedName: "properties",
        type: {
          name: "Composite",
          className: "CloudManifestFileProperties"
        }
      }
    }
  }
};

export const CloudManifestFileProperties: coreHttp.CompositeMapper = {
  serializedName: "CloudManifestFileProperties",
  type: {
    name: "Composite",
    className: "CloudManifestFileProperties",
    modelProperties: {
      deploymentData: {
        serializedName: "deploymentData",
        type: {
          name: "Composite",
          className: "CloudManifestFileDeploymentData"
        }
      },
      signature: {
        serializedName: "signature",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const CloudManifestFileDeploymentData: coreHttp.CompositeMapper = {
  serializedName: "CloudManifestFileDeploymentData",
  type: {
    name: "Composite",
    className: "CloudManifestFileDeploymentData",
    modelProperties: {
      externalDsmsCertificates: {
        serializedName: "externalDsmsCertificates",
        type: {
          name: "String"
        }
      },
      customCloudVerificationKey: {
        serializedName: "customCloudVerificationKey",
        type: {
          name: "String"
        }
      },
      customCloudArmEndpoint: {
        serializedName: "customEnvironmentEndpoints.customCloudArmEndpoint",
        type: {
          name: "String"
        }
      },
      externalDsmsEndpoint: {
        serializedName: "customEnvironmentEndpoints.externalDsmsEndpoint",
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
          className: "ErrorDetails"
        }
      }
    }
  }
};

export const ErrorDetails: coreHttp.CompositeMapper = {
  serializedName: "ErrorDetails",
  type: {
    name: "Composite",
    className: "ErrorDetails",
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
      }
    }
  }
};

export const ProductList: coreHttp.CompositeMapper = {
  serializedName: "ProductList",
  type: {
    name: "Composite",
    className: "ProductList",
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
          element: { type: { name: "Composite", className: "Product" } }
        }
      }
    }
  }
};

export const Product: coreHttp.CompositeMapper = {
  serializedName: "Product",
  type: {
    name: "Composite",
    className: "Product",
    modelProperties: {
      ...Resource.type.modelProperties,
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
      publisherDisplayName: {
        serializedName: "properties.publisherDisplayName",
        type: {
          name: "String"
        }
      },
      publisherIdentifier: {
        serializedName: "properties.publisherIdentifier",
        type: {
          name: "String"
        }
      },
      offer: {
        serializedName: "properties.offer",
        type: {
          name: "String"
        }
      },
      offerVersion: {
        serializedName: "properties.offerVersion",
        type: {
          name: "String"
        }
      },
      sku: {
        serializedName: "properties.sku",
        type: {
          name: "String"
        }
      },
      billingPartNumber: {
        serializedName: "properties.billingPartNumber",
        type: {
          name: "String"
        }
      },
      vmExtensionType: {
        serializedName: "properties.vmExtensionType",
        type: {
          name: "String"
        }
      },
      galleryItemIdentity: {
        serializedName: "properties.galleryItemIdentity",
        type: {
          name: "String"
        }
      },
      iconUris: {
        serializedName: "iconUris",
        type: {
          name: "Composite",
          className: "IconUris"
        }
      },
      links: {
        serializedName: "properties.links",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "ProductLink" } }
        }
      },
      legalTerms: {
        serializedName: "properties.legalTerms",
        type: {
          name: "String"
        }
      },
      privacyPolicy: {
        serializedName: "properties.privacyPolicy",
        type: {
          name: "String"
        }
      },
      payloadLength: {
        serializedName: "properties.payloadLength",
        type: {
          name: "Number"
        }
      },
      productKind: {
        serializedName: "properties.productKind",
        type: {
          name: "String"
        }
      },
      productProperties: {
        serializedName: "productProperties",
        type: {
          name: "Composite",
          className: "ProductProperties"
        }
      },
      compatibility: {
        serializedName: "compatibility",
        type: {
          name: "Composite",
          className: "Compatibility"
        }
      }
    }
  }
};

export const IconUris: coreHttp.CompositeMapper = {
  serializedName: "IconUris",
  type: {
    name: "Composite",
    className: "IconUris",
    modelProperties: {
      large: {
        serializedName: "large",
        type: {
          name: "String"
        }
      },
      wide: {
        serializedName: "wide",
        type: {
          name: "String"
        }
      },
      medium: {
        serializedName: "medium",
        type: {
          name: "String"
        }
      },
      small: {
        serializedName: "small",
        type: {
          name: "String"
        }
      },
      hero: {
        serializedName: "hero",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ProductLink: coreHttp.CompositeMapper = {
  serializedName: "ProductLink",
  type: {
    name: "Composite",
    className: "ProductLink",
    modelProperties: {
      displayName: {
        serializedName: "displayName",
        type: {
          name: "String"
        }
      },
      uri: {
        serializedName: "uri",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ProductProperties: coreHttp.CompositeMapper = {
  serializedName: "ProductProperties",
  type: {
    name: "Composite",
    className: "ProductProperties",
    modelProperties: {
      version: {
        serializedName: "version",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Compatibility: coreHttp.CompositeMapper = {
  serializedName: "Compatibility",
  type: {
    name: "Composite",
    className: "Compatibility",
    modelProperties: {
      isCompatible: {
        serializedName: "isCompatible",
        type: {
          name: "Boolean"
        }
      },
      message: {
        serializedName: "message",
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
      issues: {
        serializedName: "issues",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "CompatibilityIssue"
          }
        }
      }
    }
  }
};

export const ExtendedProduct: coreHttp.CompositeMapper = {
  serializedName: "ExtendedProduct",
  type: {
    name: "Composite",
    className: "ExtendedProduct",
    modelProperties: {
      galleryPackageBlobSasUri: {
        serializedName: "galleryPackageBlobSasUri",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      productKind: {
        serializedName: "productKind",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      computeRole: {
        serializedName: "properties.computeRole",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      isSystemExtension: {
        serializedName: "properties.isSystemExtension",
        readOnly: true,
        type: {
          name: "Boolean"
        }
      },
      supportMultipleExtensions: {
        serializedName: "properties.supportMultipleExtensions",
        readOnly: true,
        type: {
          name: "Boolean"
        }
      },
      versionPropertiesVersion: {
        serializedName: "properties.version",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      vmOsType: {
        serializedName: "properties.vmOsType",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      vmScaleSetEnabled: {
        serializedName: "properties.vmScaleSetEnabled",
        readOnly: true,
        type: {
          name: "Boolean"
        }
      },
      uri: {
        serializedName: "properties.sourceBlob.uri",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      version: {
        serializedName: "properties.version",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      osDiskImage: {
        serializedName: "osDiskImage",
        type: {
          name: "Composite",
          className: "OsDiskImage"
        }
      },
      dataDiskImages: {
        serializedName: "properties.dataDiskImages",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "DataDiskImage" } }
        }
      }
    }
  }
};

export const VirtualMachineExtensionProductProperties: coreHttp.CompositeMapper = {
  serializedName: "VirtualMachineExtensionProductProperties",
  type: {
    name: "Composite",
    className: "VirtualMachineExtensionProductProperties",
    modelProperties: {
      computeRole: {
        serializedName: "computeRole",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      isSystemExtension: {
        serializedName: "isSystemExtension",
        readOnly: true,
        type: {
          name: "Boolean"
        }
      },
      supportMultipleExtensions: {
        serializedName: "supportMultipleExtensions",
        readOnly: true,
        type: {
          name: "Boolean"
        }
      },
      version: {
        serializedName: "version",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      vmOsType: {
        serializedName: "vmOsType",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      vmScaleSetEnabled: {
        serializedName: "vmScaleSetEnabled",
        readOnly: true,
        type: {
          name: "Boolean"
        }
      },
      uri: {
        serializedName: "sourceBlob.uri",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const VirtualMachineProductProperties: coreHttp.CompositeMapper = {
  serializedName: "VirtualMachineProductProperties",
  type: {
    name: "Composite",
    className: "VirtualMachineProductProperties",
    modelProperties: {
      version: {
        serializedName: "version",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      osDiskImage: {
        serializedName: "osDiskImage",
        type: {
          name: "Composite",
          className: "OsDiskImage"
        }
      },
      dataDiskImages: {
        serializedName: "dataDiskImages",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "DataDiskImage" } }
        }
      }
    }
  }
};

export const OsDiskImage: coreHttp.CompositeMapper = {
  serializedName: "OsDiskImage",
  type: {
    name: "Composite",
    className: "OsDiskImage",
    modelProperties: {
      operatingSystem: {
        serializedName: "operatingSystem",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      sourceBlobSasUri: {
        serializedName: "sourceBlobSasUri",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const DataDiskImage: coreHttp.CompositeMapper = {
  serializedName: "DataDiskImage",
  type: {
    name: "Composite",
    className: "DataDiskImage",
    modelProperties: {
      lun: {
        serializedName: "lun",
        readOnly: true,
        type: {
          name: "Number"
        }
      },
      sourceBlobSasUri: {
        serializedName: "sourceBlobSasUri",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ExtendedProductProperties: coreHttp.CompositeMapper = {
  serializedName: "ExtendedProductProperties",
  type: {
    name: "Composite",
    className: "ExtendedProductProperties",
    modelProperties: {
      ...VirtualMachineExtensionProductProperties.type.modelProperties,
      ...VirtualMachineProductProperties.type.modelProperties
    }
  }
};

export const DeviceConfiguration: coreHttp.CompositeMapper = {
  serializedName: "DeviceConfiguration",
  type: {
    name: "Composite",
    className: "DeviceConfiguration",
    modelProperties: {
      deviceVersion: {
        serializedName: "deviceVersion",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      identitySystem: {
        serializedName: "identitySystem",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const MarketplaceProductLogUpdate: coreHttp.CompositeMapper = {
  serializedName: "MarketplaceProductLogUpdate",
  type: {
    name: "Composite",
    className: "MarketplaceProductLogUpdate",
    modelProperties: {
      operation: {
        serializedName: "operation",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      status: {
        serializedName: "status",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      error: {
        serializedName: "error",
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

export const ProductLog: coreHttp.CompositeMapper = {
  serializedName: "ProductLog",
  type: {
    name: "Composite",
    className: "ProductLog",
    modelProperties: {
      id: {
        serializedName: "id",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      productId: {
        serializedName: "productId",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      subscriptionId: {
        serializedName: "subscriptionId",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      registrationName: {
        serializedName: "registrationName",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      resourceGroupName: {
        serializedName: "resourceGroupName",
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
      startDate: {
        serializedName: "startDate",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      endDate: {
        serializedName: "endDate",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      status: {
        serializedName: "status",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      error: {
        serializedName: "error",
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

export const RegistrationList: coreHttp.CompositeMapper = {
  serializedName: "RegistrationList",
  type: {
    name: "Composite",
    className: "RegistrationList",
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
          element: { type: { name: "Composite", className: "Registration" } }
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
        defaultValue: "global",
        serializedName: "location",
        isConstant: true,
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

export const Registration: coreHttp.CompositeMapper = {
  serializedName: "Registration",
  type: {
    name: "Composite",
    className: "Registration",
    modelProperties: {
      ...TrackedResource.type.modelProperties,
      objectId: {
        serializedName: "properties.objectId",
        type: {
          name: "String"
        }
      },
      cloudId: {
        serializedName: "properties.cloudId",
        type: {
          name: "String"
        }
      },
      billingModel: {
        serializedName: "properties.billingModel",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const RegistrationParameter: coreHttp.CompositeMapper = {
  serializedName: "RegistrationParameter",
  type: {
    name: "Composite",
    className: "RegistrationParameter",
    modelProperties: {
      location: {
        defaultValue: "global",
        serializedName: "location",
        isConstant: true,
        type: {
          name: "String"
        }
      },
      registrationToken: {
        serializedName: "properties.registrationToken",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ActivationKeyResult: coreHttp.CompositeMapper = {
  serializedName: "ActivationKeyResult",
  type: {
    name: "Composite",
    className: "ActivationKeyResult",
    modelProperties: {
      activationKey: {
        serializedName: "activationKey",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const CustomerSubscriptionList: coreHttp.CompositeMapper = {
  serializedName: "CustomerSubscriptionList",
  type: {
    name: "Composite",
    className: "CustomerSubscriptionList",
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
            type: { name: "Composite", className: "CustomerSubscription" }
          }
        }
      }
    }
  }
};

export const CustomerSubscription: coreHttp.CompositeMapper = {
  serializedName: "CustomerSubscription",
  type: {
    name: "Composite",
    className: "CustomerSubscription",
    modelProperties: {
      ...Resource.type.modelProperties,
      tenantId: {
        serializedName: "properties.tenantId",
        type: {
          name: "String"
        }
      }
    }
  }
};
