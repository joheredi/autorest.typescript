/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Models from "../models";
import * as Mappers from "../models/intModelMappers";
import { CompositeBoolIntContext } from "../compositeBoolIntContext";

/** Class representing a IntModel. */
export class IntModel {
  private readonly client: CompositeBoolIntContext;

  /**
   * Create a IntModel.
   * @param {CompositeBoolIntContext} client Reference to the service client.
   */
  constructor(client: CompositeBoolIntContext) {
    this.client = client;
  }

  /**
   * Get null Int value
   * @param [options] The optional parameters
   * @returns Promise<Models.IntModelGetNullResponse>
   */
  getNull(options?: coreHttp.RequestOptionsBase): Promise<Models.IntModelGetNullResponse>;
  /**
   * @param callback The callback
   */
  getNull(callback: coreHttp.ServiceCallback<number>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getNull(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<number>): void;
  getNull(options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<number>, callback?: coreHttp.ServiceCallback<number>): Promise<Models.IntModelGetNullResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getNullOperationSpec,
      callback) as Promise<Models.IntModelGetNullResponse>;
  }

  /**
   * Get invalid Int value
   * @param [options] The optional parameters
   * @returns Promise<Models.IntModelGetInvalidResponse>
   */
  getInvalid(options?: coreHttp.RequestOptionsBase): Promise<Models.IntModelGetInvalidResponse>;
  /**
   * @param callback The callback
   */
  getInvalid(callback: coreHttp.ServiceCallback<number>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getInvalid(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<number>): void;
  getInvalid(options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<number>, callback?: coreHttp.ServiceCallback<number>): Promise<Models.IntModelGetInvalidResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getInvalidOperationSpec,
      callback) as Promise<Models.IntModelGetInvalidResponse>;
  }

  /**
   * Get overflow Int32 value
   * @param [options] The optional parameters
   * @returns Promise<Models.IntModelGetOverflowInt32Response>
   */
  getOverflowInt32(options?: coreHttp.RequestOptionsBase): Promise<Models.IntModelGetOverflowInt32Response>;
  /**
   * @param callback The callback
   */
  getOverflowInt32(callback: coreHttp.ServiceCallback<number>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getOverflowInt32(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<number>): void;
  getOverflowInt32(options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<number>, callback?: coreHttp.ServiceCallback<number>): Promise<Models.IntModelGetOverflowInt32Response> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getOverflowInt32OperationSpec,
      callback) as Promise<Models.IntModelGetOverflowInt32Response>;
  }

  /**
   * Get underflow Int32 value
   * @param [options] The optional parameters
   * @returns Promise<Models.IntModelGetUnderflowInt32Response>
   */
  getUnderflowInt32(options?: coreHttp.RequestOptionsBase): Promise<Models.IntModelGetUnderflowInt32Response>;
  /**
   * @param callback The callback
   */
  getUnderflowInt32(callback: coreHttp.ServiceCallback<number>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getUnderflowInt32(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<number>): void;
  getUnderflowInt32(options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<number>, callback?: coreHttp.ServiceCallback<number>): Promise<Models.IntModelGetUnderflowInt32Response> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getUnderflowInt32OperationSpec,
      callback) as Promise<Models.IntModelGetUnderflowInt32Response>;
  }

  /**
   * Get overflow Int64 value
   * @param [options] The optional parameters
   * @returns Promise<Models.IntModelGetOverflowInt64Response>
   */
  getOverflowInt64(options?: coreHttp.RequestOptionsBase): Promise<Models.IntModelGetOverflowInt64Response>;
  /**
   * @param callback The callback
   */
  getOverflowInt64(callback: coreHttp.ServiceCallback<number>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getOverflowInt64(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<number>): void;
  getOverflowInt64(options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<number>, callback?: coreHttp.ServiceCallback<number>): Promise<Models.IntModelGetOverflowInt64Response> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getOverflowInt64OperationSpec,
      callback) as Promise<Models.IntModelGetOverflowInt64Response>;
  }

  /**
   * Get underflow Int64 value
   * @param [options] The optional parameters
   * @returns Promise<Models.IntModelGetUnderflowInt64Response>
   */
  getUnderflowInt64(options?: coreHttp.RequestOptionsBase): Promise<Models.IntModelGetUnderflowInt64Response>;
  /**
   * @param callback The callback
   */
  getUnderflowInt64(callback: coreHttp.ServiceCallback<number>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getUnderflowInt64(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<number>): void;
  getUnderflowInt64(options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<number>, callback?: coreHttp.ServiceCallback<number>): Promise<Models.IntModelGetUnderflowInt64Response> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getUnderflowInt64OperationSpec,
      callback) as Promise<Models.IntModelGetUnderflowInt64Response>;
  }

  /**
   * Put max int32 value
   * @param intBody
   * @param [options] The optional parameters
   * @returns Promise<coreHttp.RestResponse>
   */
  putMax32(intBody: number, options?: coreHttp.RequestOptionsBase): Promise<coreHttp.RestResponse>;
  /**
   * @param intBody
   * @param callback The callback
   */
  putMax32(intBody: number, callback: coreHttp.ServiceCallback<void>): void;
  /**
   * @param intBody
   * @param options The optional parameters
   * @param callback The callback
   */
  putMax32(intBody: number, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<void>): void;
  putMax32(intBody: number, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<void>, callback?: coreHttp.ServiceCallback<void>): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      {
        intBody,
        options
      },
      putMax32OperationSpec,
      callback);
  }

  /**
   * Put max int64 value
   * @param intBody
   * @param [options] The optional parameters
   * @returns Promise<coreHttp.RestResponse>
   */
  putMax64(intBody: number, options?: coreHttp.RequestOptionsBase): Promise<coreHttp.RestResponse>;
  /**
   * @param intBody
   * @param callback The callback
   */
  putMax64(intBody: number, callback: coreHttp.ServiceCallback<void>): void;
  /**
   * @param intBody
   * @param options The optional parameters
   * @param callback The callback
   */
  putMax64(intBody: number, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<void>): void;
  putMax64(intBody: number, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<void>, callback?: coreHttp.ServiceCallback<void>): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      {
        intBody,
        options
      },
      putMax64OperationSpec,
      callback);
  }

  /**
   * Put min int32 value
   * @param intBody
   * @param [options] The optional parameters
   * @returns Promise<coreHttp.RestResponse>
   */
  putMin32(intBody: number, options?: coreHttp.RequestOptionsBase): Promise<coreHttp.RestResponse>;
  /**
   * @param intBody
   * @param callback The callback
   */
  putMin32(intBody: number, callback: coreHttp.ServiceCallback<void>): void;
  /**
   * @param intBody
   * @param options The optional parameters
   * @param callback The callback
   */
  putMin32(intBody: number, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<void>): void;
  putMin32(intBody: number, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<void>, callback?: coreHttp.ServiceCallback<void>): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      {
        intBody,
        options
      },
      putMin32OperationSpec,
      callback);
  }

  /**
   * Put min int64 value
   * @param intBody
   * @param [options] The optional parameters
   * @returns Promise<coreHttp.RestResponse>
   */
  putMin64(intBody: number, options?: coreHttp.RequestOptionsBase): Promise<coreHttp.RestResponse>;
  /**
   * @param intBody
   * @param callback The callback
   */
  putMin64(intBody: number, callback: coreHttp.ServiceCallback<void>): void;
  /**
   * @param intBody
   * @param options The optional parameters
   * @param callback The callback
   */
  putMin64(intBody: number, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<void>): void;
  putMin64(intBody: number, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<void>, callback?: coreHttp.ServiceCallback<void>): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      {
        intBody,
        options
      },
      putMin64OperationSpec,
      callback);
  }

  /**
   * Get datetime encoded as Unix time value
   * @param [options] The optional parameters
   * @returns Promise<Models.IntModelGetUnixTimeResponse>
   */
  getUnixTime(options?: coreHttp.RequestOptionsBase): Promise<Models.IntModelGetUnixTimeResponse>;
  /**
   * @param callback The callback
   */
  getUnixTime(callback: coreHttp.ServiceCallback<Date>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getUnixTime(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Date>): void;
  getUnixTime(options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Date>, callback?: coreHttp.ServiceCallback<Date>): Promise<Models.IntModelGetUnixTimeResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getUnixTimeOperationSpec,
      callback) as Promise<Models.IntModelGetUnixTimeResponse>;
  }

  /**
   * Put datetime encoded as Unix time
   * @param intBody
   * @param [options] The optional parameters
   * @returns Promise<coreHttp.RestResponse>
   */
  putUnixTimeDate(intBody: Date | string, options?: coreHttp.RequestOptionsBase): Promise<coreHttp.RestResponse>;
  /**
   * @param intBody
   * @param callback The callback
   */
  putUnixTimeDate(intBody: Date | string, callback: coreHttp.ServiceCallback<void>): void;
  /**
   * @param intBody
   * @param options The optional parameters
   * @param callback The callback
   */
  putUnixTimeDate(intBody: Date | string, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<void>): void;
  putUnixTimeDate(intBody: Date | string, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<void>, callback?: coreHttp.ServiceCallback<void>): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      {
        intBody,
        options
      },
      putUnixTimeDateOperationSpec,
      callback);
  }

  /**
   * Get invalid Unix time value
   * @param [options] The optional parameters
   * @returns Promise<Models.IntModelGetInvalidUnixTimeResponse>
   */
  getInvalidUnixTime(options?: coreHttp.RequestOptionsBase): Promise<Models.IntModelGetInvalidUnixTimeResponse>;
  /**
   * @param callback The callback
   */
  getInvalidUnixTime(callback: coreHttp.ServiceCallback<Date>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getInvalidUnixTime(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Date>): void;
  getInvalidUnixTime(options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Date>, callback?: coreHttp.ServiceCallback<Date>): Promise<Models.IntModelGetInvalidUnixTimeResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getInvalidUnixTimeOperationSpec,
      callback) as Promise<Models.IntModelGetInvalidUnixTimeResponse>;
  }

  /**
   * Get null Unix time value
   * @param [options] The optional parameters
   * @returns Promise<Models.IntModelGetNullUnixTimeResponse>
   */
  getNullUnixTime(options?: coreHttp.RequestOptionsBase): Promise<Models.IntModelGetNullUnixTimeResponse>;
  /**
   * @param callback The callback
   */
  getNullUnixTime(callback: coreHttp.ServiceCallback<Date>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  getNullUnixTime(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Date>): void;
  getNullUnixTime(options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Date>, callback?: coreHttp.ServiceCallback<Date>): Promise<Models.IntModelGetNullUnixTimeResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      getNullUnixTimeOperationSpec,
      callback) as Promise<Models.IntModelGetNullUnixTimeResponse>;
  }
}

// Operation Specifications
const serializer = new coreHttp.Serializer(Mappers);
const getNullOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "int/null",
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Number"
        }
      }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getInvalidOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "int/invalid",
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Number"
        }
      }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getOverflowInt32OperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "int/overflowint32",
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Number"
        }
      }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getUnderflowInt32OperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "int/underflowint32",
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Number"
        }
      }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getOverflowInt64OperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "int/overflowint64",
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Number"
        }
      }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getUnderflowInt64OperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "int/underflowint64",
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Number"
        }
      }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const putMax32OperationSpec: coreHttp.OperationSpec = {
  httpMethod: "PUT",
  path: "int/max/32",
  requestBody: {
    parameterPath: "intBody",
    mapper: {
      required: true,
      serializedName: "intBody",
      type: {
        name: "Number"
      }
    }
  },
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const putMax64OperationSpec: coreHttp.OperationSpec = {
  httpMethod: "PUT",
  path: "int/max/64",
  requestBody: {
    parameterPath: "intBody",
    mapper: {
      required: true,
      serializedName: "intBody",
      type: {
        name: "Number"
      }
    }
  },
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const putMin32OperationSpec: coreHttp.OperationSpec = {
  httpMethod: "PUT",
  path: "int/min/32",
  requestBody: {
    parameterPath: "intBody",
    mapper: {
      required: true,
      serializedName: "intBody",
      type: {
        name: "Number"
      }
    }
  },
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const putMin64OperationSpec: coreHttp.OperationSpec = {
  httpMethod: "PUT",
  path: "int/min/64",
  requestBody: {
    parameterPath: "intBody",
    mapper: {
      required: true,
      serializedName: "intBody",
      type: {
        name: "Number"
      }
    }
  },
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getUnixTimeOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "int/unixtime",
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "UnixTime"
        }
      }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const putUnixTimeDateOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "PUT",
  path: "int/unixtime",
  requestBody: {
    parameterPath: "intBody",
    mapper: {
      required: true,
      serializedName: "intBody",
      type: {
        name: "UnixTime"
      }
    }
  },
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getInvalidUnixTimeOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "int/invalidunixtime",
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "UnixTime"
        }
      }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};

const getNullUnixTimeOperationSpec: coreHttp.OperationSpec = {
  httpMethod: "GET",
  path: "int/nullunixtime",
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "UnixTime"
        }
      }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};