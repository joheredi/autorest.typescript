"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const constants_1 = require("./constants");
function createAzureAsyncOperationStrategy(initialOperation, sendOperationFn, finalStateVia) {
    const lroData = initialOperation.result._response[models_1.LROSYM];
    if (!lroData) {
        throw new Error("Expected lroData to be defined for Azure-AsyncOperation strategy");
    }
    let currentOperation = initialOperation;
    let lastKnownPollingUrl = lroData.azureAsyncOperation || lroData.operationLocation;
    return {
        isTerminal: () => {
            const currentResult = currentOperation.result._response[models_1.LROSYM];
            if (!currentResult) {
                throw new Error("Expected lroData to determine terminal status");
            }
            if (currentOperation === initialOperation) {
                // Azure-AsyncOperations don't need to check for terminal state
                // on originalOperation result, always need to poll
                return false;
            }
            const { status = "succeeded" } = currentResult;
            return constants_1.terminalStates.includes(status.toLowerCase());
        },
        sendFinalRequest: async () => {
            var _a, _b, _c;
            if (!initialOperation.result._response[models_1.LROSYM]) {
                throw new Error("Expected lroData to determine terminal status");
            }
            if (!currentOperation.result._response[models_1.LROSYM]) {
                throw new Error("Expected lroData to determine terminal status");
            }
            const initialOperationResult = initialOperation.result._response[models_1.LROSYM];
            const currentOperationResult = currentOperation.result._response[models_1.LROSYM];
            if (!shouldPerformFinalGet(initialOperationResult, currentOperationResult)) {
                return currentOperation;
            }
            if (((_a = initialOperationResult) === null || _a === void 0 ? void 0 : _a.requestMethod) === "PUT") {
                currentOperation = await sendFinalGet(initialOperation, sendOperationFn);
                return currentOperation;
            }
            if ((_b = initialOperationResult) === null || _b === void 0 ? void 0 : _b.location) {
                switch (finalStateVia) {
                    case "original-uri":
                        currentOperation = await sendFinalGet(initialOperation, sendOperationFn);
                        return currentOperation;
                    case "azure-async-operation":
                        return currentOperation;
                    case "location":
                    default:
                        const location = initialOperationResult.location || ((_c = currentOperationResult) === null || _c === void 0 ? void 0 : _c.location);
                        if (!location) {
                            throw new Error("Couldn't determine final GET URL from location");
                        }
                        return await sendFinalGet(initialOperation, sendOperationFn, location);
                }
            }
            // All other cases return the last operation
            return currentOperation;
        },
        poll: async () => {
            var _a, _b;
            if (!lastKnownPollingUrl) {
                throw new Error("Unable to determine polling url");
            }
            const pollingArgs = currentOperation.args;
            // Make sure we don't send any body to the get request
            const { requestBody, responses, ...restSpec } = currentOperation.spec;
            const pollingSpec = {
                ...restSpec,
                responses: getCompositeMappers(responses),
                httpMethod: "GET",
                path: lastKnownPollingUrl
            };
            const result = await sendOperationFn(pollingArgs, pollingSpec);
            // Update latest polling url
            lastKnownPollingUrl =
                ((_a = result._response[models_1.LROSYM]) === null || _a === void 0 ? void 0 : _a.azureAsyncOperation) || ((_b = result._response[models_1.LROSYM]) === null || _b === void 0 ? void 0 : _b.operationLocation) ||
                    lastKnownPollingUrl;
            // Update lastOperation result
            currentOperation = {
                args: pollingArgs,
                spec: pollingSpec,
                result
            };
            return currentOperation;
        }
    };
}
exports.createAzureAsyncOperationStrategy = createAzureAsyncOperationStrategy;
/**
 * Polling calls will always return a status object i.e. {"status": "success"}
 * these intermediate responses are not described in the swagger so we need to
 * pass custom mappers at runtime.
 * This function replaces all the existing mappers to be able to deserialize a status object
 * @param responses Original set of responses defined in the operation
 */
function getCompositeMappers(responses) {
    return Object.keys(responses).reduce((acc, statusCode) => {
        return {
            ...acc,
            [statusCode]: {
                ...responses[statusCode],
                bodyMapper: {
                    type: {
                        name: "Composite",
                        modelProperties: {
                            status: {
                                serializedName: "status",
                                type: {
                                    name: "String"
                                }
                            }
                        }
                    }
                }
            }
        };
    }, {});
}
function shouldPerformFinalGet(initialResult, currentResult) {
    const { status } = currentResult || {};
    const { requestMethod: initialRequestMethod, location } = initialResult || {};
    if (status && status.toLowerCase() !== "succeeded") {
        return false;
    }
    if (initialRequestMethod === "DELETE") {
        return false;
    }
    if (initialRequestMethod !== "PUT" && !location) {
        return false;
    }
    return true;
}
async function sendFinalGet(initialOperation, sendOperationFn, path) {
    // Make sure we don't send any body to the get request
    const { requestBody, ...restSpec } = initialOperation.spec;
    const finalGetSpec = {
        ...restSpec,
        httpMethod: "GET"
    };
    // Send final GET request to the Original URL
    const spec = {
        ...finalGetSpec,
        ...(path && { path })
    };
    let operationArgs = initialOperation.args;
    if (operationArgs.options) {
        operationArgs.options.shouldDeserialize = true;
    }
    const finalResult = await sendOperationFn(initialOperation.args, spec);
    return {
        args: initialOperation.args,
        spec,
        result: finalResult
    };
}
//# sourceMappingURL=azureAsyncOperationStrategy.js.map