// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  _DataProductListResult,
  _dataProductListResultDeserializer,
  _DataTypeListResult,
  _dataTypeListResultDeserializer,
  _DataProductsCatalogListResult,
  _dataProductsCatalogListResultDeserializer,
  _OperationListResult,
  _operationListResultDeserializer,
} from "./models/models.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { NetworkAnalyticsClient } from "./networkAnalyticsClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  DataProduct,
  DataProductProperties,
  KnownProvisioningState,
  ProvisioningState,
  KnownControlState,
  ControlState,
  EncryptionKeyDetails,
  DataProductNetworkAcls,
  VirtualNetworkRule,
  IPRules,
  KnownDefaultAction,
  DefaultAction,
  ManagedResourceGroupConfiguration,
  ConsumptionEndpointsProperties,
  ManagedServiceIdentityV4,
  KnownManagedServiceIdentityType,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  ErrorAdditionalInfoInfo,
  DataProductUpdate,
  DataProductUpdateProperties,
  AccountSas,
  AccountSasToken,
  KeyVaultInfo,
  RoleAssignmentCommonProperties,
  KnownDataProductUserRole,
  DataProductUserRole,
  RoleAssignmentDetail,
  ListRolesAssignmentsRequest,
  ListRoleAssignments,
  DataType,
  DataTypeProperties,
  KnownDataTypeState,
  DataTypeState,
  ProxyResource,
  DataTypeUpdate,
  DataTypeUpdateProperties,
  DeleteDataRequest,
  ContainerSaS,
  ContainerSasToken,
  DataProductsCatalog,
  DataProductsCatalogProperties,
  PublisherInformation,
  DataProductInformation,
  DataProductVersion,
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
} from "./models/index.js";
export {
  createNetworkAnalytics,
  NetworkAnalyticsContext,
  NetworkAnalyticsClientOptionalParams,
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
} from "./api/index.js";
export {
  DataProductsOperations,
  DataProductsCatalogsOperations,
  DataTypesOperations,
  OperationsOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
