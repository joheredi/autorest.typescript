"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codemodel_1 = require("@azure-tools/codemodel");
const languageHelpers_1 = require("../utils/languageHelpers");
function transformBaseUrl(codeModel) {
    let endpoint = "";
    let isCustom = false;
    const $host = (codeModel.globalParameters || []).find(p => {
        const { name } = languageHelpers_1.getLanguageMetadata(p.language);
        return name === "$host" && Boolean(p.clientDefaultValue);
    });
    let parameterName;
    if (!$host) {
        // No support yet for multi-baseUrl yet Issue #553
        const { requests } = codeModel.operationGroups[0].operations[0];
        parameterName = getEndpointParameter(codeModel);
        isCustom = true;
        endpoint = requests[0].protocol.http.uri;
    }
    else {
        endpoint = $host.clientDefaultValue;
    }
    return {
        parameterName,
        endpoint: endpoint,
        isCustom
    };
}
exports.transformBaseUrl = transformBaseUrl;
function getEndpointParameter(codeModel) {
    if (!codeModel.globalParameters || !codeModel.globalParameters.length) {
        return;
    }
    const uriParameters = codeModel.globalParameters.filter(gp => {
        var _a;
        return gp.implementation === codemodel_1.ImplementationLocation.Client &&
            ((_a = gp.protocol.http) === null || _a === void 0 ? void 0 : _a.in) === codemodel_1.ParameterLocation.Uri;
    });
    // Currently only support one parametrized host
    if (!uriParameters.length ||
        !uriParameters[0].language.default.serializedName) {
        return;
    }
    return uriParameters[0].language.default.serializedName;
}
//# sourceMappingURL=urlTransforms.js.map