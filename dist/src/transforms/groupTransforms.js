"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codemodel_1 = require("@azure-tools/codemodel");
const languageHelpers_1 = require("../utils/languageHelpers");
const modelDetails_1 = require("../models/modelDetails");
const objectTransforms_1 = require("./objectTransforms");
function transformGroups(codeModel) {
    return (codeModel.schemas.groups || []).map(transformGroup);
}
exports.transformGroups = transformGroups;
function transformGroup({ language, properties }) {
    const { name, description } = languageHelpers_1.getLanguageMetadata(language);
    const groupProperties = (properties || []).map(objectTransforms_1.transformProperty);
    return {
        children: [],
        parents: [],
        hasAdditionalProperties: false,
        kind: modelDetails_1.ObjectKind.Basic,
        name,
        // Groups are created by modelerfour so they don't have a serializedName
        serializedName: name,
        description: description || undefined,
        schema: new codemodel_1.ObjectSchema(name, description),
        properties: groupProperties
    };
}
//# sourceMappingURL=groupTransforms.js.map