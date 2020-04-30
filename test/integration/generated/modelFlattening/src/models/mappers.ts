/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

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

export const ErrorModel: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ErrorModel",
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
      },
      parentError: {
        serializedName: "parentError",
        type: {
          name: "Composite",
          className: "ErrorModel"
        }
      }
    }
  }
};

export const FlattenedProduct: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "FlattenedProduct",
    modelProperties: {
      ...Resource.type.modelProperties,
      pName: {
        serializedName: "properties.p\\.name",
        type: {
          name: "String"
        }
      },
      typePropertiesType: {
        serializedName: "properties.type",
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
      },
      provisioningState: {
        serializedName: "properties.provisioningState",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const WrappedProduct: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "WrappedProduct",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ProductWrapper: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ProductWrapper",
    modelProperties: {
      value: {
        serializedName: "property.value",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ResourceCollection: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ResourceCollection",
    modelProperties: {
      productresource: {
        serializedName: "productresource",
        type: {
          name: "Composite",
          className: "FlattenedProduct"
        }
      },
      arrayofresources: {
        serializedName: "arrayofresources",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Composite", className: "FlattenedProduct" }
          }
        }
      },
      dictionaryofresources: {
        serializedName: "dictionaryofresources",
        type: {
          name: "Dictionary",
          value: { type: { name: "Composite", className: "FlattenedProduct" } }
        }
      }
    }
  }
};

export const BaseProduct: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "BaseProduct",
    modelProperties: {
      productId: {
        serializedName: "base_product_id",
        required: true,
        type: {
          name: "String"
        }
      },
      description: {
        serializedName: "base_product_description",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SimpleProduct: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "SimpleProduct",
    modelProperties: {
      ...BaseProduct.type.modelProperties,
      maxProductDisplayName: {
        serializedName: "details.max_product_display_name",
        type: {
          name: "String"
        }
      },
      capacity: {
        defaultValue: "Large",
        isConstant: true,
        serializedName: "details.max_product_capacity",
        type: {
          name: "String"
        }
      },
      genericValue: {
        serializedName: "details.max_product_image.generic_value",
        type: {
          name: "String"
        }
      },
      odataValue: {
        serializedName: "details.max_product_image.@odata\\.value",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const GenericUrl: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "GenericUrl",
    modelProperties: {
      genericValue: {
        serializedName: "generic_value",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ProductUrl: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ProductUrl",
    modelProperties: {
      ...GenericUrl.type.modelProperties,
      odataValue: {
        serializedName: "@odata\\.value",
        type: {
          name: "String"
        }
      }
    }
  }
};
