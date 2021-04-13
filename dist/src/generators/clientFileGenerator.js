"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const operationGenerator_1 = require("./operationGenerator");
const nameUtils_1 = require("../utils/nameUtils");
const codemodel_1 = require("@azure-tools/codemodel");
const parameterUtils_1 = require("./utils/parameterUtils");
const importUtils_1 = require("./utils/importUtils");
const responseTypeUtils_1 = require("./utils/responseTypeUtils");
const tracingUtils_1 = require("./utils/tracingUtils");
const pagingOperations_1 = require("./utils/pagingOperations");
function generateClient(clientDetails, project, hideClients) {
    const clientContextClassName = `${clientDetails.className}Context`;
    const hasMappers = !!clientDetails.mappers.length;
    // Check if there are any client level operations
    const inlineOperations = clientDetails.operationGroups.filter(og => og.isTopLevel);
    const hasInlineOperations = inlineOperations.length > 0;
    // Check if there are any non client-level operations to import
    const importedOperations = clientDetails.operationGroups.filter(og => !og.isTopLevel);
    const hasImportedOperations = importedOperations.length > 0;
    if (hasImportedOperations && hasInlineOperations) {
        // Check if there is a name collision between client-level operation names
        // and operation group key names.
        checkForNameCollisions(importedOperations, inlineOperations);
    }
    const hasCredentials = !!clientDetails.options.addCredentials;
    const hasClientOptionalParams = clientDetails.parameters.some(p => !p.required && p.implementationLocation === codemodel_1.ImplementationLocation.Client);
    const clientFile = project.createSourceFile(`${clientDetails.srcPath}/${clientDetails.sourceFileName}.ts`, undefined, {
        overwrite: true
    });
    (hasCredentials || hasInlineOperations || !hasClientOptionalParams) &&
        clientFile.addImportDeclaration({
            namespaceImport: "coreHttp",
            moduleSpecifier: "@azure/core-http"
        });
    const flattenedInlineOperations = inlineOperations.reduce((acc, curr) => (acc = [...acc, ...curr.operations]), []);
    pagingOperations_1.addPagingImports(flattenedInlineOperations, clientDetails, clientFile);
    const hasLRO = inlineOperations.some(og => og.operations.some(o => o.isLRO));
    if (hasInlineOperations && hasLRO) {
        clientFile.addImportDeclaration({
            namedImports: ["LROPoller", "shouldDeserializeLRO"],
            moduleSpecifier: "./lro"
        });
    }
    if (hasImportedOperations) {
        clientFile.addImportDeclaration({
            namedImports: importedOperations.map(o => nameUtils_1.normalizeName(o.name, nameUtils_1.NameType.OperationGroup, true /* shouldGuard */)),
            moduleSpecifier: "./operations"
        });
    }
    if (hasInlineOperations && importUtils_1.shouldImportParameters(clientDetails)) {
        tracingUtils_1.addTracingOperationImports(clientDetails, clientFile, ".");
        clientFile.addImportDeclaration({
            namespaceImport: "Parameters",
            moduleSpecifier: "./models/parameters"
        });
    }
    // Only import mappers if there are any
    if (hasInlineOperations && hasMappers) {
        clientFile.addImportDeclaration({
            namespaceImport: "Mappers",
            moduleSpecifier: "./models/mappers"
        });
    }
    clientFile.addImportDeclaration({
        namedImports: [clientContextClassName],
        moduleSpecifier: `./${clientDetails.sourceFileName}Context`
    });
    const clientClass = clientFile.addClass({
        name: clientDetails.className,
        extends: clientContextClassName,
        isExported: true
    });
    if (hideClients) {
        clientClass.addJsDoc({
            tags: [{
                    tagName: "hidden"
                }],
        });
    }
    const importedModels = new Set();
    writeConstructor(clientDetails, clientClass, importedModels);
    writeClientOperations(clientFile, clientClass, clientDetails, hasLRO, importedModels);
    // Use named import from Models
    if (importedModels.size) {
        clientFile.addImportDeclaration({
            namedImports: [...importedModels],
            moduleSpecifier: "./models"
        });
    }
}
exports.generateClient = generateClient;
function checkForNameCollisions(importedOperations, inlineOperations) {
    const groupOpsKeyNames = importedOperations.map(og => og.key.toLowerCase());
    const inlineOpsKeyNames = inlineOperations.map(og => og.operations.map(operation => operation.name.toLowerCase()));
    const collidingKeyNames = inlineOpsKeyNames.map(inlineOpsKeyArray => inlineOpsKeyArray.filter(inlineOpKey => groupOpsKeyNames.includes(inlineOpKey)));
    if (collidingKeyNames.length > 0 && collidingKeyNames[0].length > 0) {
        const messages = collidingKeyNames.map(key => `Operation Group(s) '${key}' is/are colliding with client-level operation(s) with the same name.`);
        throw new Error(...messages);
    }
}
exports.checkForNameCollisions = checkForNameCollisions;
function writeConstructor(clientDetails, classDeclaration, importedModels) {
    const requiredParams = clientDetails.parameters.filter(param => param.required &&
        param.implementationLocation === codemodel_1.ImplementationLocation.Client &&
        !param.defaultValue &&
        param.schemaType !== codemodel_1.SchemaType.Constant);
    const hasClientOptionalParameters = clientDetails.parameters.some(param => !param.required &&
        param.implementationLocation === codemodel_1.ImplementationLocation.Client);
    const docs = [
        `Initializes a new instance of the ${clientDetails.className} class.`,
        ...parameterUtils_1.formatJsDocParam(requiredParams),
        `@param options The parameter options`
    ]
        .filter(d => !!d)
        .join("\n");
    let optionsParameterType = "ServiceClientOptions";
    if (hasClientOptionalParameters) {
        const paramType = `${clientDetails.className}OptionalParams`;
        importedModels.add(paramType);
        optionsParameterType = paramType;
    }
    requiredParams.forEach(({ typeDetails }) => typeDetails.usedModels.forEach(model => importedModels.add(model)));
    const clientConstructor = classDeclaration.addConstructor({
        docs: [docs],
        parameters: [
            ...requiredParams.map(p => ({
                name: p.name,
                hasQuestionToken: !p.required,
                type: p.typeDetails.typeName
            })),
            {
                name: "options",
                hasQuestionToken: true,
                type: optionsParameterType
            }
        ]
    });
    clientConstructor.addStatements([
        `super(${[...requiredParams.map(p => p.name), "options"].join()});`
    ]);
    const operationDeclarationDetails = getOperationGroupsDeclarationDetails(clientDetails.operationGroups.filter(og => !og.isTopLevel));
    clientConstructor.addStatements([
        ...operationDeclarationDetails.map(({ name, typeName }) => `this.${name} = new ${typeName}(this)`)
    ]);
}
function getOperationGroupsDeclarationDetails(operationGroups) {
    return operationGroups.map(og => {
        return {
            name: nameUtils_1.normalizeName(og.name, nameUtils_1.NameType.Property),
            typeName: `${nameUtils_1.normalizeName(og.name, nameUtils_1.NameType.OperationGroup, true /* shouldGuard */)}`
        };
    });
}
function writeClientOperations(file, classDeclaration, clientDetails, hasLRO, importedModels) {
    const allModelsNames = responseTypeUtils_1.getAllModelsNames(clientDetails);
    const topLevelGroup = clientDetails.operationGroups.find(og => og.isTopLevel);
    const hasMappers = !!clientDetails.mappers.length;
    // Add top level operation groups as client properties
    if (!!topLevelGroup) {
        if (hasLRO) {
            operationGenerator_1.writeGetOperationOptions(classDeclaration);
        }
        operationGenerator_1.writeOperations(topLevelGroup, classDeclaration, importedModels, allModelsNames, clientDetails, true // isInline,
        );
        operationGenerator_1.addOperationSpecs(topLevelGroup, file, clientDetails.parameters, hasMappers);
    }
    const operationsDeclarationDetails = getOperationGroupsDeclarationDetails(clientDetails.operationGroups.filter(og => !og.isTopLevel));
    // Each operation group will have its class
    // and the client class will have each group as properties
    classDeclaration.addProperties(operationsDeclarationDetails.map(op => {
        return {
            name: op.name,
            type: op.typeName
        };
    }));
}
//# sourceMappingURL=clientFileGenerator.js.map