"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nameUtils_1 = require("./nameUtils");
const headersToSchema_1 = require("./headersToSchema");
const languageHelpers_1 = require("./languageHelpers");
function extractHeaders(operationGroups, clientName) {
    let responseHeaders = [];
    operationGroups.forEach(operationGroup => operationGroup.operations.forEach(operation => {
        processHeaders(false, operation.responses || [], responseHeaders, operationGroup, operation, clientName);
        processHeaders(true, operation.exceptions || [], responseHeaders, operationGroup, operation, clientName);
    }));
    return responseHeaders;
}
exports.extractHeaders = extractHeaders;
function processHeaders(isException, responses, responseHeaders, operationGroup, operation, clientName) {
    responses.forEach(response => {
        var _a;
        const operationName = nameUtils_1.getOperationFullName(operationGroup, operation, clientName);
        const headers = (_a = response.protocol.http) === null || _a === void 0 ? void 0 : _a.headers;
        if (headers) {
            const headerSchema = headersToSchema_1.headersToSchema(headers, operationName, isException);
            if (headerSchema) {
                updateResponseHeaders(headerSchema, responseHeaders);
            }
        }
    });
}
/*
 * Checks if there is an existing schema as the headersSchema
 * in the responseHeaders. If there is one, then merge its
 * properties and properties of headersSchema. If there is none,
 * then push the headerSchema to the responseHeaders.
 */
function updateResponseHeaders(headerSchema, responseHeaders) {
    let pushHeaderSchema = true;
    for (let responseHeader of responseHeaders) {
        if (languageHelpers_1.getLanguageMetadata(responseHeader.language).name ==
            languageHelpers_1.getLanguageMetadata(headerSchema.language).name) {
            if (headerSchema.properties) {
                if (responseHeader.properties) {
                    responseHeader.properties.concat(headerSchema.properties);
                }
                else {
                    responseHeader.properties = headerSchema.properties;
                }
                pushHeaderSchema = false;
            }
        }
    }
    if (pushHeaderSchema) {
        responseHeaders.push(headerSchema);
    }
}
//# sourceMappingURL=extractHeaders.js.map