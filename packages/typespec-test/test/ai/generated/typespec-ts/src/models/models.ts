/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */export type ArrayString = Array<string>;
export type RecordStringString = Record<string, string>;
/**
 * Response from the Workspace - Get operation
 */
export interface GetWorkspaceResponse {
  /**
   * A unique identifier for the resource
   */
  id: string;
  /**
   * The name of the resource
   */
  name: string;
  /**
   * The properties of the resource
   */
  properties: WorkspaceProperties;
}
/**
 * workspace properties
 */
export interface WorkspaceProperties {
  /**
   * Authentication type of the connection target
   */
  applicationInsights: string;
}
/**
 * Response from the list operation
 */
export interface ListConnectionsResponse {
  /**
   * A list of connection list secrets
   */
  value: (GetConnectionResponse)[];
}
export type ArrayGetConnectionResponse = Array<GetConnectionResponse>;
/**
 * Response from the listSecrets operation
 */
export interface GetConnectionResponse {
  /**
   * A unique identifier for the connection
   */
  id: string;
  /**
   * The name of the resource
   */
  name: string;
  /**
   * The properties of the resource
   */
  properties: InternalConnectionPropertiesUnion;
}
/**
 * Connection properties
 */
export interface InternalConnectionProperties {
  /**
   * Authentication type of the connection target
   */
  authType: AuthenticationType;
  /**
   * Category of the connection
   */
  category: ConnectionType;
  /**
   * The connection URL to be used for this service
   */
  target: string;
}/**
 * Alias for InternalConnectionPropertiesUnion
 */
export type InternalConnectionPropertiesUnion = InternalConnectionPropertiesApiKeyAuth | InternalConnectionPropertiesAadAuth | InternalConnectionPropertiesSasAuth | InternalConnectionPropertiesUnion;
/**
 * Authentication type used by Azure AI service to connect to another service
 */
export type AuthenticationType = "ApiKey" | "AAD" | "SAS";/**
 * Authentication type used by Azure AI service to connect to another service
 */
export enum KnownAuthenticationType {
  /**
   * API Key authentication
   */
  ApiKey = "ApiKey",
  /**
   * Entra ID authentication (formerly known as AAD)
   */
  EntraId = "AAD",
  /**
   * Shared Access Signature (SAS) authentication
   */
  Sas = "SAS",
}
/**
 * The Type (or category) of the connection
 */
export type ConnectionType = "AzureOpenAI" | "Serverless" | "AzureBlob" | "AIServices" | "CognitiveSearch";/**
 * The Type (or category) of the connection
 */
export enum KnownConnectionType {
  /**
   * Azure OpenAI Service
   */
  AzureOpenAi = "AzureOpenAI",
  /**
   * Serverless API Service
   */
  Serverless = "Serverless",
  /**
   * Azure Blob Storage
   */
  AzureBlobStorage = "AzureBlob",
  /**
   * Azure AI Services
   */
  AzureAiServices = "AIServices",
  /**
   * Azure AI Search
   */
  AzureAiSearch = "CognitiveSearch",
}
/**
 * Connection properties for connections with API key authentication
 */
export interface InternalConnectionPropertiesApiKeyAuth extends InternalConnectionPropertiesUnion {
  /**
   * Authentication type of the connection target
   */
  authType: "ApiKey";
  /**
   * Credentials will only be present for authType=ApiKey
   */
  credentials: CredentialsApiKeyAuth;
}
/**
 * The credentials needed for API key authentication
 */
export interface CredentialsApiKeyAuth {
  /**
   * The API key
   */
  key: string;
}
/**
 * Connection properties for connections with AAD authentication (aka `Entra ID passthrough`)
 */
export interface InternalConnectionPropertiesAadAuth extends InternalConnectionPropertiesUnion {
  /**
   * Authentication type of the connection target
   */
  authType: "AAD";
}
/**
 * Connection properties for connections with SAS authentication
 */
export interface InternalConnectionPropertiesSasAuth extends InternalConnectionPropertiesUnion {
  /**
   * Authentication type of the connection target
   */
  authType: "SAS";
  /**
   * Credentials will only be present for authType=ApiKey
   */
  credentials: CredentialsSasAuth;
}
/**
 * The credentials needed for Shared Access Signatures (SAS) authentication
 */
export interface CredentialsSasAuth {
  /**
   * The Shared Access Signatures (SAS) token
   */
  sas: string;
}
/**
 * Response from getting properties of the Application Insights resource
 */
export interface GetAppInsightsResponse {
  /**
   * A unique identifier for the resource
   */
  id: string;
  /**
   * The name of the resource
   */
  name: string;
  /**
   * The properties of the resource
   */
  properties: AppInsightsProperties;
}
/**
 * The properties of the Application Insights resource
 */
export interface AppInsightsProperties {
  /**
   * Authentication type of the connection target
   */
  connectionString: string;
}
/**
 * Evaluation Definition
 */
export interface Evaluation {
  /**
   * Identifier of the evaluation.
   */
  readonly id: string;
  /**
   * Data for evaluation.
   */
  data: InputDataUnion;
  /**
   * Display Name for evaluation. It helps to find the evaluation easily in AI Foundry. It does not need to be unique.
   */
  displayName?: string;
  /**
   * Description of the evaluation. It can be used to store additional information about the evaluation and is mutable.
   */
  description?: string;
  /**
   * Metadata containing createdBy and modifiedBy information.
   */
  readonly systemData?: SystemData;
  /**
   * Status of the evaluation. It is set by service and is read-only.
   */
  readonly status?: string;
  /**
   * Evaluation's tags. Unlike properties, tags are fully mutable.
   */
  tags?: Record<string, string>;
  /**
   * Evaluation's properties. Unlike tags, properties are add-only. Once added, a property cannot be removed.
   */
  properties?: Record<string, string>;
  /**
   * Evaluators to be used for the evaluation.
   */
  evaluators: Record<string, EvaluatorConfiguration>;
}
/**
 * Abstract data class for input data configuration.
 */
export interface InputData {
  /**
   * Type of the data.
   */
  type: string;
}/**
 * Alias for InputDataUnion
 */
export type InputDataUnion = ApplicationInsightsConfiguration | Dataset | InputDataUnion;
/**
 * Data Source for Application Insights.
 */
export interface ApplicationInsightsConfiguration extends InputDataUnion {
  readonly type: "app_insights";
  /**
   * LogAnalytic Workspace resourceID associated with ApplicationInsights
   */
  resourceId: string;
  /**
   * Query to fetch the data.
   */
  query: string;
  /**
   * Service name.
   */
  serviceName: string;
  /**
   * Connection String to connect to ApplicationInsights.
   */
  connectionString?: string;
}
/**
 * Dataset as source for evaluation.
 */
export interface Dataset extends InputDataUnion {
  readonly type: "dataset";
  /**
   * Evaluation input data
   */
  id: string;
}
/**
 * Metadata pertaining to creation and last modification of the resource.
 */
export interface SystemData {
  /**
   * The timestamp the resource was created at.
   */
  readonly createdAt?: Date;
  /**
   * The identity that created the resource.
   */
  readonly createdBy?: string;
  /**
   * The identity type that created the resource.
   */
  readonly createdByType?: string;
  /**
   * The timestamp of resource last modification (UTC)
   */
  readonly lastModifiedAt?: Date;
}
export type RecordStringEvaluatorConfiguration = Record<string, EvaluatorConfiguration>;
/**
 * Evaluator Configuration
 */
export interface EvaluatorConfiguration {
  /**
   * Identifier of the evaluator.
   */
  id: string;
  /**
   * Initialization parameters of the evaluator.
   */
  initParams?: Record<string, any>;
  /**
   * Data parameters of the evaluator.
   */
  dataMapping?: Record<string, string>;
}
export type RecordStringAny = Record<string, any>;
/**
 * Paged collection of Evaluation items
 */
export interface _PagedEvaluation {
  /**
   * The Evaluation items on this page
   */
  value: (Evaluation)[];
  /**
   * The link to the next page of items
   */
  nextLink?: string;
}
export type ArrayEvaluation = Array<Evaluation>;
/**
 * Evaluation Schedule Definition
 */
export interface EvaluationSchedule {
  /**
   * Name of the schedule, which also serves as the unique identifier for the evaluation
   */
  readonly name: string;
  /**
   * Data for evaluation.
   */
  data: ApplicationInsightsConfiguration;
  /**
   * Description of the evaluation. It can be used to store additional information about the evaluation and is mutable.
   */
  description?: string;
  /**
   * Metadata containing createdBy and modifiedBy information.
   */
  readonly systemData?: SystemData;
  /**
   * Provisioning State of the evaluation. It is set by service and is read-only.
   */
  readonly provisioningState?: string;
  /**
   * Evaluation's tags. Unlike properties, tags are fully mutable.
   */
  tags?: Record<string, string>;
  /**
   * Evaluation's properties. Unlike tags, properties are add-only. Once added, a property cannot be removed.
   */
  properties?: Record<string, string>;
  /**
   * Enabled status of the evaluation. It is set by service and is read-only.
   */
  readonly isEnabled?: string;
  /**
   * Evaluators to be used for the evaluation.
   */
  evaluators: Record<string, EvaluatorConfiguration>;
  /**
   * Trigger for the evaluation.
   */
  trigger: TriggerUnion;
}
/**
 * Abstract data class for input data configuration.
 */
export interface Trigger {
  /**
   * Type of the trigger.
   */
  type: string;
}/**
 * Alias for TriggerUnion
 */
export type TriggerUnion = RecurrenceTrigger | CronTrigger | TriggerUnion;
/**
 * Recurrence Trigger Definition
 */
export interface RecurrenceTrigger extends TriggerUnion {
  readonly type: "Recurrence";
  /**
   * The frequency to trigger schedule.
   */
  frequency: Frequency;
  /**
   * Specifies schedule interval in conjunction with frequency
   */
  interval: number;
  /**
   * The recurrence schedule.
   */
  schedule?: RecurrenceSchedule;
}
/**
 * Frequency of the schedule - day, week, month, hour, minute
 */
export type Frequency = "Month" | "Week" | "Day" | "Hour" | "Minute";/**
 * Frequency of the schedule - day, week, month, hour, minute
 */
export enum KnownFrequency {
  /**
   * Month
   */
  Month = "Month",
  /**
   * Week
   */
  Week = "Week",
  /**
   * Day
   */
  Day = "Day",
  /**
   * Hour
   */
  Hour = "Hour",
  /**
   * Minute
   */
  Minute = "Minute",
}
/**
 * RecurrenceSchedule Definition
 */
export interface RecurrenceSchedule {
  /**
   * List of hours for the schedule.
   */
  hours: (number)[];
  /**
   * List of minutes for the schedule.
   */
  minutes: (number)[];
  /**
   * List of days for the schedule.
   */
  weekDays?: (WeekDays)[];
  /**
   * List of month days for the schedule
   */
  monthDays?: (number)[];
}
export type ArrayNumber = Array<number>;
export type ArrayWeekDays = Array<WeekDays>;
/**
 * WeekDay of the schedule - Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
 */
export type WeekDays = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";/**
 * WeekDay of the schedule - Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
 */
export enum KnownWeekDays {
  /**
   * Monday
   */
  Monday = "Monday",
  /**
   * Tuesday
   */
  Tuesday = "Tuesday",
  /**
   * Wednesday
   */
  Wednesday = "Wednesday",
  /**
   * Thursday
   */
  Thursday = "Thursday",
  /**
   * Friday
   */
  Friday = "Friday",
  /**
   * Saturday
   */
  Saturday = "Saturday",
  /**
   * Sunday
   */
  Sunday = "Sunday",
}
/**
 * Cron Trigger Definition
 */
export interface CronTrigger extends TriggerUnion {
  readonly type: "Cron";
  /**
   * Cron expression for the trigger.
   */
  expression: string;
}
/**
 * Paged collection of EvaluationSchedule items
 */
export interface _PagedEvaluationSchedule {
  /**
   * The EvaluationSchedule items on this page
   */
  value: (EvaluationSchedule)[];
  /**
   * The link to the next page of items
   */
  nextLink?: string;
}
export type ArrayEvaluationSchedule = Array<EvaluationSchedule>;
/**
 * Azure AI API versions
 */
export enum KnownVersions {
  /**
   * Azure AI API version 2024-07-01-preview.
   */
  _20240701Preview = "2024-07-01-preview",
}
