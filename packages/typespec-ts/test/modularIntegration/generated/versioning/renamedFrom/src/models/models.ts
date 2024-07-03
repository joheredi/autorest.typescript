// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "../rest/outputModels.js";
import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import { NewModelOutput } from "../rest/outputModels.js";
import { NewModel as NewModelRest } from "../rest/index.js";

export interface NewModel {
  newProp: string;
  enumProp: NewEnum;
  unionProp: NewUnion;
}

function _deserializeNewModel(input: NewModelOutput): NewModel {
  return {
    newProp: passthroughDeserializer(input["newProp"]),
    enumProp: passthroughDeserializer(input["enumProp"]),
    unionProp: passthroughDeserializer(input["unionProp"]),
  };
}

export const deserializeNewModel = withNullChecks(_deserializeNewModel);

export function newModelSerializer(item: NewModel): NewModelRest {
  return {
    newProp: item["newProp"],
    enumProp: item["enumProp"],
    unionProp: item["unionProp"],
  };
}

/** Type of NewEnum */
export type NewEnum = "newEnumMember";
/** The version of the API. */
export type Versions = "v1" | "v2";
/** Alias for NewUnion */
export type NewUnion = string | number;
