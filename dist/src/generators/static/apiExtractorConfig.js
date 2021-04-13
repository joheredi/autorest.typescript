"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
function generateApiExtractorConfig(clientDetails, project) {
    const config = {
        $schema: "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",
        mainEntryPointFilePath: `./esm/index.d.ts`,
        docModel: {
            enabled: true
        },
        apiReport: {
            enabled: true,
            reportFolder: "./review"
        },
        dtsRollup: {
            enabled: true,
            untrimmedFilePath: "",
            publicTrimmedFilePath: `./esm/index.d.ts`
        },
        messages: {
            tsdocMessageReporting: {
                default: {
                    logLevel: "none"
                }
            },
            extractorMessageReporting: {
                "ae-missing-release-tag": {
                    logLevel: "none"
                },
                "ae-unresolved-link": {
                    logLevel: "none"
                }
            }
        }
    };
    project.createSourceFile("api-extractor.json", JSON.stringify(config), {
        overwrite: true
    });
}
exports.generateApiExtractorConfig = generateApiExtractorConfig;
//# sourceMappingURL=apiExtractorConfig.js.map