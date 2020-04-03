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
import { BatchServiceClient } from "../batchServiceClient";
import {
  CertificateAddParameter,
  CertificateAddOptionalParams,
  CertificateAddResponse,
  CertificateListOptionalParams,
  CertificateListResponse,
  CertificateCancelDeletionOptionalParams,
  CertificateCancelDeletionResponse,
  CertificateDeleteOptionalParams,
  CertificateDeleteResponse,
  CertificateGetOptionalParams,
  CertificateGetResponse,
  CertificateListNextOptionalParams,
  CertificateListNextResponse
} from "../models";

/**
 * Class representing a Certificate.
 */
export class Certificate {
  private readonly client: BatchServiceClient;

  /**
   * Initialize a new instance of the class Certificate class.
   * @param client Reference to the service client
   */
  constructor(client: BatchServiceClient) {
    this.client = client;
  }

  /**
   * Adds a Certificate to the specified Account.
   * @param certificate The Certificate to be added.
   * @param options The options parameters.
   */
  add(
    certificate: CertificateAddParameter,
    options?: CertificateAddOptionalParams
  ): Promise<CertificateAddResponse> {
    return this.client.sendOperationRequest(
      { certificate, options },
      addOperationSpec
    ) as Promise<CertificateAddResponse>;
  }

  /**
   * Lists all of the Certificates that have been added to the specified Account.
   * @param options The options parameters.
   */
  list(
    options?: CertificateListOptionalParams
  ): Promise<CertificateListResponse> {
    return this.client.sendOperationRequest(
      { options },
      listOperationSpec
    ) as Promise<CertificateListResponse>;
  }

  /**
   * If you try to delete a Certificate that is being used by a Pool or Compute Node, the status of the
   * Certificate changes to deleteFailed. If you decide that you want to continue using the Certificate,
   * you can use this operation to set the status of the Certificate back to active. If you intend to
   * delete the Certificate, you do not need to run this operation after the deletion failed. You must
   * make sure that the Certificate is not being used by any resources, and then you can try again to
   * delete the Certificate.
   * @param thumbprintAlgorithm The algorithm used to derive the thumbprint parameter. This must be sha1.
   * @param thumbprint The thumbprint of the Certificate being deleted.
   * @param options The options parameters.
   */
  cancelDeletion(
    thumbprintAlgorithm: string,
    thumbprint: string,
    options?: CertificateCancelDeletionOptionalParams
  ): Promise<CertificateCancelDeletionResponse> {
    return this.client.sendOperationRequest(
      { thumbprintAlgorithm, thumbprint, options },
      cancelDeletionOperationSpec
    ) as Promise<CertificateCancelDeletionResponse>;
  }

  /**
   * You cannot delete a Certificate if a resource (Pool or Compute Node) is using it. Before you can
   * delete a Certificate, you must therefore make sure that the Certificate is not associated with any
   * existing Pools, the Certificate is not installed on any Nodes (even if you remove a Certificate from
   * a Pool, it is not removed from existing Compute Nodes in that Pool until they restart), and no
   * running Tasks depend on the Certificate. If you try to delete a Certificate that is in use, the
   * deletion fails. The Certificate status changes to deleteFailed. You can use Cancel Delete
   * Certificate to set the status back to active if you decide that you want to continue using the
   * Certificate.
   * @param thumbprintAlgorithm The algorithm used to derive the thumbprint parameter. This must be sha1.
   * @param thumbprint The thumbprint of the Certificate to be deleted.
   * @param options The options parameters.
   */
  delete(
    thumbprintAlgorithm: string,
    thumbprint: string,
    options?: CertificateDeleteOptionalParams
  ): Promise<CertificateDeleteResponse> {
    return this.client.sendOperationRequest(
      { thumbprintAlgorithm, thumbprint, options },
      deleteOperationSpec
    ) as Promise<CertificateDeleteResponse>;
  }

  /**
   * Gets information about the specified Certificate.
   * @param thumbprintAlgorithm The algorithm used to derive the thumbprint parameter. This must be sha1.
   * @param thumbprint The thumbprint of the Certificate to get.
   * @param options The options parameters.
   */
  get(
    thumbprintAlgorithm: string,
    thumbprint: string,
    options?: CertificateGetOptionalParams
  ): Promise<CertificateGetResponse> {
    return this.client.sendOperationRequest(
      { thumbprintAlgorithm, thumbprint, options },
      getOperationSpec
    ) as Promise<CertificateGetResponse>;
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  listNext(
    nextLink: string,
    options?: CertificateListNextOptionalParams
  ): Promise<CertificateListNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listNextOperationSpec
    ) as Promise<CertificateListNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const addOperationSpec: coreHttp.OperationSpec = {
  path: "/certificates",
  httpMethod: "POST",
  responses: {
    201: {
      headersMapper: Mappers.CertificateAddHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError
    }
  },
  requestBody: Parameters.certificate,
  queryParameters: [Parameters.apiVersion, Parameters.timeout32],
  urlParameters: [Parameters.batchUrl],
  headerParameters: [
    Parameters.contentType,
    Parameters.clientRequestId32,
    Parameters.returnClientRequestId32,
    Parameters.ocpDate32
  ],
  serializer
};
const listOperationSpec: coreHttp.OperationSpec = {
  path: "/certificates",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CertificateListResult,
      headersMapper: Mappers.CertificateListHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.$filter7,
    Parameters.$select6,
    Parameters.maxresults8,
    Parameters.timeout33
  ],
  urlParameters: [Parameters.batchUrl],
  headerParameters: [
    Parameters.clientRequestId33,
    Parameters.returnClientRequestId33,
    Parameters.ocpDate33
  ],
  serializer
};
const cancelDeletionOperationSpec: coreHttp.OperationSpec = {
  path:
    "/certificates(thumbprintAlgorithm={thumbprintAlgorithm},thumbprint={thumbprint})/canceldelete",
  httpMethod: "POST",
  responses: {
    204: {
      headersMapper: Mappers.CertificateCancelDeletionHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.timeout34],
  urlParameters: [
    Parameters.batchUrl,
    Parameters.thumbprintAlgorithm,
    Parameters.thumbprint
  ],
  headerParameters: [
    Parameters.clientRequestId34,
    Parameters.returnClientRequestId34,
    Parameters.ocpDate34
  ],
  serializer
};
const deleteOperationSpec: coreHttp.OperationSpec = {
  path:
    "/certificates(thumbprintAlgorithm={thumbprintAlgorithm},thumbprint={thumbprint})",
  httpMethod: "DELETE",
  responses: {
    202: {
      headersMapper: Mappers.CertificateDeleteHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.timeout35],
  urlParameters: [
    Parameters.batchUrl,
    Parameters.thumbprintAlgorithm,
    Parameters.thumbprint1
  ],
  headerParameters: [
    Parameters.clientRequestId35,
    Parameters.returnClientRequestId35,
    Parameters.ocpDate35
  ],
  serializer
};
const getOperationSpec: coreHttp.OperationSpec = {
  path:
    "/certificates(thumbprintAlgorithm={thumbprintAlgorithm},thumbprint={thumbprint})",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Certificate,
      headersMapper: Mappers.CertificateGetHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.$select7,
    Parameters.timeout36
  ],
  urlParameters: [
    Parameters.batchUrl,
    Parameters.thumbprintAlgorithm,
    Parameters.thumbprint2
  ],
  headerParameters: [
    Parameters.clientRequestId36,
    Parameters.returnClientRequestId36,
    Parameters.ocpDate36
  ],
  serializer
};
const listNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CertificateListResult,
      headersMapper: Mappers.CertificateListNextHeaders
    },
    default: {
      bodyMapper: Mappers.BatchError
    }
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.$filter7,
    Parameters.$select6,
    Parameters.maxresults8,
    Parameters.timeout33
  ],
  urlParameters: [Parameters.batchUrl, Parameters.nextLink],
  headerParameters: [
    Parameters.clientRequestId33,
    Parameters.returnClientRequestId33,
    Parameters.ocpDate33
  ],
  serializer
};
