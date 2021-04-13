import { HttpMethods } from "@azure/core-http";
import { Operation, Request, SchemaResponse, Response, Schema, OperationGroup, CodeModel } from "@azure-tools/codemodel";
import { OperationGroupDetails, OperationDetails, OperationResponseDetails, OperationRequestDetails, OperationSpecDetails, OperationSpecResponses } from "../models/operationDetails";
import { ParameterDetails } from "../models/parameterDetails";
export declare function transformOperationSpec(operationDetails: OperationDetails, parameters: ParameterDetails[]): OperationSpecDetails[];
export declare function extractHttpDetails({ path, method }: OperationRequestDetails): {
    path: string;
    httpMethod: HttpMethods;
};
export declare function extractSpecResponses({ name, responses, isLRO }: OperationDetails): OperationSpecResponses;
export interface SpecType {
    name: string;
    allowedValues?: string[];
    reference?: string;
    constantProps?: ConstantProps;
}
interface ConstantProps {
    isConstant: true;
    defaultValue: any;
}
export declare function getSpecType(responseSchema: Schema, expand?: boolean): SpecType;
export declare function extractSchemaResponses(responses: OperationResponseDetails[]): OperationSpecResponses;
export declare function transformOperationRequest(request: Request): OperationRequestDetails;
/**
 * Build OperationResponseDetails by extracting body and header information
 * from the response
 */
export declare function transformOperationResponse(response: SchemaResponse | Response, operationFullName: string, paginationItemName?: string): OperationResponseDetails;
export declare function transformOperation(operation: Operation, operationGroup: OperationGroup, clientName: string): Promise<OperationDetails>;
export declare function transformOperationGroups(codeModel: CodeModel): Promise<OperationGroupDetails[]>;
export declare function transformOperationGroup(operationGroup: OperationGroup, clientName: string): Promise<OperationGroupDetails>;
export {};
//# sourceMappingURL=operationTransforms.d.ts.map