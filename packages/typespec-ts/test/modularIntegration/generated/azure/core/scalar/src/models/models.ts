// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import { AzureLocationModelOutput } from "../rest/outputModels.js";
import { AzureLocationModel as AzureLocationModelRest } from "../rest/index.js";

export interface AzureLocationModel {
  location: string;
}

function _deserializeAzureLocationModel(
  input: AzureLocationModelOutput,
): AzureLocationModel {
  return {
    location: passthroughDeserializer(input["location"]),
  };
}

export const deserializeAzureLocationModel = withNullChecks(
  _deserializeAzureLocationModel,
);

export function azureLocationModelSerializer(
  item: AzureLocationModel,
): AzureLocationModelRest {
  return {
    location: item["location"],
  };
}

/** The version of the API. */
export type Versions = "2022-12-01-preview";
