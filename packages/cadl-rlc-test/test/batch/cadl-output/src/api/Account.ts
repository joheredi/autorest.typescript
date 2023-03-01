// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AccountListSupportedImagesResult,
  PoolNodeCountsListResult,
} from "./models.js";
import { BatchServiceClient as Client, isUnexpected } from "../rest/index.js";
import { RequestParameters } from "@azure-rest/core-client";

export interface AccountlistSupportedImagesOptions extends RequestParameters {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocp_date?: string;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  time_out?: number;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  client_request_id?: string;
  /** Whether the server should return the client-request-id in the response. */
  return_client_request_id?: boolean;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-support-images.
   */
  filter?: string;
}

/** Lists all Virtual Machine Images supported by the Azure Batch service. */
export async function listSupportedImages(
  context: Client,
  options: AccountlistSupportedImagesOptions = {}
): Promise<AccountListSupportedImagesResult> {
  const result = await context.path("/supportedimages").get({
    headers: {
      ...(options.ocp_date && { "ocp-date": options.ocp_date }),
      ...(options.client_request_id && {
        "client-request-id": options.client_request_id,
      }),
      ...(options.return_client_request_id && {
        "return-client-request-id": options.return_client_request_id,
      }),
      Accept: options.accept ?? "application/json",
    },
    queryParameters: {
      ...(options.maxresults && { maxresults: options.maxresults }),
      ...(options.time_out && { timeOut: options.time_out }),
      ...(options.filter && { $filter: options.filter }),
    },
  });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    value: (result.body.value ?? []).map((p) => ({
      nodeAgentSKUId: p.nodeAgentSKUId,
      imageReference: {
        publisher: p.imageReference.publisher,
        offer: p.imageReference.offer,
        sku: p.imageReference.sku,
        version: p.imageReference.version,
        virtualMachineImageId: p.imageReference.virtualMachineImageId,
        exactVersion: p.imageReference.exactVersion,
      },
      osType: p.osType,
      capabilities: p.capabilities,
      batchSupportEndOfLife: new Date(p.batchSupportEndOfLife ?? ""),
      verificationType: p.verificationType,
    })),
    nextLink: result.body.nextLink,
  };
}

export interface AccountlistPoolNodeCountsOptions extends RequestParameters {
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  maxresults?: number;
  /**
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocp_date?: string;
  /**
   * The maximum number of items to return in the response. A maximum of 1000
   * applications can be returned.
   */
  time_out?: number;
  /**
   * The caller-generated request identity, in the form of a GUID with no decoration
   * such as curly braces, e.g. 9C4D50EE-2D56-4CD3-8152-34347DC9F2B0.
   */
  client_request_id?: string;
  /** Whether the server should return the client-request-id in the response. */
  return_client_request_id?: boolean;
  /**
   * An OData $filter clause. For more information on constructing this filter, see
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-support-images.
   */
  filter?: string;
}

/**
 * Gets the number of Compute Nodes in each state, grouped by Pool. Note that the
 * numbers returned may not always be up to date. If you need exact node counts,
 * use a list query.
 */
export async function listPoolNodeCounts(
  context: Client,
  options: AccountlistPoolNodeCountsOptions = {}
): Promise<PoolNodeCountsListResult> {
  const result = await context.path("/nodecounts").get({
    headers: {
      ...(options.ocp_date && { "ocp-date": options.ocp_date }),
      ...(options.client_request_id && {
        "client-request-id": options.client_request_id,
      }),
      ...(options.return_client_request_id && {
        "return-client-request-id": options.return_client_request_id,
      }),
      Accept: options.accept ?? "application/json",
    },
    queryParameters: {
      ...(options.maxresults && { maxresults: options.maxresults }),
      ...(options.time_out && { timeOut: options.time_out }),
      ...(options.filter && { $filter: options.filter }),
    },
  });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    value: (result.body.value ?? []).map((p) => ({
      poolId: p.poolId,
      dedicated: !p.dedicated
        ? undefined
        : {
            creating: p.dedicated?.creating,
            idle: p.dedicated?.idle,
            offline: p.dedicated?.offline,
            preempted: p.dedicated?.preempted,
            rebooting: p.dedicated?.rebooting,
            reimaging: p.dedicated?.reimaging,
            running: p.dedicated?.running,
            starting: p.dedicated?.starting,
            startTaskFailed: p.dedicated?.startTaskFailed,
            leavingPool: p.dedicated?.leavingPool,
            unknown: p.dedicated?.unknown,
            unusable: p.dedicated?.unusable,
            waitingForStartTask: p.dedicated?.waitingForStartTask,
            total: p.dedicated?.total,
          },
      lowPriority: !p.lowPriority
        ? undefined
        : {
            creating: p.lowPriority?.creating,
            idle: p.lowPriority?.idle,
            offline: p.lowPriority?.offline,
            preempted: p.lowPriority?.preempted,
            rebooting: p.lowPriority?.rebooting,
            reimaging: p.lowPriority?.reimaging,
            running: p.lowPriority?.running,
            starting: p.lowPriority?.starting,
            startTaskFailed: p.lowPriority?.startTaskFailed,
            leavingPool: p.lowPriority?.leavingPool,
            unknown: p.lowPriority?.unknown,
            unusable: p.lowPriority?.unusable,
            waitingForStartTask: p.lowPriority?.waitingForStartTask,
            total: p.lowPriority?.total,
          },
    })),
    nextLink: result.body.nextLink,
  };
}
