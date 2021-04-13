"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codemodel_1 = require("@azure-tools/codemodel");
const ts_morph_1 = require("ts-morph");
const prettier = require("prettier");
const schemaHelpers_1 = require("../utils/schemaHelpers");
const autorestSession_1 = require("../autorestSession");
const urlTransforms_1 = require("../transforms/urlTransforms");
const nameUtils_1 = require("../utils/nameUtils");
const prettierTypeScriptOptions = {
    parser: "typescript",
    arrowParens: "always",
    bracketSpacing: true,
    endOfLine: "lf",
    printWidth: 80,
    semi: true,
    singleQuote: false,
    tabWidth: 2
};
const prettierJSONOptions = {
    parser: "json",
    tabWidth: 2,
    semi: false,
    singleQuote: false
};
function escapeDecriptions(model) {
    var _a, _b, _c, _d;
    (_a = model.schemas.objects) === null || _a === void 0 ? void 0 : _a.forEach(escapeDescription);
    (_b = model.schemas.choices) === null || _b === void 0 ? void 0 : _b.forEach(escapeDescription);
    (_c = model.schemas.sealedChoices) === null || _c === void 0 ? void 0 : _c.forEach(escapeDescription);
    (_d = model.schemas.dictionaries) === null || _d === void 0 ? void 0 : _d.forEach(escapeDescription);
    model.operationGroups.forEach(og => {
        og.operations.forEach(o => {
            var _a;
            escapeDescription(o);
            (_a = o.signatureParameters) === null || _a === void 0 ? void 0 : _a.forEach(escapeDescription);
        });
    });
}
function escapeDescription(schema) {
    schema.language.default.description = schema.language.default.description.replace(/@/g, "\\@");
    schema.language.default.description = schema.language.default.description.replace(/{/g, "\\{");
    schema.language.default.description = schema.language.default.description.replace(/}/g, "\\}");
}
function setOperationName(model) {
    // No need to append operation group name if there is only a single OperationGroup
    if (model.operationGroups.length > 1) {
        model.operationGroups.forEach(og => og.operations.forEach(o => {
            o.language.default.name = `${og.language.default.name}${o.language.default.name}`;
        }));
    }
}
async function generateLowlevelClient() {
    const host = autorestSession_1.getHost();
    const session = autorestSession_1.getSession();
    const { model } = session;
    const project = new ts_morph_1.Project({
        useInMemoryFileSystem: true,
        manipulationSettings: {
            indentationText: ts_morph_1.IndentationText.TwoSpaces
        }
    });
    escapeDecriptions(model);
    setOperationName(model);
    await generateTypes(model, project);
    // Save the source files to the virtual filesystem
    project.saveSync();
    const fs = project.getFileSystem();
    // Loop over the files
    for (const file of project.getSourceFiles()) {
        const filePath = file.getFilePath();
        const isJson = /\.json$/gi.test(filePath);
        const isSourceCode = /\.(ts|js)$/gi.test(filePath);
        let fileContents = fs.readFileSync(filePath);
        const licenseHeader = `// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT license.\n`;
        fileContents = `${licenseHeader.trimLeft()}\n${fileContents}`;
        // Format the contents if necessary
        if (isJson || isSourceCode) {
            fileContents = prettier.format(fileContents, isJson ? prettierJSONOptions : prettierTypeScriptOptions);
        }
        // Write the file to the AutoRest host
        host.WriteFile(filePath.substr(1), // Get rid of the leading slash '/'
        fileContents);
    }
}
exports.generateLowlevelClient = generateLowlevelClient;
async function generateTypes(model, project) {
    generatePathFirstClient(model, project);
    generateResponsesInterface(model, project);
    generateModelInterfaces(model, project);
    generateParameterInterfaces(model, project);
}
function generateParameterInterfaces(model, project) {
    const clientFile = project.createSourceFile(`src/parameters.ts`, undefined, {
        overwrite: true
    });
    let importedModels = new Set();
    model.operationGroups.forEach(og => og.operations.forEach(o => {
        const operationParameters = (o.signatureParameters &&
            o.signatureParameters.length &&
            o.signatureParameters) ||
            [];
        const requestParameters = (o.requests && o.requests[0].signatureParameters) || [];
        const signatureParameters = [
            ...operationParameters,
            ...requestParameters
        ];
        const name = `${o.language.default.name}Parameters`;
        let refs = ["RequestParameters"];
        if (signatureParameters.length) {
            const bodyParameter = signatureParameters.filter(p => { var _a; return ((_a = p.protocol.http) === null || _a === void 0 ? void 0 : _a.in) === "body"; });
            const queryParameters = signatureParameters.filter(p => { var _a; return ((_a = p.protocol.http) === null || _a === void 0 ? void 0 : _a.in) === "query"; });
            const referencedModels = new Set();
            if (queryParameters.length) {
                const name = `${o.language.default.name}QueryParamProperties`;
                const propDef = queryParameters.map(p => {
                    return getPropertySignature(p, referencedModels);
                });
                clientFile.addInterface({
                    isExported: true,
                    name: name,
                    properties: propDef
                });
                const queryParamName = nameUtils_1.normalizeName(`${o.language.default.name}QueryParam`, nameUtils_1.NameType.Interface);
                clientFile.addInterface({
                    isExported: true,
                    name: queryParamName,
                    properties: [
                        {
                            name: "queryParameters",
                            type: name,
                            hasQuestionToken: !propDef.some(p => !p.hasQuestionToken)
                        }
                    ]
                });
                refs.push(queryParamName);
            }
            if (bodyParameter.length) {
                const name = `${o.language.default.name}BodyParam`;
                const body = getPropertySignature(bodyParameter[0], referencedModels);
                clientFile.addInterface({
                    isExported: true,
                    name: name,
                    properties: [
                        {
                            name: "body",
                            type: body.type,
                            hasQuestionToken: body.hasQuestionToken
                        }
                    ]
                });
                refs.push(name);
            }
            referencedModels.forEach(m => importedModels.add(m));
            clientFile.addTypeAlias({
                name,
                isExported: true,
                type: refs.join(" & ")
            });
        }
        else {
            clientFile.addTypeAlias({
                name,
                isExported: true,
                type: refs.join(" & ")
            });
        }
    }));
    clientFile.addImportDeclarations([
        {
            namedImports: ["RequestParameters"],
            moduleSpecifier: "@azure-rest/core-client"
        }
    ]);
    clientFile.addImportDeclarations([
        {
            namedImports: [...importedModels],
            moduleSpecifier: "./models"
        }
    ]);
}
function generateModelInterfaces(model, project) {
    const clientFile = project.createSourceFile(`src/models.ts`, undefined, {
        overwrite: true
    });
    generateObjectInterfaces(model, clientFile);
    generateChoices(model, clientFile);
    generateSealedChoices(model, clientFile);
    generateDictionaries(model, clientFile);
}
function generateSealedChoices(model, file) {
    (model.schemas.sealedChoices || []).forEach(choice => {
        const type = choice.choices
            .map(c => {
            let value = c.value;
            if (typeof value === "string") {
                value = `"${value}"`;
            }
            return value;
        })
            .join(" | ");
        file.addTypeAlias({
            name: choice.language.default.name,
            isExported: true,
            type
        });
    });
}
function generateDictionaries(model, file) {
    const existingDictionaries = new Set();
    (model.schemas.dictionaries || []).forEach(dictionary => {
        let elementType = getTypeForSchema(dictionary.elementType);
        const type = `Record<string, ${elementType.typeName}>`;
        const typeAlias = {
            name: dictionary.language.default.name,
            isExported: true,
            type
        };
        if (!existingDictionaries.has(JSON.stringify(typeAlias))) {
            file.addTypeAlias(typeAlias);
            existingDictionaries.add(JSON.stringify(typeAlias));
        }
    });
}
function generateChoices(model, file) {
    (model.schemas.choices || []).forEach(choice => {
        file.addTypeAlias({
            name: choice.language.default.name,
            isExported: true,
            type: choice.choices.map(choice => `"${choice.value}"`).join(" | ")
        });
    });
}
function isPrimitiveSchema(schema) {
    return [
        codemodel_1.SchemaType.Binary,
        codemodel_1.SchemaType.String,
        codemodel_1.SchemaType.Number,
        codemodel_1.SchemaType.Integer,
        codemodel_1.SchemaType.Date,
        codemodel_1.SchemaType.DateTime,
        codemodel_1.SchemaType.Any,
        codemodel_1.SchemaType.Boolean,
        codemodel_1.SchemaType.ByteArray,
        codemodel_1.SchemaType.Char,
        codemodel_1.SchemaType.Credential,
        codemodel_1.SchemaType.Duration,
        codemodel_1.SchemaType.Time,
        codemodel_1.SchemaType.UnixTime,
        codemodel_1.SchemaType.Uri,
        codemodel_1.SchemaType.Uuid,
        codemodel_1.SchemaType.Unknown,
        codemodel_1.SchemaType.Constant
    ].includes(schema.type);
}
function getPropertySignature(p, importedModels = new Set()) {
    let property;
    const propertyName = `"${p.language.default.serializedName ||
        p.language.default.name}"`;
    if (isPrimitiveSchema(p.schema)) {
        const schemaType = primitiveSchemaToType(p.schema);
        const propertyType = p.nullable ? `${schemaType} | null` : schemaType;
        property = {
            name: propertyName,
            docs: [{ description: p.language.default.description }],
            hasQuestionToken: !p.required,
            type: propertyType,
            kind: ts_morph_1.StructureKind.PropertySignature
        };
    }
    else if (p.schema.type === codemodel_1.SchemaType.Array) {
        const arraySchema = p.schema;
        let elementType = "";
        if (arraySchema.elementType.type === codemodel_1.SchemaType.Object) {
            elementType = nameUtils_1.normalizeName(arraySchema.elementType.language.default.name, nameUtils_1.NameType.Interface);
            importedModels.add(elementType);
        }
        else {
            elementType = primitiveSchemaToType(arraySchema.elementType);
        }
        property = {
            name: propertyName,
            docs: [{ description: p.language.default.description }],
            hasQuestionToken: !p.required,
            type: `${elementType}[]`,
            kind: ts_morph_1.StructureKind.PropertySignature
        };
    }
    else {
        const type = nameUtils_1.normalizeName(p.schema.language.default.name, nameUtils_1.NameType.Interface);
        importedModels.add(p.schema.language.default.name);
        property = {
            name: p.language.default.name,
            docs: [{ description: p.language.default.description }],
            hasQuestionToken: !p.required,
            type,
            kind: ts_morph_1.StructureKind.PropertySignature
        };
    }
    return property;
}
// Need to fix this logic
function generateObjectInterfaces(model, file) {
    (model.schemas.objects || []).forEach(o => {
        var _a;
        const properties = (o.properties || []).map(p => {
            return getPropertySignature(p);
        });
        let baseName = nameUtils_1.normalizeName(o.language.default.name, nameUtils_1.NameType.Interface);
        if (((_a = o.parents) === null || _a === void 0 ? void 0 : _a.immediate) && o.parents.immediate.length) {
            if (o.parents.immediate.length === 1 &&
                o.parents.immediate[0].language.default.name === baseName &&
                !properties.length) {
                return;
            }
            const exportedName = baseName;
            baseName = `${baseName}Base`;
            const parentNames = o.parents.immediate.map(p => p.language.default.name);
            file.addTypeAlias({
                name: `${exportedName}`,
                isExported: true,
                type: [baseName, ...parentNames].join(" & ")
            });
        }
        file.addInterface({
            name: baseName,
            isExported: true,
            properties
        });
    });
}
function getTypeForSchema(schema) {
    let modelName = schema.language.default.name;
    let typeName = schema.language.default.name;
    if (isPrimitiveSchema(schema)) {
        typeName = primitiveSchemaToType(schema);
        modelName = undefined;
    }
    if (isArraySchema(schema)) {
        const elementType = getTypeForSchema(schema.elementType);
        typeName = `${elementType.typeName}[]`;
        modelName = elementType.modelName;
    }
    return { typeName, modelName };
}
function isArraySchema(schema) {
    return schema.type === codemodel_1.SchemaType.Array;
}
// function isDictionarySchema(schema: Schema): schema is DictionarySchema {
//   return schema.type === SchemaType.Dictionary;
// }
function primitiveSchemaToType(schema) {
    switch (schema.type) {
        case codemodel_1.SchemaType.Any:
            return "any";
        case codemodel_1.SchemaType.Integer:
        case codemodel_1.SchemaType.Number:
            return "number";
        case codemodel_1.SchemaType.Date:
        case codemodel_1.SchemaType.Time:
        case codemodel_1.SchemaType.DateTime:
            return "Date";
        case codemodel_1.SchemaType.Char:
            return "string";
        case codemodel_1.SchemaType.Binary:
        case codemodel_1.SchemaType.Duration:
        case codemodel_1.SchemaType.Credential:
        case codemodel_1.SchemaType.UnixTime:
        case codemodel_1.SchemaType.Uri:
        case codemodel_1.SchemaType.Uuid:
        case codemodel_1.SchemaType.String:
            return "string";
        case codemodel_1.SchemaType.Boolean:
            return "boolean";
        case codemodel_1.SchemaType.ByteArray:
            return "Uint8Array";
        case codemodel_1.SchemaType.Choice:
        case codemodel_1.SchemaType.SealedChoice:
            return schema.choices
                .map(choice => `"${choice.value}"`)
                .join(" | ");
        case codemodel_1.SchemaType.Constant:
            const value = schema.value.value;
            return typeof value === "string" ? `"${value}"` : value;
    }
    throw new Error(`Unknown primitive schema ${schema.type}`);
}
function generatePathFirstClient(model, project) {
    var _a, _b, _c, _d;
    const name = nameUtils_1.normalizeName(model.language.default.name, nameUtils_1.NameType.File);
    const clientFile = project.createSourceFile(`src/${name}.ts`, undefined, {
        overwrite: true
    });
    // Get all paths
    const importedParameters = new Set();
    const importedResponses = new Set();
    const pathDictionary = {};
    for (const operationGroup of model.operationGroups) {
        for (const operation of operationGroup.operations) {
            const operationName = operation.language.default.name;
            const operationDescription = operation.language.default.description;
            const pathParameters = ((_a = operation.parameters) === null || _a === void 0 ? void 0 : _a.filter(p => { var _a; return ((_a = p.protocol.http) === null || _a === void 0 ? void 0 : _a.in) === codemodel_1.ParameterLocation.Path; }).map(p => {
                return {
                    name: p.language.default.serializedName || p.language.default.name,
                    description: p.language.default.description
                };
            })) || [];
            for (const request of operation.requests || []) {
                const path = ((_b = request.protocol.http) === null || _b === void 0 ? void 0 : _b.path) || "";
                const method = (_c = request.protocol.http) === null || _c === void 0 ? void 0 : _c.method;
                if (path && method) {
                    if (!pathDictionary[path]) {
                        pathDictionary[path] = {
                            pathParameters,
                            methods: {},
                            name: operationName
                        };
                    }
                    const hasOptionalOptions = !((_d = request.signatureParameters) === null || _d === void 0 ? void 0 : _d.some(p => p.required));
                    pathDictionary[path] = {
                        name: operationName,
                        pathParameters,
                        methods: {
                            ...pathDictionary[path].methods,
                            [`${method}`]: {
                                description: operationDescription,
                                optionsName: getOperationOptionsType(operation, importedParameters),
                                hasOptionalOptions,
                                returnType: `Promise<${getOperationReturnType(operation, importedResponses)}>`
                            }
                        }
                    };
                }
            }
        }
    }
    clientFile.addInterface({
        name: "Routes",
        isExported: true,
        callSignatures: getPathFirstRoutesInterfaceDefinition(pathDictionary, clientFile)
    });
    const clientName = model.language.default.name;
    const uriParameter = getClientUriParameter();
    const { addCredentials } = autorestSession_1.getAutorestOptions();
    const commonClientParams = [
        ...(uriParameter ? [{ name: uriParameter, type: "string" }] : []),
        ...(addCredentials === false
            ? []
            : [{ name: "credentials", type: "TokenCredential | KeyCredential" }])
    ];
    const clientIterfaceName = `${clientName}Client`;
    const factoryTypeName = `${clientName}Factory`;
    clientFile.addTypeAlias({
        isExported: true,
        name: clientIterfaceName,
        type: ts_morph_1.Writers.intersectionType("Client", ts_morph_1.Writers.objectType({ properties: [{ name: "path", type: "Routes" }] }))
    });
    clientFile.addInterface({
        isExported: true,
        name: factoryTypeName,
        callSignatures: [
            {
                parameters: [
                    ...commonClientParams,
                    {
                        name: "options",
                        type: "ClientOptions",
                        hasQuestionToken: true /** TODO: Check if there are any required client params */
                    }
                ]
            }
        ]
    });
    clientFile.addFunction({
        isExported: true,
        name: clientName,
        parameters: [
            ...commonClientParams,
            { name: "options", type: "ClientOptions = {}" }
        ],
        returnType: clientIterfaceName,
        isDefaultExport: true,
        statements: getClientFactoryBody(clientIterfaceName)
    });
    if (importedParameters.size) {
        clientFile.addImportDeclaration({
            namedImports: [...importedParameters],
            moduleSpecifier: "./parameters"
        });
    }
    if (importedResponses.size) {
        clientFile.addImportDeclaration({
            namedImports: [...importedResponses],
            moduleSpecifier: "./responses"
        });
    }
    clientFile.addImportDeclarations([
        {
            namedImports: ["getClient", "ClientOptions", "Client"],
            moduleSpecifier: "@azure-rest/core-client"
        }
    ]);
    clientFile.addImportDeclarations([
        {
            namedImports: ["KeyCredential", "TokenCredential"],
            moduleSpecifier: "@azure/core-auth"
        }
    ]);
}
function getClientUriParameter() {
    const { model } = autorestSession_1.getSession();
    const { parameterName } = urlTransforms_1.transformBaseUrl(model);
    return parameterName;
}
function getClientFactoryBody(clientTypeName) {
    var _a;
    const { model } = autorestSession_1.getSession();
    const { endpoint, parameterName } = urlTransforms_1.transformBaseUrl(model);
    let baseUrl;
    if (parameterName) {
        const parsedEndpoint = (_a = endpoint) === null || _a === void 0 ? void 0 : _a.replace(`{${parameterName}}`, `\${${parameterName}}`);
        baseUrl = `options.baseUrl ?? \`${parsedEndpoint}\``;
    }
    else {
        baseUrl = `options.baseUrl ?? "${endpoint}"`;
    }
    const baseUrlStatement = {
        kind: ts_morph_1.StructureKind.VariableStatement,
        declarationKind: ts_morph_1.VariableDeclarationKind.Const,
        declarations: [{ name: "baseUrl", initializer: baseUrl }]
    };
    const { credentialScopes, credentialKeyHeaderName } = autorestSession_1.getAutorestOptions();
    const scopesString = credentialScopes && credentialScopes.length
        ? credentialScopes.map(cs => `"${cs}"`).join(", ")
        : "";
    const scopes = scopesString ? `scopes: [${scopesString}],` : "";
    const apiKeyHeaderName = credentialKeyHeaderName
        ? `apiKeyHeaderName: "${credentialKeyHeaderName}",`
        : "";
    const credentials = scopes || apiKeyHeaderName
        ? `options = {
    ...options,
    credentials: {
      ${scopes}
      ${apiKeyHeaderName}
    }
  }`
        : "";
    const getClient = `return getClient(
    baseUrl,
    ${credentials ? "credentials," : ""}
    options
  ) as ${clientTypeName};`;
    return [baseUrlStatement, credentials, getClient];
}
function generatePathFirstRouteMethodsDefinition(operationName, methods, file) {
    const methodDefinitions = [];
    for (const key of Object.keys(methods)) {
        const method = methods[key];
        methodDefinitions.push({
            name: key,
            docs: [{ description: methods[key].description }],
            parameters: [
                {
                    name: "options",
                    hasQuestionToken: method.hasOptionalOptions,
                    type: method.optionsName
                }
            ],
            returnType: method.returnType
        });
    }
    file.addInterface({
        methods: methodDefinitions,
        name: operationName,
        isExported: true
    });
}
function getPathFirstRoutesInterfaceDefinition(paths, sourcefile) {
    const signatures = [];
    for (const key of Object.keys(paths)) {
        generatePathFirstRouteMethodsDefinition(paths[key].name, paths[key].methods, sourcefile);
        const pathParams = paths[key].pathParameters;
        signatures.push({
            docs: [
                `Resource for '${key
                    .replace(/}/g, "\\}")
                    .replace(/{/g, "\\{")}' has methods for the following verbs: ${Object.keys(paths[key].methods).join(", ")}`
            ],
            parameters: [
                { name: "path", type: `"${key}"` },
                ...pathParams.map(p => {
                    return { name: p.name, type: "string", description: p.description };
                })
            ],
            returnType: paths[key].name,
            kind: ts_morph_1.StructureKind.CallSignature
        });
    }
    return signatures;
}
function getResponseInterfaceName(operation, response) {
    var _a;
    return `${operation.language.default.name}${(_a = response.protocol.http) === null || _a === void 0 ? void 0 : _a.statusCodes[0]}Response`;
}
function generateResponsesInterface(model, project) {
    const clientFile = project.createSourceFile(`src/responses.ts`, undefined, {
        overwrite: true
    });
    let importedModels = new Set();
    let hasHeaders = false;
    const operations = getAllOperations(model);
    operations.forEach(o => {
        [...(o.responses || []), ...(o.exceptions || [])].forEach(r => {
            var _a, _b, _c, _d, _e, _f;
            if (!r.protocol.http) {
                return;
            }
            const baseResponseName = `${o.language.default.name}${(_a = r.protocol.http) === null || _a === void 0 ? void 0 : _a.statusCodes[0]}`;
            let bodyType;
            let headersType = "RawHttpHeaders";
            const isHeadersOptional = !((_b = r.protocol.http) === null || _b === void 0 ? void 0 : _b.headers) || !((_c = r.protocol.http) === null || _c === void 0 ? void 0 : _c.headers.length);
            if (schemaHelpers_1.isSchemaResponse(r)) {
                const typeInfo = getTypeForSchema(r.schema);
                bodyType = typeInfo.typeName;
                if (typeInfo.modelName) {
                    importedModels.add(typeInfo.modelName);
                }
            }
            if (!isHeadersOptional) {
                hasHeaders = true;
                const headersInterfaceName = `${baseResponseName}Headers`;
                clientFile.addInterface({
                    isExported: true,
                    name: headersInterfaceName,
                    properties: headersType = (_d = r.protocol.http) === null || _d === void 0 ? void 0 : _d.headers.map((h) => ({
                        name: `"${h.header.toLowerCase()}"`,
                        docs: [h.language.default.description],
                        type: "string",
                        hasQuestionToken: true
                    }))
                });
                headersType = `RawHttpHeaders & ${headersInterfaceName}`;
            }
            const responseTypeName = getResponseInterfaceName(o, r);
            const statusCode = ((_e = r.protocol.http) === null || _e === void 0 ? void 0 : _e.statusCodes[0]) === "default"
                ? `"500"`
                : `"${(_f = r.protocol.http) === null || _f === void 0 ? void 0 : _f.statusCodes[0]}"`;
            const responseProperties = [{ name: "status", type: statusCode }];
            if (bodyType) {
                responseProperties.push({
                    name: "body",
                    type: (bodyType !== null && bodyType !== void 0 ? bodyType : "any")
                });
            }
            if (!isHeadersOptional) {
                responseProperties.push({
                    name: "headers",
                    type: headersType
                });
            }
            clientFile.addInterface({
                docs: [o.language.default.description],
                name: responseTypeName,
                properties: responseProperties,
                isExported: true,
                extends: ["HttpResponse"]
            });
        });
    });
    if (importedModels.size) {
        clientFile.addImportDeclaration({
            namedImports: [...importedModels],
            moduleSpecifier: "./models"
        });
    }
    clientFile.addImportDeclarations([
        {
            namedImports: ["HttpResponse"],
            moduleSpecifier: "@azure-rest/core-client"
        }
    ]);
    if (hasHeaders) {
        clientFile.addImportDeclaration({
            namedImports: ["RawHttpHeaders"],
            moduleSpecifier: "@azure/core-rest-pipeline"
        });
    }
}
function getAllOperations(model) {
    let operations = [];
    model.operationGroups.forEach(og => og.operations
        .filter(o => o.requests && o.requests.length)
        .forEach(o => {
        operations.push(o);
    }));
    return operations;
}
function getOperationOptionsType(operation, importedParameters = new Set()) {
    const paramsName = `${operation.language.default.name}Parameters`;
    importedParameters.add(paramsName);
    return paramsName;
}
function getOperationReturnType(operation, importedResponses = new Set()) {
    let returnType = "HttpResponse";
    if (operation.responses && operation.responses.length) {
        const responses = [...operation.responses, ...(operation.exceptions || [])];
        const responseTypes = responses
            .filter(r => { var _a, _b; return ((_a = r.protocol.http) === null || _a === void 0 ? void 0 : _a.statusCodes) && ((_b = r.protocol.http) === null || _b === void 0 ? void 0 : _b.statusCodes.length); })
            .map(r => {
            const responseName = getResponseInterfaceName(operation, r);
            importedResponses.add(responseName);
            return responseName;
        });
        if (responseTypes.length) {
            returnType = responseTypes.join(" | ");
        }
    }
    return returnType;
}
//# sourceMappingURL=lowLevelGenerator.js.map