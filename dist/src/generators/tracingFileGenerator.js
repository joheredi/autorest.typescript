"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const ts_morph_1 = require("ts-morph");
const nameUtils_1 = require("../utils/nameUtils");
function generateTracingFile(clientDetails, project) {
    if (clientDetails.tracing === undefined) {
        return;
    }
    const file = project.createSourceFile(`${clientDetails.srcPath}/tracing.ts`, undefined, {
        overwrite: true
    });
    file.addImportDeclarations([
        {
            namedImports: ["createSpanFunction"],
            moduleSpecifier: "@azure/core-http"
        }
    ]);
    writeCreateSpanFunction(file, clientDetails.tracing);
}
exports.generateTracingFile = generateTracingFile;
function writeCreateSpanFunction(file, tracing) {
    file.addVariableStatement({
        isExported: true,
        declarationKind: ts_morph_1.VariableDeclarationKind.Const,
        declarations: [
            {
                name: "createSpan",
                initializer: `createSpanFunction({
        namespace: "${tracing.namespace}",
        packagePrefix: "${tracing.packagePrefix}"
      });`
            }
        ]
    });
}
function getTelemetryPackageName({ nameWithoutScope }) {
    return nameWithoutScope
        .split(/[-._ ]+/)
        .map(part => nameUtils_1.normalizeName(part, nameUtils_1.NameType.Class));
}
function getTelemetryNamespace(packageDetails) {
    const { scopeName } = packageDetails;
    return [
        ...(scopeName ? [scopeName] : []),
        ...getTelemetryPackageName(packageDetails)
    ]
        .map(part => nameUtils_1.normalizeName(part, nameUtils_1.NameType.Class))
        .join(".");
}
//# sourceMappingURL=tracingFileGenerator.js.map