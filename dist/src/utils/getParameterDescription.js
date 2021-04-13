"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getParameterDescription(parameter, operationName) {
    var _a, _b;
    let description;
    if (operationName) {
        description = (_a = parameter.operationsIn) === null || _a === void 0 ? void 0 : _a[operationName].description;
    }
    if (!description) {
        description = (_b = parameter.description, (_b !== null && _b !== void 0 ? _b : ""));
    }
    return description;
}
exports.getParameterDescription = getParameterDescription;
//# sourceMappingURL=getParameterDescription.js.map