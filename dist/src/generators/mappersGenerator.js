"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const ts_morph_1 = require("ts-morph");
const nameUtils_1 = require("../utils/nameUtils");
const core_http_1 = require("@azure/core-http");
const lodash_1 = require("lodash");
const valueHelpers_1 = require("../utils/valueHelpers");
const modelDetails_1 = require("../models/modelDetails");
const logger_1 = require("../utils/logger");
function generateMappers(clientDetails, project) {
    if (!clientDetails.mappers.length) {
        logger_1.logger.info("No mappers in code model, skipping mapper file generation");
        return;
    }
    const mappersFile = project.createSourceFile(`${clientDetails.srcPath}/models/mappers.ts`, undefined, { overwrite: true });
    writeMappers(mappersFile, clientDetails);
    writeDiscriminatorsMapping(mappersFile, clientDetails);
    mappersFile.addImportDeclaration({
        namespaceImport: "coreHttp",
        moduleSpecifier: "@azure/core-http"
    });
}
exports.generateMappers = generateMappers;
/**
 * This function writes to the mappers.ts file all the mappers to be used by @azure/core-http for serialization
 */
function writeMappers(sourceFile, { mappers }) {
    const generatedMappers = new Map();
    mappers.forEach(mapper => {
        const mapperClassName = mapper.type.className;
        if (!mapperClassName) {
            logger_1.logger.warning(`Expected a mapper with a className, skipping generation`);
            logger_1.logger.verbose(JSON.stringify(mapper));
            return;
        }
        const existingMapper = generatedMappers.get(mapperClassName);
        if (existingMapper) {
            if (lodash_1.isEqual(existingMapper, mapper)) {
                // If we already generated the same mapper, skip
                return;
            }
            throw new Error("There are different mapper definitions with the same name. This may be caused by a Swagger defining multiple Success responses with different return types");
        }
        sourceFile.addVariableStatement({
            isExported: true,
            declarations: [
                {
                    name: nameUtils_1.normalizeName(mapper.type.className || "MISSING_MAPPER", nameUtils_1.NameType.Class),
                    type: "coreHttp.CompositeMapper",
                    initializer: writer => writeMapper(writer, mapper)
                }
            ],
            declarationKind: ts_morph_1.VariableDeclarationKind.Const,
            leadingTrivia: writer => writer.blankLine()
        });
        // Keep track of the mapper we just generated
        generatedMappers.set(mapperClassName, mapper);
    });
}
function getAllPolymorphicObjects({ objects }) {
    return objects
        .filter(object => object.kind === modelDetails_1.ObjectKind.Polymorphic)
        .map(object => object);
}
/**
 * This function generates a mapping which is used by @azure/core-http for serializing
 * polymorphic objects. This is a mapping tells core-http which mapper to use, given a
 * discriminator value.
 */
function writeDiscriminatorsMapping(sourceFile, clientDetails) {
    let discriminatorMappers = {};
    // Populate discriminatorMappers
    getAllPolymorphicObjects(clientDetails).forEach(object => {
        const { name: mapperName, discriminatorPath } = object;
        discriminatorMappers[discriminatorPath] = mapperName;
    });
    if (!lodash_1.isEmpty(discriminatorMappers)) {
        sourceFile.addVariableStatement({
            isExported: true,
            declarations: [
                {
                    name: "discriminators",
                    initializer: writer => {
                        writer.block(() => {
                            lodash_1.keys(discriminatorMappers).forEach(key => {
                                writer.write(`'${key}': ${discriminatorMappers[key]},`);
                            });
                        });
                    }
                }
            ],
            leadingTrivia: writer => writer.blankLine()
        });
    }
}
function writeMapper(writer, mapper) {
    const parents = extractParents(mapper);
    // We want to handle modelProperties and polimorphicDiscriminator
    // so we extract them from the type object. The remaining of the type
    // object we'll just write all its properties as they are using writeObjectProps
    const { type, defaultValue, constraints, ...restMapper } = mapper;
    writer.block(() => {
        // we need to handle default value differently, since some types need to be
        // converted, such as ByteAttay, hence extracting it from the props
        writeDefaultValue(writer, defaultValue, type);
        // Write mapper constraints
        writeMapperContraints(writer, constraints);
        // Writing the rest of the props
        writeObjectProps(restMapper, writer)
            .write("type:")
            .block(() => {
            // Write tipe properties for the current mapper
            writeMapperType(writer, mapper.type, parents);
        });
    });
}
exports.writeMapper = writeMapper;
/**
 * Figures out if the mapper type to generate is a Sequence or Composite
 * mapper type and generates it.
 */
function writeMapperType(writer, mapperType, parents) {
    if (isSequenceMapperType(mapperType)) {
        return writeSequenceMapperType(writer, mapperType);
    }
    return writeCompositeMapperType(writer, mapperType, parents);
}
/**
 * Check if a MapperType is a SequenceMapperType
 */
function isSequenceMapperType(mapperType) {
    return mapperType.element !== undefined;
}
/**
 * Generates the type content for a CompositeMapperType
 */
function writeCompositeMapperType(writer, mapperType, parents) {
    const { modelProperties, polymorphicDiscriminator, ...restType } = mapperType;
    writeObjectProps(restType, writer);
    // Write type properties that need special handling
    writePolymorphicDiscriminator(writer, polymorphicDiscriminator);
    writeModelProperties(writer, parents, modelProperties);
}
/**
 * Generates the type content for a SequenceMapperType
 */
function writeSequenceMapperType(writer, mapperType) {
    const sequenceMapperType = mapperType;
    const { element } = sequenceMapperType;
    if (!element) {
        return writer;
    }
    writer.write(`name: "${core_http_1.MapperType.Sequence}",`);
    writer.write("element:");
    return writeMapper(writer, element);
}
function writeMapperContraints(writer, constraints) {
    if (!constraints) {
        return writer;
    }
    const { Pattern, ...restContstraints } = constraints;
    return writer
        .write("constraints:")
        .block(() => {
        if (Pattern) {
            writer.write(`Pattern: new RegExp("${Pattern.source}"), `);
        }
        writeObjectProps(restContstraints, writer);
    })
        .write(",");
}
function writeModelProperties(writer, parents = [], modelProperties = {}) {
    if (lodash_1.isEmpty(parents) && lodash_1.isEmpty(modelProperties)) {
        return writer;
    }
    return writer.write("modelProperties:").block(() => {
        // We'll first inherit from the parents and then write
        // its own mappers, it will look like this when generated
        // modelProperties: {
        //  ...Mappers.Parent,
        //  color: { type: { name: "String" }, serializedName: "color" }
        // }
        writeParentMappers(parents, writer);
        // Write all sub-mappers
        if (modelProperties) {
            lodash_1.keys(modelProperties).forEach(key => {
                writer.write(`"${key}":`);
                writeMapper(writer, modelProperties[key]);
                writer.write(",");
            });
        }
    });
}
function writePolymorphicDiscriminator(writer, polymorphicDiscriminator) {
    if (!polymorphicDiscriminator) {
        return writer;
    }
    // When the discriminator is a string, we know it is a reference.
    const isReferenceDicriminator = lodash_1.isString(polymorphicDiscriminator);
    writer.write("polymorphicDiscriminator:");
    if (isReferenceDicriminator) {
        // If the polymorphic discriminator is a reference, we just need to
        // to assign polymorphicDiscriminator to the string we got
        // example polymorphicDiscriminator: Mappers.SomeObject
        writer.write(`${polymorphicDiscriminator}`);
    }
    else {
        // Since the discriminator is not a reference, we need to inline it,
        // so we need to write its properties within a block  i.e. polymorphicDiscriminator: {...}
        writer.block(() => {
            writeObjectProps(polymorphicDiscriminator, writer);
        });
    }
    return writer.write(",");
}
function writeDefaultValue(writer, defaultValue, mapperType) {
    if (!lodash_1.isNil(defaultValue)) {
        return writer.write(`defaultValue: ${valueHelpers_1.getStringForValue(defaultValue, mapperType.name, true, mapperType)},`);
    }
    return writer;
}
function writeParentMappers(parents, writer) {
    (parents || []).forEach(parent => {
        writer.write(`...${parent}.type.modelProperties,`);
    });
}
function writeObjectProps(obj, writer) {
    let currentPos = writer;
    lodash_1.keys(obj).forEach(key => {
        currentPos = currentPos.writeLine(`${key}: ${JSON.stringify(obj[key])},`);
    });
    return currentPos;
}
function extractParents(mapper) {
    // TODO(#538): We may need to create a MapperDetails of some sort which contains
    // the mapper itself and property with its parents for easier manipulation
    // and avoid the side effect of this function mutating the mapper
    let parents = [];
    if (mapper.type.name === core_http_1.MapperType.Composite) {
        const compositeMapper = mapper;
        const { parentsRefs, ...modelProperties } = (compositeMapper.type
            .modelProperties || {});
        parents = parentsRefs;
        compositeMapper.type.modelProperties = modelProperties;
    }
    return parents;
}
//# sourceMappingURL=mappersGenerator.js.map