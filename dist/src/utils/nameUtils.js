"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const languageHelpers_1 = require("./languageHelpers");
const modelDetails_1 = require("../models/modelDetails");
var NameType;
(function (NameType) {
    NameType[NameType["Class"] = 0] = "Class";
    NameType[NameType["File"] = 1] = "File";
    NameType[NameType["Interface"] = 2] = "Interface";
    NameType[NameType["Property"] = 3] = "Property";
    NameType[NameType["Parameter"] = 4] = "Parameter";
    NameType[NameType["Operation"] = 5] = "Operation";
    NameType[NameType["OperationGroup"] = 6] = "OperationGroup";
})(NameType = exports.NameType || (exports.NameType = {}));
const Newable = [NameType.Class, NameType.Interface, NameType.OperationGroup];
const ReservedModelNames = [
    { name: "any", reservedFor: [NameType.Parameter] },
    { name: "as", reservedFor: [NameType.Parameter] },
    { name: "boolean", reservedFor: [NameType.Parameter, ...Newable] },
    { name: "break", reservedFor: [NameType.Parameter] },
    { name: "case", reservedFor: [NameType.Parameter] },
    { name: "catch", reservedFor: [NameType.Parameter] },
    { name: "class", reservedFor: [NameType.Parameter] },
    { name: "const", reservedFor: [NameType.Parameter] },
    { name: "constructor", reservedFor: [NameType.Parameter] },
    { name: "continue", reservedFor: [NameType.Parameter] },
    { name: "date", reservedFor: [NameType.Parameter, ...Newable] },
    { name: "debugger", reservedFor: [NameType.Parameter] },
    { name: "declare", reservedFor: [NameType.Parameter] },
    { name: "default", reservedFor: [NameType.Parameter] },
    { name: "delete", reservedFor: [NameType.Parameter] },
    { name: "do", reservedFor: [NameType.Parameter] },
    { name: "else", reservedFor: [NameType.Parameter] },
    { name: "enum", reservedFor: [NameType.Parameter] },
    { name: "error", reservedFor: [NameType.Parameter, ...Newable] },
    { name: "export", reservedFor: [NameType.Parameter] },
    { name: "extends", reservedFor: [NameType.Parameter] },
    { name: "false", reservedFor: [NameType.Parameter] },
    { name: "finally", reservedFor: [NameType.Parameter] },
    { name: "for", reservedFor: [NameType.Parameter] },
    { name: "from", reservedFor: [NameType.Parameter] },
    { name: "function", reservedFor: [NameType.Parameter, ...Newable] },
    { name: "get", reservedFor: [NameType.Parameter] },
    { name: "if", reservedFor: [NameType.Parameter] },
    { name: "implements", reservedFor: [NameType.Parameter] },
    { name: "import", reservedFor: [NameType.Parameter] },
    { name: "in", reservedFor: [NameType.Parameter] },
    { name: "instanceof", reservedFor: [NameType.Parameter] },
    { name: "interface", reservedFor: [NameType.Parameter] },
    { name: "let", reservedFor: [NameType.Parameter] },
    { name: "module", reservedFor: [NameType.Parameter] },
    { name: "new", reservedFor: [NameType.Parameter] },
    { name: "null", reservedFor: [NameType.Parameter] },
    { name: "number", reservedFor: [NameType.Parameter, ...Newable] },
    { name: "of", reservedFor: [NameType.Parameter] },
    { name: "package", reservedFor: [NameType.Parameter] },
    { name: "private", reservedFor: [NameType.Parameter] },
    { name: "protected", reservedFor: [NameType.Parameter] },
    { name: "public", reservedFor: [NameType.Parameter] },
    { name: "requestoptions", reservedFor: [NameType.Parameter] },
    { name: "require", reservedFor: [NameType.Parameter] },
    { name: "return", reservedFor: [NameType.Parameter] },
    { name: "set", reservedFor: [NameType.Parameter, ...Newable] },
    { name: "static", reservedFor: [NameType.Parameter] },
    { name: "string", reservedFor: [NameType.Parameter, ...Newable] },
    { name: "super", reservedFor: [NameType.Parameter] },
    { name: "switch", reservedFor: [NameType.Parameter] },
    { name: "symbol", reservedFor: [NameType.Parameter, ...Newable] },
    { name: "this", reservedFor: [NameType.Parameter] },
    { name: "throw", reservedFor: [NameType.Parameter] },
    { name: "true", reservedFor: [NameType.Parameter] },
    { name: "try", reservedFor: [NameType.Parameter] },
    { name: "type", reservedFor: [NameType.Parameter] },
    { name: "typeof", reservedFor: [NameType.Parameter] },
    { name: "var", reservedFor: [NameType.Parameter] },
    { name: "void", reservedFor: [NameType.Parameter] },
    { name: "while", reservedFor: [NameType.Parameter] },
    { name: "with", reservedFor: [NameType.Parameter] },
    { name: "yield", reservedFor: [NameType.Parameter] }
];
var CasingConvention;
(function (CasingConvention) {
    CasingConvention[CasingConvention["Pascal"] = 0] = "Pascal";
    CasingConvention[CasingConvention["Camel"] = 1] = "Camel";
})(CasingConvention = exports.CasingConvention || (exports.CasingConvention = {}));
function guardReservedNames(name, nameType) {
    const suffix = getSuffix(nameType);
    return ReservedModelNames.filter(r => r.reservedFor.includes(nameType)).find(r => r.name === name.toLowerCase())
        ? `${name}${suffix}`
        : name;
}
exports.guardReservedNames = guardReservedNames;
function getSuffix(nameType) {
    switch (nameType) {
        case NameType.File:
        case NameType.Operation:
        case NameType.Property:
            return "";
        case NameType.OperationGroup:
            return "Operations";
        case NameType.Parameter:
            return "Param";
        case NameType.Class:
        case NameType.Interface:
        default:
            return "Model";
    }
}
/**
 * Returns a normalized Type name, this is, the type name capitalized when needed.
 * Otherwise, return the original typename, for example primitives "string", etc. don't need capitalization.
 */
function normalizeTypeName({ kind, typeName }) {
    // Only Enum and Composite kinds need normalization
    if ([modelDetails_1.PropertyKind.Enum, modelDetails_1.PropertyKind.Composite].includes(kind)) {
        return `${normalizeName(typeName, NameType.Interface)}`;
    }
    // Other kinds are already in the form they need to be
    return typeName;
}
exports.normalizeTypeName = normalizeTypeName;
function normalizeName(name, nameType, shouldGuard) {
    if (name.startsWith("$DO_NOT_NORMALIZE$")) {
        return name.replace("$DO_NOT_NORMALIZE$", "");
    }
    const casingConvention = getCasingConvention(nameType);
    const sanitizedName = sanitizeName(name);
    const parts = getNameParts(sanitizedName);
    const [firstPart, ...otherParts] = parts;
    const normalizedFirstPart = toCasing(firstPart, casingConvention);
    const normalizedParts = (otherParts || [])
        .map(part => part === "null" ? part : toCasing(part, CasingConvention.Pascal))
        .join("");
    const normalized = checkBeginning(`${normalizedFirstPart}${normalizedParts}`);
    return shouldGuard ? guardReservedNames(normalized, nameType) : normalized;
}
exports.normalizeName = normalizeName;
function checkBeginning(name) {
    if (name.startsWith("@")) {
        return name.substring(1);
    }
    return name;
}
function sanitizeName(name) {
    // Remove \, " and ' from name string
    return name.replace(/["'\\]+/g, "");
}
function getModelsName(title) {
    const spaceRemovedTitle = title.replace(/ /g, "");
    return `${spaceRemovedTitle.replace("Client", "")}Models`;
}
exports.getModelsName = getModelsName;
function getMappersName(title) {
    const spaceRemovedTitle = title.replace(/ /g, "");
    return `${spaceRemovedTitle.replace("Client", "")}Mappers`;
}
exports.getMappersName = getMappersName;
function getCasingConvention(nameType) {
    switch (nameType) {
        case NameType.Class:
        case NameType.Interface:
        case NameType.OperationGroup:
            return CasingConvention.Pascal;
        case NameType.File:
        case NameType.Property:
        case NameType.Operation:
        case NameType.Parameter:
            return CasingConvention.Camel;
    }
}
/**
 * TODO: Improve this function to handle cases such as TEST -> test. Current basic implementation
 * results in TEST -> test or Test (depending on the CasingConvention). We should switch to relay
 * on Modeler four namer for this once it is stable
 */
function toCasing(str, casing) {
    let value = str;
    if (value === value.toUpperCase()) {
        value = str.toLowerCase();
    }
    const firstChar = casing === CasingConvention.Pascal
        ? value.charAt(0).toUpperCase()
        : value.charAt(0).toLocaleLowerCase();
    return `${firstChar}${value.substring(1)}`;
}
function getNameParts(name) {
    let parts = name.split(/[-._ ]+/);
    return parts.length > 0 ? parts : [name];
}
function getOperationFullName(operationGroup, operation, clientName) {
    const groupName = normalizeName(languageHelpers_1.getLanguageMetadata(operationGroup.language).name || clientName, NameType.OperationGroup);
    const operationName = normalizeName(languageHelpers_1.getLanguageMetadata(operation.language).name, NameType.Operation);
    return `${groupName}_${operationName}`;
}
exports.getOperationFullName = getOperationFullName;
//# sourceMappingURL=nameUtils.js.map