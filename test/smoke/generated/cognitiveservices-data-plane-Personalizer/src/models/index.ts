/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";

/**
 * The configuration of the service.
 */
export interface ServiceConfiguration {
  /**
   * The time span waited until a request is marked with the default reward.
   * For example, PT5M (5 mins). For information about the time format,
   * see http://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  rewardWaitTime: string;
  /**
   * The reward given if a reward is not received within the specified wait time.
   */
  defaultReward: number;
  /**
   * The function used to process rewards, if multiple reward scores are received before rewardWaitTime is over.
   */
  rewardAggregation: string;
  /**
   * The percentage of rank responses that will use exploration.
   */
  explorationPercentage: number;
  /**
   * Personalizer will start using the most updated trained model for online ranks automatically every specified time period.
   * For example, PT5M (5 mins). For information about the time format,
   * see http://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  modelExportFrequency: string;
  /**
   * Flag indicates whether log mirroring is enabled.
   */
  logMirrorEnabled?: boolean;
  /**
   * Azure storage account container SAS URI for log mirroring.
   */
  logMirrorSasUri?: string;
  /**
   * Number of days historical logs are to be maintained. -1 implies the logs will never be deleted.
   */
  logRetentionDays: number;
}

/**
 * Used to return an error to the client
 */
export interface ErrorResponse {
  /**
   * The error object.
   */
  error: PersonalizerError;
}

/**
 * The error object.
 */
export interface PersonalizerError {
  /**
   * High level error code.
   */
  code: PersonalizerErrorCode;
  /**
   * A message explaining the error reported by the service.
   */
  message: string;
  /**
   * Error source element.
   */
  target?: string;
  /**
   * An array of details about specific errors that led to this reported error.
   */
  details?: PersonalizerError[];
  /**
   * Finer error details.
   */
  innerError?: InternalError;
}

/**
 * An object containing more specific information than the parent object about the error.
 */
export interface InternalError {
  /**
   * Detailed error code.
   */
  code?: string;
  /**
   * The error object.
   */
  innererror?: InternalError;
}

/**
 * Learning settings specifying how to train the model.
 */
export interface PolicyContract {
  /**
   * Name of the Learning settings.
   */
  name: string;
  /**
   * Arguments of the Learning settings.
   */
  arguments: string;
}

export interface Evaluation {
  readonly id?: string;
  readonly name?: string;
  readonly startTime?: Date;
  readonly endTime?: Date;
  readonly jobId?: string;
  readonly status?: EvaluationJobStatus;
  policyResults?: PolicyResult[];
  featureImportance?: string[][];
}

export interface PolicyResult {
  readonly name?: string;
  readonly arguments?: string;
  readonly summary?: PolicyResultSummary[];
  readonly totalSummary?: PolicyResultTotalSummary;
}

export interface PolicyResultSummary {
  readonly timeStamp?: Date;
  readonly ipsEstimatorNumerator?: number;
  readonly ipsEstimatorDenominator?: number;
  readonly snipsEstimatorDenominator?: number;
  readonly aggregateTimeWindow?: string;
  nonZeroProbability?: number;
  readonly confidenceInterval?: number;
  readonly sumOfSquares?: number;
}

export type PolicyResultTotalSummary = PolicyResultSummary & {};

/**
 * A counterfactual evaluation.
 */
export interface EvaluationContract {
  /**
   * True if the evaluation should explore for a more optimal Learning settings.
   */
  enableOfflineExperimentation?: boolean;
  /**
   * The name of the evaluation.
   */
  name: string;
  /**
   * The start time of the evaluation.
   */
  startTime: Date;
  /**
   * The end time of the evaluation.
   */
  endTime: Date;
  /**
   * Additional Learning settings to evaluate.
   */
  policies: PolicyContract[];
}

/**
 * Reward given to a rank response.
 */
export interface RewardRequest {
  /**
   * Reward to be assigned to an action. Value should be between -1 and 1 inclusive.
   */
  value: number;
}

export interface LogsProperties {
  readonly dateRange?: LogsPropertiesDateRange;
}

export interface DateRange {
  readonly from?: Date;
  readonly to?: Date;
}

export type LogsPropertiesDateRange = DateRange & {};

export interface ModelProperties {
  readonly creationTime?: Date;
  readonly lastModifiedTime?: Date;
}

/**
 * Request a set of actions to be ranked by the Personalizer service.
 */
export interface RankRequest {
  /**
   * Features of the context used for Personalizer as a
   * dictionary of dictionaries. This depends on the application, and
   * typically includes features about the current user, their
   * device, profile information, aggregated data about time and date, etc.
   * Features should not include personally identifiable information (PII),
   * unique UserIDs, or precise timestamps.
   */
  contextFeatures?: any[];
  /**
   * The set of actions the Personalizer service can pick from.
   * The set should not contain more than 50 actions.
   * The order of the actions does not affect the rank result but the order
   * should match the sequence your application would have used to display them.
   * The first item in the array will be used as Baseline item in Offline evaluations.
   */
  actions: RankableAction[];
  /**
   * The set of action ids to exclude from ranking.
   */
  excludedActions?: string[];
  /**
   * Optionally pass an eventId that uniquely identifies this Rank event.
   * If null, the service generates a unique eventId. The eventId will be used for
   * associating this request with its reward, as well as seeding the pseudo-random
   * generator when making a Personalizer call.
   */
  eventId?: string;
  /**
   * Send false if it is certain the rewardActionId in rank results will be shown to the user, therefore
   * Personalizer will expect a Reward call, otherwise it will assign the default
   * Reward to the event. Send true if it is possible the user will not see the
   * action specified in the rank results, because the page is rendering later, or the Rank results may be
   * overridden by code further downstream.
   */
  deferActivation?: boolean;
}

/**
 * An action with it's associated features used for ranking.
 */
export interface RankableAction {
  /**
   * Id of the action.
   */
  id: string;
  /**
   * List of dictionaries containing features.
   */
  features: any[];
}

/**
 * Returns which action to use as rewardActionId, and additional information about each action as a result of a Rank request.
 */
export interface RankResponse {
  /**
   * The calculated ranking for the current request.
   */
  readonly ranking?: RankedAction[];
  /**
   * The eventId for the round trip from request to response.
   */
  readonly eventId?: string;
  /**
   * The action chosen by the Personalizer service. This is the action your application should display, and for which to report the reward. This might not be the
   * first found in 'ranking' if an action in the request in first position was part of the excluded ids.
   */
  readonly rewardActionId?: string;
}

/**
 * A ranked action with its resulting probability.
 */
export interface RankedAction {
  /**
   * Id of the action
   */
  readonly id?: string;
  /**
   * Probability of the action
   */
  readonly probability?: number;
}

export interface ContainerStatus {
  service?: string;
  apiStatus?: string;
  apiStatusMessage?: string;
}

/**
 * Defines headers for evaluations_create operation.
 */
export interface EvaluationsCreateHeaders {
  location?: string;
}

/**
 * Defines values for PersonalizerErrorCode.
 */
export type PersonalizerErrorCode =
  | "BadRequest"
  | "ResourceNotFound"
  | "InternalServerError"
  | "InvalidServiceConfiguration"
  | "InvalidPolicyConfiguration"
  | "InvalidPolicyContract"
  | "InvalidEvaluationContract"
  | "InvalidRewardRequest"
  | "InvalidEventIdToActivate"
  | "InvalidRankRequest"
  | "InvalidExportLogsRequest"
  | "InvalidContainer"
  | "FrontEndNotFound"
  | "EvaluationNotFound"
  | "LogsPropertiesNotFound"
  | "RankNullResponse"
  | "UpdateConfigurationFailed"
  | "ModelResetFailed";
/**
 * Defines values for EvaluationJobStatus.
 */
export type EvaluationJobStatus =
  | "completed"
  | "pending"
  | "failed"
  | "notSubmitted";

/**
 * Contains response data for the get operation.
 */
export type ServiceConfigurationGetResponse = ServiceConfiguration & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ServiceConfiguration;
  };
};

/**
 * Contains response data for the update operation.
 */
export type ServiceConfigurationUpdateResponse = ServiceConfiguration & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ServiceConfiguration;
  };
};

/**
 * Contains response data for the get operation.
 */
export type PolicyGetResponse = PolicyContract & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: PolicyContract;
  };
};

/**
 * Contains response data for the update operation.
 */
export type PolicyUpdateResponse = PolicyContract & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: PolicyContract;
  };
};

/**
 * Contains response data for the reset operation.
 */
export type PolicyResetResponse = PolicyContract & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: PolicyContract;
  };
};

/**
 * Contains response data for the get operation.
 */
export type EvaluationsGetResponse = Evaluation & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Evaluation;
  };
};

/**
 * Contains response data for the list operation.
 */
export type EvaluationsListResponse = Evaluation[] & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Evaluation[];
  };
};

/**
 * Contains response data for the create operation.
 */
export type EvaluationsCreateResponse = EvaluationsCreateHeaders &
  Evaluation & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: Evaluation;
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: EvaluationsCreateHeaders;
    };
  };

/**
 * Contains response data for the getProperties operation.
 */
export type LogGetPropertiesResponse = LogsProperties & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: LogsProperties;
  };
};

/**
 * Contains response data for the getProperties operation.
 */
export type ModelGetPropertiesResponse = ModelProperties & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: ModelProperties;
  };
};

/**
 * Contains response data for the rank operation.
 */
export type PersonalizerClientRankResponse = RankResponse & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: RankResponse;
  };
};

/**
 * Optional parameters.
 */
export interface PersonalizerClientOptionalParams
  extends coreHttp.ServiceClientOptions {
  /**
   * Overrides client endpoint.
   */
  endpoint?: string;
}
