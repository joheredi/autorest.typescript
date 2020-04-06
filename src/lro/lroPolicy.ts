import {
  RequestPolicy,
  RequestPolicyOptions,
  BaseRequestPolicy,
  HttpOperationResponse,
  WebResource,
} from "@azure/core-http";
import { LROResponseInfo } from "./models";

export function lroPolicy() {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new LROPolicy(nextPolicy, options);
    },
  };
}

class LROPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }

  public async sendRequest(
    webResource: WebResource
  ): Promise<HttpOperationResponse> {
    let result = await this._nextPolicy.sendRequest(webResource);
    const _lroData = getLROData(result);
    result.parsedBody = { ...result.parsedBody, _lroData };
    return result;
  }
}

function getLROData(result: HttpOperationResponse): LROResponseInfo {
  const { status, properties } = JSON.parse(result.bodyAsText || "{}");
  return {
    azureAsyncOperation: result.headers.get("azure-asyncoperation"),
    operationLocation: result.headers.get("operation-location"),
    location: result.headers.get("location"),
    requestMethod: result.request.method,
    status,
    provisioningState: properties?.provisioningState,
  };
}
