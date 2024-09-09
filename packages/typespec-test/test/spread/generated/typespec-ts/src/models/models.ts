// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface Test1Request {
  a: string;
  b: string;
  c: string;
}

export interface Test2Request {
  prop: string;
}

export interface Test3Request {
  prop: string;
}

export function test3RequestSerializer(
  item: Test3Request,
): Record<string, unknown> {
  return {
    prop: item["prop"],
  };
}

export function test3RequestDeserializer(item: any): Test3Request {
  return {
    prop: item["prop"],
  };
}

export interface Test4Request {
  prop: string;
}

export function test4RequestSerializer(
  item: Test4Request,
): Record<string, unknown> {
  return {
    prop: item["prop"],
  };
}

export function test4RequestDeserializer(item: any): Test4Request {
  return {
    prop: item["prop"],
  };
}
