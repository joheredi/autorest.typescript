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
import { UrlClient } from "../urlClient";

/**
 * Class representing a Paths.
 */
export class Paths {
  private readonly client: UrlClient;

  /**
   * Initialize a new instance of the class Paths class.
   * @param client Reference to the service client
   */
  constructor(client: UrlClient) {
    this.client = client;
  }

  /**
   * Get true Boolean value on path
   * @param options The options parameters.
   */
  getBooleanTrue(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  getBooleanTrue(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  getBooleanTrue(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  getBooleanTrue(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      getBooleanTrueOperationSpec,
      callback
    );
  }

  /**
   * Get false Boolean value on path
   * @param options The options parameters.
   */
  getBooleanFalse(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  getBooleanFalse(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  getBooleanFalse(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  getBooleanFalse(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      getBooleanFalseOperationSpec,
      callback
    );
  }

  /**
   * Get '1000000' integer value
   * @param options The options parameters.
   */
  getIntOneMillion(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  getIntOneMillion(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  getIntOneMillion(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  getIntOneMillion(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      getIntOneMillionOperationSpec,
      callback
    );
  }

  /**
   * Get '-1000000' integer value
   * @param options The options parameters.
   */
  getIntNegativeOneMillion(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  getIntNegativeOneMillion(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  getIntNegativeOneMillion(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  getIntNegativeOneMillion(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      getIntNegativeOneMillionOperationSpec,
      callback
    );
  }

  /**
   * Get '10000000000' 64 bit integer value
   * @param options The options parameters.
   */
  getTenBillion(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  getTenBillion(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  getTenBillion(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  getTenBillion(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      getTenBillionOperationSpec,
      callback
    );
  }

  /**
   * Get '-10000000000' 64 bit integer value
   * @param options The options parameters.
   */
  getNegativeTenBillion(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  getNegativeTenBillion(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  getNegativeTenBillion(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  getNegativeTenBillion(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      getNegativeTenBillionOperationSpec,
      callback
    );
  }

  /**
   * Get '1.034E+20' numeric value
   * @param options The options parameters.
   */
  floatScientificPositive(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  floatScientificPositive(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  floatScientificPositive(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  floatScientificPositive(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      floatScientificPositiveOperationSpec,
      callback
    );
  }

  /**
   * Get '-1.034E-20' numeric value
   * @param options The options parameters.
   */
  floatScientificNegative(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  floatScientificNegative(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  floatScientificNegative(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  floatScientificNegative(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      floatScientificNegativeOperationSpec,
      callback
    );
  }

  /**
   * Get '9999999.999' numeric value
   * @param options The options parameters.
   */
  doubleDecimalPositive(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  doubleDecimalPositive(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  doubleDecimalPositive(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  doubleDecimalPositive(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      doubleDecimalPositiveOperationSpec,
      callback
    );
  }

  /**
   * Get '-9999999.999' numeric value
   * @param options The options parameters.
   */
  doubleDecimalNegative(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  doubleDecimalNegative(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  doubleDecimalNegative(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  doubleDecimalNegative(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      doubleDecimalNegativeOperationSpec,
      callback
    );
  }

  /**
   * Get '啊齄丂狛狜隣郎隣兀﨩' multi-byte string value
   * @param options The options parameters.
   */
  stringUnicode(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  stringUnicode(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  stringUnicode(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  stringUnicode(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      stringUnicodeOperationSpec,
      callback
    );
  }

  /**
   * Get 'begin!*'();:@ &=+$,/?#[]end
   * @param options The options parameters.
   */
  stringUrlEncoded(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  stringUrlEncoded(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  stringUrlEncoded(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  stringUrlEncoded(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      stringUrlEncodedOperationSpec,
      callback
    );
  }

  /**
   * Get ''
   * @param options The options parameters.
   */
  stringEmpty(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  stringEmpty(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  stringEmpty(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  stringEmpty(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      stringEmptyOperationSpec,
      callback
    );
  }

  /**
   * Get null (should throw)
   * @param options The options parameters.
   */
  stringNull(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  stringNull(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  stringNull(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  stringNull(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      stringNullOperationSpec,
      callback
    );
  }

  /**
   * Get using uri with 'green color' in path parameter
   * @param options The options parameters.
   */
  enumValid(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  enumValid(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  enumValid(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  enumValid(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      enumValidOperationSpec,
      callback
    );
  }

  /**
   * Get null (should throw on the client before the request is sent on wire)
   * @param options The options parameters.
   */
  enumNull(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  enumNull(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  enumNull(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  enumNull(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      enumNullOperationSpec,
      callback
    );
  }

  /**
   * Get '啊齄丂狛狜隣郎隣兀﨩' multibyte value as utf-8 encoded byte array
   * @param options The options parameters.
   */
  byteMultiByte(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  byteMultiByte(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  byteMultiByte(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  byteMultiByte(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      byteMultiByteOperationSpec,
      callback
    );
  }

  /**
   * Get '' as byte array
   * @param options The options parameters.
   */
  byteEmpty(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  byteEmpty(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  byteEmpty(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  byteEmpty(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      byteEmptyOperationSpec,
      callback
    );
  }

  /**
   * Get null as byte array (should throw)
   * @param options The options parameters.
   */
  byteNull(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  byteNull(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  byteNull(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  byteNull(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      byteNullOperationSpec,
      callback
    );
  }

  /**
   * Get '2012-01-01' as date
   * @param options The options parameters.
   */
  dateValid(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  dateValid(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  dateValid(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  dateValid(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      dateValidOperationSpec,
      callback
    );
  }

  /**
   * Get null as date - this should throw or be unusable on the client side, depending on date representation
   * @param options The options parameters.
   */
  dateNull(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  dateNull(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  dateNull(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  dateNull(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      dateNullOperationSpec,
      callback
    );
  }

  /**
   * Get '2012-01-01T01:01:01Z' as date-time
   * @param options The options parameters.
   */
  dateTimeValid(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  dateTimeValid(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  dateTimeValid(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  dateTimeValid(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      dateTimeValidOperationSpec,
      callback
    );
  }

  /**
   * Get null as date-time, should be disallowed or throw depending on representation of date-time
   * @param options The options parameters.
   */
  dateTimeNull(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  dateTimeNull(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  dateTimeNull(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  dateTimeNull(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      dateTimeNullOperationSpec,
      callback
    );
  }

  /**
   * Get 'lorem' encoded value as 'bG9yZW0' (base64url)
   * @param options The options parameters.
   */
  base64Url(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  base64Url(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  base64Url(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  base64Url(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      base64UrlOperationSpec,
      callback
    );
  }

  /**
   * Get an array of string ['ArrayPath1', 'begin!*'();:@ &=+$,/?#[]end' , null, ''] using the csv-array format
   * @param options The options parameters.
   */
  arrayCsvInPath(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  arrayCsvInPath(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  arrayCsvInPath(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  arrayCsvInPath(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      arrayCsvInPathOperationSpec,
      callback
    );
  }

  /**
   * Get the date 2016-04-13 encoded value as '1460505600' (Unix time)
   * @param options The options parameters.
   */
  unixTimeUrl(options?: coreHttp.RequestOptionsBase): Promise<any>;
  /**
   * @param callback The callback.
   */
  unixTimeUrl(callback: coreHttp.ServiceCallback<any>): void;
  /**
   * @param options The options parameters.
   * @param callback The callback.
   */
  unixTimeUrl(
    options: coreHttp.RequestOptionsBase,
    callback: coreHttp.ServiceCallback<any>
  ): void;
  unixTimeUrl(
    options?: coreHttp.RequestOptionsBase,
    callback?: coreHttp.ServiceCallback<any>
  ): Promise<any> {
    return this.client.sendOperationRequest(
      { options },
      unixTimeUrlOperationSpec,
      callback
    );
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers);

const getBooleanTrueOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/bool/true/{boolPath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const getBooleanFalseOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/bool/false/{boolPath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const getIntOneMillionOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/int/1000000/{intPath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const getIntNegativeOneMillionOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/int/-1000000/{intPath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const getTenBillionOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/long/10000000000/{longPath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const getNegativeTenBillionOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/long/-10000000000/{longPath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const floatScientificPositiveOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/float/1.034E+20/{floatPath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const floatScientificNegativeOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/float/-1.034E-20/{floatPath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const doubleDecimalPositiveOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/double/9999999.999/{doublePath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const doubleDecimalNegativeOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/double/-9999999.999/{doublePath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const stringUnicodeOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/string/unicode/{stringPath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const stringUrlEncodedOperationSpec: coreHttp.OperationSpec = {
  path:
    "/paths/string/begin%21%2A%27%28%29%3B%3A%40%20%26%3D%2B%24%2C%2F%3F%23%5B%5Dend/{stringPath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const stringEmptyOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/string/empty/{stringPath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const stringNullOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/string/null/{stringPath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const enumValidOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/enum/green%20color/{enumPath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const enumNullOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/string/null/{enumPath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const byteMultiByteOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/byte/multibyte/{bytePath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const byteEmptyOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/byte/empty/{bytePath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const byteNullOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/byte/null/{bytePath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const dateValidOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/date/2012-01-01/{datePath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const dateNullOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/date/null/{datePath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const dateTimeValidOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/datetime/2012-01-01T01%3A01%3A01Z/{dateTimePath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const dateTimeNullOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/datetime/null/{dateTimePath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const base64UrlOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/string/bG9yZW0/{base64UrlPath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const arrayCsvInPathOperationSpec: coreHttp.OperationSpec = {
  path:
    "/paths/array/ArrayPath1%2cbegin%21%2A%27%28%29%3B%3A%40%20%26%3D%2B%24%2C%2F%3F%23%5B%5Dend%2c%2c/{arrayPath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
const unixTimeUrlOperationSpec: coreHttp.OperationSpec = {
  path: "/paths/int/1460505600/{unixTimeUrlPath}",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  serializer
};
