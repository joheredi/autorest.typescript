"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateIndexFile(clientDetails, project) {
    const indexFile = project.createSourceFile(`${clientDetails.srcPath}/index.ts`, undefined, {
        overwrite: true
    });
    if (clientDetails.options.hasPaging &&
        !clientDetails.options.disablePagingAsyncIterators) {
        indexFile.addStatements([`/// <reference lib="esnext.asynciterable" />`]);
    }
    indexFile.addExportDeclarations([
        {
            moduleSpecifier: "./models"
        },
        {
            moduleSpecifier: `./${clientDetails.sourceFileName}`,
            namedExports: [clientDetails.className]
        },
        {
            moduleSpecifier: `./${clientDetails.sourceFileName}Context`,
            namedExports: [`${clientDetails.className}Context`]
        }
    ]);
}
exports.generateIndexFile = generateIndexFile;
//# sourceMappingURL=indexGenerator.js.map