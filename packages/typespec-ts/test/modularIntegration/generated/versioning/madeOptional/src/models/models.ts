// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import { TestModelOutput } from "../rest/outputModels.js";
import { TestModel as TestModelRest } from "../rest/index.js";

export interface TestModel {
  prop: string;
  changedProp?: string;
}

function _deserializeTestModel(input: TestModelOutput): TestModel {
  return {
    prop: passthroughDeserializer(input["prop"]),
    changedProp: passthroughDeserializer(input["changedProp"]),
  };
}

export const deserializeTestModel = withNullChecks(_deserializeTestModel);

export function testModelSerializer(item: TestModel): TestModelRest {
  return {
    prop: item["prop"],
    changedProp: item["changedProp"],
  };
}

/** The version of the API. */
export type Versions = "v1" | "v2";
