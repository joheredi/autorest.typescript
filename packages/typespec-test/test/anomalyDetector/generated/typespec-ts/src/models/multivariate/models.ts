/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types *//**
 * Detection results for the resultId value.
 */
export interface MultivariateMultivariateDetectionResult {
  /**
   * Result identifier that's used to fetch the results of an inference call.
   */
  resultId: string;
  /**
   * Multivariate anomaly detection status.
   */
  summary: MultivariateMultivariateBatchDetectionResultSummary;
  /**
   * Detection result for each time stamp.
   */
  results: (MultivariateAnomalyState)[];
}
/**
 * Multivariate anomaly detection status.
 */
export interface MultivariateMultivariateBatchDetectionResultSummary {
  /**
   * Status of detection results.
   */
  status: MultivariateMultivariateBatchDetectionStatus;
  /**
   * Error message when detection fails.
   */
  errors?: (MultivariateErrorResponse)[];
  /**
   * Variable status.
   */
  variableStates?: (MultivariateVariableState)[];
  /**
   * Detection request for batch inference. This is an asynchronous inference that
   * will need another API to get detection results.
   */
  setupInfo: MultivariateMultivariateBatchDetectionOptions;
}
/**
 * Type of MultivariateMultivariateBatchDetectionStatus
 */
export type MultivariateMultivariateBatchDetectionStatus = "CREATED" | "RUNNING" | "READY" | "FAILED";/**
 * Known values of {@link MultivariateBatchDetectionStatus} that the service accepts.
 */
export enum KnownMultivariateMultivariateBatchDetectionStatus {
  /**
   * CREATED
   */
  Created = "CREATED",
  /**
   * RUNNING
   */
  Running = "RUNNING",
  /**
   * READY
   */
  Ready = "READY",
  /**
   * FAILED
   */
  Failed = "FAILED",
}
export type ArrayMultivariateErrorResponse = Array<MultivariateErrorResponse>;
/**
 * Error information that the API returned.
 */
export interface MultivariateErrorResponse {
  /**
   * Error code.
   */
  code: string;
  /**
   * Message that explains the error that the service reported.
   */
  message: string;
}
export type ArrayMultivariateVariableState = Array<MultivariateVariableState>;
/**
 * Variable status.
 */
export interface MultivariateVariableState {
  /**
   * Variable name in variable states.
   */
  variable?: string;
  /**
   * Proportion of missing values that need to be filled by fillNAMethod.
   */
  filledNaRatio?: number;
  /**
   * Number of effective data points before fillNAMethod is applied.
   */
  effectiveCount?: number;
  /**
   * First valid time stamp with a value of input data.
   */
  firstTimestamp?: Date;
  /**
   * Last valid time stamp with a value of input data.
   */
  lastTimestamp?: Date;
}
/**
 * Detection request for batch inference. This is an asynchronous inference that
 * will need another API to get detection results.
 */
export interface MultivariateMultivariateBatchDetectionOptions {
  /**
   * Source link to the input data to indicate an accessible Azure Storage URI.
   * It either points to an Azure Blob Storage folder or points to a CSV file in
   * Azure Blob Storage, based on your data schema selection. The data schema should
   * be exactly the same as those used in the training phase. The input data must
   * contain at least slidingWindow entries preceding the start time of the data
   * to be detected.
   */
  dataSource: string;
  /**
   * Number of top contributed variables for one anomalous time stamp in the response.
   */
  topContributorCount?: number;
  /**
   * Start date/time of data for detection, which should
   * be in ISO 8601 format.
   */
  startTime: Date;
  /**
   * End date/time of data for detection, which should
   * be in ISO 8601 format.
   */
  endTime: Date;
}
export type ArrayMultivariateAnomalyState = Array<MultivariateAnomalyState>;
/**
 * Anomaly status and information.
 */
export interface MultivariateAnomalyState {
  /**
   * Time stamp for this anomaly.
   */
  timestamp: Date;
  /**
   * Detailed value of this anomalous time stamp.
   */
  value?: MultivariateAnomalyValue;
  /**
   * Error message for the current time stamp.
   */
  errors?: (MultivariateErrorResponse)[];
}
/**
 * Detailed information of the anomalous time stamp.
 */
export interface MultivariateAnomalyValue {
  /**
   * True if an anomaly is detected at the current time stamp.
   */
  isAnomaly: boolean;
  /**
   * Indicates the significance of the anomaly. The higher the severity, the more
   * significant the anomaly is.
   */
  severity: number;
  /**
   * Raw anomaly score of severity, to help indicate the degree of abnormality.
   */
  score: number;
  /**
   * Interpretation of this anomalous time stamp.
   */
  interpretation?: (MultivariateAnomalyInterpretation)[];
}
export type ArrayMultivariateAnomalyInterpretation = Array<MultivariateAnomalyInterpretation>;
/**
 * Interpretation of the anomalous time stamp.
 */
export interface MultivariateAnomalyInterpretation {
  /**
   * Variable.
   */
  variable?: string;
  /**
   * This score shows the percentage that contributes to the anomalous time stamp. It's a
   * number between 0 and 1.
   */
  contributionScore?: number;
  /**
   * Correlation changes among the anomalous variables.
   */
  correlationChanges?: MultivariateCorrelationChanges;
}
/**
 * Correlation changes among the anomalous variables.
 */
export interface MultivariateCorrelationChanges {
  /**
   * Correlated variables that have correlation changes under an anomaly.
   */
  changedVariables?: (string)[];
}
/**
 * Error response.
 */
export interface MultivariateResponseError {
  /**
   * Error code.
   */
  code: string;
  /**
   * Message that explains the error that the service reported.
   */
  message: string;
}
/**
 * Training result of a model, including its status, errors, and diagnostics
 * information.
 */
export interface MultivariateModelInfo {
  /**
   * Source link to the input data to indicate an accessible Azure Storage URI.
   * It either points to an Azure Blob Storage folder or points to a CSV file in
   * Azure Blob Storage, based on your data schema selection.
   */
  dataSource: string;
  /**
   * Data schema of the input data source. The default
   * is OneTable.
   */
  dataSchema?: MultivariateDataSchema;
  /**
   * Start date/time of training data, which should be
   * in ISO 8601 format.
   */
  startTime: Date;
  /**
   * End date/time of training data, which should be
   * in ISO 8601 format.
   */
  endTime: Date;
  /**
   * Display name of the model. Maximum length is 24
   * characters.
   */
  displayName?: string;
  /**
   * Number of previous time stamps that will be used to
   * detect whether the time stamp is an anomaly or not.
   */
  slidingWindow?: number;
  /**
   * Manner of aligning multiple variables.
   */
  alignPolicy?: MultivariateAlignPolicy;
  /**
   * Model status.
   */
  readonly status?: MultivariateModelStatus;
  /**
   * Error messages after failure to create a model.
   */
  readonly errors?: (MultivariateErrorResponse)[];
  /**
   * Diagnostics information to help inspect the states of a model or variable.
   */
  readonly diagnosticsInfo?: MultivariateDiagnosticsInfo;
}
/**
 * Data schema of the input data source. The default is OneTable.
 */
export type MultivariateDataSchema = "OneTable" | "MultiTable";/**
 * Data schema of the input data source. The default is OneTable.
 */
export enum KnownMultivariateDataSchema {
  /**
   * OneTable means that your input data is in one CSV file, which contains one time stamp column and several variable columns. The default DataSchema value is OneTable.
   */
  OneTable = "OneTable",
  /**
   * MultiTable means that your input data is separated in multiple CSV files. Each file contains one time stamp column and one variable column, and the CSV file name should indicate the name of the variable. The default DataSchema value is OneTable.
   */
  MultiTable = "MultiTable",
}
/**
 * Manner of aligning multiple variables.
 */
export interface MultivariateAlignPolicy {
  /**
   * Field that indicates how to align different variables to the same
   * time range.
   */
  alignMode?: MultivariateAlignMode;
  /**
   * Field that indicates how missing values will be filled.
   */
  fillNaMethod?: MultivariateFillNaMethod;
  /**
   * Field that's required when fillNAMethod is Fixed.
   */
  paddingValue?: number;
}
/**
 * Type of MultivariateAlignMode
 */
export type MultivariateAlignMode = "Inner" | "Outer";/**
 * Known values of {@link AlignMode} that the service accepts.
 */
export enum KnownMultivariateAlignMode {
  /**
   * Inner
   */
  Inner = "Inner",
  /**
   * Outer
   */
  Outer = "Outer",
}
/**
 * Field that indicates how missing values will be filled.
 */
export type MultivariateFillNaMethod = "Previous" | "Subsequent" | "Linear" | "Zero" | "Fixed";/**
 * Field that indicates how missing values will be filled.
 */
export enum KnownMultivariateFillNaMethod {
  /**
   * Previous
   */
  Previous = "Previous",
  /**
   * Subsequent
   */
  Subsequent = "Subsequent",
  /**
   * Linear
   */
  Linear = "Linear",
  /**
   * Zero
   */
  Zero = "Zero",
  /**
   * Fixed
   */
  Fixed = "Fixed",
}
/**
 * Type of MultivariateModelStatus
 */
export type MultivariateModelStatus = "CREATED" | "RUNNING" | "READY" | "FAILED";/**
 * Known values of {@link ModelStatus} that the service accepts.
 */
export enum KnownMultivariateModelStatus {
  /**
   * The model has been created. Training has been scheduled but not yet started.
   */
  Created = "CREATED",
  /**
   * The model is being trained.
   */
  Running = "RUNNING",
  /**
   * The model has been trained and is ready to be used for anomaly detection.
   */
  Ready = "READY",
  /**
   * The model training failed.
   */
  Failed = "FAILED",
}
/**
 * Diagnostics information to help inspect the states of a model or variable.
 */
export interface MultivariateDiagnosticsInfo {
  /**
   * Model status.
   */
  modelState?: MultivariateModelState;
  /**
   * Variable status.
   */
  variableStates?: (MultivariateVariableState)[];
}
/**
 * Model status.
 */
export interface MultivariateModelState {
  /**
   * Number of passes of the entire training dataset that the
   * algorithm has completed.
   */
  epochIds?: (number)[];
  /**
   * List of metrics used to assess how the model fits the training data for each
   * epoch.
   */
  trainLosses?: (number)[];
  /**
   * List of metrics used to assess how the model fits the validation set for each
   * epoch.
   */
  validationLosses?: (number)[];
  /**
   * Latency for each epoch.
   */
  latenciesInSeconds?: (number)[];
}
/**
 * Response of getting a model.
 */
export interface MultivariateAnomalyDetectionModel {
  /**
   * Model identifier.
   */
  modelId: string;
  /**
   * Date and time (UTC) when the model was created.
   */
  createdTime: Date;
  /**
   * Date and time (UTC) when the model was last updated.
   */
  lastUpdatedTime: Date;
  /**
   * Training result of a model, including its status, errors, and diagnostics
   * information.
   */
  modelInfo?: MultivariateModelInfo;
}
/**
 * Response of listing models.
 */
export interface _MultivariateModelList {
  /**
   * List of models.
   */
  models: (MultivariateAnomalyDetectionModel)[];
  /**
   * Number of trained multivariate models.
   */
  currentCount: number;
  /**
   * Maximum number of models that can be trained for this Anomaly Detector resource.
   */
  maxCount: number;
  /**
   * Link to fetch more models.
   */
  nextLink?: string;
}
export type ArrayMultivariateAnomalyDetectionModel = Array<MultivariateAnomalyDetectionModel>;
/**
 * Request of the last detection.
 */
export interface MultivariateMultivariateLastDetectionOptions {
  /**
   * Contains the inference data, including the name, time stamps (ISO 8601), and
   * values of variables.
   */
  variables: (MultivariateVariableValues)[];
  /**
   * Number of top contributed
   * variables for one anomalous time stamp in the response. The default is
   * 10.
   */
  topContributorCount?: number;
}
export type ArrayMultivariateVariableValues = Array<MultivariateVariableValues>;
/**
 * Variable values.
 */
export interface MultivariateVariableValues {
  /**
   * Variable name of the last detection request.
   */
  variable: string;
  /**
   * Time stamps of the last detection request.
   */
  timestamps: (string)[];
  /**
   * Values of variables.
   */
  values: (number)[];
}
/**
 * Results of the last detection.
 */
export interface MultivariateMultivariateLastDetectionResult {
  /**
   * Variable status.
   */
  variableStates?: (MultivariateVariableState)[];
  /**
   * Anomaly status and information.
   */
  results?: (MultivariateAnomalyState)[];
}
