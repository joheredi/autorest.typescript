"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const codemodel_1 = require("@azure-tools/codemodel");
const core_http_1 = require("@azure/core-http");
const languageHelpers_1 = require("../utils/languageHelpers");
const nameUtils_1 = require("../utils/nameUtils");
const mapperTransforms_1 = require("./mapperTransforms");
const lodash_1 = require("lodash");
const schemaHelpers_1 = require("../utils/schemaHelpers");
const valueHelpers_1 = require("../utils/valueHelpers");
const modelDetails_1 = require("../models/modelDetails");
const codegen_1 = require("@azure-tools/codegen");
const buildCredentialsParameter = () => ({
    nameRef: "credentials",
    description: "Subscription credentials which uniquely identify client subscription.",
    name: "credentials",
    serializedName: "credentials",
    location: codemodel_1.ParameterLocation.None,
    required: true,
    nullable: false,
    parameterPath: "credentials",
    mapper: "any",
    isGlobal: true,
    parameter: {},
    implementationLocation: codemodel_1.ImplementationLocation.Client,
    typeDetails: {
        typeName: "coreHttp.TokenCredential | coreHttp.ServiceClientCredentials",
        kind: modelDetails_1.PropertyKind.Primitive,
        usedModels: []
    },
    isSynthetic: true,
    schemaType: codemodel_1.SchemaType.Object,
    isFlattened: false
});
const buildEndpointParameter = () => ({
    nameRef: "endpoint",
    description: "Overrides client endpoint.",
    name: "endpoint",
    serializedName: "endpoint",
    location: codemodel_1.ParameterLocation.None,
    required: false,
    nullable: true,
    parameterPath: "endpoint",
    mapper: "any",
    isGlobal: true,
    parameter: {},
    implementationLocation: codemodel_1.ImplementationLocation.Client,
    typeDetails: {
        typeName: "string",
        kind: modelDetails_1.PropertyKind.Primitive,
        usedModels: []
    },
    isSynthetic: true,
    schemaType: codemodel_1.SchemaType.String,
    isFlattened: false
});
function transformParameters(codeModel, options) {
    var _a;
    let parameters = [];
    const hasXmlMetadata = !!((_a = options.mediaTypes) === null || _a === void 0 ? void 0 : _a.has(codegen_1.KnownMediaType.Xml));
    extractOperationParameters(codeModel).forEach(p => populateOperationParameters(p.parameter, parameters, p.operationName, hasXmlMetadata, p.targetMediaType));
    // Adding credentials parameter as a Synthetic parameter, this is to treat this as any another parameter
    // during generation and remove the need of special handling it.
    if (options.addCredentials) {
        const creds = buildCredentialsParameter();
        parameters.unshift(creds);
    }
    parameters.push(buildEndpointParameter());
    return parameters;
}
exports.transformParameters = transformParameters;
const extractOperationParameters = (codeModel) => codeModel.operationGroups.reduce((acc, og) => {
    const clientName = languageHelpers_1.getLanguageMetadata(codeModel.language).name;
    return [
        ...acc,
        ...og.operations.reduce((operations, operation) => {
            const operationName = nameUtils_1.getOperationFullName(og, operation, clientName);
            // Look for request in old 'request' property if new 'requests' doesn't exist
            const requests = operation.requests;
            if (requests === undefined) {
                throw new Error(`No request object was found for operation: ${operationName}`);
            }
            const operationParams = (operation.parameters || []).map(p => ({ parameter: p, operationName }));
            // Operations may have multiple requests, each with their own set of parameters.
            // This is known to be the case when an operation can consume multiple media types.
            // We need to ensure that the parameters from each request (method overload) is accounted for.
            const requestParams = [];
            requests.forEach(request => {
                var _a;
                (_a = request.parameters) === null || _a === void 0 ? void 0 : _a.forEach(parameter => {
                    var _a;
                    requestParams.push({
                        operationName,
                        parameter,
                        targetMediaType: (_a = request.protocol.http) === null || _a === void 0 ? void 0 : _a.knownMediaType
                    });
                });
            });
            return [...operations, ...requestParams, ...operationParams];
        }, [])
    ];
}, []);
function getDefaultValue(parameter) {
    if (!!parameter.clientDefaultValue) {
        return valueHelpers_1.getStringForValue(parameter.clientDefaultValue, parameter.schema.type);
    }
    if (parameter.schema.type === codemodel_1.SchemaType.Constant) {
        const constantSchema = parameter.schema;
        return (constantSchema.defaultValue ||
            valueHelpers_1.getStringForValue(constantSchema.value.value, constantSchema.valueType.type));
    }
    return undefined;
}
function populateOperationParameters(parameter, operationParameters, operationName, hasXmlMetadata, targetMediaType) {
    const parameterName = getParameterName(parameter);
    const parameterMetadata = languageHelpers_1.getLanguageMetadata(parameter.language);
    const schemaMetadata = languageHelpers_1.getLanguageMetadata(parameter.schema.language);
    if (!parameterName) {
        throw new Error(`Couldn't get parameter name for operation: ${operationName}`);
    }
    const serializedName = parameterMetadata.serializedName ||
        schemaMetadata.serializedName ||
        parameterName;
    let description = parameterMetadata.description || schemaMetadata.description;
    // Ignore parameters with SchemaType.Group, since these are "virtual".
    // These are handled separately in GroupTransforms and through
    // parameter.groupedBy here in parameterTransforms
    if (parameter.schema.type === codemodel_1.SchemaType.Group) {
        return;
    }
    const name = nameUtils_1.normalizeName(parameterName, nameUtils_1.NameType.Parameter, true /** shouldGuard */);
    const sameNameParams = operationParameters.filter(p => p.name === name);
    description += schemaHelpers_1.getSchemaTypeDocumentation(parameter.schema);
    const isRequired = getParameterRequired(parameter);
    const isNullable = !!parameter.nullable;
    const collectionFormat = getCollectionFormat(parameter);
    const typeDetails = schemaHelpers_1.getTypeForSchema(parameter.schema);
    const paramDetails = {
        nameRef: name,
        description: isRequired && parameter.implementation === codemodel_1.ImplementationLocation.Method
            ? undefined
            : description,
        name,
        serializedName,
        operationsIn: {
            [operationName]: {
                description
            }
        },
        location: getParameterLocation(parameter),
        required: isRequired,
        nullable: isNullable,
        schemaType: parameter.schema.type,
        parameterPath: getParameterPath(parameter),
        mapper: getMapperOrRef(parameter.originalParameter
            ? parameter.originalParameter.schema
            : parameter.schema, serializedName, parameter.required, hasXmlMetadata),
        isGlobal: getIsGlobal(parameter),
        parameter,
        collectionFormat,
        implementationLocation: parameter.implementation,
        typeDetails,
        defaultValue: getDefaultValue(parameter),
        skipEncoding: getSkipEncoding(parameter),
        targetMediaType,
        isFlattened: !!parameter.flattened
    };
    if (!sameNameParams.length) {
        operationParameters.push(paramDetails);
        return;
    }
    //Disambiguate parameter
    disambiguateParameter(paramDetails, operationParameters, sameNameParams, operationName, description);
}
exports.populateOperationParameters = populateOperationParameters;
function getSkipEncoding(parameter) {
    return parameter.extensions && parameter.extensions["x-ms-skip-url-encoding"];
}
function getParameterRequired(parameter) {
    const requiredExtension = (parameter.extensions || {})["x-required"];
    if (!lodash_1.isNil(requiredExtension)) {
        return requiredExtension;
    }
    return parameter.required;
}
function getIsGlobal(parameter) {
    return parameter.extensions
        ? !lodash_1.isNil(parameter.extensions["x-ms-priority"])
        : false;
}
function getParameterPath(parameter) {
    const metadata = languageHelpers_1.getLanguageMetadata(parameter.language);
    // ParameterPath has to include the name we used for the parameter, not the serializedName
    const name = nameUtils_1.normalizeName(metadata.name, nameUtils_1.NameType.Parameter, true /** shouldGuard */);
    if (parameter.groupedBy) {
        const groupedByName = languageHelpers_1.getLanguageMetadata(parameter.groupedBy.language)
            .name;
        return [
            ...(!parameter.required && !parameter.groupedBy.required
                ? ["options"]
                : []),
            nameUtils_1.normalizeName(groupedByName, nameUtils_1.NameType.Parameter, true /** shouldGuard */),
            name
        ];
    }
    return isClientImplementation(parameter) || parameter.required
        ? name
        : ["options", name];
}
const isClientImplementation = (parameter) => parameter.implementation === codemodel_1.ImplementationLocation.Client;
function getParameterLocation(parameter) {
    var _a, _b;
    const originalLocaltion = ((_a = parameter.protocol.http) === null || _a === void 0 ? void 0 : _a.in) || ((_b = parameter.originalParameter.protocol.http) === null || _b === void 0 ? void 0 : _b.in);
    const locationExtension = parameter.extensions && parameter.extensions["x-in"];
    if (!originalLocaltion && !locationExtension) {
        throw new Error("Expected parameter to contain HTTP Protocol information");
    }
    return locationExtension || originalLocaltion;
}
/**
 * Serialization styles used by ModelerFour but not present in SerializationStyle
 */
var AdditionalStyles;
(function (AdditionalStyles) {
    AdditionalStyles["TabDelimited"] = "tabDelimited";
})(AdditionalStyles || (AdditionalStyles = {}));
const AllSerializationStyles = { ...codemodel_1.SerializationStyle, ...AdditionalStyles };
function getCollectionFormat(parameter) {
    var _a;
    const httpInfo = parameter.protocol.http ||
        parameter.originalParameter.protocol.http;
    if (!httpInfo) {
        throw new Error("Expected parameter to contain HTTP Protocol information");
    }
    const style = httpInfo.style;
    if (httpInfo.in !== codemodel_1.ParameterLocation.Query || !style) {
        return undefined;
    }
    const getStyle = (value) => Object.keys(core_http_1.QueryCollectionFormat).find(key => core_http_1.QueryCollectionFormat[key] === value);
    let queryCollectionFormat;
    switch (style) {
        case AllSerializationStyles.SpaceDelimited:
            queryCollectionFormat = core_http_1.QueryCollectionFormat.Ssv;
            break;
        case AllSerializationStyles.Form:
            queryCollectionFormat = ((_a = httpInfo) === null || _a === void 0 ? void 0 : _a.explode) ? core_http_1.QueryCollectionFormat.Multi
                : core_http_1.QueryCollectionFormat.Csv;
            break;
        case AllSerializationStyles.TabDelimited:
            queryCollectionFormat = core_http_1.QueryCollectionFormat.Tsv;
            break;
        case AllSerializationStyles.PipeDelimited:
            queryCollectionFormat = core_http_1.QueryCollectionFormat.Pipes;
            break;
        case AllSerializationStyles.Simple:
            return undefined;
        default:
            throw new Error(`Handling query parameter format: ${style} hasn't bee implemented yet`);
    }
    return getStyle(queryCollectionFormat);
}
function getParameterName(parameter) {
    const nameFromExtension = parameter.extensions && parameter.extensions["x-ms-requestBody-name"];
    const { name: originalName } = languageHelpers_1.getLanguageMetadata(parameter.language);
    const name = nameFromExtension || originalName;
    if (!name) {
        throw new Error(`ParameterTransform: Expected parameter to have a name ${JSON.stringify(parameter.language)}`);
    }
    return name;
}
/**
 * Extracts the properties from ParameterDetails to use for equality comparison
 */
function getComparableParameter({ name, serializedName, location, required, parameterPath, mapper, collectionFormat, schemaType, implementationLocation, typeDetails, skipEncoding, isSynthetic, targetMediaType, parameter }) {
    return {
        name,
        serializedName,
        location,
        required,
        parameterPath,
        mapper,
        collectionFormat,
        schemaType,
        implementationLocation,
        typeDetails,
        skipEncoding,
        isSynthetic,
        targetMediaType: targetMediaType || codegen_1.KnownMediaType.Json,
        isFlattened: parameter.flattened
    };
}
/**
 * This function takes care of disambiguating parameters with different schemas but
 * using the same name. If it is the first time a parameter is seen, we store it in the
 * operationParameters array.
 *
 * If there is already a parameter with the same name we check if they are the same, if so
 * we just add the current operationName to the operationsIn array.
 *
 * Otherwise we add a suffix to the parameter name and store it as a different parameter.
 */
function disambiguateParameter(parameter, operationParameters, sameNameParams, operationName, description) {
    const param = getComparableParameter(parameter);
    const existingParam = sameNameParams.find(p => lodash_1.isEqual(getComparableParameter(p), param));
    if (existingParam) {
        if (existingParam.operationsIn) {
            existingParam.operationsIn[operationName] = { description };
        }
        else {
            existingParam.operationsIn = { [operationName]: { description } };
        }
        return;
    }
    else {
        // Since there is already a parameter with the same name, we need to ad a suffix
        const nameRef = `${parameter.name}${sameNameParams.length}`;
        let description = parameter.description;
        if (parameter.schemaType === codemodel_1.SchemaType.Time) {
            description += `\nThis value should be an ISO-8601 formatted string representing time. E.g. "HH:MM:SS" or "HH:MM:SS.mm".`;
        }
        // Start tracking as a new parameter with a different name
        operationParameters.push({
            ...parameter,
            nameRef,
            description
        });
    }
}
exports.disambiguateParameter = disambiguateParameter;
function getMapperOrRef(schema, serializedName, required, hasXmlMetadata = false) {
    if (mapperTransforms_1.isSchemaType([codemodel_1.SchemaType.Object], schema)) {
        const className = mapperTransforms_1.getMapperClassName(schema);
        return className;
    }
    return mapperTransforms_1.transformMapper({
        schema,
        options: { serializedName, required, hasXmlMetadata }
    });
}
//# sourceMappingURL=parameterTransforms.js.map