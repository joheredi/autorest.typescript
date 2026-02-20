/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types *//**
 * Identifier for collections.
 */
export interface Collection {
  readonly collectionId: string;
}
/**
 * Known values of {@link Versions} that the service accepts.
 */
export enum KnownVersions {
  /**
   * v1
   */
  V1 = "v1",
}
export type ArrayCollection = Array<Collection>;
