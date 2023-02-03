// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TimeSeriesPoint,
  TimeGranularity,
  ImputeMode,
  UnivariateEntireDetectionResult,
  UnivariateLastDetectionResult,
  UnivariateChangePointDetectionResult,
  MultivariateDetectionResult,
  DataSchema,
  AlignPolicy,
  ModelStatus,
  ErrorResponse,
  DiagnosticsInfo,
  AnomalyDetectionModel,
  ModelList,
  VariableValues,
  MultivariateLastDetectionResult,
} from "./models.js";
import {
  AnomalyDetectorClient as Client,
  isUnexpected,
} from "../rest/index.js";
import { RequestParameters } from "@azure-rest/core-client";

export interface DetectUnivariateEntireSeriesOptions extends RequestParameters {
  /**
   * Optional argument, can be one of yearly, monthly, weekly, daily, hourly,
   * minutely, secondly, microsecond or none. If granularity is not present, it will
   * be none by default. If granularity is none, the timestamp property in time
   * series point can be absent.
   */
  granularity?: TimeGranularity;
  /**
   * Custom Interval is used to set non-standard time interval, for example, if the
   * series is 5 minutes, request can be set as {"granularity":"minutely",
   * "customInterval":5}.
   */
  customInterval?: number;
  /**
   * Optional argument, periodic value of a time series. If the value is null or
   * does not present, the API will determine the period automatically.
   */
  period?: number;
  /** Optional argument, advanced model parameter, max anomaly ratio in a time series. */
  maxAnomalyRatio?: number;
  /**
   * Optional argument, advanced model parameter, between 0-99, the lower the value
   * is, the larger the margin value will be which means less anomalies will be
   * accepted.
   */
  sensitivity?: number;
  /**
   * Used to specify how to deal with missing values in the input series, it's used
   * when granularity is not "none".
   */
  imputeMode?: ImputeMode;
  /**
   * Used to specify the value to fill, it's used when granularity is not "none"
   * and imputeMode is "fixed".
   */
  imputeFixedValue?: number;
  /** Body parameter Content-Type. Known values are: application/json. */
  content_type?: string;
}

/**
 * This operation generates a model with an entire series, each point is detected
 * with the same model. With this method, points before and after a certain point
 * are used to determine whether it is an anomaly. The entire detection can give
 * user an overall status of the time series.
 */
export async function detectUnivariateEntireSeries(
  context: Client,
  series: TimeSeriesPoint[],
  options: DetectUnivariateEntireSeriesOptions = {}
): Promise<UnivariateEntireDetectionResult> {
  const result = await context.path("/timeseries/entire/detect").post({
    headers: {
      Accept: options.accept ?? "application/json",
      "Content-Type": options.content_type ?? "application/json",
    },
    body: {
      series: series,
      granularity: options.granularity,
      customInterval: options.customInterval,
      period: options.period,
      maxAnomalyRatio: options.maxAnomalyRatio,
      sensitivity: options.sensitivity,
      imputeMode: options.imputeMode,
      imputeFixedValue: options.imputeFixedValue,
    },
  });
  if (isUnexpected(result)) {
    throw result.body;
  }
  return {
    period: result.body.period,
    expectedValues: result.body.expectedValues,
    upperMargins: result.body.upperMargins,
    lowerMargins: result.body.lowerMargins,
    isAnomaly: result.body.isAnomaly,
    isNegativeAnomaly: result.body.isNegativeAnomaly,
    isPositiveAnomaly: result.body.isPositiveAnomaly,
    severity: result.body.severity,
  };
}

export interface DetectUnivariateLastPointOptions extends RequestParameters {
  /**
   * Optional argument, can be one of yearly, monthly, weekly, daily, hourly,
   * minutely, secondly, microsecond or none. If granularity is not present, it will
   * be none by default. If granularity is none, the timestamp property in time
   * series point can be absent.
   */
  granularity?: TimeGranularity;
  /**
   * Custom Interval is used to set non-standard time interval, for example, if the
   * series is 5 minutes, request can be set as {"granularity":"minutely",
   * "customInterval":5}.
   */
  customInterval?: number;
  /**
   * Optional argument, periodic value of a time series. If the value is null or
   * does not present, the API will determine the period automatically.
   */
  period?: number;
  /** Optional argument, advanced model parameter, max anomaly ratio in a time series. */
  maxAnomalyRatio?: number;
  /**
   * Optional argument, advanced model parameter, between 0-99, the lower the value
   * is, the larger the margin value will be which means less anomalies will be
   * accepted.
   */
  sensitivity?: number;
  /**
   * Used to specify how to deal with missing values in the input series, it's used
   * when granularity is not "none".
   */
  imputeMode?: ImputeMode;
  /**
   * Used to specify the value to fill, it's used when granularity is not "none"
   * and imputeMode is "fixed".
   */
  imputeFixedValue?: number;
  /** Body parameter Content-Type. Known values are: application/json. */
  content_type?: string;
}

/**
 * This operation generates a model using the points that you sent into the API,
 * and based on all data to determine whether the last point is anomalous.
 */
export async function detectUnivariateLastPoint(
  context: Client,
  series: TimeSeriesPoint[],
  options: DetectUnivariateLastPointOptions = {}
): Promise<UnivariateLastDetectionResult> {
  const result = await context.path("/timeseries/last/detect").post({
    headers: {
      Accept: options.accept ?? "application/json",
      "Content-Type": options.content_type ?? "application/json",
    },
    body: {
      series: series,
      granularity: options.granularity,
      customInterval: options.customInterval,
      period: options.period,
      maxAnomalyRatio: options.maxAnomalyRatio,
      sensitivity: options.sensitivity,
      imputeMode: options.imputeMode,
      imputeFixedValue: options.imputeFixedValue,
    },
  });
  if (isUnexpected(result)) {
    throw result.body;
  }
  return {
    period: result.body.period,
    suggestedWindow: result.body.suggestedWindow,
    expectedValue: result.body.expectedValue,
    upperMargin: result.body.upperMargin,
    lowerMargin: result.body.lowerMargin,
    isAnomaly: result.body.isAnomaly,
    isNegativeAnomaly: result.body.isNegativeAnomaly,
    isPositiveAnomaly: result.body.isPositiveAnomaly,
    severity: result.body.severity,
  };
}

export interface DetectUnivariateChangePointOptions extends RequestParameters {
  /**
   * Custom Interval is used to set non-standard time interval, for example, if the
   * series is 5 minutes, request can be set as {"granularity":"minutely",
   * "customInterval":5}.
   */
  customInterval?: number;
  /**
   * Optional argument, periodic value of a time series. If the value is null or
   * does not present, the API will determine the period automatically.
   */
  period?: number;
  /**
   * Optional argument, advanced model parameter, a default stableTrendWindow will
   * be used in detection.
   */
  stableTrendWindow?: number;
  /**
   * Optional argument, advanced model parameter, between 0.0-1.0, the lower the
   * value is, the larger the trend error will be which means less change point will
   * be accepted.
   */
  threshold?: number;
  /** Body parameter Content-Type. Known values are: application/json. */
  content_type?: string;
}

/** Evaluate change point score of every series point */
export async function detectUnivariateChangePoint(
  context: Client,
  series: TimeSeriesPoint[],
  granularity: TimeGranularity,
  options: DetectUnivariateChangePointOptions = {}
): Promise<UnivariateChangePointDetectionResult> {
  const result = await context.path("/timeseries/changepoint/detect").post({
    headers: {
      Accept: options.accept ?? "application/json",
      "Content-Type": options.content_type ?? "application/json",
    },
    body: {
      series: series,
      granularity: granularity,
      customInterval: options.customInterval,
      period: options.period,
      stableTrendWindow: options.stableTrendWindow,
      threshold: options.threshold,
    },
  });
  if (isUnexpected(result)) {
    throw result.body;
  }
  return {
    period: result.body.period,
    isChangePoint: result.body.isChangePoint,
    confidenceScores: result.body.confidenceScores,
  };
}

export interface GetMultivariateBatchDetectionResultOptions
  extends RequestParameters {}

/**
 * For asynchronous inference, get multivariate anomaly detection result based on
 * resultId returned by the BatchDetectAnomaly api.
 */
export async function getMultivariateBatchDetectionResult(
  context: Client,
  result_id: string,
  options: GetMultivariateBatchDetectionResultOptions = {}
): Promise<MultivariateDetectionResult> {
  const result = await context
    .path("/multivariate/detect-batch/{resultId}", result_id)
    .get({
      headers: { Accept: options.accept ?? "application/json" },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }
  return {
    resultId: result.body.resultId,
    summary: {
      status: result.body.summary.status,
      errors: (result.body.summary.errors ?? []).map((p) => ({
        code: p.code,
        message: p.message,
      })),
      variableStates: (result.body.summary.variableStates ?? []).map((p) => ({
        variable: p.variable,
        filledNARatio: p.filledNARatio,
        effectiveCount: p.effectiveCount,
        firstTimestamp: new Date(p.firstTimestamp ?? ""),
        lastTimestamp: new Date(p.lastTimestamp ?? ""),
      })),
      setupInfo: {
        dataSource: result.body.summary.setupInfo.dataSource,
        topContributorCount: result.body.summary.setupInfo.topContributorCount,
        startTime: new Date(result.body.summary.setupInfo.startTime ?? ""),
        endTime: new Date(result.body.summary.setupInfo.endTime ?? ""),
      },
    },
    results: (result.body.results ?? []).map((p) => ({
      timestamp: new Date(p.timestamp ?? ""),
      value: !p.value
        ? undefined
        : {
            isAnomaly: p.value?.isAnomaly,
            severity: p.value?.severity,
            score: p.value?.score,
            interpretation: (p.value?.interpretation ?? []).map((p) => ({
              variable: p.variable,
              contributionScore: p.contributionScore,
              correlationChanges: !p.correlationChanges
                ? undefined
                : { changedVariables: p.correlationChanges?.changedVariables },
            })),
          },
      errors: (p.errors ?? []).map((p) => ({
        code: p.code,
        message: p.message,
      })),
    })),
  };
}

export interface TrainMultivariateModelOptions extends RequestParameters {
  /**
   * Data schema of input data source: OneTable or MultiTable. The default
   * DataSchema is OneTable.
   */
  dataSchema?: DataSchema;
  /**
   * An optional field. The display name of the model whose maximum length is 24
   * characters.
   */
  displayName?: string;
  /**
   * An optional field, indicating how many previous timestamps will be used to
   * detect whether the timestamp is anomaly or not.
   */
  slidingWindow?: number;
  /** An optional field, indicating the manner to align multiple variables. */
  alignPolicy?: AlignPolicy;
  /** Model status. One of CREATED, RUNNING, READY, and FAILED. */
  status?: ModelStatus;
  /** Error messages when failed to create a model. */
  errors?: ErrorResponse[];
  /** Diagnostics information to help inspect the states of model or variable. */
  diagnosticsInfo?: DiagnosticsInfo;
  /** Body parameter Content-Type. Known values are: application/json. */
  content_type?: string;
}

/**
 * Create and train a multivariate anomaly detection model. The request must
 * include a source parameter to indicate an externally accessible Azure blob
 * storage URI.There are two types of data input: An URI pointed to an Azure blob
 * storage folder which contains multiple CSV files, and each CSV file contains
 * two columns, timestamp and variable. Another type of input is an URI pointed to
 * a CSV file in Azure blob storage, which contains all the variables and a
 * timestamp column.
 */
export async function trainMultivariateModel(
  context: Client,
  dataSource: string,
  startTime: Date,
  endTime: Date,
  options: TrainMultivariateModelOptions = {}
): Promise<AnomalyDetectionModel> {
  const result = await context.path("/multivariate/models").post({
    headers: {
      Accept: options.accept ?? "application/json",
      "Content-Type": options.content_type ?? "application/json",
    },
    body: {
      dataSource: dataSource,
      dataSchema: options.dataSchema,
      startTime: startTime,
      endTime: endTime,
      displayName: options.displayName,
      slidingWindow: options.slidingWindow,
      alignPolicy: options.alignPolicy,
      status: options.status,
      diagnosticsInfo: options.diagnosticsInfo,
    },
  });
  if (isUnexpected(result)) {
    throw result.body;
  }
  return {
    modelId: result.body.modelId,
    createdTime: new Date(result.body.createdTime ?? ""),
    lastUpdatedTime: new Date(result.body.lastUpdatedTime ?? ""),
    modelInfo: !result.body.modelInfo
      ? undefined
      : {
          dataSource: result.body.modelInfo?.dataSource,
          dataSchema: result.body.modelInfo?.dataSchema,
          startTime: new Date(result.body.modelInfo?.startTime ?? ""),
          endTime: new Date(result.body.modelInfo?.endTime ?? ""),
          displayName: result.body.modelInfo?.displayName,
          slidingWindow: result.body.modelInfo?.slidingWindow,
          alignPolicy: !result.body.modelInfo?.alignPolicy
            ? undefined
            : {
                alignMode: result.body.modelInfo?.alignPolicy?.alignMode,
                fillNAMethod: result.body.modelInfo?.alignPolicy?.fillNAMethod,
                paddingValue: result.body.modelInfo?.alignPolicy?.paddingValue,
              },
          status: result.body.modelInfo?.status,
          errors: (result.body.modelInfo?.errors ?? []).map((p) => ({
            code: p.code,
            message: p.message,
          })),
          diagnosticsInfo: !result.body.modelInfo?.diagnosticsInfo
            ? undefined
            : {
                modelState: !result.body.modelInfo?.diagnosticsInfo?.modelState
                  ? undefined
                  : {
                      epochIds:
                        result.body.modelInfo?.diagnosticsInfo?.modelState
                          ?.epochIds,
                      trainLosses:
                        result.body.modelInfo?.diagnosticsInfo?.modelState
                          ?.trainLosses,
                      validationLosses:
                        result.body.modelInfo?.diagnosticsInfo?.modelState
                          ?.validationLosses,
                      latenciesInSeconds:
                        result.body.modelInfo?.diagnosticsInfo?.modelState
                          ?.latenciesInSeconds,
                    },
                variableStates: (
                  result.body.modelInfo?.diagnosticsInfo?.variableStates ?? []
                ).map((p) => ({
                  variable: p.variable,
                  filledNARatio: p.filledNARatio,
                  effectiveCount: p.effectiveCount,
                  firstTimestamp: new Date(p.firstTimestamp ?? ""),
                  lastTimestamp: new Date(p.lastTimestamp ?? ""),
                })),
              },
        },
  };
}

export interface ListMultivariateModelsOptions extends RequestParameters {
  /** Skip indicates how many models will be skipped. */
  skip?: number;
  /** Top indicates how many models will be fetched. */
  top?: number;
}

/** List models of a resource. */
export async function listMultivariateModels(
  context: Client,
  options: ListMultivariateModelsOptions = {}
): Promise<ModelList> {
  const result = await context.path("/multivariate/models").get({
    headers: { Accept: options.accept ?? "application/json" },
    queryParameters: { skip: options.skip, top: options.top },
  });
  if (isUnexpected(result)) {
    throw result.body;
  }
  return {
    models: (result.body.models ?? []).map((p) => ({
      modelId: p.modelId,
      createdTime: new Date(p.createdTime ?? ""),
      lastUpdatedTime: new Date(p.lastUpdatedTime ?? ""),
      modelInfo: !p.modelInfo
        ? undefined
        : {
            dataSource: p.modelInfo?.dataSource,
            dataSchema: p.modelInfo?.dataSchema,
            startTime: new Date(p.modelInfo?.startTime ?? ""),
            endTime: new Date(p.modelInfo?.endTime ?? ""),
            displayName: p.modelInfo?.displayName,
            slidingWindow: p.modelInfo?.slidingWindow,
            alignPolicy: !p.modelInfo?.alignPolicy
              ? undefined
              : {
                  alignMode: p.modelInfo?.alignPolicy?.alignMode,
                  fillNAMethod: p.modelInfo?.alignPolicy?.fillNAMethod,
                  paddingValue: p.modelInfo?.alignPolicy?.paddingValue,
                },
            status: p.modelInfo?.status,
            errors: (p.modelInfo?.errors ?? []).map((p) => ({
              code: p.code,
              message: p.message,
            })),
            diagnosticsInfo: !p.modelInfo?.diagnosticsInfo
              ? undefined
              : {
                  modelState: !p.modelInfo?.diagnosticsInfo?.modelState
                    ? undefined
                    : {
                        epochIds:
                          p.modelInfo?.diagnosticsInfo?.modelState?.epochIds,
                        trainLosses:
                          p.modelInfo?.diagnosticsInfo?.modelState?.trainLosses,
                        validationLosses:
                          p.modelInfo?.diagnosticsInfo?.modelState
                            ?.validationLosses,
                        latenciesInSeconds:
                          p.modelInfo?.diagnosticsInfo?.modelState
                            ?.latenciesInSeconds,
                      },
                  variableStates: (
                    p.modelInfo?.diagnosticsInfo?.variableStates ?? []
                  ).map((p) => ({
                    variable: p.variable,
                    filledNARatio: p.filledNARatio,
                    effectiveCount: p.effectiveCount,
                    firstTimestamp: new Date(p.firstTimestamp ?? ""),
                    lastTimestamp: new Date(p.lastTimestamp ?? ""),
                  })),
                },
          },
    })),
    currentCount: result.body.currentCount,
    maxCount: result.body.maxCount,
    nextLink: result.body.nextLink,
  };
}

export interface DeleteMultivariateModelOptions extends RequestParameters {}

/** Delete an existing multivariate model according to the modelId */
export async function deleteMultivariateModel(
  context: Client,
  model_id: string,
  options: DeleteMultivariateModelOptions = {}
): Promise<void> {
  const result = await context
    .path("/multivariate/models/{modelId}", model_id)
    .delete({
      headers: { Accept: options.accept ?? "application/json" },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }
  return;
}

export interface GetMultivariateModelOptions extends RequestParameters {}

/**
 * Get detailed information of multivariate model, including the training status
 * and variables used in the model.
 */
export async function getMultivariateModel(
  context: Client,
  model_id: string,
  options: GetMultivariateModelOptions = {}
): Promise<AnomalyDetectionModel> {
  const result = await context
    .path("/multivariate/models/{modelId}", model_id)
    .get({
      headers: { Accept: options.accept ?? "application/json" },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }
  return {
    modelId: result.body.modelId,
    createdTime: new Date(result.body.createdTime ?? ""),
    lastUpdatedTime: new Date(result.body.lastUpdatedTime ?? ""),
    modelInfo: !result.body.modelInfo
      ? undefined
      : {
          dataSource: result.body.modelInfo?.dataSource,
          dataSchema: result.body.modelInfo?.dataSchema,
          startTime: new Date(result.body.modelInfo?.startTime ?? ""),
          endTime: new Date(result.body.modelInfo?.endTime ?? ""),
          displayName: result.body.modelInfo?.displayName,
          slidingWindow: result.body.modelInfo?.slidingWindow,
          alignPolicy: !result.body.modelInfo?.alignPolicy
            ? undefined
            : {
                alignMode: result.body.modelInfo?.alignPolicy?.alignMode,
                fillNAMethod: result.body.modelInfo?.alignPolicy?.fillNAMethod,
                paddingValue: result.body.modelInfo?.alignPolicy?.paddingValue,
              },
          status: result.body.modelInfo?.status,
          errors: (result.body.modelInfo?.errors ?? []).map((p) => ({
            code: p.code,
            message: p.message,
          })),
          diagnosticsInfo: !result.body.modelInfo?.diagnosticsInfo
            ? undefined
            : {
                modelState: !result.body.modelInfo?.diagnosticsInfo?.modelState
                  ? undefined
                  : {
                      epochIds:
                        result.body.modelInfo?.diagnosticsInfo?.modelState
                          ?.epochIds,
                      trainLosses:
                        result.body.modelInfo?.diagnosticsInfo?.modelState
                          ?.trainLosses,
                      validationLosses:
                        result.body.modelInfo?.diagnosticsInfo?.modelState
                          ?.validationLosses,
                      latenciesInSeconds:
                        result.body.modelInfo?.diagnosticsInfo?.modelState
                          ?.latenciesInSeconds,
                    },
                variableStates: (
                  result.body.modelInfo?.diagnosticsInfo?.variableStates ?? []
                ).map((p) => ({
                  variable: p.variable,
                  filledNARatio: p.filledNARatio,
                  effectiveCount: p.effectiveCount,
                  firstTimestamp: new Date(p.firstTimestamp ?? ""),
                  lastTimestamp: new Date(p.lastTimestamp ?? ""),
                })),
              },
        },
  };
}

export interface DetectMultivariateBatchAnomalyOptions
  extends RequestParameters {
  /** Body parameter Content-Type. Known values are: application/json. */
  content_type?: string;
}

/**
 * Submit multivariate anomaly detection task with the modelId of trained model
 * and inference data, the input schema should be the same with the training
 * request. The request will complete asynchronously and return a resultId to
 * query the detection result.The request should be a source link to indicate an
 * externally accessible Azure storage Uri, either pointed to an Azure blob
 * storage folder, or pointed to a CSV file in Azure blob storage.
 */
export async function detectMultivariateBatchAnomaly(
  context: Client,
  dataSource: string,
  topContributorCount: number,
  startTime: Date,
  endTime: Date,
  model_id: string,
  options: DetectMultivariateBatchAnomalyOptions = {}
): Promise<MultivariateDetectionResult> {
  const result = await context
    .path("/multivariate/models/{modelId}:detect-batch", model_id)
    .post({
      headers: {
        Accept: options.accept ?? "application/json",
        "Content-Type": options.content_type ?? "application/json",
      },
      body: {
        dataSource: dataSource,
        topContributorCount: topContributorCount,
        startTime: startTime,
        endTime: endTime,
      },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }
  return {
    resultId: result.body.resultId,
    summary: {
      status: result.body.summary.status,
      errors: (result.body.summary.errors ?? []).map((p) => ({
        code: p.code,
        message: p.message,
      })),
      variableStates: (result.body.summary.variableStates ?? []).map((p) => ({
        variable: p.variable,
        filledNARatio: p.filledNARatio,
        effectiveCount: p.effectiveCount,
        firstTimestamp: new Date(p.firstTimestamp ?? ""),
        lastTimestamp: new Date(p.lastTimestamp ?? ""),
      })),
      setupInfo: {
        dataSource: result.body.summary.setupInfo.dataSource,
        topContributorCount: result.body.summary.setupInfo.topContributorCount,
        startTime: new Date(result.body.summary.setupInfo.startTime ?? ""),
        endTime: new Date(result.body.summary.setupInfo.endTime ?? ""),
      },
    },
    results: (result.body.results ?? []).map((p) => ({
      timestamp: new Date(p.timestamp ?? ""),
      value: !p.value
        ? undefined
        : {
            isAnomaly: p.value?.isAnomaly,
            severity: p.value?.severity,
            score: p.value?.score,
            interpretation: (p.value?.interpretation ?? []).map((p) => ({
              variable: p.variable,
              contributionScore: p.contributionScore,
              correlationChanges: !p.correlationChanges
                ? undefined
                : { changedVariables: p.correlationChanges?.changedVariables },
            })),
          },
      errors: (p.errors ?? []).map((p) => ({
        code: p.code,
        message: p.message,
      })),
    })),
  };
}

export interface DetectMultivariateLastAnomalyOptions
  extends RequestParameters {
  /** Body parameter Content-Type. Known values are: application/json. */
  content_type?: string;
}

/**
 * Submit multivariate anomaly detection task with the modelId of trained model
 * and inference data, and the inference data should be put into request body in a
 * JSON format. The request will complete synchronously and return the detection
 * immediately in the response body.
 */
export async function detectMultivariateLastAnomaly(
  context: Client,
  variables: VariableValues[],
  topContributorCount: number,
  model_id: string,
  options: DetectMultivariateLastAnomalyOptions = {}
): Promise<MultivariateLastDetectionResult> {
  const result = await context
    .path("/multivariate/models/{modelId}:detect-last", model_id)
    .post({
      headers: {
        Accept: options.accept ?? "application/json",
        "Content-Type": options.content_type ?? "application/json",
      },
      body: { variables: variables, topContributorCount: topContributorCount },
    });
  if (isUnexpected(result)) {
    throw result.body;
  }
  return {
    variableStates: (result.body.variableStates ?? []).map((p) => ({
      variable: p.variable,
      filledNARatio: p.filledNARatio,
      effectiveCount: p.effectiveCount,
      firstTimestamp: new Date(p.firstTimestamp ?? ""),
      lastTimestamp: new Date(p.lastTimestamp ?? ""),
    })),
    results: (result.body.results ?? []).map((p) => ({
      timestamp: new Date(p.timestamp ?? ""),
      value: !p.value
        ? undefined
        : {
            isAnomaly: p.value?.isAnomaly,
            severity: p.value?.severity,
            score: p.value?.score,
            interpretation: (p.value?.interpretation ?? []).map((p) => ({
              variable: p.variable,
              contributionScore: p.contributionScore,
              correlationChanges: !p.correlationChanges
                ? undefined
                : { changedVariables: p.correlationChanges?.changedVariables },
            })),
          },
      errors: (p.errors ?? []).map((p) => ({
        code: p.code,
        message: p.message,
      })),
    })),
  };
}
