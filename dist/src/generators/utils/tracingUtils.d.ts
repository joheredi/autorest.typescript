import { SourceFile } from "ts-morph";
import { ClientDetails } from "../../models/clientDetails";
/**
 * Adds the required imports to have operations tracing
 * @param param0 clientDetails
 * @param sourceFile File to add imports to
 */
export declare function addTracingOperationImports({ tracing }: ClientDetails, sourceFile: SourceFile, traverseToRoot?: string): void;
//# sourceMappingURL=tracingUtils.d.ts.map