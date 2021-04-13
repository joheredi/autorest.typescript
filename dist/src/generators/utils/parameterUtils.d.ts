import { ParameterDetails } from "../../models/parameterDetails";
import { OperationDetails } from "../../models/operationDetails";
import { ClassDeclaration } from "ts-morph";
interface ParameterFilterOptions {
    includeOptional?: boolean;
    includeClientParams?: boolean;
    includeUriParameters?: boolean;
    includeGlobalParameters?: boolean;
    includeConstantParameters?: boolean;
    includeGroupedParameters?: boolean;
    includeContentType?: boolean;
}
/**
 * Helper function to filter pre-processed parameters, to be used to find matching parameters
 * within an operation
 * @param parameters original list of parameters to filter
 * @param operation operation to look up the parameter in
 * @param param2 Object with filtering options
 */
export declare function filterOperationParameters(parameters: ParameterDetails[], operation: OperationDetails, { includeOptional, includeClientParams, includeGlobalParameters, includeConstantParameters, includeGroupedParameters, includeContentType }?: ParameterFilterOptions): ParameterDetails[];
export declare function formatJsDocParam(parameters: Partial<ParameterDetails>[]): string[];
/**
 * Gets a list of parameter declarations for each overload the operation supports,
 * and the list of parameter declarations for the base operation.
 */
export declare function getOperationParameterSignatures(operation: OperationDetails, parameters: ParameterDetails[], importedModels: Set<string>, operationGroupClass: ClassDeclaration): {
    overloadParameterDeclarations: import("ts-morph").OptionalKind<import("ts-morph").ParameterDeclarationStructure & {
        description: string;
    }>[][];
    baseMethodParameters: import("ts-morph").OptionalKind<import("ts-morph").ParameterDeclarationStructure & {
        description: string;
    }>[];
};
export {};
//# sourceMappingURL=parameterUtils.d.ts.map