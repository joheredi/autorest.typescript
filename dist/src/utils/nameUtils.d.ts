import { Operation, OperationGroup } from "@azure-tools/codemodel";
import { TypeDetails } from "../models/modelDetails";
export declare enum NameType {
    Class = 0,
    File = 1,
    Interface = 2,
    Property = 3,
    Parameter = 4,
    Operation = 5,
    OperationGroup = 6
}
export declare enum CasingConvention {
    Pascal = 0,
    Camel = 1
}
export declare function guardReservedNames(name: string, nameType: NameType): string;
/**
 * Returns a normalized Type name, this is, the type name capitalized when needed.
 * Otherwise, return the original typename, for example primitives "string", etc. don't need capitalization.
 */
export declare function normalizeTypeName({ kind, typeName }: TypeDetails): string;
export declare function normalizeName(name: string, nameType: NameType, shouldGuard?: boolean): string;
export declare function getModelsName(title: string): string;
export declare function getMappersName(title: string): string;
export declare function getOperationFullName(operationGroup: OperationGroup, operation: Operation, clientName: string): string;
//# sourceMappingURL=nameUtils.d.ts.map