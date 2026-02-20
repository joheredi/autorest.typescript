/**
 * JSX component library for the typespec-ts modular emitter.
 *
 * These components use Alloy's JSX system to generate TypeScript code
 * with automatic reference tracking and import management.
 */

// Root output
export { Output } from "./Output.js";
export type { OutputProps } from "./Output.js";

// Models & types
export { Models } from "./Models.js";
export type { ModelsProps } from "./Models.js";
export {
  typeRefkey,
  polymorphicTypeRefkey,
  knownValuesRefkey,
  namedKnownValuesRefkey
} from "./Models.js";

// Operation options
export { OperationOptions } from "./OperationOptions.js";
export type { OperationOptionsProps } from "./OperationOptions.js";
export { operationOptionsRefkey } from "./OperationOptions.js";

// Operations
export { Operations } from "./Operations.js";
export type { OperationsProps } from "./Operations.js";
export { operationRefkey } from "./Operations.js";

// Client context
export {
  clientContextRefkey,
  clientContextFactoryRefkey,
  clientOptionalParamsRefkey,
  getClientContextName
} from "./ClientContext.js";

// Classical client
export {
  classicalClientRefkey,
  getClassicalClientDisplayName
} from "./ClassicalClient.js";

// Logger
export { Logger } from "./Logger.js";
export type { LoggerProps } from "./Logger.js";

// External packages (Alloy createPackage definitions)
export {
  httpRuntimeLib,
  azureCoreClientLib,
  azureCorePipelineLib,
  azureAbortControllerLib,
  azureCoreAuthLib,
  azureCoreUtilLib,
  azureCoreLroLib,
  azureIdentityLib
} from "./ExternalPackages.js";

// Re-exports of existing (non-JSX) functions for gradual migration
export { buildRootIndex, buildSubClientIndexFile } from "./IndexFiles.js";
export { buildSubpathIndexFile } from "./IndexFiles.js";
export { buildRestorePoller } from "./RestorePoller.js";
export { emitSamples } from "./Samples.js";
