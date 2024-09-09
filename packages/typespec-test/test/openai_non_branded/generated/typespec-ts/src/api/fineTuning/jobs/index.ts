// Licensed under the MIT License.

import { OpenAIContext as Client } from "../../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
} from "@typespec/ts-http-runtime";
import {
  CreateFineTuningJobRequest,
  FineTuningJob,
  ListPaginatedFineTuningJobsResponse,
  ListFineTuningJobEventsResponse,
} from "../../../models/models.js";
import {
  PathUncheckedResponse,
  createRestError,
} from "@typespec/ts-http-runtime";
import {
  FineTuningJobsCreateOptionalParams,
  FineTuningJobsListOptionalParams,
  FineTuningJobsRetrieveOptionalParams,
  FineTuningJobsListEventsOptionalParams,
  FineTuningJobsCancelOptionalParams,
} from "../../../models/options.js";

export function _createSend(
  context: Client,
  job: CreateFineTuningJobRequest,
  options: FineTuningJobsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/fine_tuning/jobs")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        training_file: job["training_file"],
        validation_file: job["validation_file"],
        model: job["model"],
        hyperparameters: !job.hyperparameters
          ? undefined
          : { n_epochs: job.hyperparameters?.["n_epochs"] },
        suffix: job["suffix"],
      },
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<FineTuningJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/**
 * Creates a job that fine-tunes a specified model from a given dataset.
 *
 * Response includes details of the enqueued job including job status and the name of the
 * fine-tuned models once complete.
 *
 * [Learn more about fine-tuning](/docs/guides/fine-tuning)
 */
export async function create(
  context: Client,
  job: CreateFineTuningJobRequest,
  options: FineTuningJobsCreateOptionalParams = { requestOptions: {} },
): Promise<FineTuningJob> {
  const result = await _createSend(context, job, options);
  return _createDeserialize(result);
}

export function _listSend(
  context: Client,
  options: FineTuningJobsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/fine_tuning/jobs")
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { after: options?.after, limit: options?.limit },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<ListPaginatedFineTuningJobsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

export async function list(
  context: Client,
  options: FineTuningJobsListOptionalParams = { requestOptions: {} },
): Promise<ListPaginatedFineTuningJobsResponse> {
  const result = await _listSend(context, options);
  return _listDeserialize(result);
}

export function _retrieveSend(
  context: Client,
  fineTuningJobId: string,
  options: FineTuningJobsRetrieveOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/fine_tuning/jobs/{fine_tuning_job_id}", fineTuningJobId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _retrieveDeserialize(
  result: PathUncheckedResponse,
): Promise<FineTuningJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

export async function retrieve(
  context: Client,
  fineTuningJobId: string,
  options: FineTuningJobsRetrieveOptionalParams = { requestOptions: {} },
): Promise<FineTuningJob> {
  const result = await _retrieveSend(context, fineTuningJobId, options);
  return _retrieveDeserialize(result);
}

export function _listEventsSend(
  context: Client,
  fineTuningJobId: string,
  options: FineTuningJobsListEventsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/fine_tuning/jobs/{fine_tuning_job_id}/events", fineTuningJobId)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { after: options?.after, limit: options?.limit },
    });
}

export async function _listEventsDeserialize(
  result: PathUncheckedResponse,
): Promise<ListFineTuningJobEventsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

export async function listEvents(
  context: Client,
  fineTuningJobId: string,
  options: FineTuningJobsListEventsOptionalParams = { requestOptions: {} },
): Promise<ListFineTuningJobEventsResponse> {
  const result = await _listEventsSend(context, fineTuningJobId, options);
  return _listEventsDeserialize(result);
}

export function _cancelSend(
  context: Client,
  fineTuningJobId: string,
  options: FineTuningJobsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/fine_tuning/jobs/{fine_tuning_job_id}/cancel", fineTuningJobId)
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelDeserialize(
  result: PathUncheckedResponse,
): Promise<FineTuningJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

export async function cancel(
  context: Client,
  fineTuningJobId: string,
  options: FineTuningJobsCancelOptionalParams = { requestOptions: {} },
): Promise<FineTuningJob> {
  const result = await _cancelSend(context, fineTuningJobId, options);
  return _cancelDeserialize(result);
}
