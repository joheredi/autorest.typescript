"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const codemodel_1 = require("@azure-tools/codemodel");
const nameUtils_1 = require("../utils/nameUtils");
const languageHelpers_1 = require("../utils/languageHelpers");
const schemaHelpers_1 = require("../utils/schemaHelpers");
const mapperTransforms_1 = require("./mapperTransforms");
const modelDetails_1 = require("../models/modelDetails");
const codegen_1 = require("@azure-tools/codegen");
const headersToSchema_1 = require("../utils/headersToSchema");
const extractPaginationDetails_1 = require("../utils/extractPaginationDetails");
const lodash_1 = require("lodash");
/**
 * SWAGGER doesn't require to define all possible response codes
 * for the polling operations, since we need to send operation specs
 * to coreHttp we'll inject possible response codes. The stub responses
 * will be a clone of the first success response defined
 */
function injectMissingResponses(responses) {
    const acceptedResponses = ["200", "201", "202", "204"];
    // Use an already defined accepted response as base;
    const baseResponse = acceptedResponses.reduce((acc, status) => {
        if (!lodash_1.isEmpty(acc)) {
            return acc;
        }
        const response = responses.find(r => r.statusCodes.includes(status));
        if (response) {
            acc = response;
        }
        return acc;
    }, {});
    // Clone the bas response with the accepted response codes
    const enhancedResponses = acceptedResponses.reduce((acc, status) => {
        let current = responses.find(r => r.statusCodes.includes(status));
        if (!current) {
            current = { ...baseResponse, statusCodes: [status] };
        }
        return [...acc, current];
    }, []);
    // Keep the non success responses originally defined
    const otherResponses = responses.filter(r => !acceptedResponses.some(ar => lodash_1.isEqual([ar], r.statusCodes)));
    return [...enhancedResponses, ...otherResponses];
}
function transformOperationSpec(operationDetails, parameters) {
    const operationName = nameUtils_1.normalizeName(operationDetails.name, nameUtils_1.NameType.Operation, true /** shouldGuard */);
    // Extract protocol information
    const operationFullName = operationDetails.fullName;
    const operationSpecDetails = [];
    const hasMultipleRequests = operationDetails.requests.length > 1;
    for (const request of operationDetails.requests) {
        const isXML = request.mediaType
            ? request.mediaType === codegen_1.KnownMediaType.Xml
            : operationDetails.mediaTypes.has(codegen_1.KnownMediaType.Xml);
        const httpInfo = extractHttpDetails(request);
        const { requestBody, formDataParameters, queryParameters, urlParameters, headerParameters } = getGroupedParameters(parameters, operationFullName, request.mediaType);
        const name = hasMultipleRequests
            ? `${operationName}$${request.mediaType}OperationSpec`
            : `${operationName}OperationSpec`;
        operationSpecDetails.push({
            ...httpInfo,
            responses: extractSpecResponses(operationDetails),
            requestBody,
            formDataParameters,
            ...(queryParameters && queryParameters.length && { queryParameters }),
            ...(urlParameters && urlParameters.length && { urlParameters }),
            ...(headerParameters && headerParameters.length && { headerParameters }),
            ...(isXML && { isXML }),
            name
        });
    }
    return operationSpecDetails;
}
exports.transformOperationSpec = transformOperationSpec;
function extractHttpDetails({ path, method }) {
    return {
        path,
        httpMethod: method.toUpperCase()
    };
}
exports.extractHttpDetails = extractHttpDetails;
function extractSpecResponses({ name, responses, isLRO }) {
    if (!responses || !responses.length) {
        throw new Error(`The operation ${name} contains no responses`);
    }
    let enhancedResponses = responses;
    if (isLRO) {
        enhancedResponses = injectMissingResponses(responses);
    }
    return extractSchemaResponses(enhancedResponses);
}
exports.extractSpecResponses = extractSpecResponses;
function getSpecType(responseSchema, expand = false) {
    let typeName = "";
    let allowedValues = undefined;
    let reference = undefined;
    let constantProps;
    switch (responseSchema.type) {
        case codemodel_1.SchemaType.ByteArray:
            typeName = "Base64Url";
            break;
        case codemodel_1.SchemaType.Constant:
            const constantSchema = responseSchema;
            typeName = getSpecType(constantSchema.valueType).name;
            constantProps = expand
                ? {
                    isConstant: true,
                    defaultValue: constantSchema.value.value
                }
                : undefined;
            break;
        case codemodel_1.SchemaType.String:
            typeName = "String";
            break;
        case codemodel_1.SchemaType.Choice:
        case codemodel_1.SchemaType.SealedChoice:
            const choiceSchema = responseSchema;
            typeName = "Enum";
            allowedValues = choiceSchema.choices.map(choice => choice.value);
            break;
        case codemodel_1.SchemaType.Object:
            const name = languageHelpers_1.getLanguageMetadata(responseSchema.language).name;
            reference = `Mappers.${nameUtils_1.normalizeName(name, nameUtils_1.NameType.Class, true /** shouldGuard */)}`;
            break;
        default:
            typeName = mapperTransforms_1.getMapperTypeFromSchema(responseSchema.type);
            break;
    }
    let result = {
        name: typeName,
        reference
    };
    return {
        ...result,
        ...(!!allowedValues && { allowedValues }),
        ...(!!constantProps && { constantProps })
    };
}
exports.getSpecType = getSpecType;
function extractSchemaResponses(responses) {
    return responses.reduce((result, { statusCodes, mappers }) => {
        if (!statusCodes || !statusCodes.length) {
            return result;
        }
        const statusCode = statusCodes[0];
        result[statusCode] = mappers;
        return result;
    }, {});
}
exports.extractSchemaResponses = extractSchemaResponses;
function transformOperationRequest(request) {
    if (!request.protocol.http) {
        throw new Error("Operation does not specify HTTP request details.");
    }
    return {
        path: request.protocol.http.path,
        method: request.protocol.http.method,
        mediaType: request.protocol.http.knownMediaType,
        parameters: request.parameters
    };
}
exports.transformOperationRequest = transformOperationRequest;
/**
 * Build OperationResponseDetails by extracting body and header information
 * from the response
 */
function transformOperationResponse(response, operationFullName, paginationItemName) {
    const httpInfo = response.protocol.http;
    if (!httpInfo) {
        throw new Error("Operation does not specify HTTP response details.");
    }
    const isDefault = httpInfo.statusCodes.indexOf("default") > -1;
    const isError = isDefault ||
        (!!response.extensions && !!response.extensions["x-ms-error-response"]);
    // Transform Headers to am ObjectSchema to represent headers as an object
    const headersSchema = headersToSchema_1.headersToSchema(httpInfo.headers, operationFullName, isError);
    const mediaType = httpInfo.knownMediaType;
    const mappers = {
        bodyMapper: schemaHelpers_1.isSchemaResponse(response)
            ? getMapperForSchema(response.schema, mediaType)
            : undefined,
        headersMapper: headersSchema
            ? getMapperForSchema(headersSchema, mediaType)
            : undefined,
        isError: !isDefault && isError
    };
    if (mediaType === codegen_1.KnownMediaType.Binary && !mappers.bodyMapper) {
        mappers.bodyMapper = {
            type: {
                name: "Stream"
            },
            serializedName: "parsedResponse"
        };
    }
    const types = {
        bodyType: schemaHelpers_1.isSchemaResponse(response)
            ? schemaHelpers_1.getTypeForSchema(response.schema)
            : undefined,
        headersType: headersSchema ? schemaHelpers_1.getTypeForSchema(headersSchema) : undefined,
        pagingValueType: isError
            ? undefined
            : getPagingItemType(response, paginationItemName)
    };
    return {
        statusCodes: httpInfo.statusCodes,
        mediaType: httpInfo.knownMediaType,
        mappers,
        types,
        isError: isError
    };
}
exports.transformOperationResponse = transformOperationResponse;
/**
 * This function extracts the type of the value property in the response of a pageable operation
 */
function getPagingItemType(response, paginationItemName) {
    var _a;
    if (schemaHelpers_1.isSchemaResponse(response)) {
        if (paginationItemName) {
            const paginationValueType = (_a = response.schema.properties) === null || _a === void 0 ? void 0 : _a.find(p => {
                const name = languageHelpers_1.getLanguageMetadata(p.language).name;
                return (name === paginationItemName ||
                    p.serializedName === paginationItemName);
            });
            if (!paginationValueType) {
                throw new Error("x-ms-pageable itemName is was not found in the result definition");
            }
            return schemaHelpers_1.getTypeForSchema(paginationValueType.schema);
        }
    }
    return undefined;
}
async function transformOperation(operation, operationGroup, clientName) {
    var _a;
    const metadata = languageHelpers_1.getLanguageMetadata(operation.language);
    const pagination = extractPaginationDetails_1.extractPaginationDetails(operation);
    const name = nameUtils_1.normalizeName(metadata.name, nameUtils_1.NameType.Operation, true /** shouldGuard */);
    const operationFullName = nameUtils_1.getOperationFullName(operationGroup, operation, clientName);
    const responsesAndErrors = [
        ...(operation.responses || []),
        ...(operation.exceptions || [])
    ];
    const typeName = `${nameUtils_1.normalizeName(getOperationGroupName(operationGroup, clientName), nameUtils_1.NameType.Interface)}${nameUtils_1.normalizeName(metadata.name, nameUtils_1.NameType.Interface, true /** shouldGuard */)}`;
    const typeDetails = {
        typeName,
        kind: modelDetails_1.PropertyKind.Composite,
        usedModels: [typeName]
    };
    const isLRO = Boolean(operation.extensions && operation.extensions["x-ms-long-running-operation"]);
    const lroOptions = operation.extensions &&
        operation.extensions["x-ms-long-running-operation-options"];
    const codeModelRequests = operation.requests;
    if (codeModelRequests === undefined || !codeModelRequests.length) {
        throw new Error(`No request object was found for operation: ${operationFullName}`);
    }
    const pagingValueProperty = (_a = metadata.paging) === null || _a === void 0 ? void 0 : _a.itemName;
    const requests = codeModelRequests.map(transformOperationRequest);
    let responses = responsesAndErrors.map(response => transformOperationResponse(response, operationFullName, pagingValueProperty));
    const hasMultipleResponses = responses.filter(r => !r.isError).length > 1;
    // If this is an LRO operation only consider the first success response,
    // this is because LRO operations swagger defines initial and final operation
    // responses in the same operation.
    if (isLRO && hasMultipleResponses) {
        const errorResponses = responses.filter(r => r.isError);
        responses = [responses[0], ...errorResponses];
    }
    const mediaTypes = await getOperationMediaTypes(requests, responses);
    return {
        name,
        typeDetails,
        fullName: operationFullName,
        apiVersions: operation.apiVersions
            ? operation.apiVersions.map(v => v.version)
            : [],
        description: metadata.description,
        parameters: operation.parameters || [],
        requests,
        responses,
        mediaTypes,
        pagination,
        isLRO,
        lroOptions
    };
}
exports.transformOperation = transformOperation;
function transformOperationGroups(codeModel) {
    const clientName = languageHelpers_1.getLanguageMetadata(codeModel.language).name;
    return Promise.all(codeModel.operationGroups.map(operationGroup => transformOperationGroup(operationGroup, clientName)));
}
exports.transformOperationGroups = transformOperationGroups;
function getOperationGroupName(operationGroup, clientName = "") {
    const { name } = languageHelpers_1.getLanguageMetadata(operationGroup.language);
    return nameUtils_1.normalizeName(name || clientName, nameUtils_1.NameType.OperationGroup);
}
async function transformOperationGroup(operationGroup, clientName) {
    const metadata = languageHelpers_1.getLanguageMetadata(operationGroup.language);
    const isTopLevel = !metadata.name;
    const operationGroupClassName = getOperationGroupName(operationGroup, clientName);
    const operations = await Promise.all(operationGroup.operations.map(operation => transformOperation(operation, operationGroup, clientName)));
    const mediaTypes = getOperationGroupMediaTypes(operations);
    return {
        name: operationGroupClassName,
        key: operationGroup.$key,
        operations,
        isTopLevel,
        mediaTypes
    };
}
exports.transformOperationGroup = transformOperationGroup;
function getOperationGroupMediaTypes(operationDetails) {
    return operationDetails.reduce((acc, op) => {
        return new Set([...acc, ...op.mediaTypes]);
    }, new Set());
}
async function getOperationMediaTypes(requests, responses) {
    const mediaTypes = new Set();
    requests.forEach(r => r.mediaType && mediaTypes.add(r.mediaType));
    responses.forEach(r => r.mediaType && mediaTypes.add(r.mediaType));
    return mediaTypes;
}
function getGroupedParameters(parameters, operationFullname, mediaType) {
    const operationParams = parameters.filter(p => {
        // Ensure parameters are specific to the operation.
        const matchesOperation = p.operationsIn && p.operationsIn[operationFullname];
        // Consider the media type as a match if none was provided, or they actually match.
        // This is important when an operation supports multiple media types.
        const matchesMediaType = !mediaType || !p.targetMediaType || p.targetMediaType === mediaType;
        return Boolean(matchesOperation && matchesMediaType);
    });
    const hasFormDataParameters = mediaType &&
        (mediaType == codegen_1.KnownMediaType.Multipart || mediaType == codegen_1.KnownMediaType.Form);
    // Extract parameters that are located in the operation body
    const bodyParams = operationParams.filter(p => p.location === codemodel_1.ParameterLocation.Body);
    let requestBody = bodyParams;
    // If we have an empty array make the request boyd undefined
    if (bodyParams.length === 0) {
        requestBody = undefined;
    }
    // Flatten the bodyParams array if it only contains a single parameter
    if (bodyParams.length === 1) {
        requestBody = bodyParams[0];
    }
    return {
        ...(hasFormDataParameters
            ? {
                formDataParameters: operationParams.filter(p => p.location === codemodel_1.ParameterLocation.Body)
            }
            : {
                requestBody
            }),
        queryParameters: operationParams.filter(p => p.location === codemodel_1.ParameterLocation.Query),
        urlParameters: operationParams.filter(p => p.location === codemodel_1.ParameterLocation.Path ||
            p.location === codemodel_1.ParameterLocation.Uri),
        headerParameters: operationParams.filter(p => p.location === codemodel_1.ParameterLocation.Header),
        cookie: operationParams.filter(p => p.location === codemodel_1.ParameterLocation.Cookie)
    };
}
function getMapperForSchema(responseSchema, mediaType, expand = false) {
    const responseType = getSpecType(responseSchema, expand);
    const { reference } = responseType;
    return (reference ||
        mapperTransforms_1.transformMapper({
            schema: responseSchema,
            options: { hasXmlMetadata: mediaType === codegen_1.KnownMediaType.Xml }
        }));
}
//# sourceMappingURL=operationTransforms.js.map