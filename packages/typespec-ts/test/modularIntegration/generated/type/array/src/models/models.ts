// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
  deserializeArray,
} from "../helpers/serializerHelpers.js";
import { InnerModelOutput } from "../rest/outputModels.js";
import { InnerModel as InnerModelRest } from "../rest/index.js";

/** Array inner model */
export interface InnerModel {
  /** Required string property */
  property: string;
  children?: InnerModel[];
}

function _deserializeInnerModel(input: InnerModelOutput): InnerModel {
  return {
    property: passthroughDeserializer(input["property"]),
    children: deserializeArray(input["children"], deserializeInnerModel),
  };
}

export const deserializeInnerModel = withNullChecks(_deserializeInnerModel);

export function innerModelSerializer(item: InnerModel): InnerModelRest {
  return {
    property: item["property"],
    children:
      item["children"] === undefined
        ? item["children"]
        : item["children"].map(innerModelSerializer),
  };
}
