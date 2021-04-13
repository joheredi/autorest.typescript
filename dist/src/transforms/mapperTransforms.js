"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const codemodel_1 = require("@azure-tools/codemodel");
const core_http_1 = require("@azure/core-http");
const languageHelpers_1 = require("../utils/languageHelpers");
const lodash_1 = require("lodash");
const nameUtils_1 = require("../utils/nameUtils");
const extractHeaders_1 = require("../utils/extractHeaders");
const codegen_1 = require("@azure-tools/codegen");
const schemaHelpers_1 = require("../utils/schemaHelpers");
const valueHelpers_1 = require("../utils/valueHelpers");
const primitiveSchemaTypes = [
    codemodel_1.SchemaType.Boolean,
    codemodel_1.SchemaType.Char,
    codemodel_1.SchemaType.Duration
];
/**
 * Function that runs a set of functions as a pipeline
 * if any function processed the input, remaining ones will skip
 * @param fns functions in the pipeline
 */
const pipe = (...fns) => (x) => fns.reduce((v, f) => (!v.isHandled ? f(v) : v), x);
async function transformMappers(codeModel, uberParents, { mediaTypes }) {
    var _a;
    const clientName = languageHelpers_1.getLanguageMetadata(codeModel.language).name;
    if (!codeModel.schemas.objects) {
        return [];
    }
    const uberParentsNames = uberParents.map(up => up.name);
    const hasXmlMetadata = (_a = mediaTypes) === null || _a === void 0 ? void 0 : _a.has(codegen_1.KnownMediaType.Xml);
    return [
        ...codeModel.schemas.objects,
        ...extractHeaders_1.extractHeaders(codeModel.operationGroups, clientName)
    ].map(objectSchema => transformMapper({
        schema: objectSchema,
        options: { hasXmlMetadata, uberParents: uberParentsNames }
    }));
}
exports.transformMappers = transformMappers;
/**
 * Transform a schema into a Mapper
 * @param mapperInput An object consisting of a schema and EntityOptions
 */
function transformMapper({ schema, options }) {
    const processMapper = pipe(transformStringMapper, transformNumberMapper, transformConstantMapper, transformDateMapper, transformTimeMapper, transformChoiceMapper, transformPrimitiveMapper, transformByteArrayMapper, transformBinaryMapper, transformObjectMapper, transformArrayMapper, transformDictionaryMapper, transformUuidMapper, transformAnyMapper);
    const { mapper } = processMapper({ schema, options });
    if (!mapper) {
        throw new Error(`Couldn't transfrom mapper from schema: ${schema.type}`);
    }
    return mapper;
}
exports.transformMapper = transformMapper;
/**
 * Gets a className from a schema
 * @param schema Schema to get the className from
 */
function getMapperClassName(schema) {
    return nameUtils_1.normalizeName(languageHelpers_1.getLanguageMetadata(schema.language).name, nameUtils_1.NameType.Class, true /** shouldGuard */);
}
exports.getMapperClassName = getMapperClassName;
function buildMapper(schema, type, options = {}) {
    const required = !!options.required;
    const readOnly = !!options.readOnly;
    const nullable = !!options.nullable;
    // Handle x-ms-discriminator-value Extension. More info:
    // https://github.com/Azure/autorest/tree/master/docs/extensions/swagger-extensions-examples/x-ms-discriminator-value
    const serializedName = getDiscriminatorValue(schema) ||
        options.serializedName ||
        // Fallback to name only for XML schemas since they need a name, otherwise don't
        (options.hasXmlMetadata && languageHelpers_1.getLanguageMetadata(schema.language).name);
    const arraySchema = schema;
    arraySchema.elementType;
    const stringSchema = schema;
    const numberSchema = schema;
    const hasConstraints = !lodash_1.isNil(arraySchema.maxItems) ||
        !lodash_1.isNil(arraySchema.minItems) ||
        !lodash_1.isNil(arraySchema.uniqueItems) ||
        !lodash_1.isNil(stringSchema.maxLength) ||
        !lodash_1.isNil(stringSchema.minLength) ||
        !lodash_1.isNil(stringSchema.pattern) ||
        !lodash_1.isNil(numberSchema.multipleOf) ||
        !lodash_1.isNil(numberSchema.maximum) ||
        !lodash_1.isNil(numberSchema.minimum);
    const constraints = {
        ...(arraySchema.minItems && { MinItems: arraySchema.minItems }),
        ...(arraySchema.maxItems && { MaxItems: arraySchema.maxItems }),
        ...(arraySchema.uniqueItems && { UniqueItems: arraySchema.uniqueItems }),
        ...(stringSchema.maxLength && { MaxLength: stringSchema.maxLength }),
        ...(stringSchema.minLength && { MinLength: stringSchema.minLength }),
        ...(stringSchema.pattern && { Pattern: new RegExp(stringSchema.pattern) }),
        ...(numberSchema.maximum !== null && numberSchema.maximum !== undefined
            ? numberSchema.exclusiveMaximum
                ? { ExclusiveMaximum: numberSchema.maximum }
                : { InclusiveMaximum: numberSchema.maximum }
            : {}),
        ...(numberSchema.minimum !== null && numberSchema.minimum !== undefined
            ? numberSchema.exclusiveMinimum
                ? { ExclusiveMinimum: numberSchema.minimum }
                : { InclusiveMinimum: numberSchema.minimum }
            : {}),
        ...(numberSchema.multipleOf && { MultipleOf: numberSchema.multipleOf })
    };
    const xmlMetadata = getXmlMetadata(schema, options);
    const mappeType = type;
    return {
        ...{ type: mappeType },
        ...(serializedName && { serializedName }),
        ...(!!schema.defaultValue && {
            defaultValue: schema.defaultValue
        }),
        ...(required && { required }),
        ...(readOnly && { readOnly }),
        ...(nullable && { nullable }),
        ...(hasConstraints && { constraints }),
        ...xmlMetadata
    };
}
function transformPrimitiveMapper(pipelineValue) {
    const { schema, options } = pipelineValue;
    if (!isSchemaType(primitiveSchemaTypes, schema)) {
        return pipelineValue;
    }
    const type = {
        name: getMapperTypeFromSchema(schema.type)
    };
    const mapper = buildMapper(schema, type, options);
    return {
        schema,
        mapper,
        isHandled: true
    };
}
function getXmlMetadata(schema, { hasXmlMetadata, serializedName }) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (!hasXmlMetadata) {
        return {};
    }
    let xmlElementName = undefined;
    let xmlNamespace = (_b = (_a = schema.serialization) === null || _a === void 0 ? void 0 : _a.xml) === null || _b === void 0 ? void 0 : _b.namespace;
    let xmlNamespacePrefix = (_d = (_c = schema.serialization) === null || _c === void 0 ? void 0 : _c.xml) === null || _d === void 0 ? void 0 : _d.prefix;
    if (schema.type === codemodel_1.SchemaType.Array) {
        const elementSchema = schema.elementType;
        const languageMetadata = languageHelpers_1.getLanguageMetadata(elementSchema.language);
        xmlElementName =
            ((_f = (_e = elementSchema.serialization) === null || _e === void 0 ? void 0 : _e.xml) === null || _f === void 0 ? void 0 : _f.name) ||
                languageMetadata.serializedName ||
                languageMetadata.name;
    }
    const defaultName = serializedName || languageHelpers_1.getLanguageMetadata(schema.language).serializedName;
    const { name, attribute: xmlIsAttribute, wrapped: xmlIsWrapped } = ((_g = schema.serialization) === null || _g === void 0 ? void 0 : _g.xml) || {};
    const xmlName = name || defaultName;
    return {
        ...(xmlName && { xmlName }),
        ...(xmlIsAttribute && { xmlIsAttribute }),
        ...(xmlIsWrapped && { xmlIsWrapped }),
        ...(xmlElementName && { xmlElementName }),
        ...(xmlNamespace && { xmlNamespace }),
        ...(xmlNamespacePrefix && { xmlNamespacePrefix })
    };
}
function buildAdditionalProperties(objectSchema) {
    const additionalProperties = schemaHelpers_1.getAdditionalProperties(objectSchema);
    return additionalProperties
        ? {
            type: {
                name: core_http_1.MapperType.Object
            }
        }
        : undefined;
}
function isUberParent(objectSchema) {
    const { parents, children } = objectSchema;
    return !parents && children && children.all && children.all.length;
}
function transformObjectMapper(pipelineValue) {
    var _a;
    const { schema, options } = pipelineValue;
    if (!isSchemaType([codemodel_1.SchemaType.Object], schema)) {
        return pipelineValue;
    }
    const className = getMapperClassName(schema);
    const objectSchema = schema;
    const { discriminator, discriminatorValue } = objectSchema;
    let modelProperties = processProperties(objectSchema.properties, options);
    const parents = schemaHelpers_1.getSchemaParents(objectSchema);
    const immediateParents = schemaHelpers_1.getSchemaParents(objectSchema, true /** immediateOnly */);
    const parentsRefs = immediateParents
        .map(p => getMapperClassName(p))
        .filter(p => p !== className);
    const additionalProperties = buildAdditionalProperties(objectSchema);
    modelProperties = {
        ...modelProperties,
        ...(parentsRefs && parentsRefs.length && { parentsRefs })
    };
    const uberParents = ((_a = options) === null || _a === void 0 ? void 0 : _a.uberParents) || [];
    // If we find a new uber parent, store it
    if (uberParents.indexOf(className) < 0 && isUberParent(objectSchema)) {
        uberParents.push(className);
    }
    // If any of the parents is present in uberParents we know it
    // is its uber parent
    const uberParent = getMapperClassName(parents.find(p => uberParents.includes(getMapperClassName(p))) || schema);
    const mapper = buildMapper(schema, {
        name: core_http_1.MapperType.Composite,
        className,
        modelProperties,
        ...(discriminatorValue && {
            uberParent,
            polymorphicDiscriminator: `${uberParent}.type.polymorphicDiscriminator`
        }),
        ...(discriminator && {
            uberParent,
            polymorphicDiscriminator: {
                serializedName: discriminator.property.serializedName,
                clientName: discriminator.property.serializedName
            }
        }),
        ...(additionalProperties && { additionalProperties })
    }, options);
    return {
        schema,
        mapper,
        isHandled: true
    };
}
function transformDictionaryMapper(pipelineValue) {
    const { schema, options } = pipelineValue;
    if (!isSchemaType([codemodel_1.SchemaType.Dictionary], schema)) {
        return pipelineValue;
    }
    const dictionarySchema = schema;
    const elementSchema = dictionarySchema.elementType;
    const mapper = buildMapper(schema, { name: core_http_1.MapperType.Dictionary, value: getMapperOrRef(elementSchema) }, options);
    return {
        schema,
        mapper,
        isHandled: true
    };
}
function transformArrayMapper(pipelineValue) {
    const { schema, options } = pipelineValue;
    if (!isSchemaType([codemodel_1.SchemaType.Array], schema)) {
        return pipelineValue;
    }
    const arraySchema = schema;
    const elementSchema = arraySchema.elementType;
    const mapper = buildMapper(schema, {
        name: core_http_1.MapperType.Sequence,
        element: getMapperOrRef(elementSchema)
    }, options);
    return {
        schema,
        mapper,
        isHandled: true
    };
}
function transformBinaryMapper(pipelineValue) {
    const { schema, options } = pipelineValue;
    if (!isSchemaType([codemodel_1.SchemaType.Binary], schema)) {
        return pipelineValue;
    }
    const schemaType = core_http_1.MapperType.Stream;
    const mapper = buildMapper(schema, {
        name: schemaType
    }, options);
    return {
        schema,
        mapper,
        isHandled: true
    };
}
function transformByteArrayMapper(pipelineValue) {
    const { schema, options } = pipelineValue;
    if (!isSchemaType([codemodel_1.SchemaType.ByteArray], schema)) {
        return pipelineValue;
    }
    const byteArraySchema = schema;
    const schemaType = byteArraySchema.format === "base64url"
        ? core_http_1.MapperType.Base64Url
        : core_http_1.MapperType.ByteArray;
    const mapper = buildMapper(schema, {
        name: schemaType
    }, options);
    return {
        schema,
        mapper,
        isHandled: true
    };
}
function transformChoiceMapper(pipelineValue) {
    const { schema, options } = pipelineValue;
    if (!isSchemaType([codemodel_1.SchemaType.SealedChoice, codemodel_1.SchemaType.Choice], schema)) {
        return pipelineValue;
    }
    const choiceSchema = schema;
    let type;
    if (isSchemaType([codemodel_1.SchemaType.Choice], schema)) {
        if (choiceSchema.choiceType && choiceSchema.choiceType.type) {
            type = {
                name: getMapperTypeFromSchema(choiceSchema.choiceType.type)
            };
        }
        else {
            type = {
                name: core_http_1.MapperType.String
            };
        }
    }
    else {
        type = {
            name: core_http_1.MapperType.Enum,
            allowedValues: choiceSchema.choices.map(choice => choice.value)
        };
    }
    const mapper = buildMapper(schema, type, options);
    return {
        schema,
        mapper,
        isHandled: true
    };
}
function transformDateMapper(pipelineValue) {
    const { schema, options } = pipelineValue;
    if (!isSchemaType([codemodel_1.SchemaType.Date, codemodel_1.SchemaType.DateTime, codemodel_1.SchemaType.UnixTime], schema)) {
        return pipelineValue;
    }
    const { format } = schema;
    const mapper = buildMapper(schema, { name: getMapperTypeFromSchema(schema.type, format) }, options);
    return {
        schema,
        mapper,
        isHandled: true
    };
}
function transformTimeMapper(pipelineValue) {
    const { schema, options } = pipelineValue;
    if (!isSchemaType([codemodel_1.SchemaType.Time], schema)) {
        return pipelineValue;
    }
    const mapper = buildMapper(schema, { name: getMapperTypeFromSchema(schema.type) }, options);
    return {
        schema,
        mapper,
        isHandled: true
    };
}
function transformStringMapper(pipelineValue) {
    const { schema, options } = pipelineValue;
    /**
     * Note: SchemaCredential is treated as a string for mapping purposes. According to OpenApi v3
     * the "password" format on a string schema is `A hint to UIs to obscure input.`
     * So for mapping this has no effect. However when generating models we are including a hint
     * as part of the documentation. For more information:
     * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#data-types
     */
    if (!isSchemaType([codemodel_1.SchemaType.String, codemodel_1.SchemaType.Credential, codemodel_1.SchemaType.Uri], schema)) {
        return pipelineValue;
    }
    const mapper = buildMapper(schema, { name: core_http_1.MapperType.String }, options);
    return {
        schema,
        mapper,
        isHandled: true
    };
}
function transformConstantMapper(pipelineValue) {
    const { schema, options } = pipelineValue;
    if (!isSchemaType([codemodel_1.SchemaType.Constant], schema)) {
        return pipelineValue;
    }
    const serializedName = (options && options.serializedName) ||
        languageHelpers_1.getLanguageMetadata(schema.language).serializedName;
    const constantSchema = schema;
    const mapper = {
        ...transformMapper({ schema: constantSchema.valueType }),
        defaultValue: constantSchema.value.value,
        isConstant: true,
        ...(serializedName && { serializedName })
    };
    return {
        schema,
        mapper,
        isHandled: true
    };
}
function transformNumberMapper(pipelineValue) {
    const { schema, options } = pipelineValue;
    if (!codemodel_1.isNumberSchema(schema)) {
        return pipelineValue;
    }
    const mapper = buildMapper(schema, { name: core_http_1.MapperType.Number }, options);
    return {
        schema,
        mapper,
        isHandled: true
    };
}
function transformAnyMapper(pipelineValue) {
    const { schema, options } = pipelineValue;
    if (!isSchemaType([codemodel_1.SchemaType.Any], schema)) {
        return pipelineValue;
    }
    const mapper = buildMapper(schema, { name: "any" }, options);
    return {
        schema,
        mapper,
        isHandled: true
    };
}
function transformUuidMapper(pipelineValue) {
    const { schema, options } = pipelineValue;
    if (!isSchemaType([codemodel_1.SchemaType.Uuid], schema)) {
        return pipelineValue;
    }
    const mapper = buildMapper(schema, { name: "Uuid" }, options);
    return {
        schema,
        mapper,
        isHandled: true
    };
}
function processProperties(properties = [], options = {}) {
    let modelProperties = {};
    properties.forEach(prop => {
        const serializedName = getPropertySerializedName(prop);
        const propName = languageHelpers_1.getLanguageMetadata(prop.language).name;
        const name = nameUtils_1.normalizeName(propName, nameUtils_1.NameType.Property, true /** shouldGuard */);
        modelProperties[name] = getMapperOrRef(prop.schema, serializedName, {
            ...options,
            required: prop.required,
            readOnly: prop.readOnly,
            nullable: prop.nullable,
            serializedName
        });
    });
    return modelProperties;
}
function getPropertySerializedName({ flattenedNames, serializedName }) {
    if (!flattenedNames || !flattenedNames.length) {
        return serializedName;
    }
    return flattenedNames
        .map(name => {
        // Escaping names
        ["."].forEach(character => {
            name = name.replace(character, `\\${character}`);
        });
        return name;
    })
        .join(".");
}
/**
 * Gets the discriminator value
 * The extension x-ms-discriminator-value can be used to override
 */
function getDiscriminatorValue(schema) {
    return ((schema.extensions && schema.extensions["x-ms-discriminator-value"]) ||
        schema.discriminatorValue);
}
function getMapperOrRef(schema, serializedName, options = {}) {
    if (isSchemaType([codemodel_1.SchemaType.Object], schema)) {
        // When the property is an object, we just need to reference the class
        // instead of building a mapper.
        const xmlMetadata = getXmlMetadata(schema, options);
        return {
            ...(serializedName && { serializedName }),
            ...xmlMetadata,
            type: {
                name: core_http_1.MapperType.Composite,
                className: getMapperClassName(schema)
            }
        };
    }
    return transformMapper({
        schema,
        options
    });
}
exports.getMapperOrRef = getMapperOrRef;
function isSchemaType(matchSchemas, { type }) {
    return matchSchemas.includes(type);
}
exports.isSchemaType = isSchemaType;
function getMapperTypeFromSchema(type, format) {
    switch (type) {
        case codemodel_1.SchemaType.Array:
            return core_http_1.MapperType.Sequence;
        case codemodel_1.SchemaType.Boolean:
            return core_http_1.MapperType.Boolean;
        case codemodel_1.SchemaType.ByteArray:
            return core_http_1.MapperType.ByteArray;
        case codemodel_1.SchemaType.Char:
        case codemodel_1.SchemaType.Credential:
        case codemodel_1.SchemaType.String:
        case codemodel_1.SchemaType.Uri:
            return core_http_1.MapperType.String;
        case codemodel_1.SchemaType.Choice:
            return core_http_1.MapperType.String;
        case codemodel_1.SchemaType.SealedChoice:
            return core_http_1.MapperType.Enum;
        case codemodel_1.SchemaType.Duration:
            return core_http_1.MapperType.TimeSpan;
        case codemodel_1.SchemaType.DateTime:
            return format === "date-time-rfc1123"
                ? core_http_1.MapperType.DateTimeRfc1123
                : core_http_1.MapperType.DateTime;
        case codemodel_1.SchemaType.UnixTime:
            return core_http_1.MapperType.UnixTime;
        case codemodel_1.SchemaType.Date:
            return core_http_1.MapperType.Date;
        case codemodel_1.SchemaType.Time:
            return core_http_1.MapperType.String;
        case codemodel_1.SchemaType.Dictionary:
            return core_http_1.MapperType.Dictionary;
        case codemodel_1.SchemaType.Integer:
        case codemodel_1.SchemaType.Number:
            return core_http_1.MapperType.Number;
        case codemodel_1.SchemaType.Object:
            return core_http_1.MapperType.Object;
        case codemodel_1.SchemaType.Any:
            return valueHelpers_1.MapperTypes.any;
        case codemodel_1.SchemaType.Uuid:
            return valueHelpers_1.MapperTypes.Uuid;
        default:
            throw new Error(`There is no known Mapper type for schema type ${type}`);
    }
}
exports.getMapperTypeFromSchema = getMapperTypeFromSchema;
//# sourceMappingURL=mapperTransforms.js.map