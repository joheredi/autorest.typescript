import { Client } from "@azure-rest/core-client";

export async function detectUnivariateEntireSeries(
  context: Client,
  DetectRequest: DetectRequest,
  options?: any
) {
  const result = await context.path("/timeseries/entire/detect").post({
    body: DetectRequest,
  });
}

export async function detectUnivariateLastPoint(
  context: Client,
  DetectRequest: DetectRequest,
  options?: any
) {
  const result = await context.path("/timeseries/last/detect").post({
    body: DetectRequest,
  });
}

export async function detectUnivariateChangePoint(
  context: Client,
  ChangePointDetectRequest: ChangePointDetectRequest,
  options?: any
) {
  const result = await context.path("/timeseries/changepoint/detect").post({
    body: ChangePointDetectRequest,
  });
}

export async function getBatchDetectionResult(
  context: Client,
  resultId: string,
  options?: any
) {
  const result = await context
    .path("/multivariate/detect-batch/{resultId}", resultId)
    .get();
}

export async function createAndTrainMultivariateModel(
  context: Client,
  ModelInfo: ModelInfo,
  options?: any
) {
  const result = await context.path("/multivariate/models").post({
    body: ModelInfo,
  });
}

export async function listMultivariateModels(context: Client, version: string, options?: any) {
  const result = await context.path("/multivariate/models").get({
    headers: { version },
    queryParameters: {
      skip: options?.["skip"],
      top: options?.["top"],
    },
  });


}

export async function deleteMultivariateModel(
  context: Client,
  modelId: string,
  options?: any
) {
  const result = await context
    .path("/multivariate/models/{modelId}", modelId)
    .delete();
}

export async function getMultivariateModel(
  context: Client,
  modelId: string,
  options?: any
) {
  const result = await context
    .path("/multivariate/models/{modelId}", modelId)
    .get();
}

export async function detectMultivariateBatchAnomaly(
  context: Client,
  modelId: string,
  DetectionRequest: DetectionRequest,
  options?: any
) {
  const result = await context
    .path("/multivariate/models/{modelId}:detect-batch", modelId)
    .post({
      body: DetectionRequest,
    });
}

export async function detectMultivariateLastAnomaly(
  context: Client,
  modelId: string,
  LastDetectionRequest: LastDetectionRequest,
  options?: any
) {
  const result = await context
    .path("/multivariate/models/{modelId}:detect-last", modelId)
    .post({
      body: LastDetectionRequest,
    });
}
