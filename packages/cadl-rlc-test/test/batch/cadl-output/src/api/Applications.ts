// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ApplicationListResult, Application } from "./models.js";
import { BatchServiceClient as Client, isUnexpected } from "../rest/index.js";
import { RequestParameters } from "@azure-rest/core-client";

export interface ApplicationslistApplicationsOptions extends RequestParameters {
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
}

/**
 * This operation returns only Applications and versions that are available for
 * use on Compute Nodes; that is, that can be used in an Package reference. For
 * administrator information about applications and versions that are not yet
 * available to Compute Nodes, use the Azure portal or the Azure Resource Manager
 * API.
 */
export async function listApplications(
  context: Client,
  options: ApplicationslistApplicationsOptions = {}
): Promise<ApplicationListResult> {
  const result = await context.path("/applications").get({
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
    },
  });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    value: (result.body.value ?? []).map((p) => ({
      id: p.id,
      displayName: p.displayName,
      versions: p.versions,
    })),
    nextLink: result.body.nextLink,
  };
}

export interface ApplicationsgetApplicationOptions extends RequestParameters {}

/**
 * This operation returns only Applications and versions that are available for
 * use on Compute Nodes; that is, that can be used in an Package reference. For
 * administrator information about Applications and versions that are not yet
 * available to Compute Nodes, use the Azure portal or the Azure Resource Manager
 * API.
 */
export async function getApplication(
  context: Client,
  application_id: string,
  options: ApplicationsgetApplicationOptions = {}
): Promise<Application> {
  const result = await context
    .path("/applications/{applicationId}", application_id)
    .get({
      headers: { Accept: options.accept ?? "application/json" },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    id: result.body.id,
    displayName: result.body.displayName,
    versions: result.body.versions,
  };
}
