// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  _PagedSchemaGroup,
  _pagedSchemaGroupDeserializer,
  _PagedVersion,
  _pagedVersionDeserializer,
} from "./models/models.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { SchemaRegistryClient } from "./schemaRegistryClient.js";
export {
  SchemaGroup,
  SchemaVersion,
  SchemaProperties,
  SchemaFormat,
  Schema,
  SchemaContentTypeValues,
  ContentTypeEnum,
} from "./models/index.js";
export {
  SchemaOperationsListSchemaGroupsOptionalParams,
  SchemaOperationsGetSchemaByIdOptionalParams,
  SchemaOperationsListSchemaVersionsOptionalParams,
  SchemaOperationsGetSchemaByVersionOptionalParams,
  SchemaOperationsGetSchemaIdByContentOptionalParams,
  SchemaOperationsRegisterSchemaOptionalParams,
  createSchemaRegistry,
  SchemaRegistryContext,
  SchemaRegistryClientOptionalParams,
} from "./api/index.js";
export { SchemaOperationsOperations } from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
