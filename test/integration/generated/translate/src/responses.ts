import {
  ErrorResponseV2,
  BatchStatusResponse,
  DocumentStatusDetail,
  BatchStatusDetail,
  DocumentStatusResponse,
  FileFormatListResult,
  StorageSourceListResult
} from "./models";
import { HttpResponse } from "@azure-rest/llc-shared";
import { RawHttpHeaders } from "@azure/core-https";

interface SubmitBatchRequest202Headers {
  /** Location of batch the operation */
  "operation-location"?: string;
}

export type SubmitBatchRequest202Response = SubmitBatchRequest202Properties &
  HttpResponse;

interface SubmitBatchRequest202Properties {
  status: 202;
  headers: SubmitBatchRequest202Headers & RawHttpHeaders;
}

export type SubmitBatchRequest400Response = SubmitBatchRequest400Properties &
  HttpResponse;

interface SubmitBatchRequest400Properties {
  status: 400;
  parsedBody: ErrorResponseV2;
}

export type SubmitBatchRequest401Response = SubmitBatchRequest401Properties &
  HttpResponse;

interface SubmitBatchRequest401Properties {
  status: 401;
  parsedBody: ErrorResponseV2;
}

export type SubmitBatchRequest429Response = SubmitBatchRequest429Properties &
  HttpResponse;

interface SubmitBatchRequest429Properties {
  status: 429;
  parsedBody: ErrorResponseV2;
}

export type SubmitBatchRequest500Response = SubmitBatchRequest500Properties &
  HttpResponse;

interface SubmitBatchRequest500Properties {
  status: 500;
  parsedBody: ErrorResponseV2;
}

export type SubmitBatchRequest503Response = SubmitBatchRequest503Properties &
  HttpResponse;

interface SubmitBatchRequest503Properties {
  status: 503;
  parsedBody: ErrorResponseV2;
}

interface GetOperations200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
  /** The ETag response-header field provides the current value of the entity tag for the requested variant. Used with If-Match, If-None-Match and If-Range to implement optimistic concurrency control. */
  etag?: string;
}

export type GetOperations200Response = GetOperations200Properties &
  HttpResponse;

interface GetOperations200Properties {
  status: 200;
  parsedBody: BatchStatusResponse;
  headers: GetOperations200Headers & RawHttpHeaders;
}

export type GetOperations400Response = GetOperations400Properties &
  HttpResponse;

interface GetOperations400Properties {
  status: 400;
  parsedBody: ErrorResponseV2;
}

export type GetOperations401Response = GetOperations401Properties &
  HttpResponse;

interface GetOperations401Properties {
  status: 401;
  parsedBody: ErrorResponseV2;
}

export type GetOperations429Response = GetOperations429Properties &
  HttpResponse;

interface GetOperations429Properties {
  status: 429;
  parsedBody: ErrorResponseV2;
}

export type GetOperations500Response = GetOperations500Properties &
  HttpResponse;

interface GetOperations500Properties {
  status: 500;
  parsedBody: ErrorResponseV2;
}

export type GetOperations503Response = GetOperations503Properties &
  HttpResponse;

interface GetOperations503Properties {
  status: 503;
  parsedBody: ErrorResponseV2;
}

interface GetDocumentStatus200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
  /** The ETag response-header field provides the current value of the entity tag for the requested variant. Used with If-Match, If-None-Match and If-Range to implement optimistic concurrency control. */
  etag?: string;
}

export type GetDocumentStatus200Response = GetDocumentStatus200Properties &
  HttpResponse;

interface GetDocumentStatus200Properties {
  status: 200;
  parsedBody: DocumentStatusDetail;
  headers: GetDocumentStatus200Headers & RawHttpHeaders;
}

export type GetDocumentStatus401Response = GetDocumentStatus401Properties &
  HttpResponse;

interface GetDocumentStatus401Properties {
  status: 401;
  parsedBody: ErrorResponseV2;
}

export type GetDocumentStatus404Response = GetDocumentStatus404Properties &
  HttpResponse;

interface GetDocumentStatus404Properties {
  status: 404;
  parsedBody: ErrorResponseV2;
}

export type GetDocumentStatus429Response = GetDocumentStatus429Properties &
  HttpResponse;

interface GetDocumentStatus429Properties {
  status: 429;
  parsedBody: ErrorResponseV2;
}

export type GetDocumentStatus500Response = GetDocumentStatus500Properties &
  HttpResponse;

interface GetDocumentStatus500Properties {
  status: 500;
  parsedBody: ErrorResponseV2;
}

export type GetDocumentStatus503Response = GetDocumentStatus503Properties &
  HttpResponse;

interface GetDocumentStatus503Properties {
  status: 503;
  parsedBody: ErrorResponseV2;
}

interface GetOperationStatus200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
  /** The ETag response-header field provides the current value of the entity tag for the requested variant. Used with If-Match, If-None-Match and If-Range to implement optimistic concurrency control. */
  etag?: string;
}

export type GetOperationStatus200Response = GetOperationStatus200Properties &
  HttpResponse;

interface GetOperationStatus200Properties {
  status: 200;
  parsedBody: BatchStatusDetail;
  headers: GetOperationStatus200Headers & RawHttpHeaders;
}

export type GetOperationStatus401Response = GetOperationStatus401Properties &
  HttpResponse;

interface GetOperationStatus401Properties {
  status: 401;
  parsedBody: ErrorResponseV2;
}

export type GetOperationStatus404Response = GetOperationStatus404Properties &
  HttpResponse;

interface GetOperationStatus404Properties {
  status: 404;
  parsedBody: ErrorResponseV2;
}

export type GetOperationStatus429Response = GetOperationStatus429Properties &
  HttpResponse;

interface GetOperationStatus429Properties {
  status: 429;
  parsedBody: ErrorResponseV2;
}

export type GetOperationStatus500Response = GetOperationStatus500Properties &
  HttpResponse;

interface GetOperationStatus500Properties {
  status: 500;
  parsedBody: ErrorResponseV2;
}

export type GetOperationStatus503Response = GetOperationStatus503Properties &
  HttpResponse;

interface GetOperationStatus503Properties {
  status: 503;
  parsedBody: ErrorResponseV2;
}

export type CancelOperation200Response = CancelOperation200Properties &
  HttpResponse;

interface CancelOperation200Properties {
  status: 200;
  parsedBody: BatchStatusDetail;
}

export type CancelOperation401Response = CancelOperation401Properties &
  HttpResponse;

interface CancelOperation401Properties {
  status: 401;
  parsedBody: ErrorResponseV2;
}

export type CancelOperation404Response = CancelOperation404Properties &
  HttpResponse;

interface CancelOperation404Properties {
  status: 404;
  parsedBody: ErrorResponseV2;
}

export type CancelOperation429Response = CancelOperation429Properties &
  HttpResponse;

interface CancelOperation429Properties {
  status: 429;
  parsedBody: ErrorResponseV2;
}

export type CancelOperation500Response = CancelOperation500Properties &
  HttpResponse;

interface CancelOperation500Properties {
  status: 500;
  parsedBody: ErrorResponseV2;
}

export type CancelOperation503Response = CancelOperation503Properties &
  HttpResponse;

interface CancelOperation503Properties {
  status: 503;
  parsedBody: ErrorResponseV2;
}

interface GetOperationDocumentsStatus200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
  /** The ETag response-header field provides the current value of the entity tag for the requested variant. Used with If-Match, If-None-Match and If-Range to implement optimistic concurrency control. */
  etag?: string;
}

export type GetOperationDocumentsStatus200Response = GetOperationDocumentsStatus200Properties &
  HttpResponse;

interface GetOperationDocumentsStatus200Properties {
  status: 200;
  parsedBody: DocumentStatusResponse;
  headers: GetOperationDocumentsStatus200Headers & RawHttpHeaders;
}

export type GetOperationDocumentsStatus400Response = GetOperationDocumentsStatus400Properties &
  HttpResponse;

interface GetOperationDocumentsStatus400Properties {
  status: 400;
  parsedBody: ErrorResponseV2;
}

export type GetOperationDocumentsStatus401Response = GetOperationDocumentsStatus401Properties &
  HttpResponse;

interface GetOperationDocumentsStatus401Properties {
  status: 401;
  parsedBody: ErrorResponseV2;
}

export type GetOperationDocumentsStatus404Response = GetOperationDocumentsStatus404Properties &
  HttpResponse;

interface GetOperationDocumentsStatus404Properties {
  status: 404;
  parsedBody: ErrorResponseV2;
}

export type GetOperationDocumentsStatus429Response = GetOperationDocumentsStatus429Properties &
  HttpResponse;

interface GetOperationDocumentsStatus429Properties {
  status: 429;
  parsedBody: ErrorResponseV2;
}

export type GetOperationDocumentsStatus500Response = GetOperationDocumentsStatus500Properties &
  HttpResponse;

interface GetOperationDocumentsStatus500Properties {
  status: 500;
  parsedBody: ErrorResponseV2;
}

export type GetOperationDocumentsStatus503Response = GetOperationDocumentsStatus503Properties &
  HttpResponse;

interface GetOperationDocumentsStatus503Properties {
  status: 503;
  parsedBody: ErrorResponseV2;
}

interface GetDocumentFormats200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
}

export type GetDocumentFormats200Response = GetDocumentFormats200Properties &
  HttpResponse;

interface GetDocumentFormats200Properties {
  status: 200;
  parsedBody: FileFormatListResult;
  headers: GetDocumentFormats200Headers & RawHttpHeaders;
}

export type GetDocumentFormats429Response = GetDocumentFormats429Properties &
  HttpResponse;

interface GetDocumentFormats429Properties {
  status: 429;
  parsedBody: ErrorResponseV2;
}

export type GetDocumentFormats500Response = GetDocumentFormats500Properties &
  HttpResponse;

interface GetDocumentFormats500Properties {
  status: 500;
  parsedBody: ErrorResponseV2;
}

export type GetDocumentFormats503Response = GetDocumentFormats503Properties &
  HttpResponse;

interface GetDocumentFormats503Properties {
  status: 503;
  parsedBody: ErrorResponseV2;
}

interface GetGlossaryFormats200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
}

export type GetGlossaryFormats200Response = GetGlossaryFormats200Properties &
  HttpResponse;

interface GetGlossaryFormats200Properties {
  status: 200;
  parsedBody: FileFormatListResult;
  headers: GetGlossaryFormats200Headers & RawHttpHeaders;
}

export type GetGlossaryFormats429Response = GetGlossaryFormats429Properties &
  HttpResponse;

interface GetGlossaryFormats429Properties {
  status: 429;
  parsedBody: ErrorResponseV2;
}

export type GetGlossaryFormats500Response = GetGlossaryFormats500Properties &
  HttpResponse;

interface GetGlossaryFormats500Properties {
  status: 500;
  parsedBody: ErrorResponseV2;
}

export type GetGlossaryFormats503Response = GetGlossaryFormats503Properties &
  HttpResponse;

interface GetGlossaryFormats503Properties {
  status: 503;
  parsedBody: ErrorResponseV2;
}

interface GetDocumentStorageSource200Headers {
  /** Indicates how long to wait before making a new request. */
  "retry-after"?: string;
}

export type GetDocumentStorageSource200Response = GetDocumentStorageSource200Properties &
  HttpResponse;

interface GetDocumentStorageSource200Properties {
  status: 200;
  parsedBody: StorageSourceListResult;
  headers: GetDocumentStorageSource200Headers & RawHttpHeaders;
}

export type GetDocumentStorageSource429Response = GetDocumentStorageSource429Properties &
  HttpResponse;

interface GetDocumentStorageSource429Properties {
  status: 429;
  parsedBody: ErrorResponseV2;
}

export type GetDocumentStorageSource500Response = GetDocumentStorageSource500Properties &
  HttpResponse;

interface GetDocumentStorageSource500Properties {
  status: 500;
  parsedBody: ErrorResponseV2;
}

export type GetDocumentStorageSource503Response = GetDocumentStorageSource503Properties &
  HttpResponse;

interface GetDocumentStorageSource503Properties {
  status: 503;
  parsedBody: ErrorResponseV2;
}
