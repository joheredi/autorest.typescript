import { TypeDetails } from "../models/modelDetails";
import { Schema, ObjectSchema, SchemaResponse, ComplexSchema } from "@azure-tools/codemodel";
/**
 * Extracts parents from an ObjectSchema
 * by default it extracts all parameters unless
 * immediateOnly = true is passed
 */
export declare function getSchemaParents({ parents }: ObjectSchema, immediateOnly?: boolean): ComplexSchema[];
/**
 * Extracts the additional properties for an object schema
 * if immediateOnly is true, it will only extract additionalProperties defined directly
 * in the schema, otherwise it will get it from any of its parents
 */
export declare function getAdditionalProperties({ parents }: ObjectSchema, immediateOnly?: boolean): ComplexSchema | undefined;
/**
 * Helper function which given a schema returns type information for useful for generating Typescript code
 * @param schema schema to extract type information from
 */
export declare function getTypeForSchema(schema: Schema, isNullable?: boolean): TypeDetails;
export declare function isSchemaResponse(response: any): response is SchemaResponse;
/**
 * Gets special information to include as documentation when generating certain
 * schema types.
 */
export declare function getSchemaTypeDocumentation(schema: Schema): "" | "\nThis value should be an ISO-8601 formatted string representing time. E.g. \"HH:MM:SS\" or \"HH:MM:SS.mm\"." | "\nThis value contains a credential. Consider obscuring before showing to users";
//# sourceMappingURL=schemaHelpers.d.ts.map