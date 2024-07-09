// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import {
  AzureLocationModel as AzureLocationModelRest,
  AzureLocationModelOutput,
} from "../rest/index.js";

export interface AzureLocationModel {
  location: string;
}

export function azureLocationModelSerializer(
  item: AzureLocationModel,
): AzureLocationModelRest {
  return {
    location: item["location"],
  };
}

/** The version of the API. */
export type Versions = "2022-12-01-preview";

function _deserializeAzureLocationModel(
  input: AzureLocationModelOutput,
): AzureLocationModel {
  return {
    location: passthroughDeserializer(input["location"]) as any,
  } as any;
}

export const deserializeAzureLocationModel = withNullChecks(
  _deserializeAzureLocationModel,
);
