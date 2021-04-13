"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nameUtils_1 = require("../../utils/nameUtils");
/**
 * Helper function that gets a set of object model names,
 * this can be used to check for possible duplicate names
 * while generating other models
 */
function getAllModelsNames(clientDetails) {
    return clientDetails.objects.reduce((acc, { name }) => {
        acc.add(name);
        return acc;
    }, new Set());
}
exports.getAllModelsNames = getAllModelsNames;
/**
 * Determines the correct name to use for a response type
 * taking in consideration the already existing object models
 * to avoid name collisions
 * @param responseName The raw response name
 * @param modelNames Set of existing model names
 */
function getResponseTypeName(responseName, modelNames) {
    const operationResponseName = nameUtils_1.normalizeName(responseName, nameUtils_1.NameType.Interface);
    let typeName = `${operationResponseName}Response`;
    return modelNames.has(typeName)
        ? `${operationResponseName}OperationResponse`
        : typeName;
}
exports.getResponseTypeName = getResponseTypeName;
/**
 * Given an Operation, this function finds the response type name and adds it to the imported models.
 * This function checks for a possible model name, or returns the default "RestResponse" type from core-http.
 */
function getOperationResponseType(operation, importedModels, modelNames) {
    const hasSuccessResponse = operation.responses.some(({ isError, mappers }) => !isError && (!!mappers.bodyMapper || !!mappers.headersMapper));
    const responseName = hasSuccessResponse ? operation.typeDetails.typeName : "";
    if (responseName) {
        const typeName = getResponseTypeName(responseName, modelNames);
        importedModels.add(typeName);
        return typeName;
    }
    return "coreHttp.RestResponse";
}
exports.getOperationResponseType = getOperationResponseType;
/**
 * This function extracts the body type for pageable operations. This is used to later on
 * be able to return an array of items, instead of the Response objects. This will get the type
 * of the "value" property from the response on a pageable operation.
 */
function getPagingResponseBodyType(operation) {
    const responses = operation.responses
        // Filter responses that are not marked as errors and that have either body or headers
        .filter(({ isError, mappers }) => !isError && (mappers.bodyMapper || mappers.headersMapper));
    if (responses.length > 1 && !hasUniqueMappers(responses)) {
        throw new Error("Handling multiple response types is not yet implemented");
    }
    return responses[0].types.pagingValueType;
}
exports.getPagingResponseBodyType = getPagingResponseBodyType;
function hasUniqueMappers(responses) {
    if (!responses.length) {
        throw new Error("Expected responses array to be non-empty");
    }
    const mapper = responses[0].mappers;
    for (const response of responses) {
        if (response.mappers.bodyMapper !== mapper.bodyMapper ||
            response.mappers.headersMapper !== mapper.headersMapper) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=responseTypeUtils.js.map