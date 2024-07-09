// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  deserializeRecord,
  serializeRecord,
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import {
  InnerModel as InnerModelRest,
  InnerModelOutput,
} from "../rest/index.js";

/** Dictionary inner model */
export interface InnerModel {
  /** Required string property */
  property: string;
  children?: Record<string, InnerModel>;
}

export function innerModelSerializer(item: InnerModel): InnerModelRest {
  return {
    property: item["property"],
    children: !item.children
      ? item.children
      : (serializeRecord(item.children as any, innerModelSerializer) as any),
  };
}

function _deserializeInnerModel(input: InnerModelOutput): InnerModel {
  return {
    property: passthroughDeserializer(input["property"]) as any,
    children: deserializeRecord(
      input["children"],
      deserializeInnerModel,
    ) as any,
  } as any;
}

export const deserializeInnerModel = withNullChecks(_deserializeInnerModel);
