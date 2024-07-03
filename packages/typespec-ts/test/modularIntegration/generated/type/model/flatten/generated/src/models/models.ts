// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import {
  ChildFlattenModelOutput,
  ChildModelOutput,
  FlattenModelOutput,
  NestedFlattenModelOutput,
} from "../rest/outputModels.js";
import {
  FlattenModel as FlattenModelRest,
  ChildModel as ChildModelRest,
  NestedFlattenModel as NestedFlattenModelRest,
  ChildFlattenModel as ChildFlattenModelRest,
} from "../rest/index.js";

/** This is the model with one level of flattening. */
export interface FlattenModel {
  name: string;
  properties: ChildModel;
}

function _deserializeFlattenModel(input: FlattenModelOutput): FlattenModel {
  return {
    name: passthroughDeserializer(input["name"]),
    properties: deserializeChildModel(input["properties"]),
  };
}

export const deserializeFlattenModel = withNullChecks(_deserializeFlattenModel);

export function flattenModelSerializer(item: FlattenModel): FlattenModelRest {
  return {
    name: item["name"],
    properties: childModelSerializer(item.properties),
  };
}

/** This is the child model to be flattened. */
export interface ChildModel {
  description: string;
  age: number;
}

function _deserializeChildModel(input: ChildModelOutput): ChildModel {
  return {
    description: passthroughDeserializer(input["description"]),
    age: passthroughDeserializer(input["age"]),
  };
}

export const deserializeChildModel = withNullChecks(_deserializeChildModel);

export function childModelSerializer(item: ChildModel): ChildModelRest {
  return {
    description: item["description"],
    age: item["age"],
  };
}

/** This is the model with two levels of flattening. */
export interface NestedFlattenModel {
  name: string;
  properties: ChildFlattenModel;
}

function _deserializeNestedFlattenModel(
  input: NestedFlattenModelOutput,
): NestedFlattenModel {
  return {
    name: passthroughDeserializer(input["name"]),
    properties: deserializeChildFlattenModel(input["properties"]),
  };
}

export const deserializeNestedFlattenModel = withNullChecks(
  _deserializeNestedFlattenModel,
);

export function nestedFlattenModelSerializer(
  item: NestedFlattenModel,
): NestedFlattenModelRest {
  return {
    name: item["name"],
    properties: childFlattenModelSerializer(item.properties),
  };
}

/** This is the child model to be flattened. And it has flattened property as well. */
export interface ChildFlattenModel {
  summary: string;
  properties: ChildModel;
}

function _deserializeChildFlattenModel(
  input: ChildFlattenModelOutput,
): ChildFlattenModel {
  return {
    summary: passthroughDeserializer(input["summary"]),
    properties: deserializeChildModel(input["properties"]),
  };
}

export const deserializeChildFlattenModel = withNullChecks(
  _deserializeChildFlattenModel,
);

export function childFlattenModelSerializer(
  item: ChildFlattenModel,
): ChildFlattenModelRest {
  return {
    summary: item["summary"],
    properties: childModelSerializer(item.properties),
  };
}
