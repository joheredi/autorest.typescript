"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_morph_1 = require("ts-morph");
const nameUtils_1 = require("../../utils/nameUtils");
const parameterUtils_1 = require("./parameterUtils");
const docsUtils_1 = require("./docsUtils");
const responseTypeUtils_1 = require("./responseTypeUtils");
/**
 * Adds the required imports for paging operations
 * @param param0 clientDetails
 * @param sourceFile File to add imports to
 */
function addPagingImports(operations, { options }, sourceFile) {
    if (!options.disablePagingAsyncIterators &&
        hasAsyncIteratorOperations(operations)) {
        sourceFile.addImportDeclarations([
            {
                namedImports: ["PagedAsyncIterableIterator"],
                moduleSpecifier: "@azure/core-paging"
            }
        ]);
    }
}
exports.addPagingImports = addPagingImports;
/**
 * Checks whether or not an operation group contains any pageable operations
 * that would need AsyncIterators
 */
function hasAsyncIteratorOperations(operations) {
    return operations.some(o => o.pagination);
}
exports.hasAsyncIteratorOperations = hasAsyncIteratorOperations;
/**
 * This function prepares the initial and next operations to be generated using
 * AsyncIterators, adding some extra metadata sunc as scope and prefix

 */
function preparePageableOperations(operationGroupDetails, clientDetails) {
    if (clientDetails.options.disablePagingAsyncIterators) {
        return;
    }
    operationGroupDetails.operations
        .filter(o => o.pagination)
        .forEach(operation => {
        operation.scope = ts_morph_1.Scope.Private;
        operation.namePrefix = "_";
    });
}
exports.preparePageableOperations = preparePageableOperations;
/**
 * This function generates all the required methods for the pageable operation
 * using AsyncIterators. It generates 3 extra methods on top of the initial and next operations
 * One public method, one private page method whcih gets results per page, and an All method that
 * iterates throug pages, returning all results in a single collection
 */
function writeAsyncIterators(operationGroupDetails, clientDetails, operationGroupClass, importedModels) {
    if (clientDetails.options.disablePagingAsyncIterators) {
        return;
    }
    operationGroupDetails.operations
        // We can skip "next" operations since covering the original is enough. Otherwise we'll end up with duplicate methods.
        .filter(o => o.pagination && !o.pagination.isNextLinkMethod)
        .forEach(operation => {
        var _a, _b, _c, _d, _e;
        const initialOperationName = nameUtils_1.normalizeName(operation.name, nameUtils_1.NameType.Operation);
        const nextOperationName = nameUtils_1.normalizeName(((_a = operation.pagination) === null || _a === void 0 ? void 0 : _a.nextLinkOperationName) || initialOperationName, nameUtils_1.NameType.Operation);
        const nextOperation = operationGroupDetails.operations.find(o => {
            var _a, _b;
            return o.name.toLocaleLowerCase() === ((_b = (_a = operation.pagination) === null || _a === void 0 ? void 0 : _a.nextLinkOperationName) === null || _b === void 0 ? void 0 : _b.toLocaleLowerCase());
        });
        // We need to figure out the body response type to be able to set the return types properly
        const bodyResponseType = responseTypeUtils_1.getPagingResponseBodyType(operation);
        // Since we'll be using this type name for importing, we need to make sure that it is not in
        // the form of array [], just need the name.
        let bodyResponseTypeName = ((_b = bodyResponseType) === null || _b === void 0 ? void 0 : _b.typeName.replace("[]", "")) || "";
        // In case the type name collides with the operation group class we need to append Model to the name
        if (bodyResponseTypeName === operationGroupDetails.name) {
            bodyResponseTypeName = `${bodyResponseTypeName}Model`;
        }
        if (!bodyResponseType) {
            throw new Error(`Pageable operation ${initialOperationName} has no return values`);
        }
        // Keep track of the models we'll need to import
        (_c = bodyResponseType) === null || _c === void 0 ? void 0 : _c.usedModels.forEach(m => importedModels.add(m));
        let nextMethodParameters = null;
        if (nextOperation) {
            nextMethodParameters = parameterUtils_1.getOperationParameterSignatures(nextOperation, clientDetails.parameters, importedModels, operationGroupClass).baseMethodParameters.map(parameter => {
                if (parameter.name === "nextLink") {
                    return { ...parameter, hasQuestionToken: true };
                }
                return parameter;
            });
        }
        const { baseMethodParameters: initialMethodParameters } = parameterUtils_1.getOperationParameterSignatures(operation, clientDetails.parameters, importedModels, operationGroupClass);
        // Build an object with all the information about the paging methods
        // while generating each of the paging methods, this will help up access
        // information about the other methods.
        const pagingMethodSettings = {
            initialMethod: {
                name: `${operation.namePrefix}${initialOperationName}`,
                parameters: initialMethodParameters
            },
            nextMethod: nextMethodParameters
                ? {
                    name: `${operation.namePrefix}${nextOperationName}`,
                    parameters: nextMethodParameters
                }
                : undefined,
            publicMethod: {
                name: getPublicMethodName(initialOperationName),
                parameters: initialMethodParameters
            },
            allMethod: {
                name: `${initialOperationName}PagingAll`,
                parameters: initialMethodParameters
            },
            pageMethod: {
                name: `${initialOperationName}PagingPage`,
                parameters: initialMethodParameters
            },
            bodyResponseType: bodyResponseTypeName,
            nextLinkName: ((_d = operation.pagination) === null || _d === void 0 ? void 0 : _d.nextLinkName) || "nextLink",
            itemName: ((_e = operation.pagination) === null || _e === void 0 ? void 0 : _e.itemName) || "value"
        };
        writePublicMethod(operation, operationGroupClass, pagingMethodSettings);
        writePageMethod(operation, operationGroupClass, pagingMethodSettings);
        writeAllMethod(operationGroupClass, pagingMethodSettings);
    });
}
exports.writeAsyncIterators = writeAsyncIterators;
/**
 * This method enforces Azure SDK Typescript guideline that paging methods should be named list*
 * https://azure.github.io/azure-sdk/typescript_design.html#ts-pagination-provide-list
 */
function getPublicMethodName(initialOperationName) {
    if (initialOperationName.indexOf("list") === 0) {
        return initialOperationName;
    }
    if (initialOperationName.indexOf("get") === 0) {
        return initialOperationName.replace("get", "list");
    }
    const initialName = nameUtils_1.normalizeName(initialOperationName, nameUtils_1.NameType.Class);
    return `list${initialName}`;
}
/**
 * Generates the content of the public method, here we reference the other 2 methods All and Page
 */
function writePublicMethod(operation, operationGroupClass, pagingMethodSettings) {
    const returnType = `PagedAsyncIterableIterator<${pagingMethodSettings.bodyResponseType}>`;
    const method = operationGroupClass.addMethod({
        name: pagingMethodSettings.publicMethod.name,
        parameters: pagingMethodSettings.publicMethod.parameters,
        scope: ts_morph_1.Scope.Public,
        returnType,
        docs: [
            docsUtils_1.generateOperationJSDoc(pagingMethodSettings.publicMethod.parameters, operation.description)
        ]
    });
    // Extract the parameter names for the All method to call it
    let allMethodParameters = pagingMethodSettings.allMethod.parameters
        .map(p => p.name)
        .join();
    // Extract the parameter names for the page method to call it
    const pageMethodNameParams = pagingMethodSettings.pageMethod.parameters
        .map(p => p.name)
        .join();
    method.addStatements([
        `const iter = this.${pagingMethodSettings.allMethod.name}(${allMethodParameters});`,
        `return {
        next() {
          return iter.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        },
        byPage: () => {
          return this.${pagingMethodSettings.pageMethod.name}(${pageMethodNameParams});
        }
      };`
    ]);
}
/**
 * Generates the All method which loops through all the pages and returns an iterator for all the results
 */
function writeAllMethod(operationGroupClass, pagingMethodSettings) {
    const returnType = `AsyncIterableIterator<${pagingMethodSettings.bodyResponseType}>`;
    // Gets the page method parameters to use when calling it.
    const pageMethodParameters = pagingMethodSettings.pageMethod.parameters
        .map(p => p.name)
        .join();
    const method = operationGroupClass.addMethod({
        name: `*${pagingMethodSettings.allMethod.name}`,
        parameters: pagingMethodSettings.initialMethod.parameters,
        scope: ts_morph_1.Scope.Private,
        returnType,
        isAsync: true
    });
    method.addStatements([
        `for await (const page of this.${pagingMethodSettings.pageMethod.name}(${pageMethodParameters})) {
        yield *page
     }`
    ]);
}
function writePageMethod(operation, operationGroupClass, pagingMethodSettings) {
    const returnType = `AsyncIterableIterator<${pagingMethodSettings.bodyResponseType}[]>`;
    // Name of the property that contains the page value
    const itemName = pagingMethodSettings.itemName;
    // Name of the property that contains the nextLink
    const nextLinkProperty = nameUtils_1.normalizeName(pagingMethodSettings.nextLinkName, nameUtils_1.NameType.Property);
    // Extract the names for the initial method parameters
    const initialMethodParameters = pagingMethodSettings.initialMethod.parameters
        .map(p => p.name)
        .join();
    const method = operationGroupClass.addMethod({
        name: `*${pagingMethodSettings.pageMethod.name}`,
        parameters: pagingMethodSettings.pageMethod.parameters,
        scope: ts_morph_1.Scope.Private,
        returnType,
        isAsync: true
    });
    let firstRequestStatements = [
        `let result = await this.${pagingMethodSettings.initialMethod.name}(${initialMethodParameters});`
    ];
    if (operation.isLRO) {
        // Since this is also an LRO operation, we need to poll until done to get the result
        firstRequestStatements = [
            `const poller = await this.${pagingMethodSettings.initialMethod.name}(${initialMethodParameters});`,
            `let result: any = await poller.pollUntilDone();`
        ];
    }
    method.addStatements([
        ...firstRequestStatements,
        `yield result.${itemName} || [];`
    ]);
    // There is a scenario where there is no nextMethod, just the initial one, in that case we don't need to loop
    // until we no longer have a continuationToken, we just stop there.
    // Otherwise we generate the below code to loop
    if (pagingMethodSettings.nextMethod) {
        // Extract the parameters to send to the nextMethod
        const nextParameters = pagingMethodSettings.nextMethod.parameters
            // renaming nextLink to continuationToken sice it is the name we are using below and to avoid collisions with the
            // nextLink parameter that this (page method) takes.
            .map(p => (p.name === "nextLink" ? "continuationToken" : p.name))
            .join();
        method.addStatements([
            `let continuationToken = result.${nextLinkProperty}`
        ]);
        method.addStatements([
            `while (continuationToken) {
        result = await this.${pagingMethodSettings.nextMethod.name}(${nextParameters});
        continuationToken = result.${nextLinkProperty}
        yield result.${itemName} || [];
      }`
        ]);
    }
}
//# sourceMappingURL=pagingOperations.js.map