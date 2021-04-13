"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Adds the required imports to have operations tracing
 * @param param0 clientDetails
 * @param sourceFile File to add imports to
 */
function addTracingOperationImports({ tracing }, sourceFile, traverseToRoot = "..") {
    if (tracing) {
        sourceFile.addImportDeclarations([
            {
                namedImports: ["CanonicalCode"],
                moduleSpecifier: "@opentelemetry/api"
            },
            {
                namedImports: ["createSpan"],
                moduleSpecifier: `${traverseToRoot}/tracing`
            }
        ]);
    }
}
exports.addTracingOperationImports = addTracingOperationImports;
//# sourceMappingURL=tracingUtils.js.map