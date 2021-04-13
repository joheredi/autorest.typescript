"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const modelDetails_1 = require("../models/modelDetails");
const languageHelpers_1 = require("../utils/languageHelpers");
const nameUtils_1 = require("../utils/nameUtils");
const schemaHelpers_1 = require("../utils/schemaHelpers");
const extractHeaders_1 = require("../utils/extractHeaders");
function transformObjects(codeModel, uberParents) {
    const clientName = languageHelpers_1.getLanguageMetadata(codeModel.language).name;
    const objectSchemas = codeModel.schemas.objects || [];
    const headersSchemas = extractHeaders_1.extractHeaders(codeModel.operationGroups, clientName);
    const objectDetails = [...objectSchemas, ...headersSchemas].map(object => transformObject(object, uberParents));
    return getObjectDetailsWithHierarchy(objectDetails);
}
exports.transformObjects = transformObjects;
function transformObject(schema, uberParents) {
    const metadata = languageHelpers_1.getLanguageMetadata(schema.language);
    let name = nameUtils_1.normalizeName(metadata.name, nameUtils_1.NameType.Class, true /** shouldGuard */);
    const kind = getObjectKind(schema);
    let objectDetails = {
        children: [],
        parents: [],
        hasAdditionalProperties: false,
        kind,
        name,
        serializedName: metadata.serializedName,
        description: metadata.description || undefined,
        schema,
        properties: schema.properties
            ? schema.properties.map(prop => transformProperty(prop))
            : []
    };
    return getAdditionalObjectDetails(objectDetails, uberParents);
}
exports.transformObject = transformObject;
function transformProperty({ language, schema, serializedName, required, readOnly, nullable }) {
    const metadata = languageHelpers_1.getLanguageMetadata(language);
    const typeDetails = schemaHelpers_1.getTypeForSchema(schema);
    const { typeName, isConstant, defaultValue } = typeDetails;
    const schemaDescription = schemaHelpers_1.getSchemaTypeDocumentation(schema);
    const description = metadata.description
        ? `${metadata.description}${schemaDescription}`
        : schemaDescription;
    return {
        name: nameUtils_1.normalizeName(metadata.name, nameUtils_1.NameType.Property, true /** shouldGuard */),
        description,
        serializedName: serializedName,
        type: typeName,
        required: !!required,
        readOnly: !!readOnly,
        nullable: !!nullable,
        isConstant,
        defaultValue,
        typeDetails,
        isDiscriminator: false
    };
}
exports.transformProperty = transformProperty;
function getObjectKind(schema) {
    if (schema.discriminator || schema.discriminatorValue) {
        return modelDetails_1.ObjectKind.Polymorphic;
    }
    const immediateParents = schemaHelpers_1.getSchemaParents(schema, true /** immediateOnly */);
    if (immediateParents.length) {
        return modelDetails_1.ObjectKind.Extended;
    }
    return modelDetails_1.ObjectKind.Basic;
}
function getObjectDetailsWithHierarchy(objectsDetails) {
    return objectsDetails.map(current => {
        const parentsSchema = schemaHelpers_1.getSchemaParents(current.schema, true /** immediateOnly */);
        const childrenSchema = current.schema.children && current.schema.children.immediate;
        let parents = extractHierarchy(parentsSchema, objectsDetails, current);
        let children = extractHierarchy(childrenSchema, objectsDetails, current);
        const hasAdditionalProperties = Boolean(schemaHelpers_1.getAdditionalProperties(current.schema, true /** immediateOnly */));
        return {
            ...current,
            parents,
            children,
            hasAdditionalProperties
        };
    });
}
function extractHierarchy(schemas, objectsDetails, current) {
    if (!schemas || !schemas.length) {
        return [];
    }
    return schemas.map(r => {
        const relativeName = nameUtils_1.normalizeName(languageHelpers_1.getLanguageMetadata(r.language).name, nameUtils_1.NameType.Interface, true /** shouldGuard */);
        const relative = objectsDetails.find(o => o.name === relativeName);
        if (!relative) {
            throw new Error(`Expected relative ${relativeName} of ${current.name} but couldn't find it in transformed objects`);
        }
        return relative;
    });
}
function getAdditionalObjectDetails(objectDetails, uberParents) {
    switch (objectDetails.kind) {
        case modelDetails_1.ObjectKind.Basic:
            return objectDetails;
        case modelDetails_1.ObjectKind.Polymorphic:
            return transformPolymorphicObject(objectDetails, uberParents);
        case modelDetails_1.ObjectKind.Extended:
            return transformComposedObject(objectDetails);
        default:
            throw new Error(`Unexpected ObjectKind ${objectDetails.kind}`);
    }
}
function transformComposedObject(objectDetails) {
    const immediateParents = schemaHelpers_1.getSchemaParents(objectDetails.schema, true /** immediateOnly */);
    if (immediateParents.length < 1) {
        throw new Error(`Expected object ${objectDetails.name} to have parents`);
    }
    const parentNames = immediateParents.map(parent => {
        const name = languageHelpers_1.getLanguageMetadata(parent.language).name;
        return `${nameUtils_1.normalizeName(name, nameUtils_1.NameType.Interface, true /** shouldGuard */)}`;
    });
    return {
        ...objectDetails,
        parentNames
    };
}
function transformPolymorphicObject(objectDetails, uberParents) {
    const schema = objectDetails.schema;
    let uberParent = objectDetails.schema;
    const allParents = schemaHelpers_1.getSchemaParents(schema);
    if (allParents && allParents.length) {
        const uberParentSchema = allParents.find(p => {
            // TODO: Reconsider names to reduce issues with normalization, can we switch to serialized?
            const name = nameUtils_1.normalizeName(languageHelpers_1.getLanguageMetadata(p.language).name, nameUtils_1.NameType.Interface, true /** shouldGuard */);
            return uberParents.some(up => up.name === name);
        });
        if (!uberParentSchema) {
            const upn = uberParents.map(u => u.name);
            throw new Error(`Could not determine uberParent for Object ${objectDetails.name}. Make sure that swagger defines polymorphism correctly; UberParents: ${JSON.stringify(upn)}`);
        }
        uberParent = uberParentSchema;
    }
    const uberParentName = languageHelpers_1.getLanguageMetadata(uberParent.language).name;
    const unionName = `${nameUtils_1.normalizeName(uberParentName, nameUtils_1.NameType.Interface)}Union`;
    // Discriminator path is used to build a mapping between Discriminators and Mappers
    // this mapping is used by core-http during serialization.
    // Discriminator path is in the form <UberParent>.<discriminatorValue>
    let discriminatorPath;
    let discriminatorValues = {};
    if (schema === uberParent && schema.children) {
        // When the object is a top level parent, its discriminatorPath is itself
        discriminatorPath = `${uberParentName}`;
        const discriminatorProperty = languageHelpers_1.getLanguageMetadata(uberParent.discriminator.property.language).name;
        const children = schema.children.all;
        const childDiscriminators = children
            .map(c => c.discriminatorValue)
            .filter(c => !!c);
        const propertyToMark = objectDetails.properties.find(p => p.name === discriminatorProperty);
        if (propertyToMark) {
            propertyToMark.isDiscriminator = true;
        }
        discriminatorValues = !childDiscriminators.length
            ? {}
            : { [`"${discriminatorProperty}"`]: childDiscriminators };
    }
    else {
        discriminatorPath = `${uberParentName}.${schema.discriminatorValue}`;
        if (uberParent.discriminator) {
            discriminatorValues = {
                [languageHelpers_1.getLanguageMetadata(uberParent.discriminator.property.language)
                    .name]: [schema.discriminatorValue]
            };
        }
    }
    return {
        discriminatorValues,
        discriminatorPath,
        unionName,
        ...objectDetails
    };
}
//# sourceMappingURL=objectTransforms.js.map