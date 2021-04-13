import { Schema, SchemaType, CodeModel } from "@azure-tools/codemodel";
import { Mapper } from "@azure/core-http";
import { ClientOptions } from "../models/clientDetails";
import { ObjectDetails } from "../models/modelDetails";
import { MapperTypes } from "../utils/valueHelpers";
export declare type ModelProperties = {
    [propertyName: string]: Mapper | string[];
};
export interface EntityOptions {
    serializedName?: string;
    required?: boolean;
    readOnly?: boolean;
    hasXmlMetadata?: boolean;
    uberParents?: string[];
    nullable?: boolean;
}
export interface MapperInput {
    schema: Schema;
    options?: EntityOptions;
}
export declare function transformMappers(codeModel: CodeModel, uberParents: ObjectDetails[], { mediaTypes }: ClientOptions): Promise<Mapper[]>;
/**
 * Transform a schema into a Mapper
 * @param mapperInput An object consisting of a schema and EntityOptions
 */
export declare function transformMapper({ schema, options }: MapperInput): Mapper;
/**
 * Gets a className from a schema
 * @param schema Schema to get the className from
 */
export declare function getMapperClassName(schema: Schema): string;
export declare function getMapperOrRef(schema: Schema, serializedName?: string, options?: EntityOptions): Mapper;
export declare function isSchemaType(matchSchemas: SchemaType[], { type }: Schema): boolean;
export declare function getMapperTypeFromSchema(type: SchemaType, format?: string): MapperTypes.Uuid | MapperTypes.any | "Boolean" | "ByteArray" | "Date" | "DateTime" | "DateTimeRfc1123" | "Object" | "String" | "TimeSpan" | "UnixTime" | "Number" | "Sequence" | "Dictionary" | "Enum";
//# sourceMappingURL=mapperTransforms.d.ts.map