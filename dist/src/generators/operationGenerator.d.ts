import { Project, SourceFile, ClassDeclaration } from "ts-morph";
import { ClientDetails } from "../models/clientDetails";
import { OperationGroupDetails } from "../models/operationDetails";
import { ParameterDetails } from "../models/parameterDetails";
/**
 * Function that writes the code for all the operations.
 * It will generate one file per operation group and each file contains:
 *    - A class definition for the operation group
 *    - Methods and overrides for each operation
 *    - OperationSpecs for each operation
 * @param clientDetails client details
 * @param project project for code generation
 */
export declare function generateOperations(clientDetails: ClientDetails, project: Project): void;
export declare function writeGetOperationOptions(operationGroupClass: ClassDeclaration): void;
/**
 * Write operations implementation, extracted from OperationGroupDetails, to the generated file
 */
export declare function writeOperations(operationGroupDetails: OperationGroupDetails, operationGroupClass: ClassDeclaration, importedModels: Set<string>, modelNames: Set<string>, clientDetails: ClientDetails, isInline?: boolean): void;
/**
 * Generates and inserts into the file the operation specs
 * for a given operation group
 */
export declare function addOperationSpecs(operationGroupDetails: OperationGroupDetails, file: SourceFile, parameters: ParameterDetails[], hasMappers: boolean): void;
//# sourceMappingURL=operationGenerator.d.ts.map