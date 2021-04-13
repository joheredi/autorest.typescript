import { CodeModel, ObjectSchema, Property, GroupProperty } from "@azure-tools/codemodel";
import { ObjectDetails } from "../models/modelDetails";
import { PropertyDetails } from "../models/modelDetails";
export declare function transformObjects(codeModel: CodeModel, uberParents: ObjectDetails[]): ObjectDetails[];
export declare function transformObject(schema: ObjectSchema, uberParents: ObjectDetails[]): ObjectDetails;
export declare function transformProperty({ language, schema, serializedName, required, readOnly, nullable }: Property | GroupProperty): PropertyDetails;
//# sourceMappingURL=objectTransforms.d.ts.map