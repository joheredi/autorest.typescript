"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const ts_morph_1 = require("ts-morph");
const lodash_1 = require("lodash");
const modelDetails_1 = require("../models/modelDetails");
const nameUtils_1 = require("../utils/nameUtils");
const parameterUtils_1 = require("./utils/parameterUtils");
const codemodel_1 = require("@azure-tools/codemodel");
const codegen_1 = require("@azure-tools/codegen");
const valueHelpers_1 = require("../utils/valueHelpers");
const languageHelpers_1 = require("../utils/languageHelpers");
const responseTypeUtils_1 = require("./utils/responseTypeUtils");
const getParameterDescription_1 = require("../utils/getParameterDescription");
function generateModels(clientDetails, project) {
    const modelsIndexFile = project.createSourceFile(`${clientDetails.srcPath}/models/index.ts`, undefined, { overwrite: true });
    modelsIndexFile.addImportDeclaration({
        namespaceImport: "coreHttp",
        moduleSpecifier: "@azure/core-http"
    });
    // Import LRO Symbol if any of the operations is an LRO one
    if (clientDetails.operationGroups.some(og => og.operations.some(o => o.isLRO))) {
        modelsIndexFile.addImportDeclaration({
            namedImports: ["LROSYM", "LROResponseInfo"],
            moduleSpecifier: "../lro/models"
        });
    }
    writeUniontypes(clientDetails, modelsIndexFile);
    writeObjects(clientDetails, modelsIndexFile);
    writeChoices(clientDetails, modelsIndexFile);
    writeOperationModels(clientDetails, modelsIndexFile);
    writeClientModels(clientDetails, modelsIndexFile);
}
exports.generateModels = generateModels;
const writeClientModels = (clientDetails, modelsIndexFile) => {
    let clientOptionalParams = clientDetails.parameters.filter(p => (!p.required || p.defaultValue) &&
        p.implementationLocation === codemodel_1.ImplementationLocation.Client);
    writeOptionalParameters(clientDetails.name, "", clientOptionalParams, modelsIndexFile, { baseClass: "coreHttp.ServiceClientOptions" });
};
const writeOperationModels = (clientDetails, modelsIndexFile) => {
    const modelsNames = responseTypeUtils_1.getAllModelsNames(clientDetails);
    return clientDetails.operationGroups.forEach(operationGroup => {
        operationGroup.operations.forEach(operation => {
            writeOptionsParameter(clientDetails, operationGroup, operation, modelsIndexFile);
            writeResponseTypes(operation, modelsIndexFile, modelsNames);
        });
    });
};
/**
 * Writes the options parameter model containing all the optional parameters
 */
function writeOptionsParameter(clientDetails, operationGroup, operation, sourceFile) {
    const operationParameters = parameterUtils_1.filterOperationParameters(clientDetails.parameters, operation, { includeOptional: true, includeGroupedParameters: true });
    const operationGroupName = nameUtils_1.normalizeName(operationGroup.name, nameUtils_1.NameType.Interface);
    const optionalParams = operationParameters.filter(({ required, isFlattened }) => !required && !isFlattened);
    const operationName = nameUtils_1.normalizeName(operation.name, nameUtils_1.NameType.Interface);
    const operationRequestMediaTypes = new Set();
    operation.requests.forEach(r => r.mediaType && operationRequestMediaTypes.add(r.mediaType));
    writeOptionalParameters(operationGroupName, operationName, optionalParams, sourceFile, {
        mediaTypes: operationRequestMediaTypes,
        operationFullName: operation.fullName
    });
}
/**
 * This function takes an operation and gets its return type based on
 * the response body and headers
 */
function writeResponseTypes({ responses, name, typeDetails: operationType, isLRO }, modelsIndexFile, allModelsNames) {
    const responseName = responseTypeUtils_1.getResponseTypeName(operationType.typeName, allModelsNames);
    const addedResponses = [];
    responses
        // Filter responses that are not marked as errors and that have either body or headers
        .filter(({ isError, mappers }) => !isError && (mappers.bodyMapper || mappers.headersMapper))
        .forEach(operation => {
        const { statusCodes, ...coreResponse } = operation;
        if (addedResponses.length === 0) {
            // Define possible values for response
            modelsIndexFile.addTypeAlias({
                name: responseName,
                docs: [`Contains response data for the ${name} operation.`],
                isExported: true,
                type: buildResponseType(operation, isLRO),
                leadingTrivia: writer => writer.blankLine(),
                kind: ts_morph_1.StructureKind.TypeAlias
            });
            addedResponses.push({ name: responseName, response: coreResponse });
        }
        const existingResponse = addedResponses.find(r => r.name === name);
        if (existingResponse &&
            lodash_1.isEqual(existingResponse.response, coreResponse)) {
            throw new Error("Handling multiple response types is not yet implemented");
        }
    });
}
/**
 * Extracts the necessary data from the response body to generate a response type
 */
function getBodyProperties({ types: { bodyType }, mediaType }) {
    var _a, _b, _c;
    if (!bodyType && mediaType !== codegen_1.KnownMediaType.Binary) {
        return;
    }
    const hasBodyProperty = ((_a = bodyType) === null || _a === void 0 ? void 0 : _a.kind) !== modelDetails_1.PropertyKind.Composite &&
        ((_b = bodyType) === null || _b === void 0 ? void 0 : _b.kind) !== modelDetails_1.PropertyKind.Dictionary;
    // Used when the bodyType is not a primitive, or for binary media types with no defined bodyType.
    const mainProperties = [];
    // These are the additional default properties to add under the _response property in the response type
    const internalResponseProperties = [];
    if (bodyType) {
        if (hasBodyProperty) {
            mainProperties.push({
                name: "body",
                type: bodyType.typeName,
                docs: ["The parsed response body."]
            });
        }
        internalResponseProperties.push({
            name: "bodyAsText",
            type: "string",
            leadingTrivia: writer => writer.blankLine(),
            docs: ["The response body as text (string format)"]
        }, {
            name: "parsedBody",
            docs: ["The response body as parsed JSON or XML"],
            type: bodyType.typeName,
            leadingTrivia: writer => writer.blankLine()
        });
    }
    else if (mediaType === codegen_1.KnownMediaType.Binary) {
        mainProperties.push({
            name: "blobBody",
            type: "Promise<Blob>",
            docs: [
                "BROWSER ONLY\n\nThe response body as a browser Blob.\nAlways `undefined` in node.js."
            ],
            hasQuestionToken: true
        }, {
            name: "readableStreamBody",
            type: "NodeJS.ReadableStream",
            docs: [
                "NODEJS ONLY\n\nThe response body as a node.js Readable stream.\nAlways `undefined` in the browser."
            ],
            hasQuestionToken: true
        });
    }
    return {
        mainProperties,
        // intersectionType is used when the body is Composite, this means that there is a model
        // representing this object and the response type will need to be an intersection.
        ...(!hasBodyProperty && { intersectionType: (_c = bodyType) === null || _c === void 0 ? void 0 : _c.typeName }),
        internalResponseProperties
    };
}
/**
 * Extracts the necessary data from the response headers to generate a response type
 */
function getHeadersProperties({ types: { headersType } }) {
    if (!headersType) {
        return;
    }
    const { typeName } = headersType;
    return {
        // These are the additional default properties to add under the _response property in the response type
        internalResponseProperties: [
            {
                name: "parsedHeaders",
                docs: ["The parsed HTTP response headers."],
                type: typeName
            }
        ],
        // Headers are always represented as Composite, so we will never need to add a headers property to the response type.
        mainProperties: [],
        // Headers are always represented as Composite, so its type will always be added as an intersection to the response type.
        intersectionType: typeName
    };
}
/**
 * This function builds the type to represent an Operation response, taking the response headers and body
 * to create a type that contains all the properties that a response may include
 */
function buildResponseType(operationResponse, isLro = false) {
    var _a, _b, _c, _d, _e;
    // First we get the response Headers and Body details
    const headersProperties = getHeadersProperties(operationResponse);
    const bodyProperties = getBodyProperties(operationResponse);
    const lroProperties = isLro
        ? [
            {
                name: "[LROSYM]",
                docs: ["The parsed HTTP response headers."],
                type: "LROResponseInfo"
            }
        ]
        : [];
    const innerResponseProperties = [
        ...(((_a = bodyProperties) === null || _a === void 0 ? void 0 : _a.internalResponseProperties) || []),
        ...(((_b = headersProperties) === null || _b === void 0 ? void 0 : _b.internalResponseProperties) || []),
        ...lroProperties
    ];
    const innerTypeWriter = ts_morph_1.Writers.objectType({
        properties: [
            ...(((_c = bodyProperties) === null || _c === void 0 ? void 0 : _c.mainProperties) || []),
            {
                name: "_response",
                docs: ["The underlying HTTP response."],
                type: innerResponseProperties.length
                    ? ts_morph_1.Writers.intersectionType("coreHttp.HttpResponse", ts_morph_1.Writers.objectType({
                        properties: innerResponseProperties
                    }))
                    : "coreHttp.HttpResponse",
                leadingTrivia: writer => writer.blankLine()
            }
        ]
    });
    let intersectionTypes = [innerTypeWriter];
    ((_d = bodyProperties) === null || _d === void 0 ? void 0 : _d.intersectionType) &&
        intersectionTypes.unshift(bodyProperties.intersectionType);
    ((_e = headersProperties) === null || _e === void 0 ? void 0 : _e.intersectionType) &&
        intersectionTypes.unshift(headersProperties.intersectionType);
    /**
     * Here we define our response type:
     *    When we have either a Body or Header intersection type, the Response type will be
     *    an intersection with them i.e.
     *    type OperationResponse = BodyType & HeadersType & {
     *       _response: {
     *         bodyAsText: string,
     *         parsedBody: BodyType,
     *         parsedHeaders: HeadersType
     *      }
     *    }
     *
     *    When we don't have any intersection types, the response type will just be the innerType i.e
     *    type OperationResponse = {
     *       body: number
     *       _response: {
     *         bodyAsText: string,
     *         parsedBody: number
     *      }
     *    }
     */
    return intersectionTypes.length > 1
        ? // Using apply instead of calling the method directly to be able to conditionally pass
            // parameters, this way we don't have to have a nested if/else tree to decide which parameters
            // to pass, we will pass any intersectionTypes availabe plus the innerType. When there are no intersection types
            // we just return innerType
            ts_morph_1.Writers.intersectionType.apply(ts_morph_1.Writers, intersectionTypes)
        : innerTypeWriter;
}
const writeChoices = (clientDetails, modelsIndexFile) => {
    clientDetails.unions.forEach(choice => {
        if (choice.schemaType === codemodel_1.SchemaType.Choice) {
            writeExtensibleChoice(choice, modelsIndexFile);
        }
        else {
            writeSealedChoice(choice, modelsIndexFile);
        }
    });
};
const writeExtensibleChoice = (choice, modelsIndexFile) => {
    // Only generate helper enums for string and number.
    // Other types will only have the type alias and information about the known values listed in the docs
    if (choice.itemType === codemodel_1.SchemaType.Number ||
        choice.itemType == codemodel_1.SchemaType.String) {
        const enumName = getExtensibleEnumName(choice);
        modelsIndexFile.addEnum({
            isConst: true,
            isExported: true,
            name: enumName,
            docs: [
                `Known values of {@link ${choice.name}} that the service accepts.`
            ],
            members: choice.properties.map(p => ({
                name: p.name,
                value: p.value,
                docs: p.description ? [p.description] : undefined
            }))
        });
    }
    modelsIndexFile.addTypeAlias({
        name: choice.name,
        docs: [getExtensibleChoiceDescription(choice)],
        isExported: true,
        type: choice.itemType || codemodel_1.SchemaType.String,
        trailingTrivia: writer => writer.newLine()
    });
};
function getExtensibleEnumName(choice) {
    return `Known${choice.name}`;
}
// Builds the description based on the choice name. For numbers and strings we need to
// add informationa bout the helper enum we generated.
function getExtensibleChoiceDescription(choice) {
    const hasEnum = [codemodel_1.SchemaType.String, codemodel_1.SchemaType.Number].includes(choice.itemType || codemodel_1.SchemaType.Unknown);
    const valueDescriptions = choice.properties
        .map(p => `**${p.value}**${p.description ? `: ${p.description}` : ""}`)
        .join(` \\\n`);
    const enumName = getExtensibleEnumName(choice);
    const enumLink = `{@link ${enumName}} can be used interchangeably with ${choice.name},\n this enum contains the known values that the service supports.`;
    return [
        `${choice.description} \\`,
        ...(hasEnum ? [enumLink] : []),
        `### Know values supported by the service`,
        valueDescriptions
    ].join(" \n");
}
const writeSealedChoice = (choice, modelsIndexFile) => {
    const values = choice.properties
        .map(p => (choice.itemType === codemodel_1.SchemaType.String ? `"${p.value}"` : p.name))
        .join(" | ");
    modelsIndexFile.addTypeAlias({
        name: choice.name,
        docs: [choice.description],
        isExported: true,
        type: values,
        trailingTrivia: writer => writer.newLine()
    });
};
const writeObjects = (clientDetails, modelsIndexFile) => clientDetails.objects.forEach(writeObjectSignature(modelsIndexFile));
const writeObjectSignature = (modelsIndexFile) => (model) => {
    const properties = getPropertiesSignatures(model);
    const parents = model.parents.map(p => p.name).join(" & ");
    if (parents) {
        modelsIndexFile.addTypeAlias({
            name: model.name,
            docs: model.description ? [model.description] : [],
            isExported: true,
            type: ts_morph_1.Writers.intersectionType(parents, ts_morph_1.Writers.objectType({ properties })),
            leadingTrivia: writer => writer.blankLine()
        });
    }
    else {
        modelsIndexFile.addInterface({
            name: model.name,
            docs: model.description ? [model.description] : [],
            isExported: true,
            properties,
            leadingTrivia: writer => writer.blankLine()
        });
    }
};
/**
 * This function writes all UnionTypes, these types represent the options a request can use for a Polymorphic parameter
 */
function writeUniontypes({ objects }, modelsFile) {
    objects
        .filter(obj => obj.kind === modelDetails_1.ObjectKind.Polymorphic && obj.children.length > 0)
        .forEach(obj => {
        const polymorphicObject = obj;
        const childrenNames = [
            [polymorphicObject.name],
            ...polymorphicObject.children.map(c => {
                return c.schema.children && c.schema.children.immediate.length
                    ? `${c.name}Union`
                    : c.name;
            })
        ];
        modelsFile.addTypeAlias({
            name: `${obj.name}Union`,
            isExported: true,
            type: childrenNames.join(" | "),
            trailingTrivia: writer => writer.newLine()
        });
    });
}
/**
 * Checks if a polymorphic parent needs to be included in the Union type to represent its polymorphism
 * A parent needs to be in the union only if its name is in the list of allowed discriminator values
 * otherwise the parent should be excluded.
 * @param parent Plymorphic parent to check
 */
function isPolymorphicParentInUnion(parent) {
    return Object.keys(parent.discriminatorValues).some(property => parent.discriminatorValues[property].some(discriminatorValue => discriminatorValue === parent.name));
}
function getOptionalGroups(optionalParams) {
    let optionalGroups = [];
    optionalParams
        .filter(({ parameter: { groupedBy, flattened } }) => groupedBy && !groupedBy.required && !flattened)
        .forEach(p => {
        const { parameter } = p;
        const groupName = languageHelpers_1.getLanguageMetadata(parameter.groupedBy.language).name;
        const isAlreadyTracked = optionalGroups.some(p => {
            const { name } = languageHelpers_1.getLanguageMetadata(p.language);
            return name === groupName;
        });
        if (parameter.groupedBy && !isAlreadyTracked) {
            optionalGroups.push(parameter.groupedBy);
        }
        lodash_1.pull(optionalParams, p);
    });
    return optionalGroups.map(group => {
        const { name, description } = languageHelpers_1.getLanguageMetadata(group.language);
        return {
            name: nameUtils_1.normalizeName(name, nameUtils_1.NameType.Parameter, true),
            hasQuestionToken: !group.required,
            type: nameUtils_1.normalizeName(name, nameUtils_1.NameType.Interface),
            docs: [description],
            kind: ts_morph_1.StructureKind.PropertySignature
        };
    });
}
function writeOptionalParameters(operationGroupName, operationName, optionalParams, modelsIndexFile, { baseClass, mediaTypes, operationFullName }) {
    var _a, _b;
    if (!optionalParams || !optionalParams.length) {
        return;
    }
    const optionalGroupDeclarations = getOptionalGroups(optionalParams);
    const mediaTypesCount = (_b = (_a = mediaTypes) === null || _a === void 0 ? void 0 : _a.size, (_b !== null && _b !== void 0 ? _b : 0));
    if (mediaTypesCount > 1) {
        // Create an optional params for each media type.
        const interfaceNames = [];
        for (const mediaType of mediaTypes.values()) {
            const name = `${operationGroupName}${operationName}$${mediaType}OptionalParams`;
            interfaceNames.push(name);
            modelsIndexFile.addInterface({
                name: name,
                docs: ["Optional parameters."],
                isExported: true,
                extends: [baseClass || "coreHttp.OperationOptions"],
                properties: [
                    ...optionalGroupDeclarations,
                    ...optionalParams
                        .filter(p => !p.targetMediaType || p.targetMediaType === mediaType)
                        .map(p => {
                        const description = getParameterDescription_1.getParameterDescription(p, operationFullName);
                        return {
                            name: p.name,
                            hasQuestionToken: true,
                            type: p.typeDetails.typeName,
                            docs: description ? [description] : undefined,
                            kind: ts_morph_1.StructureKind.PropertySignature
                        };
                    })
                ]
            });
        }
    }
    else {
        modelsIndexFile.addInterface({
            name: `${operationGroupName}${operationName}OptionalParams`,
            docs: ["Optional parameters."],
            isExported: true,
            extends: [baseClass || "coreHttp.OperationOptions"],
            properties: [
                ...optionalGroupDeclarations,
                ...optionalParams.map(p => {
                    const description = getParameterDescription_1.getParameterDescription(p, operationFullName);
                    return {
                        name: p.name,
                        hasQuestionToken: true,
                        type: p.typeDetails.typeName,
                        docs: description ? [description] : undefined,
                        kind: ts_morph_1.StructureKind.PropertySignature
                    };
                })
            ]
        });
    }
}
/**
 * Extracts all properties from ObjectDetails and returns a list of PropertySignatureStructure
 * @param objectDetails Object description
 */
function getProperties(objectDetails) {
    const { properties } = objectDetails;
    const getTypename = (property) => {
        if (property.isConstant) {
            return `"${valueHelpers_1.getStringForValue(property.defaultValue, property.type, false //quoted
            )}"`;
        }
        const typeName = property.name === "siblings"
            ? `${objectDetails.unionName}[]`
            : property.type;
        return property.nullable ? `${typeName} | null` : typeName;
    };
    return properties
        .filter(property => !property.isDiscriminator)
        .map(property => ({
        name: property.name,
        hasQuestionToken: !property.required,
        isReadonly: property.readOnly,
        type: getTypename(property),
        docs: getPropertyDescription(property),
        kind: ts_morph_1.StructureKind.PropertySignature
    }));
}
function getPropertyDescription({ description, readOnly }) {
    if (readOnly) {
        const readonlyNote = "NOTE: This property will not be serialized. It can only be populated by the server.";
        return description ? [`${description}\n${readonlyNote}`] : [readonlyNote];
    }
    else {
        return description ? [description] : undefined;
    }
}
/**
 * This function enahnces a list of PropertySignatures with the Polymorphic discriminator property if needed
 * @param model ObjectDetails
 * @param properties Properties to enhance
 */
function withDiscriminator(model, properties) {
    const discriminatorValues = model
        .discriminatorValues;
    if (!discriminatorValues) {
        return properties;
    }
    const discProps = lodash_1.keys(discriminatorValues).map(key => {
        const name = nameUtils_1.normalizeName(key, nameUtils_1.NameType.Property);
        return {
            docs: [
                `Polymorphic discriminator, which specifies the different types this object can be`
            ],
            name,
            type: discriminatorValues[key].map(disc => `"${disc}"`).join(" | "),
            kind: ts_morph_1.StructureKind.PropertySignature
        };
    });
    const propertiesWithoutDiscriminator = properties.filter(p => !discProps.some(dp => dp.name === p.name));
    return [...discProps, ...propertiesWithoutDiscriminator];
}
/**
 * This function enahnces a list of PropertySignatures with the additional Properties property if needed
 * @param model ObjectDetails
 * @param properties Properties to enhance
 */
function withAdditionalProperties(model, properties) {
    if (!model.hasAdditionalProperties) {
        return properties;
    }
    return [
        {
            docs: [
                `Describes unknown properties. The value of an unknown property can be of "any" type.`
            ],
            name: "[property: string]",
            type: "any",
            kind: ts_morph_1.StructureKind.PropertySignature
        },
        ...properties
    ];
}
/**
 * Gets an enhanced list of Properties to construct an Object signature
 * @param objectDetails Object description
 */
const getPropertiesSignatures = (objectDetails) => withDiscriminator(objectDetails, withAdditionalProperties(objectDetails, getProperties(objectDetails)));
//# sourceMappingURL=modelsGenerator.js.map