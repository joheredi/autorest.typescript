// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import {
  AbstractModelOutput,
  BaseModelOutput,
  InnerModelOutput,
  InternalDecoratorModelInInternalOutput,
  NoDecoratorModelInInternalOutput,
  NoDecoratorModelInPublicOutput,
  OuterModelOutput,
  PublicDecoratorModelInInternalOutput,
  PublicDecoratorModelInPublicOutput,
  RealModelOutput,
  SharedModelOutput,
} from "../rest/outputModels.js";

/** Used in internal operations, should be generated but not exported. */
export interface BaseModel {
  name: string;
}

function _deserializeBaseModel(input: BaseModelOutput): BaseModel {
  return {
    name: passthroughDeserializer(input["name"]),
  };
}

export const deserializeBaseModel = withNullChecks(_deserializeBaseModel);

/** Used in internal operations, should be generated but not exported. */
export interface OuterModel extends BaseModel {
  inner: InnerModel;
}

function _deserializeOuterModel(input: OuterModelOutput): OuterModel {
  return {
    ...deserializeBaseModel(input),
    inner: deserializeInnerModel(input["inner"]),
  };
}

export const deserializeOuterModel = withNullChecks(_deserializeOuterModel);

/** Used in internal operations, should be generated but not exported. */
export interface InnerModel {
  name: string;
}

function _deserializeInnerModel(input: InnerModelOutput): InnerModel {
  return {
    name: passthroughDeserializer(input["name"]),
  };
}

export const deserializeInnerModel = withNullChecks(_deserializeInnerModel);

/** Used in internal operations, should be generated but not exported. */
export interface AbstractModel {
  name: string;
  /** the discriminator possible values: real */
  kind: string;
}

function _deserializeAbstractModel(input: AbstractModelOutput): AbstractModel {
  return {
    kind: passthroughDeserializer(input["kind"]),
    name: passthroughDeserializer(input["name"]),
  };
}

export const deserializeAbstractModel = withNullChecks(
  _deserializeAbstractModel,
);

function _deserializeAbstractModelUnion(
  input: AbstractModelOutput,
): AbstractModel {
  switch (input["kind"]) {
    case "real":
      return deserializeRealModel(input as RealModel);
    default:
      return deserializeAbstractModel(input);
  }
}

export const deserializeAbstractModelUnion = withNullChecks(
  _deserializeAbstractModelUnion,
);

/** Used in internal operations, should be generated but not exported. */
export interface RealModel extends AbstractModel {
  kind: "real";
}

function _deserializeRealModel(input: RealModelOutput): RealModel {
  return {
    ...deserializeAbstractModel(input),
    kind: passthroughDeserializer(input["kind"]),
  };
}

export const deserializeRealModel = withNullChecks(_deserializeRealModel);

/** Used by both public and internal operation. It should be generated and exported. */
export interface SharedModel {
  name: string;
}

function _deserializeSharedModel(input: SharedModelOutput): SharedModel {
  return {
    name: passthroughDeserializer(input["name"]),
  };
}

export const deserializeSharedModel = withNullChecks(_deserializeSharedModel);

/** Used in an internal operation, should be generated but not exported. */
export interface NoDecoratorModelInInternal {
  name: string;
}

function _deserializeNoDecoratorModelInInternal(
  input: NoDecoratorModelInInternalOutput,
): NoDecoratorModelInInternal {
  return {
    name: passthroughDeserializer(input["name"]),
  };
}

export const deserializeNoDecoratorModelInInternal = withNullChecks(
  _deserializeNoDecoratorModelInInternal,
);

/** Used in an internal operation, should be generated but not exported. */
export interface InternalDecoratorModelInInternal {
  name: string;
}

function _deserializeInternalDecoratorModelInInternal(
  input: InternalDecoratorModelInInternalOutput,
): InternalDecoratorModelInInternal {
  return {
    name: passthroughDeserializer(input["name"]),
  };
}

export const deserializeInternalDecoratorModelInInternal = withNullChecks(
  _deserializeInternalDecoratorModelInInternal,
);

/** Used in an internal operation but with public decorator, should be generated and exported. */
export interface PublicDecoratorModelInInternal {
  name: string;
}

function _deserializePublicDecoratorModelInInternal(
  input: PublicDecoratorModelInInternalOutput,
): PublicDecoratorModelInInternal {
  return {
    name: passthroughDeserializer(input["name"]),
  };
}

export const deserializePublicDecoratorModelInInternal = withNullChecks(
  _deserializePublicDecoratorModelInInternal,
);

/** Used in a public operation, should be generated and exported. */
export interface NoDecoratorModelInPublic {
  name: string;
}

function _deserializeNoDecoratorModelInPublic(
  input: NoDecoratorModelInPublicOutput,
): NoDecoratorModelInPublic {
  return {
    name: passthroughDeserializer(input["name"]),
  };
}

export const deserializeNoDecoratorModelInPublic = withNullChecks(
  _deserializeNoDecoratorModelInPublic,
);

/** Used in a public operation, should be generated and exported. */
export interface PublicDecoratorModelInPublic {
  name: string;
}

function _deserializePublicDecoratorModelInPublic(
  input: PublicDecoratorModelInPublicOutput,
): PublicDecoratorModelInPublic {
  return {
    name: passthroughDeserializer(input["name"]),
  };
}

export const deserializePublicDecoratorModelInPublic = withNullChecks(
  _deserializePublicDecoratorModelInPublic,
);

/** Alias for AbstractModelUnion */
export type AbstractModelUnion = RealModel | AbstractModel;
