import { createAnomalyDetectorClient as createContext } from "./api/AnomalyDetectorClient.js";
import {
  deleteMultivariateModel,
  detectMultivariateBatchAnomaly,
  detectMultivariateLastAnomaly,
  detectUnivariateChangePoint,
  detectUnivariateEntireSeries,
  detectUnivariateLastPoint,
  getMultivariateBatchDetectionResult,
  getMultivariateModel,
  listMultivariateModels,
  trainMultivariateModel,
  DeleteMultivariateModelOptions,
  DetectMultivariateBatchAnomalyOptions,
  DetectMultivariateLastAnomalyOptions,
  DetectUnivariateChangePointOptions,
  DetectUnivariateEntireSeriesOptions,
  DetectUnivariateLastPointOptions,
  GetMultivariateBatchDetectionResultOptions,
  GetMultivariateModelOptions,
  ListMultivariateModelsOptions,
  TrainMultivariateModelOptions,
} from "./api/operations.js";
import { AzureKeyCredential } from "@azure/core-auth";
import {
  AnomalyDetectorClient as Context,
  AnomalyDetectorClientOptions,
} from "./rest/index.js";
import {
  AnomalyDetectionModel,
  ModelList,
  MultivariateDetectionResult,
  MultivariateLastDetectionResult,
  TimeGranularity,
  UnivariateChangePointDetectionResult,
  UnivariateEntireDetectionResult,
  UnivariateLastDetectionResult,
  VariableValues,
  TimeSeriesPoint,
} from "./api/models.js";

export interface AnomalyDetectorClient {
  deleteMultivariateModel: (
    model_id: string,
    options?: DeleteMultivariateModelOptions
  ) => Promise<void>;
  detectMultivariateBatchAnomaly: (
    dataSource: string,
    topContributorCount: number,
    startTime: Date,
    endTime: Date,
    model_id: string,
    options?: DetectMultivariateBatchAnomalyOptions
  ) => Promise<MultivariateDetectionResult>;
  detectMultivariateLastAnomaly: (
    variables: VariableValues[],
    topContributorCount: number,
    model_id: string,
    options?: DetectMultivariateLastAnomalyOptions
  ) => Promise<MultivariateLastDetectionResult>;
  detectUnivariateChangePoint: (
    series: TimeSeriesPoint[],
    granularity: TimeGranularity,
    options?: DetectUnivariateChangePointOptions
  ) => Promise<UnivariateChangePointDetectionResult>;
  detectUnivariateEntireSeries: (
    series: TimeSeriesPoint[],
    options?: DetectUnivariateEntireSeriesOptions
  ) => Promise<UnivariateEntireDetectionResult>;
  detectUnivariateLastPoint: (
    series: TimeSeriesPoint[],
    options?: DetectUnivariateLastPointOptions
  ) => Promise<UnivariateLastDetectionResult>;
  getMultivariateBatchDetectionResult: (
    result_id: string,
    options?: GetMultivariateBatchDetectionResultOptions
  ) => Promise<MultivariateDetectionResult>;
  getMultivariateModel: (
    model_id: string,
    options?: GetMultivariateModelOptions
  ) => Promise<AnomalyDetectionModel>;
  listMultivariateModels: (
    options?: ListMultivariateModelsOptions
  ) => Promise<ModelList>;
  trainMultivariateModel: (
    dataSource: string,
    startTime: Date,
    endTime: Date,
    options?: TrainMultivariateModelOptions
  ) => Promise<AnomalyDetectionModel>;
}

export function createAnomalyDetectorClient(
  endpoint: string,
  credential: AzureKeyCredential,
  options: AnomalyDetectorClientOptions = {}
): AnomalyDetectorClient {
  const context = createContext(endpoint, credential, options);

  return {
    deleteMultivariateModel: (model_id, options) =>
      deleteMultivariateModel(context, model_id, options),
    detectMultivariateBatchAnomaly: (
      dataSource: string,
      topContributorCount: number,
      startTime: Date,
      endTime: Date,
      model_id: string,
      options?: DetectMultivariateBatchAnomalyOptions
    ) =>
      detectMultivariateBatchAnomaly(
        context,
        dataSource,
        topContributorCount,
        startTime,
        endTime,
        model_id,
        options
      ),
    detectMultivariateLastAnomaly: (
      variables,
      topContributorCount,
      model_id,
      options
    ) =>
      detectMultivariateLastAnomaly(
        context,
        variables,
        topContributorCount,
        model_id,
        options
      ),
    detectUnivariateChangePoint: (series, granularity, options) =>
      detectUnivariateChangePoint(context, series as any, granularity, options),
    detectUnivariateEntireSeries: (series, options) =>
      detectUnivariateEntireSeries(context, series, options),
    detectUnivariateLastPoint: (series, options) =>
      detectUnivariateLastPoint(context, series, options),
    getMultivariateBatchDetectionResult: (result_id, options) =>
      getMultivariateBatchDetectionResult(context, result_id, options),
    getMultivariateModel: (model_id, options) =>
      getMultivariateModel(context, model_id, options),
    listMultivariateModels: (options) =>
      listMultivariateModels(context, options),
    trainMultivariateModel: (dataSource, startTime, endTime, options) =>
      trainMultivariateModel(context, dataSource, startTime, endTime, options),
  };
}
