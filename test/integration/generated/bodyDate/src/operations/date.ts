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
import { BodyDateClient } from "../bodyDateClient";

/**
 * Class representing a DateModel.
 */
export class DateModel {
  private readonly client: BodyDateClient;

  /**
   * Initialize a new instance of the class DateModel class.
   * @param client Reference to the service client
   */
  constructor(client: BodyDateClient) {
    this.client = client;
  }

  /**
   * Get null date value
   * @param options The options parameters.
   */
  getNull(
    options?: coreHttp.OperationOptions
  ): Promise<Models.DateModelGetNullResponse> {
    return this.client.sendOperationRequest(
      { options },
      getNullOperationSpec
    ) as Promise<Models.DateModelGetNullResponse>;
  }

  /**
   * Get invalid date value
   * @param options The options parameters.
   */
  getInvalidDate(
    options?: coreHttp.OperationOptions
  ): Promise<Models.DateModelGetInvalidDateResponse> {
    return this.client.sendOperationRequest(
      { options },
      getInvalidDateOperationSpec
    ) as Promise<Models.DateModelGetInvalidDateResponse>;
  }

  /**
   * Get overflow date value
   * @param options The options parameters.
   */
  getOverflowDate(
    options?: coreHttp.OperationOptions
  ): Promise<Models.DateModelGetOverflowDateResponse> {
    return this.client.sendOperationRequest(
      { options },
      getOverflowDateOperationSpec
    ) as Promise<Models.DateModelGetOverflowDateResponse>;
  }

  /**
   * Get underflow date value
   * @param options The options parameters.
   */
  getUnderflowDate(
    options?: coreHttp.OperationOptions
  ): Promise<Models.DateModelGetUnderflowDateResponse> {
    return this.client.sendOperationRequest(
      { options },
      getUnderflowDateOperationSpec
    ) as Promise<Models.DateModelGetUnderflowDateResponse>;
  }

  /**
   * Put max date value 9999-12-31
   * @param dateBody
   * @param options The options parameters.
   */
  putMaxDate(
    dateBody: Date,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { dateBody, options },
      putMaxDateOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get max date value 9999-12-31
   * @param options The options parameters.
   */
  getMaxDate(
    options?: coreHttp.OperationOptions
  ): Promise<Models.DateModelGetMaxDateResponse> {
    return this.client.sendOperationRequest(
      { options },
      getMaxDateOperationSpec
    ) as Promise<Models.DateModelGetMaxDateResponse>;
  }

  /**
   * Put min date value 0000-01-01
   * @param dateBody
   * @param options The options parameters.
   */
  putMinDate(
    dateBody: Date,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    return this.client.sendOperationRequest(
      { dateBody, options },
      putMinDateOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Get min date value 0000-01-01
   * @param options The options parameters.
   */
  getMinDate(
    options?: coreHttp.OperationOptions
  ): Promise<Models.DateModelGetMinDateResponse> {
    return this.client.sendOperationRequest(
      { options },
      getMinDateOperationSpec
    ) as Promise<Models.DateModelGetMinDateResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const getNullOperationSpec: coreHttp.OperationSpec = {
  path: "/date/null",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "Date" }, serializedName: "Date" }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const getInvalidDateOperationSpec: coreHttp.OperationSpec = {
  path: "/date/invaliddate",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "Date" }, serializedName: "Date" }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const getOverflowDateOperationSpec: coreHttp.OperationSpec = {
  path: "/date/overflowdate",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "Date" }, serializedName: "Date" }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const getUnderflowDateOperationSpec: coreHttp.OperationSpec = {
  path: "/date/underflowdate",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "Date" }, serializedName: "Date" }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putMaxDateOperationSpec: coreHttp.OperationSpec = {
  path: "/date/max",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.dateBody,
  urlParameters: [Parameters.$host],
  serializer
};
const getMaxDateOperationSpec: coreHttp.OperationSpec = {
  path: "/date/max",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "Date" }, serializedName: "Date" }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
const putMinDateOperationSpec: coreHttp.OperationSpec = {
  path: "/date/min",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  requestBody: Parameters.dateBody,
  urlParameters: [Parameters.$host],
  serializer
};
const getMinDateOperationSpec: coreHttp.OperationSpec = {
  path: "/date/min",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: { type: { name: "Date" }, serializedName: "Date" }
    },
    default: {
      bodyMapper: Mappers.ErrorModel
    }
  },
  urlParameters: [Parameters.$host],
  serializer
};
