"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IndentationType;
(function (IndentationType) {
    IndentationType[IndentationType["None"] = 0] = "None";
    IndentationType[IndentationType["JSDocParam"] = 1] = "JSDocParam";
})(IndentationType = exports.IndentationType || (exports.IndentationType = {}));
exports.wrapString = (string, { width = 100, indentationType = IndentationType.None, paramNameLength = 0 } = {}) => {
    const indentation = getIndentation(indentationType, paramNameLength);
    return string.replace(new RegExp(`(?![^\\n]{1,${width}}$)([^\\n]{1,${width}})\\s`, "g"), `$1\n${indentation}`);
};
const getIndentation = (indentationType, paramNameLength) => {
    switch (indentationType) {
        case IndentationType.JSDocParam:
            return " ".repeat(" @param ".length + paramNameLength);
        default:
            return "";
    }
};
//# sourceMappingURL=stringUtils.js.map