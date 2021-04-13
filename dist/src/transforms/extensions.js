"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const codemodel_1 = require("@azure-tools/codemodel");
const cloneOperation_1 = require("../utils/cloneOperation");
const extractPaginationDetails_1 = require("../utils/extractPaginationDetails");
const languageHelpers_1 = require("../utils/languageHelpers");
const lodash_1 = require("lodash");
/**
 * Normalizes the CodeModel based on available Azure extensions.
 * This may result in additional operations being inserted into the model.
 * @param codeModel The model that contains all the information required to generate a service API.
 */
function normalizeModelWithExtensions(codeModel) {
    normalizeObjectPropertySerializedNames(codeModel);
    addPageableMethods(codeModel);
    normalizeMultipleContentTypes(codeModel);
}
exports.normalizeModelWithExtensions = normalizeModelWithExtensions;
/**
 * This normalizes object property serializedNames that contain periods.
 * This is necessary for properties with odata.
 * Example: `@odata.location` -> `@odata\\.location`
 * @param codeModel
 */
function normalizeObjectPropertySerializedNames(codeModel) {
    var _a, _b;
    const schemas = codeModel.schemas;
    const objectSchemas = (_a = schemas.objects, (_a !== null && _a !== void 0 ? _a : []));
    for (const objectSchema of objectSchemas) {
        for (const property of (_b = objectSchema.properties, (_b !== null && _b !== void 0 ? _b : []))) {
            if (property.serializedName) {
                property.serializedName = property.serializedName.replace(".", "\\.");
            }
        }
    }
}
/**
 * This updates the contentType parameter for operations
 * that support multiple media types to be required.
 * @param codeModel
 */
function normalizeMultipleContentTypes(codeModel) {
    const operationGroups = codeModel.operationGroups;
    for (const operationGroup of operationGroups) {
        const operations = operationGroup.operations.slice();
        for (const operation of operations) {
            const requests = operation.requests;
            if (!requests || (requests && requests.length > 1)) {
                continue;
            }
            for (const request of requests) {
                const parameters = request.parameters;
                if (!parameters) {
                    continue;
                }
                for (const parameter of parameters) {
                    const parameterMetadata = languageHelpers_1.getLanguageMetadata(parameter.language);
                    if (parameterMetadata.name.toLowerCase() === "contenttype") {
                        parameter.required = false;
                    }
                }
            }
        }
    }
}
/**
 * Adds the <operationName>Next method for each operation with an x-ms-pageable extension.
 * @param codeModel
 */
function addPageableMethods(codeModel) {
    var _a, _b, _c, _d, _e;
    const operationGroups = codeModel.operationGroups;
    for (const operationGroup of operationGroups) {
        const operationGroupMetadata = languageHelpers_1.getLanguageMetadata(operationGroup.language);
        const operations = operationGroup.operations.slice();
        for (const operation of operations) {
            const paginationDetails = extractPaginationDetails_1.extractPaginationDetails(operation);
            const operationMetadata = languageHelpers_1.getLanguageMetadata(operation.language);
            const operationName = operationMetadata.name;
            const operationDescription = operationMetadata.description;
            if (!paginationDetails || !paginationDetails.nextLinkName) {
                // The operation either doesn't support pagination or returns all items in a single page.
                // Therefore, it is not necessary to create a pageable method.
                continue;
            }
            const nextLinkOperationName = paginationDetails.nextLinkOperationName;
            if (!nextLinkOperationName) {
                // We don't know what the new operation name is.
                throw new Error(`Unable to determine the x-ms-pageable operationName for "${operationName}".`);
            }
            // Attempt to find the nextLinkOperationName in the code model.
            let nextLinkMethod = findOperation(codeModel, (_a = paginationDetails.group, (_a !== null && _a !== void 0 ? _a : operationGroupMetadata.name)), nextLinkOperationName);
            if (nextLinkMethod) {
                // The operation to call to get subsequent pages already exists, so we don't need to create it.
                const nextMetadata = languageHelpers_1.getLanguageMetadata(nextLinkMethod.language);
                nextMetadata.paging = {
                    ...nextMetadata.paging,
                    isNextLinkMethod: true
                };
                // Populate original operation metadata
                operationMetadata.paging = {
                    ...operationMetadata.paging,
                    nextLinkOperation: nextLinkMethod,
                    isNextLinkMethod: false
                };
                continue;
            }
            // The "Next" operation doesn't exist, so we need to create it using current operation as a base.
            nextLinkMethod = cloneOperation_1.cloneOperation(operation, nextLinkOperationName, operationDescription);
            // Populate new Next operation metadata
            const nextLinkMethodMetadata = languageHelpers_1.getLanguageMetadata(nextLinkMethod.language);
            nextLinkMethodMetadata.paging = {
                ...nextLinkMethodMetadata.paging,
                isNextLinkMethod: true
            };
            // Populate original operation metadata
            operationMetadata.paging = {
                ...operationMetadata.paging,
                nextLinkOperation: nextLinkMethod,
                isNextLinkMethod: false
            };
            // Since this is a brand new operation, the nextLink will be a partial or absolute url.
            const nextLinkRequestProtocol = (_c = (_b = nextLinkMethod.requests) === null || _b === void 0 ? void 0 : _b[0].protocol.http, (_c !== null && _c !== void 0 ? _c : new codemodel_1.Protocol()));
            nextLinkRequestProtocol.path = "{nextLink}";
            // NextLink methods should always send GET requests
            // More info: https://github.com/Azure/autorest/tree/master/docs/extensions#x-ms-pageable
            nextLinkRequestProtocol.method = "GET";
            let isLRO = false;
            // NextLink method can not be LRO
            if (nextLinkMethod.extensions &&
                "x-ms-long-running-operation" in nextLinkMethod.extensions) {
                delete nextLinkMethod.extensions["x-ms-long-running-operation"];
                isLRO = true;
            }
            // Make sure there is a 200 response defined since LRO operations
            // are only required to define the initial response in SWAGGER
            inject200Response(nextLinkMethod, isLRO);
            // Create the nextLink parameter.
            // This will appear as a required parameter to the "Next" operation.
            const httpProtocol = new codemodel_1.Protocol();
            httpProtocol.in = codemodel_1.ParameterLocation.Path;
            const nextLinkParameter = new codemodel_1.Parameter("nextLink", `The nextLink from the previous successful call to the ${operationName} method.`, new codemodel_1.StringSchema("string", ""), {
                required: true,
                language: {
                    default: {
                        serializedName: "nextLink"
                    }
                },
                extensions: {
                    "x-ms-skip-url-encoding": true
                },
                protocol: {
                    http: httpProtocol
                },
                implementation: codemodel_1.ImplementationLocation.Method
            });
            // Ensure all overloads support the nextLink parameter.
            for (const request of (_d = nextLinkMethod.requests, (_d !== null && _d !== void 0 ? _d : []))) {
                const parameters = (_e = request.parameters, (_e !== null && _e !== void 0 ? _e : []));
                parameters.push(nextLinkParameter);
                request.parameters = parameters;
            }
            operationGroup.addOperation(nextLinkMethod);
        }
    }
}
/**
 * This function injects a 200 response definition if not present.
 * This is needed because SWAGGER only requires LRO operations to define
 * the initial request response. By injecting 200 response definition we
 * allow core-http deserialization to handle it as success rather that failure
 * as by default it treats any response not defined as an error
 * @param nextLinkMethod method to inject the 200 response to
 * @param isLRO whether or not the operation is LRO
 */
function inject200Response(nextLinkMethod, isLRO) {
    // Only inject for LRO operations
    if (!isLRO) {
        return;
    }
    if (nextLinkMethod.responses &&
        !nextLinkMethod.responses.find(r => {
            var _a;
            return !!((_a = r.protocol.http) === null || _a === void 0 ? void 0 : _a.statusCodes.includes("200"));
        })) {
        // Find the first response >= 200 <= 299 and clone it as 200
        const successResponse = nextLinkMethod.responses.find(r => {
            var _a;
            const statusCodes = ((_a = r.protocol.http) === null || _a === void 0 ? void 0 : _a.statusCodes) || [];
            return statusCodes.find(s => {
                const status = Number.parseInt(s);
                return status >= 200 && status < 300;
            });
        });
        if (!successResponse) {
            throw new Error("Expected nextLink of LRO operation to have a success response defined");
        }
        const success200 = lodash_1.cloneDeep(successResponse);
        success200.protocol.http.statusCodes = ["200"];
        nextLinkMethod.responses = [...nextLinkMethod.responses, success200];
    }
}
function findOperation(codeModel, operationGroupName, operationName) {
    var _a;
    const operationGroup = codeModel.operationGroups.find(og => og.language.default.name === operationGroupName);
    return (((_a = operationGroup) === null || _a === void 0 ? void 0 : _a.operations) || []).find(operation => {
        const languageMetadata = languageHelpers_1.getLanguageMetadata(operation.language);
        return languageMetadata.name === operationName;
    });
}
//# sourceMappingURL=extensions.js.map