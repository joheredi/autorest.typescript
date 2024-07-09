// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import { NewModel as NewModelRest, NewModelOutput } from "../rest/index.js";

export interface NewModel {
  newProp: string;
  enumProp: NewEnum;
  unionProp: NewUnion;
}

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

function _deserializeNewModel(input: NewModelOutput): NewModel {
  return {
    newProp: passthroughDeserializer(input["newProp"]) as any,
    enumProp: passthroughDeserializer(input["enumProp"]) as any,
    unionProp: passthroughDeserializer(input["unionProp"]) as any,
  } as any;
}

export const deserializeNewModel = withNullChecks(_deserializeNewModel);

/** Alias for NewUnion */
export type NewUnion = string | number;
