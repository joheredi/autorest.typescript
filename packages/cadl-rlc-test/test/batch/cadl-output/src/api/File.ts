// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NodeFileListResult } from "./models.js";
import { BatchServiceClient as Client, isUnexpected } from "../rest/index.js";
import { RequestParameters } from "@azure-rest/core-client";

export interface FiledeleteFileFromTaskOptions extends RequestParameters {
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
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocp_date?: string;
  /**
   * Whether to delete children of a directory. If the filePath parameter represents
   * a directory instead of a file, you can set recursive to true to delete the
   * directory and all of the files and subdirectories in it. If recursive is false
   * then the directory must be empty or deletion will fail.
   */
  recursive?: boolean;
}

/** Deletes the specified Task file from the Compute Node where the Task ran. */
export async function deleteFileFromTask(
  context: Client,
  job_id: string,
  task_id: string,
  file_path: string,
  options: FiledeleteFileFromTaskOptions = {}
): Promise<void> {
  const result = await context
    .path(
      "/jobs/{jobId}/tasks/{taskId}/files/{filePath}",
      job_id,
      task_id,
      file_path
    )
    .delete({
      headers: {
        ...(options.client_request_id && {
          "client-request-id": options.client_request_id,
        }),
        ...(options.return_client_request_id && {
          "return-client-request-id": options.return_client_request_id,
        }),
        ...(options.ocp_date && { "ocp-date": options.ocp_date }),
      },
      queryParameters: {
        ...(options.time_out && { timeOut: options.time_out }),
        ...(options.recursive && { recursive: options.recursive }),
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

export interface FilegetFileFromTaskOptions extends RequestParameters {
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
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocp_date?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  if__modified__since?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  if__unmodified__since?: string;
  /**
   * The byte range to be retrieved. The default is to retrieve the entire file. The
   * format is bytes=startRange-endRange.
   */
  ocp_range?: string;
}

/** Returns the content of the specified Task file. */
export async function getFileFromTask(
  context: Client,
  job_id: string,
  task_id: string,
  file_path: string,
  options: FilegetFileFromTaskOptions = {}
): Promise<void> {
  const result = await context
    .path(
      "/jobs/{jobId}/tasks/{taskId}/files/{filePath}",
      job_id,
      task_id,
      file_path
    )
    .get({
      headers: {
        ...(options.client_request_id && {
          "client-request-id": options.client_request_id,
        }),
        ...(options.return_client_request_id && {
          "return-client-request-id": options.return_client_request_id,
        }),
        ...(options.ocp_date && { "ocp-date": options.ocp_date }),
        ...(options.if__modified__since && {
          "if-modified-since": options.if__modified__since,
        }),
        ...(options.if__unmodified__since && {
          "if-unmodified-since": options.if__unmodified__since,
        }),
        ...(options.ocp_range && { "ocp-range": options.ocp_range }),
        Accept: options.accept ?? "application/json",
      },
      queryParameters: {
        ...(options.time_out && { timeOut: options.time_out }),
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

export interface FilegetFilePropertiesFromTaskOptions
  extends RequestParameters {
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
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocp_date?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  if__modified__since?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  if__unmodified__since?: string;
}

/** Gets the properties of the specified Task file. */
export async function getFilePropertiesFromTask(
  context: Client,
  job_id: string,
  task_id: string,
  file_path: string,
  options: FilegetFilePropertiesFromTaskOptions = {}
): Promise<void> {
  const result = await context
    .path(
      "/jobs/{jobId}/tasks/{taskId}/files/{filePath}",
      job_id,
      task_id,
      file_path
    )
    .head({
      headers: {
        ...(options.client_request_id && {
          "client-request-id": options.client_request_id,
        }),
        ...(options.return_client_request_id && {
          "return-client-request-id": options.return_client_request_id,
        }),
        ...(options.ocp_date && { "ocp-date": options.ocp_date }),
        ...(options.if__modified__since && {
          "if-modified-since": options.if__modified__since,
        }),
        ...(options.if__unmodified__since && {
          "if-unmodified-since": options.if__unmodified__since,
        }),
      },
      queryParameters: {
        ...(options.time_out && { timeOut: options.time_out }),
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

export interface FiledeleteFromComputeNodeOptions extends RequestParameters {
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
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocp_date?: string;
  /**
   * Whether to delete children of a directory. If the filePath parameter represents
   * a directory instead of a file, you can set recursive to true to delete the
   * directory and all of the files and subdirectories in it. If recursive is false
   * then the directory must be empty or deletion will fail.
   */
  recursive?: boolean;
}

/** Deletes the specified file from the Compute Node. */
export async function deleteFromComputeNode(
  context: Client,
  pool_id: string,
  node_id: string,
  file_path: string,
  options: FiledeleteFromComputeNodeOptions = {}
): Promise<void> {
  const result = await context
    .path(
      "/pools/{poolId}/nodes/{nodeId}/files/{filePath}",
      pool_id,
      node_id,
      file_path
    )
    .delete({
      headers: {
        ...(options.client_request_id && {
          "client-request-id": options.client_request_id,
        }),
        ...(options.return_client_request_id && {
          "return-client-request-id": options.return_client_request_id,
        }),
        ...(options.ocp_date && { "ocp-date": options.ocp_date }),
      },
      queryParameters: {
        ...(options.time_out && { timeOut: options.time_out }),
        ...(options.recursive && { recursive: options.recursive }),
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

export interface FilegetFileFromComputeNodeOptions extends RequestParameters {
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
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocp_date?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  if__modified__since?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  if__unmodified__since?: string;
  /**
   * The byte range to be retrieved. The default is to retrieve the entire file. The
   * format is bytes=startRange-endRange.
   */
  ocp_range?: string;
}

/** Returns the content of the specified Compute Node file. */
export async function getFileFromComputeNode(
  context: Client,
  pool_id: string,
  node_id: string,
  file_path: string,
  options: FilegetFileFromComputeNodeOptions = {}
): Promise<void> {
  const result = await context
    .path(
      "/pools/{poolId}/nodes/{nodeId}/files/{filePath}",
      pool_id,
      node_id,
      file_path
    )
    .get({
      headers: {
        ...(options.client_request_id && {
          "client-request-id": options.client_request_id,
        }),
        ...(options.return_client_request_id && {
          "return-client-request-id": options.return_client_request_id,
        }),
        ...(options.ocp_date && { "ocp-date": options.ocp_date }),
        ...(options.if__modified__since && {
          "if-modified-since": options.if__modified__since,
        }),
        ...(options.if__unmodified__since && {
          "if-unmodified-since": options.if__unmodified__since,
        }),
        ...(options.ocp_range && { "ocp-range": options.ocp_range }),
        Accept: options.accept ?? "application/json",
      },
      queryParameters: {
        ...(options.time_out && { timeOut: options.time_out }),
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

export interface FilegetFilePropertiesFromComputeNodeOptions
  extends RequestParameters {
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
   * The time the request was issued. Client libraries typically set this to the
   * current system clock time; set it explicitly if you are calling the REST API
   * directly.
   */
  ocp_date?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * been modified since the specified time.
   */
  if__modified__since?: string;
  /**
   * A timestamp indicating the last modified time of the resource known to the
   * client. The operation will be performed only if the resource on the service has
   * not been modified since the specified time.
   */
  if__unmodified__since?: string;
}

/** Gets the properties of the specified Compute Node file. */
export async function getFilePropertiesFromComputeNode(
  context: Client,
  pool_id: string,
  node_id: string,
  file_path: string,
  options: FilegetFilePropertiesFromComputeNodeOptions = {}
): Promise<void> {
  const result = await context
    .path(
      "/pools/{poolId}/nodes/{nodeId}/files/{filePath}",
      pool_id,
      node_id,
      file_path
    )
    .head({
      headers: {
        ...(options.client_request_id && {
          "client-request-id": options.client_request_id,
        }),
        ...(options.return_client_request_id && {
          "return-client-request-id": options.return_client_request_id,
        }),
        ...(options.ocp_date && { "ocp-date": options.ocp_date }),
        ...(options.if__modified__since && {
          "if-modified-since": options.if__modified__since,
        }),
        ...(options.if__unmodified__since && {
          "if-unmodified-since": options.if__unmodified__since,
        }),
      },
      queryParameters: {
        ...(options.time_out && { timeOut: options.time_out }),
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return;
}

export interface FilelistFilesFromTaskOptions extends RequestParameters {
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
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-task-files.
   */
  filter?: string;
  /**
   * Whether to list children of the Task directory. This parameter can be used in
   * combination with the filter parameter to list specific type of files.
   */
  recursive?: boolean;
}

/** Lists the files in a Task's directory on its Compute Node. */
export async function listFilesFromTask(
  context: Client,
  job_id: string,
  task_id: string,
  options: FilelistFilesFromTaskOptions = {}
): Promise<NodeFileListResult> {
  const result = await context
    .path("/jobs/{jobId}/tasks/{taskId}/files", job_id, task_id)
    .get({
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
        ...(options.recursive && { recursive: options.recursive }),
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    value: (result.body.value ?? []).map((p) => ({
      name: p.name,
      url: p.url,
      isDirectory: p.isDirectory,
      properties: !p.properties
        ? undefined
        : {
            creationTime: new Date(p.properties?.creationTime ?? ""),
            lastModified: new Date(p.properties?.lastModified ?? ""),
            contentLength: p.properties?.contentLength,
            contentType: p.properties?.contentType,
            fileMode: p.properties?.fileMode,
          },
    })),
    nextLink: result.body.nextLink,
  };
}

export interface FilelistFilesFromComputeNodeOptions extends RequestParameters {
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
   * https://docs.microsoft.com/en-us/rest/api/batchservice/odata-filters-in-batch#list-compute-node-files.
   */
  filter?: string;
  /** Whether to list children of a directory. */
  recursive?: boolean;
}

/** Lists all of the files in Task directories on the specified Compute Node. */
export async function listFilesFromComputeNode(
  context: Client,
  pool_id: string,
  node_id: string,
  options: FilelistFilesFromComputeNodeOptions = {}
): Promise<NodeFileListResult> {
  const result = await context
    .path("/pools/{poolId}/nodes/{nodeId}/files", pool_id, node_id)
    .get({
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
        ...(options.recursive && { recursive: options.recursive }),
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    value: (result.body.value ?? []).map((p) => ({
      name: p.name,
      url: p.url,
      isDirectory: p.isDirectory,
      properties: !p.properties
        ? undefined
        : {
            creationTime: new Date(p.properties?.creationTime ?? ""),
            lastModified: new Date(p.properties?.lastModified ?? ""),
            contentLength: p.properties?.contentLength,
            contentType: p.properties?.contentType,
            fileMode: p.properties?.fileMode,
          },
    })),
    nextLink: result.body.nextLink,
  };
}
