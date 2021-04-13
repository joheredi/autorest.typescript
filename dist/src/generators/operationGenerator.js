"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const ts_morph_1 = require("ts-morph");
const nameUtils_1 = require("../utils/nameUtils");
const operationTransforms_1 = require("../transforms/operationTransforms");
const parameterUtils_1 = require("./utils/parameterUtils");
const codegen_1 = require("@azure-tools/codegen");
const codemodel_1 = require("@azure-tools/codemodel");
const languageHelpers_1 = require("../utils/languageHelpers");
const importUtils_1 = require("./utils/importUtils");
const responseTypeUtils_1 = require("./utils/responseTypeUtils");
const docsUtils_1 = require("./utils/docsUtils");
const tracingUtils_1 = require("./utils/tracingUtils");
const pagingOperations_1 = require("./utils/pagingOperations");
/**
 * Function that writes the code for all the operations.
 * It will generate one file per operation group and each file contains:
 *    - A class definition for the operation group
 *    - Methods and overrides for each operation
 *    - OperationSpecs for each operation
 * @param clientDetails client details
 * @param project project for code generation
 */
function generateOperations(clientDetails, project) {
    let fileNames = [];
    // Toplevel operations are inlined in the client
    const operationGroups = clientDetails.operationGroups.filter(og => !og.isTopLevel);
    operationGroups.forEach(operationDetails => {
        fileNames.push(nameUtils_1.normalizeName(operationDetails.name, nameUtils_1.NameType.File));
        generateOperation(operationDetails, clientDetails, project);
    });
    if (operationGroups.length) {
        const operationIndexFile = project.createSourceFile(`${clientDetails.srcPath}/operations/index.ts`, undefined, { overwrite: true });
        operationIndexFile.addExportDeclarations(fileNames.map(fileName => {
            return {
                moduleSpecifier: `./${fileName}`
            };
        }));
    }
}
exports.generateOperations = generateOperations;
/**
 * This function creates a file for a given Operation Group
 */
function generateOperation(operationGroupDetails, clientDetails, project) {
    const name = nameUtils_1.normalizeName(operationGroupDetails.name, nameUtils_1.NameType.File);
    const hasMappers = !!clientDetails.mappers.length;
    const operationGroupFile = project.createSourceFile(`${clientDetails.srcPath}/operations/${name}.ts`, undefined, { overwrite: true });
    addImports(operationGroupDetails, operationGroupFile, clientDetails);
    addClass(operationGroupFile, operationGroupDetails, clientDetails);
    addOperationSpecs(operationGroupDetails, operationGroupFile, clientDetails.parameters, hasMappers);
}
function writeGetOperationOptions(operationGroupClass) {
    operationGroupClass.addMethod({
        scope: ts_morph_1.Scope.Private,
        name: "getOperationOptions<TOptions extends coreHttp.OperationOptions>",
        parameters: [
            { name: "options", type: "TOptions | undefined" },
            { name: "finalStateVia", type: "string", hasQuestionToken: true }
        ],
        returnType: `coreHttp.RequestOptionsBase`,
        statements: `
    const operationOptions: coreHttp.OperationOptions = options || {};
    operationOptions.requestOptions = {
      ...operationOptions.requestOptions,
      shouldDeserialize: shouldDeserializeLRO(finalStateVia),
    };
    return coreHttp.operationOptionsToRequestOptionsBase(operationOptions);
    `
    });
}
exports.writeGetOperationOptions = writeGetOperationOptions;
/**
 * Generates a string representation of an Operation spec
 * the output is to be inserted in the Operation group file
 */
function writeSpec(spec, writer) {
    const responses = buildResponses(spec);
    const requestBody = buildRequestBody(spec);
    const queryParams = buildParameters(spec, "queryParameters");
    const urlParams = buildParameters(spec, "urlParameters");
    const headerParams = buildParameters(spec, "headerParameters");
    const formDataParams = buildParameters(spec, "formDataParameters");
    const contentType = buildContentType(spec);
    const mediaType = buildMediaType(spec);
    const serializerName = spec.isXML
        ? "serializer: xmlSerializer"
        : "serializer";
    writer.block(() => {
        writer.write(`path: "${spec.path}",`);
        writer.write(`httpMethod: "${spec.httpMethod}",`);
        writer.write(`responses: { ${responses.join(", ")} },`);
        if (typeof requestBody === "string") {
            writer.write(requestBody);
        }
        else {
            const mapper = typeof requestBody.mapper === "string"
                ? `Mappers.${requestBody.mapper}`
                : `${JSON.stringify(requestBody.mapper)}`;
            if (requestBody.required) {
                writer.write(`requestBody: { parameterPath: ${JSON.stringify(requestBody.parameterPath)}, mapper: {...${mapper}, required: true}},`);
            }
            else {
                writer.write(`requestBody: { parameterPath: ${JSON.stringify(requestBody.parameterPath)}, mapper: ${mapper}}, `);
            }
        }
        if (formDataParams) {
            writer.write(formDataParams);
            writer.write(", ");
        }
        if (queryParams) {
            writer.write(queryParams);
            writer.write(", ");
        }
        if (urlParams) {
            writer.write(urlParams);
            writer.write(", ");
        }
        if (headerParams) {
            writer.write(headerParams);
            writer.write(", ");
        }
        if (spec.isXML) {
            writer.write("isXML: true");
            writer.write(", ");
        }
        if (contentType) {
            writer.write(contentType);
            writer.write(", ");
        }
        if (mediaType) {
            writer.write(mediaType);
            writer.write(", ");
        }
        if (serializerName) {
            writer.write(serializerName);
            writer.write(", ");
        }
    });
}
function buildMediaType({ requestBody }) {
    var _a, _b;
    let targetMediaType = "";
    // requestBody may be an array of parameters, this is the scenario
    // where the body parameter has been flattened.
    if (Array.isArray(requestBody)) {
        // We just need to take the first know targetMediaType as all others would be the same
        targetMediaType = (_a = requestBody[0]) === null || _a === void 0 ? void 0 : _a.targetMediaType;
    }
    else {
        targetMediaType = (_b = requestBody) === null || _b === void 0 ? void 0 : _b.targetMediaType;
    }
    if (targetMediaType) {
        return `mediaType: '${targetMediaType}'`;
    }
    return "";
}
function buildContentType({ requestBody, isXML }) {
    return requestBody && isXML
        ? "contentType: 'application/xml; charset=utf-8'"
        : "";
}
/**
 * This function transforms the requestBody of OperationSpecDetails into its string representation
 * to insert in generated files.
 * Whenever the request body parameter has been flattened this function will return the ResponseBody as a complex
 * object.
 */
function buildRequestBody({ requestBody, httpMethod }) {
    var _a;
    if (!requestBody || httpMethod === "GET") {
        return "";
    }
    // No flattened parameters so we can just return the simple representation
    if (isSingleRequestBody(requestBody)) {
        return `requestBody: Parameters.${requestBody.nameRef},`;
    }
    // Request body has been flattened so we need to represent it as a complex RequestBody
    // object in which we'll describe the parameter name and where to find it in the operation parameters
    // First get the mapper, this will be the mapper for the parameter before flattening
    const mapper = requestBody[0].mapper;
    let required = (_a = requestBody[0].required, (_a !== null && _a !== void 0 ? _a : false));
    // If one of the requestbody in the spec has required set to true,
    // we do not want to look into others.
    if (!required) {
        for (const rb of requestBody) {
            required = rb.required
                ? rb.required
                : rb.parameter.groupedBy && rb.parameter.groupedBy.required
                    ? rb.parameter.groupedBy.required
                    : required;
            if (required)
                break;
        }
    }
    // Generate the request body from the parameters
    const parameters = requestBody.reduce((acc, curr) => {
        var _a;
        // We ignore any Grouped or Flattened parameters
        if (curr.schemaType === codemodel_1.SchemaType.Group || curr.parameter.flattened) {
            return acc;
        }
        const name = curr.name;
        // Figure out how to find the parameter, if the parameter belongs to a group we need to access the group object so the
        // path would be ["groupName", "parameterName"] to tell the serialized to get it from groupName.parameterName.
        // If it is a regular parameter the path would be its name.
        const sourcePath = curr.parameter.groupedBy
            ? [languageHelpers_1.getLanguageMetadata(curr.parameter.groupedBy.language).name, name]
            : [name];
        const isRequired = curr.required || ((_a = curr.parameter.groupedBy) === null || _a === void 0 ? void 0 : _a.required);
        let parameterPath;
        // If the parameter is optional it will be put in the "options" parameter bag, so add "options" to the path.
        if (isRequired) {
            parameterPath = sourcePath;
        }
        else {
            parameterPath = ["options", ...sourcePath];
        }
        return {
            ...acc,
            [name]: parameterPath
        };
    }, {});
    return {
        parameterPath: parameters,
        mapper,
        required
    };
}
function isSingleRequestBody(requestBody) {
    return !Array.isArray(requestBody);
}
function buildParameters(operationSpec, parameterGroupName) {
    const parameterGroup = operationSpec[parameterGroupName];
    if (!parameterGroup || !parameterGroup.length) {
        return "";
    }
    const parameters = parameterGroup.map(param => `Parameters.${param.nameRef}`);
    return `${parameterGroupName}: [${parameters.join()}]`;
}
/**
 * This function transforms the responses of OperationSpecDetails into their string representation
 * to insert in generated files
 */
function buildResponses({ responses }) {
    const responseCodes = Object.keys(responses);
    let parsedResponses = [];
    responseCodes.forEach(code => {
        // Check whether we have an actual mapper or a string reference
        const { bodyMapper, headersMapper, isError } = responses[code];
        const bodyMapperString = buildMapper(bodyMapper, "bodyMapper");
        const headersMapperString = buildMapper(headersMapper, "headersMapper");
        const isErrorMapperString = isError ? `isError: ${isError}` : "";
        parsedResponses.push(`${code}: {
        ${bodyMapperString}${headersMapperString}${isErrorMapperString}
      }`);
    });
    return parsedResponses;
}
function buildMapper(mapper, mapperName) {
    if (!mapper) {
        return "";
    }
    // When mapper is a reference (string) we don't need to stringify the object
    let mapperString = typeof mapper === "string" ? mapper : JSON.stringify(mapper);
    return `${mapperName}: ${mapperString},`;
}
function getReturnType(operation, importedModels, modelNames) {
    const responseName = responseTypeUtils_1.getOperationResponseType(operation, importedModels, modelNames);
    return operation.isLRO
        ? `Promise<LROPoller<${responseName}>>`
        : `Promise<${responseName}>`;
}
/**
 * Adds an Operation group class to the generated file
 */
function addClass(operationGroupFile, operationGroupDetails, clientDetails) {
    let importedModels = new Set();
    let allModelsNames = responseTypeUtils_1.getAllModelsNames(clientDetails);
    const className = nameUtils_1.normalizeName(operationGroupDetails.name, nameUtils_1.NameType.OperationGroup, true /** shouldGuard */);
    const operationGroupClass = operationGroupFile.addClass({
        name: className,
        docs: [`Class representing a ${className}.`],
        isExported: true
    });
    operationGroupClass.addProperty({
        name: "client",
        isReadonly: true,
        scope: ts_morph_1.Scope.Private,
        type: clientDetails.className
    });
    const constructorDefinition = operationGroupClass.addConstructor({
        docs: [
            {
                description: `Initialize a new instance of the class ${className} class. \n@param client Reference to the service client`
            }
        ],
        parameters: [
            {
                name: "client",
                hasQuestionToken: false,
                type: clientDetails.className
            }
        ]
    });
    constructorDefinition.addStatements(["this.client = client"]);
    writeOperations(operationGroupDetails, operationGroupClass, importedModels, allModelsNames, clientDetails, false /** isInline */);
    if (hasLROOperation(operationGroupDetails)) {
        writeGetOperationOptions(operationGroupClass);
    }
    // Use named import from Models
    if (importedModels.size) {
        // Add alias to any model that collides with the class name
        const namedImports = [...importedModels].map(model => {
            if (model === className) {
                return `${model} as ${model}Model`;
            }
            return model;
        });
        operationGroupFile.addImportDeclaration({
            namedImports,
            moduleSpecifier: "../models"
        });
    }
}
/**
 * Write operations implementation, extracted from OperationGroupDetails, to the generated file
 */
function writeOperations(operationGroupDetails, operationGroupClass, importedModels, modelNames, clientDetails, isInline = false) {
    pagingOperations_1.preparePageableOperations(operationGroupDetails, clientDetails);
    pagingOperations_1.writeAsyncIterators(operationGroupDetails, clientDetails, operationGroupClass, importedModels);
    operationGroupDetails.operations.forEach(operation => {
        const { baseMethodParameters, overloadParameterDeclarations } = parameterUtils_1.getOperationParameterSignatures(operation, clientDetails.parameters, importedModels, operationGroupClass);
        const responseName = responseTypeUtils_1.getOperationResponseType(operation, importedModels, modelNames);
        const returnType = getReturnType(operation, importedModels, modelNames);
        const name = `${operation.namePrefix || ""}${nameUtils_1.normalizeName(operation.name, nameUtils_1.NameType.Property)}`;
        const operationMethod = operationGroupClass.addMethod({
            name,
            parameters: baseMethodParameters,
            scope: operation.scope,
            returnType,
            docs: [
                docsUtils_1.generateOperationJSDoc(baseMethodParameters, operation.description)
            ],
            isAsync: operation.isLRO || Boolean(clientDetails.tracing)
        });
        addOperationOverloads(operationMethod, operation, overloadParameterDeclarations, returnType);
        writeOperationBody(operationMethod, operation, overloadParameterDeclarations, clientDetails, responseName, isInline);
    });
}
exports.writeOperations = writeOperations;
/**
 * Writes the operation body
 */
function writeOperationBody(generatedOperation, operationDetails, overloadDeclarations, clientDetails, responseName, isInline) {
    if (overloadDeclarations.length === 1) {
        // No overloads
        writeNoOverloadsOperationBody(operationDetails, responseName, generatedOperation, overloadDeclarations[0], clientDetails, isInline);
    }
    else {
        // This condition implies that the user can specify a contentType,
        // and this contentType can change how the request is serialized.
        writeMultiMediaTypeOperationBody(generatedOperation, operationDetails, overloadDeclarations, responseName, clientDetails, isInline);
    }
}
/**
 * Adds any required overloads to a TSMorph method
 * @param generatedOperation TsMorph method
 * @param operationDetails  Operation Details extracted from the code model
 * @param overloadDeclarations Available overloads
 * @param returnType Return type for the generated operation
 */
function addOperationOverloads(generatedOperation, operationDetails, overloadDeclarations, returnType) {
    if (overloadDeclarations.length === 1) {
        // We have a single method definition so no need for overloads
        return;
    }
    for (const overload of overloadDeclarations) {
        generatedOperation.addOverload({
            parameters: overload,
            returnType,
            docs: [docsUtils_1.generateOperationJSDoc(overload, operationDetails.description)]
        });
    }
}
function writeNoOverloadsOperationBody(operation, responseName, operationMethod, parameterDeclarations, clientDetails, isInline) {
    const finalStateVia = operation.lroOptions && operation.lroOptions["final-state-via"];
    const operationSpecName = `${operation.name}OperationSpec`;
    // Convert OperationOptions to RequestBaseOptions
    // In LRO we have a couple extra properties to add that's why we use
    // the private getOperationOptions function instead of the one in core-http
    const toOptionsBase = operation.isLRO
        ? `this.getOperationOptions(options, "${finalStateVia}")`
        : `coreHttp.operationOptionsToRequestOptionsBase(options || {})`;
    let options = toOptionsBase;
    if (clientDetails.tracing) {
        const operationName = operationMethod.getName();
        operationMethod.addStatements([
            getTracingSpanStatement(clientDetails, operationName, toOptionsBase)
        ]);
        // Options from createSpan should be used as operation options, updating
        options = "updatedOptions";
    }
    const sendParams = parameterDeclarations
        .map(p => (p.name === "options" ? `options: ${options}` : p.name))
        .join(",");
    // Create an object to hold all the arguments for send request
    operationMethod.addStatements(`const operationArguments: coreHttp.OperationArguments = {${sendParams}}`);
    if (operation.isLRO) {
        writeLROOperationBody("operationArguments", responseName, operationSpecName, operationMethod, finalStateVia, isInline, !!clientDetails.tracing);
    }
    else {
        writeSendOperationRequest(responseName, operationMethod, operationSpecName, clientDetails, isInline);
    }
}
function getTracingSpanStatement(clientDetails, operationName, options) {
    return `const { span, updatedOptions } = createSpan("${clientDetails.className}-${operationName}", ${options});`;
}
function writeSendOperationRequest(responseName, operationMethod, operationSpecName, clientDetails, isInline = false) {
    const client = isInline ? "" : ".client";
    const sendRequestStatement = `this${client}.sendOperationRequest(operationArguments, ${operationSpecName})`;
    // When tracing is enabled we want to report success and failures through OpenTelemetry
    // so we create a span and mark it as succeeded or failed
    operationMethod.addStatements(getTracingTryCatchStatement(sendRequestStatement, responseName, !!clientDetails.tracing));
}
function getTracingTryCatchStatement(sendRequestStatement, responseName, isTracingEnabled) {
    if (isTracingEnabled) {
        return `try {
      const result = await ${sendRequestStatement}
      return result as ${responseName};
    } catch(error) {
    span.setStatus({
      code: CanonicalCode.UNKNOWN,
      message: error.message
    });
      throw error;
    } finally {
      span.end();
    }`;
    }
    else {
        return `return ${sendRequestStatement} as Promise<${responseName}>`;
    }
}
function writeLROOperationBody(operationParamsName, responseName, operationSpecName, methodDeclaration, finalStateVia, isInline, isTracingEnabled = false) {
    const client = isInline ? "" : ".client";
    const sendRequestStatement = `this${client}.sendOperationRequest(args, spec)`;
    const finalStateStr = finalStateVia
        ? `finalStateVia: "${finalStateVia.toLowerCase()}"`
        : "";
    const asyncKeyword = isTracingEnabled ? "async" : "";
    let sendOperationStatement = `const sendOperation = ${asyncKeyword} (args: coreHttp.OperationArguments, spec: coreHttp.OperationSpec) => {
    ${getTracingTryCatchStatement(sendRequestStatement, responseName, isTracingEnabled)}
  }`;
    methodDeclaration.addStatements([
        sendOperationStatement,
        `const initialOperationResult = await sendOperation(${operationParamsName}, ${operationSpecName});`,
        `return new LROPoller({
      initialOperationArguments: ${operationParamsName},
      initialOperationSpec: ${operationSpecName},
      initialOperationResult,
      sendOperation,
      ${finalStateStr}
    });`
    ]);
    methodDeclaration.setReturnType(`Promise<LROPoller<${responseName}>>`);
}
/**
 * Writes the body of an operation that supports multiple media types.
 * The body will perform checks based on the user-provided contentType
 * to determine which OperationSpec to use when sending the request.
 */
function writeMultiMediaTypeOperationBody(operationMethod, operation, overloadParameterDeclarations, responseName, clientDetails, isInline = false) {
    operationMethod.addStatements([
        "let operationSpec: coreHttp.OperationSpec;",
        "let operationArguments: coreHttp.OperationArguments;"
    ]);
    // We need to use the contentType parameter to determine which spec to use.
    const requests = operation.requests;
    if (overloadParameterDeclarations.length !== requests.length) {
        throw new Error(`Expected ${requests.length} overloads, but found generated ${overloadParameterDeclarations.length} for ${operation.name}`);
    }
    // Since contentType is always added as a synthetic parameter by modelerfour, it should always
    // be in the same position for all overloads.
    let contentTypePosition = -1;
    for (let i = 0; i < requests.length; i++) {
        const request = requests[i];
        const overloadParameters = overloadParameterDeclarations[i];
        const mediaType = request.mediaType;
        const contentTypeValues = getContentTypeInfo(request);
        contentTypePosition = overloadParameters.findIndex(param => {
            return param.isContentType;
        });
        // Ensure that a contentType exists, otherwise we won't be able to determine which operation spec to use.
        if (contentTypePosition === -1 ||
            !contentTypeValues ||
            !contentTypeValues.length) {
            throw new Error(`Encountered an operation media type that has unspecified values for the contentType for operation "${operation.fullName}".`);
        }
        // Get parameters for current overload
        const params = overloadParameters
            .map((param, index) => `${param.name}: args[${index}]`)
            .join(",");
        // Get conditional to handle the current oveload
        const conditional = contentTypeValues
            .map(type => `args[${contentTypePosition}] === "${type}"`)
            .join(" || ");
        // Get the string for current overload assignments of operation spec and arguments
        const assignments = [
            `operationSpec = ${operation.name}$${mediaType}OperationSpec`,
            `operationArguments = {${params}};`
        ].join("\n");
        const elseif = i === 0 ? "if" : "else if";
        // Add conditional statement to handle the current overload
        operationMethod.addStatements([
            `${elseif} (${conditional}) {
        ${assignments}
       }`
        ]);
    }
    // Add an else clause that throws an error. This should never happen as long as a contentType was provided by the user.
    operationMethod.addStatements([
        `else {
    throw new TypeError(\`"contentType" must be a valid value but instead was "\${args[${contentTypePosition}]}".\`);
  }`
    ]);
    const toOptionsBase = `coreHttp.operationOptionsToRequestOptionsBase(operationArguments.options || {})`;
    if (clientDetails.tracing) {
        const operationName = operationMethod.getName();
        operationMethod.addStatements([
            getTracingSpanStatement(clientDetails, operationName, toOptionsBase),
            `operationArguments.options = updatedOptions;`
        ]);
    }
    else {
        operationMethod.addStatements([
            `operationArguments.options = ${toOptionsBase};`
        ]);
    }
    if (!operation.isLRO) {
        writeSendOperationRequest(responseName, operationMethod, "operationSpec", clientDetails, isInline);
    }
    else {
        const finalStateVia = operation.lroOptions && operation.lroOptions["final-state-via"];
        writeLROOperationBody("operationArguments", responseName, "operationSpec", operationMethod, finalStateVia, isInline, !!clientDetails.tracing);
    }
}
function getContentTypeInfo(request) {
    var _a, _b, _c;
    const parameters = (_a = request.parameters, (_a !== null && _a !== void 0 ? _a : []));
    for (let i = 0; i < parameters.length; i++) {
        const parameter = parameters[i];
        const parameterMetadata = languageHelpers_1.getLanguageMetadata(parameter.language);
        const paramLowerSerializedName = (_b = parameterMetadata.serializedName) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        const parameterInHeader = ((_c = parameter.protocol.http) === null || _c === void 0 ? void 0 : _c.in) === codemodel_1.ParameterLocation.Header;
        const schema = parameter.schema;
        if ((schema.type === codemodel_1.SchemaType.Choice ||
            schema.type === codemodel_1.SchemaType.SealedChoice) &&
            paramLowerSerializedName === "content-type" &&
            parameterInHeader) {
            return schema.choices.map(c => c.value);
        }
        else if (schema.type === codemodel_1.SchemaType.Constant &&
            paramLowerSerializedName === "content-type" &&
            parameterInHeader) {
            return [schema.value.value];
        }
    }
    return;
}
function hasMediaType(operationDetails, mediaType) {
    if (!operationDetails.requests.some(r => !!r.mediaType)) {
        return operationDetails.mediaTypes.has(mediaType);
    }
    return operationDetails.requests.some(r => r.mediaType === mediaType);
}
/**
 * Generates and inserts into the file the operation specs
 * for a given operation group
 */
function addOperationSpecs(operationGroupDetails, file, parameters, hasMappers) {
    const hasXml = operationGroupDetails.operations.some(operation => hasMediaType(operation, codegen_1.KnownMediaType.Xml));
    const hasJson = operationGroupDetails.operations.some(operation => hasMediaType(operation, codegen_1.KnownMediaType.Json));
    const needsDefault = !hasXml && !hasJson;
    file.addStatements("// Operation Specifications");
    if (hasXml) {
        writeSerializer(hasMappers, file, SerializerKind.Xml);
    }
    if (hasJson || needsDefault) {
        writeSerializer(hasMappers, file, SerializerKind.Json);
    }
    operationGroupDetails.operations.forEach(operation => {
        const operationSpecs = operationTransforms_1.transformOperationSpec(operation, parameters);
        for (const operationSpec of operationSpecs) {
            file.addVariableStatement({
                declarationKind: ts_morph_1.VariableDeclarationKind.Const,
                declarations: [
                    {
                        name: operationSpec.name,
                        type: "coreHttp.OperationSpec",
                        initializer: writer => writeSpec(operationSpec, writer)
                    }
                ]
            });
        }
    });
}
exports.addOperationSpecs = addOperationSpecs;
var SerializerKind;
(function (SerializerKind) {
    SerializerKind[SerializerKind["Json"] = 0] = "Json";
    SerializerKind[SerializerKind["Xml"] = 1] = "Xml";
})(SerializerKind || (SerializerKind = {}));
function writeSerializer(hasMappers, file, kind = SerializerKind.Json) {
    const isXml = kind === SerializerKind.Xml;
    const mappers = hasMappers ? "Mappers" : "{}";
    const name = isXml ? "xmlSerializer" : "serializer";
    file.addVariableStatement({
        declarationKind: ts_morph_1.VariableDeclarationKind.Const,
        declarations: [
            {
                name,
                initializer: `new coreHttp.Serializer(${mappers}, /* isXml */ ${isXml});`
            }
        ]
    });
}
/**
 * Adds required imports at the top of the file
 */
function addImports(operationGroupDetails, operationGroupFile, clientDetails) {
    const { className, sourceFileName, mappers } = clientDetails;
    tracingUtils_1.addTracingOperationImports(clientDetails, operationGroupFile);
    pagingOperations_1.addPagingImports(operationGroupDetails.operations, clientDetails, operationGroupFile);
    operationGroupFile.addImportDeclaration({
        namespaceImport: "coreHttp",
        moduleSpecifier: "@azure/core-http"
    });
    if (mappers.length) {
        operationGroupFile.addImportDeclaration({
            namespaceImport: "Mappers",
            moduleSpecifier: "../models/mappers"
        });
    }
    if (importUtils_1.shouldImportParameters(clientDetails)) {
        operationGroupFile.addImportDeclaration({
            namespaceImport: "Parameters",
            moduleSpecifier: "../models/parameters"
        });
    }
    operationGroupFile.addImportDeclaration({
        namedImports: [className],
        moduleSpecifier: `../${sourceFileName}`
    });
    if (hasLROOperation(operationGroupDetails)) {
        operationGroupFile.addImportDeclaration({
            namedImports: ["LROPoller", "shouldDeserializeLRO"],
            moduleSpecifier: `../lro`
        });
    }
}
function hasLROOperation(operationGroupDetails) {
    return operationGroupDetails.operations.some(o => o.isLRO);
}
//# sourceMappingURL=operationGenerator.js.map