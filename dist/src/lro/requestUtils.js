"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
/**
 * We need to selectively deserialize our responses, only deserializing if we
 * are in a final LRO response, not deserializing any polling non-terminal responses
 */
function shouldDeserializeLRO(finalStateVia) {
    let initialOperationInfo;
    let isInitialRequest = true;
    return (response) => {
        if (response.status < 200 || response.status >= 300) {
            return true;
        }
        if (!initialOperationInfo) {
            initialOperationInfo = getLROData(response);
        }
        else {
            isInitialRequest = false;
        }
        if (initialOperationInfo.azureAsyncOperation ||
            initialOperationInfo.operationLocation) {
            return (!isInitialRequest &&
                isAsyncOperationFinalResponse(response, initialOperationInfo, finalStateVia));
        }
        if (initialOperationInfo.location) {
            return isLocationFinalResponse(response);
        }
        if (initialOperationInfo.requestMethod === "PUT") {
            return isBodyPollingFinalResponse(response);
        }
        return true;
    };
}
exports.shouldDeserializeLRO = shouldDeserializeLRO;
function isAsyncOperationFinalResponse(response, initialOperationInfo, finalStateVia) {
    var _a;
    const status = ((_a = response.parsedBody) === null || _a === void 0 ? void 0 : _a.status) || "Succeeded";
    if (!constants_1.terminalStates.includes(status.toLowerCase())) {
        return false;
    }
    if (initialOperationInfo.requestMethod === "DELETE") {
        return true;
    }
    if (initialOperationInfo.requestMethod === "PUT" &&
        finalStateVia &&
        finalStateVia.toLowerCase() === "azure-asyncoperation") {
        return true;
    }
    if (initialOperationInfo.requestMethod !== "PUT" &&
        !initialOperationInfo.location) {
        return true;
    }
    return false;
}
function isLocationFinalResponse(response) {
    return response.status !== 202;
}
function isBodyPollingFinalResponse(response) {
    var _a, _b;
    const provisioningState = ((_b = (_a = response.parsedBody) === null || _a === void 0 ? void 0 : _a.properties) === null || _b === void 0 ? void 0 : _b.provisioningState) || "Succeeded";
    if (constants_1.terminalStates.includes(provisioningState.toLowerCase())) {
        return true;
    }
    return false;
}
function getLROData(result) {
    var _a;
    const statusCode = result.status;
    const { status, properties } = result.parsedBody || {};
    return {
        statusCode,
        azureAsyncOperation: result.headers.get("azure-asyncoperation"),
        operationLocation: result.headers.get("operation-location"),
        location: result.headers.get("location"),
        requestMethod: result.request.method,
        status,
        provisioningState: (_a = properties) === null || _a === void 0 ? void 0 : _a.provisioningState
    };
}
exports.getLROData = getLROData;
//# sourceMappingURL=requestUtils.js.map