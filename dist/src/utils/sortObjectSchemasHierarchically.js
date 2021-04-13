"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codemodel_1 = require("@azure-tools/codemodel");
const languageHelpers_1 = require("./languageHelpers");
/**
 * This function sorts objects in a topographical order
 * this is to make sure that mappers of parents are generated
 * before children to avoid issues trying to reference a mapper
 * before being defined.
 */
function sortObjectSchemasHierarchically(codeModel) {
    // Start processing objects without parents and walk the hierarchy
    // level by level
    const stack = (codeModel.schemas.objects || []).filter(o => 
    // Get objects that don't have any parents
    !o.parents ||
        o.parents.all.length === 0 ||
        // Or objects that have parents but none of them are Objects
        // this is to handle the case where an object's parent is a
        // DictionarySchema, common for additional properties
        !(o.parents.all.length &&
            o.parents.all.some(p => p.type === codemodel_1.SchemaType.Object)));
    const result = [];
    // Keep track of the processed schemas to avoid inserting one twice
    const processed = new Set();
    while (stack.length) {
        const current = stack.shift();
        if (!current) {
            continue;
        }
        const { name } = languageHelpers_1.getLanguageMetadata(current.language);
        if (processed.has(name)) {
            continue;
        }
        result.push(current);
        processed.add(name);
        const currentChildren = !current.children
            ? []
            : current.children.immediate.filter(c => c.type === codemodel_1.SchemaType.Object);
        stack.push(...currentChildren);
    }
    codeModel.schemas.objects = result;
}
exports.sortObjectSchemasHierarchically = sortObjectSchemasHierarchically;
//# sourceMappingURL=sortObjectSchemasHierarchically.js.map