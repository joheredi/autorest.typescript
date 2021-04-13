"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const codemodel_1 = require("@azure-tools/codemodel");
const lodash_1 = require("lodash");
const languageHelpers_1 = require("./languageHelpers");
/**
 * Clone an operation and overwrite the operation name and description.
 * @param operation
 * @param operationName
 * @param operationDescription
 */
function cloneOperation(operation, operationName, operationDescription) {
    const operationInitializer = lodash_1.cloneDeep(operation);
    // filter out methods
    for (const key of Object.keys(operationInitializer)) {
        if (typeof operationInitializer[key] === "function") {
            delete operationInitializer[key];
        }
    }
    const newOperation = new codemodel_1.Operation(operationName, operationDescription, operationInitializer);
    const operationMetadata = languageHelpers_1.getLanguageMetadata(newOperation.language);
    operationMetadata.name = operationName;
    operationMetadata.description = operationName;
    return newOperation;
}
exports.cloneOperation = cloneOperation;
//# sourceMappingURL=cloneOperation.js.map