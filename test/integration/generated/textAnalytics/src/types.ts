import {
  RawHttpHeaders,
  PipelineOptions,
  Pipeline,
  createPipelineRequest
} from "@azure/core-https";
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
import {
  createDefaultPipeline,
  getCachedDefaultHttpsClient
} from "./clientHelpers";

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
  Endpoint: string,
  options?: PipelineOptions
): TextAnalyticsClient {
  const baseUrl = "{Endpoint}/text/analytics/v3.1-preview.3".replace(
    /{Endpoint}/g,
    Endpoint
  );
  const pipeline = createDefaultPipeline(credentials, options);
  return {
    request: (route: string, options: any) => {
      if (route === "POST /analyze") {
        return requestAnalyze(pipeline, options)(route, options);
      }
      if (route === "GET /analyze/jobs/{jobId}") {
        return requestAnalyzeStatus(pipeline, options)(route, options);
      }
      if (route === "GET /entities/health/jobs/{jobId}") {
        return requestHealthStatus(pipeline, options)(route, options);
      }
      if (route === "DELETE /entities/health/jobs/{jobId}") {
        return requestCancelHealthJob(pipeline, options)(route, options);
      }
      if (route === "POST /entities/health/jobs") {
        return requestHealth(pipeline, options)(route, options);
      }
      if (route === "POST /entities/recognition/general") {
        return requestEntitiesRecognitionGeneral(pipeline, options)(
          route,
          options
        );
      }
      if (route === "POST /entities/recognition/pii") {
        return requestEntitiesRecognitionPii(pipeline, options)(route, options);
      }
      if (route === "POST /entities/linking") {
        return requestEntitiesLinking(pipeline, options)(route, options);
      }
      if (route === "POST /keyPhrases") {
        return requestKeyPhrases(pipeline, options)(route, options);
      }
      if (route === "POST /languages") {
        return requestLanguages(pipeline, options)(route, options);
      }
      if (route === "POST /sentiment") {
        return requestSentiment(pipeline, options)(route, options);
      }
    }
  } as TextAnalyticsClient;
}

function requestAnalyze(pipeline: Pipeline, baseUrl: string) {
  return async function(
    route: "POST /analyze",
    options?: AnalyzeParameters & RequestParameters
  ): Promise<Analyze202Response | Analyze400Response | Analyze500Response> {
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}/${route}`);
    const body = { analysisInput: options.analysisInput };

    const request = createPipelineRequest({
      url: url.toString(),
      method: "POST",
      body: JSON.stringify(body)
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status,
      parsedBody: JSON.parse(result.bodyAsText || "{}")
    };
  };
}

function requestAnalyzeStatus(pipeline: Pipeline, baseUrl: string) {
  return async function(
    route: "GET /analyze/jobs/{jobId}",
    options: AnalyzeStatusParameters & RequestParameters
  ): Promise<
    | AnalyzeStatus200Response
    | AnalyzeStatus404Response
    | AnalyzeStatus500Response
  > {
    let replacedPath: string = route;
    replacedPath = replacedPath.replace(/{jobId}/g, options["jobId"]);
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}/${replacedPath}`);
    url.searchParams.append("showStats", options["showStats"].toString());
    url.searchParams.append("$top", options["$top"].toString());
    url.searchParams.append("$skip", options["$skip"].toString());

    const request = createPipelineRequest({
      url: url.toString(),
      method: "GET"
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status,
      parsedBody: JSON.parse(result.bodyAsText || "{}")
    };
  };
}

function requestHealthStatus(pipeline: Pipeline, baseUrl: string) {
  return async function(
    route: "GET /entities/health/jobs/{jobId}",
    options: HealthStatusParameters & RequestParameters
  ): Promise<
    HealthStatus200Response | HealthStatus404Response | HealthStatus500Response
  > {
    let replacedPath: string = route;
    replacedPath = replacedPath.replace(/{jobId}/g, options["jobId"]);
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}/${replacedPath}`);
    url.searchParams.append("$top", options["$top"].toString());
    url.searchParams.append("$skip", options["$skip"].toString());
    url.searchParams.append("showStats", options["showStats"].toString());

    const request = createPipelineRequest({
      url: url.toString(),
      method: "GET"
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status,
      parsedBody: JSON.parse(result.bodyAsText || "{}")
    };
  };
}

function requestCancelHealthJob(pipeline: Pipeline, baseUrl: string) {
  return async function(
    route: "DELETE /entities/health/jobs/{jobId}",
    options: CancelHealthJobParameters & RequestParameters
  ): Promise<
    | CancelHealthJob202Response
    | CancelHealthJob404Response
    | CancelHealthJob500Response
  > {
    let replacedPath: string = route;
    replacedPath = replacedPath.replace(/{jobId}/g, options["jobId"]);
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}/${replacedPath}`);

    const request = createPipelineRequest({
      url: url.toString(),
      method: "DELETE"
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status,
      parsedBody: JSON.parse(result.bodyAsText || "{}")
    };
  };
}

function requestHealth(pipeline: Pipeline, baseUrl: string) {
  return async function(
    route: "POST /entities/health/jobs",
    options: HealthParameters & RequestParameters
  ): Promise<Health202Response | Health400Response | Health500Response> {
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}/${route}`);
    url.searchParams.append(
      "model-version",
      options["model-version"].toString()
    );
    url.searchParams.append(
      "stringIndexType",
      options["stringIndexType"].toString()
    );
    const body = { documents: options.documents };

    const request = createPipelineRequest({
      url: url.toString(),
      method: "POST",
      body: JSON.stringify(body)
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status,
      parsedBody: JSON.parse(result.bodyAsText || "{}")
    };
  };
}

function requestEntitiesRecognitionGeneral(
  pipeline: Pipeline,
  baseUrl: string
) {
  return async function(
    route: "POST /entities/recognition/general",
    options: EntitiesRecognitionGeneralParameters & RequestParameters
  ): Promise<
    | EntitiesRecognitionGeneral200Response
    | EntitiesRecognitionGeneral400Response
    | EntitiesRecognitionGeneral500Response
  > {
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}/${route}`);
    url.searchParams.append(
      "model-version",
      options["model-version"].toString()
    );
    url.searchParams.append("showStats", options["showStats"].toString());
    url.searchParams.append(
      "stringIndexType",
      options["stringIndexType"].toString()
    );
    const body = { documents: options.documents };

    const request = createPipelineRequest({
      url: url.toString(),
      method: "POST",
      body: JSON.stringify(body)
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status,
      parsedBody: JSON.parse(result.bodyAsText || "{}")
    };
  };
}

function requestEntitiesRecognitionPii(pipeline: Pipeline, baseUrl: string) {
  return async function(
    route: "POST /entities/recognition/pii",
    options: EntitiesRecognitionPiiParameters & RequestParameters
  ): Promise<
    | EntitiesRecognitionPii200Response
    | EntitiesRecognitionPii400Response
    | EntitiesRecognitionPii500Response
  > {
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}/${route}`);
    url.searchParams.append(
      "model-version",
      options["model-version"].toString()
    );
    url.searchParams.append("showStats", options["showStats"].toString());
    url.searchParams.append("domain", options["domain"].toString());
    url.searchParams.append(
      "stringIndexType",
      options["stringIndexType"].toString()
    );
    const body = { documents: options.documents };

    const request = createPipelineRequest({
      url: url.toString(),
      method: "POST",
      body: JSON.stringify(body)
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status,
      parsedBody: JSON.parse(result.bodyAsText || "{}")
    };
  };
}

function requestEntitiesLinking(pipeline: Pipeline, baseUrl: string) {
  return async function(
    route: "POST /entities/linking",
    options: EntitiesLinkingParameters & RequestParameters
  ): Promise<
    | EntitiesLinking200Response
    | EntitiesLinking400Response
    | EntitiesLinking500Response
  > {
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}/${route}`);
    url.searchParams.append(
      "model-version",
      options["model-version"].toString()
    );
    url.searchParams.append("showStats", options["showStats"].toString());
    url.searchParams.append(
      "stringIndexType",
      options["stringIndexType"].toString()
    );
    const body = { documents: options.documents };

    const request = createPipelineRequest({
      url: url.toString(),
      method: "POST",
      body: JSON.stringify(body)
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status,
      parsedBody: JSON.parse(result.bodyAsText || "{}")
    };
  };
}

function requestKeyPhrases(pipeline: Pipeline, baseUrl: string) {
  return async function(
    route: "POST /keyPhrases",
    options: KeyPhrasesParameters & RequestParameters
  ): Promise<
    KeyPhrases200Response | KeyPhrases400Response | KeyPhrases500Response
  > {
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}/${route}`);
    url.searchParams.append(
      "model-version",
      options["model-version"].toString()
    );
    url.searchParams.append("showStats", options["showStats"].toString());
    const body = { documents: options.documents };

    const request = createPipelineRequest({
      url: url.toString(),
      method: "POST",
      body: JSON.stringify(body)
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status,
      parsedBody: JSON.parse(result.bodyAsText || "{}")
    };
  };
}

function requestLanguages(pipeline: Pipeline, baseUrl: string) {
  return async function(
    route: "POST /languages",
    options: LanguagesParameters & RequestParameters
  ): Promise<
    Languages200Response | Languages400Response | Languages500Response
  > {
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}/${route}`);
    url.searchParams.append(
      "model-version",
      options["model-version"].toString()
    );
    url.searchParams.append("showStats", options["showStats"].toString());
    const body = { documents: options.documents };

    const request = createPipelineRequest({
      url: url.toString(),
      method: "POST",
      body: JSON.stringify(body)
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status,
      parsedBody: JSON.parse(result.bodyAsText || "{}")
    };
  };
}

function requestSentiment(pipeline: Pipeline, baseUrl: string) {
  return async function(
    route: "POST /sentiment",
    options: SentimentParameters & RequestParameters
  ): Promise<
    Sentiment200Response | Sentiment400Response | Sentiment500Response
  > {
    const httpClient = getCachedDefaultHttpsClient();
    const url = new URL(`${baseUrl}/${route}`);
    url.searchParams.append(
      "model-version",
      options["model-version"].toString()
    );
    url.searchParams.append("showStats", options["showStats"].toString());
    url.searchParams.append(
      "opinionMining",
      options["opinionMining"].toString()
    );
    url.searchParams.append(
      "stringIndexType",
      options["stringIndexType"].toString()
    );
    const body = { documents: options.documents };

    const request = createPipelineRequest({
      url: url.toString(),
      method: "POST",
      body: JSON.stringify(body)
    });
    const result = await pipeline.sendRequest(httpClient, request);
    return {
      request,
      headers: result.headers,
      status: result.status,
      parsedBody: JSON.parse(result.bodyAsText || "{}")
    };
  };
}
export default createTextAnalyticsClient;
