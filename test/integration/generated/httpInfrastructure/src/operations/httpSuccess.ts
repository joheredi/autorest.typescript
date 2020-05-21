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
import {
  HttpSuccessGet200Response,
  HttpSuccessOptions200Response
} from "../models";

/**
 * Class representing a HttpSuccess.
 */
export class HttpSuccess {
  private readonly client: HttpInfrastructureClient;

  /**
   * Initialize a new instance of the class HttpSuccess class.
   * @param client Reference to the service client
   */
  constructor(client: HttpInfrastructureClient) {
    this.client = client;
  }

  /**
   * Return 200 status code if successful
   * @param options The options parameters.
   */
  head200(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      head200OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get 200 success
   * @param options The options parameters.
   */
  get200(
    options?: coreHttp.OperationOptions
  ): Promise<HttpSuccessGet200Response> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      get200OperationSpec
    ) as Promise<HttpSuccessGet200Response>;
  }

  /**
   * Options 200 success
   * @param options The options parameters.
   */
  options200(
    options?: coreHttp.OperationOptions
  ): Promise<HttpSuccessOptions200Response> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      options200OperationSpec
    ) as Promise<HttpSuccessOptions200Response>;
  }

  /**
   * Put boolean value true returning 200 success
   * @param options The options parameters.
   */
  put200(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      put200OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Patch true Boolean value in request returning 200
   * @param options The options parameters.
   */
  patch200(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      patch200OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Post bollean value true in request that returns a 200
   * @param options The options parameters.
   */
  post200(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      post200OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Delete simple boolean value true returns 200
   * @param options The options parameters.
   */
  delete200(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      delete200OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Put true Boolean value in request returns 201
   * @param options The options parameters.
   */
  put201(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      put201OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Post true Boolean value in request returns 201 (Created)
   * @param options The options parameters.
   */
  post201(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      post201OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Put true Boolean value in request returns 202 (Accepted)
   * @param options The options parameters.
   */
  put202(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      put202OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Patch true Boolean value in request returns 202
   * @param options The options parameters.
   */
  patch202(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      patch202OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Post true Boolean value in request returns 202 (Accepted)
   * @param options The options parameters.
   */
  post202(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      post202OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Delete true Boolean value in request returns 202 (accepted)
   * @param options The options parameters.
   */
  delete202(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      delete202OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 204 status code if successful
   * @param options The options parameters.
   */
  head204(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      head204OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Put true Boolean value in request returns 204 (no content)
   * @param options The options parameters.
   */
  put204(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      put204OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Patch true Boolean value in request returns 204 (no content)
   * @param options The options parameters.
   */
  patch204(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      patch204OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Post true Boolean value in request returns 204 (no content)
   * @param options The options parameters.
   */
  post204(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      post204OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Delete true Boolean value in request returns 204 (no content)
   * @param options The options parameters.
   */
  delete204(
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      delete204OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Return 404 status code
   * @param options The options parameters.
   */
  head404(options?: coreHttp.OperationOptions): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      head404OperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const head200OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/200",
  httpMethod: "HEAD",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const get200OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/200",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "Boolean" } }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const options200OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/200",
  httpMethod: "OPTIONS",
  responses: {
    200: {
      bodyMapper: { type: { name: "Boolean" } }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const put200OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/200",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  serializer
};
const patch200OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/200",
  httpMethod: "PATCH",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  serializer
};
const post200OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/200",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  serializer
};
const delete200OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/200",
  httpMethod: "DELETE",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  serializer
};
const put201OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/201",
  httpMethod: "PUT",
  responses: {
    201: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  serializer
};
const post201OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/201",
  httpMethod: "POST",
  responses: {
    201: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  serializer
};
const put202OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/202",
  httpMethod: "PUT",
  responses: {
    202: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  serializer
};
const patch202OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/202",
  httpMethod: "PATCH",
  responses: {
    202: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  serializer
};
const post202OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/202",
  httpMethod: "POST",
  responses: {
    202: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  serializer
};
const delete202OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/202",
  httpMethod: "DELETE",
  responses: {
    202: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  serializer
};
const head204OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/204",
  httpMethod: "HEAD",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const put204OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/204",
  httpMethod: "PUT",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  serializer
};
const patch204OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/204",
  httpMethod: "PATCH",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  serializer
};
const post204OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/204",
  httpMethod: "POST",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  serializer
};
const delete204OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/204",
  httpMethod: "DELETE",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.booleanValue,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType],
  serializer
};
const head404OperationSpec: coreHttp.OperationSpec = {
  path: "/http/success/404",
  httpMethod: "HEAD",
  responses: {
    204: {},
    404: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
