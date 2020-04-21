/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const ProductResultValue: coreHttp.CompositeMapper = {
  serializedName: "ProductResultValue",
  type: {
    name: "Composite",
    className: "ProductResultValue",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Product" } }
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

export const Product: coreHttp.CompositeMapper = {
  serializedName: "Product",
  type: {
    name: "Composite",
    className: "Product",
    modelProperties: {
      properties: {
        serializedName: "properties",
        type: {
          name: "Composite",
          className: "ProductProperties"
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
      id: {
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

export const ProductResult: coreHttp.CompositeMapper = {
  serializedName: "ProductResult",
  type: {
    name: "Composite",
    className: "ProductResult",
    modelProperties: {
      values: {
        serializedName: "values",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Product" } }
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

export const OdataProductResult: coreHttp.CompositeMapper = {
  serializedName: "OdataProductResult",
  type: {
    name: "Composite",
    className: "OdataProductResult",
    modelProperties: {
      values: {
        serializedName: "values",
        type: {
          name: "Sequence",
          element: { type: { name: "Composite", className: "Product" } }
        }
      },
      odataNextLink: {
        serializedName: "odata\\.nextLink",
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
      }
    }
  }
};
