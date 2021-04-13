"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const codemodel_1 = require("@azure-tools/codemodel");
const ts_morph_1 = require("ts-morph");
const util_1 = require("util");
const mappersGenerator_1 = require("./mappersGenerator");
const importUtils_1 = require("./utils/importUtils");
const logger_1 = require("../utils/logger");
function generateParameters(clientDetails, project) {
    if (!importUtils_1.shouldImportParameters(clientDetails)) {
        logger_1.logger.verbose("There are no parameters to generate, skipping parameters file generation");
        return;
    }
    const parametersFile = project.createSourceFile(`${clientDetails.srcPath}/models/parameters.ts`, undefined, { overwrite: true });
    const importedCoreHttp = getCoreHttpImports(clientDetails);
    if (importedCoreHttp.length) {
        parametersFile.addImportDeclaration({
            namedImports: importedCoreHttp,
            moduleSpecifier: "@azure/core-http"
        });
    }
    const importedMappers = getImportedMappers(clientDetails);
    if (importedMappers.length) {
        parametersFile.addImportDeclaration({
            namedImports: importedMappers,
            moduleSpecifier: "../models/mappers"
        });
    }
    clientDetails.parameters
        .filter(p => !p.isSynthetic)
        // No need to generate parameters for flattened ones, as the will never get used
        .filter(p => !p.isFlattened)
        .forEach(param => {
        parametersFile.addVariableStatement({
            isExported: true,
            declarations: [buildParameterInitializer(param)],
            declarationKind: ts_morph_1.VariableDeclarationKind.Const,
            leadingTrivia: writer => writer.blankLine()
        });
    });
}
exports.generateParameters = generateParameters;
function buildParameterInitializer(parameter) {
    const { nameRef, location } = parameter;
    const type = getParameterType(location);
    return {
        name: nameRef,
        type,
        initializer: writer => {
            writer.block(() => {
                writeParameterPath(writer, parameter);
                writeParameterMapper(writer, parameter);
                writeParameterCollectionFormat(writer, parameter);
                writeParameterSkipEncoding(writer, parameter);
            });
        },
        kind: ts_morph_1.StructureKind.VariableDeclaration
    };
}
function writeParameterCollectionFormat(writer, { collectionFormat }) {
    return writer.conditionalWrite(!!collectionFormat, () => `collectionFormat: QueryCollectionFormat.${collectionFormat},`);
}
function writeParameterSkipEncoding(writer, { skipEncoding }) {
    return writer.conditionalWrite(!!skipEncoding, () => `skipEncoding: true,`);
}
function writeParameterPath(writer, { parameterPath }) {
    return writer.write(`parameterPath: ${JSON.stringify(parameterPath)},`);
}
// We may want to move this to a common place to potentially be reused by mappersGenerator
function writeParameterMapper(writer, { mapper }) {
    writer.write("mapper: ");
    if (util_1.isString(mapper)) {
        writer.write(`${mapper}Mapper`);
    }
    else {
        mappersGenerator_1.writeMapper(writer, mapper);
    }
    return writer.write(",");
}
function getParameterType(location) {
    switch (location) {
        case codemodel_1.ParameterLocation.Path:
        case codemodel_1.ParameterLocation.Uri:
            return "OperationURLParameter";
        case codemodel_1.ParameterLocation.Query:
            return "OperationQueryParameter";
        default:
            return "OperationParameter";
    }
}
function getCoreHttpImports(clientDetails) {
    const parameterTypes = clientDetails.parameters
        .filter(p => !p.isSynthetic)
        .map(p => getParameterType(p.location));
    if (clientDetails.parameters
        .filter(p => !p.isSynthetic)
        .some(p => p.collectionFormat)) {
        parameterTypes.push("QueryCollectionFormat");
    }
    return [...new Set(parameterTypes)];
}
function getImportedMappers(clientDetails) {
    const mappers = clientDetails.parameters
        .filter(p => !p.isSynthetic && util_1.isString(p.mapper))
        .map(p => `${p.mapper} as ${p.mapper}Mapper`);
    return [...new Set(mappers)];
}
//# sourceMappingURL=parametersGenerator.js.map