/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as msRest from "@azure/ms-rest-js";


export const ErrorModel: msRest.CompositeMapper = {
  serializedName: "Error",
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
      }
    }
  }
};

export const IntWrapper: msRest.CompositeMapper = {
  serializedName: "int-wrapper",
  type: {
    name: "Composite",
    className: "IntWrapper",
    modelProperties: {
      value: {
        required: true,
        serializedName: "value",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const IntOptionalWrapper: msRest.CompositeMapper = {
  serializedName: "int-optional-wrapper",
  type: {
    name: "Composite",
    className: "IntOptionalWrapper",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const StringWrapper: msRest.CompositeMapper = {
  serializedName: "string-wrapper",
  type: {
    name: "Composite",
    className: "StringWrapper",
    modelProperties: {
      value: {
        required: true,
        serializedName: "value",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const StringOptionalWrapper: msRest.CompositeMapper = {
  serializedName: "string-optional-wrapper",
  type: {
    name: "Composite",
    className: "StringOptionalWrapper",
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

export const ArrayWrapper: msRest.CompositeMapper = {
  serializedName: "array-wrapper",
  type: {
    name: "Composite",
    className: "ArrayWrapper",
    modelProperties: {
      value: {
        required: true,
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      }
    }
  }
};

export const ArrayOptionalWrapper: msRest.CompositeMapper = {
  serializedName: "array-optional-wrapper",
  type: {
    name: "Composite",
    className: "ArrayOptionalWrapper",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      }
    }
  }
};

export const Product: msRest.CompositeMapper = {
  serializedName: "product",
  type: {
    name: "Composite",
    className: "Product",
    modelProperties: {
      id: {
        required: true,
        serializedName: "id",
        type: {
          name: "Number"
        }
      },
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ClassWrapper: msRest.CompositeMapper = {
  serializedName: "class-wrapper",
  type: {
    name: "Composite",
    className: "ClassWrapper",
    modelProperties: {
      value: {
        required: true,
        serializedName: "value",
        type: {
          name: "Composite",
          className: "Product"
        }
      }
    }
  }
};

export const ClassOptionalWrapper: msRest.CompositeMapper = {
  serializedName: "class-optional-wrapper",
  type: {
    name: "Composite",
    className: "ClassOptionalWrapper",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Composite",
          className: "Product"
        }
      }
    }
  }
};