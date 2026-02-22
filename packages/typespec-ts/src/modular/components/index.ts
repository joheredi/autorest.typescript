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

// Unified model files (models + serializers in single source file)
export { ModelFiles } from "./ModelFiles.js";
export type { ModelFilesProps } from "./ModelFiles.js";

// Operation options
export { OperationOptions } from "./OperationOptions.js";
export type { OperationOptionsProps } from "./OperationOptions.js";
export { operationOptionsRefkey } from "./OperationOptions.js";

// Operations
export { operationRefkey, Operations } from "./Operations.js";
export type { OperationsProps } from "./Operations.js";

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
export {
  ClassicalOperationGroups,
  classicalOperationGroupFunctionRefkey,
  classicalOperationGroupInterfaceRefkey
} from "./ClassicalOperationGroups.js";
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

// JSON Serializers
export {
  Serializers,
  serializerRefkey,
  deserializerRefkey
} from "./Serializers.js";
export type { SerializersProps } from "./Serializers.js";

// Restore poller
export { restorePollerRefkey } from "./RestorePoller.js";

// XML Serializers
export { XmlSerializers } from "./XmlSerializers.js";
export type { XmlSerializersProps } from "./XmlSerializers.js";
export {
  xmlSerializerRefkey,
  xmlDeserializerRefkey,
  xmlObjectSerializerRefkey,
  xmlObjectDeserializerRefkey
} from "./XmlSerializers.js";

// Static helper refkeys
export {
  serializationHelperRefkey,
  pagingHelperRefkey,
  pollingHelperRefkey,
  simplePollerHelperRefkey,
  urlTemplateHelperRefkey,
  multipartHelperRefkey,
  cloudSettingHelperRefkey,
  xmlHelperRefkey,
  getStaticHelperFileInfo,
  STATIC_HELPERS_BASE_DIR
} from "./StaticHelpers.js";
export type {
  SerializationHelperName,
  PagingHelperName,
  PollingHelperName,
  SimplePollerHelperName,
  UrlTemplateHelperName,
  MultipartHelperName,
  CloudSettingHelperName,
  XmlHelperName,
  StaticHelperFileInfo
} from "./StaticHelpers.js";

// Static helper files
export { StaticHelperFiles } from "./StaticHelperFiles.js";
export type { StaticHelperFilesProps } from "./StaticHelperFiles.js";

// Index files
export { RootIndex } from "./RootIndex.js";
export type { RootIndexProps } from "./RootIndex.js";
export { SubpathIndex } from "./SubpathIndex.js";
export type { SubpathIndexProps } from "./SubpathIndex.js";
