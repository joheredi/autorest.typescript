"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_http_1 = require("@azure/core-http");
const models_1 = require("./models");
const requestUtils_1 = require("./requestUtils");
function lroPolicy() {
    return {
        create: (nextPolicy, options) => {
            return new LROPolicy(nextPolicy, options);
        }
    };
}
exports.lroPolicy = lroPolicy;
class LROPolicy extends core_http_1.BaseRequestPolicy {
    constructor(nextPolicy, options) {
        super(nextPolicy, options);
    }
    async sendRequest(webResource) {
        let result = await this._nextPolicy.sendRequest(webResource);
        const _lroData = requestUtils_1.getLROData(result);
        result[models_1.LROSYM] = _lroData;
        return result;
    }
}
//# sourceMappingURL=lroPolicy.js.map