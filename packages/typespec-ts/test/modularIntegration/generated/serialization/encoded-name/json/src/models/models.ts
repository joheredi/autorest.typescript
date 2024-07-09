// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import {
  JsonEncodedNameModel as JsonEncodedNameModelRest,
  JsonEncodedNameModelOutput,
} from "../rest/index.js";

export interface JsonEncodedNameModel {
  /** Pass in true */
  defaultName: boolean;
}

export function jsonEncodedNameModelSerializer(
  item: JsonEncodedNameModel,
): JsonEncodedNameModelRest {
  return {
    wireName: item["defaultName"],
  };
}

function _deserializeJsonEncodedNameModel(
  input: JsonEncodedNameModelOutput,
): JsonEncodedNameModel {
  return {
    defaultName: passthroughDeserializer(input["wireName"]) as any,
  } as any;
}

export const deserializeJsonEncodedNameModel = withNullChecks(
  _deserializeJsonEncodedNameModel,
);
