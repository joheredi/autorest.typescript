/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreClient from "@azure/core-client";

/** The result of a list request. */
export interface KeyListResult {
  /** The collection value. */
  items?: Key[];
  /** The URI that can be used to request the next set of paged results. */
  nextLink?: string;
}

export interface Key {
  /** NOTE: This property will not be serialized. It can only be populated by the server. */
  readonly name?: string;
}

/** Azure App Configuration error object. */
export interface ErrorModel {
  /** The type of the error. */
  type?: string;
  /** A brief summary of the error. */
  title?: string;
  /** The name of the parameter that resulted in the error. */
  name?: string;
  /** A detailed description of the error. */
  detail?: string;
  /** The HTTP status code that the error maps to. */
  status?: number;
}

/** The result of a list request. */
export interface KeyValueListResult {
  /** The collection value. */
  items?: KeyValue[];
  /** The URI that can be used to request the next set of paged results. */
  nextLink?: string;
}

export interface KeyValue {
  key?: string;
  label?: string;
  contentType?: string;
  value?: string;
  lastModified?: Date;
  /** Dictionary of <string> */
  tags?: { [propertyName: string]: string };
  locked?: boolean;
  etag?: string;
}

/** The result of a list request. */
export interface LabelListResult {
  /** The collection value. */
  items?: Label[];
  /** The URI that can be used to request the next set of paged results. */
  nextLink?: string;
}

export interface Label {
  /** NOTE: This property will not be serialized. It can only be populated by the server. */
  readonly name?: string;
}

/** Defines headers for AppConfigurationClient_getKeys operation. */
export interface AppConfigurationClientGetKeysHeaders {
  /** Enables real-time consistency between requests by providing the returned value in the next request made to the server. */
  syncToken?: string;
}

/** Defines headers for AppConfigurationClient_checkKeys operation. */
export interface AppConfigurationClientCheckKeysHeaders {
  /** Enables real-time consistency between requests by providing the returned value in the next request made to the server. */
  syncToken?: string;
}

/** Defines headers for AppConfigurationClient_getKeyValues operation. */
export interface AppConfigurationClientGetKeyValuesHeaders {
  /** Enables real-time consistency between requests by providing the returned value in the next request made to the server. */
  syncToken?: string;
}

/** Defines headers for AppConfigurationClient_checkKeyValues operation. */
export interface AppConfigurationClientCheckKeyValuesHeaders {
  /** Enables real-time consistency between requests by providing the returned value in the next request made to the server. */
  syncToken?: string;
}

/** Defines headers for AppConfigurationClient_getKeyValue operation. */
export interface AppConfigurationClientGetKeyValueHeaders {
  /** Enables real-time consistency between requests by providing the returned value in the next request made to the server. */
  syncToken?: string;
  /** An identifier representing the returned state of the resource. */
  eTag?: string;
  /** A UTC datetime that specifies the last time the resource was modified. */
  lastModified?: string;
}

/** Defines headers for AppConfigurationClient_putKeyValue operation. */
export interface AppConfigurationClientPutKeyValueHeaders {
  /** Enables real-time consistency between requests by providing the returned value in the next request made to the server. */
  syncToken?: string;
  /** An identifier representing the returned state of the resource. */
  eTag?: string;
}

/** Defines headers for AppConfigurationClient_deleteKeyValue operation. */
export interface AppConfigurationClientDeleteKeyValueHeaders {
  /** Enables real-time consistency between requests by providing the returned value in the next request made to the server. */
  syncToken?: string;
  /** An identifier representing the returned state of the resource. */
  eTag?: string;
}

/** Defines headers for AppConfigurationClient_checkKeyValue operation. */
export interface AppConfigurationClientCheckKeyValueHeaders {
  /** Enables real-time consistency between requests by providing the returned value in the next request made to the server. */
  syncToken?: string;
  /** An identifier representing the returned state of the resource. */
  eTag?: string;
  /** A UTC datetime that specifies the last time the resource was modified. */
  lastModified?: string;
}

/** Defines headers for AppConfigurationClient_getLabels operation. */
export interface AppConfigurationClientGetLabelsHeaders {
  /** Enables real-time consistency between requests by providing the returned value in the next request made to the server. */
  syncToken?: string;
}

/** Defines headers for AppConfigurationClient_checkLabels operation. */
export interface AppConfigurationClientCheckLabelsHeaders {
  /** Enables real-time consistency between requests by providing the returned value in the next request made to the server. */
  syncToken?: string;
}

/** Defines headers for AppConfigurationClient_putLock operation. */
export interface AppConfigurationClientPutLockHeaders {
  /** Enables real-time consistency between requests by providing the returned value in the next request made to the server. */
  syncToken?: string;
  /** An identifier representing the returned state of the resource. */
  eTag?: string;
}

/** Defines headers for AppConfigurationClient_deleteLock operation. */
export interface AppConfigurationClientDeleteLockHeaders {
  /** Enables real-time consistency between requests by providing the returned value in the next request made to the server. */
  syncToken?: string;
  /** An identifier representing the returned state of the resource. */
  eTag?: string;
}

/** Defines headers for AppConfigurationClient_getRevisions operation. */
export interface AppConfigurationClientGetRevisionsHeaders {
  /** Enables real-time consistency between requests by providing the returned value in the next request made to the server. */
  syncToken?: string;
}

/** Defines headers for AppConfigurationClient_checkRevisions operation. */
export interface AppConfigurationClientCheckRevisionsHeaders {
  /** Enables real-time consistency between requests by providing the returned value in the next request made to the server. */
  syncToken?: string;
}

/** Defines headers for AppConfigurationClient_getKeysNext operation. */
export interface AppConfigurationClientGetKeysNextHeaders {
  /** Enables real-time consistency between requests by providing the returned value in the next request made to the server. */
  syncToken?: string;
}

/** Defines headers for AppConfigurationClient_getKeyValuesNext operation. */
export interface AppConfigurationClientGetKeyValuesNextHeaders {
  /** Enables real-time consistency between requests by providing the returned value in the next request made to the server. */
  syncToken?: string;
}

/** Defines headers for AppConfigurationClient_getLabelsNext operation. */
export interface AppConfigurationClientGetLabelsNextHeaders {
  /** Enables real-time consistency between requests by providing the returned value in the next request made to the server. */
  syncToken?: string;
}

/** Defines headers for AppConfigurationClient_getRevisionsNext operation. */
export interface AppConfigurationClientGetRevisionsNextHeaders {
  /** Enables real-time consistency between requests by providing the returned value in the next request made to the server. */
  syncToken?: string;
}

/** Known values of {@link Get6ItemsItem} that the service accepts. */
export enum KnownGet6ItemsItem {
  Key = "key",
  Label = "label",
  ContentType = "content_type",
  Value = "value",
  LastModified = "last_modified",
  Tags = "tags",
  Locked = "locked",
  Etag = "etag"
}

/**
 * Defines values for Get6ItemsItem. \
 * {@link KnownGet6ItemsItem} can be used interchangeably with Get6ItemsItem,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **key** \
 * **label** \
 * **content_type** \
 * **value** \
 * **last_modified** \
 * **tags** \
 * **locked** \
 * **etag**
 */
export type Get6ItemsItem = string;

/** Known values of {@link Head6ItemsItem} that the service accepts. */
export enum KnownHead6ItemsItem {
  Key = "key",
  Label = "label",
  ContentType = "content_type",
  Value = "value",
  LastModified = "last_modified",
  Tags = "tags",
  Locked = "locked",
  Etag = "etag"
}

/**
 * Defines values for Head6ItemsItem. \
 * {@link KnownHead6ItemsItem} can be used interchangeably with Head6ItemsItem,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **key** \
 * **label** \
 * **content_type** \
 * **value** \
 * **last_modified** \
 * **tags** \
 * **locked** \
 * **etag**
 */
export type Head6ItemsItem = string;

/** Known values of {@link Get7ItemsItem} that the service accepts. */
export enum KnownGet7ItemsItem {
  Key = "key",
  Label = "label",
  ContentType = "content_type",
  Value = "value",
  LastModified = "last_modified",
  Tags = "tags",
  Locked = "locked",
  Etag = "etag"
}

/**
 * Defines values for Get7ItemsItem. \
 * {@link KnownGet7ItemsItem} can be used interchangeably with Get7ItemsItem,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **key** \
 * **label** \
 * **content_type** \
 * **value** \
 * **last_modified** \
 * **tags** \
 * **locked** \
 * **etag**
 */
export type Get7ItemsItem = string;

/** Known values of {@link Head7ItemsItem} that the service accepts. */
export enum KnownHead7ItemsItem {
  Key = "key",
  Label = "label",
  ContentType = "content_type",
  Value = "value",
  LastModified = "last_modified",
  Tags = "tags",
  Locked = "locked",
  Etag = "etag"
}

/**
 * Defines values for Head7ItemsItem. \
 * {@link KnownHead7ItemsItem} can be used interchangeably with Head7ItemsItem,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **key** \
 * **label** \
 * **content_type** \
 * **value** \
 * **last_modified** \
 * **tags** \
 * **locked** \
 * **etag**
 */
export type Head7ItemsItem = string;

/** Known values of {@link Enum4} that the service accepts. */
export enum KnownEnum4 {
  Key = "key",
  Label = "label",
  ContentType = "content_type",
  Value = "value",
  LastModified = "last_modified",
  Tags = "tags",
  Locked = "locked",
  Etag = "etag"
}

/**
 * Defines values for Enum4. \
 * {@link KnownEnum4} can be used interchangeably with Enum4,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **key** \
 * **label** \
 * **content_type** \
 * **value** \
 * **last_modified** \
 * **tags** \
 * **locked** \
 * **etag**
 */
export type Enum4 = string;

/** Known values of {@link Enum5} that the service accepts. */
export enum KnownEnum5 {
  Key = "key",
  Label = "label",
  ContentType = "content_type",
  Value = "value",
  LastModified = "last_modified",
  Tags = "tags",
  Locked = "locked",
  Etag = "etag"
}

/**
 * Defines values for Enum5. \
 * {@link KnownEnum5} can be used interchangeably with Enum5,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **key** \
 * **label** \
 * **content_type** \
 * **value** \
 * **last_modified** \
 * **tags** \
 * **locked** \
 * **etag**
 */
export type Enum5 = string;

/** Optional parameters. */
export interface AppConfigurationClientGetKeysOptionalParams
  extends coreClient.OperationOptions {
  /** A filter for the name of the returned keys. */
  name?: string;
  /** Instructs the server to return elements that appear after the element referred to by the specified token. */
  after?: string;
  /** Requests the server to respond with the state of the resource at the specified time. */
  acceptDatetime?: string;
}

/** Contains response data for the getKeys operation. */
export type AppConfigurationClientGetKeysResponse = AppConfigurationClientGetKeysHeaders &
  KeyListResult;

/** Optional parameters. */
export interface AppConfigurationClientCheckKeysOptionalParams
  extends coreClient.OperationOptions {
  /** A filter for the name of the returned keys. */
  name?: string;
  /** Instructs the server to return elements that appear after the element referred to by the specified token. */
  after?: string;
  /** Requests the server to respond with the state of the resource at the specified time. */
  acceptDatetime?: string;
}

/** Contains response data for the checkKeys operation. */
export type AppConfigurationClientCheckKeysResponse = AppConfigurationClientCheckKeysHeaders;

/** Optional parameters. */
export interface AppConfigurationClientGetKeyValuesOptionalParams
  extends coreClient.OperationOptions {
  /** Instructs the server to return elements that appear after the element referred to by the specified token. */
  after?: string;
  /** Requests the server to respond with the state of the resource at the specified time. */
  acceptDatetime?: string;
  /** A filter used to match keys. */
  key?: string;
  /** A filter used to match labels */
  label?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: Get6ItemsItem[];
}

/** Contains response data for the getKeyValues operation. */
export type AppConfigurationClientGetKeyValuesResponse = AppConfigurationClientGetKeyValuesHeaders &
  KeyValueListResult;

/** Optional parameters. */
export interface AppConfigurationClientCheckKeyValuesOptionalParams
  extends coreClient.OperationOptions {
  /** Instructs the server to return elements that appear after the element referred to by the specified token. */
  after?: string;
  /** Requests the server to respond with the state of the resource at the specified time. */
  acceptDatetime?: string;
  /** A filter used to match keys. */
  key?: string;
  /** A filter used to match labels */
  label?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: Head6ItemsItem[];
}

/** Contains response data for the checkKeyValues operation. */
export type AppConfigurationClientCheckKeyValuesResponse = AppConfigurationClientCheckKeyValuesHeaders;

/** Optional parameters. */
export interface AppConfigurationClientGetKeyValueOptionalParams
  extends coreClient.OperationOptions {
  /** Requests the server to respond with the state of the resource at the specified time. */
  acceptDatetime?: string;
  /** The label of the key-value to retrieve. */
  label?: string;
  /** Used to perform an operation only if the targeted resource's etag matches the value provided. */
  ifMatch?: string;
  /** Used to perform an operation only if the targeted resource's etag does not match the value provided. */
  ifNoneMatch?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: Get7ItemsItem[];
}

/** Contains response data for the getKeyValue operation. */
export type AppConfigurationClientGetKeyValueResponse = AppConfigurationClientGetKeyValueHeaders &
  KeyValue;

/** Optional parameters. */
export interface AppConfigurationClientPutKeyValueOptionalParams
  extends coreClient.OperationOptions {
  /** The label of the key-value to create. */
  label?: string;
  /** Used to perform an operation only if the targeted resource's etag matches the value provided. */
  ifMatch?: string;
  /** Used to perform an operation only if the targeted resource's etag does not match the value provided. */
  ifNoneMatch?: string;
  /** The key-value to create. */
  entity?: KeyValue;
}

/** Contains response data for the putKeyValue operation. */
export type AppConfigurationClientPutKeyValueResponse = AppConfigurationClientPutKeyValueHeaders &
  KeyValue;

/** Optional parameters. */
export interface AppConfigurationClientDeleteKeyValueOptionalParams
  extends coreClient.OperationOptions {
  /** The label of the key-value to delete. */
  label?: string;
  /** Used to perform an operation only if the targeted resource's etag matches the value provided. */
  ifMatch?: string;
}

/** Contains response data for the deleteKeyValue operation. */
export type AppConfigurationClientDeleteKeyValueResponse = AppConfigurationClientDeleteKeyValueHeaders &
  KeyValue;

/** Optional parameters. */
export interface AppConfigurationClientCheckKeyValueOptionalParams
  extends coreClient.OperationOptions {
  /** Requests the server to respond with the state of the resource at the specified time. */
  acceptDatetime?: string;
  /** The label of the key-value to retrieve. */
  label?: string;
  /** Used to perform an operation only if the targeted resource's etag matches the value provided. */
  ifMatch?: string;
  /** Used to perform an operation only if the targeted resource's etag does not match the value provided. */
  ifNoneMatch?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: Head7ItemsItem[];
}

/** Contains response data for the checkKeyValue operation. */
export type AppConfigurationClientCheckKeyValueResponse = AppConfigurationClientCheckKeyValueHeaders;

/** Optional parameters. */
export interface AppConfigurationClientGetLabelsOptionalParams
  extends coreClient.OperationOptions {
  /** A filter for the name of the returned labels. */
  name?: string;
  /** Instructs the server to return elements that appear after the element referred to by the specified token. */
  after?: string;
  /** Requests the server to respond with the state of the resource at the specified time. */
  acceptDatetime?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: string[];
}

/** Contains response data for the getLabels operation. */
export type AppConfigurationClientGetLabelsResponse = AppConfigurationClientGetLabelsHeaders &
  LabelListResult;

/** Optional parameters. */
export interface AppConfigurationClientCheckLabelsOptionalParams
  extends coreClient.OperationOptions {
  /** A filter for the name of the returned labels. */
  name?: string;
  /** Instructs the server to return elements that appear after the element referred to by the specified token. */
  after?: string;
  /** Requests the server to respond with the state of the resource at the specified time. */
  acceptDatetime?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: string[];
}

/** Contains response data for the checkLabels operation. */
export type AppConfigurationClientCheckLabelsResponse = AppConfigurationClientCheckLabelsHeaders;

/** Optional parameters. */
export interface AppConfigurationClientPutLockOptionalParams
  extends coreClient.OperationOptions {
  /** The label, if any, of the key-value to lock. */
  label?: string;
  /** Used to perform an operation only if the targeted resource's etag matches the value provided. */
  ifMatch?: string;
  /** Used to perform an operation only if the targeted resource's etag does not match the value provided. */
  ifNoneMatch?: string;
}

/** Contains response data for the putLock operation. */
export type AppConfigurationClientPutLockResponse = AppConfigurationClientPutLockHeaders &
  KeyValue;

/** Optional parameters. */
export interface AppConfigurationClientDeleteLockOptionalParams
  extends coreClient.OperationOptions {
  /** The label, if any, of the key-value to unlock. */
  label?: string;
  /** Used to perform an operation only if the targeted resource's etag matches the value provided. */
  ifMatch?: string;
  /** Used to perform an operation only if the targeted resource's etag does not match the value provided. */
  ifNoneMatch?: string;
}

/** Contains response data for the deleteLock operation. */
export type AppConfigurationClientDeleteLockResponse = AppConfigurationClientDeleteLockHeaders &
  KeyValue;

/** Optional parameters. */
export interface AppConfigurationClientGetRevisionsOptionalParams
  extends coreClient.OperationOptions {
  /** Instructs the server to return elements that appear after the element referred to by the specified token. */
  after?: string;
  /** Requests the server to respond with the state of the resource at the specified time. */
  acceptDatetime?: string;
  /** A filter used to match keys. */
  key?: string;
  /** A filter used to match labels */
  label?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: Enum4[];
}

/** Contains response data for the getRevisions operation. */
export type AppConfigurationClientGetRevisionsResponse = AppConfigurationClientGetRevisionsHeaders &
  KeyValueListResult;

/** Optional parameters. */
export interface AppConfigurationClientCheckRevisionsOptionalParams
  extends coreClient.OperationOptions {
  /** Instructs the server to return elements that appear after the element referred to by the specified token. */
  after?: string;
  /** Requests the server to respond with the state of the resource at the specified time. */
  acceptDatetime?: string;
  /** A filter used to match keys. */
  key?: string;
  /** A filter used to match labels */
  label?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: Enum5[];
}

/** Contains response data for the checkRevisions operation. */
export type AppConfigurationClientCheckRevisionsResponse = AppConfigurationClientCheckRevisionsHeaders;

/** Optional parameters. */
export interface AppConfigurationClientGetKeysNextOptionalParams
  extends coreClient.OperationOptions {
  /** A filter for the name of the returned keys. */
  name?: string;
  /** Instructs the server to return elements that appear after the element referred to by the specified token. */
  after?: string;
  /** Requests the server to respond with the state of the resource at the specified time. */
  acceptDatetime?: string;
}

/** Contains response data for the getKeysNext operation. */
export type AppConfigurationClientGetKeysNextResponse = AppConfigurationClientGetKeysNextHeaders &
  KeyListResult;

/** Optional parameters. */
export interface AppConfigurationClientGetKeyValuesNextOptionalParams
  extends coreClient.OperationOptions {
  /** Instructs the server to return elements that appear after the element referred to by the specified token. */
  after?: string;
  /** Requests the server to respond with the state of the resource at the specified time. */
  acceptDatetime?: string;
  /** A filter used to match keys. */
  key?: string;
  /** A filter used to match labels */
  label?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: Get6ItemsItem[];
}

/** Contains response data for the getKeyValuesNext operation. */
export type AppConfigurationClientGetKeyValuesNextResponse = AppConfigurationClientGetKeyValuesNextHeaders &
  KeyValueListResult;

/** Optional parameters. */
export interface AppConfigurationClientGetLabelsNextOptionalParams
  extends coreClient.OperationOptions {
  /** A filter for the name of the returned labels. */
  name?: string;
  /** Instructs the server to return elements that appear after the element referred to by the specified token. */
  after?: string;
  /** Requests the server to respond with the state of the resource at the specified time. */
  acceptDatetime?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: string[];
}

/** Contains response data for the getLabelsNext operation. */
export type AppConfigurationClientGetLabelsNextResponse = AppConfigurationClientGetLabelsNextHeaders &
  LabelListResult;

/** Optional parameters. */
export interface AppConfigurationClientGetRevisionsNextOptionalParams
  extends coreClient.OperationOptions {
  /** Instructs the server to return elements that appear after the element referred to by the specified token. */
  after?: string;
  /** Requests the server to respond with the state of the resource at the specified time. */
  acceptDatetime?: string;
  /** A filter used to match keys. */
  key?: string;
  /** A filter used to match labels */
  label?: string;
  /** Used to select what fields are present in the returned resource(s). */
  select?: Enum4[];
}

/** Contains response data for the getRevisionsNext operation. */
export type AppConfigurationClientGetRevisionsNextResponse = AppConfigurationClientGetRevisionsNextHeaders &
  KeyValueListResult;

/** Optional parameters. */
export interface AppConfigurationClientOptionalParams
  extends coreClient.ServiceClientOptions {
  /** Used to guarantee real-time consistency between requests. */
  syncToken?: string;
  /** Api Version */
  apiVersion?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}
