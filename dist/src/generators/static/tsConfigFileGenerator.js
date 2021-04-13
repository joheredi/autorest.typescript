"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
function generateTsConfig(project) {
    const tsConfigContents = {
        compilerOptions: {
            module: "es6",
            moduleResolution: "node",
            strict: true,
            target: "es5",
            sourceMap: true,
            declarationMap: true,
            esModuleInterop: true,
            allowSyntheticDefaultImports: true,
            forceConsistentCasingInFileNames: true,
            preserveConstEnums: true,
            lib: ["es6", "dom"],
            declaration: true,
            outDir: "./esm",
            importHelpers: true
        },
        include: ["./src/**/*.ts"],
        exclude: ["node_modules"]
    };
    project.createSourceFile("tsconfig.json", JSON.stringify(tsConfigContents), {
        overwrite: true
    });
}
exports.generateTsConfig = generateTsConfig;
//# sourceMappingURL=tsConfigFileGenerator.js.map