// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
  deserializeArray,
} from "../helpers/serializerHelpers.js";
import {
  InnerModel as InnerModelRest,
  InnerModelOutput,
} from "../rest/index.js";

/** Array inner model */
export interface InnerModel {
  /** Required string property */
  property: string;
  children?: InnerModel[];
}

export function innerModelSerializer(item: InnerModel): InnerModelRest {
  return {
    property: item["property"],
    children:
      item["children"] === undefined
        ? item["children"]
        : item["children"].map(innerModelSerializer),
  };
}

function _deserializeInnerModel(input: InnerModelOutput): InnerModel {
  return {
    property: passthroughDeserializer(input["property"]) as any,
    children: deserializeArray(input["children"], deserializeInnerModel) as any,
  } as any;
}

export const deserializeInnerModel = withNullChecks(_deserializeInnerModel);
