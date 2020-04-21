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
          value: { type: { name: "String" }, serializedName: "String" }
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

export const Product: coreHttp.CompositeMapper = {
  serializedName: "Product",
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

export const CloudError: coreHttp.CompositeMapper = {
  serializedName: "CloudError",
  type: {
    name: "Composite",
    className: "CloudError",
    modelProperties: {
      status: {
        serializedName: "status",
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
  serializedName: "Sku",
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

export const SubResource: coreHttp.CompositeMapper = {
  serializedName: "SubResource",
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

export const SubProduct: coreHttp.CompositeMapper = {
  serializedName: "SubProduct",
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

export const OperationResult: coreHttp.CompositeMapper = {
  serializedName: "OperationResult",
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
  serializedName: "OperationResultError",
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

export const LROsPutNoHeaderInRetryHeaders: coreHttp.CompositeMapper = {
  serializedName: "lROs_putNoHeaderInRetryHeaders",
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
  serializedName: "lROs_putAsyncRetrySucceededHeaders",
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
  serializedName: "lROs_putAsyncNoRetrySucceededHeaders",
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
  serializedName: "lROs_putAsyncRetryFailedHeaders",
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
  serializedName: "lROs_putAsyncNoRetrycanceledHeaders",
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
  serializedName: "lROs_putAsyncNoHeaderInRetryHeaders",
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
  serializedName: "lROs_deleteProvisioning202Accepted200SucceededHeaders",
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
  serializedName: "lROs_deleteProvisioning202DeletingFailed200Headers",
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
  serializedName: "lROs_deleteProvisioning202Deletingcanceled200Headers",
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
  serializedName: "lROs_delete202Retry200Headers",
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
  serializedName: "lROs_delete202NoRetry204Headers",
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
  serializedName: "lROs_deleteNoHeaderInRetryHeaders",
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
  serializedName: "lROs_deleteAsyncNoHeaderInRetryHeaders",
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
  serializedName: "lROs_deleteAsyncRetrySucceededHeaders",
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
  serializedName: "lROs_deleteAsyncNoRetrySucceededHeaders",
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
  serializedName: "lROs_deleteAsyncRetryFailedHeaders",
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
  serializedName: "lROs_deleteAsyncRetrycanceledHeaders",
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
  serializedName: "lROs_post202Retry200Headers",
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
  serializedName: "lROs_post202NoRetry204Headers",
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
  serializedName: "lROs_postAsyncRetrySucceededHeaders",
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
  serializedName: "lROs_postAsyncNoRetrySucceededHeaders",
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
  serializedName: "lROs_postAsyncRetryFailedHeaders",
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
  serializedName: "lROs_postAsyncRetrycanceledHeaders",
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
  serializedName: "lRORetrys_putAsyncRelativeRetrySucceededHeaders",
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
  serializedName: "lRORetrys_deleteProvisioning202Accepted200SucceededHeaders",
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
  serializedName: "lRORetrys_delete202Retry200Headers",
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
  serializedName: "lRORetrys_deleteAsyncRelativeRetrySucceededHeaders",
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
  serializedName: "lRORetrys_post202Retry200Headers",
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
  serializedName: "lRORetrys_postAsyncRelativeRetrySucceededHeaders",
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
  serializedName: "lrosaDs_putAsyncRelativeRetry400Headers",
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
  serializedName: "lrosaDs_deleteNonRetry400Headers",
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
  serializedName: "lrosaDs_delete202NonRetry400Headers",
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
  serializedName: "lrosaDs_deleteAsyncRelativeRetry400Headers",
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
  serializedName: "lrosaDs_postNonRetry400Headers",
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
  serializedName: "lrosaDs_post202NonRetry400Headers",
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
  serializedName: "lrosaDs_postAsyncRelativeRetry400Headers",
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
  serializedName: "lrosaDs_putAsyncRelativeRetryNoStatusHeaders",
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
  serializedName: "lrosaDs_putAsyncRelativeRetryNoStatusPayloadHeaders",
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
  serializedName: "lrosaDs_deleteAsyncRelativeRetryNoStatusHeaders",
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
  serializedName: "lrosaDs_post202NoLocationHeaders",
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
  serializedName: "lrosaDs_postAsyncRelativeRetryNoPayloadHeaders",
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
  serializedName: "lrosaDs_putAsyncRelativeRetryInvalidHeaderHeaders",
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
  serializedName: "lrosaDs_putAsyncRelativeRetryInvalidJsonPollingHeaders",
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
  serializedName: "lrosaDs_delete202RetryInvalidHeaderHeaders",
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
  serializedName: "lrosaDs_deleteAsyncRelativeRetryInvalidHeaderHeaders",
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
  serializedName: "lrosaDs_deleteAsyncRelativeRetryInvalidJsonPollingHeaders",
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
  serializedName: "lrosaDs_post202RetryInvalidHeaderHeaders",
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
  serializedName: "lrosaDs_postAsyncRelativeRetryInvalidHeaderHeaders",
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
  serializedName: "lrosaDs_postAsyncRelativeRetryInvalidJsonPollingHeaders",
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
  serializedName: "lROsCustomHeader_putAsyncRetrySucceededHeaders",
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
  serializedName: "lROsCustomHeader_post202Retry200Headers",
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
  serializedName: "lROsCustomHeader_postAsyncRetrySucceededHeaders",
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
