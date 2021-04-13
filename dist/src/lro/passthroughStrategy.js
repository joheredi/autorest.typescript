"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates a polling strategy based on BodyPolling which uses the provisioning state
 * from the result to determine the current operation state
 */
function createPassthroughStrategy(initialOperation) {
    return {
        isTerminal: () => {
            return true;
        },
        sendFinalRequest: () => {
            // BodyPolling doesn't require a final get so return the lastOperation
            return Promise.resolve(initialOperation);
        },
        poll: async () => {
            throw new Error("Passthrough strategy should never poll");
        }
    };
}
exports.createPassthroughStrategy = createPassthroughStrategy;
//# sourceMappingURL=passthroughStrategy.js.map