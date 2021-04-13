import { CodeModel } from "@azure-tools/codemodel";
/**
 * This function sorts objects in a topographical order
 * this is to make sure that mappers of parents are generated
 * before children to avoid issues trying to reference a mapper
 * before being defined.
 */
export declare function sortObjectSchemasHierarchically(codeModel: CodeModel): void;
//# sourceMappingURL=sortObjectSchemasHierarchically.d.ts.map