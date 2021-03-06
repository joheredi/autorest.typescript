/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

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
      constantId: {
        defaultValue: 1,
        isConstant: true,
        serializedName: "constantId",
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

export const OdataFilter: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "OdataFilter",
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

export const HeaderCustomNamedRequestIdHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "HeaderCustomNamedRequestIdHeaders",
    modelProperties: {
      fooRequestId: {
        serializedName: "foo-request-id",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const HeaderCustomNamedRequestIdParamGroupingHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "HeaderCustomNamedRequestIdParamGroupingHeaders",
    modelProperties: {
      fooRequestId: {
        serializedName: "foo-request-id",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const HeaderCustomNamedRequestIdHeadHeaders: coreHttp.CompositeMapper = {
  type: {
    name: "Composite",
    className: "HeaderCustomNamedRequestIdHeadHeaders",
    modelProperties: {
      fooRequestId: {
        serializedName: "foo-request-id",
        type: {
          name: "String"
        }
      }
    }
  }
};
