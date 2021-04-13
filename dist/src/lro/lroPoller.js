"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_lro_1 = require("@azure/core-lro");
const core_http_1 = require("@azure/core-http");
const models_1 = require("./models");
const operation_1 = require("./operation");
const bodyPollingStrategy_1 = require("./bodyPollingStrategy");
const azureAsyncOperationStrategy_1 = require("./azureAsyncOperationStrategy");
const locationStrategy_1 = require("./locationStrategy");
const passthroughStrategy_1 = require("./passthroughStrategy");
class LROPoller extends core_lro_1.Poller {
    constructor({ initialOperationArguments, initialOperationResult, initialOperationSpec, sendOperation, finalStateVia, intervalInMs = 2000 }) {
        const initialOperation = {
            args: initialOperationArguments,
            spec: initialOperationSpec,
            result: initialOperationResult
        };
        const pollingStrategy = getPollingStrategy(initialOperation, sendOperation, finalStateVia);
        const state = {
            // Initial operation will become the last operation
            initialOperation,
            lastOperation: initialOperation,
            pollingStrategy,
            finalStateVia
        };
        const operation = operation_1.makeOperation(state);
        super(operation);
        this.intervalInMs = intervalInMs;
    }
    /**
     * The method used by the poller to wait before attempting to update its operation.
     */
    delay() {
        return core_http_1.delay(this.intervalInMs);
    }
}
exports.LROPoller = LROPoller;
/**
 * This function determines which strategy to use based on the response from
 * the last operation executed, this last operation can be an initial operation
 * or a polling operation. The 3 possible strategies are described below:
 *
 * A) Azure-AsyncOperation or Operation-Location
 * B) Location
 * C) BodyPolling (provisioningState)
 *  - This strategy is used when:
 *    - Response doesn't contain any of the following headers Location, Azure-AsyncOperation or Operation-Location
 *    - Last operation method is PUT
 */
function getPollingStrategy(initialOperation, sendOperationFn, finalStateVia) {
    const lroData = initialOperation.result._response[models_1.LROSYM];
    if (!lroData) {
        const error = new core_http_1.RestError("Service response doesn't include the required LRO data to continue polling");
        error.statusCode = initialOperation.result._response.status;
        error.response = initialOperation.result._response;
        throw error;
    }
    if (lroData.azureAsyncOperation || lroData.operationLocation) {
        return azureAsyncOperationStrategy_1.createAzureAsyncOperationStrategy(initialOperation, sendOperationFn, finalStateVia);
    }
    if (lroData.location) {
        return locationStrategy_1.createLocationStrategy(initialOperation, sendOperationFn);
    }
    if (["PUT", "PATCH"].includes(lroData.requestMethod || "")) {
        return bodyPollingStrategy_1.createBodyPollingStrategy(initialOperation, sendOperationFn);
    }
    // Default strategy is just a passthrough returning the initial operation
    return passthroughStrategy_1.createPassthroughStrategy(initialOperation);
}
//# sourceMappingURL=lroPoller.js.map