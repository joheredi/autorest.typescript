"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const modelDetails_1 = require("../models/modelDetails");
const codemodel_1 = require("@azure-tools/codemodel");
const valueHelpers_1 = require("./valueHelpers");
const languageHelpers_1 = require("./languageHelpers");
const nameUtils_1 = require("./nameUtils");
/**
 * Extracts parents from an ObjectSchema
 * by default it extracts all parameters unless
 * immediateOnly = true is passed
 */
function getSchemaParents({ parents }, immediateOnly = false) {
    if (!parents) {
        return [];
    }
    const allParents = immediateOnly
        ? parents.immediate
        : parents.all;
    return allParents.filter(p => p.type === codemodel_1.SchemaType.Object);
}
exports.getSchemaParents = getSchemaParents;
/**
 * Extracts the additional properties for an object schema
 * if immediateOnly is true, it will only extract additionalProperties defined directly
 * in the schema, otherwise it will get it from any of its parents
 */
function getAdditionalProperties({ parents }, immediateOnly = false) {
    if (!parents) {
        return undefined;
    }
    const allParents = immediateOnly
        ? parents.immediate
        : parents.all;
    return allParents.find(p => p.type === codemodel_1.SchemaType.Dictionary);
}
exports.getAdditionalProperties = getAdditionalProperties;
/**
 * Helper function which given a schema returns type information for useful for generating Typescript code
 * @param schema schema to extract type information from
 */
function getTypeForSchema(schema, isNullable = false) {
    let typeName = "";
    let usedModels = [];
    let defaultValue = "";
    let kind = modelDetails_1.PropertyKind.Primitive;
    switch (schema.type) {
        case codemodel_1.SchemaType.Any:
            typeName = "any";
            break;
        case codemodel_1.SchemaType.Array:
            const arraySchema = schema;
            const itemsType = getTypeForSchema(arraySchema.elementType, arraySchema.nullableItems);
            const itemsName = itemsType.typeName;
            kind = itemsType.kind;
            // In the case that this type is SomeType | null, it is necessary to wrap
            // in brackets such that the array type is constructed correctly as
            // (SomeType | null)[]
            const wrappedItemsName = itemsType.nullable
                ? "(" + itemsName + ")"
                : itemsName;
            typeName = `${wrappedItemsName}[]`;
            if (isModelNeeded(itemsType)) {
                usedModels.push(itemsName);
            }
            break;
        case codemodel_1.SchemaType.Boolean:
            typeName = "boolean";
            break;
        case codemodel_1.SchemaType.Binary:
            typeName = "coreHttp.HttpRequestBody";
            break;
        case codemodel_1.SchemaType.ByteArray:
            typeName = "Uint8Array";
            break;
        case codemodel_1.SchemaType.Choice:
        case codemodel_1.SchemaType.SealedChoice:
            const { name: choiceName } = languageHelpers_1.getLanguageMetadata(schema.language);
            typeName = choiceName;
            kind = modelDetails_1.PropertyKind.Enum;
            usedModels.push(choiceName);
            break;
        case codemodel_1.SchemaType.Constant:
            const constantSchema = schema;
            const constantType = getTypeForSchema(constantSchema.valueType);
            kind = constantType.kind;
            if (isModelNeeded(constantType)) {
                usedModels.push(typeName);
            }
            defaultValue = valueHelpers_1.getStringForValue(constantSchema.value.value, constantSchema.valueType.type, false);
            typeName = constantType.typeName;
            break;
        case codemodel_1.SchemaType.DateTime:
        case codemodel_1.SchemaType.Date:
        case codemodel_1.SchemaType.UnixTime:
            typeName = "Date";
            break;
        case codemodel_1.SchemaType.Duration:
            typeName = "string";
            break;
        case codemodel_1.SchemaType.Dictionary:
            const dictionarySchema = schema;
            const elementType = getTypeForSchema(dictionarySchema.elementType, dictionarySchema.nullableItems);
            const elementTypeName = elementType.typeName;
            kind = modelDetails_1.PropertyKind.Dictionary;
            typeName = `{[propertyName: string]: ${elementTypeName}}`;
            if (isModelNeeded(elementType)) {
                usedModels.push(elementTypeName);
            }
            break;
        case codemodel_1.SchemaType.Number:
        case codemodel_1.SchemaType.Integer:
            typeName = "number";
            break;
        case codemodel_1.SchemaType.Object:
            const objSchema = schema;
            const name = nameUtils_1.normalizeName(languageHelpers_1.getLanguageMetadata(schema.language).name, nameUtils_1.NameType.Interface, true /** shouldGuard */);
            // Polymorphic objects with children will get a union type as type
            // since they can take different shapes
            const isUnionType = !!(objSchema.discriminator || objSchema.discriminatorValue) &&
                !!objSchema.children &&
                !!objSchema.children.immediate.length;
            typeName = isUnionType ? `${name}Union` : name;
            kind = modelDetails_1.PropertyKind.Composite;
            usedModels.push(typeName);
            break;
        case codemodel_1.SchemaType.String:
        case codemodel_1.SchemaType.Char:
        case codemodel_1.SchemaType.Time:
        case codemodel_1.SchemaType.Uuid:
        case codemodel_1.SchemaType.Uri:
        case codemodel_1.SchemaType.Credential:
            typeName = "string";
            break;
        default:
            throw new Error(`Handling of ${schema.type} hasn't been implemented yet`);
    }
    typeName = isNullable ? typeName + " | null" : typeName;
    return {
        typeName,
        kind,
        usedModels,
        isConstant: schema.type === codemodel_1.SchemaType.Constant,
        nullable: isNullable,
        ...(defaultValue && { defaultValue })
    };
}
exports.getTypeForSchema = getTypeForSchema;
function isModelNeeded({ kind }) {
    return [modelDetails_1.PropertyKind.Composite, modelDetails_1.PropertyKind.Enum].includes(kind);
}
function isSchemaResponse(response) {
    // check fields that should exist to determine if this is a SchemaResponse
    return typeof response.schema !== "undefined";
}
exports.isSchemaResponse = isSchemaResponse;
/**
 * Gets special information to include as documentation when generating certain
 * schema types.
 */
function getSchemaTypeDocumentation(schema) {
    switch (schema.type) {
        case codemodel_1.SchemaType.Time:
            return `\nThis value should be an ISO-8601 formatted string representing time. E.g. "HH:MM:SS" or "HH:MM:SS.mm".`;
        case codemodel_1.SchemaType.Credential:
            return `\nThis value contains a credential. Consider obscuring before showing to users`;
        default:
            return "";
    }
}
exports.getSchemaTypeDocumentation = getSchemaTypeDocumentation;
//# sourceMappingURL=schemaHelpers.js.map