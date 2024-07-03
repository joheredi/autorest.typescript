// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "../rest/outputModels.js";
import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import { JsonEncodedNameModelOutput } from "../rest/outputModels.js";
import { JsonEncodedNameModel as JsonEncodedNameModelRest } from "../rest/index.js";

export interface JsonEncodedNameModel {
  /** Pass in true */
  defaultName: boolean;
}

function _deserializeJsonEncodedNameModel(
  input: JsonEncodedNameModelOutput,
): JsonEncodedNameModel {
  return {
    defaultName: passthroughDeserializer(input["wireName"]),
  };
}

export const deserializeJsonEncodedNameModel = withNullChecks(
  _deserializeJsonEncodedNameModel,
);

export function jsonEncodedNameModelSerializer(
  item: JsonEncodedNameModel,
): JsonEncodedNameModelRest {
  return {
    wireName: item["defaultName"],
  };
}
