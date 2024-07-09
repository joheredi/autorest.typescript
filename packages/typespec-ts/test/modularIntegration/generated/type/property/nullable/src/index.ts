// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { NullableClient, NullableClientOptions } from "./nullableClient.js";
export {
  CollectionsModelProperty,
  InnerModel,
  CollectionsByteProperty,
  DurationProperty,
  DatetimeProperty,
  BytesProperty,
  StringProperty,
  deserializeCollectionsModelProperty,
  deserializeInnerModel,
  deserializeCollectionsByteProperty,
  deserializeDurationProperty,
  deserializeDatetimeProperty,
  deserializeBytesProperty,
  deserializeStringProperty,
  StringGetNonNullOptionalParams,
  StringGetNullOptionalParams,
  StringPatchNonNullOptionalParams,
  StringPatchNullOptionalParams,
  BytesGetNonNullOptionalParams,
  BytesGetNullOptionalParams,
  BytesPatchNonNullOptionalParams,
  BytesPatchNullOptionalParams,
  DatetimeGetNonNullOptionalParams,
  DatetimeGetNullOptionalParams,
  DatetimePatchNonNullOptionalParams,
  DatetimePatchNullOptionalParams,
  DurationGetNonNullOptionalParams,
  DurationGetNullOptionalParams,
  DurationPatchNonNullOptionalParams,
  DurationPatchNullOptionalParams,
  CollectionsByteGetNonNullOptionalParams,
  CollectionsByteGetNullOptionalParams,
  CollectionsBytePatchNonNullOptionalParams,
  CollectionsBytePatchNullOptionalParams,
  CollectionsModelGetNonNullOptionalParams,
  CollectionsModelGetNullOptionalParams,
  CollectionsModelPatchNonNullOptionalParams,
  CollectionsModelPatchNullOptionalParams,
} from "./models/index.js";
export {
  BytesOperations,
  CollectionsByteOperations,
  CollectionsModelOperations,
  DatetimeOperations,
  DurationOperations,
  StringOperations,
} from "./classic/index.js";
