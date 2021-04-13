"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const constants_1 = require("./constants");
/**
 * Creates a polling strategy based on BodyPolling which uses the provisioning state
 * from the result to determine the current operation state
 */
function createBodyPollingStrategy(initialOperation, sendOperation) {
    if (!initialOperation.result._response[models_1.LROSYM]) {
        throw new Error("Expected lroData to be defined for BodyPolling strategy");
    }
    let currentOperation = initialOperation;
    return {
        isTerminal: () => {
            const currentResult = currentOperation.result._response[models_1.LROSYM];
            if (!currentResult) {
                throw new Error("Expected lroData to determine terminal status");
            }
            const { provisioningState = "succeeded" } = currentResult;
            // If provisioning state is missing, default to Success
            return constants_1.terminalStates.includes(provisioningState.toLowerCase());
        },
        sendFinalRequest: () => {
            // BodyPolling doesn't require a final get so return the lastOperation
            return Promise.resolve(currentOperation);
        },
        poll: async () => {
            // When doing BodyPolling, we need to poll to the original url with a
            // GET http method
            const { requestBody, ...restSpec } = initialOperation.spec;
            const pollingSpec = {
                // Make sure we don't send any body to the get request
                ...restSpec,
                httpMethod: "GET"
            };
            // Execute the polling operation
            initialOperation.result = await sendOperation(initialOperation.args, pollingSpec);
            return initialOperation;
        }
    };
}
exports.createBodyPollingStrategy = createBodyPollingStrategy;
//# sourceMappingURL=bodyPollingStrategy.js.map