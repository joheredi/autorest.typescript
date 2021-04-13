"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codemodel_1 = require("@azure-tools/codemodel");
const languageHelpers_1 = require("../utils/languageHelpers");
function headersToSchema(headers, operationFullName, isError) {
    if (!headers || !headers.length) {
        return undefined;
    }
    const headersSchema = new codemodel_1.ObjectSchema(`${operationFullName}${isError ? "Exception" : ""}Headers`, `Defines headers for ${operationFullName} operation.`);
    headers.forEach(({ header, language, schema }) => {
        if (!headersSchema.properties) {
            headersSchema.properties = [];
        }
        const { description, name } = languageHelpers_1.getLanguageMetadata(language);
        headersSchema.properties.push(new codemodel_1.Property(name, description, schema, {
            // core-http serializer requires Header serialized names to be lowercase
            serializedName: header.toLocaleLowerCase()
        }));
    });
    return headersSchema;
}
exports.headersToSchema = headersToSchema;
//# sourceMappingURL=headersToSchema.js.map