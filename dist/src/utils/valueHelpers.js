"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const codemodel_1 = require("@azure-tools/codemodel");
const lodash_1 = require("lodash");
var MapperTypes;
(function (MapperTypes) {
    MapperTypes["Base64Url"] = "Base64Url";
    MapperTypes["Boolean"] = "Boolean";
    MapperTypes["ByteArray"] = "ByteArray";
    MapperTypes["Date"] = "Date";
    MapperTypes["DateTime"] = "DateTime";
    MapperTypes["DateTimeRfc1123"] = "DateTimeRfc1123";
    MapperTypes["Enum"] = "Enum";
    MapperTypes["Object"] = "Object";
    MapperTypes["Stream"] = "Stream";
    MapperTypes["String"] = "String";
    MapperTypes["TimeSpan"] = "TimeSpan";
    MapperTypes["UnixTime"] = "UnixTime";
    MapperTypes["Uuid"] = "Uuid";
    MapperTypes["Number"] = "Number";
    MapperTypes["Sequence"] = "Sequence";
    MapperTypes["any"] = "any";
})(MapperTypes = exports.MapperTypes || (exports.MapperTypes = {}));
/**
 * Gets the string representation of a value to be used during code generation
 * @param value value to get
 * @param valueType Types of the value
 * @param quotedStrings whether or not we should enclose value in quotes
 */
function getStringForValue(value, valueType, quotedStrings = true, mapperType) {
    switch (valueType) {
        case codemodel_1.SchemaType.ByteArray:
        case MapperTypes.ByteArray:
            // TODO: Encode defaultValue for non-empty array in a platform agnostic way
            // previous autorest version doesn't seem to support non-empty here
            const byteArrayValue = lodash_1.isNil(value) || lodash_1.isEmpty(value) ? 0 : `"${value}"`;
            return `new Uint8Array(${byteArrayValue})`;
        case codemodel_1.SchemaType.Number:
        case MapperTypes.Number:
        case codemodel_1.SchemaType.Integer:
        case codemodel_1.SchemaType.Boolean:
        case MapperTypes.Boolean:
            return value;
        case codemodel_1.SchemaType.Uuid:
        case MapperTypes.Uuid:
        case codemodel_1.SchemaType.Date:
        case MapperTypes.Date:
        case codemodel_1.SchemaType.DateTime:
        case MapperTypes.DateTime:
        case codemodel_1.SchemaType.Duration:
        case codemodel_1.SchemaType.String:
        case MapperTypes.String:
        case MapperTypes.TimeSpan:
        case codemodel_1.SchemaType.Choice:
        case MapperTypes.Enum:
            const valueString = !!value ? value.toString() : "";
            return quotedStrings ? `"${valueString}"` : `${valueString}`;
        case MapperTypes.Sequence:
            if (mapperType) {
                return getStringForValue(value, mapperType.element.type.name);
            }
        default:
            throw new Error(`Unexpected value type: ${valueType}`);
    }
}
exports.getStringForValue = getStringForValue;
//# sourceMappingURL=valueHelpers.js.map