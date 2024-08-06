// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export {
  ResourcesClient,
  ResourcesClientOptionalParams,
} from "./resourcesClient.js";
export {
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  ProxyResource,
  NestedProxyResource,
  NestedProxyResourceProperties,
  KnownResourceProvisioningState,
  ResourceProvisioningState,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  TrackedResource,
  TopLevelTrackedResource,
  TopLevelTrackedResourceProperties,
  Versions,
  ProvisioningState,
  TopLevelTrackedResourcesGetOptionalParams,
  TopLevelTrackedResourcesCreateOrReplaceOptionalParams,
  TopLevelTrackedResourcesUpdateOptionalParams,
  TopLevelTrackedResourcesDeleteOptionalParams,
  TopLevelTrackedResourcesListByResourceGroupOptionalParams,
  TopLevelTrackedResourcesListBySubscriptionOptionalParams,
  NestedProxyResourcesGetOptionalParams,
  NestedProxyResourcesCreateOrReplaceOptionalParams,
  NestedProxyResourcesUpdateOptionalParams,
  NestedProxyResourcesDeleteOptionalParams,
  NestedProxyResourcesListByTopLevelTrackedResourceOptionalParams,
} from "./models/index.js";
export {
  NestedProxyResourcesOperations,
  TopLevelTrackedResourcesOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
