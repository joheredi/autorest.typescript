/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const Product: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Product",
    modelProperties: {
      ...Resource.type.modelProperties,
      provisioningState: {
        serializedName: "properties.provisioningState",
        type: {
          name: "String"
        }
      },
      provisioningStateValues: {
        serializedName: "properties.provisioningStateValues",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Resource: coreHttp.CompositeMapper = {
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
          value: { type: { name: "String" } }
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

export const CloudError: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "CloudError",
    modelProperties: {
      code: {
        serializedName: "code",
        type: {
          name: "Number"
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

export const Sku: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "Sku",
    modelProperties: {
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      id: {
        serializedName: "id",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SubProduct: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SubProduct",
    modelProperties: {
      ...SubResource.type.modelProperties,
      provisioningState: {
        serializedName: "properties.provisioningState",
        type: {
          name: "String"
        }
      },
      provisioningStateValues: {
        serializedName: "properties.provisioningStateValues",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SubResource: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SubResource",
    modelProperties: {
      id: {
        serializedName: "id",
        readOnly: true,
        type: {
          name: "String"
        }
      }
    }
  }
};

export const OperationResult: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "OperationResult",
    modelProperties: {
      status: {
        serializedName: "status",
        type: {
          name: "String"
        }
      },
      error: {
        serializedName: "error",
        type: {
          name: "Composite",
          className: "OperationResultError"
        }
      }
    }
  }
};

export const OperationResultError: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "OperationResultError",
    modelProperties: {
      code: {
        serializedName: "code",
        type: {
          name: "Number"
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

export const LROsPost202ListHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsPost202ListHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
        type: {
          name: "String"
        }
      },
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const LROsPutNoHeaderInRetryHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsPutNoHeaderInRetryHeaders",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const LROsPutAsyncRetrySucceededHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsPutAsyncRetrySucceededHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsPutAsyncNoRetrySucceededHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsPutAsyncNoRetrySucceededHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
        type: {
          name: "String"
        }
      },
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const LROsPutAsyncRetryFailedHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsPutAsyncRetryFailedHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsPutAsyncNoRetrycanceledHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsPutAsyncNoRetrycanceledHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
        type: {
          name: "String"
        }
      },
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const LROsPutAsyncNoHeaderInRetryHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsPutAsyncNoHeaderInRetryHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const LROsDeleteProvisioning202Accepted200SucceededHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsDeleteProvisioning202Accepted200SucceededHeaders",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsDeleteProvisioning202DeletingFailed200Headers: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsDeleteProvisioning202DeletingFailed200Headers",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsDeleteProvisioning202Deletingcanceled200Headers: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsDeleteProvisioning202Deletingcanceled200Headers",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsDelete202Retry200Headers: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsDelete202Retry200Headers",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsDelete202NoRetry204Headers: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsDelete202NoRetry204Headers",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsDeleteNoHeaderInRetryHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsDeleteNoHeaderInRetryHeaders",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const LROsDeleteAsyncNoHeaderInRetryHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsDeleteAsyncNoHeaderInRetryHeaders",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const LROsDeleteAsyncRetrySucceededHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsDeleteAsyncRetrySucceededHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsDeleteAsyncNoRetrySucceededHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsDeleteAsyncNoRetrySucceededHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsDeleteAsyncRetryFailedHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsDeleteAsyncRetryFailedHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsDeleteAsyncRetrycanceledHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsDeleteAsyncRetrycanceledHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsPost202Retry200Headers: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsPost202Retry200Headers",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsPost202NoRetry204Headers: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsPost202NoRetry204Headers",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsPostAsyncRetrySucceededHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsPostAsyncRetrySucceededHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsPostAsyncNoRetrySucceededHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsPostAsyncNoRetrySucceededHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsPostAsyncRetryFailedHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsPostAsyncRetryFailedHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsPostAsyncRetrycanceledHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsPostAsyncRetrycanceledHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LRORetrysPutAsyncRelativeRetrySucceededHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LRORetrysPutAsyncRelativeRetrySucceededHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LRORetrysDeleteProvisioning202Accepted200SucceededHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LRORetrysDeleteProvisioning202Accepted200SucceededHeaders",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LRORetrysDelete202Retry200Headers: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LRORetrysDelete202Retry200Headers",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LRORetrysDeleteAsyncRelativeRetrySucceededHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LRORetrysDeleteAsyncRelativeRetrySucceededHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LRORetrysPost202Retry200Headers: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LRORetrysPost202Retry200Headers",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LRORetrysPostAsyncRelativeRetrySucceededHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LRORetrysPostAsyncRelativeRetrySucceededHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsPutAsyncRelativeRetry400Headers: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsPutAsyncRelativeRetry400Headers",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsDeleteNonRetry400Headers: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsDeleteNonRetry400Headers",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsDelete202NonRetry400Headers: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsDelete202NonRetry400Headers",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsDeleteAsyncRelativeRetry400Headers: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsDeleteAsyncRelativeRetry400Headers",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsPostNonRetry400Headers: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsPostNonRetry400Headers",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsPost202NonRetry400Headers: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsPost202NonRetry400Headers",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsPostAsyncRelativeRetry400Headers: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsPostAsyncRelativeRetry400Headers",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsPutAsyncRelativeRetryNoStatusHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsPutAsyncRelativeRetryNoStatusHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsPutAsyncRelativeRetryNoStatusPayloadHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsPutAsyncRelativeRetryNoStatusPayloadHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsDeleteAsyncRelativeRetryNoStatusHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsDeleteAsyncRelativeRetryNoStatusHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsPost202NoLocationHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsPost202NoLocationHeaders",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsPostAsyncRelativeRetryNoPayloadHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsPostAsyncRelativeRetryNoPayloadHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsPutAsyncRelativeRetryInvalidHeaderHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsPutAsyncRelativeRetryInvalidHeaderHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsPutAsyncRelativeRetryInvalidJsonPollingHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsPutAsyncRelativeRetryInvalidJsonPollingHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsDelete202RetryInvalidHeaderHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsDelete202RetryInvalidHeaderHeaders",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsDeleteAsyncRelativeRetryInvalidHeaderHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsDeleteAsyncRelativeRetryInvalidHeaderHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsDeleteAsyncRelativeRetryInvalidJsonPollingHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsDeleteAsyncRelativeRetryInvalidJsonPollingHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsPost202RetryInvalidHeaderHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsPost202RetryInvalidHeaderHeaders",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsPostAsyncRelativeRetryInvalidHeaderHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsPostAsyncRelativeRetryInvalidHeaderHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LrosaDsPostAsyncRelativeRetryInvalidJsonPollingHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LrosaDsPostAsyncRelativeRetryInvalidJsonPollingHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsCustomHeaderPutAsyncRetrySucceededHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsCustomHeaderPutAsyncRetrySucceededHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsCustomHeaderPost202Retry200Headers: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsCustomHeaderPost202Retry200Headers",
    modelProperties: {
      location: {
        serializedName: "location",
        type: {
          name: "String"
        }
      },
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const LROsCustomHeaderPostAsyncRetrySucceededHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "LROsCustomHeaderPostAsyncRetrySucceededHeaders",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azure-asyncoperation",
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
      retryAfter: {
        serializedName: "retry-after",
        type: {
          name: "Number"
        }
      }
    }
  }
};
