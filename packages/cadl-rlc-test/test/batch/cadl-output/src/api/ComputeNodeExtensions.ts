// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NodeVMExtension, NodeVMExtensionList } from "./models.js";
import { BatchServiceClient as Client, isUnexpected } from "../rest/index.js";
import { RequestParameters } from "@azure-rest/core-client";

export interface ComputeNodeExtensionsgetExtensionOptions
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
  /** An OData $select clause. */
  select?: string;
}

/** Gets information about the specified Compute Node Extension. */
export async function getExtension(
  context: Client,
  pool_id: string,
  node_id: string,
  extension_name: string,
  options: ComputeNodeExtensionsgetExtensionOptions = {}
): Promise<NodeVMExtension> {
  const result = await context
    .path(
      "/pools/{poolId}/nodes/{nodeId}/extensions/{extensionName}",
      pool_id,
      node_id,
      extension_name
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
        Accept: options.accept ?? "application/json",
      },
      queryParameters: {
        ...(options.time_out && { timeOut: options.time_out }),
        ...(options.select && { $select: options.select }),
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    provisioningState: result.body.provisioningState,
    vmExtension: !result.body.vmExtension
      ? undefined
      : {
          name: result.body.vmExtension?.name,
          publisher: result.body.vmExtension?.publisher,
          type: result.body.vmExtension?.type,
          typeHandlerVersion: result.body.vmExtension?.typeHandlerVersion,
          autoUpgradeMinorVersion:
            result.body.vmExtension?.autoUpgradeMinorVersion,
          settings: !result.body.vmExtension?.settings ? undefined : {},
          protectedSettings: !result.body.vmExtension?.protectedSettings
            ? undefined
            : {},
          provisionAfterExtensions:
            result.body.vmExtension?.provisionAfterExtensions,
        },
    instanceView: !result.body.instanceView
      ? undefined
      : {
          name: result.body.instanceView?.name,
          statuses: (result.body.instanceView?.statuses ?? []).map((p) => ({
            code: p.code,
            displayStatus: p.displayStatus,
            level: p.level,
            message: p.message,
            time: p.time,
          })),
          subStatuses: (result.body.instanceView?.subStatuses ?? []).map(
            (p) => ({
              code: p.code,
              displayStatus: p.displayStatus,
              level: p.level,
              message: p.message,
              time: p.time,
            })
          ),
        },
  };
}

export interface ComputeNodeExtensionslistExtensionsOptions
  extends RequestParameters {
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
  /** An OData $select clause. */
  select?: string;
}

/** Lists the Compute Nodes Extensions in the specified Pool. */
export async function listExtensions(
  context: Client,
  pool_id: string,
  node_id: string,
  options: ComputeNodeExtensionslistExtensionsOptions = {}
): Promise<NodeVMExtensionList> {
  const result = await context
    .path("/pools/{poolId}/nodes/{nodeId}/extensions", pool_id, node_id)
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
        ...(options.select && { $select: options.select }),
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    value: (result.body.value ?? []).map((p) => ({
      provisioningState: p.provisioningState,
      vmExtension: !p.vmExtension
        ? undefined
        : {
            name: p.vmExtension?.name,
            publisher: p.vmExtension?.publisher,
            type: p.vmExtension?.type,
            typeHandlerVersion: p.vmExtension?.typeHandlerVersion,
            autoUpgradeMinorVersion: p.vmExtension?.autoUpgradeMinorVersion,
            settings: !p.vmExtension?.settings ? undefined : {},
            protectedSettings: !p.vmExtension?.protectedSettings
              ? undefined
              : {},
            provisionAfterExtensions: p.vmExtension?.provisionAfterExtensions,
          },
      instanceView: !p.instanceView
        ? undefined
        : {
            name: p.instanceView?.name,
            statuses: (p.instanceView?.statuses ?? []).map((p) => ({
              code: p.code,
              displayStatus: p.displayStatus,
              level: p.level,
              message: p.message,
              time: p.time,
            })),
            subStatuses: (p.instanceView?.subStatuses ?? []).map((p) => ({
              code: p.code,
              displayStatus: p.displayStatus,
              level: p.level,
              message: p.message,
              time: p.time,
            })),
          },
    })),
    nextLink: result.body.nextLink,
  };
}
