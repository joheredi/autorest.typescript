import { RawHttpHeaders, PipelineOptions } from "@azure/core-https";
import { TokenCredential } from "@azure/core-auth";
import {
  AnalyzeParameters,
  AnalyzeStatusParameters,
  HealthStatusParameters,
  CancelHealthJobParameters,
  HealthParameters,
  EntitiesRecognitionGeneralParameters,
  EntitiesRecognitionPiiParameters,
  EntitiesLinkingParameters,
  KeyPhrasesParameters,
  LanguagesParameters,
  SentimentParameters
} from "./parameters";
import {
  Analyze202Response,
  Analyze400Response,
  Analyze500Response,
  AnalyzeStatus200Response,
  AnalyzeStatus404Response,
  AnalyzeStatus500Response,
  HealthStatus200Response,
  HealthStatus404Response,
  HealthStatus500Response,
  CancelHealthJob202Response,
  CancelHealthJob404Response,
  CancelHealthJob500Response,
  Health202Response,
  Health400Response,
  Health500Response,
  EntitiesRecognitionGeneral200Response,
  EntitiesRecognitionGeneral400Response,
  EntitiesRecognitionGeneral500Response,
  EntitiesRecognitionPii200Response,
  EntitiesRecognitionPii400Response,
  EntitiesRecognitionPii500Response,
  EntitiesLinking200Response,
  EntitiesLinking400Response,
  EntitiesLinking500Response,
  KeyPhrases200Response,
  KeyPhrases400Response,
  KeyPhrases500Response,
  Languages200Response,
  Languages400Response,
  Languages500Response,
  Sentiment200Response,
  Sentiment400Response,
  Sentiment500Response
} from "./responses";

export interface Request {
  (
    route: "POST /analyze",
    options?: AnalyzeParameters & RequestParameters
  ): Promise<Analyze202Response | Analyze400Response | Analyze500Response>;
  (
    route: "GET /analyze/jobs/{jobId}",
    options: AnalyzeStatusParameters & RequestParameters
  ): Promise<
    | AnalyzeStatus200Response
    | AnalyzeStatus404Response
    | AnalyzeStatus500Response
  >;
  (
    route: "GET /entities/health/jobs/{jobId}",
    options: HealthStatusParameters & RequestParameters
  ): Promise<
    HealthStatus200Response | HealthStatus404Response | HealthStatus500Response
  >;
  (
    route: "DELETE /entities/health/jobs/{jobId}",
    options: CancelHealthJobParameters & RequestParameters
  ): Promise<
    | CancelHealthJob202Response
    | CancelHealthJob404Response
    | CancelHealthJob500Response
  >;
  (
    route: "POST /entities/health/jobs",
    options: HealthParameters & RequestParameters
  ): Promise<Health202Response | Health400Response | Health500Response>;
  (
    route: "POST /entities/recognition/general",
    options: EntitiesRecognitionGeneralParameters & RequestParameters
  ): Promise<
    | EntitiesRecognitionGeneral200Response
    | EntitiesRecognitionGeneral400Response
    | EntitiesRecognitionGeneral500Response
  >;
  (
    route: "POST /entities/recognition/pii",
    options: EntitiesRecognitionPiiParameters & RequestParameters
  ): Promise<
    | EntitiesRecognitionPii200Response
    | EntitiesRecognitionPii400Response
    | EntitiesRecognitionPii500Response
  >;
  (
    route: "POST /entities/linking",
    options: EntitiesLinkingParameters & RequestParameters
  ): Promise<
    | EntitiesLinking200Response
    | EntitiesLinking400Response
    | EntitiesLinking500Response
  >;
  (
    route: "POST /keyPhrases",
    options: KeyPhrasesParameters & RequestParameters
  ): Promise<
    KeyPhrases200Response | KeyPhrases400Response | KeyPhrases500Response
  >;
  (
    route: "POST /languages",
    options: LanguagesParameters & RequestParameters
  ): Promise<
    Languages200Response | Languages400Response | Languages500Response
  >;
  (
    route: "POST /sentiment",
    options: SentimentParameters & RequestParameters
  ): Promise<
    Sentiment200Response | Sentiment400Response | Sentiment500Response
  >;
}

export interface TextAnalyticsClient {
  request: Request;
}

export interface RequestParameters {
  baseUrl?: string;
  headers?: RawHttpHeaders;
  [parameter: string]: any;
}

function createTextAnalyticsClient(
  credentials: TokenCredential,
  endpoint: string,
  options?: PipelineOptions
): TextAnalyticsClient {
  throw new Error("Not implemented");
}
export default createTextAnalyticsClient;
