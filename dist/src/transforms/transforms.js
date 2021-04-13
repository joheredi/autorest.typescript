"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const codemodel_1 = require("@azure-tools/codemodel");
const nameUtils_1 = require("../utils/nameUtils");
const valueHelpers_1 = require("../utils/valueHelpers");
const languageHelpers_1 = require("../utils/languageHelpers");
const mapperTransforms_1 = require("./mapperTransforms");
const operationTransforms_1 = require("./operationTransforms");
const optionsTransforms_1 = require("./optionsTransforms");
const parameterTransforms_1 = require("./parameterTransforms");
const objectTransforms_1 = require("./objectTransforms");
const urlTransforms_1 = require("./urlTransforms");
const extensions_1 = require("./extensions");
const groupTransforms_1 = require("./groupTransforms");
const schemaHelpers_1 = require("../utils/schemaHelpers");
const sortObjectSchemasHierarchically_1 = require("../utils/sortObjectSchemasHierarchically");
async function transformChoices(codeModel) {
    const choices = [
        ...(codeModel.schemas.choices || []),
        ...(codeModel.schemas.sealedChoices || [])
    ];
    return choices.map(transformChoice);
}
exports.transformChoices = transformChoices;
function extractProperties(choice) {
    return choice.choices.map(c => {
        var _a, _b, _c;
        const metadata = languageHelpers_1.getLanguageMetadata(c.language);
        return {
            name: metadata.name,
            value: valueHelpers_1.getStringForValue(c.value, (_c = (_b = (_a = choice) === null || _a === void 0 ? void 0 : _a.choiceType) === null || _b === void 0 ? void 0 : _b.type, (_c !== null && _c !== void 0 ? _c : codemodel_1.SchemaType.String)), false),
            description: metadata.description
        };
    });
}
function transformChoice(choice) {
    const metadata = languageHelpers_1.getLanguageMetadata(choice.language);
    let name = nameUtils_1.normalizeName(metadata.name, nameUtils_1.NameType.Interface);
    let schemaType = choice.type;
    let itemType = 
    //@ts-ignore
    choice.choiceType.type === codemodel_1.SchemaType.Integer ||
        //@ts-ignore
        choice.choiceType.type === codemodel_1.SchemaType.Number
        ? codemodel_1.SchemaType.Number
        : choice.choiceType.type;
    return {
        name,
        schemaType,
        itemType,
        description: `Defines values for ${metadata.name}.`,
        serializedName: metadata.name,
        properties: extractProperties(choice)
    };
}
exports.transformChoice = transformChoice;
async function transformCodeModel(codeModel, host) {
    const { name: clientName } = languageHelpers_1.getLanguageMetadata(codeModel.language);
    const className = nameUtils_1.normalizeName(clientName, nameUtils_1.NameType.Class, true /** shouldGuard */);
    sortObjectSchemasHierarchically_1.sortObjectSchemasHierarchically(codeModel);
    extensions_1.normalizeModelWithExtensions(codeModel);
    const [uberParents, operationGroups] = await Promise.all([
        getUberParents(codeModel),
        operationTransforms_1.transformOperationGroups(codeModel)
    ]);
    const options = await optionsTransforms_1.transformOptions(host, operationGroups);
    const baseUrl = urlTransforms_1.transformBaseUrl(codeModel);
    const [objects, groups, mappers, unions, parameters] = await Promise.all([
        objectTransforms_1.transformObjects(codeModel, uberParents),
        groupTransforms_1.transformGroups(codeModel),
        mapperTransforms_1.transformMappers(codeModel, uberParents, options),
        transformChoices(codeModel),
        parameterTransforms_1.transformParameters(codeModel, options)
    ]);
    return {
        name: className,
        className,
        description: codeModel.info.description,
        sourceFileName: nameUtils_1.normalizeName(className, nameUtils_1.NameType.File),
        objects: [...objects, ...groups],
        mappers,
        unions,
        operationGroups,
        parameters,
        options,
        endpoint: baseUrl
    };
}
exports.transformCodeModel = transformCodeModel;
/**
 * This function gets all top level objects with children, aka UberParents
 * An UberParent is an object schema that has no parents but is extended
 * @param codeModel CodeModel
 */
async function getUberParents(codeModel) {
    if (!codeModel.schemas.objects) {
        return [];
    }
    let uberParents = [];
    codeModel.schemas.objects.forEach(object => {
        const name = languageHelpers_1.getLanguageMetadata(object.language).name;
        const isPresent = uberParents.some(up => up.name === name);
        const hasChildren = object.children && object.children.all.length;
        const hasParents = schemaHelpers_1.getSchemaParents(object).length > 0;
        if (hasChildren && !hasParents && !isPresent) {
            const baseObject = objectTransforms_1.transformObject(object, uberParents);
            uberParents.push(baseObject);
        }
    });
    return uberParents;
}
//# sourceMappingURL=transforms.js.map