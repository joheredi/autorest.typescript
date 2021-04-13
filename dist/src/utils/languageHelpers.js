"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
function getLanguageMetadata(languages) {
    return languages.typescript || languages.javascript || languages.default;
}
exports.getLanguageMetadata = getLanguageMetadata;
//# sourceMappingURL=languageHelpers.js.map