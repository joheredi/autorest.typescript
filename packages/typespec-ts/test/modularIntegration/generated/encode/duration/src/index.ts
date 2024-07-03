// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { DurationClient, DurationClientOptions } from "./durationClient.js";
export {
  DefaultDurationProperty,
  deserializeDefaultDurationProperty,
  ISO8601DurationProperty,
  deserializeISO8601DurationProperty,
  Int32SecondsDurationProperty,
  deserializeInt32SecondsDurationProperty,
  FloatSecondsDurationProperty,
  deserializeFloatSecondsDurationProperty,
  Float64SecondsDurationProperty,
  deserializeFloat64SecondsDurationProperty,
  FloatSecondsDurationArrayProperty,
  deserializeFloatSecondsDurationArrayProperty,
  QueryDefaultOptionalParams,
  QueryIso8601OptionalParams,
  QueryInt32SecondsOptionalParams,
  QueryFloatSecondsOptionalParams,
  QueryFloat64SecondsOptionalParams,
  QueryInt32SecondsArrayOptionalParams,
  PropertyDefaultOptionalParams,
  PropertyIso8601OptionalParams,
  PropertyInt32SecondsOptionalParams,
  PropertyFloatSecondsOptionalParams,
  PropertyFloat64SecondsOptionalParams,
  PropertyFloatSecondsArrayOptionalParams,
  HeaderDefaultOptionalParams,
  HeaderIso8601OptionalParams,
  HeaderIso8601ArrayOptionalParams,
  HeaderInt32SecondsOptionalParams,
  HeaderFloatSecondsOptionalParams,
  HeaderFloat64SecondsOptionalParams,
} from "./models/index.js";
export {
  HeaderOperations,
  PropertyOperations,
  QueryOperations,
} from "./classic/index.js";
