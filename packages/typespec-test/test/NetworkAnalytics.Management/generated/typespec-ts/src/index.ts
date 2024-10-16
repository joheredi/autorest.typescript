// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  NetworkAnalyticsClient,
  NetworkAnalyticsClientOptions,
} from "./networkAnalyticsClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  Resource,
  SystemData,
  CreatedByType,
  KnownCreatedByType,
  TrackedResource,
  DataProduct,
  DataProductProperties,
  ProvisioningState,
  KnownProvisioningState,
  ControlState,
  KnownControlState,
  EncryptionKeyDetails,
  DataProductNetworkAcls,
  VirtualNetworkRule,
  IPRules,
  DefaultAction,
  KnownDefaultAction,
  ManagedResourceGroupConfiguration,
  ConsumptionEndpointsProperties,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  KnownManagedServiceIdentityType,
  UserAssignedIdentity,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  DataProductUpdate,
  DataProductUpdateProperties,
  AccountSas,
  AccountSasToken,
  KeyVaultInfo,
  RoleAssignmentCommonProperties,
  DataProductUserRole,
  KnownDataProductUserRole,
  RoleAssignmentDetail,
  ListRoleAssignments,
  ProxyResource,
  DataType,
  DataTypeProperties,
  DataTypeState,
  KnownDataTypeState,
  DataTypeUpdate,
  DataTypeUpdateProperties,
  ContainerSaS,
  ContainerSasToken,
  DataProductsCatalog,
  DataProductsCatalogProperties,
  PublisherInformation,
  DataProductInformation,
  DataProductVersion,
  Operation,
  OperationDisplay,
  Origin,
  KnownOrigin,
  ActionType,
  KnownActionType,
  Versions,
  OperationsListOptionalParams,
  DataProductsCatalogsGetOptionalParams,
  DataProductsCatalogsListByResourceGroupOptionalParams,
  DataProductsCatalogsListBySubscriptionOptionalParams,
  DataTypesCreateOptionalParams,
  DataTypesGetOptionalParams,
  DataTypesUpdateOptionalParams,
  DataTypesDeleteOptionalParams,
  DataTypesDeleteDataOptionalParams,
  DataTypesGenerateStorageContainerSasTokenOptionalParams,
  DataTypesListByDataProductOptionalParams,
  DataProductsCreateOptionalParams,
  DataProductsGetOptionalParams,
  DataProductsUpdateOptionalParams,
  DataProductsDeleteOptionalParams,
  DataProductsGenerateStorageAccountSasTokenOptionalParams,
  DataProductsRotateKeyOptionalParams,
  DataProductsAddUserRoleOptionalParams,
  DataProductsRemoveUserRoleOptionalParams,
  DataProductsListRolesAssignmentsOptionalParams,
  DataProductsListByResourceGroupOptionalParams,
  DataProductsListBySubscriptionOptionalParams,
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./models/index.js";
export {
  DataProductsOperations,
  DataProductsCatalogsOperations,
  DataTypesOperations,
  OperationsOperations,
} from "./classic/index.js";
