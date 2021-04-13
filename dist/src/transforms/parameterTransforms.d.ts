import { CodeModel, Parameter } from "@azure-tools/codemodel";
import { ParameterDetails } from "../models/parameterDetails";
import { ClientOptions } from "../models/clientDetails";
import { KnownMediaType } from "@azure-tools/codegen";
export declare function transformParameters(codeModel: CodeModel, options: ClientOptions): ParameterDetails[];
export declare function populateOperationParameters(parameter: Parameter, operationParameters: ParameterDetails[], operationName: string, hasXmlMetadata: boolean, targetMediaType?: KnownMediaType): void;
/**
 * This function takes care of disambiguating parameters with different schemas but
 * using the same name. If it is the first time a parameter is seen, we store it in the
 * operationParameters array.
 *
 * If there is already a parameter with the same name we check if they are the same, if so
 * we just add the current operationName to the operationsIn array.
 *
 * Otherwise we add a suffix to the parameter name and store it as a different parameter.
 */
export declare function disambiguateParameter(parameter: ParameterDetails, operationParameters: ParameterDetails[], sameNameParams: ParameterDetails[], operationName: string, description: string): void;
//# sourceMappingURL=parameterTransforms.d.ts.map