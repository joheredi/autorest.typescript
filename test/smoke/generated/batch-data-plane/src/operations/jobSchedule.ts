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
import { BatchService } from "../batchService";
import {
  JobScheduleExistsOptionalParams,
  JobScheduleExistsResponse,
  JobScheduleDeleteOptionalParams,
  JobScheduleDeleteResponse,
  JobScheduleGetOptionalParams,
  JobScheduleGetResponse,
  JobSchedulePatchParameter,
  JobSchedulePatchOptionalParams,
  JobSchedulePatchResponse,
  JobScheduleUpdateParameter,
  JobScheduleUpdateOptionalParams,
  JobScheduleUpdateResponse,
  JobScheduleDisableOptionalParams,
  JobScheduleDisableResponse,
  JobScheduleEnableOptionalParams,
  JobScheduleEnableResponse,
  JobScheduleTerminateOptionalParams,
  JobScheduleTerminateResponse,
  JobScheduleAddParameter,
  JobScheduleAddOptionalParams,
  JobScheduleAddResponse,
  JobScheduleListOptionalParams,
  JobScheduleListResponse,
  JobScheduleListNextOptionalParams,
  JobScheduleListNextResponse
} from "../models";

/**
 * Class representing a JobSchedule.
 */
export class JobSchedule {
  private readonly client: BatchService;

  /**
   * Initialize a new instance of the class JobSchedule class.
   * @param client Reference to the service client
   */
  constructor(client: BatchService) {
    this.client = client;
  }

  /**
   * Checks the specified Job Schedule exists.
   * @param jobScheduleId The ID of the Job Schedule which you want to check.
   * @param options The options parameters.
   */
  exists(
    jobScheduleId: string,
    options?: JobScheduleExistsOptionalParams
  ): Promise<JobScheduleExistsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { jobScheduleId, options: operationOptions },
      existsOperationSpec
    ) as Promise<JobScheduleExistsResponse>;
  }

  /**
   * When you delete a Job Schedule, this also deletes all Jobs and Tasks under that schedule. When Tasks
   * are deleted, all the files in their working directories on the Compute Nodes are also deleted (the
   * retention period is ignored). The Job Schedule statistics are no longer accessible once the Job
   * Schedule is deleted, though they are still counted towards Account lifetime statistics.
   * @param jobScheduleId The ID of the Job Schedule to delete.
   * @param options The options parameters.
   */
  delete(
    jobScheduleId: string,
    options?: JobScheduleDeleteOptionalParams
  ): Promise<JobScheduleDeleteResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { jobScheduleId, options: operationOptions },
      deleteOperationSpec
    ) as Promise<JobScheduleDeleteResponse>;
  }

  /**
   * Gets information about the specified Job Schedule.
   * @param jobScheduleId The ID of the Job Schedule to get.
   * @param options The options parameters.
   */
  get(
    jobScheduleId: string,
    options?: JobScheduleGetOptionalParams
  ): Promise<JobScheduleGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { jobScheduleId, options: operationOptions },
      getOperationSpec
    ) as Promise<JobScheduleGetResponse>;
  }

  /**
   * This replaces only the Job Schedule properties specified in the request. For example, if the
   * schedule property is not specified with this request, then the Batch service will keep the existing
   * schedule. Changes to a Job Schedule only impact Jobs created by the schedule after the update has
   * taken place; currently running Jobs are unaffected.
   * @param jobSchedulePatchParameter The parameters for the request.
   * @param jobScheduleId The ID of the Job Schedule to update.
   * @param options The options parameters.
   */
  patch(
    jobSchedulePatchParameter: JobSchedulePatchParameter,
    jobScheduleId: string,
    options?: JobSchedulePatchOptionalParams
  ): Promise<JobSchedulePatchResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { jobSchedulePatchParameter, jobScheduleId, options: operationOptions },
      patchOperationSpec
    ) as Promise<JobSchedulePatchResponse>;
  }

  /**
   * This fully replaces all the updatable properties of the Job Schedule. For example, if the schedule
   * property is not specified with this request, then the Batch service will remove the existing
   * schedule. Changes to a Job Schedule only impact Jobs created by the schedule after the update has
   * taken place; currently running Jobs are unaffected.
   * @param jobScheduleId The ID of the Job Schedule to update.
   * @param jobScheduleUpdateParameter The parameters for the request.
   * @param options The options parameters.
   */
  update(
    jobScheduleId: string,
    jobScheduleUpdateParameter: JobScheduleUpdateParameter,
    options?: JobScheduleUpdateOptionalParams
  ): Promise<JobScheduleUpdateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { jobScheduleId, jobScheduleUpdateParameter, options: operationOptions },
      updateOperationSpec
    ) as Promise<JobScheduleUpdateResponse>;
  }

  /**
   * No new Jobs will be created until the Job Schedule is enabled again.
   * @param jobScheduleId The ID of the Job Schedule to disable.
   * @param options The options parameters.
   */
  disable(
    jobScheduleId: string,
    options?: JobScheduleDisableOptionalParams
  ): Promise<JobScheduleDisableResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { jobScheduleId, options: operationOptions },
      disableOperationSpec
    ) as Promise<JobScheduleDisableResponse>;
  }

  /**
   * Enables a Job Schedule.
   * @param jobScheduleId The ID of the Job Schedule to enable.
   * @param options The options parameters.
   */
  enable(
    jobScheduleId: string,
    options?: JobScheduleEnableOptionalParams
  ): Promise<JobScheduleEnableResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { jobScheduleId, options: operationOptions },
      enableOperationSpec
    ) as Promise<JobScheduleEnableResponse>;
  }

  /**
   * Terminates a Job Schedule.
   * @param jobScheduleId The ID of the Job Schedule to terminates.
   * @param options The options parameters.
   */
  terminate(
    jobScheduleId: string,
    options?: JobScheduleTerminateOptionalParams
  ): Promise<JobScheduleTerminateResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { jobScheduleId, options: operationOptions },
      terminateOperationSpec
    ) as Promise<JobScheduleTerminateResponse>;
  }

  /**
   * Adds a Job Schedule to the specified Account.
   * @param cloudJobSchedule The Job Schedule to be added.
   * @param options The options parameters.
   */
  add(
    cloudJobSchedule: JobScheduleAddParameter,
    options?: JobScheduleAddOptionalParams
  ): Promise<JobScheduleAddResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { cloudJobSchedule, options: operationOptions },
      addOperationSpec
    ) as Promise<JobScheduleAddResponse>;
  }

  /**
   * Lists all of the Job Schedules in the specified Account.
   * @param options The options parameters.
   */
  list(
    options?: JobScheduleListOptionalParams
  ): Promise<JobScheduleListResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { options: operationOptions },
      listOperationSpec
    ) as Promise<JobScheduleListResponse>;
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    nextLink: string,
    options?: JobScheduleListNextOptionalParams
  ): Promise<JobScheduleListNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { nextLink, options: operationOptions },
      listNextOperationSpec
    ) as Promise<JobScheduleListNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const existsOperationSpec: coreHttp.OperationSpec = {
  path: "/jobschedules/{jobScheduleId}",
  httpMethod: "HEAD",
  responses: {
    200: {
      headersMapper: Mappers.JobScheduleExistsHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.timeout45],
  urlParameters: [Parameters.batchUrl, Parameters.jobScheduleId1],
  headerParameters: [
    Parameters.clientRequestId45,
    Parameters.returnClientRequestId45,
    Parameters.ocpDate45,
    Parameters.ifMatch15,
    Parameters.ifNoneMatch15,
    Parameters.ifModifiedSince19,
    Parameters.ifUnmodifiedSince19
  ],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path: "/jobschedules/{jobScheduleId}",
  httpMethod: "DELETE",
  responses: {
    202: {
      headersMapper: Mappers.JobScheduleDeleteHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.timeout46],
  urlParameters: [Parameters.batchUrl, Parameters.jobScheduleId2],
  headerParameters: [
    Parameters.clientRequestId46,
    Parameters.returnClientRequestId46,
    Parameters.ocpDate46,
    Parameters.ifMatch16,
    Parameters.ifNoneMatch16,
    Parameters.ifModifiedSince20,
    Parameters.ifUnmodifiedSince20
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path: "/jobschedules/{jobScheduleId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CloudJobSchedule,
      headersMapper: Mappers.JobScheduleGetHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.select8,
    Parameters.expand5,
    Parameters.timeout47
  ],
  urlParameters: [Parameters.batchUrl, Parameters.jobScheduleId3],
  headerParameters: [
    Parameters.clientRequestId47,
    Parameters.returnClientRequestId47,
    Parameters.ocpDate47,
    Parameters.ifMatch17,
    Parameters.ifNoneMatch17,
    Parameters.ifModifiedSince21,
    Parameters.ifUnmodifiedSince21
  ],
  serializer
};
const patchOperationSpec: coreHttp.OperationSpec = {
  path: "/jobschedules/{jobScheduleId}",
  httpMethod: "PATCH",
  responses: {
    200: {
      headersMapper: Mappers.JobSchedulePatchHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError
    }
  },
  requestBody: Parameters.jobSchedulePatchParameter,
  queryParameters: [Parameters.apiVersion, Parameters.timeout48],
  urlParameters: [Parameters.batchUrl, Parameters.jobScheduleId4],
  headerParameters: [
    Parameters.contentType,
    Parameters.clientRequestId48,
    Parameters.returnClientRequestId48,
    Parameters.ocpDate48,
    Parameters.ifMatch18,
    Parameters.ifNoneMatch18,
    Parameters.ifModifiedSince22,
    Parameters.ifUnmodifiedSince22
  ],
  serializer
};
const updateOperationSpec: coreHttp.OperationSpec = {
  path: "/jobschedules/{jobScheduleId}",
  httpMethod: "PUT",
  responses: {
    200: {
      headersMapper: Mappers.JobScheduleUpdateHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError
    }
  },
  requestBody: Parameters.jobScheduleUpdateParameter,
  queryParameters: [Parameters.apiVersion, Parameters.timeout49],
  urlParameters: [Parameters.batchUrl, Parameters.jobScheduleId4],
  headerParameters: [
    Parameters.contentType,
    Parameters.clientRequestId49,
    Parameters.returnClientRequestId49,
    Parameters.ocpDate49,
    Parameters.ifMatch19,
    Parameters.ifNoneMatch19,
    Parameters.ifModifiedSince23,
    Parameters.ifUnmodifiedSince23
  ],
  serializer
};
const disableOperationSpec: coreHttp.OperationSpec = {
  path: "/jobschedules/{jobScheduleId}/disable",
  httpMethod: "POST",
  responses: {
    204: {
      headersMapper: Mappers.JobScheduleDisableHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.timeout50],
  urlParameters: [Parameters.batchUrl, Parameters.jobScheduleId5],
  headerParameters: [
    Parameters.clientRequestId50,
    Parameters.returnClientRequestId50,
    Parameters.ocpDate50,
    Parameters.ifMatch20,
    Parameters.ifNoneMatch20,
    Parameters.ifModifiedSince24,
    Parameters.ifUnmodifiedSince24
  ],
  serializer
};
const enableOperationSpec: coreHttp.OperationSpec = {
  path: "/jobschedules/{jobScheduleId}/enable",
  httpMethod: "POST",
  responses: {
    204: {
      headersMapper: Mappers.JobScheduleEnableHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.timeout51],
  urlParameters: [Parameters.batchUrl, Parameters.jobScheduleId6],
  headerParameters: [
    Parameters.clientRequestId51,
    Parameters.returnClientRequestId51,
    Parameters.ocpDate51,
    Parameters.ifMatch21,
    Parameters.ifNoneMatch21,
    Parameters.ifModifiedSince25,
    Parameters.ifUnmodifiedSince25
  ],
  serializer
};
const terminateOperationSpec: coreHttp.OperationSpec = {
  path: "/jobschedules/{jobScheduleId}/terminate",
  httpMethod: "POST",
  responses: {
    202: {
      headersMapper: Mappers.JobScheduleTerminateHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.timeout52],
  urlParameters: [Parameters.batchUrl, Parameters.jobScheduleId7],
  headerParameters: [
    Parameters.clientRequestId52,
    Parameters.returnClientRequestId52,
    Parameters.ocpDate52,
    Parameters.ifMatch22,
    Parameters.ifNoneMatch22,
    Parameters.ifModifiedSince26,
    Parameters.ifUnmodifiedSince26
  ],
  serializer
};
const addOperationSpec: coreHttp.OperationSpec = {
  path: "/jobschedules",
  httpMethod: "POST",
  responses: {
    201: {
      headersMapper: Mappers.JobScheduleAddHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError
    }
  },
  requestBody: Parameters.cloudJobSchedule,
  queryParameters: [Parameters.apiVersion, Parameters.timeout53],
  urlParameters: [Parameters.batchUrl],
  headerParameters: [
    Parameters.contentType,
    Parameters.clientRequestId53,
    Parameters.returnClientRequestId53,
    Parameters.ocpDate53
  ],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path: "/jobschedules",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CloudJobScheduleListResult,
      headersMapper: Mappers.JobScheduleListHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter10,
    Parameters.select9,
    Parameters.expand6,
    Parameters.maxResults11,
    Parameters.timeout54
  ],
  urlParameters: [Parameters.batchUrl],
  headerParameters: [
    Parameters.clientRequestId54,
    Parameters.returnClientRequestId54,
    Parameters.ocpDate54
  ],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CloudJobScheduleListResult,
      headersMapper: Mappers.JobScheduleListNextHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter10,
    Parameters.select9,
    Parameters.expand6,
    Parameters.maxResults11,
    Parameters.timeout54
  ],
  urlParameters: [Parameters.batchUrl, Parameters.nextLink],
  headerParameters: [
    Parameters.clientRequestId54,
    Parameters.returnClientRequestId54,
    Parameters.ocpDate54
  ],
  serializer
};
