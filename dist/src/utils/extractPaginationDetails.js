"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codemodel_1 = require("@azure-tools/codemodel");
const lodash_1 = require("lodash");
const languageHelpers_1 = require("./languageHelpers");
const schemaHelpers_1 = require("./schemaHelpers");
/**
 * Extract pagination details from the pagination extension for an operation.
 * @param operation
 */
function extractPaginationDetails(operation) {
    const languageMetadata = languageHelpers_1.getLanguageMetadata(operation.language);
    const paginationExtension = languageMetadata.paging;
    if (!paginationExtension) {
        return;
    }
    paginationExtension.itemName = paginationExtension.itemName || "value";
    const nextLinkName = typeof paginationExtension.nextLinkName === "string"
        ? paginationExtension.nextLinkName
        : null;
    let nextLinkOperationName = "";
    if (paginationExtension.nextLinkOperation) {
        nextLinkOperationName = languageHelpers_1.getLanguageMetadata(paginationExtension.nextLinkOperation.language).name;
    }
    // When nextLinkOperation is not defined, but nextLinkName is, default to <operationName>Next as the operation name.
    // Otherwise, since nextLinkName is not defined, we all iterable results are returned in a single page.
    if (!nextLinkOperationName && nextLinkName) {
        nextLinkOperationName = `${languageMetadata.name}Next`;
    }
    let itemName = getItemName(paginationExtension, operation);
    return {
        group: paginationExtension.group,
        member: paginationExtension.member,
        nextLinkName,
        itemName,
        itemTypes: getItemTypes(operation, itemName),
        nextLinkOperationName,
        isNextLinkMethod: Boolean(paginationExtension.isNextLinkMethod)
    };
}
exports.extractPaginationDetails = extractPaginationDetails;
// This function finds the true name of "itemName", it is possible that it has changed
// if x-ms-client-name was used when defining the response object in swagger.
// So this function searches the serialized name which shouldn't change and gets the "true" name
function getItemName(paginationExtension, operation) {
    var _a, _b;
    let itemName = (_a = paginationExtension.itemName, (_a !== null && _a !== void 0 ? _a : "value"));
    for (const response of operation.responses || []) {
        if (schemaHelpers_1.isSchemaResponse(response)) {
            const valuesProperty = (_b = response.schema.properties) === null || _b === void 0 ? void 0 : _b.find(p => p.serializedName === itemName && p.schema.type === codemodel_1.SchemaType.Array);
            itemName = valuesProperty
                ? languageHelpers_1.getLanguageMetadata(valuesProperty.language).name
                : itemName;
        }
    }
    return itemName;
}
/**
 * Gets the types of the iterable field across all responses.
 */
function getItemTypes(operation, itemName) {
    var _a, _b;
    const operationName = languageHelpers_1.getLanguageMetadata(operation.language).name;
    const operationResponses = (_a = operation.responses, (_a !== null && _a !== void 0 ? _a : []));
    const itemTypes = [];
    for (const response of operationResponses) {
        if (!schemaHelpers_1.isSchemaResponse(response)) {
            // If the response is not a SchemaResponse (e.g. an Error),
            // not enough information is known about its type.
            continue;
        }
        const status = (_b = response.protocol.http) === null || _b === void 0 ? void 0 : _b.status;
        const typeDetails = getResponseItemType(response, operationName, status, itemName);
        const typeDetailsAlreadyFound = itemTypes.some(itemType => {
            return lodash_1.isEqual(itemType, typeDetails);
        });
        if (!typeDetailsAlreadyFound) {
            itemTypes.push({ ...typeDetails });
        }
    }
    return itemTypes;
}
/**
 * Gets the type of the iterable field.
 */
function getResponseItemType(response, operationName, status, itemName) {
    var _a;
    const responseSchema = response.schema;
    if (!isObjectSchema(responseSchema)) {
        throw new Error(`Response for "${operationName}" and status ${status} has "x-ms-pageable" but is not of type "object".`);
    }
    // Find the 1st property containing the results to paginate over.
    const itemProperty = (_a = responseSchema.properties) === null || _a === void 0 ? void 0 : _a.find(property => {
        const propertyName = languageHelpers_1.getLanguageMetadata(property.language).name;
        return propertyName === itemName || itemName === property.serializedName;
    });
    if (!itemProperty) {
        throw new Error(`Possible malformed Swagger. Response for status "${status}" in Operation "${operationName}" doesn't have a(n) "${itemName}" property.`);
    }
    if (itemProperty.schema.type !== codemodel_1.SchemaType.Array) {
        throw new Error(`Possible malformed Swagger. Response for status "${status}" in Operation "${operationName}", expected property "${itemName}" to be of type array.`);
    }
    return schemaHelpers_1.getTypeForSchema(itemProperty.schema);
}
function isObjectSchema(schema) {
    return schema && schema.type === codemodel_1.SchemaType.Object;
}
//# sourceMappingURL=extractPaginationDetails.js.map