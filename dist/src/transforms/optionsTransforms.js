"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autorestSession_1 = require("../autorestSession");
async function transformOptions(host, operationGroups) {
    const mediaTypes = getMediaTypesStyles(operationGroups);
    const disablePagingAsyncIterators = (await host.GetValue("disable-async-iterators")) === true;
    const autorestOptions = autorestSession_1.getAutorestOptions();
    return {
        // Common Autorest options
        ...autorestOptions,
        // Typescript specific options
        mediaTypes,
        disablePagingAsyncIterators,
        hasPaging: hasPagingOperations(operationGroups)
    };
}
exports.transformOptions = transformOptions;
/**
 * Gets the MediaTypes based on the different mediaTypes found in a set of operation groups
 * @param operationGroups
 */
function getMediaTypesStyles(operationGroups) {
    return operationGroups.reduce((mediaTypes, operationGroup) => new Set([...mediaTypes, ...operationGroup.mediaTypes]), new Set());
}
function hasPagingOperations(operationGroups) {
    return operationGroups.some(og => og.operations.some(o => !!o.pagination));
}
//# sourceMappingURL=optionsTransforms.js.map