// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  deserializeRecord,
  serializeRecord,
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import { InnerModelOutput } from "../rest/outputModels.js";
import { InnerModel as InnerModelRest } from "../rest/index.js";

/** Dictionary inner model */
export interface InnerModel {
  /** Required string property */
  property: string;
  children?: Record<string, InnerModel>;
}

function _deserializeInnerModel(input: InnerModelOutput): InnerModel {
  return {
    property: passthroughDeserializer(input["property"]),
    children: deserializeRecord(input["children"], deserializeInnerModel),
  };
}

export const deserializeInnerModel = withNullChecks(_deserializeInnerModel);

export function innerModelSerializer(item: InnerModel): InnerModelRest {
  return {
    property: item["property"],
    children: !item.children
      ? item.children
      : (serializeRecord(item.children as any, innerModelSerializer) as any),
  };
}
