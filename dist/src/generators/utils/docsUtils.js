"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parameterUtils_1 = require("./parameterUtils");
const stringUtils_1 = require("./stringUtils");
function generateOperationJSDoc(params = [], description = "") {
    const paramJSDoc = !params || !params.length ? "" : parameterUtils_1.formatJsDocParam(params).join("\n");
    return `${description ? stringUtils_1.wrapString(description) + "\n" : description}${paramJSDoc}`;
}
exports.generateOperationJSDoc = generateOperationJSDoc;
//# sourceMappingURL=docsUtils.js.map