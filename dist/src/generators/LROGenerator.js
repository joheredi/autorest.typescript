"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
async function generateLROFiles(clientDetails, project) {
    if (!hasAnyLRO(clientDetails.operationGroups)) {
        return;
    }
    const lroDir = path_1.join(__dirname, "..", "..", "..", "src", "lro");
    const lroFiles = await fs_1.promises.readdir(lroDir);
    for (let i = 0; i < lroFiles.length; i++) {
        const file = lroFiles[i];
        const filePath = path_1.join(lroDir, file);
        const fileContent = await fs_1.promises.readFile(filePath, "utf-8");
        project.createSourceFile(path_1.join(clientDetails.srcPath || "", "lro", file), fileContent, { overwrite: true });
    }
}
exports.generateLROFiles = generateLROFiles;
function hasAnyLRO(operationGroups) {
    return operationGroups.some(og => og.operations.some(o => o.isLRO));
}
//# sourceMappingURL=LROGenerator.js.map