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
export { operationRefkey } from "./Operations.js";

// Client context
export {
  clientContextRefkey,
  clientContextFactoryRefkey,
  clientOptionalParamsRefkey,
  getClientContextName,
  ClientContext
} from "./ClientContext.js";
export type { ClientContextProps } from "./ClientContext.js";

// Classical client
export {
  classicalClientRefkey,
  getClassicalClientDisplayName,
  ClassicalClient
} from "./ClassicalClient.js";
export type { ClassicalClientProps } from "./ClassicalClient.js";

// Classical operation groups
export { ClassicalOperationGroups } from "./ClassicalOperationGroups.js";
export type { ClassicalOperationGroupsProps } from "./ClassicalOperationGroups.js";

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

// Restore poller
export { restorePollerRefkey } from "./RestorePoller.js";

// Index files
export { RootIndex } from "./RootIndex.js";
export type { RootIndexProps } from "./RootIndex.js";
export { SubpathIndex } from "./SubpathIndex.js";
export type { SubpathIndexProps } from "./SubpathIndex.js";
