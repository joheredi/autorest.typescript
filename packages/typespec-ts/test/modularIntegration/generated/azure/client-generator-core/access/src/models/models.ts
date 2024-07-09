// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  passthroughDeserializer,
  withNullChecks,
} from "../helpers/serializerHelpers.js";
import {
  BaseModelOutput,
  OuterModelOutput,
  InnerModelOutput,
  AbstractModelOutput,
  RealModelOutput,
  SharedModelOutput,
  NoDecoratorModelInInternalOutput,
  InternalDecoratorModelInInternalOutput,
  PublicDecoratorModelInInternalOutput,
  NoDecoratorModelInPublicOutput,
  PublicDecoratorModelInPublicOutput,
} from "../rest/outputModels.js";

/** Used in internal operations, should be generated but not exported. */
export interface BaseModel {
  name: string;
}

/** Used in internal operations, should be generated but not exported. */
export interface OuterModel extends BaseModel {
  inner: InnerModel;
}

/** Used in internal operations, should be generated but not exported. */
export interface InnerModel {
  name: string;
}

/** Used in internal operations, should be generated but not exported. */
export interface AbstractModel {
  name: string;
  /** the discriminator possible values: real */
  kind: string;
}

/** Used in internal operations, should be generated but not exported. */
export interface RealModel extends AbstractModel {
  kind: "real";
}

/** Used by both public and internal operation. It should be generated and exported. */
export interface SharedModel {
  name: string;
}

/** Used in an internal operation, should be generated but not exported. */
export interface NoDecoratorModelInInternal {
  name: string;
}

/** Used in an internal operation, should be generated but not exported. */
export interface InternalDecoratorModelInInternal {
  name: string;
}

/** Used in an internal operation but with public decorator, should be generated and exported. */
export interface PublicDecoratorModelInInternal {
  name: string;
}

/** Used in a public operation, should be generated and exported. */
export interface NoDecoratorModelInPublic {
  name: string;
}

/** Used in a public operation, should be generated and exported. */
export interface PublicDecoratorModelInPublic {
  name: string;
}

function _deserializeBaseModel(input: BaseModelOutput): BaseModel {
  return {
    name: passthroughDeserializer(input["name"]) as any,
  } as any;
}

export const deserializeBaseModel = withNullChecks(_deserializeBaseModel);

function _deserializeOuterModel(input: OuterModelOutput): OuterModel {
  return {
    ...deserializeBaseModel(input),
    inner: deserializeInnerModel(input["inner"]) as any,
  } as any;
}

export const deserializeOuterModel = withNullChecks(_deserializeOuterModel);

function _deserializeInnerModel(input: InnerModelOutput): InnerModel {
  return {
    name: passthroughDeserializer(input["name"]) as any,
  } as any;
}

export const deserializeInnerModel = withNullChecks(_deserializeInnerModel);

function _deserializeAbstractModel(input: AbstractModelOutput): AbstractModel {
  return {
    kind: passthroughDeserializer(input["kind"]) as any,
    name: passthroughDeserializer(input["name"]) as any,
  } as any;
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

function _deserializeRealModel(input: RealModelOutput): RealModel {
  return {
    ...deserializeAbstractModel(input),
    kind: passthroughDeserializer(input["kind"]) as any,
  } as any;
}

export const deserializeRealModel = withNullChecks(_deserializeRealModel);

function _deserializeSharedModel(input: SharedModelOutput): SharedModel {
  return {
    name: passthroughDeserializer(input["name"]) as any,
  } as any;
}

export const deserializeSharedModel = withNullChecks(_deserializeSharedModel);

function _deserializeNoDecoratorModelInInternal(
  input: NoDecoratorModelInInternalOutput,
): NoDecoratorModelInInternal {
  return {
    name: passthroughDeserializer(input["name"]) as any,
  } as any;
}

export const deserializeNoDecoratorModelInInternal = withNullChecks(
  _deserializeNoDecoratorModelInInternal,
);

function _deserializeInternalDecoratorModelInInternal(
  input: InternalDecoratorModelInInternalOutput,
): InternalDecoratorModelInInternal {
  return {
    name: passthroughDeserializer(input["name"]) as any,
  } as any;
}

export const deserializeInternalDecoratorModelInInternal = withNullChecks(
  _deserializeInternalDecoratorModelInInternal,
);

function _deserializePublicDecoratorModelInInternal(
  input: PublicDecoratorModelInInternalOutput,
): PublicDecoratorModelInInternal {
  return {
    name: passthroughDeserializer(input["name"]) as any,
  } as any;
}

export const deserializePublicDecoratorModelInInternal = withNullChecks(
  _deserializePublicDecoratorModelInInternal,
);

function _deserializeNoDecoratorModelInPublic(
  input: NoDecoratorModelInPublicOutput,
): NoDecoratorModelInPublic {
  return {
    name: passthroughDeserializer(input["name"]) as any,
  } as any;
}

export const deserializeNoDecoratorModelInPublic = withNullChecks(
  _deserializeNoDecoratorModelInPublic,
);

function _deserializePublicDecoratorModelInPublic(
  input: PublicDecoratorModelInPublicOutput,
): PublicDecoratorModelInPublic {
  return {
    name: passthroughDeserializer(input["name"]) as any,
  } as any;
}

export const deserializePublicDecoratorModelInPublic = withNullChecks(
  _deserializePublicDecoratorModelInPublic,
);

/** Alias for AbstractModelUnion */
export type AbstractModelUnion = RealModel | AbstractModel;
