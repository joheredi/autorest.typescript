"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Only import parameters module if there are any non synthetic parameters
 */
function shouldImportParameters(clientDetails) {
    return clientDetails.parameters.some(p => !p.isSynthetic);
}
exports.shouldImportParameters = shouldImportParameters;
//# sourceMappingURL=importUtils.js.map