"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_morph_1 = require("ts-morph");
var nameUtils_1 = require("../utils/nameUtils");
var parameterUtils_1 = require("./utils/parameterUtils");
var responseTypeUtils_1 = require("./utils/responseTypeUtils");
var docsUtils_1 = require("./utils/docsUtils");
var tracingUtils_1 = require("./utils/tracingUtils");
var pagingOperations_1 = require("./utils/pagingOperations");
/**
 * Function that writes the code for all the operations.
 * It will generate one file per operation group and each file contains:
 *    - A class definition for the operation group
 *    - Methods and overrides for each operation
 *    - OperationSpecs for each operation
 * @param clientDetails client details
 * @param project project for code generation
 */
function generateOperationsInterfaces(clientDetails, project) {
    var fileNames = [];
    // Toplevel operations are inlined in the client
    var operationGroups = clientDetails.operationGroups.filter(function (og) { return !og.isTopLevel; });
    operationGroups.forEach(function (operationDetails) {
        fileNames.push(nameUtils_1.normalizeName(operationDetails.name, nameUtils_1.NameType.File));
        generateOperation(operationDetails, clientDetails, project);
    });
    if (operationGroups.length) {
        var operationIndexFile = project.createSourceFile(clientDetails.srcPath + "/operationsInterfaces/index.ts", undefined, { overwrite: true });
        operationIndexFile.addExportDeclarations(fileNames.map(function (fileName) {
            return {
                moduleSpecifier: "./" + fileName
            };
        }));
    }
}
exports.generateOperationsInterfaces = generateOperationsInterfaces;
/**
 * This function creates a file for a given Operation Group
 */
function generateOperation(operationGroupDetails, clientDetails, project) {
    var name = nameUtils_1.normalizeName(operationGroupDetails.name, nameUtils_1.NameType.File);
    var operationInterfaceGroupFile = project.createSourceFile(clientDetails.srcPath + "/operationsInterfaces/" + name + ".ts", undefined, { overwrite: true });
    addImports(operationGroupDetails, operationInterfaceGroupFile, clientDetails);
    addInterface(operationInterfaceGroupFile, operationGroupDetails, clientDetails);
}
function getReturnType(operation, importedModels, modelNames) {
    var responseName = responseTypeUtils_1.getOperationResponseType(operation, importedModels, modelNames);
    return operation.isLRO
        ? "Promise<LROPoller<" + responseName + ">>"
        : "Promise<" + responseName + ">";
}
/**
 * Adds an Operation group interface to the generated file
 */
function addInterface(operationGroupFile, operationGroupDetails, clientDetails) {
    var importedModels = new Set();
    var allModelsNames = responseTypeUtils_1.getAllModelsNames(clientDetails);
    var interfaceName = nameUtils_1.normalizeName(operationGroupDetails.name, nameUtils_1.NameType.OperationGroup, true /** shouldGuard */);
    var operationGroupClass = operationGroupFile.addInterface({
        name: interfaceName,
        docs: ["Interface representing a " + interfaceName + "."],
        isExported: true
    });
    writeOperations(operationGroupDetails, operationGroupClass, importedModels, allModelsNames, clientDetails);
    // Use named import from Models
    if (importedModels.size) {
        // Add alias to any model that collides with the class name
        var namedImports = __spread(importedModels).map(function (model) {
            if (model === interfaceName) {
                return model + " as " + model + "Model";
            }
            return model;
        });
        operationGroupFile.addImportDeclaration({
            namedImports: namedImports,
            moduleSpecifier: "../models"
        });
    }
}
/**
 * Write operations signatures, extracted from OperationGroupDetails, to the generated file
 */
function writeOperations(operationGroupDetails, operationGroupInterface, importedModels, modelNames, clientDetails) {
    pagingOperations_1.preparePageableOperations(operationGroupDetails, clientDetails);
    pagingOperations_1.writeAsyncIterators(operationGroupDetails, clientDetails, operationGroupInterface, importedModels);
    operationGroupDetails.operations.forEach(function (operation) {
        if (operation.scope !== ts_morph_1.Scope.Private) {
            var baseMethodParameters = parameterUtils_1.getOperationParameterSignatures(operation, clientDetails.parameters, importedModels, operationGroupInterface).baseMethodParameters;
            var returnType = getReturnType(operation, importedModels, modelNames);
            var name = "" + (operation.namePrefix || "") + nameUtils_1.normalizeName(operation.name, nameUtils_1.NameType.Property);
            operationGroupInterface.addMethod({
                name: name,
                parameters: baseMethodParameters,
                returnType: returnType,
                docs: [
                    docsUtils_1.generateOperationJSDoc(baseMethodParameters, operation.description)
                ]
            });
        }
    });
}
exports.writeOperations = writeOperations;
/**
 * Adds required imports at the top of the file
 */
function addImports(operationGroupDetails, operationGroupFile, clientDetails) {
    pagingOperations_1.addPagingEsNextRef(operationGroupDetails.operations, clientDetails, operationGroupFile);
    tracingUtils_1.addTracingOperationImports(clientDetails, operationGroupFile);
    pagingOperations_1.addPagingImports(operationGroupDetails.operations, clientDetails, operationGroupFile);
    operationGroupFile.addImportDeclaration({
        namespaceImport: "coreHttp",
        moduleSpecifier: "@azure/core-http"
    });
    if (hasLROOperation(operationGroupDetails)) {
        operationGroupFile.addImportDeclaration({
            namedImports: ["LROPoller"],
            moduleSpecifier: "../lro"
        });
    }
}
function hasLROOperation(operationGroupDetails) {
    return operationGroupDetails.operations.some(function (o) { return o.isLRO; });
}
//# sourceMappingURL=operationInterfaceGenerator.js.map