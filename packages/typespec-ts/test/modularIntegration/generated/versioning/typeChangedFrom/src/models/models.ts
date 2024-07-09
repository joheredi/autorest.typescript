// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import { TestModel as TestModelRest, TestModelOutput } from "../rest/index.js";

export interface TestModel {
  prop: string;
  changedProp: string;
}

export function testModelSerializer(item: TestModel): TestModelRest {
  return {
    prop: item["prop"],
    changedProp: item["changedProp"],
  };
}

/** The version of the API. */
export type Versions = "v1" | "v2";

function _deserializeTestModel(input: TestModelOutput): TestModel {
  return {
    prop: passthroughDeserializer(input["prop"]) as any,
    changedProp: passthroughDeserializer(input["changedProp"]) as any,
  } as any;
}

export const deserializeTestModel = withNullChecks(_deserializeTestModel);
