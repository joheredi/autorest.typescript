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
import { AttestationClient } from "../attestationClient";
import {
  TeeKind,
  PolicyPrepareToSetResponse,
  PolicyGetResponse,
  PolicyResetResponse
} from "../models";

/**
 * Class representing a Policy.
 */
export class Policy {
  private readonly client: AttestationClient;

  /**
   * Initialize a new instance of the class Policy class.
   * @param client Reference to the service client
   */
  constructor(client: AttestationClient) {
    this.client = client;
  }

  /**
   * Accepts a new policy document and returns a JWT which expresses  used in preparation to set
   * attestation policy.
   * @param policyJws JSON Web Signature (See RFC7515) expressing the new policy
   * @param tee Specifies the trusted execution environment to be used to validate the evidence
   * @param options The options parameters.
   */
  prepareToSet(
    policyJws: string,
    tee: TeeKind,
    options?: coreHttp.OperationOptions
  ): Promise<PolicyPrepareToSetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { policyJws, tee, options: operationOptions },
      prepareToSetOperationSpec
    ) as Promise<PolicyPrepareToSetResponse>;
  }

  /**
   * Retrieves the current policy for a given kind of TEE.
   * @param tee Specifies the trusted execution environment to be used to validate the evidence
   * @param options The options parameters.
   */
  get(
    tee: TeeKind,
    options?: coreHttp.OperationOptions
  ): Promise<PolicyGetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { tee, options: operationOptions },
      getOperationSpec
    ) as Promise<PolicyGetResponse>;
  }

  /**
   * Sets the policy for a given kind of TEE.
   * @param tee Specifies the trusted execution environment to be used to validate the evidence
   * @param newAttestationPolicy JWT Expressing the new policy
   * @param options The options parameters.
   */
  set(
    tee: TeeKind,
    newAttestationPolicy: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { tee, newAttestationPolicy, options: operationOptions },
      setOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * Resets the attestation policy for the specified tenant and reverts to the default policy.
   * @param tee Specifies the trusted execution environment to be used to validate the evidence
   * @param policyJws JSON Web Signature with an empty policy document
   * @param options The options parameters.
   */
  reset(
    tee: TeeKind,
    policyJws: string,
    options?: coreHttp.OperationOptions
  ): Promise<PolicyResetResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.client.sendOperationRequest(
      { tee, policyJws, options: operationOptions },
      resetOperationSpec
    ) as Promise<PolicyResetResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const prepareToSetOperationSpec: coreHttp.OperationSpec = {
  path: "/operations/policy/updatepolicy",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" }, serializedName: "String" }
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.policyJws,
  queryParameters: [Parameters.apiVersion, Parameters.tee],
  urlParameters: [Parameters.tenantBaseUrl],
  headerParameters: [Parameters.contentType],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path: "/operations/policy/current",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AttestationPolicy
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.tee],
  urlParameters: [Parameters.tenantBaseUrl],
  serializer
};
const setOperationSpec: coreHttp.OperationSpec = {
  path: "/operations/policy/current",
  httpMethod: "PUT",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.newAttestationPolicy,
  queryParameters: [Parameters.apiVersion, Parameters.tee],
  urlParameters: [Parameters.tenantBaseUrl],
  headerParameters: [Parameters.contentType],
  serializer
};
const resetOperationSpec: coreHttp.OperationSpec = {
  path: "/operations/policy/current",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: { type: { name: "String" }, serializedName: "String" }
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.policyJws1,
  queryParameters: [Parameters.apiVersion, Parameters.tee],
  urlParameters: [Parameters.tenantBaseUrl],
  headerParameters: [Parameters.contentType],
  serializer
};
