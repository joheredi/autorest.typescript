import { OperationDetails, OperationGroupDetails } from "../../models/operationDetails";
import { ClientDetails } from "../../models/clientDetails";
import { ClassDeclaration, SourceFile } from "ts-morph";
/**
 * Adds the required imports for paging operations
 * @param param0 clientDetails
 * @param sourceFile File to add imports to
 */
export declare function addPagingImports(operations: OperationDetails[], { options }: ClientDetails, sourceFile: SourceFile): void;
/**
 * Checks whether or not an operation group contains any pageable operations
 * that would need AsyncIterators
 */
export declare function hasAsyncIteratorOperations(operations: OperationDetails[]): boolean;
/**
 * This function prepares the initial and next operations to be generated using
 * AsyncIterators, adding some extra metadata sunc as scope and prefix

 */
export declare function preparePageableOperations(operationGroupDetails: OperationGroupDetails, clientDetails: ClientDetails): void;
/**
 * This function generates all the required methods for the pageable operation
 * using AsyncIterators. It generates 3 extra methods on top of the initial and next operations
 * One public method, one private page method whcih gets results per page, and an All method that
 * iterates throug pages, returning all results in a single collection
 */
export declare function writeAsyncIterators(operationGroupDetails: OperationGroupDetails, clientDetails: ClientDetails, operationGroupClass: ClassDeclaration, importedModels: Set<string>): void;
//# sourceMappingURL=pagingOperations.d.ts.map