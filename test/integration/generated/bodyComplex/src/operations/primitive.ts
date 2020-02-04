/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Models from "../models";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { BodyComplexClient } from "../bodyComplexClient";

/**
 * Class representing a Primitive.
 */
export class Primitive {
  private readonly client: BodyComplexClient;

  /**
   * Initialize a new instance of the class Primitive class.
   * @param client Reference to the service client
   */
  constructor(client: BodyComplexClient) {
    this.client = client;
  }

  /**
   * Get complex types with integer properties
   * @param options The options parameters.
   */
  getInt(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PrimitiveGetIntResponse> {
    return this.client.sendOperationRequest(
      { options },
      getIntOperationSpec
    ) as Promise<Models.PrimitiveGetIntResponse>;
  }

  /**
   * Put complex types with integer properties
   * @param complexBody Please put -1 and 2
   * @param options The options parameters.
   */
  putInt(
    complexBody: Models.IntWrapper,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { complexBody, options },
      putIntOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get complex types with long properties
   * @param options The options parameters.
   */
  getLong(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PrimitiveGetLongResponse> {
    return this.client.sendOperationRequest(
      { options },
      getLongOperationSpec
    ) as Promise<Models.PrimitiveGetLongResponse>;
  }

  /**
   * Put complex types with long properties
   * @param complexBody Please put 1099511627775 and -999511627788
   * @param options The options parameters.
   */
  putLong(
    complexBody: Models.LongWrapper,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { complexBody, options },
      putLongOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get complex types with float properties
   * @param options The options parameters.
   */
  getFloat(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PrimitiveGetFloatResponse> {
    return this.client.sendOperationRequest(
      { options },
      getFloatOperationSpec
    ) as Promise<Models.PrimitiveGetFloatResponse>;
  }

  /**
   * Put complex types with float properties
   * @param complexBody Please put 1.05 and -0.003
   * @param options The options parameters.
   */
  putFloat(
    complexBody: Models.FloatWrapper,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { complexBody, options },
      putFloatOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get complex types with double properties
   * @param options The options parameters.
   */
  getDouble(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PrimitiveGetDoubleResponse> {
    return this.client.sendOperationRequest(
      { options },
      getDoubleOperationSpec
    ) as Promise<Models.PrimitiveGetDoubleResponse>;
  }

  /**
   * Put complex types with double properties
   * @param complexBody Please put 3e-100 and
   *                    -0.000000000000000000000000000000000000000000000000000000005
   * @param options The options parameters.
   */
  putDouble(
    complexBody: Models.DoubleWrapper,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { complexBody, options },
      putDoubleOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get complex types with bool properties
   * @param options The options parameters.
   */
  getBool(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PrimitiveGetBoolResponse> {
    return this.client.sendOperationRequest(
      { options },
      getBoolOperationSpec
    ) as Promise<Models.PrimitiveGetBoolResponse>;
  }

  /**
   * Put complex types with bool properties
   * @param complexBody Please put true and false
   * @param options The options parameters.
   */
  putBool(
    complexBody: Models.BooleanWrapper,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { complexBody, options },
      putBoolOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get complex types with string properties
   * @param options The options parameters.
   */
  getString(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PrimitiveGetStringResponse> {
    return this.client.sendOperationRequest(
      { options },
      getStringOperationSpec
    ) as Promise<Models.PrimitiveGetStringResponse>;
  }

  /**
   * Put complex types with string properties
   * @param complexBody Please put 'goodrequest', '', and null
   * @param options The options parameters.
   */
  putString(
    complexBody: Models.StringWrapper,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { complexBody, options },
      putStringOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get complex types with date properties
   * @param options The options parameters.
   */
  getDate(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PrimitiveGetDateResponse> {
    return this.client.sendOperationRequest(
      { options },
      getDateOperationSpec
    ) as Promise<Models.PrimitiveGetDateResponse>;
  }

  /**
   * Put complex types with date properties
   * @param complexBody Please put '0001-01-01' and '2016-02-29'
   * @param options The options parameters.
   */
  putDate(
    complexBody: Models.DateWrapper,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { complexBody, options },
      putDateOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get complex types with datetime properties
   * @param options The options parameters.
   */
  getDateTime(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PrimitiveGetDateTimeResponse> {
    return this.client.sendOperationRequest(
      { options },
      getDateTimeOperationSpec
    ) as Promise<Models.PrimitiveGetDateTimeResponse>;
  }

  /**
   * Put complex types with datetime properties
   * @param complexBody Please put '0001-01-01T12:00:00-04:00' and '2015-05-18T11:38:00-08:00'
   * @param options The options parameters.
   */
  putDateTime(
    complexBody: Models.DatetimeWrapper,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { complexBody, options },
      putDateTimeOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get complex types with datetimeRfc1123 properties
   * @param options The options parameters.
   */
  getDateTimeRfc1123(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PrimitiveGetDateTimeRfc1123Response> {
    return this.client.sendOperationRequest(
      { options },
      getDateTimeRfc1123OperationSpec
    ) as Promise<Models.PrimitiveGetDateTimeRfc1123Response>;
  }

  /**
   * Put complex types with datetimeRfc1123 properties
   * @param complexBody Please put 'Mon, 01 Jan 0001 12:00:00 GMT' and 'Mon, 18 May 2015 11:38:00 GMT'
   * @param options The options parameters.
   */
  putDateTimeRfc1123(
    complexBody: Models.Datetimerfc1123Wrapper,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { complexBody, options },
      putDateTimeRfc1123OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get complex types with duration properties
   * @param options The options parameters.
   */
  getDuration(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PrimitiveGetDurationResponse> {
    return this.client.sendOperationRequest(
      { options },
      getDurationOperationSpec
    ) as Promise<Models.PrimitiveGetDurationResponse>;
  }

  /**
   * Put complex types with duration properties
   * @param complexBody Please put 'P123DT22H14M12.011S'
   * @param options The options parameters.
   */
  putDuration(
    complexBody: Models.DurationWrapper,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { complexBody, options },
      putDurationOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get complex types with byte properties
   * @param options The options parameters.
   */
  getByte(
    options?: coreHttp.RequestOptionsBase
  ): Promise<Models.PrimitiveGetByteResponse> {
    return this.client.sendOperationRequest(
      { options },
      getByteOperationSpec
    ) as Promise<Models.PrimitiveGetByteResponse>;
  }

  /**
   * Put complex types with byte properties
   * @param complexBody Please put non-ascii byte string hex(FF FE FD FC 00 FA F9 F8 F7 F6)
   * @param options The options parameters.
   */
  putByte(
    complexBody: Models.ByteWrapper,
    options?: coreHttp.RequestOptionsBase
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { complexBody, options },
      putByteOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, false);

const getIntOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/integer",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.IntWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putIntOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/integer",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody1,
  urlParameters: [Parameters.$host],
  serializer
};
const getLongOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/long",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.LongWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putLongOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/long",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody2,
  urlParameters: [Parameters.$host],
  serializer
};
const getFloatOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/float",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.FloatWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putFloatOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/float",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody3,
  urlParameters: [Parameters.$host],
  serializer
};
const getDoubleOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/double",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DoubleWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putDoubleOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/double",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody4,
  urlParameters: [Parameters.$host],
  serializer
};
const getBoolOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/bool",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BooleanWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putBoolOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/bool",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody5,
  urlParameters: [Parameters.$host],
  serializer
};
const getStringOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/string",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.StringWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putStringOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/string",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody6,
  urlParameters: [Parameters.$host],
  serializer
};
const getDateOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/date",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DateWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putDateOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/date",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody7,
  urlParameters: [Parameters.$host],
  serializer
};
const getDateTimeOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/datetime",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DatetimeWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putDateTimeOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/datetime",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody8,
  urlParameters: [Parameters.$host],
  serializer
};
const getDateTimeRfc1123OperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/datetimerfc1123",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Datetimerfc1123Wrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putDateTimeRfc1123OperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/datetimerfc1123",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody9,
  urlParameters: [Parameters.$host],
  serializer
};
const getDurationOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/duration",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DurationWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putDurationOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/duration",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody10,
  urlParameters: [Parameters.$host],
  serializer
};
const getByteOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/byte",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ByteWrapper
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putByteOperationSpec: coreHttp.OperationSpec = {
  path: "/complex/primitive/byte",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.complexBody11,
  urlParameters: [Parameters.$host],
  serializer
};
