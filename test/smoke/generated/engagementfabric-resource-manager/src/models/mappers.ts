/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

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
        required: true,
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
      sku: {
        serializedName: "sku",
        type: {
          name: "Composite",
          className: "Sku"
        }
      }
    }
  }
};

export const Sku: coreHttp.CompositeMapper = {
  serializedName: "SKU",
  type: {
    name: "Composite",
    className: "Sku",
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

export const Account: coreHttp.CompositeMapper = {
  serializedName: "Account",
  type: {
    name: "Composite",
    className: "Account",
    modelProperties: {
      ...TrackedResource.type.modelProperties
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

export const AccountPatch: coreHttp.CompositeMapper = {
  serializedName: "AccountPatch",
  type: {
    name: "Composite",
    className: "AccountPatch",
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

export const AccountList: coreHttp.CompositeMapper = {
  serializedName: "AccountList",
  type: {
    name: "Composite",
    className: "AccountList",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Account" } }
        }
      }
    }
  }
};

export const KeyDescriptionList: coreHttp.CompositeMapper = {
  serializedName: "KeyDescriptionList",
  type: {
    name: "Composite",
    className: "KeyDescriptionList",
    modelProperties: {
      value: {
        serializedName: "value",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "KeyDescription" } }
        }
      }
    }
  }
};

export const KeyDescription: coreHttp.CompositeMapper = {
  serializedName: "KeyDescription",
  type: {
    name: "Composite",
    className: "KeyDescription",
    modelProperties: {
      name: {
        serializedName: "name",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      rank: {
        serializedName: "rank",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      value: {
        serializedName: "value",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const RegenerateKeyParameter: coreHttp.CompositeMapper = {
  serializedName: "RegenerateKeyParameter",
  type: {
    name: "Composite",
    className: "RegenerateKeyParameter",
    modelProperties: {
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String"
        }
      },
      rank: {
        serializedName: "rank",
        required: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ChannelTypeDescriptionList: coreHttp.CompositeMapper = {
  serializedName: "ChannelTypeDescriptionList",
  type: {
    name: "Composite",
    className: "ChannelTypeDescriptionList",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "ChannelTypeDescription" }
          }
        }
      }
    }
  }
};

export const ChannelTypeDescription: coreHttp.CompositeMapper = {
  serializedName: "ChannelTypeDescription",
  type: {
    name: "Composite",
    className: "ChannelTypeDescription",
    modelProperties: {
      channelType: {
        serializedName: "channelType",
        type: {
          name: "String"
        }
      },
      channelDescription: {
        serializedName: "channelDescription",
        type: {
          name: "String"
        }
      },
      channelFunctions: {
        serializedName: "channelFunctions",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "ChannelTypeDescriptionChannelFunctionsItem"
          }
        }
      }
    }
  }
};

export const ProxyOnlyResource: coreHttp.CompositeMapper = {
  serializedName: "ProxyOnlyResource",
  type: {
    name: "Composite",
    className: "ProxyOnlyResource",
    modelProperties: {
      ...Resource.type.modelProperties
    }
  }
};

export const Channel: coreHttp.CompositeMapper = {
  serializedName: "Channel",
  type: {
    name: "Composite",
    className: "Channel",
    modelProperties: {
      ...ProxyOnlyResource.type.modelProperties,
      channelType: {
        serializedName: "properties.channelType",
        type: {
          name: "String"
        }
      },
      channelFunctions: {
        serializedName: "properties.channelFunctions",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "ChannelPropertiesChannelFunctionsItem"
          }
        }
      },
      credentials: {
        serializedName: "properties.credentials",
        type: {
          name: "Dictionary",
          value: { type: { name: "String" }, serializedName: "String" }
        }
      }
    }
  }
};

export const ChannelList: coreHttp.CompositeMapper = {
  serializedName: "ChannelList",
  type: {
    name: "Composite",
    className: "ChannelList",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Channel" } }
        }
      }
    }
  }
};

export const CheckNameAvailabilityParameter: coreHttp.CompositeMapper = {
  serializedName: "CheckNameAvailabilityParameter",
  type: {
    name: "Composite",
    className: "CheckNameAvailabilityParameter",
    modelProperties: {
      name: {
        serializedName: "name",
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
      }
    }
  }
};

export const CheckNameAvailabilityResult: coreHttp.CompositeMapper = {
  serializedName: "CheckNameAvailabilityResult",
  type: {
    name: "Composite",
    className: "CheckNameAvailabilityResult",
    modelProperties: {
      nameAvailable: {
        serializedName: "nameAvailable",
        readOnly: true,
        type: {
          name: "Boolean"
        }
      },
      reason: {
        serializedName: "reason",
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
      }
    }
  }
};

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

export const SkuDescriptionList: coreHttp.CompositeMapper = {
  serializedName: "SkuDescriptionList",
  type: {
    name: "Composite",
    className: "SkuDescriptionList",
    modelProperties: {
      value: {
        serializedName: "value",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "SkuDescription" } }
        }
      }
    }
  }
};

export const SkuDescription: coreHttp.CompositeMapper = {
  serializedName: "SkuDescription",
  type: {
    name: "Composite",
    className: "SkuDescription",
    modelProperties: {
      resourceType: {
        serializedName: "resourceType",
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
      tier: {
        serializedName: "tier",
        readOnly: true,
        type: {
          name: "String"
        }
      },
      locations: {
        serializedName: "locations",
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "SkuDescriptionLocationsItem"
          }
        }
      },
      locationInfo: {
        serializedName: "locationInfo",
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "SkuLocationInfoItem" }
          }
        }
      },
      restrictions: {
        serializedName: "restrictions",
        readOnly: true,
        type: {
          name: "Sequence",
          element: { type: { name: "any" }, serializedName: "any" }
        }
      }
    }
  }
};

export const SkuLocationInfoItem: coreHttp.CompositeMapper = {
  serializedName: "SkuLocationInfoItem",
  type: {
    name: "Composite",
    className: "SkuLocationInfoItem",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      zones: {
        serializedName: "zones",
        type: {
          name: "Sequence",
          element: {
            type: { name: "String" },
            serializedName: "SkuLocationInfoItemZonesItem"
          }
        }
      }
    }
  }
};
