"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
function createLocationStrategy(initialOperation, sendOperationFn) {
    const lroData = initialOperation.result._response[models_1.LROSYM];
    if (!lroData) {
        throw new Error("Expected lroData to be defined for Azure-AsyncOperation strategy");
    }
    let currentOperation = initialOperation;
    let lastKnownPollingUrl = lroData.location;
    return {
        isTerminal: () => {
            const currentResult = currentOperation.result._response[models_1.LROSYM];
            if (!currentResult) {
                throw new Error("Expected lroData to determine terminal status");
            }
            if (currentOperation === initialOperation) {
                return false;
            }
            if (currentResult.statusCode === 202) {
                return false;
            }
            return true;
        },
        sendFinalRequest: () => Promise.resolve(currentOperation),
        poll: async () => {
            var _a;
            if (!lastKnownPollingUrl) {
                throw new Error("Unable to determine polling url");
            }
            const pollingArgs = currentOperation.args;
            // Make sure we don't send any body to the get request
            const { requestBody, ...restSpec } = currentOperation.spec;
            const pollingSpec = {
                ...restSpec,
                httpMethod: "GET",
                path: lastKnownPollingUrl
            };
            const result = await sendOperationFn(pollingArgs, pollingSpec);
            // Update latest polling url
            lastKnownPollingUrl =
                ((_a = result._response[models_1.LROSYM]) === null || _a === void 0 ? void 0 : _a.location) || lastKnownPollingUrl;
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
exports.createLocationStrategy = createLocationStrategy;
//# sourceMappingURL=locationStrategy.js.map