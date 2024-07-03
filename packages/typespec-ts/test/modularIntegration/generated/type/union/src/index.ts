// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { UnionClient, UnionClientOptions } from "./unionClient.js";
export {
  MixedTypesCases,
  deserializeMixedTypesCases,
  Cat,
  deserializeCat,
  MixedLiteralsCases,
  deserializeMixedLiteralsCases,
  StringAndArrayCases,
  deserializeStringAndArrayCases,
  EnumsOnlyCases,
  deserializeEnumsOnlyCases,
  Lr,
  Ud,
  Dog,
  deserializeDog,
  StringExtensibleNamedUnion,
  KnownStringExtensibleNamedUnion,
  StringsOnlyGetOptionalParams,
  StringsOnlySendOptionalParams,
  StringExtensibleGetOptionalParams,
  StringExtensibleSendOptionalParams,
  StringExtensibleNamedGetOptionalParams,
  StringExtensibleNamedSendOptionalParams,
  IntsOnlyGetOptionalParams,
  IntsOnlySendOptionalParams,
  FloatsOnlyGetOptionalParams,
  FloatsOnlySendOptionalParams,
  ModelsOnlyGetOptionalParams,
  ModelsOnlySendOptionalParams,
  EnumsOnlyGetOptionalParams,
  EnumsOnlySendOptionalParams,
  StringAndArrayGetOptionalParams,
  StringAndArraySendOptionalParams,
  MixedLiteralsGetOptionalParams,
  MixedLiteralsSendOptionalParams,
  MixedTypesGetOptionalParams,
  MixedTypesSendOptionalParams,
} from "./models/index.js";
export {
  EnumsOnlyOperations,
  FloatsOnlyOperations,
  IntsOnlyOperations,
  MixedLiteralsOperations,
  MixedTypesOperations,
  ModelsOnlyOperations,
  StringAndArrayOperations,
  StringExtensibleOperations,
  StringExtensibleNamedOperations,
  StringsOnlyOperations,
} from "./classic/index.js";
