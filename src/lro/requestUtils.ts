import { HttpOperationResponse } from "@azure/core-http";
import { terminalStates } from "./constants";
import { LROResponseInfo } from "./models";

/**
 * We need to selectively deserialize our responses, only deserializing if we
 * are in a final LRO response, not deserializing any polling non-terminal responses
 */
export const shouldDeserializeLRO = (originalLROInfo: LROResponseInfo) => (
  response: HttpOperationResponse
) => {
  if (
    originalLROInfo.azureAsyncOperation ||
    originalLROInfo.operationLocation
  ) {
    return isAsyncOperationFinalResponse(response);
  }

  if (originalLROInfo.location) {
    return isLocationFinalResponse(response);
  }

  if (originalLROInfo.requestMethod === "PUT") {
    return isBodyPollingFinalResponse(response);
  }

  return true;
};

function isAsyncOperationFinalResponse(
  response: HttpOperationResponse
): boolean {
  return true;
}

function isLocationFinalResponse(response: HttpOperationResponse): boolean {
  return false;
}

function isBodyPollingFinalResponse(response: HttpOperationResponse): boolean {
  const provisioningState: string =
    response.parsedBody.properties?.provisioningState || "Succeeded";

  if (terminalStates.includes(provisioningState.toLowerCase())) {
    return true;
  }

  return false;
}
