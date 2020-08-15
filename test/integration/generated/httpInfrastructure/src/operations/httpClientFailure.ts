/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { HttpInfrastructureClient } from "../httpInfrastructureClient";

/**
 * Class representing a HttpClientFailure.
 */
export class HttpClientFailure {
  private readonly client: HttpInfrastructureClient;

  /**
   * Initialize a new instance of the class HttpClientFailure class.
   * @param client Reference to the service client
   */
  constructor(client: HttpInfrastructureClient) {
    this.client = client;
  }

  /**
   * Return 400 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  head400(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      head400OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 400 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  get400(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      get400OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 400 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  options400(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      options400OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 400 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  put400(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      put400OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 400 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  patch400(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      patch400OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 400 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  post400(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      post400OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 400 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  delete400(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      delete400OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 401 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  head401(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      head401OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 402 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  get402(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      get402OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 403 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  options403(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      options403OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 403 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  get403(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      get403OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 404 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  put404(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      put404OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 405 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  patch405(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      patch405OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 406 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  post406(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      post406OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 407 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  delete407(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      delete407OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 409 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  put409(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      put409OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 410 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  head410(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      head410OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 411 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  get411(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      get411OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 412 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  options412(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      options412OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 412 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  get412(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      get412OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 413 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  put413(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      put413OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 414 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  patch414(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      patch414OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 415 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  post415(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      post415OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 416 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  get416(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      get416OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 417 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  delete417(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      delete417OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 429 status code - should be represented in the client as an error
   * @param options The options parameters.
   */
  head429(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      head429OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const head400OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/400",
  httpMethod: "HEAD",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const get400OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/400",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const options400OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/400",
  httpMethod: "OPTIONS",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const put400OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/400",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const patch400OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/400",
  httpMethod: "PATCH",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const post400OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/400",
  httpMethod: "POST",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const delete400OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/400",
  httpMethod: "DELETE",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const head401OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/401",
  httpMethod: "HEAD",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const get402OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/402",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const options403OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/403",
  httpMethod: "OPTIONS",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const get403OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/403",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const put404OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/404",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const patch405OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/405",
  httpMethod: "PATCH",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const post406OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/406",
  httpMethod: "POST",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const delete407OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/407",
  httpMethod: "DELETE",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const put409OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/409",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const head410OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/410",
  httpMethod: "HEAD",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const get411OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/411",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const options412OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/412",
  httpMethod: "OPTIONS",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const get412OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/412",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const put413OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/413",
  httpMethod: "PUT",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const patch414OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/414",
  httpMethod: "PATCH",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const post415OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/415",
  httpMethod: "POST",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const get416OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/416",
  httpMethod: "GET",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const delete417OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/417",
  httpMethod: "DELETE",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept1],
  mediaType: "json",
  serializer
};
const head429OperationSpec: coreHttp.OperationSpec = {
  path: "/http/failure/client/429",
  httpMethod: "HEAD",
  responses: {
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
